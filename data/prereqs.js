/* Atlas — cross-topic prerequisite edges (consumed by app.js learningPath/directPrereqs).
   Same-topic ordering is implicit; this connects the 6 topics in the Knowledge Map & paths. */
window.PREREQS = {
  "ml-knn": [
    "la-dot-product-norms"
  ],
  "ml-decision-trees": [
    "a-trees-heaps"
  ],
  "ml-linear-regression": [
    "la-projection-least-squares",
    "c-gradient-directional"
  ],
  "ml-logistic-regression": [
    "dl-loss-functions"
  ],
  "ml-regularization": [
    "la-dot-product-norms"
  ],
  "ml-svm": [
    "la-dot-product-norms"
  ],
  "ml-naive-bayes": [
    "ps-conditional-independence-bayes"
  ],
  "ml-kmeans": [
    "la-dot-product-norms"
  ],
  "ml-model-selection": [
    "ps-point-estimation"
  ],
  "dl-the-artificial-neuron-and-mlp": [
    "la-matrix-multiplication",
    "la-dot-product-norms"
  ],
  "dl-loss-functions": [
    "c-derivatives-special-functions"
  ],
  "dl-backpropagation": [
    "c-chain-rule",
    "c-partial-derivatives",
    "la-matrix-multiplication"
  ],
  "dl-gradient-descent-and-optimizers": [
    "c-gradient-directional",
    "c-optimization"
  ],
  "dl-learning-rate-schedules-and-tuning": [
    "c-optimization"
  ],
  "dl-initialization-and-vanishing-gradients": [
    "c-chain-rule",
    "la-eigenvalues-eigenvectors"
  ],
  "dl-convolution-operation": [
    "la-matrices-as-transformations"
  ],
  "dl-embeddings-and-tokenization": [
    "la-vectors-operations"
  ],
  "dl-attention-mechanism": [
    "la-matrix-multiplication",
    "la-dot-product-norms"
  ],
  "dl-transformer-architecture": [
    "la-matrix-multiplication"
  ],
  "rl-monte-carlo": [
    "c-improper-integrals"
  ],
  "rl-value-approximation": [
    "dl-gradient-descent-and-optimizers",
    "c-gradient-directional"
  ],
  "rl-dqn": [
    "dl-backpropagation",
    "dl-gradient-descent-and-optimizers"
  ],
  "rl-policy-gradient-theorem": [
    "c-gradient-directional",
    "dl-backpropagation"
  ],
  "rl-actor-critic": [
    "dl-the-artificial-neuron-and-mlp"
  ],
  "rl-trpo-ppo": [
    "dl-gradient-descent-and-optimizers"
  ],
  "l-tokenization-bpe": [
    "a-greedy",
    "dl-embeddings-and-tokenization"
  ],
  "l-embeddings-and-prediction-head": [
    "dl-embeddings-and-tokenization",
    "dl-loss-functions"
  ],
  "l-self-attention": [
    "dl-attention-mechanism",
    "la-dot-product-norms"
  ],
  "l-multihead-and-causal-masking": [
    "dl-attention-mechanism"
  ],
  "l-transformer-block": [
    "dl-transformer-architecture"
  ],
  "l-optimization-and-stability": [
    "dl-gradient-descent-and-optimizers"
  ],
  "l-finetuning-and-instruction-tuning": [
    "dl-transfer-learning"
  ],
  "l-rlhf-and-preference-optimization": [
    "rl-policy-gradient-theorem",
    "rl-trpo-ppo"
  ],
  "l-peft-lora": [
    "la-low-rank-pca",
    "dl-transfer-learning"
  ],
  "l-rag-and-tools": [
    "a-hash-tables"
  ]
};
