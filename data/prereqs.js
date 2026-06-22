/* Atlas — cross-topic prerequisite edges (consumed by app.js learningPath/directPrereqs).
   Same-topic ordering is implicit; this connects the topics in the Knowledge Map & paths. */
window.PREREQS = {
  "ml-knn": [
    "la-dot-product-norms"
  ],
  "ml-decision-trees": [
    "a-trees-heaps",
    "it-entropy"
  ],
  "ml-linear-regression": [
    "la-projection-least-squares",
    "c-gradient-directional"
  ],
  "ml-logistic-regression": [
    "dl-loss-functions",
    "it-cross-entropy-kl"
  ],
  "ml-regularization": [
    "la-dot-product-norms"
  ],
  "ml-svm": [
    "la-dot-product-norms",
    "c-duality-kkt"
  ],
  "ml-dimensionality-reduction": [
    "la-low-rank-pca",
    "la-eigenvalues-eigenvectors"
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
    "c-derivatives-special-functions",
    "it-cross-entropy-kl"
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
  "dl-graph-neural-networks": [
    "a-graph-representations-traversal",
    "dl-the-artificial-neuron-and-mlp"
  ],
  "dl-self-supervised-contrastive": [
    "it-cross-entropy-kl",
    "dl-embeddings-and-tokenization",
    "la-dot-product-norms"
  ],
  "ts-stationarity": [
    "ps-expectation-variance"
  ],
  "dl-gans": [
    "it-cross-entropy-kl"
  ],
  "dl-transformer-architecture": [
    "la-matrix-multiplication"
  ],
  "rl-monte-carlo": [
    "c-improper-integrals",
    "ps-law-of-large-numbers"
  ],
  "rl-value-iteration": [
    "a-dynamic-programming"
  ],
  "rl-policy-iteration": [
    "a-dynamic-programming"
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
  ],
  "rl-policies-values": [
    "ps-conditional-expectation"
  ],
  "rl-mdp-formalism": [
    "ps-random-variables-distributions"
  ],
  "rl-exploration": [
    "ps-confidence-intervals"
  ],
  "l-what-is-a-language-model": [
    "ps-random-variables-distributions"
  ],
  "l-decoding-strategies": [
    "ps-random-variables-distributions"
  ],
  "l-pretraining-objective-data": [
    "dl-loss-functions",
    "it-cross-entropy-kl"
  ],
  "dl-rnn-lstm-gru": [
    "c-chain-rule"
  ],
  "dl-overfitting-and-regularization": [
    "ps-expectation-variance"
  ],
  "dl-diffusion-models": [
    "ps-normal-distribution"
  ],
  "dl-autoencoders-vae": [
    "ps-normal-distribution",
    "it-cross-entropy-kl",
    "it-differential-entropy"
  ],
  "ps-normal-distribution": [
    "c-improper-integrals"
  ],
  "ps-expectation-variance": [
    "c-definite-integral-riemann"
  ],
  "a-algorithms-for-ml": [
    "la-matrix-multiplication"
  ],
  "it-entropy": [
    "ps-random-variables-distributions"
  ],
  "it-differential-entropy": [
    "ps-random-variables-distributions",
    "c-definite-integral-riemann"
  ],
  "it-cross-entropy-kl": [
    "ps-random-variables-distributions"
  ],
  "it-mutual-information": [
    "ps-joint-distributions"
  ],
  "it-source-coding": [
    "ps-random-variables-distributions"
  ],
  "it-channel-capacity": [
    "ps-conditional-independence-bayes"
  ],
  "it-information-in-ml": [
    "ps-random-variables-distributions"
  ],
  "ps-random-variables-distributions": [
    "c-definite-integral-riemann"
  ],
  "ps-uniform-exponential": [
    "c-definite-integral-riemann"
  ],
  "ps-conditional-expectation": [
    "c-definite-integral-riemann"
  ],
  "ps-covariance-correlation": [
    "la-dot-product-norms"
  ],
  "ps-bayesian-inference": [
    "c-definite-integral-riemann"
  ],
  "ps-computational-bayes": [
    "c-definite-integral-riemann"
  ]
};
