/* ============================================================
   ATLAS — curated references per topic.
   kind: video | course | book | paper | article | interactive | reference
   ============================================================ */
window.REFERENCES = {
  "linear-algebra": [
    { title: "Essence of Linear Algebra", by: "3Blue1Brown", kind: "video", url: "https://www.3blue1brown.com/topics/linear-algebra", note: "The single best intuition-builder. Watch this first." },
    { title: "18.06 Linear Algebra", by: "Gilbert Strang · MIT OCW", kind: "course", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", note: "The classic full university course, free." },
    { title: "Introduction to Linear Algebra", by: "Gilbert Strang", kind: "book", url: "https://math.mit.edu/~gs/linearalgebra/", note: "The companion textbook to 18.06." },
    { title: "Immersive Linear Algebra", by: "Ström, Åström, Akenine-Möller", kind: "interactive", url: "https://immersivemath.com/ila/", note: "A textbook with fully interactive figures." },
    { title: "The Matrix Cookbook", by: "Petersen & Pedersen", kind: "reference", url: "https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf", note: "Identities & derivatives — a desk reference." }
  ],
  "calculus": [
    { title: "Essence of Calculus", by: "3Blue1Brown", kind: "video", url: "https://www.3blue1brown.com/topics/calculus", note: "Derivatives & integrals from the ground up, visually." },
    { title: "18.01 Single Variable Calculus", by: "MIT OCW", kind: "course", url: "https://ocw.mit.edu/courses/18-01-single-variable-calculus-fall-2006/", note: "Full lectures, problem sets, exams." },
    { title: "Paul's Online Math Notes", by: "Paul Dawkins", kind: "reference", url: "https://tutorial.math.lamar.edu/", note: "Crystal-clear notes & worked examples for every topic." },
    { title: "Calculus", by: "Gilbert Strang (MIT)", kind: "book", url: "https://ocw.mit.edu/resources/res-18-001-calculus-online-textbook-spring-2005/", note: "Free, readable, application-driven textbook." },
    { title: "Khan Academy: Calculus", by: "Khan Academy", kind: "course", url: "https://www.khanacademy.org/math/calculus-1", note: "Bite-sized practice with instant feedback." }
  ],
  "algorithms": [
    { title: "Introduction to Algorithms (CLRS)", by: "Cormen, Leiserson, Rivest, Stein", kind: "book", url: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/", note: "The definitive reference." },
    { title: "6.006 Introduction to Algorithms", by: "MIT OCW", kind: "course", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", note: "Modern full course with video lectures." },
    { title: "VisuAlgo", by: "Steven Halim", kind: "interactive", url: "https://visualgo.net/", note: "Animated visualizations of nearly every algorithm." },
    { title: "Algorithms, 4th Edition", by: "Sedgewick & Wayne (Princeton)", kind: "course", url: "https://algs4.cs.princeton.edu/", note: "Book + free companion site & code." },
    { title: "Big-O Cheat Sheet", by: "Eric Rowell", kind: "reference", url: "https://www.bigocheatsheet.com/", note: "Complexity of every common operation at a glance." }
  ],
  "deep-learning": [
    { title: "Neural Networks: Zero to Hero", by: "Andrej Karpathy", kind: "video", url: "https://karpathy.ai/zero-to-hero.html", note: "Build backprop & GPT from scratch, line by line." },
    { title: "Neural Networks (series)", by: "3Blue1Brown", kind: "video", url: "https://www.3blue1brown.com/topics/neural-networks", note: "The clearest visual intro to nets & backprop." },
    { title: "Deep Learning", by: "Goodfellow, Bengio, Courville", kind: "book", url: "https://www.deeplearningbook.org/", note: "The foundational textbook, free online." },
    { title: "Practical Deep Learning", by: "fast.ai", kind: "course", url: "https://course.fast.ai/", note: "Top-down, code-first; train real models fast." },
    { title: "Dive into Deep Learning (d2l)", by: "Zhang, Lipton, Li, Smola", kind: "interactive", url: "https://d2l.ai/", note: "Interactive book with runnable code & math." }
  ],
  "reinforcement-learning": [
    { title: "Reinforcement Learning: An Introduction", by: "Sutton & Barto", kind: "book", url: "http://incompleteideas.net/book/the-book-2nd.html", note: "The RL bible — free PDF. Start here." },
    { title: "RL Course", by: "David Silver (DeepMind/UCL)", kind: "video", url: "https://www.davidsilver.uk/teaching/", note: "The canonical lecture series." },
    { title: "Spinning Up in Deep RL", by: "OpenAI", kind: "course", url: "https://spinningup.openai.com/", note: "Theory + clean implementations of modern algorithms." },
    { title: "Deep RL Course", by: "Hugging Face", kind: "course", url: "https://huggingface.co/learn/deep-rl-course/unit0/introduction", note: "Hands-on, train agents in real environments." }
  ],
  "llm": [
    { title: "Attention Is All You Need", by: "Vaswani et al. (2017)", kind: "paper", url: "https://arxiv.org/abs/1706.03762", note: "The paper that introduced the Transformer." },
    { title: "The Illustrated Transformer", by: "Jay Alammar", kind: "article", url: "https://jalammar.github.io/illustrated-transformer/", note: "Attention & the Transformer, beautifully visualized." },
    { title: "Let's build GPT (nanoGPT)", by: "Andrej Karpathy", kind: "video", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY", note: "Code a GPT from scratch in ~2 hours." },
    { title: "The Annotated Transformer", by: "Harvard NLP", kind: "article", url: "https://nlp.seas.harvard.edu/annotated-transformer/", note: "The paper, line-by-line, as runnable code." },
    { title: "Transformer Circuits", by: "Anthropic", kind: "reference", url: "https://transformer-circuits.pub/", note: "How attention & MLPs work mechanistically inside." }
  ],
  "probability-statistics": [
    { title: "Seeing Theory", by: "Daniel Kunin · Brown University", kind: "interactive", url: "https://seeing-theory.brown.edu/", note: "A visual, interactive introduction to probability and statistics. Start here." },
    { title: "Introduction to Probability (Stat 110)", by: "Joseph Blitzstein · Harvard", kind: "course", url: "https://projects.iq.harvard.edu/stat110/home", note: "The definitive intro course — superb intuition; free lectures and book." },
    { title: "Think Stats", by: "Allen B. Downey", kind: "book", url: "https://greenteapress.com/wp/think-stats-2e/", note: "Statistics through Python: exploratory, computational, and free." },
    { title: "StatQuest", by: "Josh Starmer", kind: "video", url: "https://www.youtube.com/@statquest", note: "Clear, friendly video explanations of statistics and ML concepts." },
    { title: "An Introduction to Statistical Learning", by: "James, Witten, Hastie & Tibshirani", kind: "book", url: "https://www.statlearning.com/", note: "Free textbook bridging statistics and machine learning — the gentle ISL." }
  ],
  "machine-learning": [
    { title: "An Introduction to Statistical Learning (ISL)", by: "James, Witten, Hastie & Tibshirani", kind: "book", url: "https://www.statlearning.com/", note: "The best first ML book — intuitive, with free PDF, R and Python labs. Start here." },
    { title: "The Elements of Statistical Learning (ESL)", by: "Hastie, Tibshirani & Friedman", kind: "book", url: "https://hastie.su.domains/ElemStatLearn/", note: "The rigorous reference (free PDF). The advanced companion to ISL." },
    { title: "StatQuest", by: "Josh Starmer", kind: "video", url: "https://statquest.org/video-index/", note: "Wonderfully clear, visual explanations of kNN, trees, SVMs, boosting, cross-validation, and more." },
    { title: "CS229: Machine Learning", by: "Andrew Ng · Stanford", kind: "course", url: "https://cs229.stanford.edu/", note: "The classic graduate course — full notes and lectures, free." },
    { title: "scikit-learn User Guide", by: "scikit-learn", kind: "reference", url: "https://scikit-learn.org/stable/user_guide.html", note: "The practical toolkit: every algorithm here, with usage notes and the API to run it." },
    { title: "Pattern Recognition and Machine Learning", by: "Christopher Bishop", kind: "book", url: "https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/", note: "A deep, probabilistic treatment (free PDF) — strong on the Bayesian view." }
  ],
  "general": [
    { title: "Distill.pub", by: "Distill", kind: "interactive", url: "https://distill.pub/", note: "Interactive, visual ML explanations." },
    { title: "Brilliant", by: "Brilliant.org", kind: "interactive", url: "https://brilliant.org/", note: "Active, problem-first courses across math & CS." },
    { title: "Khan Academy", by: "Khan Academy", kind: "course", url: "https://www.khanacademy.org/", note: "Free foundations for any prerequisite gap." }
  ],
  "information-theory": [
    { title: "A Mathematical Theory of Communication", by: "Claude E. Shannon (1948)", kind: "paper", url: "https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf", note: "The founding paper of the whole field — entropy, source coding, channel capacity, all introduced at once. Remarkably readable." },
    { title: "Information Theory, Inference, and Learning Algorithms", by: "David MacKay", kind: "book", url: "https://www.inference.org.uk/mackay/itila/", note: "The best ML-flavored treatment (free PDF) — links coding, inference, and learning. Start here." },
    { title: "Elements of Information Theory", by: "Cover & Thomas", kind: "book", url: "https://onlinelibrary.wiley.com/doi/book/10.1002/047174882X", note: "The standard rigorous textbook — entropy, mutual information, rate-distortion, channel capacity." },
    { title: "Visual Information Theory", by: "Chris Olah", kind: "article", url: "https://colah.github.io/posts/2015-09-Visual-Information/", note: "A gorgeous visual essay on entropy, cross-entropy, and KL divergence — pairs perfectly with this topic's lessons." },
    { title: "How to send a self-correcting message (Hamming codes)", by: "3Blue1Brown", kind: "video", url: "https://www.youtube.com/watch?v=X8jsijhllIA", note: "Error-correcting codes built up visually from scratch — the channel-coding side of Shannon's theory." },
    { title: "6.441 Information Theory", by: "MIT OpenCourseWare", kind: "course", url: "https://ocw.mit.edu/courses/6-441-information-theory-spring-2016/", note: "A full graduate course with notes — the rigorous path once the intuition lands." }
  ]
};
