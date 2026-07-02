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
          "content": "<h3>1. The hook: no training, just memory</h3>\n<p>Most learning algorithms digest a dataset into a compact set of parameters and then throw the data away. <strong>k-Nearest Neighbors (kNN)</strong> does the opposite: it keeps every training example and, when asked to predict, simply looks up the most similar past cases and copies their answer. It is learning by <em>analogy</em> — \"to label this new point, find the points it most resembles and let them vote.\" There is no model to fit, no equation to solve. That radical simplicity makes kNN the perfect first algorithm of classical machine learning, and a baseline every practitioner reaches for.</p>\n\n<h3>2. The algorithm</h3>\n<p>Given a labeled training set and a new query point $x$:</p>\n<ul>\n<li><strong>Measure distance</strong> from $x$ to every training point.</li>\n<li><strong>Find the $k$ closest</strong> training points — its \"neighbors.\"</li>\n<li><strong>Vote</strong>: for <em>classification</em>, predict the majority class among those $k$ neighbors; for <em>regression</em>, predict their average target value.</li>\n</ul>\n<p>That is the entire algorithm. The only choices are the number of neighbors $k$ and the distance measure. Everything interesting about kNN comes from those two knobs.</p>\n\n<h3>3. Distance: how \"near\" is defined</h3>\n<p>\"Nearest\" needs a metric. The default is <strong>Euclidean distance</strong>, the straight-line distance $d(x, z) = \\sqrt{\\sum_i (x_i - z_i)^2}$. Other choices include <strong>Manhattan distance</strong> $\\sum_i |x_i - z_i|$ (sum of absolute coordinate gaps) and, for text or sparse vectors, <strong>cosine</strong> similarity. The metric encodes what \"similar\" means for your problem, so it matters as much as $k$.</p>\n<p><strong>Feature scaling is critical.</strong> Distance sums over coordinates, so a feature measured in large units (say income in dollars, ranging to $10^5$) will swamp a feature in small units (age, ranging to $10^2$) — the neighbors are decided almost entirely by income. You must <em>standardize</em> features (rescale each to comparable ranges) before computing distances, or kNN silently ignores your small-scale features.</p>\n\n<p><b>Try it in code.</b> This 1-D k-NN classifier finds the 3 nearest training points to x = 4 and takes the majority label. Run it (and tweak k or x).</p>\n<div data-code=\"javascript\" data-expected=\"B\">const train = [[1,'A'],[2,'A'],[5,'B'],[6,'B'],[7,'B']];\nconst x = 4, k = 3;\n// sort the training points by distance to x, take the k nearest, majority-vote their labels\nconst nearest = train.slice().sort((a,b) => Math.abs(a[0]-x) - Math.abs(b[0]-x)).slice(0,k);\nconst counts = {};\nnearest.forEach(p => counts[p[1]] = (counts[p[1]] || 0) + 1);\nconst pred = Object.keys(counts).sort((a,b) => counts[b]-counts[a])[0];\nconsole.log(pred);</div>\n<h3>4. Choosing k: the bias-variance dial</h3>\n<p>The neighbor count $k$ controls the smoothness of the prediction, and it is a direct bias-variance tradeoff:</p>\n<ul>\n<li><strong>Small $k$</strong> (e.g. $k=1$): the prediction follows individual points, including noisy ones — low bias, high variance. The decision boundary is jagged and can <em>overfit</em>.</li>\n<li><strong>Large $k$</strong>: each prediction averages many neighbors, smoothing over noise but blurring real structure — high bias, low variance. Taken to the extreme ($k = n$), every query gets the same answer (the global majority).</li>\n</ul>\n<p>The sweet spot is found by cross-validation. A common practical tip: use an <em>odd</em> $k$ for two-class problems so the vote cannot tie.</p>\n\n<div data-viz=\"ml-knn-viz\"></div>\n<h3>5. The decision boundary</h3>\n<p>kNN draws no straight line; its decision boundary is whatever the data dictates — a piecewise, locally-defined surface. For $k=1$ the plane is carved into <strong>Voronoi cells</strong>, one per training point, each labeled by that point. Because the boundary can bend arbitrarily, kNN is a <strong>nonparametric</strong> method: it makes no assumption about the shape of the relationship, so it can capture highly nonlinear patterns that a linear model would miss.</p>\n\n<h3>6. The curse of dimensionality</h3>\n<p>kNN's Achilles' heel is high dimensions. As the number of features grows, points spread out so that <em>everything becomes roughly equidistant</em> — the gap between the nearest and farthest neighbor shrinks toward zero. \"Nearest\" stops being meaningful, and kNN's accuracy collapses. This is the <strong>curse of dimensionality</strong>, and it is why kNN shines on low-dimensional problems but needs dimensionality reduction (or a different model) when features number in the hundreds.</p>\n<div data-viz=\"ml-curse-dimensionality\"></div>\n\n<h3>7. Lazy learning and its cost</h3>\n<p>kNN is the textbook <strong>lazy learner</strong>: training is instantaneous (just store the data), but every prediction is expensive — a naive query compares against all $n$ training points, costing $O(nd)$ per prediction in $d$ dimensions. For large datasets this is prohibitive, so practitioners use spatial indexes (KD-trees, ball trees) or approximate-nearest-neighbor structures to speed up the search.</p>\n\n<h3>8. The big picture</h3>\n<p>kNN trades model-building for memory: it assumes nothing, fits nothing, and predicts by analogy to stored cases. That makes it a superb baseline and a clean illustration of distance, feature scaling, the bias-variance tradeoff, and the curse of dimensionality — ideas you will meet again in every model that follows.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: kNN is the ultimate nonparametric model</summary>\n<p>\"Nonparametric\" does not mean \"no parameters\" — it means the model's <em>complexity grows with the data</em> instead of being fixed in advance. A linear model has a set number of weights no matter how much data you feed it; kNN effectively <em>is</em> its training set, so its \"capacity\" scales with $n$.</p>\n<p><b>A remarkable guarantee.</b> Despite its simplicity, kNN is backed by a famous result (Cover and Hart, 1967): as the training set grows without bound, the error rate of <em>1-nearest-neighbor</em> is at most <em>twice</em> the <b>Bayes error</b> — the irreducible error of the best possible classifier. One neighbor, no training, and you are already within a factor of two of optimal. With larger $k$ (growing slowly with $n$) kNN becomes <em>consistent</em>: its error converges to the Bayes error itself.</p>\n<p>The \"aha\": kNN's \"laziness\" is its theoretical strength. By refusing to commit to a functional form and instead deferring to the data at query time, it can approximate <em>any</em> decision boundary given enough examples — the price being memory and slow predictions, the classic space-and-time-for-assumptions trade.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why feature scaling is non-negotiable</summary>\n<p>kNN's entire worldview is distance, and distance is a <em>sum over features</em> — so any feature with a large numeric range silently dominates the verdict.</p>\n<p><b>A concrete failure.</b> Suppose you classify people by (age in years, salary in dollars). Two people differ by 10 years and 1000 dollars. The Euclidean distance is $\\sqrt{10^2 + 1000^2} \\approx 1000$ — the age term ($100$) is utterly drowned by the salary term ($10^6$). kNN will find \"neighbors\" with similar salaries and essentially ignore age, even if age is the more predictive feature. The model is not broken; it is faithfully measuring distance in a space where one axis is a thousand times longer than the other.</p>\n<p><b>The fix.</b> Rescale every feature to a comparable range before computing distances: <em>standardization</em> (subtract the mean, divide by the standard deviation, giving each feature unit variance) or <em>min-max normalization</em> (squash to $[0,1]$). After scaling, each feature contributes on equal footing and the neighbors reflect genuine similarity.</p>\n<p>The \"aha\": for distance-based methods, preprocessing <em>is</em> modeling. Skipping feature scaling does not just hurt accuracy a little — it can make kNN (and k-means, and SVMs with RBF kernels) measure similarity along the wrong axes entirely.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: weighted votes and the right distance metric</summary>\n<p>Plain k-NN gives every one of the $k$ neighbors an equal vote and measures \"near\" with Euclidean distance. Two refinements make it markedly better.</p>\n<p><b>Distance-weighted voting.</b> Instead of a flat majority, weight each neighbor's vote by how close it is — say by $1/d$ or $e^{-d^2}$ — so a neighbor sitting right on top of the query counts far more than one at the edge of the $k$-set. This <em>smooths</em> the dependence on $k$ (a far, marginal neighbor barely matters), reduces ties, and often improves accuracy. With weighting you can even take $k$ large without the prediction being dragged around by distant points.</p>\n<p><b>The metric is a modeling choice.</b> \"Nearest\" is only as good as the distance you use. <em>Euclidean</em> (L2) is the default; <em>Manhattan</em> (L1) can be more robust in some settings; <em>cosine</em> distance suits text and embeddings, where direction matters more than magnitude; and the <em>Mahalanobis</em> distance uses the data's covariance to account for correlated, differently-scaled features (effectively standardizing and de-correlating before measuring). Metric learning goes further still, <em>learning</em> a distance that pulls same-class points together.</p>\n<p>The \"aha\": k-NN has more knobs than just $k$. Weighting votes by distance makes it smoother and less sensitive to $k$, and choosing the metric to match the data (cosine for text, Mahalanobis for correlated features) can matter as much as $k$ itself — \"nearest\" is defined entirely by the metric you pick.</p>\n</details>\n",
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
                "B",
                "A",
                "A tie, so it refuses to predict",
                "The average of A and B"
              ],
              "answer": 1,
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
                "Larger k decreases variance and increases bias (smoother boundary)",
                "Larger k increases both bias and variance"
              ],
              "answer": 2,
              "explain": "A larger k averages more neighbors, smoothing the prediction: lower variance but higher bias. Small k is jagged (high variance, low bias)."
            },
            {
              "q": "What is the decision boundary of 1-NN over a set of training points?",
              "choices": [
                "Always a straight line",
                "Undefined for more than two classes",
                "A single circle around the mean",
                "A set of Voronoi cells, one per training point"
              ],
              "answer": 3,
              "explain": "1-NN assigns each region of space to its closest training point, partitioning the plane into Voronoi cells labeled by those points."
            },
            {
              "q": "The \"curse of dimensionality\" hurts kNN because, as dimensions grow,",
              "choices": [
                "the training step becomes too slow",
                "all points become roughly equidistant, so \"nearest\" loses meaning",
                "the labels become noisier",
                "Euclidean distance can no longer be computed"
              ],
              "answer": 1,
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
                "Prediction is slow because each query compares against many stored points",
                "Training requires expensive matrix inversion",
                "It needs enormous amounts of memory during training only",
                "It cannot be parallelized"
              ],
              "answer": 0,
              "explain": "kNN defers all work to query time: a naive prediction is O(nd), comparing the query against all n training points. Spatial indexes mitigate this."
            },
            {
              "q": "A 1-NN classifier's training error is:",
              "choices": [
                "$0$ — each point is its own nearest neighbor",
                "About $50\\%$",
                "Equal to the test error",
                "Undefined"
              ],
              "answer": 0,
              "explain": "At $k=1$ every training point's nearest neighbor is itself, so it is always classified correctly — zero training error, but high variance."
            },
            {
              "q": "For kNN regression, the prediction at a query point is:",
              "choices": [
                "The single nearest target value",
                "The average of the $k$ nearest neighbors' target values",
                "The majority class",
                "The global mean of all targets"
              ],
              "answer": 1,
              "explain": "kNN regression averages the targets of the $k$ closest points (optionally distance-weighted)."
            },
            {
              "q": "The most common distance metric used in kNN is:",
              "choices": [
                "Edit distance",
                "Cosine of the labels",
                "Euclidean distance",
                "The number of features"
              ],
              "answer": 2,
              "explain": "Euclidean (L2) distance is the default; others (Manhattan, cosine) suit particular data, and all require scaled features."
            },
            {
              "q": "In binary kNN classification, a simple way to avoid tied votes is to:",
              "choices": [
                "Square the distances",
                "Always use $k=2$",
                "Drop the nearest point",
                "Use an odd value of $k$"
              ],
              "answer": 3,
              "explain": "An odd $k$ guarantees a majority in two-class problems; distance-weighting also breaks ties."
            },
            {
              "q": "In distance-weighted kNN, closer neighbors:",
              "choices": [
                "Get more weight in the vote (e.g. weight proportional to $1/\\text{distance}$)",
                "Are ignored",
                "Count the same as far ones",
                "Are used only when $k=1$"
              ],
              "answer": 0,
              "explain": "Weighting by $1/\\text{distance}$ lets nearby points dominate, smoothing predictions and reducing sensitivity to $k$."
            },
            {
              "q": "kNN's core assumption about the data is that:",
              "choices": [
                "Features are linearly related to the label",
                "Nearby points tend to have similar labels or values",
                "The data is Gaussian",
                "The classes are linearly separable"
              ],
              "answer": 1,
              "explain": "kNN relies on local smoothness — points close in feature space share outputs — which is also why feature scaling and low dimensionality matter."
            },
            {
              "q": "kNN decision boundaries are:",
              "choices": [
                "Always quadratic",
                "Always straight lines",
                "Potentially highly nonlinear, following the data",
                "Always axis-aligned"
              ],
              "answer": 2,
              "explain": "Because the boundary is induced point-by-point, kNN can fit complex nonlinear shapes with no explicit model."
            },
            {
              "q": "To speed up kNN prediction on a very large dataset, you can use:",
              "choices": [
                "Gradient descent",
                "A larger learning rate",
                "More training epochs",
                "KD-trees or approximate nearest-neighbor search"
              ],
              "answer": 3,
              "explain": "kNN has no training, but each query scans the data ($O(n)$); spatial structures (KD/ball-trees) or approximate NN cut that cost."
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
            },
            {
              "front": "What is kNN's cost at prediction time?",
              "back": "There is no training — it just stores the data — but each prediction is $O(n\\cdot d)$: it must scan all $n$ points. So it is slow to predict on large datasets; KD-trees or approximate nearest-neighbor search speed it up."
            }
          ],
          "homework": [
            {
              "prompt": "You build a kNN classifier on (age, annual income) without scaling and find it performs no better than guessing the majority class. Explain what likely went wrong and how to fix it.",
              "hint": "Compare the numeric ranges of the two features — which one dominates a Euclidean distance, and what preprocessing puts them on equal footing?",
              "solution": "Income has a vastly larger numeric range than age, so Euclidean distance is dominated by income differences and age is effectively ignored — neighbors are chosen almost entirely by income. Standardize both features (subtract mean, divide by standard deviation) or min-max normalize them so each contributes comparably, then refit. Distance-based methods require scaled features."
            },
            {
              "prompt": "For a fixed dataset, describe what happens to the training error and the test (generalization) behavior of kNN as k goes from 1 to n. Why is k=1 not the best choice despite its zero training error?",
              "hint": "Think bias–variance: k=1 fits every point (including noise), large k oversmooths. What does that do to overfitting versus underfitting?",
              "solution": "At k=1 the training error is 0 (each point is its own nearest neighbor) but the model overfits noise — high variance, jagged boundary, poor test accuracy. As k grows, the boundary smooths: variance drops and bias rises. At k=n every prediction is the global majority class (maximally biased). The best test accuracy is at an intermediate k found by cross-validation; k=1's zero training error is a classic overfitting trap, not a sign of a good model."
            },
            {
              "prompt": "Training points: $A=(1,1)$ labeled blue and $B=(4,4)$ labeled red. Classify the query $(2,2)$ with 1-NN under Euclidean distance.",
              "hint": "Compute the distance from the query to each point; the nearest one's label wins.",
              "solution": "$d(q,A)=\\sqrt{(2-1)^2+(2-1)^2}=\\sqrt 2\\approx 1.41$; $d(q,B)=\\sqrt{(2-4)^2+(2-4)^2}=\\sqrt 8\\approx 2.83$. The query is closer to $A$, so 1-NN predicts <b>blue</b>."
            }
          ],
          "examples": [
            {
              "title": "Classifying a point by 3-NN, step by step",
              "body": "Training points (feature x, label): (1, A), (2, A), (5, B), (6, B), (7, B). Classify a query at x = 4 using 3-NN with absolute-value (1-D Euclidean) distance.",
              "solution": "Distances from 4: |4-1|=3, |4-2|=2, |4-5|=1, |4-6|=2, |4-7|=3. The three smallest are 1 (point 5, B), 2 (point 2, A), 2 (point 6, B) — neighbors {B, A, B}. Majority vote → B. Note the query sat between the clusters, and the nearest single point (x=5, B) plus one more B outvoted the lone A."
            },
            {
              "title": "How scaling flips the nearest neighbor",
              "body": "Two training points: P = (age 30, income 40000, class 'declines') and Q = (age 50, income 41000, class 'accepts'). Query R = (age 31, income 41000). Which neighbor is closer, unscaled vs. standardized?",
              "solution": "Unscaled Euclidean: to P = sqrt(1^2 + 1000^2) ≈ 1000.0; to Q = sqrt(19^2 + 0^2) = 19. So R is 'nearest' to Q — decided entirely by income. But R is 1 year from P in age and 19 years from Q. After standardizing (so age and income have comparable spread), the 1-year age gap to P outweighs the tiny income gap, and R becomes nearest to P instead. Same data, opposite neighbor — scaling changed the answer."
            },
            {
              "title": "Distance-weighted kNN can flip the vote",
              "body": "A query's 3 nearest neighbors are: class A at distances 2 and 2.5, and class B at distance 1. Plain majority vote among the 3 says A (2 votes to 1). Does <em>distance-weighted</em> kNN agree?",
              "solution": "Distance weighting gives each neighbor a vote of $1/d$, so closer neighbors count more. Class A's weight is $\\tfrac{1}{2}+\\tfrac{1}{2.5}=0.5+0.4=0.9$; class B's is $\\tfrac{1}{1}=1.0$. Weighted vote: B wins, $1.0 > 0.9$ — even though A had more <em>neighbors</em>, B's single neighbor is so close it dominates. Distance weighting makes kNN smoother and less sensitive to the exact choice of $k$ (a far-away $k$-th neighbor barely matters), which is why it is often preferred to plain majority vote."
            }
          ]
        },
        {
          "id": "ml-decision-trees",
          "title": "Decision Trees: Learning by Asking Questions",
          "minutes": 18,
          "content": "<h3>1. The hook: a flowchart that learns itself</h3>\n<p>Play twenty questions and you are running a decision tree: each yes/no answer narrows the possibilities until you are confident. A <strong>decision tree</strong> is exactly that — a flowchart of simple tests, learned automatically from data. Ask \"is petal length less than 2.5 cm?\", branch, ask another question, branch again, and eventually arrive at a verdict. Unlike kNN (which keeps all the data) or linear models (which fit weights), a tree distills the data into a readable set of <em>if-then rules</em> — which is why decision trees are the most <em>interpretable</em> model in mainstream machine learning.</p>\n\n<h3>2. Anatomy of a tree</h3>\n<p>A tree has three kinds of node. The <strong>root</strong> holds the first question. Each <strong>internal node</strong> is a test on one feature (e.g. \"age $\\gt$ 30?\") with one branch per outcome. Each <strong>leaf</strong> carries a prediction — a class label (classification) or a number (regression). Following the path from root to leaf reads off a rule like \"if age $\\gt$ 30 and income $\\lt$ 40k then predict 'declines'.\" The whole tree is just a nested pile of such rules.</p>\n\n<h3>3. How a tree learns: greedy recursive splitting</h3>\n<p>Trees are grown <strong>top-down</strong>. Starting with all the data at the root, the algorithm asks: <em>of every possible feature and split threshold, which one best separates the classes?</em> It picks that split, partitions the data into children, and then <em>recurses</em> on each child — splitting again and again until a stopping rule fires (a leaf is pure, too few samples remain, or a depth limit is hit). This is the CART / ID3 family of algorithms. The key question is what \"best separates\" means — that needs a measure of <em>node impurity</em>.</p>\n\n<h3>4. Splitting criteria: impurity</h3>\n<p>A node is <em>pure</em> if all its samples share one class. We want splits that make children purer than the parent. Two impurity measures dominate, both functions of the class proportions $p_i$ in a node:</p>\n<ul>\n<li><strong>Gini impurity</strong>: $G = 1 - \\sum_i p_i^2$ — the chance you would mislabel a random sample if you guessed by the node's class frequencies. Zero when pure, maximal when classes are balanced.</li>\n<li><strong>Entropy</strong>: $H = -\\sum_i p_i \\log_2 p_i$ — the average \"surprise\" (in bits) of the labels. Also zero when pure, maximal when balanced.</li>\n</ul>\n<p>For a candidate split, compute the <strong>information gain</strong> — the parent's impurity minus the size-weighted average impurity of the children: $$\\text{IG} = H(\\text{parent}) - \\sum_k \\frac{n_k}{n}\\, H(\\text{child}_k).$$ The algorithm greedily picks the split with the largest gain (largest impurity drop). For <em>regression</em> trees the same idea uses <em>variance</em> reduction instead of class impurity.</p>\n\n<p><b>Try it in code.</b> Compute the Gini impurity of a node with 6 of class A and 2 of class B — the lower it is, the purer the node.</p>\n<div data-code=\"javascript\" data-expected=\"0.375\">// Gini impurity of a node, from its class counts\nfunction gini(counts) {\n  const n = counts.reduce((a,b)=>a+b, 0);\n  const sumSq = counts.reduce((a,c)=>a + (c/n)*(c/n), 0);  // sum of squared class proportions\n  return 1 - sumSq;\n}\nconsole.log(gini([6,2]).toFixed(3));  // 6 of class A, 2 of class B</div>\n<p class=\"see-also\"><b>See also:</b> the <em>information gain</em> that ranks splits is exactly the <a href=\"#/lesson/information-theory/it-mutual-information\" data-route>mutual information</a> from information theory — the entropy of the label reduced by knowing the feature.</p>\n<h3>5. A split, by the numbers</h3>\n<div data-viz=\"ml-information-gain\"></div>\n<p>Suppose a node has 10 samples: 5 positive, 5 negative — maximally impure, $G = 1 - (0.5^2 + 0.5^2) = 0.5$. A candidate split sends 4 samples left (4 positive, 0 negative — pure, $G=0$) and 6 right (1 positive, 5 negative, $G = 1 - ((1/6)^2 + (5/6)^2) \\approx 0.278$). The weighted child impurity is $\\tfrac{4}{10}(0) + \\tfrac{6}{10}(0.278) = 0.167$, an impurity <em>drop</em> of $0.5 - 0.167 = 0.333$. A competing split with a smaller drop loses. That single comparison, repeated over every feature and threshold, is the whole training loop.</p>\n\n<div data-viz=\"ml-tree-viz\"></div>\n<h3>6. Overfitting: a tree can memorize</h3>\n<p>Left unchecked, a tree will keep splitting until <em>every leaf is pure</em> — in the worst case, one leaf per training point. That tree has 100% training accuracy and has simply <em>memorized</em> the data, noise included; it generalizes terribly. Decision trees are the poster child for overfitting precisely because their capacity grows without bound as they deepen.</p>\n\n<h3>7. Taming the tree: pruning and limits</h3>\n<p>Two remedies. <strong>Pre-pruning</strong> stops growth early: cap the maximum depth, require a minimum number of samples to split a node or to form a leaf, or demand a minimum impurity decrease. <strong>Post-pruning</strong> grows a full tree then snips back branches that don't help a validation set — <em>cost-complexity pruning</em> formalizes this by penalizing the tree's size. Both trade a little training accuracy for much better generalization.</p>\n\n<h3>8. The big picture</h3>\n<p>A decision tree turns data into a transparent cascade of questions by greedily choosing impurity-reducing splits, then prunes to avoid memorizing. Its gifts — interpretability, no need for feature scaling, native handling of mixed feature types and feature interactions — make it a favorite. Its curse is <em>instability</em>: one tree is high-variance and rarely top-accuracy alone. That weakness is exactly what <strong>ensembles</strong> (random forests, gradient boosting — coming later in this topic) were invented to fix, by combining many trees.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why trees are greedy (and what that costs)</summary>\n<p>Growing a decision tree top-down, one locally-best split at a time, is a <b>greedy heuristic</b> — and it has to be, because finding the <em>optimal</em> tree is intractable.</p>\n<p><b>The hardness.</b> Constructing the smallest (or most accurate) decision tree consistent with the data is <b>NP-hard</b>: the number of possible trees explodes combinatorially, so you cannot search them all. CART and ID3 sidestep this by never reconsidering — at each node they grab the single split with the highest immediate information gain and move on.</p>\n<p><b>The cost of greed.</b> Locally-best is not globally-best. A split that looks weak now might enable two excellent splits below it, and the greedy algorithm will miss that (it is the same exploration-vs-immediate-reward issue greedy algorithms always have). This is one reason a single tree is brittle, and why a feature interaction that needs two coordinated splits can be hard for a greedy tree to discover.</p>\n<p>The \"aha\": decision-tree training is a greedy approximation to an NP-hard search. That greed buys speed (training is fast and scalable) at the price of optimality and stability — and recovering some of that lost accuracy is precisely what boosting and random forests do by growing <em>many</em> imperfect trees and combining them.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: Gini vs entropy — do they actually differ?</summary>\n<p>Two impurity measures, almost identical in practice — but they measure subtly different things.</p>\n<p><b>Entropy</b> $H = -\\sum_i p_i \\log_2 p_i$ is the average <em>surprisal</em> of the labels in bits (straight from information theory); the corresponding split score, <em>information gain</em>, is the reduction in label uncertainty. <b>Gini</b> $G = 1 - \\sum_i p_i^2$ is the probability of <em>misclassifying</em> a sample labeled at random according to the node's class frequencies. Both are $0$ at purity and maximal when classes are balanced, and both are concave, which is what makes any split (weakly) reduce impurity.</p>\n<p><b>Do they pick different trees?</b> Rarely. Empirically the two agree on the chosen split the large majority of the time; disagreements are minor and wash out after pruning. The practical differences: Gini avoids the $\\log$ so it is a touch <em>cheaper</em> to compute (the default in scikit-learn's CART), while entropy's information-gain framing connects trees to the same cross-entropy ideas used across the rest of machine learning.</p>\n<p>The \"aha\": don't agonize over Gini vs entropy — they are two concave impurity measures that almost always agree. Pick Gini for speed, entropy if you want the clean information-theoretic story; the bigger decisions (depth, pruning, ensembling) dwarf this one.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why trees thrive on messy real-world data</summary>\n<p>Beyond the greedy splitting and impurity math, decision trees have a cluster of <em>practical</em> virtues that explain why tree ensembles dominate tabular machine learning.</p>\n<p><b>No feature scaling.</b> Trees split one feature at a time on thresholds (\"is age $\\gt$ 30?\"), so they care only about the <em>order</em> of values, not their magnitude. Unlike kNN, SVMs, or k-means, a tree is completely <em>invariant to feature scaling</em> — no standardization needed, and monotonic transforms (like logs) leave the tree unchanged.</p>\n<p><b>Mixed and missing data.</b> Trees handle <em>numeric and categorical</em> features side by side natively (a categorical split just partitions the categories). Many implementations also cope with <em>missing values</em> gracefully — via surrogate splits or a learned default direction — instead of demanding imputation first.</p>\n<p><b>Feature interactions for free.</b> Because a split happens <em>within</em> the region carved out by the splits above it, a tree automatically models <em>interactions</em>: \"if income is high <em>and</em> age is low, then…\". A linear model only captures interactions if you hand-engineer the product features; a tree discovers them with depth.</p>\n<p>The \"aha\": trees win on real data not just for accuracy but for <em>convenience</em> — scale-invariant, comfortable with mixed types and missing values, and automatically capturing feature interactions. That low-friction robustness, amplified by ensembling, is why gradient-boosted trees and random forests are the default for tabular problems.</p>\n</details>\n",
          "mcq": [
            {
              "q": "How does a trained decision tree make a prediction for a new input?",
              "choices": [
                "It averages the predictions of all leaves",
                "It finds the k nearest training points and votes",
                "It multiplies the input by a learned weight vector",
                "It follows the feature tests from the root down to a leaf and returns that leaf's value"
              ],
              "answer": 3,
              "explain": "Prediction routes the input through the yes/no tests from root to a leaf; the leaf holds the predicted class or value."
            },
            {
              "q": "At each node, a greedy (CART/ID3) tree learner chooses the split that...",
              "choices": [
                "minimizes the depth of the tree",
                "produces exactly two equal-sized children",
                "uses the feature with the largest numeric values",
                "most reduces the impurity of the resulting child nodes"
              ],
              "answer": 3,
              "explain": "Greedy top-down induction picks, at each node, the feature/threshold giving the largest impurity decrease (information gain)."
            },
            {
              "q": "The Gini impurity of a node with class proportions $p_i$ is",
              "choices": [
                "$\\sum_i p_i \\log_2 p_i$",
                "$1 - \\sum_i p_i^2$",
                "$\\sum_i p_i^2$",
                "$\\max_i p_i$"
              ],
              "answer": 1,
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
                "are interpretable as if-then rules and need no feature scaling",
                "require very large datasets to work at all"
              ],
              "answer": 2,
              "explain": "Trees read out as transparent rules and split on one feature at a time, so they are scale-invariant and need no standardization — unlike kNN."
            },
            {
              "q": "A key weakness of a single decision tree is that it is",
              "choices": [
                "unable to handle categorical features",
                "only usable for regression, not classification",
                "high-variance — a small change in the data can yield a very different tree",
                "incapable of modeling feature interactions"
              ],
              "answer": 2,
              "explain": "Single trees are unstable/high-variance; small data perturbations can change early splits and reshape the whole tree — which ensembles fix."
            },
            {
              "q": "Finding the globally optimal decision tree is",
              "choices": [
                "NP-hard, so practical learners use greedy top-down splitting",
                "trivial once the data is scaled",
                "solvable in linear time by sorting the features",
                "only possible with gradient descent"
              ],
              "answer": 0,
              "explain": "Optimal tree construction is NP-hard; CART/ID3 are greedy heuristics that take the locally-best split at each node rather than searching all trees."
            },
            {
              "q": "A node with 8 samples — 6 of class A and 2 of class B — has Gini impurity:",
              "choices": [
                "$0.375$",
                "$0.25$",
                "$0.5$",
                "$0.75$"
              ],
              "answer": 0,
              "explain": "$1-(0.75^2+0.25^2)=1-0.625=0.375$."
            },
            {
              "q": "That same node (6 A, 2 B) has entropy, in bits, closest to:",
              "choices": [
                "$1.0$",
                "$0.81$",
                "$0.5$",
                "$0$"
              ],
              "answer": 1,
              "explain": "$-(0.75\\log_2 0.75+0.25\\log_2 0.25)\\approx 0.81$ bits."
            },
            {
              "q": "A pure node (all samples of one class) has Gini impurity:",
              "choices": [
                "$1$",
                "$0.5$",
                "$0$",
                "$0.25$"
              ],
              "answer": 2,
              "explain": "With one class at probability 1, $1-1^2=0$ — no impurity, the goal of every split."
            },
            {
              "q": "For a two-class node, Gini impurity is largest ($0.5$) when:",
              "choices": [
                "There is a single sample",
                "One class dominates",
                "The node is pure",
                "The classes are split 50/50"
              ],
              "answer": 3,
              "explain": "Maximum impurity is maximum uncertainty — an even 50/50 mix; it falls to 0 as one class takes over."
            },
            {
              "q": "The information gain of a split equals:",
              "choices": [
                "Parent impurity minus the weighted average of the children's impurities",
                "The number of children produced",
                "The depth of the resulting subtree",
                "The sum of the children's impurities"
              ],
              "answer": 0,
              "explain": "Gain measures how much a split purifies the labels: $\\text{impurity(parent)}-\\sum_k \\tfrac{n_k}{n}\\,\\text{impurity(child}_k)$."
            },
            {
              "q": "Do decision trees require feature scaling or normalization?",
              "choices": [
                "Yes, exactly like kNN",
                "No — each split is a threshold test, invariant to monotonic rescaling",
                "Only for the root split",
                "Only when using entropy, not Gini"
              ],
              "answer": 1,
              "explain": "Splitting on \"feature ≤ threshold\" is unaffected by rescaling, so trees handle raw, mixed-scale, even categorical features directly."
            },
            {
              "q": "Pre-pruning (early stopping) constrains a decision tree using:",
              "choices": [
                "More trees",
                "A larger learning rate",
                "A maximum depth or a minimum number of samples per leaf",
                "Feature scaling"
              ],
              "answer": 2,
              "explain": "Limiting depth / leaf size (or a minimum gain) stops the tree before it memorizes noise; post-pruning instead trims a grown tree back."
            },
            {
              "q": "Compared with linear models, a single decision tree handles nonlinear relationships and feature interactions:",
              "choices": [
                "Only in two dimensions",
                "Only after a kernel transform",
                "Never",
                "Naturally, with no manual feature engineering"
              ],
              "answer": 3,
              "explain": "Axis-aligned splits compose into nonlinear, interaction-aware regions automatically — a key reason trees are so convenient."
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
            },
            {
              "front": "Do decision trees need feature scaling?",
              "back": "No. Each split is a threshold test on one feature, so the tree is invariant to monotonic rescaling. Trees also handle mixed numeric/categorical features and nonlinear boundaries with no preprocessing."
            }
          ],
          "homework": [
            {
              "prompt": "A node has 8 samples: 6 of class A and 2 of class B. Compute its Gini impurity and its entropy (in bits). Then a split sends all 6 A's left (pure) and both B's right (pure) — what is the information gain (impurity drop) for both measures?",
              "hint": "Gini = 1 − Σ pᵢ²; entropy = −Σ pᵢ log₂ pᵢ. Information gain = parent impurity minus the weighted average of the children's impurities (here both children are pure, so 0).",
              "solution": "Proportions p_A=6/8=0.75, p_B=0.25. Gini = 1 − (0.75² + 0.25²) = 1 − (0.5625 + 0.0625) = 0.375. Entropy = −(0.75·log2 0.75 + 0.25·log2 0.25) = −(0.75·(−0.415) + 0.25·(−2)) = 0.311 + 0.5 = 0.811 bits. Both children are pure (impurity 0), so the weighted child impurity is 0 for both measures. Information gain = parent − 0 = 0.375 (Gini) and 0.811 bits (entropy). A perfect split drives impurity to zero, so the gain equals the parent's impurity."
            },
            {
              "prompt": "Explain why a decision tree achieving 100% accuracy on its training set is usually a warning sign rather than a success, and name two ways to address it.",
              "hint": "Zero training error usually means the tree memorized the data — think overfitting, and how pruning, a depth limit, or an ensemble helps.",
              "solution": "100% training accuracy almost always means the tree grew deep enough to isolate individual points into pure leaves — it has memorized the training data including its noise, so it will generalize poorly (high variance, classic overfitting). The training score is not evidence of a good model; the test/validation score is. Fix it by restraining capacity: pre-pruning (cap max depth, require a minimum number of samples per leaf or to split, or a minimum impurity decrease) and/or post-pruning (grow fully, then cost-complexity-prune back branches that don't help a validation set). Ensembling (random forests) also reduces the variance."
            },
            {
              "prompt": "A node contains 6 positive and 2 negative examples. Compute its Gini impurity.",
              "hint": "Gini $=1-\\sum_i p_i^2$ over the class fractions.",
              "solution": "The fractions are $p_+=6/8=0.75$ and $p_-=0.25$. Gini $=1-(0.75^2+0.25^2)=1-(0.5625+0.0625)=\\mathbf{0.375}$. (A pure node scores 0; the worst 50/50 split scores 0.5.)"
            }
          ],
          "examples": [
            {
              "title": "Choosing the better split by information gain",
              "body": "A parent node has 10 samples (5 positive, 5 negative), Gini = 0.5. Split X yields children (4 pos / 0 neg) and (1 pos / 5 neg). Split Y yields (3 pos / 2 neg) and (2 pos / 3 neg). Which split does a Gini-based tree pick?",
              "solution": "Split X: left (4/0) is pure, G=0; right (1/5) has G = 1 − ((1/6)² + (5/6)²) = 1 − (0.028 + 0.694) = 0.278. Weighted = 0.4·0 + 0.6·0.278 = 0.167, gain = 0.5 − 0.167 = 0.333. Split Y: left (3/2) G = 1 − (0.6² + 0.4²) = 0.48; right (2/3) G = 0.48. Weighted = 0.5·0.48 + 0.5·0.48 = 0.48, gain = 0.5 − 0.48 = 0.02. Split X's gain (0.333) hugely beats Y's (0.02), so the tree picks X — it isolates a pure group, exactly what impurity reduction rewards."
            },
            {
              "title": "Depth limit vs a fully grown tree",
              "body": "On a noisy 2-feature dataset, a depth-unlimited tree scores 100% train / 71% test; a depth-3 tree scores 88% train / 84% test. Which model is better, and what does the gap tell you?",
              "solution": "The depth-3 tree is better: what matters is test performance (84% vs 71%), and it generalizes far better despite lower training accuracy. The unlimited tree's perfect train score with a 29-point train-test gap is textbook overfitting — it carved pure leaves around noisy points. The shallow tree's small 4-point gap shows it captured the real signal without memorizing noise. The lesson: maximize validation/test accuracy, not training accuracy, and use depth limits or pruning to control the train-test gap."
            },
            {
              "title": "Gini vs entropy on the same node",
              "body": "A node holds 7 positive and 3 negative examples (so $p=0.7$). Compute its impurity two ways — Gini and entropy — and check whether the choice changes anything.",
              "solution": "<b>Gini impurity</b> $=1-\\sum p_i^2 = 1-(0.7^2+0.3^2)=1-(0.49+0.09)=0.42$. <b>Entropy</b> $=-\\sum p_i\\log_2 p_i = -(0.7\\log_2 0.7 + 0.3\\log_2 0.3)\\approx 0.88$ bits. Both are positive (the node is impure) and both hit $0$ only for a pure node ($p=1$ or $p=0$) and peak at the 50/50 split. They differ in scale and curvature but rank splits almost identically, so trees give nearly the same structure either way — Gini is the common default mainly because it skips the logarithm and is a touch faster."
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
          "content": "<h3>1. The hook: the simplest useful predictor</h3>\n<p>You want to predict a number — a house price, a temperature, tomorrow's sales — from some features. The simplest model that could possibly work is a <strong>weighted sum</strong>: multiply each feature by an importance weight, add them up, add a baseline. That is <strong>linear regression</strong>, the oldest and most-used model in statistics and the foundation that logistic regression, regularization, and even neural networks build upon. Master it and you have the template for nearly every supervised learner that follows.</p>\n\n<h3>2. The model</h3>\n<p>Given a feature vector $x = (x_1, \\dots, x_d)$, a linear model predicts $$\\hat{y} = w_1 x_1 + w_2 x_2 + \\dots + w_d x_d + b = w^\\top x + b,$$ where the <strong>weights</strong> $w_j$ say how much each feature pushes the prediction and $b$ (the <strong>bias</strong> or intercept) is the baseline when all features are zero. Training means finding the $w$ and $b$ that fit the data best. With one feature this is the familiar \"line of best fit\"; with many features it is a hyperplane.</p>\n\n<div data-viz=\"ml-linreg-viz\"></div>\n<h3>3. The objective: least squares</h3>\n<p>\"Best fit\" needs a definition. Linear regression minimizes the <strong>mean squared error</strong> between predictions and truth: $$\\text{MSE}(w,b) = \\frac{1}{n}\\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2.$$ Each $(y_i - \\hat{y}_i)$ is a <em>residual</em> — how far the line misses point $i$. Squaring makes all errors positive, penalizes big misses heavily, and yields a smooth, convex objective with a single global minimum. Geometrically you are sliding and tilting the line to make the total squared vertical gap as small as possible.</p>\n\n<p><b>Try it in code.</b> Compute the mean squared error of the line y = 2x + 1 on three points (the loss least squares minimizes).</p>\n<div data-code=\"javascript\" data-expected=\"1.00\">const data = [[1,4], [2,4], [3,8]];   // (x, y) points\nconst pred = x => 2*x + 1;             // model y = 2x + 1\n// mean squared error over the data\nconst mse = data.reduce((s, pt) => { const e = pt[1] - pred(pt[0]); return s + e*e; }, 0) / data.length;\nconsole.log(mse.toFixed(2));</div>\n<h3>4. Two ways to solve it</h3>\n<p>Because MSE is convex and quadratic, there is a <strong>closed-form solution</strong> — the <em>normal equations</em>: stack the data into a matrix $X$ and solve $$w = (X^\\top X)^{-1} X^\\top y.$$ (Geometrically this projects $y$ onto the column space of $X$ — the least-squares-as-projection view.) For small-to-medium problems this is exact and instant. When the features or samples number in the millions, inverting $X^\\top X$ is too expensive, so you instead minimize the MSE by <strong>gradient descent</strong>, taking steps downhill on the loss — the same workhorse that trains neural nets.</p>\n\n<h3>5. Reading the coefficients</h3>\n<p>A great virtue of linear regression is <em>interpretability</em>. Each weight $w_j$ is the expected change in the prediction for a one-unit increase in feature $j$, <em>holding the other features fixed</em>. A positive $w_j$ means the feature pushes the target up; near zero means little effect. Because the weights carry the features' units, you often <em>standardize</em> features first so the magnitudes are comparable and you can read off which features matter most.</p>\n\n<h3>6. Evaluating the fit</h3>\n<p>The standard score is $R^2$ (the coefficient of determination): $$R^2 = 1 - \\frac{\\sum_i (y_i - \\hat{y}_i)^2}{\\sum_i (y_i - \\bar{y})^2},$$ the fraction of the target's variance the model explains. $R^2 = 1$ is a perfect fit; $R^2 = 0$ means the model does no better than always predicting the mean $\\bar{y}$. But beware: $R^2$ on the <em>training</em> set always rises as you add features, even useless ones — so a high training $R^2$ can hide overfitting. Always judge on held-out data.</p>\n\n<h3>7. When the line lies: assumptions and limits</h3>\n<p>Linear regression assumes the relationship is (roughly) linear and the noise is well-behaved. If the true relationship curves, a straight fit is biased no matter how much data you have (underfitting). With many correlated features it can overfit and its coefficients become unstable (<em>multicollinearity</em>). The next lesson — <em>regularization</em> — addresses exactly this, taming the weights to trade a little bias for much less variance.</p>\n\n<h3>8. The big picture</h3>\n<p>Linear regression is a weighted sum trained by minimizing squared error, solvable exactly (normal equations) or iteratively (gradient descent), and prized for interpretable coefficients and a clean $R^2$ score. It is the atom of supervised learning: swap the squared-error loss for a different one and add a squashing function, and you get logistic regression; add a penalty and you get ridge/lasso; stack many and add nonlinearities and you get a neural network.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why squared error? (the Gaussian/MLE story)</summary>\n<p>Why <em>square</em> the residuals rather than take absolute values or some other penalty? There is a deep statistical reason, not just mathematical convenience.</p>\n<p><b>Squared error is maximum likelihood under Gaussian noise.</b> Assume the data is generated as $y_i = w^\\top x_i + b + \\varepsilon_i$ with the noise $\\varepsilon_i$ drawn independently from a Gaussian (normal) distribution. Writing down the likelihood of the data and maximizing it, the exponent of the Gaussian is $-(y_i - \\hat{y}_i)^2/(2\\sigma^2)$ — so <em>maximizing</em> the log-likelihood is exactly <em>minimizing</em> the sum of squared residuals. Least squares is not an arbitrary choice; it is the MLE whenever you believe the errors are Gaussian.</p>\n<p><b>The flip side: outliers.</b> Because the penalty grows with the <em>square</em> of the residual, a single far-off point can dominate the fit and drag the line toward it. If your noise has heavy tails or outliers, the Gaussian assumption is wrong, and robust losses — absolute error (MAE, the MLE under a Laplace distribution) or the Huber loss (quadratic near zero, linear in the tails) — fit better.</p>\n<p>The \"aha\": the loss you choose encodes an assumption about the noise. Squared error quietly assumes Gaussian errors (and gives you the clean closed form and convexity as a bonus); when that assumption breaks, switch losses rather than blaming the model.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: \"linear\" means linear in the parameters, not the features</summary>\n<p>A common misconception is that linear regression can only fit straight lines. It can fit wild curves — the word \"linear\" refers to the <em>weights</em>, not the inputs.</p>\n<p><b>Transform the features, keep the linear solver.</b> The model is linear in $w$: $\\hat{y} = \\sum_j w_j \\phi_j(x)$ for <em>any</em> fixed feature functions $\\phi_j$. Choose $\\phi(x) = (1, x, x^2, x^3)$ and you are doing <b>polynomial regression</b> — fitting a cubic — yet the math is still ordinary least squares, because each new column ($x^2$, $x^3$) is just another feature. Logs, interactions ($x_1 x_2$), sines, indicator variables: all are fair game. The decision boundary or curve becomes nonlinear in $x$ while the optimization stays the easy linear problem in $w$.</p>\n<p><b>Where it leads.</b> This \"lift the features into a richer space, then fit linearly\" idea is exactly the <em>kernel trick</em> in disguise (used by SVMs) and the reason classical ML leans so hard on <em>feature engineering</em>. It also warns you about overfitting: a high-degree polynomial has many weights and will happily wiggle through every training point.</p>\n<p>The \"aha\": linear regression's reach is far wider than straight lines. Because it is linear <em>in the parameters</em>, transforming the inputs lets one simple, convex solver fit polynomials, interactions, and more — the workhorse trick behind much of classical machine learning.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: multicollinearity — when correlated features wreck the coefficients</summary>\n<p>Linear regression's prized interpretability (\"$w_j$ is the effect of feature $j$, holding the others fixed\") quietly breaks when features are <em>correlated</em> — a condition called <strong>multicollinearity</strong>.</p>\n<p><b>What goes wrong.</b> If two features move together, the data cannot tell their separate effects apart: many weight combinations fit almost equally well. Mathematically, $X^\\top X$ becomes nearly singular (ill-conditioned), so its inverse blows up and the coefficients become <em>huge, unstable, and can flip sign</em> from one sample to the next. Worse, \"holding the others fixed\" is a fiction when the features never vary independently, so individual coefficients become <em>uninterpretable</em> even though the model still predicts fine.</p>\n<p><b>Predictions vs interpretation.</b> Crucially, multicollinearity barely hurts <em>predictive</em> accuracy — the fitted $\\hat{y}$ is fine. It is the <em>interpretation</em> of individual weights that collapses. So if you only care about prediction, you can ignore it; if you want to explain <em>which</em> feature matters, you cannot trust the coefficients.</p>\n<p><b>Detect and fix.</b> Detect it with the <em>variance inflation factor</em> (VIF), or just by spotting wildly large, sign-flipping coefficients. Fixes: drop redundant features, combine them (PCA), or — most simply — add <em>ridge</em> regularization, whose $\\lambda I$ term (the next lesson) directly cures the ill-conditioning by making $X^\\top X + \\lambda I$ well-behaved.</p>\n<p>The \"aha\": correlated features do not ruin predictions, they ruin <em>explanations</em>. Multicollinearity makes $X^\\top X$ ill-conditioned, so coefficients balloon and flip — and \"holding the others fixed\" stops meaning anything. Ridge regularization is the standard antidote.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: survival analysis — regression for time-to-event with censoring</summary>\n<p>Sometimes the target is not a value but a <em>time until something happens</em> — death, churn, machine failure, loan default. The complication is <b>censoring</b>: when the study ends, many subjects simply have not had the event yet, so you know only \"survived past $t$,\" not the exact time. Dropping those cases or pretending the cutoff was the event time both bias the answer badly, which is why survival analysis exists.</p>\n<p>Two objects organize it. The <b>survival function</b> $S(t)=P(T>t)$ is the chance of lasting beyond $t$; the <b>hazard</b> $h(t)=f(t)/S(t)$ is the instantaneous event rate <em>given</em> survival so far. They are two views of one thing, $S(t)=\\exp\\!\\big(-\\!\\int_0^t h(u)\\,du\\big)$, and a constant hazard is exactly the memoryless <a href=\"#/lesson/probability-statistics/ps-uniform-exponential\" data-route>exponential distribution</a>. The Kaplan-Meier estimator reads $S(t)$ straight off censored data as a staircase, dropping at each event by the fraction then at risk.</p>\n<p>The regression workhorse is the <b>Cox proportional-hazards</b> model, $h(t\\mid x)=h_0(t)\\,e^{\\beta^\\top x}$: covariates multiply a shared but unspecified baseline hazard, so you estimate feature effects as hazard ratios $e^{\\beta}$ by partial likelihood <em>without</em> ever modelling $h_0$. It powers clinical trials, reliability engineering, churn and time-to-default, and customer-lifetime-value — the assumption to check being that those hazard ratios really stay constant over time.</p>\n</details>\n",
          "mcq": [
            {
              "q": "What does a linear regression model output?",
              "choices": [
                "A weighted sum of the features plus a bias: $\\hat{y} = w^\\top x + b$",
                "A probability between 0 and 1",
                "The nearest training label",
                "The majority class of the dataset"
              ],
              "answer": 0,
              "explain": "Linear regression predicts a continuous value as a weighted sum of the inputs plus an intercept; there is no squashing into [0,1]."
            },
            {
              "q": "Least-squares training chooses the weights that",
              "choices": [
                "minimize the largest single residual only",
                "maximize the number of points the line passes through exactly",
                "minimize the mean squared residual (MSE)",
                "set all weights equal"
              ],
              "answer": 2,
              "explain": "Ordinary least squares minimizes the average squared difference between predictions and targets — a smooth convex objective."
            },
            {
              "q": "The closed-form 'normal equations' solution for the weights is",
              "choices": [
                "$w = X^\\top y$",
                "$w = X^{-1} y$",
                "$w = (X^\\top X)^{-1} X^\\top y$",
                "$w = \\tfrac{1}{n}\\sum_i y_i$"
              ],
              "answer": 2,
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
                "The probability that feature $j$ is relevant",
                "The expected change in the prediction per one-unit increase in feature $j$, holding the others fixed",
                "The correlation between feature $j$ and every other feature",
                "The number of times feature $j$ appears in the data"
              ],
              "answer": 1,
              "explain": "Each weight is the marginal effect of its feature on the prediction, all else equal — which is why linear regression is so interpretable."
            },
            {
              "q": "What does $R^2$ measure?",
              "choices": [
                "The total number of features used",
                "The fraction of the target's variance the model explains",
                "The model's training time",
                "The probability the model is correct"
              ],
              "answer": 1,
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
                "fit nonlinear curves by transforming features (e.g. add $x^2$), still solving a linear problem in $w$",
                "only ever fit straight lines",
                "never use more than one feature",
                "skip the bias term"
              ],
              "answer": 0,
              "explain": "The model is linear in the weights, so transformed features (polynomials, logs, interactions) let it fit curves while the optimization stays ordinary least squares."
            },
            {
              "q": "A model predicts price (in thousands) as $\\hat y=50+0.10\\cdot(\\text{size})-5\\cdot(\\text{age})$. For a 2000 sq ft, 10-year-old house, $\\hat y$ is:",
              "choices": [
                "$200$",
                "$250$",
                "$150$",
                "$2050$"
              ],
              "answer": 0,
              "explain": "$50+0.10(2000)-5(10)=50+200-50=200$ (thousand)."
            },
            {
              "q": "An $R^2$ of $1$ means the model:",
              "choices": [
                "Is no better than predicting the mean",
                "Fits perfectly — the residuals are all zero",
                "Has definitely overfit",
                "Is undefined"
              ],
              "answer": 1,
              "explain": "$R^2$ is the fraction of variance explained; $1$ means none is left unexplained."
            },
            {
              "q": "An $R^2$ of $0$ means the model:",
              "choices": [
                "Is the best possible",
                "Fits perfectly",
                "Does no better than just predicting the mean",
                "Has negative error"
              ],
              "answer": 2,
              "explain": "$R^2=0$ means the fit explains none of the variance beyond the constant mean baseline."
            },
            {
              "q": "Ordinary least squares is especially sensitive to:",
              "choices": [
                "Categorical labels only",
                "The ordering of the features",
                "The random seed",
                "Outliers — squared error amplifies large residuals"
              ],
              "answer": 3,
              "explain": "Squaring makes one far-off point dominate the loss; robust losses (Huber) or removing outliers help."
            },
            {
              "q": "Adding another feature to an OLS fit changes the training $R^2$:",
              "choices": [
                "It can only stay the same or increase",
                "It always decreases",
                "It stays exactly unchanged",
                "It drops to 0"
              ],
              "answer": 0,
              "explain": "More features never raise training error, so training $R^2$ never falls — which is why we use a validation set or adjusted $R^2$."
            },
            {
              "q": "Linear regression assumes the relationship between features and target is:",
              "choices": [
                "Always quadratic",
                "Approximately linear",
                "Exponential",
                "Purely random"
              ],
              "answer": 1,
              "explain": "It fits a hyperplane; strongly nonlinear relationships need feature transforms or a different model."
            },
            {
              "q": "When two features are strongly correlated (multicollinearity), the OLS coefficients become:",
              "choices": [
                "Always equal to each other",
                "Exactly zero",
                "Unstable and hard to interpret (high variance)",
                "More accurate"
              ],
              "answer": 2,
              "explain": "The fit cannot tell the correlated features apart, so their weights swing wildly; ridge regression stabilizes them."
            },
            {
              "q": "Homoscedasticity, a standard linear-regression assumption, means:",
              "choices": [
                "The mean residual is large",
                "The features are independent",
                "The target is Gaussian",
                "The residual variance is constant across inputs"
              ],
              "answer": 3,
              "explain": "Constant-variance residuals justify the usual standard errors; non-constant (heteroscedastic) errors call for weighted or robust methods."
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
            },
            {
              "front": "Key assumptions and weaknesses of linear regression?",
              "back": "It assumes a roughly linear relationship and, using squared error, is sensitive to outliers. Strongly correlated features make the coefficients unstable. Remedies: transform features, use a robust loss, or regularize (ridge/lasso)."
            }
          ],
          "homework": [
            {
              "prompt": "A simple linear model predicts house price (in thousands of dollars) as ŷ = 50 + 0.10·(size in sq ft) − 5·(age in years). Interpret each coefficient, and predict the price of a 2000 sq ft, 10-year-old house.",
              "hint": "Each coefficient is the change in the prediction per one-unit change in that feature, holding the others fixed. Plug the numbers into the equation for the price.",
              "solution": "Prices are in thousands of dollars. Intercept 50: a hypothetical 0 sq ft, 0-year house has the baseline 50 (i.e. 50k; not physically meaningful, just the anchor). Size coefficient 0.10: each additional square foot adds 0.10 to the prediction, i.e. 100 dollars, holding age fixed. Age coefficient −5: each additional year of age lowers the prediction by 5, i.e. 5,000 dollars, holding size fixed. Prediction: 50 + 0.10·2000 − 5·10 = 50 + 200 − 50 = 200, i.e. 200,000 dollars."
            },
            {
              "prompt": "A colleague brags that adding 20 more features raised their model's R² from 0.72 to 0.95 on the training set, calling it a big improvement. Why should you be skeptical, and what would convince you?",
              "hint": "On the training set R² only ever rises as you add features. What would a held-out (validation) check or adjusted R² reveal about real improvement?",
              "solution": "Training R² never decreases when you add features — even pure-noise features can only increase it, because the model has more freedom to fit the training points (including their noise). So a jump from 0.72 to 0.95 on training data is expected and not evidence of a better model; it may well be overfitting. What would convince you is improvement on held-out/test data (or cross-validated R²): if test R² also rose, the extra features carry real signal; if test R² fell or barely moved while training R² soared, it's overfitting. Adjusted R² or a validation curve would also help."
            },
            {
              "prompt": "Fit $y=wx$ (through the origin, no intercept) by least squares to the points $(1,2),(2,4),(3,5)$. Use $w=\\dfrac{\\sum x_i y_i}{\\sum x_i^2}$.",
              "hint": "Sum the products $x_i y_i$ on top and the squares $x_i^2$ on the bottom.",
              "solution": "$\\sum x_i y_i = 1\\cdot 2 + 2\\cdot 4 + 3\\cdot 5 = 25$; $\\sum x_i^2 = 1+4+9 = 14$. So $w = 25/14 \\approx \\mathbf{1.79}$ — the slope that minimizes the squared residuals."
            }
          ],
          "examples": [
            {
              "title": "Predictions, residuals, and MSE by hand",
              "body": "Model ŷ = 2x + 1. Data points (x, y): (1, 4), (2, 4), (3, 8). Compute the predictions, residuals, and the MSE.",
              "solution": "Predictions: at x=1, ŷ=3; x=2, ŷ=5; x=3, ŷ=7. Residuals (y − ŷ): 4−3 = +1; 4−5 = −1; 8−7 = +1. Squared residuals: 1, 1, 1. MSE = (1+1+1)/3 = 1.0. The line is slightly off each point by 1 unit; least-squares training would adjust the slope and intercept to reduce this total squared miss (here the fit is already quite good and balanced, since the residuals sum to +1, near zero)."
            },
            {
              "title": "Fitting a parabola with 'linear' regression",
              "body": "Your data clearly curves like a U, so a straight line underfits badly. How can linear regression fit it without changing the algorithm?",
              "solution": "Add a transformed feature. Instead of fitting ŷ = w₁x + b, create a second feature x² and fit ŷ = w₁x + w₂x² + b. This is still ordinary least squares — you've just added a column to the design matrix — but the fitted curve is now a parabola in x. The model is linear in the parameters (w₁, w₂, b), so the same closed-form/gradient solver applies, yet it captures the U-shape. (Caution: keep adding powers and you'll eventually overfit, wiggling through every point.)"
            },
            {
              "title": "R²: how much variance the model explains",
              "body": "A model predicts house prices. The actual values are $y=[3,5,7]$ and the predictions are $\\hat y=[2.5,5,7.5]$ (in hundreds of thousands). The mean is $\\bar y=5$. Compute $R^2$, the fraction of variance the model explains.",
              "solution": "$R^2$ compares the model's squared error to the error of just predicting the mean. Residual sum of squares: $SS_{\\text{res}}=\\sum(y-\\hat y)^2=(0.5)^2+0^2+(-0.5)^2=0.5$. Total sum of squares: $SS_{\\text{tot}}=\\sum(y-\\bar y)^2=(-2)^2+0^2+(2)^2=8$. Then $R^2=1-\\frac{SS_{\\text{res}}}{SS_{\\text{tot}}}=1-\\frac{0.5}{8}=0.9375$ — the model explains about 94% of the variance in prices. Reading the scale: $R^2=1$ is a perfect fit, $R^2=0$ is no better than always guessing the mean, and $R^2$ can even go <em>negative</em> for a model worse than the mean. It is the standard one-number summary of regression fit."
            }
          ]
        },
        {
          "id": "ml-logistic-regression",
          "title": "Logistic Regression: From Scores to Probabilities",
          "minutes": 17,
          "content": "<h3>1. The hook: predicting a class, not a number</h3>\n<p>Linear regression outputs any real number — fine for prices, useless for \"spam or not.\" For <em>classification</em> you want a <strong>probability</strong>: a number in $[0,1]$ saying how likely the positive class is. <strong>Logistic regression</strong> gets there with one small twist on the linear model: compute a linear score, then squash it through an S-shaped function into a probability. It is the workhorse classifier of classical ML — fast, interpretable, well-calibrated — and, as you will see, literally a single neuron.</p>\n\n<h3>2. The model: linear score, then a squash</h3>\n<p>First compute the same linear score as before, $z = w^\\top x + b$. Then pass it through the <strong>logistic (sigmoid)</strong> function $$\\sigma(z) = \\frac{1}{1 + e^{-z}},$$ which maps any real number to $(0,1)$: large positive $z$ gives $\\sigma \\to 1$, large negative gives $\\sigma \\to 0$, and $z=0$ gives exactly $0.5$. The output $\\hat{p} = \\sigma(w^\\top x + b)$ is read as \"the model's probability that $y=1$.\" To make a hard decision you threshold, usually predicting class 1 when $\\hat{p} \\ge 0.5$ (equivalently when $z \\ge 0$).</p>\n\n<h3>3. Why not just use linear regression?</h3>\n<p>You <em>could</em> fit a line to 0/1 labels, but it misbehaves: predictions shoot below 0 and above 1 (nonsensical as probabilities), and a few far-away points tilt the line and move the boundary. The sigmoid fixes both — outputs stay in $(0,1)$, and points far on the correct side barely affect the fit. Logistic regression gives genuine, usable probabilities; linear regression on labels does not.</p>\n\n<p><b>Try it in code.</b> Compute a logistic-regression prediction: linear score, then sigmoid to a probability, then threshold at 0.5.</p>\n<div data-code=\"javascript\" data-expected=\"0.50 1\">const sigmoid = z => 1 / (1 + Math.exp(-z));\nconst w = [2, -1], b = -1, x = [1, 1];\nconst z = w[0]*x[0] + w[1]*x[1] + b;   // linear score\nconst p = sigmoid(z);                  // probability of class 1\nconsole.log(p.toFixed(2), p >= 0.5 ? 1 : 0);</div>\n<h3>4. Training: cross-entropy (log loss)</h3>\n<p>We fit $w, b$ by <strong>maximum likelihood</strong> under a Bernoulli model, which is equivalent to minimizing the <strong>cross-entropy</strong> (log) loss: $$\\mathcal{L} = -\\frac{1}{n}\\sum_{i=1}^{n}\\Big[\\, y_i \\log \\hat{p}_i + (1-y_i)\\log(1-\\hat{p}_i)\\,\\Big].$$ It punishes confident wrong predictions enormously (predicting $\\hat{p}=0.01$ when $y=1$ costs $-\\log(0.01) \\approx 4.6$). There is no closed-form solution like the normal equations, but the loss is <em>convex</em>, so gradient descent reliably finds the global optimum.</p>\n\n<div data-viz=\"ml-logreg-viz\"></div>\n<h3>5. The decision boundary is linear</h3>\n<p>Despite the curvy sigmoid, logistic regression is a <strong>linear classifier</strong>. The boundary is the set of points where $\\hat{p} = 0.5$, i.e. $z = w^\\top x + b = 0$ — a straight line in 2D, a hyperplane in general. The sigmoid only controls how <em>confidence</em> ramps up as you move away from that boundary; it does not bend the boundary itself. (Want a curved boundary? Transform the features, exactly as with linear regression.)</p>\n\n<h3>6. Reading the coefficients: log-odds</h3>\n<p>Logistic regression is interpretable, just on a different scale. The linear score $z$ is the <strong>log-odds</strong> (logit) of the positive class: $z = \\log\\frac{p}{1-p}$. So a weight $w_j$ is the change in log-odds per unit of feature $j$, and $e^{w_j}$ is the <strong>odds multiplier</strong>: a coefficient of $0.7$ means each unit of that feature multiplies the odds by $e^{0.7} \\approx 2$ (roughly doubles them), holding others fixed.</p>\n\n<h3>7. More than two classes</h3>\n<p>For $K$ classes, generalize the sigmoid to the <strong>softmax</strong>, which turns $K$ linear scores into a probability distribution over the classes (this is <em>multinomial</em> / softmax regression). A simpler alternative is <em>one-vs-rest</em>: train one binary logistic classifier per class and pick the most confident. Either way the per-class boundaries stay linear.</p>\n\n<p class=\"see-also\"><b>See also:</b> the cross-entropy you minimize here is a <a href=\"#/lesson/deep-learning/dl-loss-functions\" data-route>negative log-likelihood</a> — the same loss that trains nearly every neural classifier.</p>\n<h3>8. The big picture</h3>\n<p>Logistic regression = linear score + sigmoid + cross-entropy loss, trained by gradient descent, giving calibrated probabilities and a linear decision boundary you can read as log-odds. It is exactly a <em>single artificial neuron</em> with a sigmoid activation — so understanding it <em>is</em> understanding the atom of a neural network. As a baseline it is hard to beat: when in doubt, fit a logistic regression first.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why cross-entropy, not squared error, for classification</summary>\n<p>It is tempting to reuse the squared-error loss on the sigmoid output, $(y - \\hat{p})^2$. Don't — it fails in two ways that cross-entropy avoids.</p>\n<p><b>Convexity.</b> Squared error composed with the sigmoid is <em>non-convex</em> in the weights, so gradient descent can stall in bad local minima. Cross-entropy composed with the sigmoid is <em>convex</em>, giving a single global optimum that gradient descent always reaches.</p>\n<p><b>Gradient strength.</b> When the model is <em>confidently wrong</em> (say $\\hat{p} \\approx 0$ but $y=1$), squared error's gradient is tiny — the sigmoid has saturated, its slope is near zero, and the chain rule multiplies the error by that vanishing slope. Learning crawls exactly when it should be fastest. With cross-entropy the math is kinder: the gradient of the loss with respect to the score is simply $\\hat{p} - y$, which is <em>large</em> precisely when the prediction is badly wrong. The sigmoid's troublesome slope cancels out.</p>\n<p>The \"aha\": cross-entropy is not just a different loss, it is the <em>right</em> loss for probabilistic classification — the Bernoulli maximum-likelihood objective, convex, with a clean $\\hat{p} - y$ gradient that learns fast from confident mistakes. This is the same reason deep classifiers use cross-entropy, not MSE, on their softmax outputs.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: logistic regression is a linear classifier in disguise</summary>\n<p>The sigmoid is nonlinear, so people assume logistic regression draws curved boundaries. It does not — the curve is in the <em>probabilities</em>, not the <em>boundary</em>.</p>\n<p><b>Where the classes split.</b> A point is classified positive when $\\hat{p} = \\sigma(z) \\gt 0.5$, and the sigmoid crosses $0.5$ exactly at $z = 0$. So the decision boundary is $\\{x : w^\\top x + b = 0\\}$ — a hyperplane, the same flat boundary a perceptron or linear SVM would draw. Moving away from it, the sigmoid smoothly ramps the predicted probability toward 0 or 1; that ramp is the only thing the nonlinearity adds. Two models with the same boundary direction but different weight magnitudes differ only in how <em>sharply</em> confidence changes, not in <em>where</em> the classes split.</p>\n<p><b>Getting nonlinear boundaries.</b> Exactly as with linear regression, you lift the features: add $x^2$, $x_1 x_2$, or kernel features, and the boundary becomes nonlinear in the original space while the model stays a linear classifier in the expanded space.</p>\n<p>The \"aha\": logistic regression is a <em>linear</em> classifier that happens to report calibrated probabilities. The sigmoid sets confidence, not boundary shape — so its decision surface is a hyperplane, and curvature comes only from engineering the features.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: calibration — when the probabilities themselves matter</summary>\n<p>Logistic regression's outputs are not just scores to threshold — they are <em>calibrated probabilities</em>, which is a real advantage whenever you need to <em>trust the number</em>, not only the label.</p>\n<p><b>What calibration means.</b> A classifier is <em>calibrated</em> if, among all the cases it assigns probability $0.8$, about $80\\%$ truly are positive. Logistic regression tends to be well-calibrated because it is trained by minimizing cross-entropy — a <em>proper scoring rule</em>, minimized exactly when the predicted probabilities match the true ones. So its $\\hat{p}$ can be used directly for decisions that depend on the probability: expected-value calculations, ranking by risk, or setting a cost-sensitive threshold.</p>\n<p><b>Many models are not calibrated.</b> An SVM outputs a signed distance, not a probability. Naive Bayes is usually <em>over</em>confident (its independence assumption pushes probabilities toward 0 and 1, as its own dive notes). Boosted trees are often miscalibrated too. For these you apply a post-hoc fix: <b>Platt scaling</b> (fit a logistic on the model's scores) or <b>isotonic regression</b> (a free-form monotonic remap), using a validation set.</p>\n<p>The \"aha\": getting the <em>label</em> right and getting the <em>probability</em> right are different goals. Logistic regression optimizes a proper scoring rule, so its probabilities are trustworthy out of the box — and when another model's are not, you calibrate it (Platt or isotonic) rather than reading its raw scores as probabilities.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: active learning — choosing what to label</summary>\n<p>Labels are the scarce resource: unlabeled data is cheap, but annotation costs money and time. <b>Active learning</b> turns labeling into a sequential decision — the model itself picks which unlabeled points are most worth a human label, so accuracy climbs with far fewer labels than random sampling.</p>\n<p>The simplest strategies query where the model is least sure. <em>Uncertainty sampling</em> ranks points by least confidence ($1-\\max_c p(c\\mid x)$), smallest margin between the top two classes, or highest predictive entropy $H(p(\\cdot\\mid x))=-\\sum_c p(c\\mid x)\\log p(c\\mid x)$ — all read straight off the class <a href=\"#/lesson/information-theory/it-entropy\" data-route>probabilities</a> a classifier like logistic regression already outputs. <em>Query-by-committee</em> trains several models and labels the points they disagree on most; Bayesian methods (BALD) pick points that most reduce model uncertainty.</p>\n<p>The catch is that greedy querying breaks the i.i.d. assumption — the labeled set becomes a biased, boundary-hugging sample, so naive uncertainty sampling can chase outliers and miss whole regions. Diversity- and density-weighted criteria, and batch-aware acquisition, counter this. It is the discrete cousin of Bayesian optimization's acquisition function: both spend a scarce query budget where information is highest.</p>\n</details>\n",
          "mcq": [
            {
              "q": "What does a logistic regression model output for an input?",
              "choices": [
                "The nearest class label by distance",
                "The cluster the point belongs to",
                "An unbounded real-valued score only",
                "A probability in (0,1) that the input is in the positive class"
              ],
              "answer": 3,
              "explain": "Logistic regression passes the linear score through a sigmoid, producing a calibrated probability in (0,1) for the positive class."
            },
            {
              "q": "The sigmoid function $\\sigma(z) = 1/(1+e^{-z})$ maps",
              "choices": [
                "(0,1) to all real numbers",
                "integers to integers",
                "any real number to the open interval (0,1)",
                "probabilities to log-odds"
              ],
              "answer": 2,
              "explain": "The sigmoid squashes the whole real line into (0,1): large +z → 1, large −z → 0, z=0 → 0.5."
            },
            {
              "q": "The decision boundary of logistic regression is",
              "choices": [
                "always a circle",
                "linear — the hyperplane $w^\\top x + b = 0$ where $\\hat{p}=0.5$",
                "curved because of the sigmoid",
                "undefined for probabilities"
              ],
              "answer": 1,
              "explain": "The boundary is where the probability is 0.5, i.e. z = w·x + b = 0 — a hyperplane. The sigmoid sets confidence, not the boundary's shape."
            },
            {
              "q": "Logistic regression is trained by minimizing",
              "choices": [
                "the cross-entropy (log) loss",
                "the number of misclassified points directly",
                "the squared error between probabilities and labels",
                "the distance to the nearest neighbor"
              ],
              "answer": 0,
              "explain": "Maximum likelihood under a Bernoulli model is equivalent to minimizing cross-entropy / log loss, which is convex in the weights."
            },
            {
              "q": "Why is squared error a poor loss for logistic regression?",
              "choices": [
                "It cannot be computed for probabilities",
                "It requires a closed-form solution",
                "It always predicts the majority class",
                "Combined with the sigmoid it is non-convex and gives weak gradients when confidently wrong"
              ],
              "answer": 3,
              "explain": "Squared-error-plus-sigmoid is non-convex and its gradient vanishes when the model is confidently wrong (saturated sigmoid). Cross-entropy is convex with a strong p−y gradient."
            },
            {
              "q": "How do you interpret a coefficient $w_j$ in logistic regression?",
              "choices": [
                "It changes the log-odds; $e^{w_j}$ is the odds multiplier per unit of feature $j$",
                "It is the Euclidean distance along axis $j$",
                "It has no interpretation",
                "It is the predicted probability of feature $j$"
              ],
              "answer": 0,
              "explain": "The linear score is the log-odds, so $w_j$ is the change in log-odds per unit feature, and $e^{w_j}$ multiplies the odds (all else fixed)."
            },
            {
              "q": "To classify more than two classes, logistic regression uses",
              "choices": [
                "k-means clustering",
                "a decision tree instead",
                "softmax (multinomial) regression or one-vs-rest",
                "nothing — it only does binary"
              ],
              "answer": 2,
              "explain": "Softmax generalizes the sigmoid to K classes (a distribution over classes); one-vs-rest trains one binary classifier per class. Boundaries stay linear."
            },
            {
              "q": "Logistic regression is mathematically equivalent to",
              "choices": [
                "a k-nearest-neighbor classifier",
                "a single artificial neuron with a sigmoid activation",
                "a fully grown decision tree",
                "an unsupervised clustering method"
              ],
              "answer": 1,
              "explain": "A logistic regression unit computes w·x+b then a sigmoid — exactly one neuron. It is the atom that neural networks stack and add nonlinearities to."
            },
            {
              "q": "The sigmoid evaluated at zero, $\\sigma(0)$, equals:",
              "choices": [
                "$0.5$",
                "$0$",
                "$1$",
                "$0.69$"
              ],
              "answer": 0,
              "explain": "$\\sigma(0)=\\dfrac{1}{1+e^{0}}=\\dfrac{1}{2}=0.5$ — the decision boundary sits at $z=0$."
            },
            {
              "q": "As $z\\to+\\infty$, the sigmoid $\\sigma(z)$:",
              "choices": [
                "Approaches $0$",
                "Approaches $1$",
                "Stays at $0.5$",
                "Diverges to infinity"
              ],
              "answer": 1,
              "explain": "$\\sigma$ squashes the real line into $(0,1)$: it tends to $1$ as $z\\to+\\infty$ and to $0$ as $z\\to-\\infty$."
            },
            {
              "q": "A logistic-regression coefficient $w_j=0.69$ means each one-unit increase in feature $j$:",
              "choices": [
                "Always doubles the probability",
                "Adds $0.69$ to the probability",
                "Multiplies the odds by about $2$ (since $e^{0.69}\\approx 2$)",
                "Has no effect"
              ],
              "answer": 2,
              "explain": "Coefficients are additive on the log-odds, so they are multiplicative on the odds: $e^{0.69}\\approx 2$."
            },
            {
              "q": "Logistic regression models the log-odds $\\log\\frac{p}{1-p}$ as:",
              "choices": [
                "A constant",
                "A quadratic function of the features",
                "The probability itself",
                "A linear function $w^\\top x+b$ of the features"
              ],
              "answer": 3,
              "explain": "It is a linear model in log-odds space; the sigmoid then maps that back to a probability."
            },
            {
              "q": "The log-loss (cross-entropy) of logistic regression, as a function of the weights, is:",
              "choices": [
                "Convex — a single global minimum",
                "Non-convex with many local minima",
                "Always zero",
                "Linear"
              ],
              "answer": 0,
              "explain": "Convexity is why logistic regression trains reliably to the global optimum (unlike squared error here)."
            },
            {
              "q": "Predicting the positive class when $\\sigma(z)\\ge 0.5$ is equivalent to the rule:",
              "choices": [
                "$z\\le 0$",
                "$z\\ge 0$",
                "$z=1$",
                "$z\\gt 1$"
              ],
              "answer": 1,
              "explain": "$\\sigma(z)\\ge 0.5\\iff z\\ge 0$, since $\\sigma(0)=0.5$ and $\\sigma$ is increasing."
            },
            {
              "q": "If $\\sigma(z)=0.9$ for an example, the model is:",
              "choices": [
                "Exactly on the decision boundary",
                "90% confident it is the negative class",
                "About 90% confident it is the positive class",
                "Underfitting"
              ],
              "answer": 2,
              "explain": "The sigmoid output is the predicted probability of the positive class."
            },
            {
              "q": "Logistic regression has:",
              "choices": [
                "No decision boundary",
                "Both a linear boundary and linear probabilities",
                "Both nonlinear",
                "A linear decision boundary, but a nonlinear (sigmoid) probability surface"
              ],
              "answer": 3,
              "explain": "The boundary $z=0$ is a hyperplane, yet the probability bends smoothly from 0 to 1 through the sigmoid."
            },
            {
              "q": "A known failure mode of pure uncertainty sampling in active learning is:",
              "choices": [
                "It requires calibrated probabilities to run at all",
                "It cannot be used with neural networks",
                "It always queries duplicate points",
                "The labeled set becomes a biased, boundary-hugging sample that can chase outliers and miss whole regions"
              ],
              "answer": 3,
              "explain": "Greedy querying breaks the i.i.d. assumption; diversity- and density-weighted acquisition counteract the bias."
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
            },
            {
              "front": "Why not use plain linear regression for classification?",
              "back": "Linear regression outputs unbounded numbers, not probabilities, and squared error even penalizes confident-correct predictions. Logistic regression squashes $w^\\top x+b$ through the sigmoid into a calibrated probability in $(0,1)$ and trains with log-loss."
            }
          ],
          "homework": [
            {
              "prompt": "A logistic spam classifier outputs the score z = w·x + b = −1.5 for an email. Compute the predicted probability of spam, and state the predicted class at a 0.5 threshold. Then say what z and the probability would be for a borderline email exactly on the decision boundary.",
              "hint": "Apply the sigmoid 1/(1 + e^(−z)). On the decision boundary the probability is exactly 0.5 — which value of z gives that?",
              "solution": "Probability = σ(−1.5) = 1/(1 + e^(1.5)) = 1/(1 + 4.4817) ≈ 1/5.4817 ≈ 0.182. Since 0.182 < 0.5, predict NOT spam (negative class). On the decision boundary the score is z = 0, giving σ(0) = 1/(1+1) = 0.5 exactly — the point of maximum uncertainty, where the classifier is indifferent between the two classes."
            },
            {
              "prompt": "In a logistic model for loan default, the coefficient on 'number of prior late payments' is 0.69. Interpret this on the odds scale, and explain why the effect on the probability is not constant per unit even though the effect on log-odds is.",
              "hint": "Exponentiate the coefficient: e^0.69 ≈ 2 is the odds multiplier. The sigmoid is non-linear, so the same log-odds step moves the probability by different amounts depending on where you start.",
              "solution": "On the log-odds scale the effect is constant: each additional late payment adds 0.69 to the log-odds of default. On the odds scale, e^(0.69) ≈ 2, so each late payment multiplies the odds of default by about 2 (doubles them), holding other features fixed. The effect on the PROBABILITY is not constant because the sigmoid is nonlinear: doubling the odds moves the probability a lot in the middle (e.g. 0.5 → 0.67) but very little near the extremes (0.99 → 0.995). Equal additive steps in log-odds (or equal multiplicative steps in odds) produce unequal changes in probability — the S-curve flattens at both ends."
            },
            {
              "prompt": "A logistic model outputs a linear score $z=1.5$. Compute the predicted probability $\\sigma(z)$ and the predicted class at threshold $0.5$.",
              "hint": "$\\sigma(z)=\\dfrac{1}{1+e^{-z}}$.",
              "solution": "$\\sigma(1.5)=\\dfrac{1}{1+e^{-1.5}}=\\dfrac{1}{1+0.223}\\approx \\mathbf{0.82}$. Since $0.82 \\ge 0.5$, predict the <b>positive</b> class."
            }
          ],
          "examples": [
            {
              "title": "Score to probability to class, by hand",
              "body": "A logistic model has weights w = (2, −1) and bias b = −1. For input x = (1, 1), compute z, the probability, and the predicted class (threshold 0.5).",
              "solution": "z = w·x + b = 2·1 + (−1)·1 + (−1) = 2 − 1 − 1 = 0. Then σ(0) = 1/(1 + e^0) = 1/2 = 0.5. The probability is exactly 0.5 — the input sits on the decision boundary. With a 'predict 1 if p ≥ 0.5' rule it is classified as the positive class (1), but it is maximally uncertain; any tiny change to a feature would tip it decisively one way or the other."
            },
            {
              "title": "Why a straight line on 0/1 labels misbehaves",
              "body": "You fit ordinary linear regression to binary labels (0 = healthy, 1 = sick) against a dosage feature, then add one patient with a very high dosage. What goes wrong that logistic regression avoids?",
              "solution": "Two problems. First, the fitted line is unbounded, so for high or low dosages it predicts values above 1 or below 0 — impossible as probabilities, with no sensible way to read them. Second, the single high-dosage point exerts strong leverage on the least-squares line, tilting it and shifting the implied 0.5 crossing (the decision threshold), so a far-away correct case degrades the boundary. Logistic regression avoids both: the sigmoid keeps outputs in (0,1), and points far on the correct side of the boundary contribute almost nothing to the cross-entropy gradient, so the boundary is stable."
            },
            {
              "title": "Log-loss rewards calibrated confidence",
              "body": "An email truly is spam (label $y=1$). Model A predicts $p=0.9$ (confident and correct); Model B predicts $p=0.1$ (confident and wrong). The cross-entropy loss for one example is $-[\\,y\\log p+(1-y)\\log(1-p)\\,]$. Compute each, and see why we train on this instead of accuracy.",
              "solution": "With $y=1$ the loss simplifies to $-\\log p$. Model A: $-\\log(0.9)\\approx 0.105$ — a tiny penalty for being confident and right. Model B: $-\\log(0.1)\\approx 2.303$ — a large penalty for being confident and wrong. The asymmetry is the whole point: log-loss barely charges a confident-correct prediction but punishes a confident-wrong one heavily, and it diverges to $+\\infty$ as $p\\to 0$ for a true positive. That gradient pushes the model toward <em>well-calibrated probabilities</em>, not merely correct labels — which is why classifiers are trained on cross-entropy rather than directly on accuracy (which is flat and non-differentiable)."
            }
          ]
        },
        {
          "id": "ml-regularization",
          "title": "Regularization: Ridge, Lasso & Taming the Weights",
          "minutes": 18,
          "content": "<h3>1. The hook: when fitting the data too well goes wrong</h3>\n<p>Give a linear model many features — especially correlated or noisy ones — and least squares will happily grow huge, see-sawing weights that fit the training data perfectly and generalize terribly. The cure is <strong>regularization</strong>: add a penalty that discourages large weights, nudging the model toward simpler explanations. It is the single most important idea for making linear (and most other) models actually work in practice, and it is a textbook bias-variance trade — accept a little bias to slash variance.</p>\n\n<h3>2. The idea: penalize complexity</h3>\n<p>Instead of minimizing just the fit error, minimize <em>fit error plus a penalty on the weights</em>: $$\\text{minimize}\\quad \\text{Loss}(w) + \\lambda\\, \\Omega(w),$$ where $\\Omega(w)$ measures how \"big\" the weights are and $\\lambda \\ge 0$ sets how much we care. With $\\lambda = 0$ you recover ordinary least squares; crank $\\lambda$ up and the model is forced to keep weights small, trading training accuracy for stability. The two classic choices of $\\Omega$ give ridge and lasso.</p>\n<p class=\"see-also\"><b>See also:</b> that penalty $\\Omega(w)$ is just a <a href=\"#/lesson/linear-algebra/la-dot-product-norms\" data-route>vector norm</a> of the weights — ridge penalizes the (squared) $\\ell_2$ norm, lasso the $\\ell_1$ norm. Regularization is, quite literally, \"keep the weight vector short.\"</p>\n\n<h3>3. Ridge regression (L2)</h3>\n<p><strong>Ridge</strong> penalizes the <em>sum of squared</em> weights, $\\Omega(w) = \\sum_j w_j^2$. It keeps a clean closed form — the normal equations gain a $\\lambda I$ term: $$w = (X^\\top X + \\lambda I)^{-1} X^\\top y.$$ That added $\\lambda I$ also makes the matrix invertible even when $X^\\top X$ is singular (e.g. more features than samples, or collinear features), curing the instability that plagues plain least squares. Ridge <em>shrinks</em> all weights smoothly toward zero but rarely sets any exactly to zero — every feature stays in the model, just with a smaller voice.</p>\n\n<h3>4. Lasso (L1)</h3>\n<p><strong>Lasso</strong> penalizes the <em>sum of absolute</em> weights, $\\Omega(w) = \\sum_j |w_j|$. Its signature behavior: it drives many weights <em>exactly to zero</em>, performing automatic <strong>feature selection</strong> and yielding a sparse, interpretable model that uses only a handful of features. The absolute value has a corner at zero (it is not differentiable there), so there is no closed form; lasso is solved by coordinate descent or subgradient methods.</p>\n\n<div data-viz=\"ml-reg-viz\"></div>\n<h3>5. Why L1 zeros weights and L2 doesn't</h3>\n<p>Picture the penalty as a budget: \"keep $\\Omega(w)$ within some size.\" For L2 that budget is a round ball; for L1 it is a diamond with sharp <em>corners poking out along the axes</em>. The best-fit solution expands until it touches that region, and a diamond is most often first touched <em>at a corner</em> — where some coordinates are exactly zero. The round L2 ball has no corners, so its contact point almost never zeroes a coordinate. That geometric difference is the whole reason lasso gives sparsity and ridge gives smooth shrinkage.</p>\n\n<p class=\"callout\"><b>See the optimization behind this:</b> the exact zeros come from <a href=\"#/lesson/calculus/c-proximal-projected\" data-route>soft-thresholding</a>, the proximal operator of the $\\ell_1$ penalty — the math that actually drives lasso's sparsity.</p>\n<p>Feel the difference numerically. Both penalties sum over the weights, but L2 <em>squares</em> each one — so a single large weight costs far more under L2 than L1. Run it on a weight vector with one big value:</p>\n<div data-code=\"javascript\" data-expected=\"L1 = 6.60, L2 = 14.26\">// L1 (lasso) sums |w|; L2 (ridge) sums w^2. Squaring makes L2 punish LARGE weights much harder.\nconst w = [3, 0.5, -2, 0.1, 1];\nlet l1 = 0, l2 = 0;\nfor (let i = 0; i &lt; w.length; i++) {\n  l1 += Math.abs(w[i]);   // L1: each weight counts by its size\n  l2 += w[i] * w[i];      // L2: each weight counts by its SQUARE\n}\n// the weight 3 adds 3 to L1 but 9 to L2 -- why L2 shrinks big weights and L1 zeros small ones\nconsole.log(\"L1 = \" + l1.toFixed(2) + \", L2 = \" + l2.toFixed(2));</div>\n<h3>6. The knob: choosing λ</h3>\n<p>$\\lambda$ is a hyperparameter, not learned from the training loss (which would just pick $\\lambda=0$). You choose it by <strong>cross-validation</strong>: try a range of $\\lambda$ values, measure validation error for each, keep the best. Plotting each weight against $\\lambda$ gives the <em>regularization path</em> — as $\\lambda$ grows from $0$, ridge weights glide toward zero while lasso weights snap to zero one by one. Small $\\lambda$ underregularizes (overfits); large $\\lambda$ overregularizes (underfits); the sweet spot is in between.</p>\n\n<h3>7. Elastic Net and a scaling caveat</h3>\n<p><strong>Elastic Net</strong> combines both penalties, $\\lambda_1\\sum_j |w_j| + \\lambda_2 \\sum_j w_j^2$, getting lasso's sparsity <em>and</em> ridge's stability with correlated features. One practical must: <strong>standardize your features first</strong>. The penalty sums over weights, so if features live on different scales the penalty hits them unequally and the results are arbitrary — exactly the scaling lesson from kNN, now for the regularizer.</p>\n\n<h3>8. The big picture</h3>\n<p>Regularization adds a \"keep it simple\" penalty to the loss: ridge (L2) shrinks all weights and stabilizes ill-conditioned problems; lasso (L1) zeros weights for feature selection; elastic net blends them; $\\lambda$ is tuned by cross-validation. The idea radiates far beyond linear models — <em>weight decay</em> in deep learning is exactly L2 regularization, and the underlying principle (prefer simpler hypotheses) is the inductive bias that makes generalization possible.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: regularization is a prior (the Bayesian view)</summary>\n<p>Adding a weight penalty is not an arbitrary hack — it is, exactly, doing Bayesian estimation with a <em>prior belief</em> that weights are small.</p>\n<p><b>MAP estimation.</b> Maximum-likelihood fitting maximizes $P(\\text{data} \\mid w)$. If you instead have a prior $P(w)$ and maximize the posterior $P(w \\mid \\text{data}) \\propto P(\\text{data} \\mid w)\\,P(w)$ — the <em>maximum a posteriori</em> (MAP) estimate — taking logs turns the product into a sum: log-likelihood plus log-prior. The log-prior <em>is</em> the regularization penalty.</p>\n<p><b>Which prior gives which penalty.</b> A <em>Gaussian</em> prior on the weights, $w_j \\sim \\mathcal{N}(0, \\tau^2)$, has a log-density proportional to $-\\sum_j w_j^2$ — that is <b>ridge / L2</b>. A <em>Laplace</em> (double-exponential) prior, peaked at zero with heavy tails, has log-density proportional to $-\\sum_j |w_j|$ — that is <b>lasso / L1</b>, and the sharp peak at zero is why it favors exact zeros. The strength $\\lambda$ is set by how tight the prior is (larger $\\lambda$ = stronger belief that weights are near zero).</p>\n<p>The \"aha\": ridge and lasso are MAP estimation under Gaussian and Laplace priors. Regularization is just prior knowledge — \"weights should be small/sparse\" — written into the objective, which is why it reduces variance and why the <em>shape</em> of the prior (round vs peaked) determines shrinkage vs sparsity.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: ridge vs lasso — which should you reach for?</summary>\n<p>Both shrink, but they suit different situations, and knowing which to grab saves a lot of guessing.</p>\n<p><b>Reach for lasso when</b> you believe only a <em>few</em> features truly matter and you want the model to find and keep them — lasso's exact zeros give you a sparse, interpretable subset (built-in feature selection). The catch: among a group of <em>highly correlated</em> features, lasso tends to arbitrarily pick one and zero the rest, which can be unstable.</p>\n<p><b>Reach for ridge when</b> you expect <em>many</em> features to each contribute a little, or when features are correlated. Ridge keeps them all and spreads the weight across correlated features rather than picking a winner, giving steadier coefficients. It also has the closed form and always-invertible matrix, so it is computationally easy.</p>\n<p><b>Can't decide? Elastic Net.</b> It mixes the two — lasso's selection with ridge's grouping of correlated features — at the cost of a second hyperparameter to tune.</p>\n<p>The \"aha\": match the penalty to your belief about the weights. Sparse truth (few relevant features) → lasso; dense truth (many small effects, correlations) → ridge; unsure or correlated-and-sparse → elastic net. They are all the same \"shrink the weights\" idea, differing in the <em>shape</em> of the shrinkage.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the regularization path (you don't refit for every λ)</summary>\n<p>You tune $\\lambda$ by trying many values — but you do not refit from scratch each time. As $\\lambda$ varies, the coefficients trace a continuous <strong>regularization path</strong>, and computing the whole path is both cheap and revealing.</p>\n<p><b>What the path shows.</b> Plot each weight $w_j$ against $\\lambda$ (usually on a log scale). At $\\lambda = 0$ you have the full least-squares weights; as $\\lambda$ grows they shrink toward zero — smoothly for ridge, and for lasso each weight hits <em>exactly</em> zero at some threshold and stays there. Read right-to-left, the path reveals the <em>order</em> in which lasso \"selects\" features — the last to leave zero are the most important — a free feature ranking.</p>\n<p><b>Computing it cheaply.</b> Naively you would run a separate optimization per $\\lambda$. In practice you use <em>warm starts</em>: solve at one $\\lambda$, then use that solution as the starting point for the next (nearby) $\\lambda$, so each solve is fast. For lasso the path is even <em>piecewise-linear</em> in $\\lambda$, and the <em>LARS</em> algorithm computes the entire path in roughly the cost of a single least-squares fit. Libraries (glmnet, scikit-learn's <code>LassoCV</code>) exploit this to cross-validate over a whole grid of $\\lambda$ values efficiently.</p>\n<p>The \"aha\": $\\lambda$ is not a handful of isolated refits — the coefficients move along a continuous path as $\\lambda$ changes, computable in one sweep (warm starts; LARS for lasso's piecewise-linear path). Cross-validating along the path picks $\\lambda$, and the path itself doubles as a feature-importance ranking.</p>\n</details>\n",
          "mcq": [
            {
              "q": "What problem does regularization primarily address?",
              "choices": [
                "Slow training speed",
                "Missing data values",
                "Overfitting — large, unstable weights that fit noise",
                "Data that is not yet standardized"
              ],
              "answer": 2,
              "explain": "Regularization penalizes large weights to curb overfitting, trading a little bias for much lower variance and more stable coefficients."
            },
            {
              "q": "Ridge regression adds which penalty to the loss?",
              "choices": [
                "The number of nonzero weights",
                "The maximum weight value",
                "$\\lambda$ times the sum of absolute weights",
                "$\\lambda$ times the sum of squared weights (L2)"
              ],
              "answer": 3,
              "explain": "Ridge uses the L2 penalty $\\lambda \\sum_j w_j^2$, giving the closed form $(X^\\top X + \\lambda I)^{-1}X^\\top y$ and smooth shrinkage."
            },
            {
              "q": "Lasso (L1 penalty) is notable because it",
              "choices": [
                "drives some weights exactly to zero, performing feature selection",
                "cannot be used with more than one feature",
                "always gives a higher R-squared than ridge",
                "has a simpler closed form than ridge"
              ],
              "answer": 0,
              "explain": "The L1 penalty produces exact zeros, yielding a sparse model that automatically selects a subset of features. It has no closed form (corner at 0)."
            },
            {
              "q": "As the regularization strength $\\lambda \\to \\infty$, the weights",
              "choices": [
                "stay exactly at the least-squares values",
                "grow without bound",
                "shrink toward zero, making the model simpler and more biased",
                "become random"
              ],
              "answer": 2,
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
                "The penalty sums over weights, so unscaled features get penalized unequally and arbitrarily",
                "Standardizing removes the need for a bias term",
                "It makes the closed form exact"
              ],
              "answer": 1,
              "explain": "Because the penalty depends on weight magnitudes, features on different scales are penalized inconsistently; standardizing puts them on equal footing."
            },
            {
              "q": "Lasso adds which penalty term to the loss?",
              "choices": [
                "$\\lambda\\sum_j |w_j|$ (the L1 norm)",
                "$\\lambda\\sum_j w_j^2$ (the L2 norm)",
                "$\\lambda$ by itself",
                "No penalty at all"
              ],
              "answer": 0,
              "explain": "Lasso penalizes the L1 norm $\\sum_j|w_j|$; ridge penalizes the squared L2 norm $\\sum_j w_j^2$."
            },
            {
              "q": "As the regularization strength $\\lambda\\to 0$, the regularized model approaches:",
              "choices": [
                "A constant predictor",
                "Ordinary (unregularized) least squares",
                "A random model",
                "A model with all weights zero"
              ],
              "answer": 1,
              "explain": "With no penalty the fit is plain OLS; as $\\lambda\\to\\infty$ instead, the weights are driven to zero."
            },
            {
              "q": "Regularization typically trades:",
              "choices": [
                "Less bias for more variance",
                "More bias and more variance",
                "A little more bias for much less variance",
                "Nothing — it is free"
              ],
              "answer": 2,
              "explain": "Shrinking the weights biases the fit slightly but greatly reduces its sensitivity to the training sample, improving test error."
            },
            {
              "q": "Elastic Net combines:",
              "choices": [
                "Bagging and boosting",
                "Two separate L1 penalties",
                "Dropout and L2",
                "L1 and L2 penalties"
              ],
              "answer": 3,
              "explain": "It adds both penalties — L1's sparsity plus L2's stability under correlated features."
            },
            {
              "q": "Which regularizer is preferred when you want automatic feature selection?",
              "choices": [
                "L1 (lasso) — it drives weak features' weights to exactly zero",
                "L2 (ridge)",
                "No regularizer can select features",
                "Only Elastic Net with $\\lambda=0$"
              ],
              "answer": 0,
              "explain": "L1's corner solutions zero out coefficients, effectively dropping features; L2 only shrinks them."
            },
            {
              "q": "Regularization helps most when:",
              "choices": [
                "There are very few features",
                "There are many features relative to training examples (high-variance regime)",
                "The data is perfectly linearly separable",
                "The model is already underfitting"
              ],
              "answer": 1,
              "explain": "With many parameters and little data the model overfits; penalizing complexity is exactly the cure."
            },
            {
              "q": "Why does too small a $\\lambda$ risk overfitting?",
              "choices": [
                "It removes all the features",
                "It always underfits",
                "A weak penalty lets the weights grow to fit noise",
                "It has no effect on the fit"
              ],
              "answer": 2,
              "explain": "Little regularization is close to unconstrained fitting, so the model can chase noise in the training data."
            },
            {
              "q": "The L1 (lasso) constraint region is:",
              "choices": [
                "Undefined",
                "A circle, while L2's is a diamond",
                "An axis-aligned square",
                "A diamond — its corners on the axes drive sparsity; L2's region is a circle"
              ],
              "answer": 3,
              "explain": "Loss contours tend to first touch the diamond at a corner (a coordinate axis), zeroing a weight — the geometric reason L1 is sparse."
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
            },
            {
              "front": "What is Elastic Net, and the key preprocessing step?",
              "back": "Elastic Net combines L1 and L2 penalties — sparsity plus stability when features are correlated. Always standardize features first: the penalty is scale-sensitive, so otherwise large-scale features are under-penalized."
            }
          ],
          "homework": [
            {
              "prompt": "You fit ordinary least squares with 50 features on 40 training samples and get wild, huge coefficients and terrible test error. Explain what went wrong and how ridge regression fixes it (mention the matrix).",
              "hint": "With more features than samples, XᵀX is singular (not invertible). How does ridge's +λI term make it invertible and shrink the coefficients?",
              "solution": "With more features than samples (50 > 40), XᵀX is singular (not full rank), so the normal-equations inverse doesn't exist or is numerically unstable — least squares is underdetermined and can fit the 40 points exactly with arbitrary, huge, see-sawing weights that don't generalize (overfitting). Ridge adds λI to get (XᵀX + λI)⁻¹Xᵀy: the +λI makes the matrix invertible (full rank) even when XᵀX isn't, and the L2 penalty shrinks the coefficients to sensible sizes. Tune λ by cross-validation. (Lasso would also help and additionally zero out irrelevant features.)"
            },
            {
              "prompt": "A model has two nearly identical (highly correlated) features that are both predictive. Describe how lasso vs ridge would treat them, and which you'd prefer if you want stable coefficients.",
              "hint": "Lasso (L1) tends to keep one feature and zero the other; ridge (L2) splits the weight between them. Which gives more stable coefficients when features are correlated?",
              "solution": "Lasso tends to pick ONE of the correlated pair and drive the other's weight to exactly zero — and which one it keeps can flip with small data changes, so the coefficients are unstable and the 'selection' is somewhat arbitrary. Ridge keeps BOTH and splits the weight between them (roughly halving each), giving smoother, more stable coefficients across resamples. If you want stable coefficients with correlated predictors, prefer ridge (or elastic net, which groups correlated features while still allowing some sparsity). If you specifically want a sparse model and don't mind which of the pair is kept, lasso is fine."
            },
            {
              "prompt": "Ridge regression adds the penalty $\\lambda\\sum_j w_j^2$. For weights $w=(3,4)$ and $\\lambda=0.1$, compute the penalty term.",
              "hint": "Square each weight, sum, then multiply by $\\lambda$.",
              "solution": "$\\lambda(3^2+4^2)=0.1\\,(9+16)=0.1\\cdot 25=\\mathbf{2.5}$. This is added to the data loss; larger $\\lambda$ pulls the weights harder toward zero."
            }
          ],
          "examples": [
            {
              "title": "How ridge shrinks a coefficient as λ grows",
              "body": "In a one-feature ridge problem the closed-form weight is w = (Σ xᵢyᵢ)/(Σ xᵢ² + λ). Suppose Σ xᵢyᵢ = 20 and Σ xᵢ² = 10. Compute w for λ = 0, 10, and 90.",
              "solution": "λ=0: w = 20/(10+0) = 2.0 (the ordinary least-squares weight). λ=10: w = 20/(10+10) = 20/20 = 1.0 (halved). λ=90: w = 20/(10+90) = 20/100 = 0.2 (shrunk toward zero). As λ grows, the denominator grows, so the weight smoothly shrinks toward 0 but never reaches it exactly — the hallmark of ridge/L2 shrinkage."
            },
            {
              "title": "Lasso zeros a weak feature; ridge only shrinks it",
              "body": "A feature has a small least-squares weight of 0.3 and is mostly noise. Qualitatively, what does lasso do to it versus ridge as regularization increases?",
              "solution": "Lasso: as λ rises past a threshold, the soft-thresholding of L1 pushes this small weight to EXACTLY 0 — the feature drops out of the model entirely, which is desirable if it's just noise (automatic feature selection). Ridge: it shrinks the 0.3 toward zero (say to 0.2, then 0.1, ...) but never sets it to exactly 0, so the noisy feature stays in the model with a small nonzero weight. This is the practical difference: lasso yields a sparse model that discards weak features; ridge yields a dense model that merely damps them."
            },
            {
              "title": "Why you standardize features before regularizing",
              "body": "A ridge penalty $\\lambda\\sum_j w_j^2$ shrinks the weights. Feature A is a price (range about 10000) and feature B is an age (range about 10). For each to have a comparable effect on the output, A needs a tiny weight and B a large one. What does the penalty do to them, and what is the fix?",
              "solution": "The penalty $\\lambda\\sum_j w_j^2$ treats every weight equally — but a weight's size reflects its feature's <em>scale</em>. A's weight (maybe 0.001) contributes almost nothing to $\\sum_j w_j^2$, while B's (maybe 5) dominates it. So ridge heavily penalizes B and barely touches A purely because of their units, not their importance — a silent bias. The fix: <strong>standardize</strong> each feature to mean 0 and variance 1 (a z-score) before fitting, so the weights are on a common footing and the penalty is fair. This is exactly why scikit-learn pipelines place a StandardScaler before any regularized model, and why the intercept is usually left unpenalized. The aha: regularization is scale-sensitive — always standardize first, or the penalty quietly favors large-scale features."
            }
          ]
        }
      ]
    },
    {
      "id": "ml-kernel-prob",
      "title": "Kernel & Probabilistic Methods",
      "lessons": [
        {
          "id": "ml-svm",
          "title": "Support Vector Machines: The Widest Street",
          "minutes": 18,
          "content": "<h3>1. The hook: which separating line is best?</h3>\n<p>Two classes, linearly separable — there are <em>infinitely many</em> lines that split them. Which should you pick? A <strong>support vector machine (SVM)</strong> gives a principled answer: choose the line that sits in the <em>middle of the widest possible street</em> between the classes. Maximizing that gap — the <strong>margin</strong> — is not arbitrary aesthetics; it is a direct bet on better generalization, and it made SVMs the dominant classifier of the decade before deep learning.</p>\n\n<h3>2. The maximum-margin idea</h3>\n<p>The <strong>margin</strong> is the distance from the decision boundary to the nearest training point of either class. An SVM finds the hyperplane that <em>maximizes</em> this margin — pushing the boundary as far from both classes as possible. Intuitively, a boundary crammed up against the data is fragile (a small wiggle flips a point); a boundary centered in a wide empty corridor is robust. The SVM picks the most robust one.</p>\n\n<div data-viz=\"ml-svm-viz\"></div>\n<h3>3. Support vectors: only the borderline points matter</h3>\n<p>Here is the striking part: the optimal boundary depends <em>only</em> on the handful of points sitting right on the edge of the street — the <strong>support vectors</strong>. Every point comfortably on the correct side could be deleted without changing the answer. The model is <em>sparse in the data</em>: it is defined by a few critical examples, not the whole set. That is why \"support\" — those vectors hold the boundary up.</p>\n\n<h3>4. The optimization (the gist)</h3>\n<p>If the boundary is $w^\\top x + b = 0$, the margin width works out to $2/\\lVert w\\rVert$. So maximizing the margin means <em>minimizing</em> $\\lVert w\\rVert$ subject to classifying every point correctly with room to spare: $y_i(w^\\top x_i + b) \\ge 1$ for all $i$. This is a <strong>convex quadratic program</strong> — one global optimum, solvable reliably. The constraints that end up \"tight\" (equal to 1) are exactly the support vectors.</p>\n\n<p><b>Try it in code.</b> Classify two points by the sign of w·x+b, and compute the margin width 2/||w||.</p>\n<div data-code=\"javascript\" data-expected=\"1 -1 2\">// Linear SVM, boundary x = 0:  w = (1, 0), b = 0\nconst w = [1, 0], b = 0;\nconst classify = (x, y) => (w[0]*x + w[1]*y + b) >= 0 ? 1 : -1;\nconst margin = 2 / Math.sqrt(w[0]*w[0] + w[1]*w[1]);\nconsole.log(classify(2, 1), classify(-3, 4), margin);</div>\n<h3>5. Soft margin: real data overlaps</h3>\n<p>Few real datasets are perfectly separable, so the <strong>soft-margin</strong> SVM allows some points to violate the margin, paying a penalty. A hyperparameter $C$ tunes the trade-off: <em>large $C$</em> punishes violations harshly → a narrow margin that fits the training data tightly (risking overfit); <em>small $C$</em> tolerates more violations → a wider, smoother margin (more bias, often better generalization). $C$ is the SVM's regularization knob, chosen by cross-validation.</p>\n\n<h3>6. The kernel trick: curved boundaries for free</h3>\n<p>A straight line can't separate classes shaped like rings or spirals. The <strong>kernel trick</strong> handles this elegantly: implicitly map the data into a much higher-dimensional space where it <em>is</em> linearly separable, draw the flat boundary there, and it bends back into a curve in the original space. The magic is that the SVM only ever needs <em>dot products</em> between points, and a <strong>kernel function</strong> $k(x, z)$ computes the dot product in the high-dim space <em>directly</em> — without ever building those huge feature vectors. Popular kernels: <em>polynomial</em> and the <em>RBF (Gaussian)</em> kernel $k(x,z) = e^{-\\gamma \\lVert x - z\\rVert^2}$.</p>\n\n<p class=\"see-also\"><b>See also:</b> the dual formulation that unlocks this kernel trick is derived with <a href=\"#/lesson/calculus/c-lagrange-multipliers\" data-route>Lagrange multipliers</a> — constrained optimization is the machinery behind it.</p>\n<h3>7. Still linear, just elsewhere</h3>\n<p>An SVM with a kernel is still a <em>linear</em> classifier — in the (implicit) feature space. The RBF kernel corresponds to an effectively infinite-dimensional space, which is why it can carve almost any boundary. Its width $\\gamma$ is a second hyperparameter: large $\\gamma$ makes each point's influence local (wiggly boundary, can overfit), small $\\gamma$ makes it broad (smoother). You tune $C$ and $\\gamma$ together by cross-validation. And because kernels and margins are built on distances, you must <strong>standardize features</strong> first.</p>\n\n<h3>8. The big picture</h3>\n<p>An SVM finds the maximum-margin boundary, defined by a few support vectors, via a convex quadratic program; the soft margin ($C$) handles overlap, and the kernel trick buys nonlinear boundaries without explicit high-dim features. Strengths: excellent in high dimensions, flexible via kernels, strong generalization from the margin. Weaknesses: scaling to very large datasets is costly, the $C$/$\\gamma$ tuning matters a lot, and the kernelized model is hard to interpret. Before deep learning, SVMs were the go-to for hard classification problems — and they remain superb on small-to-medium, high-dimensional data.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the kernel trick — nonlinearity for (almost) free</summary>\n<p>The kernel trick is one of the most elegant ideas in machine learning: get the power of an enormous feature space while never paying to compute it.</p>\n<p><b>The setup.</b> Suppose you map inputs through some feature transform $\\phi$ (e.g. all products of pairs of features) into a high-dimensional space, then run a linear method there. Done naively, $\\phi(x)$ could have millions of components — expensive or impossible to store. <b>The trick:</b> many algorithms (SVM, ridge regression, PCA) only ever use the data through <em>inner products</em> $\\phi(x)^\\top \\phi(z)$. A <em>kernel</em> $k(x,z)$ is a function that returns exactly that inner product <em>without</em> constructing $\\phi$. So you swap every dot product for a kernel evaluation and operate in the huge space implicitly.</p>\n<p><b>How far it goes.</b> The RBF kernel $e^{-\\gamma\\lVert x-z\\rVert^2}$ corresponds to an <em>infinite-dimensional</em> feature space — yet each evaluation is a cheap exponential of a distance. Any method expressible purely in dot products can be \"kernelized\" this way (kernel PCA, kernel ridge regression, Gaussian processes). The only requirement is that $k$ be a valid (positive semidefinite) kernel — Mercer's condition.</p>\n<p>The \"aha\": the kernel trick decouples <em>model expressiveness</em> from <em>computational cost</em>. You get nonlinear, even infinite-dimensional, decision boundaries at the price of a simple function evaluation per pair of points — by never leaving the world of dot products.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why maximize the margin? (the generalization story)</summary>\n<p>Maximizing the margin is not just intuitive robustness — it is a principled form of <em>complexity control</em>.</p>\n<p><b>Margin as regularization.</b> Recall the SVM minimizes $\\lVert w\\rVert$ (equivalently maximizes the margin $2/\\lVert w\\rVert$). Minimizing the weight norm is exactly the L2 regularization you met with ridge — so a large margin <em>is</em> a small-weight, low-complexity solution. Among all boundaries that separate the data, the widest-margin one is the \"simplest,\" and simpler hypotheses generalize better. This is the heart of <em>structural risk minimization</em>: the wider the margin, the tighter the theoretical bound on test error (a VC-dimension argument), independent of the input dimension.</p>\n<p><b>Sparsity in examples.</b> Because only support vectors determine the boundary, the solution is sparse in the <em>data</em> — most points are irrelevant. This both compresses the model (store only the support vectors) and connects to the bound: fewer support vectors generally means better expected generalization.</p>\n<p>The \"aha\": the margin is a built-in regularizer. Maximizing it minimizes the weight norm (low complexity) and yields a solution resting on a few support vectors, which is why SVMs generalize so well even in very high dimensions where other methods overfit.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the SVM is hinge loss + L2 (loss-plus-penalty, and the dual)</summary>\n<p>The soft-margin SVM looks like a special geometric construction, but it fits the <em>same</em> \"loss + regularizer\" mold as ridge and logistic regression — and seeing that unifies half of classical ML.</p>\n<p><b>The primal as regularized loss.</b> Minimizing $\\lVert w\\rVert^2$ subject to the margin constraints with slack is equivalent to minimizing $$\\sum_i \\max\\!\\big(0,\\; 1 - y_i(w^\\top x_i + b)\\big) \\;+\\; \\lambda \\lVert w\\rVert^2.$$ The first term is the <b>hinge loss</b>: zero once a point is correctly classified <em>with margin</em> ($y_i(w^\\top x_i+b) \\ge 1$), and growing linearly when it is not. The second is plain <b>L2 regularization</b>. So an SVM is \"hinge loss + L2\" exactly as ridge is \"squared loss + L2\" and regularized logistic regression is \"log loss + L2\" — three members of one family, differing only in the loss.</p>\n<p><b>Why the hinge matters.</b> The hinge's flat zero region is what makes the solution depend only on the <em>support vectors</em> (points on or inside the margin) — the sparsity you saw geometrically falls straight out of the loss. And the soft-margin $C$ is just $1/\\lambda$: a large $C$ means weak regularization.</p>\n<p><b>The dual.</b> Rewriting this constrained problem with Lagrange multipliers gives the <em>dual</em>, in which the data appears only through <em>dot products</em> $x_i^\\top x_j$ — precisely the door the kernel trick walks through. The dual is not a curiosity; it is what makes kernels possible.</p>\n<p>The \"aha\": strip away the geometry and the SVM is \"hinge loss + L2 penalty,\" the same loss-plus-regularizer template as ridge and logistic regression. The hinge gives the margin and support-vector sparsity; the dual (dot-products only) gives kernels.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the representer theorem — why kernels are tractable</summary>\n<p>Kernel methods map each input into a feature space $\\phi(x)$ that may be infinite-dimensional, then fit a linear model there. Optimizing over an infinite-dimensional weight vector sounds hopeless — until the <b>representer theorem</b> steps in. It says that for any regularized fit (empirical loss plus a penalty on the RKHS norm $\\lVert f\\rVert$), the optimal function is a <em>finite</em> combination of the kernel evaluated at the training points: $f(x)=\\sum_{i=1}^{n}\\alpha_i\\,k(x_i,x)$.</p>\n<p>So however vast the feature space, the solution lives in the $n$-dimensional span of the training data — you only ever solve for $n$ coefficients $\\alpha_i$. That single fact is why support vector machines, kernel ridge regression, and Gaussian-process regression are all computable: the infinite-dimensional problem collapses to an $n\\times n$ one built from the kernel matrix.</p>\n<p>The setting is a <b>reproducing kernel Hilbert space</b> (RKHS) — the function space a positive-definite kernel implicitly defines, where $k(x,\\cdot)$ acts as the evaluation functional. This is also the rigorous license for the <em>kernel trick</em>: because everything reduces to inner products $\\langle\\phi(x),\\phi(x')\\rangle = k(x,x')$, you never form $\\phi$ explicitly — you just evaluate the kernel between data points.</p>\n</details>\n",
          "mcq": [
            {
              "q": "Among all hyperplanes that separate two classes, which does an SVM choose?",
              "choices": [
                "The one passing through the most points",
                "A random valid separator",
                "The one that maximizes the margin (distance to the nearest points)",
                "The one closest to the origin"
              ],
              "answer": 2,
              "explain": "An SVM picks the maximum-margin hyperplane — centered in the widest gap between the classes — for robustness and better generalization."
            },
            {
              "q": "What are the 'support vectors' of an SVM?",
              "choices": [
                "The eigenvectors of the kernel matrix",
                "All the training points equally",
                "The feature columns of the data matrix",
                "The training points closest to the boundary, which alone determine it"
              ],
              "answer": 3,
              "explain": "Only the borderline points (support vectors) define the optimal boundary; points comfortably on the correct side can be removed without changing it — the solution is sparse in the data."
            },
            {
              "q": "The soft-margin hyperparameter $C$ controls",
              "choices": [
                "the number of features used",
                "the learning rate of gradient descent",
                "the trade-off between a wide margin and tolerating misclassifications",
                "the dimension of the kernel space"
              ],
              "answer": 2,
              "explain": "Large C punishes margin violations (narrow margin, tight fit, risk of overfit); small C tolerates violations (wider margin, more bias). It's the SVM's regularization knob."
            },
            {
              "q": "What does the kernel trick let an SVM do?",
              "choices": [
                "Compute dot products in a high-dimensional feature space without explicitly forming the features",
                "Train without any labels",
                "Guarantee a linear boundary in the original space",
                "Avoid choosing any hyperparameters"
              ],
              "answer": 0,
              "explain": "A kernel returns the inner product in an implicit high-dim space directly, so the SVM gets nonlinear boundaries without ever building the huge feature vectors."
            },
            {
              "q": "The RBF (Gaussian) kernel corresponds to a feature space that is",
              "choices": [
                "one-dimensional",
                "the same as the input space",
                "empty",
                "effectively infinite-dimensional"
              ],
              "answer": 3,
              "explain": "The RBF kernel implicitly maps to an infinite-dimensional space, which is why it can represent almost any decision boundary; yet each evaluation is just an exponential of a distance."
            },
            {
              "q": "Why does maximizing the margin improve generalization?",
              "choices": [
                "It increases the number of support vectors",
                "A wider margin is a lower-complexity (small-weight) solution — built-in regularization",
                "It memorizes the training set",
                "It removes the need for labels"
              ],
              "answer": 1,
              "explain": "Maximizing the margin minimizes the weight norm (like L2 regularization) — the simplest separator — and structural risk minimization ties wider margins to tighter test-error bounds."
            },
            {
              "q": "Why must features be standardized before training an SVM (especially with RBF)?",
              "choices": [
                "Kernels and margins are distance-based, so unscaled large-range features dominate",
                "To make the labels balanced",
                "SVMs require integer features",
                "SVMs can't handle decimals"
              ],
              "answer": 0,
              "explain": "Margins and kernels (RBF especially) depend on distances; without scaling, a large-range feature swamps the others — the same scaling lesson as kNN."
            },
            {
              "q": "An SVM's decision boundary in the original input space is",
              "choices": [
                "always a single point",
                "linear with a linear kernel and nonlinear with a nonlinear kernel (though linear in feature space)",
                "always nonlinear",
                "undefined without labels"
              ],
              "answer": 1,
              "explain": "A linear-kernel SVM gives a hyperplane; a kernelized SVM is linear in the implicit feature space, which appears as a curved boundary in the original space."
            },
            {
              "q": "Deleting a training point that is NOT a support vector:",
              "choices": [
                "Leaves the decision boundary unchanged",
                "Always flips the boundary",
                "Forces a full retraining from scratch",
                "Removes the margin entirely"
              ],
              "answer": 0,
              "explain": "The boundary is determined only by the support vectors; non-support points can be removed with no effect."
            },
            {
              "q": "Increasing $C$ toward a hard margin tends to give:",
              "choices": [
                "High bias and low variance",
                "Low bias but high variance — a tight fit with few violations",
                "More margin violations",
                "A wider margin"
              ],
              "answer": 1,
              "explain": "Large $C$ heavily penalizes violations, so the SVM fits the training data tightly — flexible but prone to overfitting."
            },
            {
              "q": "Decreasing $C$ (a softer margin) tends to give:",
              "choices": [
                "Zero training error always",
                "A narrower margin",
                "A wider margin that tolerates more violations (higher bias, lower variance)",
                "No support vectors at all"
              ],
              "answer": 2,
              "explain": "Small $C$ values margin width over fitting every point, accepting some violations for better generalization on noisy data."
            },
            {
              "q": "A soft-margin SVM minimizes which loss (plus an L2 weight penalty)?",
              "choices": [
                "Absolute error",
                "Squared error",
                "Cross-entropy",
                "Hinge loss, $\\max(0,\\,1-y\\,(w^\\top x+b))$"
              ],
              "answer": 3,
              "explain": "Hinge loss is zero once a point is correctly outside the margin and grows linearly inside it."
            },
            {
              "q": "To handle more than two classes, SVMs are usually extended via:",
              "choices": [
                "One-vs-rest or one-vs-one schemes",
                "A softmax output layer",
                "Bagging",
                "k-fold cross-validation"
              ],
              "answer": 0,
              "explain": "A plain SVM is binary; multiclass is built from many binary SVMs (one-vs-rest or one-vs-one)."
            },
            {
              "q": "For a support vector lying exactly on the margin, the functional margin $y\\,(w^\\top x+b)$ equals:",
              "choices": [
                "$0$",
                "$1$",
                "$-1$",
                "$\\infty$"
              ],
              "answer": 1,
              "explain": "The margin is scaled so that $y\\,(w^\\top x+b)=1$ on the margin; correctly classified points beyond it have functional margin $\\gt 1$."
            },
            {
              "q": "The SVM solution is \"sparse\" because it depends only on:",
              "choices": [
                "The feature means",
                "All training points equally",
                "The support vectors (a small subset of the data)",
                "The single largest feature"
              ],
              "answer": 2,
              "explain": "Most training points have zero weight in the solution; only the support vectors contribute, which also makes prediction efficient."
            },
            {
              "q": "A very large RBF-kernel $\\gamma$ (small bandwidth) tends to cause:",
              "choices": [
                "Faster convergence with no downside",
                "Underfitting",
                "A perfectly linear boundary",
                "Overfitting — a wiggly boundary islanding individual points"
              ],
              "answer": 3,
              "explain": "Small bandwidth makes each point's influence local, so the boundary contorts around individuals — high variance."
            }
          ],
          "flashcards": [
            {
              "front": "What does a support vector machine optimize?",
              "back": "The maximum-margin separating hyperplane: minimize ‖w‖ (maximize margin 2/‖w‖) subject to yᵢ(wᵀxᵢ+b) ≥ 1 — a convex quadratic program. The boundary sits in the widest 'street' between the classes."
            },
            {
              "front": "What are support vectors?",
              "back": "The training points on the margin's edge that alone determine the boundary; all other points are irrelevant (could be deleted). The solution is sparse in the data — defined by a few critical examples."
            },
            {
              "front": "What does the soft-margin C control?",
              "back": "The trade-off between margin width and misclassification tolerance. Large C = narrow margin, tight fit (overfit risk); small C = wider margin, more violations allowed (more bias). It's the SVM regularizer; tune by CV."
            },
            {
              "front": "What is the kernel trick?",
              "back": "Compute the dot product in a high-dimensional feature space directly via a kernel k(x,z)=φ(x)·φ(z), without ever building φ. Enables nonlinear boundaries cheaply. RBF kernel e^(−γ‖x−z‖²) = infinite-dim space. Tune C and γ."
            },
            {
              "front": "Why does the SVM margin help generalization?",
              "back": "Maximizing the margin = minimizing ‖w‖ = L2 regularization (lowest-complexity separator). Structural risk minimization links wider margins to tighter test-error bounds, even in high dimensions. Only support vectors matter (sparse, compressible)."
            },
            {
              "front": "What loss does a soft-margin SVM minimize?",
              "back": "Hinge loss plus an L2 penalty: $\\sum \\max(0,\\,1-y_i(w^\\top x_i+b)) + \\lambda\\lVert w\\rVert^2$. A point correctly outside the margin contributes zero loss. Multiclass is handled by one-vs-rest or one-vs-one."
            }
          ],
          "homework": [
            {
              "prompt": "An SVM is trained and you discover that of 1000 training points, only 12 are support vectors. (a) What does this tell you about the model, and (b) what happens to the boundary if you delete a non-support-vector point versus a support vector?",
              "hint": "The boundary depends only on the support vectors. What does having very few of them imply, and what changes when you delete a support vector versus a non-support vector?",
              "solution": "(a) The model is very sparse in the data: the entire decision boundary is determined by just those 12 borderline points, so it can be stored and applied using only them — and a small number of support vectors generally signals a well-separated problem and good expected generalization. (b) Deleting a NON-support-vector (a point comfortably on the correct side, outside the margin) changes nothing — retraining gives the identical boundary, because such points don't enter the solution. Deleting a SUPPORT vector can move the boundary, since the margin was resting on it; the SVM would re-solve and find a new maximum-margin hyperplane supported by different points."
            },
            {
              "prompt": "Explain the effect of increasing the soft-margin C from very small to very large, in terms of bias, variance, and overfitting. When would you prefer a small C?",
              "hint": "C sets the penalty for margin violations: large C is a near-hard margin (low bias, high variance), small C a wider, more tolerant one. Which helps when the data is noisy?",
              "solution": "Small C: violations are cheap, so the SVM prioritizes a WIDE margin even if several points fall inside it or are misclassified — this is a simpler, smoother boundary with higher bias and lower variance (more regularized). Large C: violations are heavily penalized, so the SVM contorts the boundary to classify (almost) every training point correctly — a narrow margin, low bias, high variance, prone to overfitting noise. You'd prefer a small C when the data is noisy or overlapping, or when you have limited data and want a robust, generalizing boundary rather than one that chases every training point. The right C is found by cross-validation."
            },
            {
              "prompt": "A trained linear SVM has $w=(0,2)$ and $b=-1$. Compute the margin width $2/\\lVert w\\rVert$, and classify the point $x=(5,1)$ by the sign of $w^\\top x+b$.",
              "hint": "$\\lVert w\\rVert=\\sqrt{0^2+2^2}$; the class is the sign of $w^\\top x+b$.",
              "solution": "$\\lVert w\\rVert = 2$, so the margin width is $2/2=\\mathbf{1}$. Score: $w^\\top x+b = 0\\cdot 5 + 2\\cdot 1 - 1 = 1 > 0$, so $x$ is the <b>positive</b> class."
            }
          ],
          "examples": [
            {
              "title": "Why a wider margin generalizes better",
              "body": "Two separable clusters. Boundary A passes 0.1 units from the nearest points of each class; boundary B passes 1.0 units from them. Both classify the training set perfectly. Which is the SVM's choice and why is it safer on new data?",
              "solution": "The SVM chooses B — the larger margin (1.0 vs 0.1). Both are perfect on training data, so training accuracy can't distinguish them, but B is more robust: a new point, or noise, that shifts a sample by up to ~1 unit still lands on the correct side of B, whereas a shift of just 0.1 could flip it across A. Formally, the wider margin corresponds to a smaller ‖w‖ (lower complexity / stronger regularization), which gives a tighter generalization bound. The empty 'street' around B is the safety buffer A lacks."
            },
            {
              "title": "When a straight line fails — go to a kernel",
              "body": "Class 1 is a tight blob at the origin; class 0 forms a ring around it. No straight line separates them. How does an SVM solve this without abandoning its linear machinery?",
              "solution": "Use a nonlinear kernel (e.g. RBF, or a polynomial/feature map like (x₁, x₂, x₁²+x₂²)). Adding the radius feature x₁²+x₂² lifts the data into a higher dimension where the inner blob (small radius) and the outer ring (large radius) become linearly separable by a flat threshold on that new axis. The SVM draws its usual maximum-margin hyperplane in that lifted space; projected back to the original 2D plane, the boundary is a circle separating blob from ring. The kernel trick does this implicitly — computing the needed dot products via k(x,z) without ever forming the lifted features."
            },
            {
              "title": "The margin and the support vectors, by hand",
              "body": "Two points, opposite classes: a positive example at $x_+=(1,0)$ and a negative at $x_-=(-1,0)$. The obvious maximum-margin boundary is the vertical line $x=0$. Find the weight vector $w$, bias $b$, the margin width, and the support vectors.",
              "solution": "Use the SVM's canonical scaling, $y_i(w^\\top x_i+b)=1$ for the closest points. For $x_+$ (label $+1$): $w_1(1)+b=1$. For $x_-$ (label $-1$): $-(w_1(-1)+b)=1$, i.e. $w_1-b=1$... combine the two: $w_1+b=1$ and $w_1-b=1$ give $b=0$ and $w_1=1$, so $w=(1,0)$, $b=0$ — the line $x=0$, as expected. Margin width $=2/\\lVert w\\rVert = 2/1 = 2$ (the empty 'street' spans from $x=-1$ to $x=1$). Both points lie exactly on the margin ($y_i(w^\\top x_i+b)=1$), so both are support vectors — deleting either would change the boundary. Maximizing the margin is the same as minimizing $\\lVert w\\rVert$, which is why the canonical scaling pins the closest points to $\\pm1$."
            }
          ]
        },
        {
          "id": "ml-naive-bayes",
          "title": "Naive Bayes: Counting Your Way to a Classifier",
          "minutes": 16,
          "content": "<h3>1. The hook: Bayes' rule plus one bold shortcut</h3>\n<p><strong>Naive Bayes</strong> is the fastest useful classifier you will meet: it learns by <em>counting</em>, predicts by multiplying a few probabilities, and — despite resting on an assumption that is almost always false — routinely beats far fancier models on text. It is the classic spam filter and a baseline every practitioner should know. The whole method is Bayes' rule applied to classification, plus one simplifying \"naive\" leap.</p>\n\n<h3>2. Bayes' rule for classification</h3>\n<p>We want the most probable class given the features: $P(y \\mid x)$. Bayes' rule flips it into things we can estimate: $$P(y \\mid x) \\propto P(x \\mid y)\\, P(y),$$ the <em>likelihood</em> of the features under each class times the class's <em>prior</em>. We predict the class with the largest posterior (the MAP decision); the denominator $P(x)$ is the same for every class, so we can ignore it and just compare the products.</p>\n\n<div data-viz=\"ml-nb-viz\"></div>\n<h3>3. The \"naive\" assumption</h3>\n<p>The hard part is $P(x \\mid y)$ — the joint distribution of <em>all</em> features given the class, which needs impossibly much data to estimate. Naive Bayes makes a sweeping simplification: <strong>assume the features are conditionally independent given the class</strong>. Then the joint factorizes into a product of one-feature terms: $$P(x \\mid y) = \\prod_{j} P(x_j \\mid y).$$ Each $P(x_j \\mid y)$ is a simple one-dimensional distribution you can estimate easily. This is \"naive\" because features usually <em>aren't</em> independent — yet it makes the model trivially trainable.</p>\n\n<h3>4. Training is just counting</h3>\n<p>With that factorization, training requires <em>no iterative optimization at all</em> — you estimate every probability by counting frequencies in the data: $P(y)$ is the fraction of examples in class $y$; $P(x_j \\mid y)$ is how often feature $j$ takes its value among class-$y$ examples. One pass over the data and you are done. That is why Naive Bayes trains in a blink and scales to huge, high-dimensional datasets like text.</p>\n\n<p><b>Try it in code.</b> Compute the spam posterior: each class's prior times its 'free' likelihood, normalized.</p>\n<div data-code=\"javascript\" data-expected=\"0.769\">// Naive Bayes posterior: P(spam | 'free')\nconst Pspam = 0.4, Pham = 0.6;\nconst Pfree_spam = 0.5, Pfree_ham = 0.1;\nconst spam = Pspam * Pfree_spam;   // unnormalized score\nconst ham  = Pham  * Pfree_ham;\nconsole.log((spam / (spam + ham)).toFixed(3));   // posterior P(spam | 'free')</div>\n<h3>5. Flavors for different features</h3>\n<p>The per-feature distribution $P(x_j \\mid y)$ depends on the data type: <strong>Multinomial NB</strong> for counts (word frequencies — the text-classification default), <strong>Bernoulli NB</strong> for binary present/absent features, and <strong>Gaussian NB</strong> for continuous features (model each feature per class with a normal distribution, estimating its mean and variance).</p>\n\n<h3>6. The zero-probability trap and Laplace smoothing</h3>\n<p>One danger: if a feature value never appeared with a class in training, its estimated $P(x_j \\mid y) = 0$, and because we <em>multiply</em>, that single zero annihilates the entire product — one unseen word vetoes the whole prediction. The fix is <strong>Laplace (add-one) smoothing</strong>: pretend you saw every value one extra time, so no probability is ever exactly zero. A small, essential patch.</p>\n\n<h3>7. Why a wrong assumption works</h3>\n<p>Features in real data are correlated, so the independence assumption is false and the probabilities Naive Bayes reports are poorly calibrated (often overconfident). Yet it classifies surprisingly well, because <em>classification only needs the right winner</em> — the class with the largest product — not accurate probabilities. The errors from double-counting correlated evidence frequently push all classes' scores in the same direction, leaving the argmax intact. Combined with its speed and low data appetite, this makes it a tough baseline on text and high-dimensional problems.</p>\n\n<h3>8. The big picture</h3>\n<p>Naive Bayes = Bayes' rule + conditional-independence factorization, trained by counting, predicted by multiplying (with Laplace smoothing to dodge zeros). It is the <em>generative</em> cousin of logistic regression — it models how the data is generated, $P(x \\mid y)P(y)$, rather than the boundary directly. Fast, simple, data-thrifty, and a strong baseline, especially for text: when starting a classification problem, fit a Naive Bayes first to see what \"easy\" looks like.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why a \"wrong\" assumption still classifies well</summary>\n<p>Conditional independence is almost always false — in spam, \"viagra\" and \"pills\" co-occur, so treating them as independent <em>double-counts</em> the same evidence. So why does Naive Bayes work?</p>\n<p><b>Classification needs the argmax, not the probabilities.</b> The decision is $\\arg\\max_y P(y)\\prod_j P(x_j \\mid y)$. Double-counting correlated features makes the winning class's score <em>too</em> extreme (overconfident) — the reported probabilities are badly calibrated, often pinned near 0 or 1. But to get the <em>label</em> right you only need the correct class to have the largest score, and the inflation typically preserves the ordering. Naive Bayes can be a poor probability estimator and an excellent classifier at the same time.</p>\n<p><b>The bias-variance angle.</b> The independence assumption is a strong <em>bias</em>, but it slashes <em>variance</em>: instead of estimating one gigantic joint distribution (needing exponential data), you estimate many tiny one-feature distributions (needing little data). On small or high-dimensional datasets that trade pays off — a biased-but-stable model beats an unbiased-but-data-starved one.</p>\n<p>The \"aha\": don't judge Naive Bayes by its calibration. Its independence assumption wrecks the probabilities but usually spares the decision boundary's argmax, and the massive variance reduction is exactly why a \"naive\" model wins when data is scarce or dimensions are many.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: generative vs discriminative (Naive Bayes vs logistic regression)</summary>\n<p>Naive Bayes and logistic regression form a famous pair — the same linear decision rule reached from opposite directions.</p>\n<p><b>Two routes to a classifier.</b> A <em>generative</em> model (Naive Bayes) learns how each class <em>generates</em> data — it estimates $P(x \\mid y)$ and $P(y)$, then uses Bayes' rule to get $P(y \\mid x)$. A <em>discriminative</em> model (logistic regression) skips the data-generation story and learns the boundary $P(y \\mid x)$ <em>directly</em>. Remarkably, Gaussian Naive Bayes and logistic regression produce the <em>same form</em> of (linear) decision boundary — they just fit its parameters differently.</p>\n<p><b>The classic trade-off (Ng &amp; Jordan).</b> The generative Naive Bayes converges to its best with <em>far less data</em> and trains instantly, but it has a <em>higher asymptotic error</em> because its independence assumption is wrong. The discriminative logistic regression needs <em>more data</em> and iterative optimization, but with enough of it reaches a <em>lower</em> error, since it makes no generative assumption. So Naive Bayes often wins on small datasets; logistic regression overtakes it as data grows.</p>\n<p>The \"aha\": generative vs discriminative is a fundamental axis. Model the joint $P(x,y)$ (generative: Naive Bayes — data-thrifty, fast, can also generate or detect novelty) or model $P(y \\mid x)$ directly (discriminative: logistic regression — lower error given enough data). The same split separates many model families across machine learning.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: compute in log space (or everything underflows to zero)</summary>\n<p>A textbook writes Naive Bayes as a <em>product</em> of probabilities. A real implementation never multiplies them — it would silently collapse to zero.</p>\n<p><b>The underflow problem.</b> With hundreds or thousands of features (think one term per vocabulary word), the class score $P(y)\\prod_j P(x_j \\mid y)$ multiplies hundreds of numbers each well below 1. Their product becomes astronomically small — smaller than the tiniest float a computer can represent — so it rounds to exactly $0$. Every class then scores $0$ and the comparison is meaningless. This <em>floating-point underflow</em> hits long products hard.</p>\n<p><b>The fix: sum logs.</b> Take the logarithm. Because $\\log$ turns products into sums, the score becomes $$\\log P(y) + \\sum_j \\log P(x_j \\mid y),$$ a sum of moderate negative numbers — no underflow. And since $\\log$ is monotonic, the class with the largest log-score is exactly the class that had the largest probability, so the <em>argmax (the prediction) is unchanged</em>. (When you need the actual probabilities back, the \"log-sum-exp\" trick normalizes them safely.)</p>\n<p>The \"aha\": Naive Bayes is presented as multiplication but <em>implemented</em> as addition in log space — $\\log P(y) + \\sum \\log P(x_j\\mid y)$ — because multiplying many small probabilities underflows to zero. Working in logs is the standard, near-universal practice for probabilistic models, and it leaves the decision identical.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: Hidden Markov Models — naive Bayes unrolled over time</summary>\n<p>Naive Bayes is a generative model for one label: pick a class, then emit its features. A <b>Hidden Markov Model (HMM)</b> generalizes this to a <em>sequence</em>: a Markov chain of hidden states $s_1, s_2, \\ldots$ that you cannot see, where each state emits an observation with probability $P(o_t \\mid s_t)$. It is naive Bayes unrolled over time, with Markov transitions linking one hidden \"class\" to the next. You observe the emissions; the states stay hidden.</p>\n<p>Three classic questions, each with a clean algorithm. <b>Likelihood</b> — how probable is this observation sequence? The <em>forward algorithm</em> sums over all exponentially-many hidden paths in linear time by dynamic programming. <b>Decoding</b> — what hidden path most likely produced it? The <em>Viterbi algorithm</em> is the same DP recurrence with max in place of sum (structurally identical to edit-distance DP). <b>Learning</b> — fit the transition and emission probabilities from observations alone? <em>Baum–Welch</em>, which is exactly the <a href=\"#/lesson/machine-learning/ml-kmeans\" data-route>EM algorithm</a> for HMMs.</p>\n<p>HMMs powered part-of-speech tagging, speech recognition, and gene finding for decades. Their continuous-state cousin is the Kalman filter (hidden state is a real vector, not a discrete label), and bolting on actions and rewards turns an HMM into a POMDP — the partially-observed Markov decision process. The same hidden-Markov skeleton runs through all three.</p>\n<p>Run Viterbi yourself on a tiny health HMM — hidden states Healthy/Fever, observing normal/cold/dizzy:</p>\n<div data-code=\"javascript\" data-expected=\"Most likely path: Healthy then Healthy then Fever\">// Viterbi: most likely hidden path of a tiny health HMM\nconst states = [\"Healthy\", \"Fever\"];\nconst start = { Healthy: 0.6, Fever: 0.4 };\nconst trans = { Healthy: { Healthy: 0.7, Fever: 0.3 }, Fever: { Healthy: 0.4, Fever: 0.6 } };\nconst emit  = { Healthy: { normal: 0.5, cold: 0.4, dizzy: 0.1 }, Fever: { normal: 0.1, cold: 0.3, dizzy: 0.6 } };\nconst obs = [\"normal\", \"cold\", \"dizzy\"];\n\nlet V = {}, path = {};\nstates.forEach(s =&gt; { V[s] = start[s] * emit[s][obs[0]]; path[s] = [s]; });\nobs.slice(1).forEach(o =&gt; {\n  const nV = {}, nP = {};\n  states.forEach(cur =&gt; {\n    let best = states[0], bp = -1;\n    states.forEach(prev =&gt; { const p = V[prev] * trans[prev][cur] * emit[cur][o]; if (p &gt; bp) { bp = p; best = prev; } });\n    nV[cur] = bp; nP[cur] = path[best].concat(cur);\n  });\n  V = nV; path = nP;\n});\nlet end = states[0];\nstates.forEach(s =&gt; { if (V[s] &gt; V[end]) end = s; });\nconsole.log(\"Most likely path: \" + path[end].join(\" then \"));</div>\n</details>\n",
          "mcq": [
            {
              "q": "How does Naive Bayes decide a class for an input?",
              "choices": [
                "By finding the nearest training point",
                "By choosing the class with the highest posterior $P(y \\mid x)$ via Bayes' rule",
                "By maximizing the margin",
                "By averaging all class labels"
              ],
              "answer": 1,
              "explain": "Naive Bayes picks the MAP class: argmax over y of P(y)·P(x|y), which by Bayes' rule is proportional to the posterior P(y|x)."
            },
            {
              "q": "The 'naive' assumption in Naive Bayes is that",
              "choices": [
                "all classes are equally likely",
                "the data is normally distributed",
                "there are only two classes",
                "the features are conditionally independent given the class"
              ],
              "answer": 3,
              "explain": "It assumes P(x|y) factorizes into ∏ⱼ P(xⱼ|y) — features independent given the class — which makes the likelihood trivial to estimate."
            },
            {
              "q": "Training a Naive Bayes classifier mainly involves",
              "choices": [
                "gradient descent on a cross-entropy loss",
                "counting frequencies to estimate P(class) and P(featureⱼ|class) — no iterative optimization",
                "solving a quadratic program",
                "building a tree by recursive splitting"
              ],
              "answer": 1,
              "explain": "Thanks to the factorization, you just estimate each probability by counting in one pass over the data — no optimization loop."
            },
            {
              "q": "What problem does Laplace (add-one) smoothing solve?",
              "choices": [
                "A feature value unseen with a class gives probability 0, which zeros the whole product",
                "Too many classes",
                "Features on different scales",
                "Overfitting from too many trees"
              ],
              "answer": 0,
              "explain": "Because the class score is a product, a single zero estimate annihilates it. Add-one smoothing ensures no probability is exactly zero."
            },
            {
              "q": "Which Naive Bayes variant is the default for word-count text features?",
              "choices": [
                "Gaussian Naive Bayes",
                "Bernoulli Naive Bayes",
                "Multinomial Naive Bayes",
                "Kernel Naive Bayes"
              ],
              "answer": 2,
              "explain": "Multinomial NB models count data (e.g. word frequencies) and is the standard choice for text classification; Bernoulli for binary, Gaussian for continuous."
            },
            {
              "q": "Why does Naive Bayes often classify well even though its independence assumption is false?",
              "choices": [
                "It secretly models all correlations",
                "It uses gradient descent to correct itself",
                "Classification needs only the correct argmax, not calibrated probabilities",
                "The assumption is actually usually true"
              ],
              "answer": 2,
              "explain": "Double-counting correlated features miscalibrates the probabilities but usually preserves which class scores highest — and the label only depends on that argmax."
            },
            {
              "q": "How do Naive Bayes and logistic regression relate?",
              "choices": [
                "Logistic regression is a special kind of decision tree",
                "They are identical algorithms",
                "Both are unsupervised",
                "Naive Bayes is generative (models P(x|y)P(y)); logistic regression is discriminative (models P(y|x) directly)"
              ],
              "answer": 3,
              "explain": "Naive Bayes models how data is generated then applies Bayes' rule; logistic regression learns the boundary P(y|x) directly. They're the classic generative/discriminative pair."
            },
            {
              "q": "A key practical strength of Naive Bayes is that it",
              "choices": [
                "is fast, data-thrifty, and works well in high dimensions like text/spam",
                "produces perfectly calibrated probabilities",
                "always achieves the lowest possible error",
                "requires no training data"
              ],
              "answer": 0,
              "explain": "One counting pass makes it extremely fast and effective with little data and many features (text), which is why it's a strong baseline despite poor calibration."
            },
            {
              "q": "A filter has $P(\\text{spam})=0.4$, $P(\\text{ham})=0.6$, $P(\\text{\"free\"}\\mid\\text{spam})=0.5$, $P(\\text{\"free\"}\\mid\\text{ham})=0.1$. The posterior $P(\\text{spam}\\mid\\text{\"free\"})$ is:",
              "choices": [
                "$\\approx 0.77$",
                "$0.5$",
                "$0.2$",
                "$\\approx 0.23$"
              ],
              "answer": 0,
              "explain": "$\\dfrac{0.4\\cdot 0.5}{0.4\\cdot 0.5+0.6\\cdot 0.1}=\\dfrac{0.2}{0.26}\\approx 0.77$."
            },
            {
              "q": "Naive Bayes sums log-probabilities instead of multiplying probabilities to:",
              "choices": [
                "Make the model nonlinear",
                "Avoid numerical underflow from many tiny factors",
                "Add regularization",
                "Speed up training only"
              ],
              "answer": 1,
              "explain": "Products of many small probabilities underflow to 0; summing logs is numerically stable and order-preserving."
            },
            {
              "q": "Gaussian Naive Bayes is appropriate when the features are:",
              "choices": [
                "Strictly binary",
                "Word counts",
                "Continuous (each modeled as a per-class Gaussian)",
                "Categorical only"
              ],
              "answer": 2,
              "explain": "Gaussian NB estimates a mean and variance per feature per class; multinomial/Bernoulli variants handle counts/binary features."
            },
            {
              "q": "Bernoulli Naive Bayes models each feature as:",
              "choices": [
                "A probability",
                "A real number",
                "A word count",
                "Binary — present or absent"
              ],
              "answer": 3,
              "explain": "Bernoulli NB uses presence/absence indicators (and explicitly models absence), unlike multinomial NB which uses counts."
            },
            {
              "q": "The denominator $P(x)$ in Bayes' rule can be ignored when classifying because it:",
              "choices": [
                "Is the same across classes — only the numerators need comparing",
                "Is always 1",
                "Equals the prior",
                "Cancels the likelihood"
              ],
              "answer": 0,
              "explain": "$P(x)$ is a constant normalizer; the predicted class is $\\arg\\max_c P(c)\\prod_i P(x_i\\mid c)$."
            },
            {
              "q": "With Laplace (add-one) smoothing, a word never seen in spam training gets a spam likelihood that is:",
              "choices": [
                "Exactly 0",
                "Small but nonzero (not exactly 0)",
                "Exactly 1",
                "Negative"
              ],
              "answer": 1,
              "explain": "Adding 1 to every count means no estimate is ever 0, so one unseen word cannot veto the whole product."
            },
            {
              "q": "In Bayes' rule $P(c\\mid x)\\propto P(x\\mid c)\\,P(c)$, the term $P(c)$ is the:",
              "choices": [
                "Posterior",
                "Likelihood",
                "Prior — the base rate of each class",
                "Evidence"
              ],
              "answer": 2,
              "explain": "$P(c)$ is the class prior (estimated from class frequencies); $P(x\\mid c)$ is the likelihood."
            },
            {
              "q": "If the classes have equal priors, Naive Bayes reduces to choosing the class with the largest:",
              "choices": [
                "Feature mean",
                "Prior",
                "Number of features",
                "Likelihood $\\prod_i P(x_i\\mid c)$ (maximum likelihood)"
              ],
              "answer": 3,
              "explain": "Equal priors cancel, leaving a pure maximum-likelihood decision over the product of per-feature likelihoods."
            }
          ],
          "flashcards": [
            {
              "front": "What is the Naive Bayes decision rule?",
              "back": "Pick the class maximizing P(y)·∏ⱼ P(xⱼ|y) — the MAP class, since by Bayes' rule P(y|x) ∝ P(x|y)P(y) and the denominator P(x) is constant across classes."
            },
            {
              "front": "What is the 'naive' assumption and why does it help?",
              "back": "Features are conditionally independent given the class, so P(x|y)=∏ⱼP(xⱼ|y). It's usually false, but turns an impossible joint estimate into easy one-feature counts — huge variance reduction, instant training."
            },
            {
              "front": "How is Naive Bayes trained, and the variants?",
              "back": "By counting frequencies (no optimization): P(y) and each P(xⱼ|y) in one pass. Variants: Multinomial (counts/text), Bernoulli (binary), Gaussian (continuous, fit mean/variance per class)."
            },
            {
              "front": "What is Laplace smoothing and why is it needed?",
              "back": "Add-one smoothing: pretend each value was seen one extra time so no P(xⱼ|y) is exactly 0. Needed because the score is a product — one zero (an unseen value) would annihilate the whole prediction."
            },
            {
              "front": "Naive Bayes vs logistic regression (generative vs discriminative)",
              "back": "NB is generative — models P(x|y)P(y) then applies Bayes. Logistic regression is discriminative — models P(y|x) directly. NB needs less data and trains instantly (higher asymptotic error); logistic regression wins with enough data (lower error)."
            },
            {
              "front": "Why compute Naive Bayes in log-space, and where does it excel?",
              "back": "Multiplying many small likelihoods underflows to zero, so you sum log-probabilities instead. Naive Bayes is very fast, needs little data, and thrives in high dimensions — the classic baseline for text and spam classification."
            }
          ],
          "homework": [
            {
              "prompt": "A spam filter has P(spam)=0.4, P(ham)=0.6. For the word 'free': P('free'|spam)=0.5, P('free'|ham)=0.1. Ignoring all other words, classify an email containing 'free' by comparing the (unnormalized) class scores, then give the actual posterior probability of spam.",
              "hint": "Score each class as P(class) × P('free' | class), compare the two, then normalize by dividing by their sum to get the posterior.",
              "solution": "Unnormalized scores (P(class)·P('free'|class)): spam = 0.4·0.5 = 0.20; ham = 0.6·0.1 = 0.06. Since 0.20 > 0.06, classify as SPAM. To get the posterior, normalize: P(spam|'free') = 0.20/(0.20+0.06) = 0.20/0.26 ≈ 0.769, and P(ham|'free') ≈ 0.231. So the email is spam with about 77% probability. (Note we never needed P('free') itself — it cancels in the normalization.)"
            },
            {
              "prompt": "In the same filter, a new email contains the word 'blockchain', which never appeared in any spam training email, so P('blockchain'|spam) was estimated as 0. Explain what goes wrong and how Laplace smoothing fixes it.",
              "hint": "A single zero likelihood makes the whole product zero. How does adding a small pseudo-count (Laplace/add-one smoothing) avoid that?",
              "solution": "Because Naive Bayes multiplies the per-word probabilities, a single P('blockchain'|spam)=0 makes the entire spam score 0 — no matter how spammy every other word is, the email can never be classified spam. One unseen word vetoes the prediction, which is brittle and almost certainly wrong. Laplace (add-one) smoothing fixes it by adding 1 to every count (and adding the vocabulary size to the denominator), so an unseen word gets a small nonzero probability instead of 0. The product is then dominated by the informative words rather than nuked by one zero. Smoothing is essential whenever the feature space is large enough that test data will contain values unseen in training."
            },
            {
              "prompt": "Given $P(\\text{spam})=0.3$, $P(\\text{win}\\mid\\text{spam})=0.6$, and $P(\\text{win}\\mid\\text{ham})=0.1$, an email contains \"win\". Compute $P(\\text{spam}\\mid\\text{win})$.",
              "hint": "Bayes: posterior $\\propto$ prior $\\times$ likelihood; normalize over spam and ham.",
              "solution": "Spam score $=0.3\\cdot 0.6=0.18$; ham score $=0.7\\cdot 0.1=0.07$. Normalizing: $P(\\text{spam}\\mid\\text{win})=\\dfrac{0.18}{0.18+0.07}=\\dfrac{0.18}{0.25}=\\mathbf{0.72}$."
            }
          ],
          "examples": [
            {
              "title": "Classifying a document by Naive Bayes",
              "body": "Two classes, Sports and Tech, equally likely (P=0.5 each). Word likelihoods — P('game'|Sports)=0.4, P('game'|Tech)=0.1; P('chip'|Sports)=0.05, P('chip'|Tech)=0.3. A document contains 'game' and 'chip' (once each). Which class?",
              "solution": "Assuming conditional independence, multiply: Sports score = P(Sports)·P('game'|S)·P('chip'|S) = 0.5·0.4·0.05 = 0.010. Tech score = 0.5·0.1·0.3 = 0.015. Tech (0.015) > Sports (0.010), so classify as TECH. The strong 'chip'|Tech signal (0.3 vs 0.05) outweighs the 'game'|Sports signal (0.4 vs 0.1). Normalizing: P(Tech|doc) = 0.015/0.025 = 0.6, P(Sports|doc) = 0.4."
            },
            {
              "title": "Why independence can miscalibrate but still classify right",
              "body": "Spam contains the near-synonyms 'cheap' and 'discount' that almost always co-occur. Naive Bayes treats them as independent. What does this do to the probabilities, and to the final label?",
              "solution": "Because the two words carry essentially the SAME evidence but are multiplied as if independent, Naive Bayes double-counts it — the spam score is pushed far higher than warranted, so the reported P(spam) is overconfident (e.g. 0.999 when the true confidence should be lower). The probabilities are miscalibrated. But the label is usually still correct: spam was already the higher-scoring class, and the double-counting only inflates that lead, leaving the argmax (spam) unchanged. This is exactly why Naive Bayes is a poor probability estimator yet a good classifier — the decision depends only on which class wins, not on the exact probability."
            },
            {
              "title": "Laplace smoothing rescues a zero",
              "body": "A spam filter has vocabulary {free, meeting, blockchain}. In the spam training text, 'blockchain' appeared 0 times, out of $N=10$ total spam word-tokens. A new email contains 'blockchain'. What is $P(\\text{blockchain}\\mid\\text{spam})$ with and without add-one smoothing, and why does it matter?",
              "solution": "Without smoothing: $P(\\text{blockchain}\\mid\\text{spam}) = 0/10 = 0$. Because Naive Bayes multiplies the per-word probabilities, this single $0$ makes the entire spam score $0$ — no matter how spammy every other word is, the email can never be classified spam. With add-one (Laplace) smoothing you add 1 to each count and the vocabulary size $V=3$ to the denominator: $P = (0+1)/(10+3) = 1/13 \\approx 0.077$. Now the unseen word contributes a small nonzero factor instead of annihilating the product, and the informative words decide the verdict. Smoothing is essential whenever test data can contain values unseen in training."
            }
          ]
        }
      ]
    },
    {
      "id": "ml-unsupervised",
      "title": "Unsupervised Learning",
      "lessons": [
        {
          "id": "ml-kmeans",
          "title": "k-Means: Finding Groups Without Labels",
          "minutes": 17,
          "content": "<h3>1. The hook: structure with no answer key</h3>\n<p>Everything so far had labels — a target to predict. <strong>Unsupervised learning</strong> drops the labels and asks a harder, more open question: <em>what structure is hiding in this data?</em> The most famous answer is <strong>clustering</strong> — grouping similar points together — and its workhorse is <strong>k-means</strong>. Feed it customer data and it finds market segments; feed it pixels and it compresses an image; feed it documents and it groups topics. No supervision, just geometry.</p>\n\n<h3>2. The algorithm (Lloyd's)</h3>\n<p>You choose $k$, the number of clusters. Then k-means repeats two steps until nothing changes:</p>\n<ul>\n<li><strong>Assign</strong>: put each point in the cluster whose <em>centroid</em> (center) is nearest.</li>\n<li><strong>Update</strong>: move each centroid to the <em>mean</em> of the points now assigned to it.</li>\n</ul>\n<p>Start with $k$ centroids (often random points), assign, update, assign, update… The centroids drift toward dense regions and the assignments stabilize, usually within a few iterations. That alternation is the whole algorithm.</p>\n\n<div data-viz=\"ml-kmeans-viz\"></div>\n<h3>3. What it's optimizing</h3>\n<p>k-means isn't wandering aimlessly — it minimizes the <strong>within-cluster sum of squares</strong> (also called inertia): $$J = \\sum_{c=1}^{k}\\sum_{x \\in C_c} \\lVert x - \\mu_c\\rVert^2,$$ the total squared distance from each point to its cluster's centroid $\\mu_c$. Tight, compact clusters mean small $J$. Each assign step and each update step can only <em>decrease</em> $J$, which is why the algorithm steadily converges.</p>\n\n<p><b>Try it in code.</b> One k-means step on a 1-D dataset: assign each point to the nearer of two centroids (2 and 11), then recompute each centroid as its cluster's mean.</p>\n<div data-code=\"javascript\" data-expected=\"2 11\">const pts = [1,2,3,10,11,12];\nlet cents = [2, 11];\n// ASSIGN: each point to the nearer centroid (cluster 0 or 1)\nconst assign = pts.map(p => Math.abs(p-cents[0]) > Math.abs(p-cents[1]) ? 1 : 0);\n// UPDATE: each centroid becomes the mean of its assigned points\nconst mean = k => { const g = pts.filter((_,i) => assign[i]===k); return g.reduce((a,b)=>a+b,0)/g.length; };\nconsole.log(mean(0), mean(1));</div>\n<h3>4. Choosing k</h3>\n<p>$k$ is yours to pick, and there's no label to tell you the right number. Two common guides: the <strong>elbow method</strong> — plot inertia $J$ against $k$ and look for the \"elbow\" where adding clusters stops helping much; and the <strong>silhouette score</strong> — measure how well each point fits its cluster versus the next-nearest, and pick the $k$ that scores highest. Domain knowledge (\"we expect about 4 segments\") often beats both.</p>\n\n<h3>5. Initialization matters</h3>\n<p>k-means only finds a <em>local</em> optimum, and a bad random start can land it in a poor one (e.g. two centroids stuck in the same true cluster). Two standard fixes: run it several times from different random seeds and keep the lowest-inertia result; and use <strong>k-means++</strong>, a smarter initialization that spreads the initial centroids far apart, which reliably gives better, faster solutions. Both are defaults in practice.</p>\n\n<h3>6. Where k-means struggles</h3>\n<p>k-means bakes in assumptions: it favors <em>roughly spherical, similar-sized</em> clusters, because it judges everything by distance to a center. Give it long thin or ring-shaped clusters and it carves them wrongly. It's also <strong>scale-sensitive</strong> — distances dominate, so you must <em>standardize features</em> first (the same lesson as kNN and SVM). And you must commit to $k$ up front. For non-convex shapes or unknown cluster counts, reach for <em>DBSCAN</em> (density-based) or <em>spectral clustering</em>; for soft, probabilistic memberships, a <em>Gaussian Mixture Model</em>.</p>\n\n<h3>7. The clustering family</h3>\n<p>k-means is one of several approaches: <em>hierarchical clustering</em> builds a tree of nested groups (no need to fix $k$ in advance); <em>DBSCAN</em> grows clusters from dense regions and labels sparse points as noise (handles arbitrary shapes); <em>GMM</em> models each cluster as a Gaussian and assigns soft probabilities via the EM algorithm. Each trades off assumptions, shape flexibility, and the need to specify $k$.</p>\n\n<h3>8. The big picture</h3>\n<p>k-means alternates \"assign to nearest centroid\" and \"recenter on the mean,\" minimizing within-cluster variance; pick $k$ with the elbow/silhouette, initialize with k-means++, and standardize first. It's the canonical clustering algorithm — fast, simple, and everywhere (customer segmentation, image compression via vector quantization, feature learning) — and the gateway to the broader world of unsupervised learning.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: k-means is coordinate descent (so it converges — but not globally)</summary>\n<p>Why does k-means always stop, yet sometimes give a bad answer? Because it is <b>coordinate descent</b> on the inertia objective $J$.</p>\n<p><b>Two alternating minimizations.</b> Think of $J$ as a function of two sets of variables: the assignments and the centroids. The <em>assign</em> step fixes the centroids and chooses the assignments that minimize $J$ (each point to its nearest center — optimal). The <em>update</em> step fixes the assignments and chooses the centroids that minimize $J$ (each centroid at its cluster's mean — optimal, since the mean minimizes squared distance). Each step minimizes $J$ over one coordinate block, so $J$ <em>never increases</em>; being bounded below by zero and taking finitely many possible assignments, the algorithm must converge in finite steps.</p>\n<p><b>But only to a local minimum.</b> Coordinate descent finds a point where neither step alone can improve — a <em>local</em> optimum — not necessarily the global one. (Globally minimizing $J$ is NP-hard.) A poor initialization can trap it; that's exactly why k-means++ and multiple restarts exist — they give the descent a better starting point so it lands in a deeper basin.</p>\n<p>The \"aha\": k-means is guaranteed to converge because each step is an exact minimization of inertia over one block of variables (monotone, bounded, finite) — but for the same reason it only reaches a local optimum, so initialization is not a detail, it's the difference between a good and a bad clustering.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: k-means vs GMM (hard vs soft assignments)</summary>\n<p>k-means makes a <em>hard</em> call — each point belongs to exactly one cluster. A <strong>Gaussian Mixture Model (GMM)</strong> is the <em>soft</em>, probabilistic generalization, and seeing the link illuminates both.</p>\n<p><b>Soft assignments via EM.</b> A GMM models the data as a mixture of $k$ Gaussian blobs, each with its own mean, <em>covariance</em>, and weight. It's fit by the <b>EM algorithm</b>, which alternates just like k-means: the <em>E-step</em> computes each point's <em>probability</em> of belonging to each cluster (soft assignment), and the <em>M-step</em> updates each Gaussian's parameters weighted by those probabilities. A point near two clusters can be \"60% A, 40% B\" instead of being forced into one.</p>\n<p><b>k-means is GMM's stiff limit.</b> Take a GMM, force every cluster to be a sphere of equal, vanishing variance, and the soft probabilities collapse to hard 0/1 assignments — you recover k-means exactly. So k-means is GMM with spherical equal-variance clusters and hard assignment; GMM relaxes both, letting clusters be elliptical, differently sized, and overlapping with graded membership.</p>\n<p>The \"aha\": k-means and GMM are the same alternating idea (Lloyd's is a special case of EM). Use k-means for fast, simple, roughly-spherical clusters; reach for a GMM when clusters have different shapes/sizes or when you want calibrated, soft membership probabilities rather than a hard verdict.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: k-means++ — smart seeding with a guarantee</summary>\n<p>The other dive noted that k-means only finds a <em>local</em> optimum, so initialization matters. <strong>k-means++</strong> is the principled fix — and unlike plain random restarts, it comes with a <em>provable</em> guarantee.</p>\n<p><b>The seeding rule.</b> Pick the first centroid uniformly at random. Then pick each subsequent centroid from the data points with probability <em>proportional to the squared distance</em> $D(x)^2$ to the nearest already-chosen centroid. Points far from all current centroids are far likelier to be chosen, so the initial centroids spread out across the data instead of clumping — which is exactly the bad start (two seeds inside one true cluster) that traps plain random initialization.</p>\n<p><b>The guarantee.</b> Plain random seeding can be arbitrarily bad. k-means++ seeding is provably <em>$O(\\log k)$-competitive</em>: the expected inertia of the resulting clustering is within an $O(\\log k)$ factor of the global optimum — before Lloyd's iterations even refine it. So you get a far better starting point <em>and</em> a worst-case bound, for a tiny amount of extra computation. It is the default initializer in essentially every k-means implementation.</p>\n<p>The \"aha\": initialization is not a footnote for k-means — it is where the quality is won or lost. k-means++ turns \"spread the seeds out\" into a concrete rule (sample $\\propto D^2$) with an $O(\\log k)$ approximation guarantee, replacing the luck of random restarts with a near-guarantee.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: Gaussian mixture models — k-means with soft, probabilistic clusters</summary>\n<p>k-means makes a hard choice: each point belongs to exactly one cluster. A <b>Gaussian mixture model</b> (GMM) softens that. It assumes the data was generated by $K$ Gaussian components, each with its own mean $\\mu_k$, covariance $\\Sigma_k$, and mixing weight $\\pi_k$, and it assigns every point a <em>responsibility</em> $r_{ik}$ — the posterior probability that component $k$ produced point $i$. A point near a boundary can be 60% one cluster and 40% another.</p>\n<p>You fit it with the EM algorithm. The <b>E-step</b> computes the responsibilities $r_{ik} \\propto \\pi_k\\,\\mathcal{N}(x_i \\mid \\mu_k, \\Sigma_k)$ from the current parameters; the <b>M-step</b> re-estimates each component as a responsibility-weighted average — $\\mu_k$ as the weighted mean of the points, $\\Sigma_k$ as their weighted covariance, $\\pi_k$ as the total responsibility. Iterating climbs the likelihood to a local maximum.</p>\n<p>k-means is exactly the limiting case: spherical components of equal, vanishing variance, where responsibilities collapse to hard $0/1$ assignments — \"hard EM.\" So GMM is the strictly more expressive sibling: it captures elliptical and overlapping clusters that k-means cannot, and because it is a genuine generative density model you can sample from it, score the likelihood of new points, and flag anomalies.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: spectral clustering — when k-means can't see the shape</summary>\n<p>K-means partitions by Euclidean closeness to centroids, so it is blind to <em>shape</em>: two concentric rings, or the classic two moons, get sliced straight through. <b>Spectral clustering</b> fixes the geometry before clustering: build a similarity graph over the points (connect near neighbours, weight by a Gaussian kernel) and ask instead for groups that are <em>internally well-connected and weakly linked to the rest</em> — connectivity, not proximity.</p>\n<p>The machinery is pure linear algebra. Form the <b>graph Laplacian</b> $L=D-W$ (degree minus weights, usually normalized); its smallest-eigenvalue <a href=\"#/lesson/linear-algebra/la-symmetric-spectral\" data-route>eigenvectors</a> are nearly indicator functions of the graph's loosely-connected chunks. Use the bottom $k$ eigenvectors as new coordinates — the <em>spectral embedding</em> — and points from the same ring, however curved in the original space, land close together; plain k-means finishes the job there. Formally this is the relaxation of the NP-hard <b>normalized cut</b>: the discrete partition problem becomes an eigenvector problem, and the <em>eigengap</em> (a jump in the Laplacian spectrum) hints at the right number of clusters.</p>\n<p>The Laplacian's second eigenvector — the <b>Fiedler vector</b> — already bipartitions a graph by its sign pattern, which is how meshes and circuits get split for parallel computation. The same spectra power image segmentation (pixels as a graph), community detection, and the manifold-learning cousins (Laplacian eigenmaps, diffusion maps), where the random-walk reading is literal: clusters are regions a random walker takes a long time to escape.</p>\n</details>\n<div data-viz=\"ml-gmm-responsibility\"></div>\n",
          "mcq": [
            {
              "q": "k-Means clustering is what kind of learning?",
              "choices": [
                "Reinforcement learning",
                "Unsupervised — it finds groups in data with no labels",
                "Supervised regression",
                "Semi-supervised ranking"
              ],
              "answer": 1,
              "explain": "Clustering is unsupervised: there are no target labels; k-means discovers structure (groups) from the feature geometry alone."
            },
            {
              "q": "Each iteration of k-means alternates between",
              "choices": [
                "assigning each point to its nearest centroid, then moving each centroid to its cluster's mean",
                "splitting the data on the best feature",
                "computing gradients and updating weights",
                "adding one cluster at a time"
              ],
              "answer": 0,
              "explain": "Lloyd's algorithm: the assign step (nearest centroid) and the update step (centroid = mean of assigned points), repeated until assignments stop changing."
            },
            {
              "q": "What objective does k-means minimize?",
              "choices": [
                "The margin between clusters",
                "The cross-entropy of the labels",
                "The within-cluster sum of squared distances (inertia)",
                "The number of clusters"
              ],
              "answer": 2,
              "explain": "k-means minimizes inertia J = Σ Σ ‖x − μ_c‖² — total squared distance of points to their centroids. Both steps monotonically decrease it."
            },
            {
              "q": "Why are k-means++ or multiple random restarts used?",
              "choices": [
                "To increase the number of clusters automatically",
                "To avoid standardizing the features",
                "To turn k-means into a supervised method",
                "Because k-means converges only to a local optimum, so initialization affects the result"
              ],
              "answer": 3,
              "explain": "k-means is coordinate descent → a local optimum. A bad start gives a poor clustering; k-means++ spreads initial centroids and restarts keep the best."
            },
            {
              "q": "The 'elbow method' is a heuristic for choosing",
              "choices": [
                "the learning rate",
                "k, the number of clusters",
                "the distance metric",
                "the random seed"
              ],
              "answer": 1,
              "explain": "Plot inertia vs k and look for the 'elbow' where extra clusters stop reducing inertia much — a guide to a sensible number of clusters."
            },
            {
              "q": "A key limitation of k-means is that it assumes clusters are",
              "choices": [
                "labeled in advance",
                "always exactly two in number",
                "linearly separable by a hyperplane",
                "roughly spherical and similar in size (it struggles with non-convex shapes)"
              ],
              "answer": 3,
              "explain": "Judging by distance to a center, k-means favors spherical, similar-size clusters and mis-cuts elongated or ring-shaped ones (use DBSCAN/spectral there)."
            },
            {
              "q": "Why should you standardize features before running k-means?",
              "choices": [
                "It is distance-based, so a large-range feature would dominate the clustering",
                "k-means requires positive values",
                "To reduce the number of clusters",
                "To make it supervised"
              ],
              "answer": 0,
              "explain": "Like kNN and SVMs, k-means uses distances; without scaling, a large-range feature dominates and the clusters reflect that feature alone."
            },
            {
              "q": "How does a Gaussian Mixture Model (GMM) differ from k-means?",
              "choices": [
                "It requires labels",
                "It cannot be used for clustering",
                "It makes soft, probabilistic cluster assignments (via EM) rather than hard ones",
                "It is always faster"
              ],
              "answer": 2,
              "explain": "GMM (fit by EM) gives each point a probability of membership in each Gaussian cluster; k-means is the hard-assignment, spherical-equal-variance special case."
            },
            {
              "q": "Run k-means on $\\{1,2,3,10,11,12\\}$ with centroids at 2 and 11. After one assign + update step, the centroids are:",
              "choices": [
                "Still $2$ and $11$ — it has converged",
                "$1.5$ and $11.5$",
                "$6.5$ and $6.5$",
                "$3$ and $10$"
              ],
              "answer": 0,
              "explain": "Points split as $\\{1,2,3\\}$ and $\\{10,11,12\\}$ with means $2$ and $11$ — unchanged, so the assignments are stable."
            },
            {
              "q": "The assign step of k-means assigns each point to:",
              "choices": [
                "A random cluster",
                "Its nearest centroid",
                "The cluster with the fewest points",
                "The global mean"
              ],
              "answer": 1,
              "explain": "Each point joins the cluster whose centroid is closest (by Euclidean distance)."
            },
            {
              "q": "The update step of k-means moves each centroid to:",
              "choices": [
                "The median of all the data",
                "A random assigned point",
                "The mean of the points assigned to it",
                "The nearest data point"
              ],
              "answer": 2,
              "explain": "Setting the centroid to the cluster mean is exactly what minimizes that cluster's squared distance."
            },
            {
              "q": "k-means is guaranteed to:",
              "choices": [
                "Increase inertia over time",
                "Find the global optimum",
                "Run forever",
                "Decrease the objective each step and converge to a local optimum"
              ],
              "answer": 3,
              "explain": "Both steps never increase the inertia, so it converges — but to a local optimum depending on initialization."
            },
            {
              "q": "As the number of clusters $k$ increases, the within-cluster sum of squares (inertia):",
              "choices": [
                "Decreases monotonically, reaching $0$ at $k=n$",
                "Increases",
                "Stays constant",
                "Oscillates"
              ],
              "answer": 0,
              "explain": "More clusters always fit tighter, so you cannot just minimize inertia over $k$ — hence the elbow heuristic."
            },
            {
              "q": "The cost of one k-means iteration is roughly:",
              "choices": [
                "$O(n^2)$",
                "$O(n\\,k\\,d)$ — each of $n$ points compared to $k$ centroids in $d$ dimensions",
                "$O(k^n)$",
                "$O(1)$"
              ],
              "answer": 1,
              "explain": "The assign step dominates: $n$ points times $k$ centroids times $d$ features."
            },
            {
              "q": "k-means requires features that are:",
              "choices": [
                "Already clustered",
                "Strictly binary",
                "Numeric with a meaningful distance (categorical data needs k-modes)",
                "Probabilities summing to 1"
              ],
              "answer": 2,
              "explain": "Means and Euclidean distances need numeric features; categorical variants (k-modes/k-prototypes) replace the mean and metric."
            },
            {
              "q": "The centroids k-means returns are:",
              "choices": [
                "The farthest-apart points",
                "Always real data points",
                "The cluster medoids",
                "Cluster means (centers of mass), not necessarily actual data points"
              ],
              "answer": 3,
              "explain": "A centroid is the average of its members; k-medoids instead restricts centers to be actual data points."
            },
            {
              "q": "Why does spectral clustering separate two concentric rings where k-means fails?",
              "choices": [
                "It uses a larger number of centroids",
                "It clusters by graph connectivity: in the Laplacian-eigenvector embedding, each well-connected ring collapses to its own tight group, however curved it was originally",
                "It whitens the data first",
                "It replaces Euclidean distance with Manhattan distance"
              ],
              "answer": 1,
              "explain": "Points on the same ring are chained together through near neighbours; the bottom Laplacian eigenvectors are nearly indicators of such chunks, so the embedding makes the rings linearly separable — then k-means is easy."
            }
          ],
          "flashcards": [
            {
              "front": "What are the two steps of the k-means algorithm?",
              "back": "Assign: put each point in the cluster of its nearest centroid. Update: move each centroid to the mean of its assigned points. Repeat until assignments stop changing (Lloyd's algorithm)."
            },
            {
              "front": "What does k-means minimize, and why does it converge?",
              "back": "Inertia J = Σ_c Σ_{x∈C_c} ‖x−μ_c‖² (within-cluster sum of squares). It's coordinate descent — both steps minimize J over one block, so J never increases → converges (to a local optimum)."
            },
            {
              "front": "How do you choose k, and why does initialization matter?",
              "back": "Choose k via the elbow method (inertia vs k) or silhouette score (or domain knowledge). k-means only finds a local optimum, so use k-means++ initialization and/or multiple restarts (keep lowest inertia)."
            },
            {
              "front": "Key limitations of k-means",
              "back": "Assumes roughly spherical, similar-size clusters (fails on non-convex/ring shapes → DBSCAN/spectral); scale-sensitive (standardize first); must fix k in advance; only a local optimum."
            },
            {
              "front": "k-means vs GMM (hard vs soft)",
              "back": "k-means = hard assignment, spherical equal-variance clusters. GMM = soft probabilistic assignment via EM, with per-cluster mean/covariance/weight. k-means is the zero-variance, hard-assignment limit of a GMM; EM generalizes Lloyd's."
            },
            {
              "front": "Does k-means find the global optimum? What is k-means++?",
              "back": "No — Lloyd's algorithm reaches a local optimum that depends on initialization, so run it several times and keep the lowest-inertia result. k-means++ seeds the centroids spread far apart, giving better and more reliable clusters."
            },
            {
              "front": "Spectral clustering recipe",
              "back": "Similarity graph → Laplacian $L=D-W$ → bottom $k$ eigenvectors as coordinates → k-means in that embedding. Connectivity beats proximity: rings and moons separate."
            },
            {
              "front": "Fiedler vector",
              "back": "Second-smallest Laplacian eigenvector; its signs bipartition the graph, and its eigenvalue (algebraic connectivity) says how cuttable the graph is."
            }
          ],
          "homework": [
            {
              "prompt": "On a 1-D dataset {1, 2, 3, 10, 11, 12} you run k-means with k=2, starting with centroids at 2 and 11. Carry out one assign step and one update step, and state whether it has converged.",
              "hint": "Assign each point to its nearer centroid (2 or 11), then move each centroid to the mean of its assigned points. It has converged when the assignments stop changing.",
              "solution": "Assign step (nearest of {2, 11}): points 1,2,3 are closer to 2 (distances to 2: 1,0,1; to 11: 10,9,8); points 10,11,12 are closer to 11 (distances to 11: 1,0,1; to 2: 8,9,10). Clusters: {1,2,3} and {10,11,12}. Update step (centroid = mean): mean(1,2,3)=2; mean(10,11,12)=11. The centroids are still 2 and 11 — unchanged — so a re-assign would give the same clusters. It has CONVERGED in one iteration (inertia J = (1+0+1)+(1+0+1) = 4). The clean separation and good initialization made it immediate."
            },
            {
              "prompt": "A colleague clusters customers on (age in years, annual income in dollars) with k-means and finds the clusters split almost entirely by income, ignoring age. Explain why, and how to fix it.",
              "hint": "Income has a far larger numeric range than age, so it dominates the Euclidean distance. What scaling puts the two features on equal footing?",
              "solution": "k-means uses Euclidean distance, which sums squared differences across features. Income spans a huge numeric range (tens of thousands) while age spans tens, so income differences dominate the distance almost completely — two customers' 'closeness' is decided by income alone, and age barely registers. The clusters therefore split on income. Fix: standardize each feature first (subtract mean, divide by standard deviation) so age and income contribute on equal footing; then re-run k-means. This is the same scaling requirement as kNN and SVMs — any distance-based method needs comparable feature scales."
            },
            {
              "prompt": "A cluster contains the two points $(0,0)$ and $(0,2)$. Compute its centroid and its within-cluster sum of squares (WCSS).",
              "hint": "The centroid is the mean; WCSS sums the squared distances from each point to it.",
              "solution": "Centroid $=(0,1)$ (the mean of the coordinates). Squared distances: $(0-0)^2+(0-1)^2=1$ and $(0-0)^2+(2-1)^2=1$. WCSS $=1+1=\\mathbf{2}$ — the quantity k-means drives down."
            }
          ],
          "examples": [
            {
              "title": "One full k-means iteration in 2-D",
              "body": "Points A(1,1), B(1,2), C(8,8), D(9,8). Initial centroids μ1=(0,0), μ2=(10,10), k=2. Do one assign + update step.",
              "solution": "Assign (nearest centroid): A,B are far closer to μ1=(0,0) than μ2=(10,10) (e.g. A: dist to μ1 ≈ 1.41, to μ2 ≈ 12.7); C,D are closer to μ2. Clusters: {A,B} and {C,D}. Update (mean): μ1 = mean of A(1,1),B(1,2) = (1, 1.5); μ2 = mean of C(8,8),D(9,8) = (8.5, 8). The centroids jumped from the corners to the centers of the two natural groups. A second iteration would re-assign the same way and leave the centroids put — converged, with two tight clusters."
            },
            {
              "title": "Reading an elbow plot",
              "body": "You run k-means for k = 1..6 and get inertia values 1000, 300, 120, 95, 80, 70. How many clusters does the elbow method suggest?",
              "solution": "Look at how much each extra cluster reduces inertia: k1→2 drops 700, k2→3 drops 180, k3→4 drops 25, k4→5 drops 15, k5→6 drops 10. The big gains stop after k=3 (the 700 and 180 drops), and from k=3 onward the curve flattens (25, 15, 10 — diminishing returns). The 'elbow' is at k=3, so the elbow method suggests 3 clusters: beyond that you're mostly fitting noise, not real structure. (Confirm with a silhouette score if the elbow is ambiguous.)"
            },
            {
              "title": "Computing the WCSS that k-means minimizes",
              "body": "k-means minimizes the within-cluster sum of squares (WCSS): $\\sum_i \\lVert x_i - c_{(i)}\\rVert^2$, the total squared distance from each point to its cluster's center. For clusters A=$\\{(0,0),(2,0)\\}$ and B=$\\{(5,0),(7,0)\\}$, compute it.",
              "solution": "First the centroids (the mean of each cluster): $c_A=(1,0)$ and $c_B=(6,0)$. Cluster A's squared distances: $(0-1)^2+(2-1)^2 = 1+1 = 2$. Cluster B's: $(5-6)^2+(7-6)^2 = 1+1 = 2$. Total WCSS $= 2+2 = 4$. This single number is k-means' objective — every assign-then-recenter step provably lowers it (or leaves it unchanged), which is why the algorithm converges. It is also what the elbow plot tracks against $k$: WCSS always drops as $k$ grows, so you look for the bend where extra clusters stop helping, not the minimum."
            }
          ]
        },
        {
          "id": "ml-dimensionality-reduction",
          "title": "Dimensionality Reduction: PCA, t-SNE & UMAP",
          "minutes": 16,
          "content": "<h3>1. The hook: too many features</h3>\n<p>Real data often has hundreds or thousands of features, but the meaningful variation usually lives in far fewer dimensions. High dimensionality brings the <b>curse of dimensionality</b> — distances become uninformative, models overfit, and visualization is impossible. <b>Dimensionality reduction</b> finds a low-dimensional representation that keeps what matters, for compression, denoising, faster models, and seeing your data.</p>\n<div data-viz=\"ml-curse-dimensionality\"></div>\n<h3>2. The idea: find the low-dimensional structure</h3>\n<p>The bet is that data lies near a low-dimensional <em>manifold</em> embedded in the high-dimensional space — points scattered in 1000-D might really sit close to a 2-D sheet. Reduction methods recover coordinates on that sheet. They split into <b>linear</b> (PCA) and <b>nonlinear</b> (t-SNE, UMAP) families.</p>\n<h3>3. PCA: the variance-preserving projection</h3>\n<div data-viz=\"la-pca\"></div>\n<p><b>Principal Component Analysis</b> finds the orthogonal directions of greatest variance and projects onto the top few. The first principal component is the axis along which the data spreads most; each next one is orthogonal and captures the most remaining variance. Keeping the top $k$ components gives the best <em>linear</em> $k$-dimensional approximation of the data (minimum reconstruction error).</p>\n<h3>4. How many components? Variance explained</h3>\n<p>Each component's eigenvalue is the variance it captures; the <b>explained-variance ratio</b> tells you how many to keep. Often a handful capture most of it:</p>\n<div data-code=\"javascript\" data-expected=\"top-1: 53% variance\ntop-2: 80% variance\ntop-3: 93% variance\ntop-4: 100% variance\">// PCA: cumulative variance captured by the top principal components\nconst eigenvalues = [4.0, 2.0, 1.0, 0.5];   // variance along each component (sorted desc)\nconst total = eigenvalues.reduce((a, b) => a + b, 0);\nlet cum = 0;\neigenvalues.forEach((v, i) => {\n  cum += v;\n  console.log(\"top-\" + (i + 1) + \": \" + Math.round(100 * cum / total) + \"% variance\");\n});\n// Here 2 of 4 components already capture 80% -- keep those, drop the rest.</div>\n<h3>5. PCA in the ML pipeline</h3>\n<p>PCA is a workhorse preprocessing step: <b>compress</b> features (speed + less overfit), <b>denoise</b> (drop low-variance components that are mostly noise), <b>decorrelate/whiten</b> inputs, and visualize in 2-D/3-D. Because it is a fixed linear map learned on the training set, it applies cleanly to new data — fit on train, transform everywhere.</p>\n<h3>6. Nonlinear methods: t-SNE and UMAP</h3>\n<p>When structure is curved, linear PCA flattens it. <b>t-SNE</b> and <b>UMAP</b> are nonlinear methods built for <em>visualization</em>: they place points in 2-D so that local neighborhoods are preserved — nearby points stay nearby — revealing clusters PCA can miss. UMAP is faster and tends to keep more global structure; t-SNE often gives crisp local clusters.</p>\n<h3>7. Choosing a method</h3>\n<p>Use <b>PCA</b> when you want a fast, invertible, general-purpose reduction for modeling or compression (and a baseline). Use <b>t-SNE/UMAP</b> when you want to <em>see</em> cluster structure in 2-D — but treat them as visualization tools, not preprocessing for downstream models (they are not designed to be applied to new points the way PCA is, and UMAP's embedding is stochastic).</p>\n<p class=\"see-also\"><b>See also:</b> PCA is pure linear algebra underneath — see <a href=\"#/lesson/linear-algebra/la-low-rank-pca\" data-route>Low-Rank Approximation and PCA</a> for how the principal components ARE the top eigenvectors of the covariance (equivalently, the SVD).</p>\n<h3>8. The big picture</h3>\n<p>Dimensionality reduction is the unsupervised counterpart to clustering: clustering groups points, reduction re-coordinates them. Together they are how you explore unlabeled data — and PCA in particular threads through the whole stack, from preprocessing to the SVD-based methods that power recommender systems and embeddings.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: PCA is the eigendecomposition of the covariance (and the SVD)</summary>\n<p>Center the data matrix $X$; its covariance is $\\Sigma=\\tfrac{1}{n}X^\\top X$. The principal components are the <b>eigenvectors of $\\Sigma$</b>, and their eigenvalues are the variances captured. Equivalently, the <b>SVD</b> $X=U\\Sigma V^\\top$ gives the components directly as the right singular vectors $V$ — which is how PCA is computed in practice (more stable than forming the covariance). So PCA, the covariance eigenproblem, and the truncated SVD are three views of one thing.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why t-SNE distances lie</summary>\n<p>t-SNE optimizes only that <em>near</em> points stay near; it makes no promise about far ones. So in a t-SNE plot, the <b>distance between clusters is not meaningful</b>, <b>cluster sizes are not meaningful</b> (dense and sparse clusters get rescaled), and the layout changes with the perplexity hyperparameter and random seed. Read it as \"these points are neighbors,\" never as \"these two clusters are twice as far apart as those.\"</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: PCA vs autoencoders</summary>\n<p>A linear <b>autoencoder</b> with a bottleneck and squared-error loss learns exactly the PCA subspace — PCA is the optimal <em>linear</em> compression. Swap in nonlinear activations and depth and the autoencoder can capture curved manifolds PCA cannot, at the cost of a harder, non-convex optimization. So PCA is the closed-form linear special case of the broader deep-learning idea of learning a compact latent code.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why distances concentrate in high dimensions</summary>\n<p>The curse has a precise, startling cause: as the dimension $d$ grows, pairwise distances <b>concentrate</b>. For points spread through a high-dimensional space, the ratio of the nearest neighbor's distance to the farthest neighbor's distance tends toward $1$ — almost everything becomes roughly <em>equidistant</em>. The intuition: a distance is a sum of $d$ per-coordinate contributions, and by concentration of measure its relative spread shrinks like $1/\\sqrt{d}$, so the contrast between \"near\" and \"far\" collapses. That is exactly why $k$-NN, clustering, and density estimates degrade in high dimensions — \"nearest neighbor\" stops being meaningfully nearer than anything else — and why projecting onto a few informative directions first can rescue them.</p>\n</details>",
          "mcq": [
            {
              "q": "The \"curse of dimensionality\" refers to:",
              "choices": [
                "Distances becoming uninformative and models overfitting as features grow",
                "Models training too fast",
                "Having too few features",
                "Labels being noisy"
              ],
              "answer": 0,
              "explain": "High-D space makes distances/density degenerate."
            },
            {
              "q": "PCA reduces dimensions by:",
              "choices": [
                "Randomly dropping features",
                "Projecting onto the orthogonal directions of greatest variance",
                "Keeping the features with the largest names",
                "Adding noise"
              ],
              "answer": 1,
              "explain": "Top principal components = max-variance directions."
            },
            {
              "q": "A component's eigenvalue in PCA represents:",
              "choices": [
                "The class label",
                "The number of features",
                "The amount of variance captured along that component",
                "The learning rate"
              ],
              "answer": 2,
              "explain": "Eigenvalue = variance along that principal direction."
            },
            {
              "q": "t-SNE and UMAP are primarily used for:",
              "choices": [
                "Computing exact distances",
                "Linear compression for deployment",
                "Supervised classification",
                "Nonlinear 2-D visualization that preserves local neighborhoods"
              ],
              "answer": 3,
              "explain": "Neighborhood-preserving visualization of clusters."
            },
            {
              "q": "In a t-SNE plot, the distance between two clusters is:",
              "choices": [
                "Not meaningful — t-SNE only preserves local neighborhoods",
                "Exactly the true distance",
                "Proportional to class difference",
                "Always zero"
              ],
              "answer": 0,
              "explain": "t-SNE makes no promise about far-apart points."
            },
            {
              "q": "Keeping the top $k$ principal components gives:",
              "choices": [
                "A nonlinear embedding",
                "The best linear $k$-dimensional approximation of the data",
                "A random subset of features",
                "The class boundaries"
              ],
              "answer": 1,
              "explain": "PCA minimizes linear reconstruction error."
            },
            {
              "q": "For preprocessing 300 features down to 30 for a deployed model, prefer:",
              "choices": [
                "UMAP — it is deterministic",
                "t-SNE — it generalizes to new points",
                "PCA — a fixed, invertible linear map you can apply to new points",
                "No reduction is ever helpful"
              ],
              "answer": 2,
              "explain": "PCA is a stable transform; t-SNE/UMAP are for viz."
            },
            {
              "q": "A linear autoencoder with a bottleneck and squared-error loss learns:",
              "choices": [
                "Nothing useful",
                "A nonlinear manifold PCA cannot",
                "The class labels",
                "The same subspace as PCA"
              ],
              "answer": 3,
              "explain": "PCA is the optimal linear compression = linear autoencoder."
            },
            {
              "q": "PCA's first principal component is:",
              "choices": [
                "The direction along which the data varies most",
                "The feature with the largest name",
                "A random direction",
                "The class label"
              ],
              "answer": 0,
              "explain": "PC1 maximizes captured variance."
            },
            {
              "q": "The principal components are always:",
              "choices": [
                "Parallel",
                "Mutually orthogonal",
                "Equal in variance",
                "Identical to the original features"
              ],
              "answer": 1,
              "explain": "Each PC is orthogonal to the others."
            },
            {
              "q": "In practice, PCA is computed via:",
              "choices": [
                "A decision tree",
                "Gradient descent on labels",
                "The SVD (or the eigendecomposition of the covariance matrix)",
                "Random projection only"
              ],
              "answer": 2,
              "explain": "SVD of centered data = PCA components."
            },
            {
              "q": "\"Whitening\" with PCA means transforming features to be:",
              "choices": [
                "Sorted by name",
                "All set to zero",
                "Duplicated",
                "Decorrelated and scaled to unit variance"
              ],
              "answer": 3,
              "explain": "Whitening removes correlation and equalizes variance."
            },
            {
              "q": "Compared to t-SNE, UMAP tends to be:",
              "choices": [
                "Faster and to preserve more global structure",
                "Slower and purely local",
                "A linear method",
                "Identical in every way"
              ],
              "answer": 0,
              "explain": "UMAP is faster and keeps more global layout."
            },
            {
              "q": "PCA's key limitation is that it:",
              "choices": [
                "Cannot reduce dimensions",
                "Only captures linear structure — it flattens curved manifolds",
                "Requires labels",
                "Is always slower than t-SNE"
              ],
              "answer": 1,
              "explain": "PCA is linear; nonlinear structure needs t-SNE/UMAP."
            },
            {
              "q": "The explained-variance ratio of a principal component equals:",
              "choices": [
                "Its index",
                "The number of features",
                "Its eigenvalue divided by the sum of all eigenvalues",
                "One minus the learning rate"
              ],
              "answer": 2,
              "explain": "Fraction of total variance that component captures."
            },
            {
              "q": "Unlike t-SNE, PCA gives:",
              "choices": [
                "Class predictions",
                "A different result every run",
                "Only a 2-D plot",
                "A reusable, invertible linear transform you can apply to new data"
              ],
              "answer": 3,
              "explain": "PCA is a fixed linear map; t-SNE/UMAP are viz embeddings."
            }
          ],
          "flashcards": [
            {
              "front": "What does dimensionality reduction do?",
              "back": "Finds a low-dimensional representation of high-dimensional data that preserves the meaningful structure — for compression, denoising, speed, and visualization."
            },
            {
              "front": "What does PCA find?",
              "back": "The orthogonal directions (principal components) of greatest variance; projecting onto the top $k$ gives the best linear $k$-dimensional approximation."
            },
            {
              "front": "Explained-variance ratio",
              "back": "Each component's eigenvalue over the total — tells you how many components to keep (often a few capture most of the variance)."
            },
            {
              "front": "t-SNE / UMAP",
              "back": "Nonlinear methods for 2-D visualization that preserve <em>local</em> neighborhoods, revealing clusters; UMAP is faster and keeps more global structure."
            },
            {
              "front": "Key t-SNE caveat",
              "back": "Between-cluster distances and cluster sizes in a t-SNE plot are NOT meaningful — it only preserves local neighborhoods."
            },
            {
              "front": "PCA vs t-SNE/UMAP — when?",
              "back": "PCA for fast, invertible, general-purpose reduction/preprocessing; t-SNE/UMAP for <em>seeing</em> cluster structure (visualization), not as preprocessing for new points."
            }
          ],
          "homework": [
            {
              "prompt": "A dataset's principal components have variances (eigenvalues) $[6, 3, 1]$. What fraction of the total variance do the top 2 components capture?",
              "hint": "Sum top-2 over total.",
              "solution": "Total $=6+3+1=10$; top 2 capture $6+3=9$, i.e. $9/10=90\\%$. So a 2-D PCA projection retains 90% of the variance — usually plenty to model or plot."
            },
            {
              "prompt": "Why should you NOT interpret the distance between two clusters in a t-SNE plot as meaningful?",
              "hint": "What does t-SNE optimize?",
              "solution": "t-SNE only optimizes that nearby (neighboring) points remain nearby; it places no constraint on far-apart points. So inter-cluster gaps are artifacts of the layout and hyperparameters, not real distances — two clusters drawn far apart may be no more dissimilar than two drawn close."
            },
            {
              "prompt": "Give two distinct reasons to run PCA before training a model.",
              "hint": "Think speed, overfitting, noise, correlation.",
              "solution": "Any two of: (1) <b>speed</b> — fewer features means faster training/inference; (2) <b>less overfitting</b> — dropping low-variance directions reduces parameters/noise; (3) <b>denoising</b> — low-variance components are often noise; (4) <b>decorrelation/whitening</b> — PCA produces uncorrelated features, which some models prefer."
            }
          ],
          "examples": [
            {
              "title": "Reading explained variance",
              "body": "PCA on 50 features shows the first 5 components explain 92% of variance. What does that suggest?",
              "solution": "The data effectively lives in a ~5-dimensional subspace: you can project 50 → 5 features and keep 92% of the variation, hugely simplifying modeling and enabling a near-lossless compression. The remaining 45 components (8% of variance) are mostly noise or redundancy you can drop."
            },
            {
              "title": "PCA can't, t-SNE can",
              "body": "Two classes form two interleaved spirals. A 2-D PCA plot shows them overlapping; t-SNE separates them. Why?",
              "solution": "The spirals are a curved (nonlinear) structure. PCA can only take linear projections, so no straight-line axes separate interleaved spirals — they collapse on top of each other. t-SNE preserves local neighborhoods nonlinearly, so points along each spiral stay together and the two emerge as distinct clusters. Use PCA for linear structure, t-SNE/UMAP to see nonlinear clusters."
            },
            {
              "title": "When NOT to use t-SNE",
              "body": "You want to reduce 300 features to 30 as preprocessing for a classifier you'll deploy. PCA or t-SNE?",
              "solution": "PCA. It learns a fixed linear map you can apply to new/test points consistently and invert, and 30-D is a sensible modeling target. t-SNE/UMAP are visualization tools (typically 2–3 D, neighborhood-preserving, not a stable transform for unseen points), so they are the wrong choice for a deployable preprocessing step."
            }
          ]
        }
      ]
    },
    {
      "id": "ml-ensembles",
      "title": "Ensembles",
      "lessons": [
        {
          "id": "ml-ensembles",
          "title": "Ensembles: Bagging, Boosting & Random Forests",
          "minutes": 18,
          "content": "<h3>1. The hook: the wisdom of crowds</h3>\n<p>Ask one expert and you get one biased opinion; poll a diverse crowd and the average is often startlingly accurate. <strong>Ensemble methods</strong> apply this to machine learning: instead of betting on a single model, train <em>many</em> and combine their predictions. The result routinely beats any individual member — and on <em>tabular</em> data, ensembles of decision trees (random forests and gradient boosting) are still the reigning champions, frequently outperforming deep neural networks.</p>\n\n<h3>2. Why combining helps</h3>\n<p>A single flexible model (like a deep decision tree) is often <em>high variance</em> — it swings wildly with small data changes. If you average many such models whose errors are <em>not perfectly correlated</em>, the errors partly cancel while the signal reinforces, so the combined prediction is more stable and accurate. The two great families exploit this differently: <strong>bagging</strong> attacks variance, <strong>boosting</strong> attacks bias.</p>\n\n<div data-viz=\"ml-bagging-viz\"></div>\n<h3>3. Bagging (bootstrap aggregating)</h3>\n<p><strong>Bagging</strong> trains each model on a different <em>bootstrap sample</em> — a random resample of the training data drawn <em>with replacement</em> — then averages their outputs (or takes a majority vote). Because each model sees a slightly different dataset, they make different errors, and averaging cancels much of the variance. Bagging shines on high-variance, low-bias base learners: full-grown decision trees are the classic choice. (Bonus: the ~37% of points left out of each bootstrap give a free \"out-of-bag\" validation estimate.)</p>\n\n<p><b>Try it in code.</b> Combine five classifiers by majority vote — the simplest ensemble.</p>\n<div data-code=\"javascript\" data-expected=\"1\">// 5 independent classifiers vote on a binary label\nconst votes = [1, 0, 1, 1, 0];\nconst ones = votes.filter(v => v === 1).length;\n// majority vote: the ensemble's prediction\nconsole.log(ones > votes.length - ones ? 1 : 0);</div>\n<h3>4. Random forests</h3>\n<p>A <strong>random forest</strong> is bagging on decision trees with one extra twist: at <em>each split</em>, the tree may only consider a <em>random subset of the features</em>. Why cripple each tree? Because if one feature is very strong, plain bagged trees would all split on it first and end up <em>correlated</em> — and averaging correlated models barely helps. Forcing feature randomness <strong>decorrelates</strong> the trees, so averaging cuts variance much further. The random forest is the practical default: accurate, robust, little tuning, and it reports feature importance for free.</p>\n\n<h3>5. Boosting</h3>\n<p><strong>Boosting</strong> takes the opposite tack: train models <em>sequentially</em>, each one focused on the mistakes of the ones before. <em>AdaBoost</em> re-weights the training points after each round, up-weighting those still misclassified so the next model concentrates on them; the final prediction is a weighted vote. Boosting combines many <em>weak</em> learners (often shallow trees, \"stumps\") into a strong one, and it mainly reduces <strong>bias</strong> — turning underfitting models into an accurate committee.</p>\n\n<h3>6. Gradient boosting</h3>\n<p>The modern powerhouse is <strong>gradient boosting</strong>: each new tree is fit to the <em>residual errors</em> (more precisely, the negative gradient of the loss) of the ensemble so far, then added with a small <em>learning rate</em>. Step by step the ensemble descends the loss. Implementations like <strong>XGBoost</strong> and <strong>LightGBM</strong> are the go-to winners of tabular-data competitions. The price of boosting's accuracy is care: too many trees or too large a learning rate overfits, so you regularize with shallow trees, a small learning rate, subsampling, and early stopping.</p>\n\n<h3>7. Bagging vs boosting</h3>\n<p>A clean contrast. <em>Bagging</em>: parallel (trees independent), each a strong learner, reduces <em>variance</em>, hard to overfit, easy to tune. <em>Boosting</em>: sequential (each depends on the last), each a weak learner, reduces <em>bias</em>, can be more accurate but easier to overfit and needs tuning. Random forests vs gradient-boosted trees is the everyday embodiment of this trade-off.</p>\n\n<h3>8. The big picture</h3>\n<p>Ensembles combine many models so their errors cancel: bagging/random forests average independent high-variance trees to cut variance; boosting/gradient boosting builds trees sequentially to cut bias. Together — especially gradient-boosted trees — they are the state of the art for structured/tabular data. The meta-lesson: a crowd of diverse, imperfect models, combined well, beats a single perfect-seeming one.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why averaging reduces variance (and why decorrelation is everything)</summary>\n<p>Bagging's power is a one-line piece of probability — and that same line explains exactly why random forests add feature randomness.</p>\n<p><b>Independent case.</b> Average $n$ models whose predictions each have variance $\\sigma^2$ and are <em>uncorrelated</em>. The variance of their average is $\\sigma^2 / n$ — it shrinks toward zero as you add models. (The bias is unchanged: averaging unbiased-but-noisy models keeps the bias, kills the variance. That's why you bag <em>low-bias, high-variance</em> learners like full trees.)</p>\n<p><b>Correlated case — the catch.</b> Real bagged models aren't independent: trained on overlapping data, they're correlated by some $\\rho$. Then the variance of the average is $\\rho\\,\\sigma^2 + \\frac{1-\\rho}{n}\\,\\sigma^2$. As $n \\to \\infty$ the second term vanishes but the first, $\\rho\\,\\sigma^2$, <em>remains</em> — a floor set by the correlation. So no matter how many trees you add, correlation caps the benefit.</p>\n<p><b>Why random forests exist.</b> That formula is the entire rationale: to push variance lower you must shrink $\\rho$. Random feature selection at each split forces the trees to differ, lowering $\\rho$ and thus the floor — buying variance reduction that plain bagging can't. Random forests are, literally, bagging engineered to minimize $\\rho$.</p>\n<p>The \"aha\": averaging cuts variance as $\\sigma^2/n$ only when models are independent; correlation leaves an irreducible $\\rho\\sigma^2$ floor. Decorrelating the ensemble (random forests' feature subsampling) is therefore not a tweak — it's the whole game.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: boosting turns weak learners into a strong one</summary>\n<p>Boosting rests on a surprising theoretical result and a beautiful reframing as optimization.</p>\n<p><b>The weak-learning theorem.</b> A <em>weak learner</em> only needs to do <em>slightly</em> better than random guessing. Schapire and Freund proved that such weak learners can be <em>combined</em> (boosted) into a learner of <em>arbitrarily high</em> accuracy. AdaBoost realizes this: each round re-weights the data toward the currently-misclassified points, forcing the next weak learner to fix what the committee gets wrong, and weights each learner's vote by how well it did. Errors get hunted down one round at a time.</p>\n<p><b>Gradient boosting as gradient descent in function space.</b> The modern view generalizes this to any differentiable loss. Treat the ensemble's prediction as the thing being optimized: at each step compute the <em>negative gradient</em> of the loss with respect to the current predictions (for squared error this is just the residuals), and fit a new tree to <em>that</em>. Adding the tree (scaled by a learning rate) is one step of gradient descent — but in the space of <em>functions</em>, not parameters. Boosting is literally gradient descent where each \"step\" is a small tree.</p>\n<p><b>The catch.</b> Because boosting keeps reducing training error, it can drive bias to zero and start fitting noise. The regularizers — shallow trees, a small learning rate (shrinkage), row/column subsampling, and early stopping on a validation set — are what keep it honest.</p>\n<p>The \"aha\": boosting is not just \"more trees.\" It's a theorem (weak ⇒ strong) made practical as gradient descent in function space, sequentially fitting each tree to the current errors. That's why gradient-boosted trees are so accurate — and why they need disciplined regularization to avoid overfitting.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: stacking, and the ensemble's free gifts</summary>\n<p>Bagging and boosting combine <em>same-type</em> models, but the ensemble idea is broader — and tree ensembles hand you two valuable extras for free.</p>\n<p><b>Stacking (stacked generalization).</b> Instead of averaging models of one kind, train several <em>diverse</em> base models (say a random forest, a gradient-boosted tree, a logistic regression, and a kNN), then train a <em>meta-model</em> that takes their predictions as inputs and learns how best to combine them. The meta-learner discovers which base model to trust in which regime. Done with care — the base predictions used to train the meta-model must come from <em>out-of-fold</em> predictions, to avoid leakage — stacking squeezes out extra accuracy and is a staple of winning competition solutions.</p>\n<p><b>Out-of-bag error.</b> In bagging, each tree trains on a bootstrap sample that omits about 37% of the data; those left-out points form a built-in validation set for that tree. Averaging predictions over only the trees that <em>did not</em> see each point gives the <strong>out-of-bag (OOB) error</strong> — a free, cross-validation-quality estimate with no separate holdout.</p>\n<p><b>Feature importance.</b> Forests also report which features matter — by how much each feature's splits reduce impurity, or via permutation (shuffle a feature and watch accuracy drop). It is a quick, model-based read on what drives the predictions.</p>\n<p>The \"aha\": ensembling is not only bagging and boosting trees. <em>Stacking</em> combines <em>diverse</em> models with a learned meta-model (use out-of-fold predictions to avoid leakage), and bagged forests throw in out-of-bag error (free validation) and feature importance — extras that make tree ensembles as practical as they are accurate.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: anomaly detection — modelling \"normal\" to catch the rare</summary>\n<p>Fraud, intrusions, machine faults, and manufacturing defects share an awkward shape: the interesting events are rare, and you usually have few or no labelled examples of them. So anomaly detection is mostly <em>unsupervised</em> — model what \"normal\" looks like, then score how badly each new point fits. Several families do this, trading off speed, assumptions, and what counts as \"weird.\"</p>\n<p><b>Isolation Forest</b> turns the usual logic inside out: build random-split trees and measure how many splits it takes to isolate a point. Outliers sit in sparse regions and get isolated in very few splits, so a <em>short average path length</em> flags them — no density estimate, near-linear time, and the anchor method for tabular data. <b>Density-based</b> methods instead fit a distribution — a <a href=\"#/lesson/machine-learning/ml-kmeans\" data-route>Gaussian mixture</a> or kernel density — and flag low-likelihood points; Local Outlier Factor refines this by comparing a point's local density to its neighbours'. <b>One-class SVM</b> draws a tight boundary around the normal data and calls everything outside it anomalous.</p>\n<p>In high dimensions the reconstruction trick shines: train an <a href=\"#/lesson/deep-learning/dl-autoencoders-vae\" data-route>autoencoder</a> only on normal data, and a large reconstruction error betrays an anomaly — the network simply cannot rebuild patterns it never saw. The recurring difficulties are the same everywhere: severe class imbalance, the absence of labels to validate against, and a threshold that trades false alarms for missed detections — the precision-recall dial turned all the way toward rare events.</p>\n</details>\n",
          "mcq": [
            {
              "q": "What is the core idea of ensemble methods?",
              "choices": [
                "Train a single very deep model",
                "Use only the most accurate single model",
                "Remove all but the best feature",
                "Combine many models so the result beats any individual one"
              ],
              "answer": 3,
              "explain": "Ensembles aggregate many models (averaging or voting); if their errors aren't perfectly correlated, the combination is more accurate and stable than any one."
            },
            {
              "q": "Bagging (bootstrap aggregating) reduces error mainly by",
              "choices": [
                "reducing bias by fitting residuals",
                "reducing variance — averaging models trained on bootstrap resamples",
                "pruning the trees",
                "adding more features"
              ],
              "answer": 1,
              "explain": "Each model trains on a different resample, so they make different errors; averaging cancels variance. Bagging is ideal for high-variance learners like full trees."
            },
            {
              "q": "A random forest improves on plain bagged trees by",
              "choices": [
                "also choosing a random subset of features at each split, which decorrelates the trees",
                "using a single very deep tree",
                "boosting the misclassified points",
                "removing the bootstrap sampling"
              ],
              "answer": 0,
              "explain": "If one feature is dominant, bagged trees all split on it and stay correlated. Random feature subsets decorrelate the trees, so averaging cuts variance much more."
            },
            {
              "q": "How does boosting differ from bagging?",
              "choices": [
                "It trains models sequentially, each correcting the previous ones' mistakes (reducing bias)",
                "It only works for regression",
                "It trains all models in parallel on the full data",
                "It never overfits"
              ],
              "answer": 0,
              "explain": "Boosting is sequential: each learner focuses on the errors so far, combining weak learners into a strong one and mainly reducing bias (vs bagging's variance reduction)."
            },
            {
              "q": "In gradient boosting, each new tree is fit to",
              "choices": [
                "a fresh bootstrap sample",
                "the residual errors / negative gradient of the loss so far",
                "a random subset of classes",
                "the original labels, ignoring previous trees"
              ],
              "answer": 1,
              "explain": "Gradient boosting fits each tree to the negative gradient of the loss (the residuals for squared error), then adds it with a small learning rate — gradient descent in function space."
            },
            {
              "q": "Why does averaging many models reduce variance?",
              "choices": [
                "It increases the bias to compensate",
                "It removes the need for training data",
                "Uncorrelated errors partly cancel, so the variance of the average falls with the number of models",
                "Averaging always eliminates error entirely"
              ],
              "answer": 2,
              "explain": "For n uncorrelated models of variance σ², the average has variance σ²/n. (Correlation ρ leaves a floor ρσ², which is why random forests decorrelate.)"
            },
            {
              "q": "On typical structured/tabular datasets, which often performs best?",
              "choices": [
                "An unregularized deep neural network",
                "A single k-nearest-neighbor model",
                "Plain linear regression",
                "Gradient-boosted trees and random forests (often beating deep nets)"
              ],
              "answer": 3,
              "explain": "Tree ensembles, especially gradient boosting (XGBoost/LightGBM), are the state of the art on tabular data and frequently outperform deep learning there."
            },
            {
              "q": "A risk of boosting compared to bagging is that it",
              "choices": [
                "cannot use decision trees",
                "ignores the loss function",
                "can overfit, so it needs regularization (small learning rate, shallow trees, early stopping)",
                "reduces variance but never bias"
              ],
              "answer": 2,
              "explain": "Boosting keeps cutting training error and can start fitting noise; shrinkage, shallow trees, subsampling, and early stopping keep it from overfitting."
            },
            {
              "q": "Averaging $n$ independent models, each with variance $\\sigma^2$, gives a combined variance of:",
              "choices": [
                "$\\sigma^2/n$",
                "$\\sigma^2$",
                "$n\\,\\sigma^2$",
                "$\\sigma^2 n^2$"
              ],
              "answer": 0,
              "explain": "Variance of an average of $n$ i.i.d. terms is $\\sigma^2/n$ — the core reason bagging cuts variance (only fully if the models are independent)."
            },
            {
              "q": "Bagging trains each base model on:",
              "choices": [
                "The full dataset, unchanged",
                "A bootstrap resample (drawn with replacement)",
                "A single random feature",
                "The test set"
              ],
              "answer": 1,
              "explain": "Each model sees a different resample, so their errors differ and averaging cancels noise."
            },
            {
              "q": "A \"weak learner\" (used in boosting) is a model that:",
              "choices": [
                "Is a deep neural network",
                "Always achieves 100% accuracy",
                "Does only slightly better than random guessing (e.g. a shallow stump)",
                "Ignores the labels"
              ],
              "answer": 2,
              "explain": "Boosting combines many such weak learners, each correcting the last, into a strong one."
            },
            {
              "q": "Out-of-bag (OOB) samples in a random forest provide:",
              "choices": [
                "Feature scaling",
                "Extra training data",
                "The final prediction",
                "A built-in validation error estimate (no separate holdout needed)"
              ],
              "answer": 3,
              "explain": "Each tree skips ~1/3 of points (its OOB set); aggregating predictions on those gives an unbiased error estimate for free."
            },
            {
              "q": "Boosting primarily reduces:",
              "choices": [
                "Bias — by sequentially correcting earlier errors",
                "Variance only",
                "Neither bias nor variance",
                "The number of features"
              ],
              "answer": 0,
              "explain": "Stacking weak (high-bias) learners that each fix residual mistakes drives bias down; bagging instead targets variance."
            },
            {
              "q": "AdaBoost adapts to the previous round by:",
              "choices": [
                "Discarding the misclassified points",
                "Up-weighting the misclassified points so the next learner focuses on them",
                "Weighting all points equally forever",
                "Setting the learning rate to 0"
              ],
              "answer": 1,
              "explain": "Raising the weight of hard examples forces successive learners to attend to them."
            },
            {
              "q": "Decorrelating the base models matters because:",
              "choices": [
                "It increases bias",
                "It speeds up training",
                "Correlated models' errors don't cancel, limiting variance reduction",
                "It is required for boosting"
              ],
              "answer": 2,
              "explain": "Averaging helps most when errors are independent; identical trees would just repeat the same mistakes."
            },
            {
              "q": "Stacking (stacked generalization) combines base models by:",
              "choices": [
                "Pruning the weakest model",
                "Averaging their input features",
                "Bagging the labels",
                "Training a meta-model on the base models' predictions"
              ],
              "answer": 3,
              "explain": "A second-level learner learns how best to blend the base predictions, often beating a simple average."
            }
          ],
          "flashcards": [
            {
              "front": "Bagging vs boosting in one line",
              "back": "Bagging: train models in parallel on bootstrap resamples and average → reduces VARIANCE (use on high-variance learners like full trees). Boosting: train sequentially, each fixing the last's errors → reduces BIAS (combine weak learners into a strong one)."
            },
            {
              "front": "What is a random forest and why the feature randomness?",
              "back": "Bagged decision trees + a random feature subset considered at each split. The feature randomness decorrelates the trees (otherwise a dominant feature makes them similar), so averaging reduces variance far more. Robust default, gives feature importance."
            },
            {
              "front": "What is gradient boosting?",
              "back": "Build trees sequentially, each fit to the negative gradient of the loss (residuals) of the ensemble so far, added with a small learning rate — gradient descent in function space. XGBoost/LightGBM dominate tabular ML. Regularize to avoid overfitting."
            },
            {
              "front": "Why does averaging reduce variance, and the catch?",
              "back": "n uncorrelated models of variance σ² average to variance σ²/n. But correlated models (correlation ρ) give ρσ² + (1−ρ)σ²/n → an irreducible floor ρσ². So decorrelation (random forests) is essential. Averaging doesn't reduce bias."
            },
            {
              "front": "Why are ensembles so strong, and where?",
              "back": "A crowd of diverse, imperfect models whose errors cancel beats any single one. Tree ensembles (random forests, gradient-boosted trees) are state of the art on tabular/structured data, often beating deep nets there."
            },
            {
              "front": "Bias vs variance: what do bagging and boosting each reduce?",
              "back": "Bagging averages many high-variance, low-bias models (deep trees) to cut variance. Boosting chains weak, high-bias learners (shallow stumps), each correcting the last's errors, to cut bias."
            }
          ],
          "homework": [
            {
              "prompt": "You have a single decision tree that gets 100% training accuracy but only 70% test accuracy (high variance). Would bagging or boosting be the more natural fix, and why? What does the other one target instead?",
              "hint": "Bagging reduces variance (averaging independent high-variance models); boosting reduces bias (sequentially correcting a weak learner). Which matches a high-variance tree?",
              "solution": "Bagging is the natural fix. The symptom — perfect training accuracy but much lower test accuracy — is classic high variance/overfitting, and bagging (and especially random forests) directly reduces variance by averaging many trees trained on different bootstrap samples, smoothing out the overfitting of any single tree, without increasing bias much. Boosting instead targets BIAS: it combines weak/underfitting learners (e.g. shallow stumps) into a strong one, so it's the remedy when your base model is too simple (underfitting), not when a flexible model is overfitting. (Boosting can be applied to trees too, but you'd use shallow ones and careful regularization, since boosting can itself overfit.)"
            },
            {
              "prompt": "Explain, using the variance-of-an-average idea, why a random forest can outperform plain bagged trees even with the same number of trees.",
              "hint": "Averaging n models divides variance — but fully only if they are independent. How does random feature selection decorrelate the trees beyond plain bagging?",
              "solution": "Averaging n models with per-model variance σ² and pairwise correlation ρ gives ensemble variance ρσ² + (1−ρ)σ²/n. With many trees the second term shrinks, so the floor is ρσ² — set entirely by how correlated the trees are. Plain bagged trees are quite correlated (if one feature is strongly predictive, every tree splits on it early and they look alike), so ρ is high and the variance floor stays high — adding trees helps little past a point. A random forest forces each split to consider only a random subset of features, which makes the trees genuinely different (lower ρ), pushing the ρσ² floor down. Same number of trees, but lower correlation → lower ensemble variance → better generalization. Decorrelation is the mechanism."
            },
            {
              "prompt": "Three independent classifiers each have error rate $0.2$. Combined by majority vote, the ensemble is wrong only if at least 2 of the 3 err. Compute the ensemble's error rate.",
              "hint": "Sum the binomial probabilities of exactly 2 and exactly 3 errors.",
              "solution": "$\\binom{3}{2}(0.2)^2(0.8)+\\binom{3}{3}(0.2)^3 = 3\\cdot 0.04\\cdot 0.8 + 0.008 = 0.096+0.008=\\mathbf{0.104}$. The vote (0.104) beats any single model (0.2) — the wisdom of (uncorrelated) crowds."
            }
          ],
          "examples": [
            {
              "title": "Why averaging uncorrelated models helps (numbers)",
              "body": "Three independent classifiers each have 70% accuracy (30% error) on a binary task, making independent errors. Using majority vote, is the ensemble better or worse than 70%?",
              "solution": "The ensemble is wrong only when at least 2 of the 3 err. With independent 0.3 error rates: P(all 3 wrong)=0.3³=0.027; P(exactly 2 wrong)=3·0.3²·0.7=0.189. So P(majority wrong)=0.027+0.189=0.216, i.e. ~78.4% accuracy — up from 70%. Three mediocre, independent voters beat any one of them, because for the majority to fail, multiple independent errors must coincide, which is unlikely. (The gain depends on independence — if the three always erred together, the vote would stay at 70%, which is exactly why decorrelation matters.)"
            },
            {
              "title": "Picking bagging vs boosting by the base learner",
              "body": "Base learner A is a full, deep decision tree (low bias, high variance). Base learner B is a depth-1 stump (high bias, low variance). Which ensemble method suits each?",
              "solution": "Use BAGGING (or a random forest) for A, the deep tree: it's already low-bias but high-variance, and bagging averages away the variance — full trees are the canonical random-forest base learner. Use BOOSTING for B, the stump: a single stump badly underfits (high bias), but boosting chains many stumps, each correcting the last, to drive the bias down into a strong learner — shallow trees are the canonical gradient-boosting base learner. The rule: bag low-bias/high-variance models to cut variance; boost high-bias/weak models to cut bias."
            },
            {
              "title": "AdaBoost: how a weak learner earns its weight",
              "body": "In boosting, each weak learner gets a say proportional to how good it is. AdaBoost gives a learner with weighted error $\\epsilon$ the weight $\\alpha=\\tfrac{1}{2}\\ln\\frac{1-\\epsilon}{\\epsilon}$. Compute $\\alpha$ for a stump with $\\epsilon=0.3$, and read off what happens at $\\epsilon=0.5$ and beyond.",
              "solution": "For $\\epsilon=0.3$: $\\alpha=\\tfrac{1}{2}\\ln\\frac{0.7}{0.3}=\\tfrac{1}{2}\\ln(2.33)\\approx\\tfrac{1}{2}(0.847)=0.42$ — a positive, moderate vote. The formula encodes the right behavior: a learner barely better than chance ($\\epsilon\\to 0.5$) gets $\\alpha\\to 0$ (almost no say); a near-perfect learner ($\\epsilon\\to 0$) gets $\\alpha\\to\\infty$ (a huge say); and a learner <em>worse</em> than chance ($\\epsilon>0.5$) gets a <em>negative</em> weight — AdaBoost simply flips its predictions and uses it anyway. Boosting then reweights the data to focus the next learner on the examples this one got wrong."
            }
          ]
        }
      ]
    },
    {
      "id": "ml-model-selection-mod",
      "title": "Model Selection & Evaluation",
      "lessons": [
        {
          "id": "ml-model-selection",
          "title": "Model Selection & Cross-Validation",
          "minutes": 15,
          "content": "<h3>1. The hook: the one number that actually matters</h3>\n<p>You can fit a hundred models; the only question that counts is <em>which one will work on data it has never seen?</em> Answering that honestly is <strong>model selection and evaluation</strong> — the meta-skill that decides whether all the algorithms in this topic actually deliver. The cardinal sin is judging a model by its performance on the very data it trained on: a flexible model can <em>memorize</em> that data and look perfect while being worthless on anything new. This lesson is the discipline that prevents fooling yourself.</p>\n\n<h3>2. Train, validation, test</h3>\n<p>Split your data into three roles. The <strong>training set</strong> fits the model's parameters. The <strong>validation set</strong> is used to tune hyperparameters and choose between models. The <strong>test set</strong> is locked away and touched <em>once</em>, at the very end, to get an unbiased estimate of real-world performance. The rule is absolute: the test set informs <em>no</em> decisions — the moment a choice depends on it, it stops being an honest estimate and becomes part of training.</p>\n\n<h3>3. Cross-validation</h3>\n<p>A single validation split wastes data and is noisy. <strong>k-fold cross-validation</strong> fixes both: split the data into $k$ equal folds, then train on $k-1$ folds and validate on the held-out fold, rotating so every fold serves as validation exactly once. Average the $k$ scores for a robust estimate, and you've used <em>all</em> the data for both training and validation. Common variants: <em>leave-one-out</em> ($k = n$, expensive), and <em>stratified</em> k-fold, which preserves class proportions in each fold (essential for imbalanced data).</p>\n<div data-viz=\"ml-cross-validation\"></div>\n<p class=\"see-also\"><b>See also:</b> k-fold assumes the rows are exchangeable. When the data has a time order you must <em>not</em> shuffle — use <a href=\"#/lesson/time-series/ts-forecast-evaluation\" data-route>rolling-origin backtesting</a> instead, where every test window stays in the future of its training data.</p>\n\n<div data-viz=\"ml-bias-variance-viz\"></div>\n<h3>4. Diagnosing bias and variance</h3>\n<p>Model selection is largely a hunt for the bias-variance sweet spot. <em>Underfitting</em> (high bias): poor on both training and validation — the model is too simple. <em>Overfitting</em> (high variance): great on training, poor on validation — the model memorized noise. Two diagnostic plots: a <strong>learning curve</strong> (score vs training-set size) reveals whether more data would help; a <strong>validation curve</strong> (score vs a hyperparameter like tree depth or regularization $\\lambda$) shows where complexity tips from underfit to overfit.</p>\n<div data-viz=\"ml-double-descent\"></div>\n\n<p><b>Try it in code.</b> Compute precision, recall, and F1 from confusion-matrix counts (TP, FP, FN).</p>\n<div data-code=\"javascript\" data-expected=\"0.90 0.60 0.72\">// Precision, recall, F1 from confusion-matrix counts\nconst TP = 18, FP = 2, FN = 12;\nconst precision = TP / (TP + FP);\nconst recall    = TP / (TP + FN);\nconst f1 = 2 * precision * recall / (precision + recall);\nconsole.log(precision.toFixed(2), recall.toFixed(2), f1.toFixed(2));</div>\n<h3>5. Hyperparameter search</h3>\n<p>Hyperparameters (k in kNN, C and $\\gamma$ in SVMs, $\\lambda$ in ridge, tree depth, learning rate) aren't learned from the training loss — you search for them. <strong>Grid search</strong> tries every combination on a grid; <strong>random search</strong> samples combinations at random and, surprisingly, often finds better settings for the same budget (because only a few hyperparameters usually matter, and random sampling explores more distinct values of them). <strong>Bayesian optimization</strong> is smarter still for expensive models. Always score candidates by cross-validation — never by the test set.</p>\n\n<h3>6. Metrics beyond accuracy</h3>\n<p>Accuracy alone lies, especially on imbalanced data: if 99% of emails are \"not fraud,\" a model that always says \"not fraud\" scores 99% and catches nothing. Use metrics matched to the problem: <strong>precision</strong> (of those flagged, how many were right), <strong>recall</strong> (of the real positives, how many were caught), their harmonic mean <strong>F1</strong> $= \\frac{2\\,PR}{P+R}$, the <strong>confusion matrix</strong>, and <strong>ROC-AUC</strong> (ranking quality across all decision thresholds). Which to optimize depends on the cost of each error type.</p>\n\n<h3>7. The silent killer: data leakage</h3>\n<p><strong>Data leakage</strong> is when information that won't be available at prediction time sneaks into training, producing glowing validation scores that collapse in production. Classic culprits: fitting preprocessing (scaling, feature selection, imputation) on the <em>whole</em> dataset before splitting, so the training folds \"see\" the validation data; or including a feature that's a proxy for the target. The fix: do <em>all</em> fitting — including preprocessing — <em>inside</em> each cross-validation fold, using a pipeline.</p>\n\n<h3>8. The big picture</h3>\n<p>Honest evaluation is the backbone of machine learning: split into train/validation/test, estimate with cross-validation, diagnose bias vs variance with learning/validation curves, search hyperparameters on CV (never the test set), pick metrics that fit the problem, and guard against leakage. Master this and every model in this topic becomes trustworthy; skip it and even the fanciest model is just a number that flatters you.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why you must never let the test set leak in</summary>\n<p>\"Don't touch the test set\" sounds like a rule of etiquette; it's actually a statistical necessity, and leakage is subtler than it looks.</p>\n<p><b>Every peek inflates the estimate.</b> The test score is only an unbiased estimate of generalization <em>if no decision depended on it</em>. The instant you use it to pick a model, a threshold, or a feature, you have <em>optimized against that specific test set</em> — and the score now overstates real performance, because you selected whatever happened to do well on those particular points (partly by luck). With enough tries you can get a great test score on pure noise. The test set is a single-use measuring device.</p>\n<p><b>Validation overfitting is real too.</b> Even cross-validation isn't immune: if you try hundreds of hyperparameter configurations and keep the best CV score, you've overfit the <em>validation</em> data — the winning config is partly chosen for fitting CV noise. The remedy is <em>nested cross-validation</em>: an inner loop tunes hyperparameters, an outer loop estimates performance, so the data used to <em>choose</em> is never the data used to <em>judge</em>.</p>\n<p><b>Preprocessing leaks too.</b> Fit a scaler or feature selector on the full dataset and the training folds absorb statistics from the held-out data — a quiet leak that inflates CV scores. Everything learned from data must be fit <em>inside</em> the fold (use a pipeline).</p>\n<p>The \"aha\": generalization estimates are only valid for data that influenced <em>no</em> choices. Test once, tune with nested CV, and fit preprocessing inside folds — anything else silently optimizes against your own yardstick and lies to you.</p>\n</details>\n\n<details class=\"deep-dive\">\n<summary>Deeper dive: learning curves vs validation curves — diagnose, don't guess</summary>\n<p>When a model underperforms, the two most useful diagnostics are a <em>learning curve</em> and a <em>validation curve</em>. They answer different questions and turn tuning from guesswork into diagnosis.</p>\n<p><b>Learning curve: would more data help?</b> Plot training and validation score as the <em>training-set size</em> grows. Two signatures: (1) the curves converge to a <em>low</em> score with a small gap, meaning <strong>high bias / underfitting</strong> — more data will not help, you need a richer model or better features; (2) a persistent <em>large gap</em> (high training, lower validation) that is still closing, meaning <strong>high variance / overfitting</strong> — more data (or regularization) <em>will</em> help. This one plot tells you whether to collect data or change the model, saving you from gathering data that cannot help.</p>\n<p><b>Validation curve: more or less complexity?</b> Plot score against a single <em>complexity hyperparameter</em> (tree depth, $k$ in kNN, $C$ in an SVM, $\\lambda$ in ridge). The training score keeps rising with complexity, but the validation score is an inverted-U: too simple underfits on the left, too complex overfits on the right, and the peak marks the sweet spot to pick.</p>\n<p>The \"aha\": do not tune blindly. The <em>learning</em> curve answers \"more data or a better model?\" (converged-and-low means a better model; a big closing gap means more data); the <em>validation</em> curve answers \"more or less complexity?\" (pick the validation peak). Together they diagnose <em>why</em> a model is failing before you spend effort fixing it.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the bias–variance decomposition</summary>\n<p>For squared-error loss, the expected test error at a point splits into exactly three pieces: $$\\mathbb E\\big[(y-\\hat f(x))^2\\big]=\\big(\\mathbb E[\\hat f(x)]-f(x)\\big)^2+\\mathrm{Var}\\!\\big[\\hat f(x)\\big]+\\sigma^2.$$ The first term is <b>bias²</b> — how far the <em>average</em> model is from the truth (underfitting); the second is <b>variance</b> — how much the fit wobbles across training sets (overfitting); and $\\sigma^2$ is the <b>irreducible</b> noise no model can beat. Adding capacity lowers bias but raises variance, so test error is U-shaped in complexity — and regularization or more data shift the sweet spot left and down.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: double descent — when a bigger model cures overfitting</summary>\n<p>The bias–variance story predicts a U-shaped test-error curve: too simple underfits, too complex overfits, with a sweet spot between. <b>Double descent</b> shows that is only half the picture. Keep growing capacity <em>past</em> the <b>interpolation threshold</b> — the point where the model is just big enough to fit the training data exactly (zero training error) — and test error first spikes (the classic overfitting peak), then, surprisingly, <em>descends again</em>, often below the old sweet spot. Modern over-parameterized networks live in this second descent. Why? Among the many models that fit the data perfectly, the optimizer's <b>implicit bias</b> (from SGD, architecture, and initialization) tends to pick a smooth, low-norm interpolant that generalizes well. The practical twist: the classic \"stop adding capacity before you overfit\" rule can be exactly wrong for very large models — sometimes the cure for overfitting is a <em>bigger</em> model, not a smaller one. It does not refute bias–variance; it refines it once interpolation is on the table.</p>\n<p><b>See also:</b> <a href=\"#/lesson/deep-learning/dl-generalization-mysteries\" data-route>grokking and the lottery ticket hypothesis</a> — two more ways over-parameterized networks defy the classical overfitting story.</p>\n</details>\n\n<div data-viz=\"ml-conformal\"></div>\n<p><em>Gone deeper:</em> metrics beyond accuracy, conformal prediction, and interpretability have grown into their own lesson — <a href=\"#/lesson/machine-learning/ml-trustworthy-models\" data-route>Trusting a Model: Metrics, Uncertainty, Explanations</a>.</p>",
          "mcq": [
            {
              "q": "Why can't you judge a model by its performance on the training set?",
              "choices": [
                "Training accuracy is always zero",
                "The training set is too small to matter",
                "Training metrics can't be computed",
                "A flexible model can memorize the training data, so you need held-out data to estimate generalization"
              ],
              "answer": 3,
              "explain": "A high-capacity model can fit (even memorize) its training data and look perfect while failing on new data. Only held-out data estimates true generalization."
            },
            {
              "q": "What is the role of the train/validation/test split?",
              "choices": [
                "All three are used to fit parameters",
                "Validation is never needed",
                "Test is used to tune the model",
                "Train fits parameters, validation tunes hyperparameters/selects models, test gives a final unbiased estimate (used once)"
              ],
              "answer": 3,
              "explain": "Parameters are fit on train; hyperparameters and model choice on validation; the test set is touched once at the end for an honest performance estimate."
            },
            {
              "q": "How does k-fold cross-validation work?",
              "choices": [
                "It trains on the test set k times",
                "Split into k folds; train on k−1, validate on the held-out fold, rotate, and average the scores",
                "It uses only one fixed validation split",
                "It removes k random points and ignores them"
              ],
              "answer": 1,
              "explain": "Each fold serves as validation exactly once; averaging the k scores gives a robust estimate while using all data for both training and validation."
            },
            {
              "q": "Why does random search often beat grid search for the same budget?",
              "choices": [
                "It always finds the global optimum",
                "It explores more distinct values of the few hyperparameters that actually matter",
                "It needs no cross-validation",
                "It only tries one configuration"
              ],
              "answer": 1,
              "explain": "Usually only a few hyperparameters matter; random sampling covers more distinct values of those, whereas a grid wastes trials on unimportant ones."
            },
            {
              "q": "On a dataset that is 99% negative, a model reporting 99% accuracy",
              "choices": [
                "may be useless — it could just always predict 'negative'; check precision/recall",
                "has perfect recall",
                "is impossible",
                "is definitely excellent"
              ],
              "answer": 0,
              "explain": "Accuracy is dominated by the majority class; 'always negative' scores 99% while catching no positives. On imbalanced data, use precision/recall/F1/AUC."
            },
            {
              "q": "Data leakage is",
              "choices": [
                "information from outside the training fold (test data or the target) sneaking into training, inflating the estimate",
                "when the model trains too slowly",
                "when you have too little data",
                "a type of regularization"
              ],
              "answer": 0,
              "explain": "Leakage = the model gains access to information unavailable at prediction time (e.g. preprocessing fit on all data, or a target proxy), giving falsely high scores that collapse in production."
            },
            {
              "q": "ROC-AUC is useful because it",
              "choices": [
                "only works for balanced data",
                "requires no model",
                "measures ranking quality across all decision thresholds, independent of any single cutoff",
                "is the same as accuracy"
              ],
              "answer": 2,
              "explain": "ROC-AUC summarizes how well the model ranks positives above negatives over every threshold — the probability a random positive outscores a random negative — so it doesn't depend on one chosen cutoff."
            },
            {
              "q": "To tune hyperparameters honestly, you should",
              "choices": [
                "skip validation and use training accuracy",
                "tune directly on the test set to save data",
                "select on validation/cross-validation and report on a test set touched only once (nested CV if tuning heavily)",
                "pick hyperparameters before seeing any data and never change them"
              ],
              "answer": 2,
              "explain": "Choose hyperparameters by CV/validation; the test set is used once for the final estimate. Heavy tuning overfits validation, so nested CV separates choosing from judging."
            },
            {
              "q": "5-fold cross-validation trains and evaluates the model how many times?",
              "choices": [
                "$5$ times — each fold serves as the validation set once",
                "Once",
                "$10$ times",
                "$25$ times"
              ],
              "answer": 0,
              "explain": "The data is split into 5 folds; each is held out for validation once while the other 4 train, then results are averaged."
            },
            {
              "q": "Leave-one-out cross-validation (LOOCV) is k-fold with $k$ equal to:",
              "choices": [
                "$1$",
                "$n$, the number of samples",
                "$2$",
                "$10$"
              ],
              "answer": 1,
              "explain": "Each fold holds out a single point, so there are $n$ folds — thorough but expensive."
            },
            {
              "q": "With 8 true positives and 2 false positives, the precision is:",
              "choices": [
                "$0.5$",
                "$0.2$",
                "$0.8$",
                "$1.0$"
              ],
              "answer": 2,
              "explain": "Precision $=\\dfrac{TP}{TP+FP}=\\dfrac{8}{10}=0.8$ — of those predicted positive, how many are."
            },
            {
              "q": "With 8 true positives and 2 false negatives, the recall is:",
              "choices": [
                "$1.0$",
                "$0.2$",
                "$0.5$",
                "$0.8$"
              ],
              "answer": 3,
              "explain": "Recall $=\\dfrac{TP}{TP+FN}=\\dfrac{8}{10}=0.8$ — of the actual positives, how many were caught."
            },
            {
              "q": "The F1 score is:",
              "choices": [
                "The harmonic mean of precision and recall",
                "The arithmetic mean of precision and recall",
                "Accuracy on the positive class",
                "The area under the ROC curve"
              ],
              "answer": 0,
              "explain": "$F_1=2\\cdot\\dfrac{PR}{P+R}$; the harmonic mean punishes a large gap between precision and recall."
            },
            {
              "q": "Stratified k-fold cross-validation ensures each fold:",
              "choices": [
                "Contains identical points",
                "Preserves the overall class proportions",
                "Is sorted by label",
                "Holds only one class"
              ],
              "answer": 1,
              "explain": "Stratification keeps each fold's class balance like the whole dataset — important for imbalanced data."
            },
            {
              "q": "High training accuracy but low validation accuracy indicates:",
              "choices": [
                "Data leakage, always",
                "Underfitting",
                "Overfitting (high variance)",
                "A perfect model"
              ],
              "answer": 2,
              "explain": "The model memorized the training set but fails to generalize — the classic high-variance signature."
            },
            {
              "q": "If both training and validation error are high, the model is likely:",
              "choices": [
                "Leaking data",
                "Overfitting",
                "Perfectly fit",
                "Underfitting (high bias)"
              ],
              "answer": 3,
              "explain": "Failing even on the training data means the model is too simple — increase capacity or add better features."
            }
          ],
          "flashcards": [
            {
              "front": "What are the three data splits and their jobs?",
              "back": "Train (fit parameters), Validation (tune hyperparameters / select models), Test (final unbiased estimate, used exactly once). The test set must inform no decisions."
            },
            {
              "front": "What is k-fold cross-validation?",
              "back": "Split data into k folds; train on k−1 and validate on the held-out fold, rotating so each fold validates once; average the k scores. Robust estimate using all data. Stratified k-fold preserves class balance; LOOCV is k=n."
            },
            {
              "front": "How do you diagnose underfitting vs overfitting?",
              "back": "Underfit (high bias): poor on BOTH train and validation. Overfit (high variance): great on train, poor on validation. Use a learning curve (score vs data size — does more data help?) and a validation curve (score vs a hyperparameter)."
            },
            {
              "front": "Why is accuracy misleading, and what to use instead?",
              "back": "On imbalanced data, always predicting the majority gives high accuracy but is useless. Use precision (trustworthy alarms), recall (caught positives), F1 = 2PR/(P+R), confusion matrix, and ROC-AUC (threshold-free ranking). Pick the metric matching error costs."
            },
            {
              "front": "What is data leakage and how do you prevent it?",
              "back": "Information unavailable at prediction time (test data, or a target proxy) entering training → inflated scores that collapse in production. Prevent by fitting ALL preprocessing inside each CV fold (use a pipeline), splitting before any data-driven step, and tuning with nested CV."
            },
            {
              "front": "How do you tune hyperparameters without cheating?",
              "back": "Search (grid or random) using a validation set or cross-validation — never the test set, which is touched once at the very end. To keep the tuning choice from leaking into your performance estimate, use nested cross-validation."
            }
          ],
          "homework": [
            {
              "prompt": "A teammate reports 'I tried 200 hyperparameter settings and the best one got 96% on the test set — let's ship it.' Identify the methodological error and describe the correct procedure.",
              "hint": "Choosing among 200 settings by their test score leaks the test set, so 96% is optimistic. Where should hyperparameters be picked, and what stays untouched until the end?",
              "solution": "The error: they used the TEST set to choose among 200 settings, so the 96% is not an unbiased estimate — by trying many configurations and keeping the best test score, they optimized against that specific test set and overfit it (some of the 96% is luck on those particular points). The reported number overstates real performance. Correct procedure: tune hyperparameters using cross-validation (or a separate validation set) on the training data only — pick the setting with the best CV score. Then evaluate that single chosen model ONCE on the held-out test set to get an honest estimate. If the tuning is extensive, use nested cross-validation (inner loop tunes, outer loop estimates) so the data used to choose is never the data used to judge. The test set is a single-use measuring device."
            },
            {
              "prompt": "You build a fraud detector on data that is 0.5% fraud, and it achieves 99.5% accuracy. Explain why this number is uninformative and which metrics you'd report instead, with the reasoning about error costs.",
              "hint": "With 0.5% positives, always predicting 'not fraud' already scores 99.5%. Think precision, recall, F1 — and the cost of a missed fraud versus a false alarm.",
              "solution": "With only 0.5% fraud, a trivial model that labels EVERY transaction 'legit' already scores 99.5% accuracy while catching zero fraud — so 99.5% tells you nothing about whether fraud is detected. Accuracy is dominated by the overwhelming majority class. Report instead: recall (of actual fraud, how much is caught — missing fraud is costly), precision (of flagged transactions, how many are truly fraud — false alarms annoy customers and cost investigation time), the confusion matrix (to see the actual counts), and ROC-AUC or, better on heavy imbalance, the precision-recall curve / average precision. On error costs: a missed fraud (false negative) is usually far more expensive than a false alarm (false positive), so you'd typically favor higher recall, lowering the decision threshold and accepting some precision loss — then quantify the trade-off with the PR curve and pick the operating point that matches the business cost ratio."
            },
            {
              "prompt": "A classifier yields TP$=40$, FP$=10$, FN$=20$, TN$=30$. Compute its precision, recall, and accuracy.",
              "hint": "Precision $=\\frac{TP}{TP+FP}$, recall $=\\frac{TP}{TP+FN}$, accuracy $=\\frac{TP+TN}{\\text{all}}$.",
              "solution": "Precision $=\\dfrac{40}{40+10}=\\mathbf{0.80}$; recall $=\\dfrac{40}{40+20}\\approx \\mathbf{0.67}$; accuracy $=\\dfrac{40+30}{100}=\\mathbf{0.70}$. Precision and recall expose the FN/FP trade that accuracy alone hides."
            }
          ],
          "examples": [
            {
              "title": "Why 99% accuracy can mean zero usefulness",
              "body": "1000 emails, 10 are phishing (1%). Model M always predicts 'safe'. Compute its accuracy, precision, and recall for the phishing class.",
              "solution": "Confusion counts: M never flags phishing, so true positives = 0, false positives = 0, false negatives = 10 (all phishing missed), true negatives = 990. Accuracy = (TP+TN)/total = (0+990)/1000 = 99.0% — impressively high. Recall = TP/(TP+FN) = 0/10 = 0% — it catches none of the phishing. Precision = TP/(TP+FP) = 0/0 — undefined (it never makes a positive prediction). So a 99% accurate model is completely useless for the actual task. This is the base-rate trap: report recall/precision (and the confusion matrix), not accuracy, on imbalanced problems."
            },
            {
              "title": "A subtle data-leakage bug",
              "body": "You standardize all features using the mean and standard deviation of the FULL dataset, then do 5-fold cross-validation and get a great score — but production performance is worse. What leaked, and what's the fix?",
              "solution": "The scaler was fit on the whole dataset BEFORE the CV split, so the mean/std it used were computed partly from the validation fold. Each training fold therefore 'saw' summary statistics of its validation data — a leak that makes CV scores optimistically biased and not reproducible in production (where future data isn't available to compute statistics). Fix: move standardization INSIDE the cross-validation loop — fit the scaler on each training fold only, then apply it to that fold's validation data. In practice, wrap preprocessing and the model in a single pipeline and cross-validate the whole pipeline, so every data-driven step is fit only on training data. The same rule applies to feature selection, imputation, and any step that learns from the data."
            },
            {
              "title": "Precision, recall, and F1 from a confusion matrix",
              "body": "A spam classifier on 100 emails yields: 18 spam correctly flagged (TP), 2 legit emails wrongly flagged (FP), 12 spam missed (FN), and 68 legit correctly passed (TN). Compute accuracy, precision, recall, and F1 — and say what the headline number hides.",
              "solution": "Accuracy $=(TP+TN)/100=(18+68)/100=86\\%$. Precision $=TP/(TP+FP)=18/20=0.90$ (when it flags spam, it is right 90% of the time). Recall $=TP/(TP+FN)=18/30=0.60$ (it catches only 60% of actual spam). F1 $=2PR/(P+R)=2(0.9)(0.6)/(0.9+0.6)=1.08/1.5=0.72$. The 86% accuracy looks healthy, but recall exposes the real story: 40% of spam slips through. On imbalanced or cost-sensitive problems, report precision/recall/F1 (and pick the threshold for the error you care about), not accuracy alone."
            }
          ]
        },
        {
          "id": "ml-trustworthy-models",
          "title": "Trusting a Model: Metrics, Uncertainty, Explanations",
          "minutes": 13,
          "content": "<p>A model with a good cross-validation score is not yet a model you should <em>trust</em>. Trust has three more ingredients: the <b>right metric</b> (accuracy can be a lie under class imbalance), <b>honest uncertainty</b> (predictions that come with guarantees, not just point guesses), and <b>explanations</b> (knowing what drove a prediction before you act on it). This lesson covers the three in turn — they are what separates a leaderboard model from a deployable one.</p>\n<h3>1. Beyond accuracy: precision, recall, ROC</h3>\n<p>Accuracy is the default metric and the most misleading one on the problems that matter most — the imbalanced ones.</p>\n<p><b>The base-rate trap.</b> If 1% of transactions are fraud, the model \"always predict legit\" scores <em>99% accuracy</em> while catching zero fraud. Accuracy rewards the majority class, so on imbalanced data it can be high and useless. You need metrics that look at the rare class.</p>\n<p><b>Precision vs recall.</b> <em>Precision</em> = of the cases you flagged positive, what fraction truly were (how trustworthy is an alarm). <em>Recall</em> = of the true positives, what fraction you caught (how many you miss). They trade off: lower the decision threshold and you catch more (recall up) but with more false alarms (precision down). The right balance depends on costs — a cancer screen wants high recall (don't miss cases); a spam filter wants high precision (don't trash real mail). <em>F1</em> is their harmonic mean when you want one number.</p>\n<p><b>ROC-AUC: threshold-free.</b> Precision and recall depend on where you set the threshold. The <em>ROC curve</em> plots true-positive rate against false-positive rate across <em>all</em> thresholds, and the <em>area under it</em> (AUC) summarizes the model's <em>ranking</em> ability — the probability it scores a random positive above a random negative — independent of any single cutoff. (On heavy imbalance, the precision-recall curve is often even more informative.)</p>\n<div data-viz=\"ml-roc\"></div>\n<p>The \"aha\": pick the metric for the question. Accuracy hides failure on imbalanced data; precision/recall expose the trade-off you actually care about; F1 condenses it; ROC-AUC judges ranking across thresholds. The metric <em>is</em> a modeling decision — choose it to match the real cost of each kind of error.</p>\n<h3>2. Conformal prediction: uncertainty with a guarantee</h3>\n<p>A softmax confidence or a Bayesian posterior gives you a number, but no promise it is right. <b>Conformal prediction</b> does: it outputs a prediction <em>set</em> that contains the true label with probability at least $1-\\alpha$ — for <em>any</em> model and <em>any</em> data distribution, with a finite calibration sample. The only assumption is exchangeability (roughly, i.i.d.).</p>\n<p>The split-conformal recipe is three lines. On a held-out calibration set of $n$ points, score each by how badly the model fits it — a <em>nonconformity score</em> such as $s_i = 1 - p(\\text{true label}\\mid x_i)$. Take $\\hat q$, the $\\lceil(1-\\alpha)(n+1)\\rceil$-th smallest of those scores. For a new input, output every label whose score is at most $\\hat q$: $\\{\\,y : 1 - p(y\\mid x) \\le \\hat q\\,\\}$. That set is guaranteed to cover the truth $1-\\alpha$ of the time.</p>\n<p>The magic is that the guarantee holds <em>even for a bad model</em> — a poor predictor simply yields larger, less useful sets, but coverage is never violated. So conformal prediction turns the approximate, asymptotic promise of <a href=\"#/lesson/machine-learning/ml-logistic-regression\" data-route>calibration</a> into a hard, finite-sample one — which is why it underpins trustworthy and safety-critical deployment.</p>\n<div data-viz=\"ml-conformal\"></div>\n<h3>3. Interpretability: explaining what it learned</h3>\n<p>A trained model is often a black box, yet deployment demands knowing <em>which</em> features drive a prediction and <em>how</em>. Interpretability methods split into <b>global</b> (the model's overall behaviour) and <b>local</b> (why this one prediction), and most are model-agnostic.</p>\n<p>Globally, a <b>partial dependence plot</b> sweeps one feature across its range and averages the prediction over the data, tracing that feature's marginal effect (ICE plots show the per-instance curves underneath). <b>Permutation importance</b> shuffles one feature's column and measures how much accuracy drops — a big drop means the model leaned on it. Locally, <b>LIME</b> fits a simple linear model in a small neighbourhood of one point, and <b>SHAP</b> attributes a prediction across features using the <a href=\"#/lesson/game-theory/gt-cooperative-games\" data-route>Shapley value</a> from cooperative game theory — the unique attribution that is efficient, symmetric, and additive.</p>\n<p>The sharp caveat is correlation. PDP and permutation both perturb one feature while holding others fixed, which manufactures unrealistic inputs when features are correlated, and can mislead. And every method here explains <em>the model</em>, not the world: a feature can be highly attributed yet have no causal effect. Interpretability buys debugging, trust, and regulatory traceability — not a causal story.</p>\n<h3>4. A deployment checklist</h3>\n<p>Before shipping: does the metric match the cost structure (imbalance → precision/recall, ranking → AUC)? Do predictions carry calibrated uncertainty (conformal sets where coverage matters)? Can you explain individual decisions (SHAP/LIME) and global behaviour (permutation importance, PDPs) to a stakeholder or regulator? And is there monitoring for drift once live — because every one of these checks can silently rot as the data shifts.</p>",
          "mcq": [
            {
              "q": "A dataset is 99 percent negative. A classifier that predicts \"negative\" for everything scores 99 percent accuracy. What should you use instead?",
              "choices": [
                "A bigger test set",
                "Precision, recall, and the ROC/PR curves — metrics that expose performance on the rare class",
                "Mean squared error",
                "Training accuracy"
              ],
              "answer": 1,
              "explain": "Accuracy rewards ignoring the minority class entirely. Precision (how many flagged are real) and recall (how many real are caught) measure what actually matters under imbalance."
            },
            {
              "q": "The area under the ROC curve (AUC) equals the probability that:",
              "choices": [
                "The model is correct on a random example",
                "The classes are linearly separable",
                "A randomly chosen positive example is ranked above a randomly chosen negative one",
                "The threshold is optimal"
              ],
              "answer": 2,
              "explain": "AUC is a pure ranking measure — threshold-free, insensitive to class balance, and exactly the concordance probability."
            },
            {
              "q": "Split-conformal prediction guarantees that its prediction sets contain the true label with probability at least $1-\\alpha$, provided:",
              "choices": [
                "The model is well-calibrated",
                "The data are Gaussian",
                "The model is linear",
                "Calibration and test points are exchangeable — no other assumption about model or distribution"
              ],
              "answer": 3,
              "explain": "The guarantee is distribution-free and model-agnostic: it comes from ranking the test point's nonconformity score among the calibration scores, which is valid under exchangeability alone."
            },
            {
              "q": "SHAP and permutation importance differ in that:",
              "choices": [
                "SHAP attributes one specific prediction (local); permutation importance measures features' overall effect on accuracy (global)",
                "SHAP works only for trees",
                "Permutation importance requires retraining",
                "They are identical up to scaling"
              ],
              "answer": 0,
              "explain": "Local explains \"why THIS prediction\"; global explains \"what the model relies on overall.\" Both mislead when features are strongly correlated — perturbing one at a time makes impossible inputs."
            },
            {
              "q": "F1 combines precision and recall with the harmonic mean (not the arithmetic mean) because:",
              "choices": [
                "It is easier to compute",
                "It equals accuracy on balanced data",
                "The harmonic mean punishes imbalance — F1 is high only when BOTH are high, so you cannot buy it by sacrificing one entirely",
                "It is differentiable"
              ],
              "answer": 2,
              "explain": "With an arithmetic mean, precision 1.0 and recall 0.02 would average to 0.51; the harmonic mean drops to $\\approx 0.04$ — reflecting that such a classifier is nearly useless."
            },
            {
              "q": "In conformal prediction, demanding higher coverage (smaller $\\alpha$) makes the prediction sets:",
              "choices": [
                "Smaller — the model becomes more confident",
                "Larger — the guarantee is paid for in set size (a wider residual quantile)",
                "Unchanged — coverage is free",
                "Empty for hard examples"
              ],
              "answer": 1,
              "explain": "Coverage is bought with width: the band's half-width is a higher calibration-residual quantile. At $\\alpha\\to 0$ the sets grow toward everything — honest uncertainty has a price."
            }
          ],
          "flashcards": [
            {
              "front": "Precision vs recall",
              "back": "Precision = of those flagged positive, how many are truly positive. Recall = of the truly positive, how many were caught. The trade-off is set by the decision threshold."
            },
            {
              "front": "ROC curve / AUC",
              "back": "True-positive rate vs false-positive rate across all thresholds; the area equals the probability a random positive outranks a random negative — a threshold-free ranking metric."
            },
            {
              "front": "Why accuracy fails under imbalance",
              "back": "Predicting the majority class for everything scores near-perfect accuracy while catching zero rare cases — use precision/recall or PR curves instead."
            },
            {
              "front": "Conformal prediction",
              "back": "Wraps any model to output prediction <em>sets</em> with guaranteed coverage $\\ge 1-\\alpha$, assuming only exchangeability — rank the test nonconformity score among a calibration set's scores."
            },
            {
              "front": "Local vs global explanations",
              "back": "Local (SHAP, LIME): why this one prediction. Global (permutation importance, PDP): what the model relies on overall. Correlated features distort both."
            }
          ],
          "homework": [
            {
              "prompt": "A screening model produces the confusion matrix TP $=8$, FP $=2$, FN $=4$, TN $=86$. Compute precision, recall, F1, and accuracy — and explain which number a hospital should care about most if missing a case is costly.",
              "hint": "F1 is the harmonic mean of precision and recall.",
              "solution": "Precision $=8/10=0.80$; recall $=8/12\\approx 0.667$; F1 $=2\\cdot 0.8\\cdot 0.667/(0.8+0.667)\\approx 0.727$; accuracy $=94/100=0.94$. The 0.94 looks great but hides that a third of true cases are missed — with costly misses, recall is the number to raise (accepting more false positives)."
            },
            {
              "prompt": "Explain why split-conformal coverage holds with no distributional assumptions: why does ranking the test point's nonconformity score among $n$ calibration scores give coverage $\\ge 1-\\alpha$?",
              "hint": "Under exchangeability, the test score is equally likely to land at any rank among the $n{+}1$ scores.",
              "solution": "If calibration and test points are exchangeable, the test score's rank among all $n{+}1$ scores is uniform over positions $1..n{+}1$. The set includes the true label unless the test score lands above the $\\lceil (1-\\alpha)(n{+}1)\\rceil$-th calibration score — which happens with probability at most $\\alpha$. Nothing about the model or the data distribution was used, only the symmetry of ranks."
            }
          ],
          "prereqs": [
            "ml-model-selection"
          ]
        }
      ]
    }
  ]
}
);
