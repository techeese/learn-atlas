/* ============================================================
   ATLAS — glossary of key terms (term, def, topic).
   topic = a course id, or "general".
   ============================================================ */
window.GLOSSARY = [
  // ---- linear algebra ----
  { term: "Vector", topic: "linear-algebra", def: "An ordered list of numbers (a point/arrow in $\\mathbb{R}^n$) that can be added and scaled. The atom of linear algebra." },
  { term: "Span", topic: "linear-algebra", def: "The set of all linear combinations of a set of vectors — every point you can reach by scaling and adding them." },
  { term: "Linear independence", topic: "linear-algebra", def: "A set of vectors where none is a combination of the others; the only way to combine them to $\\mathbf{0}$ is with all-zero coefficients." },
  { term: "Basis", topic: "linear-algebra", def: "A minimal set of vectors that spans a space (independent + spanning). Its size is the dimension." },
  { term: "Rank", topic: "linear-algebra", def: "The number of linearly independent columns (= rows) of a matrix; the dimension of its column space." },
  { term: "Determinant", topic: "linear-algebra", def: "A scalar measuring how a matrix scales area/volume; zero means the map collapses dimensions and isn't invertible." },
  { term: "Eigenvector / eigenvalue", topic: "linear-algebra", def: "A vector $\\mathbf{v}$ with $A\\mathbf{v}=\\lambda\\mathbf{v}$: the matrix only stretches it by $\\lambda$, never rotates it off its line." },
  { term: "SVD", topic: "linear-algebra", def: "Singular Value Decomposition $A=U\\Sigma V^\\top$: factors any matrix into rotation · scaling · rotation; the basis of low-rank approximation and PCA." },
  // ---- calculus ----
  { term: "Limit", topic: "calculus", def: "The value a function approaches as its input nears a point — the foundation of derivatives and integrals." },
  { term: "Derivative", topic: "calculus", def: "The instantaneous rate of change of a function; the slope of its tangent line, $f'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}$." },
  { term: "Chain rule", topic: "calculus", def: "$\\frac{d}{dx}f(g(x))=f'(g(x))g'(x)$ — differentiates composed functions. The engine of backpropagation." },
  { term: "Gradient", topic: "calculus", def: "The vector of partial derivatives $\\nabla f$; points in the direction of steepest ascent of a multivariable function." },
  { term: "Partial derivative", topic: "calculus", def: "The rate of change of a multivariable function as you nudge one variable, holding the rest fixed." },
  { term: "Integral", topic: "calculus", def: "Accumulated area under a curve; the inverse operation to differentiation (Fundamental Theorem of Calculus)." },
  { term: "Hessian", topic: "calculus", def: "The matrix of second partial derivatives; its eigenvalues reveal whether a critical point is a min, max, or saddle." },
  { term: "Taylor approximation", topic: "calculus", def: "Approximating a function near a point by a polynomial built from its derivatives; the linear case is the tangent line." },
  // ---- algorithms ----
  { term: "Big-O", topic: "algorithms", def: "Asymptotic upper bound on how an algorithm's cost grows with input size $n$, ignoring constants and lower-order terms." },
  { term: "Recurrence", topic: "algorithms", def: "An equation defining a quantity in terms of smaller inputs, e.g. $T(n)=2T(n/2)+\\Theta(n)$; solved with the Master Theorem." },
  { term: "Dynamic programming", topic: "algorithms", def: "Solving a problem by combining solutions to overlapping subproblems, each computed once and reused (memoized)." },
  { term: "Greedy algorithm", topic: "algorithms", def: "Builds a solution by always taking the locally best choice; optimal only when the problem has the right (matroid-like) structure." },
  { term: "Hash table", topic: "algorithms", def: "A structure giving average $O(1)$ insert/lookup/delete by mapping keys to buckets via a hash function." },
  { term: "BFS / DFS", topic: "algorithms", def: "Graph traversals: breadth-first explores level by level (a queue); depth-first goes deep first (a stack/recursion)." },
  { term: "Divide and conquer", topic: "algorithms", def: "Split a problem into subproblems, solve recursively, and combine — e.g. mergesort, binary search." },
  { term: "NP-complete", topic: "algorithms", def: "The hardest problems in NP: verifiable in polynomial time, and any NP problem reduces to them; no known efficient solution." },
  // ---- deep learning ----
  { term: "Neuron / perceptron", topic: "deep-learning", def: "A unit computing a weighted sum of inputs plus a bias, then a nonlinear activation: $\\sigma(\\mathbf{w}^\\top\\mathbf{x}+b)$." },
  { term: "Activation function", topic: "deep-learning", def: "The nonlinearity (ReLU, sigmoid, tanh) applied per neuron; without it, stacked layers collapse to one linear map." },
  { term: "Backpropagation", topic: "deep-learning", def: "Computing loss gradients for every weight by applying the chain rule backward through the network, reusing forward-pass values." },
  { term: "Gradient descent", topic: "deep-learning", def: "Iteratively updating parameters opposite the gradient, $\\theta\\leftarrow\\theta-\\eta\\nabla L$, to minimize a loss." },
  { term: "Loss function", topic: "deep-learning", def: "Measures prediction error to minimize: MSE for regression, cross-entropy for classification." },
  { term: "Overfitting", topic: "deep-learning", def: "When a model memorizes training data and generalizes poorly; countered by regularization, dropout, and more data." },
  { term: "Regularization", topic: "deep-learning", def: "Techniques (L2/weight decay, dropout, early stopping) that discourage complexity to improve generalization." },
  { term: "Convolution", topic: "deep-learning", def: "Sliding a small learnable kernel over an input to produce a feature map; the core of CNNs, exploiting locality and weight sharing." },
  // ---- reinforcement learning ----
  { term: "MDP", topic: "reinforcement-learning", def: "Markov Decision Process $(S,A,P,R,\\gamma)$: the formalism for sequential decisions where the future depends only on the current state." },
  { term: "Policy", topic: "reinforcement-learning", def: "The agent's strategy $\\pi(a\\mid s)$: which action to take in each state." },
  { term: "Value function", topic: "reinforcement-learning", def: "Expected long-term return from a state ($V$) or state-action pair ($Q$) under a policy." },
  { term: "Bellman equation", topic: "reinforcement-learning", def: "The recursive consistency relation $Q(s,a)=r+\\gamma\\max_{a'}Q(s',a')$: value now = reward + discounted future value." },
  { term: "Q-learning", topic: "reinforcement-learning", def: "A model-free, off-policy method that learns optimal action-values from sampled transitions via the TD error." },
  { term: "Reward", topic: "reinforcement-learning", def: "The scalar feedback signal the agent seeks to maximize over time; the only supervision in RL." },
  { term: "Discount factor", topic: "reinforcement-learning", def: "$\\gamma\\in[0,1)$ weighting future rewards vs immediate ones; keeps infinite-horizon returns finite." },
  { term: "Exploration vs exploitation", topic: "reinforcement-learning", def: "The tradeoff between trying new actions to learn and using known-good ones to earn; e.g. $\\varepsilon$-greedy." },
  // ---- LLMs ----
  { term: "Token", topic: "llm", def: "A subword chunk of text (via BPE) — the unit a language model reads and predicts." },
  { term: "Embedding", topic: "llm", def: "A learned high-dimensional vector for a token; semantically similar tokens lie near each other, so meaning becomes geometry." },
  { term: "Attention", topic: "llm", def: "A mechanism letting each token gather information from others, weighted by relevance: $\\text{softmax}(QK^\\top/\\sqrt{d_k})V$." },
  { term: "Transformer", topic: "llm", def: "The architecture of stacked attention + feed-forward blocks with residuals; processes all tokens in parallel." },
  { term: "Softmax", topic: "llm", def: "Turns a vector of scores into a probability distribution (positive, summing to 1); used for next-token output and attention weights." },
  { term: "Pretraining", topic: "llm", def: "Training a model on massive text via next-token prediction to learn general language and world structure before any task tuning." },
  { term: "Fine-tuning", topic: "llm", def: "Adapting a pretrained model to a task or style with further training (e.g. instruction tuning / SFT, or efficient LoRA)." },
  { term: "RLHF", topic: "llm", def: "Reinforcement Learning from Human Feedback: aligning a model to preferences via a reward model (or directly, with DPO)." }
];
