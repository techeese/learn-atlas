/* Atlas course — Reinforcement Learning
   Generated & adversarially fact-checked + inline visualizations, worked examples & an expanded question bank. Edit freely; loaded via index.html. */
(window.COURSES = window.COURSES || []).push(
{
  "id": "reinforcement-learning",
  "title": "Reinforcement Learning",
  "icon": "↻",
  "color": "#6fae9f",
  "blurb": "Agents, rewards, and the math of learning to act — MDPs, value functions, policy methods.",
  "modules": [
    {
      "id": "rl-foundations",
      "title": "Foundations: The RL Problem and MDPs",
      "lessons": [
        {
          "id": "rl-what-is-rl",
          "title": "What Reinforcement Learning Is (and Isn't)",
          "minutes": 12,
          "content": "<h3>The Third Paradigm of Learning</h3>\n<p>Most machine learning you encounter falls into one of two camps. In <strong>supervised learning</strong>, a teacher hands you a dataset of labeled examples — images tagged \"cat\" or \"dog,\" emails marked \"spam\" or \"ham\" — and your job is to learn a mapping $f: X \\to Y$ that generalizes to new inputs. In <strong>unsupervised learning</strong>, there are no labels at all; you are handed raw data and asked to find structure in it — clusters, latent factors, a low-dimensional manifold, a generative model $p(x)$.</p>\n<p><strong>Reinforcement learning (RL)</strong> is a genuinely different third thing. There is no fixed dataset and no teacher who tells you the right answer. Instead there is an <em>agent</em> that interacts with an <em>environment</em> over time: it observes a situation, takes an action, and receives a scalar <em>reward</em> signal plus a new situation. Its goal is to learn a behavior — a <em>policy</em> — that maximizes the total reward it accumulates over the long run. The agent learns by <strong>trial and error</strong>: it tries things, sees what pays off, and adjusts. Nobody ever says \"the correct action here was X.\" The only feedback is a number that says how good things are going.</p>\n<div class=\"callout sage\"><div class=\"c-tag\">Key fact</div><p>The defining features of RL are (1) <strong>evaluative</strong> feedback rather than instructive — reward tells you how good your action was, not what the best action would have been — and (2) <strong>sequential, delayed consequences</strong> — actions now shape the situations and rewards you encounter much later. Supervised learning has neither property.</p></div>\n<p>This shift matters more than it first appears. A supervised learner is told the target for every input independently. An RL agent must <em>discover</em> good behavior, and because its own choices determine what data it sees next, learning and data collection are intertwined. You cannot separate \"gather the dataset\" from \"fit the model\" — the agent's current policy decides which states it will even visit.</p>\n\n<h3>The Agent–Environment Loop</h3>\n<p>Everything in RL is organized around one picture: a closed feedback loop between an agent and an environment, ticking forward in discrete time steps $t = 0, 1, 2, \\dots$</p>\n<pre><code>            action a_t\n   ┌───────────────────────────┐\n   │                           ▼\n┌──────┐                  ┌──────────────┐\n│ AGENT│                  │ ENVIRONMENT  │\n└──────┘                  └──────────────┘\n   ▲                           │\n   │   state s_{t+1},          │\n   │   reward r_{t+1}          │\n   └───────────────────────────┘</code></pre>\n<p>At each step the cycle is:</p>\n<ol>\n<li>The agent observes the current <strong>state</strong> $S_t$ (the relevant information about the environment).</li>\n<li>The agent selects an <strong>action</strong> $A_t$ according to its <strong>policy</strong> $\\pi$.</li>\n<li>The environment responds with a scalar <strong>reward</strong> $R_{t+1}$ and transitions to a new state $S_{t+1}$.</li>\n<li>Repeat.</li>\n</ol>\n<p>This produces a <strong>trajectory</strong> (or <em>history</em>) of experience:</p>\n$$S_0, A_0, R_1, S_1, A_1, R_2, S_2, A_2, R_3, \\dots$$\n<p>A few definitions make this precise:</p>\n<ul>\n<li>A <strong>policy</strong> is the agent's behavior: a mapping from states to actions. It can be deterministic, $a = \\pi(s)$, or stochastic, $\\pi(a \\mid s) = \\Pr[A_t = a \\mid S_t = s]$.</li>\n<li>The <strong>return</strong> $G_t$ is the cumulative future reward from time $t$. With a <em>discount factor</em> $\\gamma \\in [0,1]$ that down-weights distant rewards: $$G_t = R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\cdots = \\sum_{k=0}^{\\infty} \\gamma^k R_{t+k+1}.$$</li>\n<li>The agent's objective is to find a policy that maximizes the <strong>expected return</strong>, $\\mathbb{E}_\\pi[G_t]$ — not the immediate reward $R_{t+1}$.</li>\n</ul>\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>The discount $\\gamma$ does two jobs. Mathematically it keeps the infinite sum finite (a geometric series, for bounded rewards and $\\gamma < 1$). Conceptually it encodes \"a reward now is worth more than the same reward later\" — like an interest rate. With $\\gamma = 0$ the agent is myopic and only cares about the next reward; as $\\gamma \\to 1$ it becomes far-sighted and weighs the long-term future almost equally.</p></div>\n\n<h3>The Reward Hypothesis</h3>\n<p>RL rests on a deceptively strong claim, stated by Sutton and often attributed to the broader RL community as the <strong>reward hypothesis</strong>:</p>\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p><em>\"That all of what we mean by goals and purposes can be well thought of as the maximization of the expected value of the cumulative sum of a received scalar signal (reward).\"</em></p></div>\n<p>In other words: <strong>any</strong> goal we care about — winning a game, walking without falling, maximizing ad revenue, folding a protein — can in principle be expressed as maximizing expected cumulative reward. This is what unifies the field. It is also where RL gets dangerous in practice: if your reward function does not actually capture what you want, the agent will exploit the literal reward and produce behavior you did not intend. This is <strong>reward hacking</strong> / specification gaming, and it is the same alignment problem that shows up across modern AI. A boat-racing agent rewarded for hitting checkpoints learned to spin in circles collecting the same checkpoints forever instead of finishing the race — perfectly optimal under the stated reward, and completely wrong.</p>\n<p>The reward must be a <em>scalar</em>, and it should reward the <em>what</em> (the outcome), not your prior knowledge about <em>how</em> to achieve it. A common beginner mistake is to reward intermediate sub-goals you think are helpful — which can lock the agent into your possibly-suboptimal strategy.</p>\n\n<h3>Delayed Reward and the Credit Assignment Problem</h3>\n<p>Here is the deepest difficulty in RL, and the one that most separates it from supervised learning. Suppose you play a 40-move chess game and lose. You receive a reward of $-1$ at the very end and $0$ on every move before. Which of your 40 moves caused the loss? Move 12 may have been the fatal blunder; moves 13–40 might have been forced consequences. The reward signal does not tell you. You must <em>infer</em> which earlier actions deserve credit (or blame) for an outcome that arrives much later.</p>\n<p>This is the <strong>(temporal) credit assignment problem</strong>: when reward is delayed and depends on a long sequence of actions, it is hard to attribute it to the specific decisions responsible.</p>\n<h4>Why is it hard?</h4>\n<ul>\n<li><strong>Delay.</strong> The consequence of an action can appear many steps later, so there is no immediate signal linking action to outcome.</li>\n<li><strong>Entanglement.</strong> The final reward is the joint result of many actions plus environment randomness. Disentangling each action's marginal contribution is a hard inference problem.</li>\n<li><strong>Counterfactuals.</strong> To know whether an action was good you'd ideally compare it to what <em>would have happened</em> otherwise — but you only ever observe the one path you actually took. You cannot rewind the world.</li>\n<li><strong>Noise.</strong> A good action can be followed by bad luck (and vice versa), so a single outcome is a noisy estimate of an action's quality. You need many trials to average out the noise.</li>\n</ul>\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>The central technical idea RL uses to attack credit assignment is the <strong>value function</strong>: instead of waiting for the final outcome, learn a prediction $V(s)$ (or $Q(s,a)$) of expected future return from each state. Then the credit for an action can be assigned <em>locally</em> by comparing the value before and after — the <em>temporal-difference error</em> $\\delta_t = R_{t+1} + \\gamma V(S_{t+1}) - V(S_t)$. This \"bootstrapping\" turns a global, long-horizon attribution problem into a chain of one-step updates, and it is the backbone of algorithms like TD learning, Q-learning, and the actor-critic methods inside modern systems.</p></div>\n\n<h3>Exploration vs. Exploitation</h3>\n<p>Because the agent generates its own data, it faces a tension that supervised learning never does. To get reward, the agent should <strong>exploit</strong> what it already knows is good. But to <em>discover</em> whether something better exists, it must <strong>explore</strong> — try actions whose value is still uncertain, which may pay off worse in the short term.</p>\n<p>Exploit too much and you get stuck on a mediocre habit, never finding the genuinely best action. Explore too much and you waste reward on actions you already know are bad. Neither pure strategy is optimal; the agent must balance them, and ideally explore <em>more</em> early (when uncertain) and <em>less</em> later (when confident).</p>\n<p>The simplest scheme is <strong>$\\epsilon$-greedy</strong>: with probability $1-\\epsilon$ take the action you currently believe is best (exploit), and with probability $\\epsilon$ take a uniformly random action (explore). Typically $\\epsilon$ is decayed over time.</p>\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Think of choosing a restaurant. Exploitation = going to your proven favorite tonight. Exploration = trying the new place that might be amazing or might be a waste of dinner. A good strategy explores aggressively when you're new in town and settles down as you learn the neighborhood.</p></div>\n\n<h3>Worked Example: A Tiny Episode</h3>\n<p>Consider a grid where a robot must reach a goal. Reward is $-1$ on every step (to encourage speed) and $0$ on reaching the goal, which ends the <em>episode</em>. Suppose the robot follows a policy that produces this trajectory, and let $\\gamma = 0.9$:</p>\n<pre><code>t:        0       1       2       3 (goal)\nstate:    s0  →   s1  →   s2  →   s_goal\naction:   right   right   up\nreward:        R1=-1   R2=-1   R3= 0</code></pre>\n<p>Let's compute the return $G_0$ from the start, using $G_t = R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\cdots$:</p>\n$$G_0 = R_1 + \\gamma R_2 + \\gamma^2 R_3 = (-1) + 0.9(-1) + 0.81(0) = -1 - 0.9 + 0 = -1.9.$$\n<p>And the return from $s_1$ onward:</p>\n$$G_1 = R_2 + \\gamma R_3 = (-1) + 0.9(0) = -1.$$\n<p>Notice the recursive relationship that falls out, which is the seed of the entire theory of RL:</p>\n$$G_0 = R_1 + \\gamma G_1 = -1 + 0.9(-1) = -1.9. \\quad\\checkmark$$\n<p>This recursion, $G_t = R_{t+1} + \\gamma G_{t+1}$, is exactly what lets value functions bootstrap. It also illustrates credit assignment in miniature: the $-1.9$ return at $s_0$ is a verdict on the <em>whole</em> path, and the agent must learn that the choices at $s_0$ and $s_1$ both contributed. A value function would learn $V(s_1) \\approx -1$ first (it's closer to the outcome) and then propagate that backward to refine $V(s_0)$.</p>\n\n<h3>Classifying the Three Paradigms</h3>\n<p>To cement the distinction, here is how the same problem domain changes paradigm depending on the feedback you have:</p>\n<ul>\n<li><strong>Supervised:</strong> You have a dataset of board positions each labeled with the move a grandmaster played. Learn to imitate. (Correct answers given; no interaction.)</li>\n<li><strong>Unsupervised:</strong> You have millions of unlabeled board positions. Cluster them or learn an embedding. (No answers, no reward; just structure.)</li>\n<li><strong>Reinforcement:</strong> You play full games; the only signal is win/lose/draw at the end. Learn to play well. (Evaluative, delayed feedback; the agent's moves shape the data.)</li>\n</ul>\n<p>A useful litmus test: <em>Does the agent's own behavior determine the data it learns from, and is the feedback a reward-to-be-maximized rather than a target-to-be-matched?</em> If yes to both, it's RL.</p>\n\n<h3>Connections and Caveats</h3>\n<p>RL is the framework behind AlphaGo/AlphaZero, robotic control, and — increasingly — the fine-tuning of large language models via <strong>RLHF</strong> (reinforcement learning from human feedback) and related methods, where the \"reward\" is a learned model of human preference. The same themes recur there: reward must be specified carefully (reward hacking is a live concern), and exploration vs. exploitation appears as the balance between staying close to known-good behavior and discovering better responses. RL is powerful but notoriously sample-hungry and can be unstable precisely because of the credit-assignment and exploration challenges above — which is why so much of the field is machinery for taming exactly those two problems.",
          "mcq": [
            {
              "q": "An image-classification model is trained on a fixed dataset where each photo is labeled with the correct species. A second system plays Atari, receiving only the score change after each action and learning which sequences of joystick moves earn points. Which statement is correct?",
              "choices": [
                "Both are reinforcement learning, since both improve over time",
                "The first is supervised learning; the second is reinforcement learning",
                "The first is reinforcement learning; the second is supervised learning",
                "The first is supervised; the second is unsupervised, since there are no labels"
              ],
              "answer": 1,
              "explain": "The classifier learns from given correct labels (instructive feedback, fixed data) which is supervised. The Atari agent learns from an evaluative reward whose data it generates by acting, which is reinforcement learning — not unsupervised, because there is a reward to maximize."
            },
            {
              "q": "In the agent-environment loop, after the agent takes action $A_t$, what does the environment return at the next step?",
              "choices": [
                "A reward $R_{t+1}$ and the next state $S_{t+1}$",
                "The optimal action $A_{t+1}^*$ it should have taken",
                "A gradient telling the agent how to change its policy",
                "The full return $G_t$ for the rest of the episode"
              ],
              "answer": 0,
              "explain": "The environment emits a scalar reward and the next state. It never reveals the optimal action (that would be supervised/instructive) nor the full future return (which depends on actions not yet taken) nor any gradient."
            },
            {
              "q": "Why is temporal credit assignment fundamentally hard in RL?",
              "choices": [
                "Because rewards are always negative until the goal is reached",
                "Because the discount factor $\\gamma$ makes the return diverge",
                "Because a delayed outcome results from many actions plus noise, and you only observe the single path you actually took, never the counterfactuals",
                "Because supervised labels are too expensive to collect"
              ],
              "answer": 2,
              "explain": "Delay, entanglement of many actions, environment noise, and the impossibility of observing counterfactual alternatives all make it hard to attribute a late reward to the specific earlier action responsible."
            },
            {
              "q": "An agent always picks the action with the highest estimated value and never tries anything else. What is the primary risk?",
              "choices": [
                "It will overfit the training labels",
                "It may lock onto a suboptimal action and never discover a better one (too little exploration)",
                "Its return will fail to converge because $\\gamma < 1$",
                "It violates the reward hypothesis"
              ],
              "answer": 1,
              "explain": "Pure exploitation means the agent never gathers information about untried actions, so a genuinely better option can remain undiscovered. This is the exploration-exploitation tradeoff; $\\epsilon$-greedy is one simple fix."
            },
            {
              "q": "What does it mean that RL feedback is \"evaluative rather than instructive\"?",
              "choices": [
                "The environment explicitly labels the correct action at every step",
                "The reward tells the agent how good its action was, but not what the optimal action would have been",
                "The agent receives a full gradient of the loss with respect to each action",
                "Feedback is given only at the very end of training, never during interaction"
              ],
              "answer": 1,
              "explain": "Evaluative feedback scores the chosen action with a scalar reward, whereas instructive feedback (as in supervised learning) would reveal the correct target action. Choice 0 describes instructive feedback, and choices 2-3 confuse it with gradients and delayed timing."
            },
            {
              "q": "Why can't an RL problem be cleanly separated into \"gather the dataset\" then \"fit the model\" the way supervised learning can?",
              "choices": [
                "Because RL datasets are always too large to fit in memory at once",
                "Because rewards are categorical labels that must be one-hot encoded first",
                "Because the agent's current policy determines which states it visits, so data collection and learning are intertwined",
                "Because the environment is always fully observable, making a fixed dataset redundant"
              ],
              "answer": 2,
              "explain": "The agent's own choices decide what data it sees next, so the dataset it learns from is shaped by the policy it is simultaneously learning. This coupling is absent in supervised learning, where the dataset is fixed in advance."
            },
            {
              "q": "An algorithm is handed millions of unlabeled customer transactions and asked to discover natural groupings, with no rewards, no actions, and no notion of time steps. Which paradigm is this?",
              "choices": [
                "Reinforcement learning",
                "Supervised learning",
                "Unsupervised learning",
                "Evaluative learning"
              ],
              "answer": 2,
              "explain": "Finding structure (clusters) in raw unlabeled data with no labels, rewards, or sequential interaction is the defining task of unsupervised learning. There are no actions or rewards (ruling out RL) and no labels (ruling out supervised); \"evaluative learning\" is not a standard paradigm."
            },
            {
              "q": "In the agent-environment loop indexed by discrete time steps $t = 0, 1, 2, \\dots$, which quantity does the agent itself produce at step $t$?",
              "choices": [
                "The action $A_t$",
                "The state $S_{t+1}$",
                "The reward $R_{t+1}$",
                "Both the next state $S_{t+1}$ and reward $R_{t+1}$"
              ],
              "answer": 0,
              "explain": "The agent observes $S_t$ and emits the action $A_t$, while the environment responds with the next state $S_{t+1}$ and reward $R_{t+1}$. The agent never generates the state or the reward."
            },
            {
              "q": "A robot navigating a maze receives a reward of $+10$ only when it reaches the exit and $0$ on every other step. After thousands of episodes it consistently solves the maze quickly. Which RL feature most directly explains why this sparse, delayed signal was still learnable?",
              "choices": [
                "The environment secretly labeled each intermediate step with the correct turn",
                "The agent maximizes cumulative long-run reward, so it can propagate value backward from the eventual exit to earlier actions",
                "Sparse rewards convert the task into a supervised mapping $f: X \\to Y$",
                "The reward of $0$ at intermediate steps tells the agent exactly which action was wrong"
              ],
              "answer": 1,
              "explain": "RL agents optimize total accumulated reward, which lets the value of reaching the exit be assigned back to the earlier actions that led there (temporal credit assignment). The maze never provides instructive labels, and a reward of $0$ is evaluative silence, not a correction."
            },
            {
              "q": "A student claims: \"Reinforcement learning is just supervised learning where the reward number is the label for each action.\" What is the key flaw in this claim?",
              "choices": [
                "Rewards are always vectors, whereas supervised labels are always scalars",
                "There is no flaw; reward and label are interchangeable training targets",
                "A reward only evaluates the action that was taken; it never reveals what the best action would have been, and the agent's own actions determine which data it ever sees",
                "Supervised learning also lacks any notion of a correct answer, so the two are identical"
              ],
              "answer": 2,
              "explain": "A label in supervised learning states the correct output, but a reward only scores the chosen action (evaluative, not instructive) and the agent's behavior shapes its future data distribution. Treating reward as a label ignores both differences."
            },
            {
              "q": "Suppose an agent received rewards $R_1 = 0$, $R_2 = 0$, $R_3 = 5$ over three steps and uses a discount factor $\\gamma = 0.5$. What is the discounted return $G_0 = R_1 + \\gamma R_2 + \\gamma^2 R_3$ computed from the start?",
              "choices": [
                "$1.25$",
                "$2.5$",
                "$5$",
                "$0$"
              ],
              "answer": 0,
              "explain": "$G_0 = 0 + 0.5 \\cdot 0 + 0.5^2 \\cdot 5 = 0.25 \\cdot 5 = 1.25$. The later reward is discounted by $\\gamma^2$ because it arrives two steps after the start."
            },
            {
              "q": "An agent in an unfamiliar environment has so far found one action that reliably yields a small reward. A friend insists the agent should immediately commit to that action forever to be safe. Why is this advice questionable in the RL setting?",
              "choices": [
                "Because reward signals in RL are guaranteed to be instructive, so no further sampling is needed",
                "Because committing to the known action removes the time-step index $t$ from the loop",
                "Because RL problems can always be solved offline first, making any online choice irrelevant",
                "Because purely exploiting the current best-known action can lock the agent into a suboptimal behavior, since better actions it never tries stay undiscovered"
              ],
              "answer": 3,
              "explain": "With only evaluative feedback, the agent cannot know an action is best without trying alternatives, so always exploiting risks missing higher-reward actions (the exploration-exploitation trade-off). The other options misstate RL's feedback type, the loop structure, or wrongly assume offline solvability."
            },
            {
              "q": "Which best describes what reinforcement learning is?",
              "choices": [
                "An agent learns by trial-and-error interaction with an environment, choosing actions to maximize cumulative reward — with no labeled dataset and no teacher supplying correct answers",
                "Learning a mapping from labeled examples to their correct outputs",
                "Finding clusters or latent structure in unlabeled data",
                "Memorizing a fixed dataset of (situation, correct-action) pairs"
              ],
              "answer": 0,
              "explain": "RL is the \"third paradigm\": no fixed dataset and no teacher, just an agent acting in an environment and receiving a scalar reward. It learns from <i>evaluative</i> feedback (how good an action was) under <i>delayed</i> consequences — neither of which supervised or unsupervised learning has."
            },
            {
              "q": "What is a policy $\\pi$ in reinforcement learning?",
              "choices": [
                "The total reward accumulated over an episode",
                "The environment's rule for handing out rewards",
                "The agent's behavior — a mapping from states to actions (deterministic $a=\\pi(s)$, or a distribution $\\pi(a\\mid s)$)",
                "The discount factor applied to future rewards"
              ],
              "answer": 2,
              "explain": "The policy <i>is</i> the agent's strategy: given the current state, which action (or distribution over actions) to take. Everything the agent \"decides\" is encoded in $\\pi$; learning in RL means improving $\\pi$ toward higher expected return."
            },
            {
              "q": "What is the return $G_t$?",
              "choices": [
                "The single immediate reward $R_{t+1}$",
                "The cumulative (discounted) future reward from time $t$ onward, $G_t=\\sum_{k\\ge0}\\gamma^k R_{t+k+1}$ — the quantity the agent maximizes in expectation",
                "The average reward across all states",
                "The probability of eventually reaching the goal"
              ],
              "answer": 1,
              "explain": "The agent optimizes long-run reward, not the immediate $R_{t+1}$. The return $G_t$ sums all future rewards, discounted by $\\gamma^k$, and the objective is to maximize its expectation $\\mathbb{E}_\\pi[G_t]$."
            },
            {
              "q": "What is the role of the discount factor $\\gamma\\in[0,1]$?",
              "choices": [
                "It sets the learning rate of the agent's value updates",
                "It rescales the state space to a fixed size",
                "It is the per-step probability that the environment changes its reward function",
                "It down-weights rewards that arrive further in the future (and keeps the infinite-horizon return finite), trading immediate against long-term reward"
              ],
              "answer": 3,
              "explain": "$\\gamma$ weights a reward $k$ steps away by $\\gamma^k$. Near 0 the agent is myopic (cares only about immediate reward); near 1 it is far-sighted. Mathematically, $\\gamma<1$ also makes the infinite sum a convergent geometric series for bounded rewards."
            }
          ],
          "flashcards": [
            {
              "front": "What two features distinguish reinforcement learning from supervised learning?",
              "back": "(1) Feedback is evaluative (a reward saying how good the action was) rather than instructive (the correct answer); (2) consequences are sequential and delayed — actions shape future states and rewards, and the agent generates its own data."
            },
            {
              "front": "Write the agent-environment loop: what does the agent emit and what does the environment return each step?",
              "back": "Agent observes state $S_t$, emits action $A_t$ via policy $\\pi$. Environment returns reward $R_{t+1}$ and next state $S_{t+1}$. Trajectory: $S_0, A_0, R_1, S_1, A_1, R_2, \\dots$"
            },
            {
              "front": "Define the return $G_t$ with discounting.",
              "back": "$G_t = \\sum_{k=0}^{\\infty} \\gamma^k R_{t+k+1} = R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\cdots$, with discount $\\gamma \\in [0,1]$. The objective is to maximize $\\mathbb{E}_\\pi[G_t]$. Recursion: $G_t = R_{t+1} + \\gamma G_{t+1}$."
            },
            {
              "front": "State the reward hypothesis.",
              "back": "All goals and purposes can be well thought of as the maximization of the expected value of the cumulative sum of a received scalar reward signal."
            },
            {
              "front": "What is the (temporal) credit assignment problem and why is it hard?",
              "back": "Attributing a delayed reward to the specific earlier actions responsible for it. Hard because of delay, entanglement of many actions, environment noise, and the inability to observe counterfactual paths. Value functions / TD-error address it by bootstrapping local updates."
            },
            {
              "front": "Exploration vs exploitation: define each and name one simple balancing scheme.",
              "back": "Exploit = take the action currently believed best (maximize known reward). Explore = try uncertain actions to discover something better. $\\epsilon$-greedy: best action with prob $1-\\epsilon$, random action with prob $\\epsilon$ (often decay $\\epsilon$ over time)."
            }
          ],
          "homework": [
            {
              "prompt": "Classify each scenario as supervised, unsupervised, or reinforcement learning, and justify in one sentence: (a) A thermostat-control agent that adjusts heating each hour and is rewarded by a comfort-minus-energy-cost score. (b) A model trained on 50,000 X-ray images each labeled 'pneumonia' or 'healthy'. (c) An algorithm grouping a retailer's customers into segments from purchase histories with no predefined categories.",
              "hint": "Ask for each: Is feedback an evaluative reward to maximize, a given correct label, or absent entirely? Does the system's own actions affect the data it sees?",
              "solution": "(a) Reinforcement learning: feedback is an evaluative reward (comfort minus cost), it is delayed/sequential, and the agent's hourly actions affect future temperature states and thus future data. (b) Supervised learning: each input has a given correct label and the data is fixed; the task is to learn the mapping image to diagnosis. (c) Unsupervised learning: there are no labels and no reward — only structure (clusters) to be discovered in the data."
            },
            {
              "prompt": "An agent receives rewards $R_1 = 2,\\ R_2 = 0,\\ R_3 = -1,\\ R_4 = 5$ and then the episode ends. Using $\\gamma = 0.5$, compute the return $G_0$. Then compute $G_1$ and verify the recursion $G_0 = R_1 + \\gamma G_1$.",
              "hint": "Use $G_t = R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\cdots$. Compute $G_1$ first (rewards from $R_2$ on), then plug into the recursion.",
              "solution": "$G_0 = 2 + 0.5(0) + 0.25(-1) + 0.125(5) = 2 + 0 - 0.25 + 0.625 = 2.375.$ Then $G_1 = R_2 + \\gamma R_3 + \\gamma^2 R_4 = 0 + 0.5(-1) + 0.25(5) = -0.5 + 1.25 = 0.75.$ Check: $R_1 + \\gamma G_1 = 2 + 0.5(0.75) = 2 + 0.375 = 2.375 = G_0.$ The recursion holds."
            },
            {
              "prompt": "Explain why temporal credit assignment is harder in a 100-move game with reward only at the end than in a supervised image-classification task. Then describe, at a high level, how a value function helps.",
              "hint": "Contrast the feedback: when does the signal arrive, how many decisions does it depend on, and do you ever see what would have happened under a different action? Then think about replacing the final outcome with a learned prediction.",
              "solution": "In supervised classification, every input gets its own immediate, correct label, so credit assignment is trivial: the loss for each example directly says how wrong that single prediction was. In the 100-move game, the single end-of-game reward is the joint result of all 100 moves plus opponent and environment randomness, it arrives only after a long delay, and you never observe the counterfactual outcomes of moves you didn't make — so you cannot directly tell which moves were responsible. A value function $V(s)$ (or $Q(s,a)$) helps by learning a prediction of expected future return from each state. Then instead of waiting for the final reward, the agent assigns credit locally using the temporal-difference error $\\delta_t = R_{t+1} + \\gamma V(S_{t+1}) - V(S_t)$: each one-step transition gets an immediate learning signal, and value estimates from states near the outcome propagate backward to earlier states over many updates, converting one long-horizon attribution problem into a chain of short, local ones."
            }
          ],
          "examples": [
            {
              "title": "Evaluative vs. Instructive Feedback on a 3-Door Choice",
              "body": "You face three doors $\\{A, B, C\\}$ with unknown hidden payouts. On one visit you open door $B$ and a sign lights up showing the number $+3$. Contrast what this single piece of feedback tells you under (i) a supervised teacher and (ii) an RL reward signal, and explain why RL must rely on trial and error here.",
              "solution": "<strong>Step 1 — What feedback actually arrived.</strong> You took action $a = B$ and observed a single scalar $R = +3$. That is the <em>entire</em> signal. There is no annotation saying which door was best.\n\n<strong>Step 2 — Instructive (supervised) interpretation.</strong> A supervised teacher provides the correct label for the input. Here that would mean being told the target action directly, e.g. \"the right choice was $C$.\" Crucially, an instructive signal does not depend on what you did — it names the optimal answer regardless of your action. With it you could immediately switch to $C$ and never need to try $A$ or $C$ yourself.\n\n<strong>Step 3 — Evaluative (RL) interpretation.</strong> The reward $R = +3$ only grades the action you actually took. It says \"$B$ scored $3$,\" but it is silent about $A$ and $C$. You learn the counterfactual values of the doors you did <em>not</em> open only by opening them on future visits.\n\n<strong>Step 4 — Why trial and error is forced.</strong> Suppose the true (unknown) payouts are $A = 1,\\ B = 3,\\ C = 5$. After seeing only $R_B = +3$ you cannot rule out that some unopened door beats it. To discover $C$ is best you must <em>explore</em>: open the other doors and compare their observed rewards. This is exactly the evaluative-feedback property of RL — reward tells you how good your action was, not what the best action would have been.\n\n<strong>Answer.</strong> The supervised label would directly name the optimal door (action-independent, no search needed); the RL reward $+3$ only evaluates door $B$ and leaves $A$ and $C$ unknown, so the agent must explore by trial and error to find that $C$ (payout $5$) is best."
            },
            {
              "title": "Delayed Consequences: When the Greedy Action Is Wrong",
              "body": "An agent starts in state $S_0$ and must choose once between two actions. <em>Grab</em> gives immediate reward $+2$ and ends the episode. <em>Wait</em> gives immediate reward $0$, moves to $S_1$, and from $S_1$ the only available move yields $+10$ and ends. With discount $\\gamma = 0.9$, which action maximizes the return $G_0$, and what does this reveal about RL feedback?",
              "solution": "<strong>Step 1 — Set up the return.</strong> The return from time $0$ is $G_0 = R_1 + \\gamma R_2 + \\gamma^2 R_3 + \\cdots$, the discounted sum of <em>all</em> future rewards, not just the next one.\n\n<strong>Step 2 — Evaluate <em>Grab</em>.</strong> The episode ends after one reward, so\n$$G_0^{\\text{grab}} = R_1 = +2.$$\n\n<strong>Step 3 — Evaluate <em>Wait</em>.</strong> First reward is $R_1 = 0$ (the move $S_0 \\to S_1$), then from $S_1$ the next move gives $R_2 = +10$:\n$$G_0^{\\text{wait}} = 0 + \\gamma \\cdot 10 = 0.9 \\times 10 = 9.$$\n\n<strong>Step 4 — Compare.</strong> Since $9 > 2$, <em>Wait</em> is optimal even though its immediate reward ($0$) is worse than <em>Grab</em>'s ($+2$). A myopic agent that maximized only the next reward would wrongly pick <em>Grab</em>.\n\n<strong>Step 5 — Sensitivity check (an edge case).</strong> The right choice depends on $\\gamma$. <em>Wait</em> beats <em>Grab</em> whenever $10\\gamma > 2$, i.e. $\\gamma > 0.2$. A very impatient agent with, say, $\\gamma = 0.1$ would get $G_0^{\\text{wait}} = 1 < 2$ and correctly prefer <em>Grab</em>. So the same environment can flip the optimal action purely through how the agent values delayed reward.\n\n<strong>Answer.</strong> With $\\gamma = 0.9$, <em>Wait</em> wins ($G_0 = 9$ vs. $2$). This illustrates RL's second defining feature — sequential, delayed consequences: an action's worth is its long-run discounted return, so the best immediate reward need not be the best decision, and credit for the $+10$ must be assigned back to the earlier choice to <em>Wait</em>."
            }
          ]
        },
        {
          "id": "rl-mdp-formalism",
          "title": "Markov Decision Processes",
          "minutes": 16,
          "content": "<h3>From a Loose Idea to a Precise Object</h3>\n<p>In the last lesson we described reinforcement learning informally: an <strong>agent</strong> interacts with an <strong>environment</strong>, takes <strong>actions</strong>, and receives <strong>reward</strong>, learning a behavior that accumulates as much reward as possible. That story is evocative but mathematically useless — you cannot prove anything, derive an algorithm, or even define \"best behavior\" from a story. This lesson replaces the story with a precise object: the <strong>Markov Decision Process</strong> (MDP). Almost every algorithm in RL — value iteration, Q-learning, policy gradients, PPO, AlphaZero's training loop — is ultimately a recipe for solving (or approximately solving) an MDP. Getting this formalism into your bones is the single highest-leverage thing you can do early in RL.</p>\n\n<h3>The MDP Tuple $(S, A, P, R, \\gamma)$</h3>\n<p>A (finite) Markov Decision Process is a tuple with five components. We'll define each one, then immediately make it concrete.</p>\n<ul>\n<li><strong>$S$ — the state space.</strong> The set of all situations the agent can be in. A state $s \\in S$ is meant to capture <em>everything relevant about the world right now</em>. In a board game it's the board position; in a robot it might be joint angles and velocities; in a recommender it might be the user's history summary.</li>\n<li><strong>$A$ — the action space.</strong> The set of choices available to the agent. Sometimes the available actions depend on the state, written $A(s)$, but we'll keep $A$ fixed for clarity.</li>\n<li><strong>$P$ — the transition dynamics.</strong> A probability distribution describing how the world responds: given that you're in state $s$ and take action $a$, what state do you land in (and what reward do you get)? This is where the randomness of the environment lives.</li>\n<li><strong>$R$ — the reward function.</strong> A scalar signal that defines <em>what we want</em>. Reward is the entire specification of the goal — the agent has no other notion of \"good.\"</li>\n<li><strong>$\\gamma$ — the discount factor.</strong> A number $\\gamma \\in [0, 1]$ that controls how much we care about future reward versus immediate reward. More on this shortly; it is subtler than it looks.</li>\n</ul>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>The MDP is to RL what the i.i.d. dataset $(x_i, y_i)$ is to supervised learning: the standard problem formulation that lets a whole field share algorithms, proofs, and benchmarks. When you read \"this method assumes an MDP,\" it is exactly as load-bearing as \"this method assumes i.i.d. data\" — and just as important to question when it might be violated.</p>\n</div>\n\n<h3>The Agent–Environment Loop and the Interaction Trajectory</h3>\n<p>Time proceeds in discrete steps $t = 0, 1, 2, \\dots$. At each step the agent observes state $S_t$, chooses action $A_t$, and the environment responds with a reward $R_{t+1}$ and a next state $S_{t+1}$. (We index the reward by $t+1$ to emphasize that it arrives <em>after</em> the action, jointly with the next state — this is the standard Sutton–Barto convention and it keeps the bookkeeping clean later.) The result is a <strong>trajectory</strong>:</p>\n$$S_0, A_0, R_1, S_1, A_1, R_2, S_2, A_2, R_3, \\dots$$\n<p>Everything in RL is computed from quantities along trajectories like this one.</p>\n\n<h3>The Transition Dynamics $p(s', r \\mid s, a)$</h3>\n<p>The single most complete description of the environment is the joint distribution over the next state and reward, conditioned on the current state and action:</p>\n$$p(s', r \\mid s, a) \\;\\doteq\\; \\Pr\\{\\, S_{t+1} = s',\\; R_{t+1} = r \\;\\mid\\; S_t = s,\\; A_t = a \\,\\}.$$\n<p>This is a proper probability distribution, so for every fixed $(s, a)$ it sums to one over all next-states and rewards:</p>\n$$\\sum_{s' \\in S} \\sum_{r \\in \\mathcal{R}} p(s', r \\mid s, a) = 1 \\qquad \\text{for all } s \\in S,\\, a \\in A.$$\n<p>From this one object you can derive everything else you might want:</p>\n<ul>\n<li><strong>State-transition probabilities</strong> (marginalize out the reward):\n$$p(s' \\mid s, a) = \\sum_{r} p(s', r \\mid s, a).$$</li>\n<li><strong>Expected reward for a state–action pair</strong>:\n$$r(s, a) = \\mathbb{E}[\\,R_{t+1} \\mid S_t = s, A_t = a\\,] = \\sum_{r} r \\sum_{s'} p(s', r \\mid s, a).$$</li>\n</ul>\n<p>Note carefully: the reward can be random and can depend on where you land. Writing $R$ as a deterministic function $r(s,a)$ or $r(s,a,s')$ is a common and convenient special case, but the four-argument $p(s', r \\mid s, a)$ is the fully general form.</p>\n\n<h3>The Markov Property: Why It's Called <em>Markov</em></h3>\n<p>The defining assumption — the one that earns the name — is the <strong>Markov property</strong>: the future depends on the past <em>only through the current state</em>. Formally, the distribution of the next state and reward depends on the entire history only via $S_t$ and $A_t$:</p>\n$$\\Pr\\{\\,S_{t+1}, R_{t+1} \\mid S_t, A_t\\,\\} = \\Pr\\{\\,S_{t+1}, R_{t+1} \\mid S_0, A_0, R_1, \\dots, S_t, A_t\\,\\}.$$\n<p>In words: <strong>the state is a sufficient statistic of the history.</strong> Once you know the current state, the past tells you nothing more about what happens next.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>\"Markov\" is not a property of the world — it is a property of your <em>state representation</em>. The same physical system can be Markov or non-Markov depending on what you choose to put in $S$. A chess position is Markov: the arrangement of pieces (plus castling/en-passant flags and whose turn it is) determines the legal futures regardless of the move order that produced it. But a single video <em>frame</em> of Pong is <strong>not</strong> Markov — you can't tell which way the ball is moving from one frame. The classic fix (DeepMind's DQN) was to stack the last 4 frames into the state, restoring the Markov property by adding velocity information. Designing the state so that \"what you can see now\" is enough is one of the great practical arts of applied RL.</p>\n</div>\n\n<p>Why insist on this? Because the Markov property is exactly what makes the problem tractable. It lets us define a value <em>per state</em> (rather than per history), it makes the optimal action depend only on the current state, and it powers the Bellman equations and dynamic programming you'll meet next. A process without it would require reasoning over exponentially many histories.</p>\n\n<h3>The Return: What We Actually Maximize</h3>\n<p>Reward $R_{t+1}$ is a per-step signal, but the agent doesn't care about a single step — it cares about the <em>cumulative</em> reward over time. We call the cumulative future reward from time $t$ the <strong>return</strong>, denoted $G_t$. The discounted return is:</p>\n$$G_t \\;\\doteq\\; R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\cdots \\;=\\; \\sum_{k=0}^{\\infty} \\gamma^{k}\\, R_{t+k+1}.$$\n<p>Each reward $k$ steps in the future is multiplied by $\\gamma^k$, so reward that arrives sooner is weighted more heavily. The return obeys a beautiful and crucial recursion that you should commit to memory — it is the seed of every value-based algorithm:</p>\n$$G_t = R_{t+1} + \\gamma\\big(R_{t+2} + \\gamma R_{t+3} + \\cdots\\big) = R_{t+1} + \\gamma\\, G_{t+1}.$$\n<p>This \"the return now equals the next reward plus the discounted return from next time\" identity is the recursive heart of RL. The <strong>value function</strong> (next lesson) is just the expected value of $G_t$, and the famous Bellman equation is what this recursion becomes once you take expectations.</p>\n\n<h3>Episodic vs. Continuing Tasks</h3>\n<p>There are two flavors of task, and the distinction governs how the return is defined.</p>\n<h4>Episodic tasks</h4>\n<p>The interaction naturally breaks into <strong>episodes</strong> that end at a special <strong>terminal state</strong> after a final step $T$ — a game of chess ends, a robot reaches the goal or falls over, a maze run finishes. The return is then a <em>finite</em> sum:</p>\n$$G_t = \\sum_{k=0}^{T - t - 1} \\gamma^{k}\\, R_{t+k+1}.$$\n<p>Here $T$ is random (you don't know in advance when the episode ends). A neat trick unifies the two cases: model termination as an absorbing state that loops to itself forever with reward 0. Then the infinite sum is automatically finite, and episodic and continuing tasks share one formula.</p>\n<h4>Continuing tasks</h4>\n<p>The interaction goes on forever with no natural endpoint — a server managing a job queue, a thermostat, a market-making agent. Here $T = \\infty$, and the infinite sum could in principle diverge. This is precisely where $\\gamma < 1$ earns its keep.</p>\n\n<h3>The Discount Factor $\\gamma$: Three Jobs in One Number</h3>\n<p>The discount factor does three things at once, and it pays to see all three.</p>\n\n<h4>1. It guarantees the return is finite (bounded).</h4>\n<p>Suppose rewards are bounded, $|R_t| \\le R_{\\max}$ for all $t$. For a continuing task the return is an infinite sum, but with $\\gamma < 1$ it is a convergent geometric series:</p>\n$$|G_t| = \\left| \\sum_{k=0}^{\\infty} \\gamma^{k} R_{t+k+1} \\right| \\le \\sum_{k=0}^{\\infty} \\gamma^{k} R_{\\max} = R_{\\max} \\sum_{k=0}^{\\infty} \\gamma^{k} = \\frac{R_{\\max}}{1 - \\gamma}.$$\n<p>The geometric series $\\sum_{k=0}^\\infty \\gamma^k = \\frac{1}{1-\\gamma}$ converges precisely because $|\\gamma| < 1$. If we set $\\gamma = 1$ in a never-ending task with persistently positive reward, the return would be $+\\infty$ for every policy — and \"maximize $+\\infty$\" is meaningless, since you could no longer compare policies. So <strong>$\\gamma < 1$ is what makes the optimization problem well-posed for continuing tasks.</strong> (For episodic tasks the sum is already finite, so $\\gamma = 1$ is perfectly legal there.)</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Key fact</div>\n<p>Bounded rewards plus $\\gamma < 1$ $\\Rightarrow$ returns and values are bounded by $\\frac{R_{\\max}}{1-\\gamma}$. This bound shows up constantly: it bounds value-function approximation error, sets the scale of Q-values, and explains why $\\gamma$ close to 1 (say 0.999) makes learning <em>harder</em> — the effective magnitude $\\frac{1}{1-\\gamma}$ blows up to 1000.</p>\n</div>\n\n<h4>2. It encodes how far-sighted the agent is.</h4>\n<p>A useful mental model: $\\frac{1}{1-\\gamma}$ is roughly the <strong>effective horizon</strong> — the number of future steps that meaningfully influence the current decision. With $\\gamma = 0.9$ the horizon is about 10 steps; with $\\gamma = 0.99$ it's about 100. At the extreme, $\\gamma = 0$ makes the agent <strong>myopic</strong>: $G_t = R_{t+1}$, so it greedily maximizes only the immediate reward and ignores all consequences. Choosing $\\gamma$ is therefore choosing a time scale for the problem, and it is a genuine hyperparameter with real consequences for behavior.</p>\n\n<h4>3. It expresses a preference for sooner reward.</h4>\n<p>Even when an infinite return would be finite, discounting captures the intuitive (and economically standard) idea that a reward now is worth more than the same reward later — the RL analogue of a financial interest rate or present-value calculation. This is often a feature, not just a mathematical convenience: we frequently <em>do</em> prefer goals achieved sooner.</p>\n<div data-viz=\"rl-discounting\"></div>\n\n<h3>Worked Example: A Two-State Recycling-Style MDP</h3>\n<p>Let's make all of this concrete with a small MDP and compute an actual return. Consider a robot with two states, $S = \\{\\texttt{high}, \\texttt{low}\\}$ (battery level), and actions $A = \\{\\texttt{search}, \\texttt{wait}\\}$. We'll use $\\gamma = 0.9$.</p>\n<p>Suppose searching yields reward $+3$ and (in this episode) the dynamics produce the following observed trajectory of rewards over five steps before the robot docks (a terminal state):</p>\n<pre><code>t :   0       1       2       3       4\nR :  R1=+3   R2=+3   R3=-1   R4=+3   R5=+10   (then terminal)\n</code></pre>\n<p>The return from the start of the episode, $G_0$, with $\\gamma = 0.9$, is the finite discounted sum:</p>\n$$G_0 = R_1 + \\gamma R_2 + \\gamma^2 R_3 + \\gamma^3 R_4 + \\gamma^4 R_5.$$\n<p>Plugging in (using $\\gamma^2 = 0.81,\\ \\gamma^3 = 0.729,\\ \\gamma^4 = 0.6561$):</p>\n$$G_0 = 3 + 0.9(3) + 0.81(-1) + 0.729(3) + 0.6561(10).$$\n$$G_0 = 3 + 2.7 - 0.81 + 2.187 + 6.561 = 13.638.$$\n<p>Now notice the recursion in action. The return from $t=1$ is</p>\n$$G_1 = R_2 + \\gamma R_3 + \\gamma^2 R_4 + \\gamma^3 R_5 = 3 + 0.9(-1) + 0.81(3) + 0.729(10) = 3 - 0.9 + 2.43 + 7.29 = 11.82.$$\n<p>And indeed the recursion $G_t = R_{t+1} + \\gamma G_{t+1}$ checks out:</p>\n$$G_0 = R_1 + \\gamma G_1 = 3 + 0.9 \\times 11.82 = 3 + 10.638 = 13.638. \\checkmark$$\n<p>This is exactly the computation that, in expectation, dynamic-programming and temporal-difference methods perform millions of times. The recursion lets you compute returns \"backward from the end\" of an episode in a single pass, which is how Monte Carlo return estimates are implemented in practice.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>The MDP cleanly separates three concerns that are tangled together in the informal \"agent learns to act\" story. <strong>The environment</strong> ($S, A, P$) says what is possible. <strong>The reward and discount</strong> ($R, \\gamma$) say what is desirable. And the <strong>agent's policy</strong> (next lesson) says what the agent actually does. RL is the science of finding a good policy when you don't know $P$ and $R$ in advance and must learn them — or learn to act well without ever modeling them — purely from sampled trajectories. Everything downstream, from tabular Q-learning to RLHF fine-tuning of large language models (which treats text generation as an MDP over token states), is built on this exact scaffold.</p>\n</div>\n\n<h3>Summary</h3>\n<ul>\n<li>An MDP is the tuple $(S, A, P, R, \\gamma)$: states, actions, transition dynamics, reward, and discount.</li>\n<li>The complete dynamics are captured by $p(s', r \\mid s, a)$, which is a probability distribution summing to 1 over $(s', r)$ for each $(s, a)$; you can derive $p(s'\\mid s,a)$ and $r(s,a)$ from it.</li>\n<li>The <strong>Markov property</strong> says the next state/reward depend on the past only through the current state — the state is a sufficient statistic of history. It is a property of your state design, not of the world.</li>\n<li>The agent maximizes the <strong>return</strong> $G_t = \\sum_{k \\ge 0} \\gamma^k R_{t+k+1}$, which satisfies the recursion $G_t = R_{t+1} + \\gamma G_{t+1}$.</li>\n<li><strong>Episodic</strong> tasks terminate (finite sum, $\\gamma = 1$ allowed); <strong>continuing</strong> tasks run forever, where $\\gamma < 1$ keeps returns bounded by $\\frac{R_{\\max}}{1-\\gamma}$ and sets the effective horizon $\\approx \\frac{1}{1-\\gamma}$.</li>\n</ul>\n<h4>Try it in code</h4>\n<p>The quantity an RL agent maximizes is the <em>discounted return</em> — future rewards count for less, scaled by γ each step. Run it (computed back-to-front via Horner's rule):</p>\n<div data-code=\"javascript\" data-expected=\"1.729\">// G = r0 + gamma*r1 + gamma^2*r2 + ...   gamma in (0,1) discounts the future.\nfunction discountedReturn(rewards, gamma) {\n  let G = 0;\n  for (let k = rewards.length - 1; k &gt;= 0; k--) G = rewards[k] + gamma * G;\n  return G;\n}\nconsole.log(discountedReturn([1, 0, 0, 1], 0.9).toFixed(3));   // 1 + 0.9^3 = 1.729</div>\n",
          "mcq": [
            {
              "q": "A robot's state is a single camera frame showing a ball, and the dynamics depend on the ball's velocity. Why does this representation typically violate the Markov property, and what is the standard fix?",
              "choices": [
                "It doesn't violate it; a single frame is always sufficient because it shows the current position",
                "It violates it because velocity (needed to predict the next frame) can't be inferred from one frame; stacking several recent frames restores sufficiency",
                "It violates it because the reward is missing from the state; appending the last reward fixes it",
                "It violates it because the action isn't shown in the frame; the fix is to render the chosen action into the image"
              ],
              "answer": 1,
              "explain": "The Markov property requires the state to be a sufficient statistic of history. One frame lacks velocity, so the past (previous frames) carries extra predictive information; stacking recent frames (as DQN did with 4 frames) reintroduces that information."
            },
            {
              "q": "For a continuing task with rewards bounded by $|R_t| \\le R_{\\max}$, which statement about the discount factor $\\gamma$ is correct?",
              "choices": [
                "Any $\\gamma \\ge 0$ keeps the return finite because rewards are bounded",
                "$\\gamma = 1$ is required so that distant rewards are not unfairly ignored",
                "$\\gamma < 1$ guarantees the infinite return converges, with $|G_t| \\le R_{\\max}/(1-\\gamma)$",
                "$\\gamma$ only affects which actions are optimal, never whether the return is finite"
              ],
              "answer": 2,
              "explain": "With $\\gamma < 1$ the return is a convergent geometric series bounded by $R_{\\max}\\sum_k \\gamma^k = R_{\\max}/(1-\\gamma)$. With $\\gamma = 1$ and persistent reward in a never-ending task, the sum can diverge, making the objective ill-posed."
            },
            {
              "q": "Given the reward sequence $R_1=2,\\ R_2=0,\\ R_3=-1,\\ R_4=4$ and then termination, with $\\gamma = 0.5$, what is the return $G_0$?",
              "choices": [
                "5.0",
                "2.25",
                "1.75",
                "3.5"
              ],
              "answer": 1,
              "explain": "$G_0 = 2 + 0.5(0) + 0.25(-1) + 0.125(4) = 2 + 0 - 0.25 + 0.5 = 2.25$."
            },
            {
              "q": "Which expression correctly relates $p(s' \\mid s, a)$ to the full dynamics $p(s', r \\mid s, a)$?",
              "choices": [
                "$p(s' \\mid s, a) = \\max_r p(s', r \\mid s, a)$",
                "$p(s' \\mid s, a) = \\sum_r p(s', r \\mid s, a)$",
                "$p(s' \\mid s, a) = \\sum_{s'} p(s', r \\mid s, a)$",
                "$p(s' \\mid s, a) = p(s', r \\mid s, a) \\cdot r(s,a)$"
              ],
              "answer": 1,
              "explain": "The state-transition probability is the marginal over reward, obtained by summing the joint distribution over all possible reward values $r$."
            },
            {
              "q": "The lesson claims the MDP is to RL what the i.i.d. dataset is to supervised learning. What is the intended force of this analogy?",
              "choices": [
                "It guarantees that any MDP can be converted into an equivalent supervised-learning dataset",
                "It means the MDP is the shared problem formulation that lets the field reuse algorithms and proofs, and is an assumption worth questioning when it may be violated",
                "It means MDP-based methods always outperform supervised methods on sequential data",
                "It implies reward labels are drawn i.i.d. from a fixed distribution"
              ],
              "answer": 1,
              "explain": "The lesson presents the MDP as the standard, load-bearing problem formulation analogous to i.i.d. data, explicitly noting it is just as important to question when it might be violated."
            },
            {
              "q": "According to the lesson, what fully specifies what the agent is trying to achieve in an MDP?",
              "choices": [
                "The state space $S$, since it encodes everything relevant about the world",
                "The transition dynamics $P$, since they determine which futures are reachable",
                "The reward function $R$, since reward is the entire specification of the goal",
                "The discount factor $\\gamma$, since it ranks futures against the present"
              ],
              "answer": 2,
              "explain": "The lesson states reward is the entire specification of the goal and the agent has no other notion of 'good.'"
            },
            {
              "q": "In the tuple $(S, A, P, R, \\gamma)$, which component is described as where the randomness of the environment lives?",
              "choices": [
                "The transition dynamics $P$",
                "The action space $A$",
                "The reward function $R$",
                "The discount factor $\\gamma$"
              ],
              "answer": 0,
              "explain": "The lesson defines $P$ as the probability distribution over the next state (and reward) given the current state and action, calling it where the randomness of the environment lives."
            },
            {
              "q": "The lesson mentions that available actions can sometimes depend on the state, written $A(s)$, but it chooses to keep $A$ fixed. What is the stated reason for this choice?",
              "choices": [
                "State-dependent action sets make the MDP non-Markovian",
                "Keeping $A$ fixed is done for clarity, not because state-dependence is impossible",
                "A fixed $A$ is required for the discount factor $\\gamma$ to be well defined",
                "Only fixed action sets allow rewards to be scalar"
              ],
              "answer": 1,
              "explain": "The lesson explicitly says the available actions can depend on the state as $A(s)$ but it keeps $A$ fixed 'for clarity.'"
            },
            {
              "q": "A designer encodes the state of a gridworld navigator as $s_t = (x_t, y_t)$, the current cell. The agent always reaches the goal eventually, but a colleague insists that to satisfy the Markov property the state must also include the full history of cells visited so far. Who is right, and why?",
              "choices": [
                "The colleague is right: the Markov property requires the state to record the entire past trajectory.",
                "The designer is right: the Markov property only requires that the future depend on the past *through* the current state, so if $(x_t,y_t)$ plus the action determines the next-state distribution, no history is needed.",
                "Both are wrong: the Markov property is about rewards being bounded, not about state contents.",
                "The colleague is right only if $\\gamma < 1$; for $\\gamma = 1$ history is unnecessary."
              ],
              "answer": 1,
              "explain": "The Markov property says $P(s_{t+1}\\mid s_t,a_t,\\dots,s_0,a_0)=P(s_{t+1}\\mid s_t,a_t)$ — the current state is a sufficient statistic for the future. If the cell coordinates already determine the transition distribution, appending history adds nothing; the distractor wrongly equates Markovianity with literally storing the past."
            },
            {
              "q": "Consider an MDP where the transition is deterministic: from each $(s,a)$ the environment always moves to a single fixed next state with probability 1. Which statement is true?",
              "choices": [
                "Such a system is not an MDP, because $P$ must assign probability to at least two next states.",
                "It is still an MDP; determinism is just the special case where $P(s'\\mid s,a)$ puts all its mass on one state, and the formalism handles it without modification.",
                "It is an MDP only if the reward $R$ is also deterministic.",
                "It cannot be an MDP because the Markov property requires genuine randomness in the transitions."
              ],
              "answer": 1,
              "explain": "$P(s'\\mid s,a)$ is a probability distribution, and a degenerate (point-mass) distribution is perfectly valid, so deterministic dynamics are simply a special MDP. The Markov property constrains *what* the next-state distribution may depend on, not whether it must be random."
            },
            {
              "q": "In a continuing task with $\\gamma = 0.9$, suppose every step yields exactly reward $R_t = 1$ forever. What is the return $G_0 = \\sum_{t=0}^{\\infty} \\gamma^t R_t$?",
              "choices": [
                "$\\infty$, because the rewards never stop.",
                "$0.9$",
                "$10$",
                "$1$, because only the first reward is counted."
              ],
              "answer": 2,
              "explain": "With a constant reward of 1 the return is the geometric series $\\sum_{t=0}^{\\infty}\\gamma^t = \\frac{1}{1-\\gamma} = \\frac{1}{0.1} = 10$. Discounting (with $\\gamma<1$) is exactly what keeps an infinite stream of rewards finite, so the 'infinity' answer is the misconception being tested."
            },
            {
              "q": "Two reward designs are proposed for a navigation MDP: (A) $+0$ on every step and $+1$ on reaching the goal; (B) $+10$ on every step and $+11$ on reaching the goal. Using discount $\\gamma < 1$, why might these produce different optimal policies even though each just adds a constant 10 to design (A)?",
              "choices": [
                "They cannot differ: adding a constant to all rewards never changes the optimal policy under any $\\gamma$.",
                "Because with $\\gamma < 1$ a per-step bonus of $+10$ is discounted differently depending on how many steps are taken, so design (B) effectively rewards *delaying* the goal, changing which policy is optimal.",
                "Because $R$ is not part of the MDP tuple, so changing it has no formal effect.",
                "Because the discount factor only applies to the goal reward, not to per-step rewards."
              ],
              "answer": 1,
              "explain": "Under discounting, a longer trajectory accumulates more of the per-step $+10$ (each discounted but still summing larger over many steps), so design (B) can make dawdling more valuable than reaching the goal quickly — the policy can change. The claim that adding a constant is always policy-invariant holds only for undiscounted/equal-length episodes, not here."
            },
            {
              "q": "A (finite) Markov Decision Process is defined by which components?",
              "choices": [
                "Just a dataset of (state, correct-action) pairs",
                "A single reward function and nothing else",
                "An encoder, a decoder, and a latent code",
                "A tuple $(S, A, P, R, \\gamma)$: a state space, an action space, transition dynamics, a reward function, and a discount factor"
              ],
              "answer": 3,
              "explain": "The MDP is RL's standard problem object: $S$ (situations), $A$ (choices), $P$ (how the world responds — the environment's randomness), $R$ (the goal, as a scalar signal), and $\\gamma$ (how much the future counts). Nearly every RL algorithm is a recipe for solving an MDP."
            },
            {
              "q": "What does the Markov property state?",
              "choices": [
                "Rewards are always deterministic",
                "The next state and reward depend only on the current state and action — not on the full history of how the agent got there",
                "The agent must remember its entire trajectory in order to act well",
                "Every state is visited equally often"
              ],
              "answer": 1,
              "explain": "\"Markov\" = memoryless: $\\Pr(S_{t+1},R_{t+1}\\mid S_t,A_t)$ doesn't depend on earlier states/actions. The current state is a sufficient statistic for the future — which is exactly why a good state representation must capture everything relevant (a single camera frame, lacking velocity, violates this)."
            },
            {
              "q": "What do the transition dynamics $p(s',r\\mid s,a)$ describe?",
              "choices": [
                "The agent's policy for choosing actions",
                "The discounted sum of future rewards",
                "The probability of landing in next-state $s'$ with reward $r$, given the agent took action $a$ in state $s$ — where the environment's randomness lives",
                "The fixed reward for reaching the goal state"
              ],
              "answer": 2,
              "explain": "$p(s',r\\mid s,a)$ is the single most complete description of the environment: a proper distribution (it sums to 1 over all $s',r$ for each $s,a$). From it you can derive the state-transition probabilities $p(s'\\mid s,a)$ and the expected reward $r(s,a)$."
            },
            {
              "q": "In an MDP, which component specifies <em>what</em> the agent is trying to achieve?",
              "choices": [
                "The reward function $R$ — it is the entire specification of the goal; the agent has no other notion of \"good\"",
                "The state space $S$",
                "The discount factor $\\gamma$",
                "The transition dynamics $P$"
              ],
              "answer": 0,
              "explain": "In RL the goal lives <i>entirely</i> in the reward. The agent maximizes expected cumulative reward and has no separate objective — which is why reward design (and its pitfalls, like reward hacking) is so consequential."
            }
          ],
          "flashcards": [
            {
              "front": "What are the five components of an MDP tuple $(S, A, P, R, \\gamma)$?",
              "back": "States $S$, actions $A$, transition dynamics $P$ (i.e. $p(s',r\\mid s,a)$), reward function $R$, and discount factor $\\gamma \\in [0,1]$."
            },
            {
              "front": "State the Markov property in words.",
              "back": "The next state and reward depend on the past only through the current state (and action): the state is a sufficient statistic of the entire history. $\\Pr\\{S_{t+1},R_{t+1}\\mid S_t,A_t\\}$ equals the same conditioned on the full history."
            },
            {
              "front": "Define the discounted return $G_t$ and its recursion.",
              "back": "$G_t = \\sum_{k=0}^{\\infty} \\gamma^k R_{t+k+1}$, which satisfies $G_t = R_{t+1} + \\gamma G_{t+1}$."
            },
            {
              "front": "Why does $\\gamma < 1$ ensure bounded returns in a continuing task?",
              "back": "With $|R_t|\\le R_{\\max}$, the return is a convergent geometric series: $|G_t| \\le R_{\\max}\\sum_{k=0}^\\infty \\gamma^k = R_{\\max}/(1-\\gamma)$. $\\gamma=1$ could give an infinite, ill-defined return."
            },
            {
              "front": "How do you get $p(s'\\mid s,a)$ and $r(s,a)$ from $p(s',r\\mid s,a)$?",
              "back": "$p(s'\\mid s,a)=\\sum_r p(s',r\\mid s,a)$ (marginalize reward); $r(s,a)=\\sum_r r\\sum_{s'} p(s',r\\mid s,a)$ (expected reward)."
            },
            {
              "front": "Episodic vs. continuing tasks?",
              "back": "Episodic: interaction ends at a terminal state after random step $T$; return is a finite sum and $\\gamma=1$ is allowed. Continuing: $T=\\infty$, no natural end; $\\gamma<1$ needed to keep returns bounded. Effective horizon $\\approx 1/(1-\\gamma)$."
            }
          ],
          "homework": [
            {
              "prompt": "Consider a 3x1 gridworld with cells laid out left-to-right as A, B, G. The agent starts in A. Actions are $\\{\\texttt{left}, \\texttt{right}\\}$ and movement is deterministic; trying to move off the grid leaves the agent in place. Cell G is a terminal goal. Reaching G gives reward $+10$; every other transition gives reward $-1$. Write out the full MDP tuple $(S, A, P, R, \\gamma)$ for this environment, specifying the transition dynamics and rewards explicitly. Use $\\gamma = 0.9$.",
              "hint": "List $S$ and $A$ as sets. For $P$, enumerate the deterministic next state for each (state, action) pair, remembering that off-grid moves stay put and G is absorbing. For $R$, state the reward attached to each transition.",
              "solution": "States: $S = \\{A, B, G\\}$ with $G$ terminal (absorbing). Actions: $A = \\{\\texttt{left}, \\texttt{right}\\}$. Discount: $\\gamma = 0.9$.\\n\\nTransition dynamics $p(s'\\mid s,a)$ (all deterministic, so each is 1 for the listed next state):\\n- From A: left -> A (off-grid, stays); right -> B.\\n- From B: left -> A; right -> G.\\n- From G (terminal/absorbing): left -> G; right -> G (loops with reward 0).\\n\\nReward function $r(s,a,s')$:\\n- Any transition that lands in G gives $+10$: i.e. (B, right -> G) = +10.\\n- Every other non-terminal transition gives $-1$: (A,left->A), (A,right->B), (B,left->A) all = -1.\\n- Self-loops at terminal G give 0.\\n\\nThus the full joint $p(s',r\\mid s,a)$ places probability 1 on the (next-state, reward) pairs above. The optimal behavior is clearly right, right: from A, $G_0 = -1 + 0.9(10) = 8.0$."
            },
            {
              "prompt": "A continuing task has $\\gamma = 0.95$ and bounded rewards with $R_{\\max} = 2$. (a) Give a tight upper bound on $|G_t|$. (b) Roughly how many future steps form the 'effective horizon'? (c) If every reward is exactly $+2$ forever, compute the exact return $G_t$.",
              "hint": "Use the geometric-series bound $R_{\\max}/(1-\\gamma)$, the effective-horizon rule of thumb $1/(1-\\gamma)$, and recall $\\sum_{k=0}^\\infty \\gamma^k = 1/(1-\\gamma)$ for the constant-reward case.",
              "solution": "(a) $|G_t| \\le R_{\\max}/(1-\\gamma) = 2/(1-0.95) = 2/0.05 = 40$. (b) Effective horizon $\\approx 1/(1-\\gamma) = 1/0.05 = 20$ steps. (c) With $R_{t+k+1} = 2$ for all $k$: $G_t = \\sum_{k=0}^\\infty \\gamma^k \\cdot 2 = 2 \\cdot \\frac{1}{1-0.95} = 2 \\cdot 20 = 40$. Note this equals the bound exactly, which makes sense: a constant maximal reward stream is the worst case that saturates the inequality."
            },
            {
              "prompt": "You observe the reward sequence $R_1 = 1,\\ R_2 = 2,\\ R_3 = 3$ with $\\gamma = 0.5$, after which the episode terminates. Compute $G_2$, $G_1$, and $G_0$ directly from the definition, and then verify the recursion $G_t = R_{t+1} + \\gamma G_{t+1}$ holds for $t = 0$ and $t = 1$.",
              "hint": "Compute backward from the last step: $G_2$ involves only $R_3$, then build $G_1$ and $G_0$ using the recursion or the direct sum.",
              "solution": "Direct: $G_2 = R_3 = 3$. $G_1 = R_2 + \\gamma R_3 = 2 + 0.5(3) = 3.5$. $G_0 = R_1 + \\gamma R_2 + \\gamma^2 R_3 = 1 + 0.5(2) + 0.25(3) = 1 + 1 + 0.75 = 2.75$.\\n\\nVerify recursion: For $t=1$: $R_2 + \\gamma G_2 = 2 + 0.5(3) = 3.5 = G_1$. ✓ For $t=0$: $R_1 + \\gamma G_1 = 1 + 0.5(3.5) = 1 + 1.75 = 2.75 = G_0$. ✓ Both match, confirming $G_t = R_{t+1} + \\gamma G_{t+1}$."
            }
          ],
          "examples": [
            {
              "title": "Modeling a Two-State Recycling Robot as an MDP",
              "body": "A recycling robot's battery is either $\\texttt{high}$ or $\\texttt{low}$, so $S = \\{\\texttt{high}, \\texttt{low}\\}$. In each state it may $\\texttt{search}$ (collect cans) or $\\texttt{wait}$, so $A = \\{\\texttt{search}, \\texttt{wait}\\}$. Searching from $\\texttt{high}$ keeps the battery $\\texttt{high}$ with probability $0.8$ (else drops to $\\texttt{low}$) and yields reward $+3$; waiting in any state keeps the battery unchanged and yields reward $+1$. Searching from $\\texttt{low}$ keeps it $\\texttt{low}$ with probability $0.5$ and otherwise depletes it, forcing a rescue that returns the battery to $\\texttt{high}$ with reward $-3$. With $\\gamma = 0.9$, write down $P$ and $R$ explicitly and identify how many deterministic policies this MDP admits.",
              "solution": "We must specify, for every $(s,a)$ pair, the transition distribution $P(s' \\mid s, a)$ over next states and the expected reward $R(s,a)$.\n\n<strong>Step 1 — Enumerate the four state-action pairs.</strong> Since $|S| = 2$ and $|A| = 2$, there are $2 \\times 2 = 4$ pairs: $(\\texttt{high}, \\texttt{search})$, $(\\texttt{high}, \\texttt{wait})$, $(\\texttt{low}, \\texttt{search})$, $(\\texttt{low}, \\texttt{wait})$.\n\n<strong>Step 2 — Write the transition function $P$.</strong> Each row must be a probability distribution that sums to $1$.\n$$P(\\cdot \\mid \\texttt{high}, \\texttt{search}) = \\begin{cases} \\texttt{high} & 0.8 \\\\ \\texttt{low} & 0.2 \\end{cases} \\qquad P(\\cdot \\mid \\texttt{high}, \\texttt{wait}) = \\begin{cases} \\texttt{high} & 1.0 \\\\ \\texttt{low} & 0.0 \\end{cases}$$\n$$P(\\cdot \\mid \\texttt{low}, \\texttt{search}) = \\begin{cases} \\texttt{low} & 0.5 \\\\ \\texttt{high} & 0.5 \\end{cases} \\qquad P(\\cdot \\mid \\texttt{low}, \\texttt{wait}) = \\begin{cases} \\texttt{low} & 1.0 \\\\ \\texttt{high} & 0.0 \\end{cases}$$\nNote the rescue: searching from $\\texttt{low}$ depletes the battery with probability $0.5$, and after a rescue the robot is recharged to $\\texttt{high}$, which is why that mass lands on $\\texttt{high}$.\n\n<strong>Step 3 — Write the reward function $R$.</strong> Here rewards are fixed per action (not random given the action), so $R(s,a)$ is just that value:\n$$R(\\texttt{high}, \\texttt{search}) = +3, \\quad R(\\texttt{high}, \\texttt{wait}) = +1,$$\n$$R(\\texttt{low}, \\texttt{search}) = -3, \\quad R(\\texttt{low}, \\texttt{wait}) = +1.$$\n\n<strong>Step 4 — Verify the tuple is well-formed.</strong> Each transition row sums to $1$ ($0.8+0.2$, $1.0+0.0$, $0.5+0.5$, $1.0+0.0$), $\\gamma = 0.9 \\in [0,1)$, and every $(s,a)$ has a defined reward. So $(S, A, P, R, \\gamma)$ is a valid finite MDP.\n\n<strong>Step 5 — Count deterministic policies.</strong> A deterministic policy $\\pi: S \\to A$ chooses one action in each of the $2$ states, with $2$ choices each:\n$$\\#\\{\\text{deterministic policies}\\} = |A|^{|S|} = 2^2 = 4.$$\nThey are: (search, search), (search, wait), (wait, search), (wait, wait), reading the entries as $(\\pi(\\texttt{high}), \\pi(\\texttt{low}))$.\n\n<strong>Answer:</strong> $P$ and $R$ are the four rows above; the MDP admits $\\boxed{4}$ deterministic policies."
            },
            {
              "title": "Computing a Discounted Return from a Trajectory",
              "body": "An agent runs in an MDP with $\\gamma = 0.5$ and produces the trajectory $s_0, a_0, r_1, s_1, a_1, r_2, s_2, \\dots$ with the reward sequence $r_1, r_2, r_3, r_4, \\dots = 2, 0, -4, 0, 0, 0, \\dots$ (all rewards from $r_5$ onward are $0$). Compute the discounted return $G_0$ from time $0$, and also $G_2$ (the return measured from time step $2$), and verify they satisfy the recursive relation $G_t = r_{t+1} + \\gamma G_{t+1}$.",
              "solution": "The discounted return is defined as $G_t = \\sum_{k=0}^{\\infty} \\gamma^k\\, r_{t+k+1}$, i.e. each future reward is weighted by $\\gamma$ raised to the number of steps you wait for it.\n\n<strong>Step 1 — Identify the discount weights.</strong> With $\\gamma = 0.5$ the powers are $\\gamma^0 = 1,\\ \\gamma^1 = 0.5,\\ \\gamma^2 = 0.25,\\ \\gamma^3 = 0.125, \\dots$ Each weight halves the previous one.\n\n<strong>Step 2 — Compute $G_0$.</strong> From $t=0$ the relevant rewards are $r_1=2, r_2=0, r_3=-4, r_4=0$, and zero afterward:\n$$G_0 = \\gamma^0 r_1 + \\gamma^1 r_2 + \\gamma^2 r_3 + \\gamma^3 r_4 + \\cdots$$\n$$G_0 = (1)(2) + (0.5)(0) + (0.25)(-4) + (0.125)(0) = 2 + 0 - 1 + 0 = 1.$$\nSo $G_0 = 1$. Notice the large reward $-4$ at step $3$ is discounted to $-1$ because it is two steps in the future.\n\n<strong>Step 3 — Compute $G_2$.</strong> Measuring from $t=2$, the future rewards are $r_3 = -4, r_4 = 0, r_5 = 0, \\dots$ The clock restarts, so $r_3$ now gets weight $\\gamma^0 = 1$:\n$$G_2 = \\gamma^0 r_3 + \\gamma^1 r_4 + \\cdots = (1)(-4) + (0.5)(0) + \\cdots = -4.$$\nSo $G_2 = -4$. The same reward is weighted differently depending on which time step you measure from — this is the key subtlety.\n\n<strong>Step 4 — Verify the recursion $G_t = r_{t+1} + \\gamma G_{t+1}$.</strong> We need $G_1$ first. From $t=1$ the rewards are $r_2=0, r_3=-4, r_4=0,\\dots$:\n$$G_1 = (1)(0) + (0.5)(-4) + (0.25)(0) + \\cdots = -2.$$\nNow check the recursion at $t=0$ and $t=1$:\n$$r_1 + \\gamma G_1 = 2 + (0.5)(-2) = 2 - 1 = 1 = G_0. \\checkmark$$\n$$r_2 + \\gamma G_2 = 0 + (0.5)(-4) = -2 = G_1. \\checkmark$$\nBoth identities hold, confirming our values are mutually consistent. This recursion is exactly the seed of the Bellman equation.\n\n<strong>Answer:</strong> $G_0 = 1$, $G_2 = -4$ (and $G_1 = -2$), and they satisfy $G_t = r_{t+1} + \\gamma G_{t+1}$."
            }
          ]
        },
        {
          "id": "rl-policies-values",
          "title": "Policies, Value Functions, and Bellman Equations",
          "minutes": 18,
          "content": "<h3>From Goals to Behavior: Why We Need Value Functions</h3>\n<p>In the previous lesson we set up the Markov Decision Process (MDP): a tuple $(\\mathcal{S}, \\mathcal{A}, p, r, \\gamma)$ describing states, actions, transition dynamics, rewards, and a discount factor. We said the agent's objective is to maximize the expected discounted <strong>return</strong>:</p>\n$$G_t = R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\cdots = \\sum_{k=0}^{\\infty} \\gamma^k R_{t+k+1}.$$\n<p>But \"maximize the return\" is an objective, not an algorithm. To actually compute good behavior we need three objects: a way to describe behavior (the <strong>policy</strong>), a way to score states and actions under that behavior (the <strong>value functions</strong>), and a set of self-consistency equations that let us compute those scores (the <strong>Bellman equations</strong>). This lesson builds all three and shows how they snap together into the central result of dynamic programming for RL.</p>\n\n<h3>Policies: How the Agent Acts</h3>\n<p>A <strong>policy</strong> $\\pi$ is a mapping from states to a distribution over actions. We write</p>\n$$\\pi(a \\mid s) = \\Pr(A_t = a \\mid S_t = s),$$\n<p>the probability of taking action $a$ when in state $s$. A policy is the agent's entire \"strategy\" — it fully specifies its behavior. Two important remarks:</p>\n<ul>\n<li>A <strong>deterministic</strong> policy is the special case where $\\pi(\\cdot \\mid s)$ puts all its mass on one action; we then abuse notation and write $a = \\pi(s)$.</li>\n<li>Because the environment is Markov, the policy only needs to depend on the <em>current</em> state, not the full history. The current state is a sufficient statistic for the future. This is exactly why getting the state representation right matters so much in applied RL — if your state hides relevant information, no Markov policy can be optimal.</li>\n</ul>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Think of the policy as the \"actor\" and the value function (next) as the \"critic.\" The policy says what to do; the value function says how good it was to be where you are. Almost every modern RL algorithm — from policy gradients to actor-critic to AlphaZero — is some dance between improving the policy and re-estimating value under that policy.</p>\n</div>\n\n<h3>The State-Value Function $v_\\pi$</h3>\n<p>Fix a policy $\\pi$. The <strong>state-value function</strong> $v_\\pi(s)$ is the expected return when you start in state $s$ and then follow $\\pi$ forever:</p>\n$$v_\\pi(s) \\;=\\; \\mathbb{E}_\\pi\\!\\left[\\,G_t \\mid S_t = s\\,\\right] \\;=\\; \\mathbb{E}_\\pi\\!\\left[\\sum_{k=0}^{\\infty}\\gamma^k R_{t+k+1} \\;\\middle|\\; S_t = s\\right].$$\n<p>The subscript $\\pi$ on the expectation means: the actions $A_{t}, A_{t+1}, \\dots$ are drawn from $\\pi$, and the states evolve according to $p$. So $v_\\pi(s)$ answers: \"Starting here and behaving this way, how much reward do I expect to accumulate?\"</p>\n\n<h3>The Action-Value Function $q_\\pi$</h3>\n<p>The <strong>action-value function</strong> (or <strong>Q-function</strong>) $q_\\pi(s,a)$ is the expected return when you start in state $s$, take action $a$ <em>right now</em> (even if $\\pi$ wouldn't have chosen it), and follow $\\pi$ thereafter:</p>\n$$q_\\pi(s,a) \\;=\\; \\mathbb{E}_\\pi\\!\\left[\\,G_t \\mid S_t = s,\\, A_t = a\\,\\right].$$\n<p>The distinction is subtle but crucial. $v_\\pi$ commits to the policy from the very first step; $q_\\pi$ lets you \"probe\" an arbitrary first action and then defer to the policy. This is precisely what makes $q$ so useful for <em>control</em>: it lets you compare actions in a state without a model of the environment, which is the foundation of Q-learning and SARSA.</p>\n\n<h4>The two-way relationship between $v_\\pi$ and $q_\\pi$</h4>\n<p>The value functions are tied together by two identities you should be able to reproduce on demand.</p>\n<p><strong>(1) $v$ from $q$ — average over the policy.</strong> The value of a state is the policy-weighted average of the action-values available there:</p>\n$$v_\\pi(s) \\;=\\; \\sum_{a} \\pi(a \\mid s)\\, q_\\pi(s,a) \\;=\\; \\mathbb{E}_{a\\sim\\pi(\\cdot\\mid s)}\\big[q_\\pi(s,a)\\big].$$\n<p><strong>(2) $q$ from $v$ — one step of reward plus discounted next-state value.</strong> Taking action $a$ yields an immediate expected reward plus the discounted value of wherever you land:</p>\n$$q_\\pi(s,a) \\;=\\; \\underbrace{\\sum_{s', r} p(s', r \\mid s, a)\\,\\big[\\,r + \\gamma\\, v_\\pi(s')\\,\\big]}_{\\text{average over next reward and next state}} \\;=\\; r(s,a) + \\gamma\\sum_{s'} p(s'\\mid s,a)\\, v_\\pi(s'),$$\n<p>where $r(s,a)=\\mathbb{E}[R_{t+1}\\mid s,a]$ is the expected immediate reward. Notice these two equations refer to each other. Substitute one into the other and the recursion closes — that substitution <em>is</em> the Bellman equation.</p>\n\n<h3>The Bellman Expectation Equations</h3>\n<p>The defining trick of RL is that the return is recursive: $G_t = R_{t+1} + \\gamma G_{t+1}$. Taking expectations under $\\pi$ turns this into a self-consistency condition on the value function. Substituting (1) into (2) (and vice versa) gives the <strong>Bellman expectation equations</strong>.</p>\n\n<h4>Bellman expectation equation for $v_\\pi$</h4>\n$$\\boxed{\\,v_\\pi(s) \\;=\\; \\sum_{a} \\pi(a\\mid s) \\sum_{s', r} p(s', r \\mid s, a)\\,\\big[\\,r + \\gamma\\, v_\\pi(s')\\,\\big].}$$\n<p>Read it left to right: from $s$, choose an action $a$ with probability $\\pi(a\\mid s)$; the environment returns reward $r$ and next state $s'$ with probability $p(s',r\\mid s,a)$; you collect $r$ now and the discounted value $\\gamma v_\\pi(s')$ of the future. Average over everything random.</p>\n\n<h4>Bellman expectation equation for $q_\\pi$</h4>\n$$\\boxed{\\,q_\\pi(s,a) \\;=\\; \\sum_{s', r} p(s', r \\mid s, a)\\,\\Big[\\,r + \\gamma \\sum_{a'} \\pi(a'\\mid s')\\, q_\\pi(s',a')\\,\\Big].}$$\n<p>Same logic, but now we fix the first action and then average the next action under $\\pi$.</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>For a finite MDP with $n$ states, the Bellman expectation equation for $v_\\pi$ is a system of $n$ <em>linear</em> equations in $n$ unknowns. In matrix form $\\mathbf{v}_\\pi = \\mathbf{r}_\\pi + \\gamma P_\\pi \\mathbf{v}_\\pi$, whose closed-form solution is $\\mathbf{v}_\\pi = (I - \\gamma P_\\pi)^{-1}\\mathbf{r}_\\pi$. The matrix $I-\\gamma P_\\pi$ is invertible whenever $\\gamma<1$. This is \"policy evaluation,\" the inner loop of policy iteration, and the thing that temporal-difference learning approximates from samples without ever knowing $P_\\pi$.</p>\n</div>\n\n<h3>Optimality: $v_*$, $q_*$, and the Optimal Policy</h3>\n<p>Evaluating a fixed policy is useful, but the real goal is to find the <em>best</em> policy. Define a partial order on policies: $\\pi \\ge \\pi'$ iff $v_\\pi(s) \\ge v_{\\pi'}(s)$ for <em>all</em> states $s$. A foundational theorem of MDPs says there always exists at least one <strong>optimal policy</strong> $\\pi_*$ that is $\\ge$ every other policy. (There can be ties, but they all share the same value functions.) The corresponding optimal value functions are</p>\n$$v_*(s) = \\max_\\pi v_\\pi(s), \\qquad q_*(s,a) = \\max_\\pi q_\\pi(s,a).$$\n<p>These are the best achievable values from each state, and each state-action pair, respectively. They are linked exactly as before but with a crucial change in the outer operation:</p>\n$$v_*(s) = \\max_{a} q_*(s,a), \\qquad q_*(s,a) = r(s,a) + \\gamma \\sum_{s'} p(s'\\mid s,a)\\, v_*(s').$$\n<p>The averaging-over-the-policy $\\sum_a \\pi(a\\mid s)(\\cdot)$ has become a $\\max_a(\\cdot)$. Intuitively: an optimal agent does not randomize over mediocre actions — at each state it simply picks the action with the highest action-value.</p>\n\n<h4>The Bellman optimality equations</h4>\n<p>Substituting these two relations into each other yields the <strong>Bellman optimality equations</strong>, the cornerstone of value-based RL.</p>\n<p><strong>For $v_*$:</strong></p>\n$$\\boxed{\\,v_*(s) \\;=\\; \\max_{a}\\, \\sum_{s', r} p(s', r \\mid s, a)\\,\\big[\\,r + \\gamma\\, v_*(s')\\,\\big].}$$\n<p><strong>For $q_*$:</strong></p>\n$$\\boxed{\\,q_*(s,a) \\;=\\; \\sum_{s', r} p(s', r \\mid s, a)\\,\\Big[\\,r + \\gamma \\max_{a'} q_*(s',a')\\,\\Big].}$$\n<p>These differ from the expectation equations in exactly one place — a $\\max$ where there used to be a policy-weighted sum. That single nonlinearity is what makes them <em>nonlinear</em> (no closed-form matrix inverse) but also what encodes optimal decision-making. They are solved by iterative methods: value iteration, Q-learning, and their deep-network descendants (DQN minimizes the squared Bellman optimality residual).</p>\n\n<h4>From $q_*$ to the optimal policy</h4>\n<p>Here is the payoff. Once you know $q_*$, the optimal policy is trivially read off — be <strong>greedy</strong> with respect to $q_*$:</p>\n$$\\pi_*(s) \\;=\\; \\arg\\max_{a}\\, q_*(s,a).$$\n<p>No model, no search, no planning: just look up the action with the largest $q_*$ value in the current state. This is the deep reason the action-value function is so prized in control: $q_*$ <em>directly encodes</em> the optimal policy. By contrast, extracting a policy from $v_*$ requires the model $p$ to do a one-step look-ahead, $\\pi_*(s) = \\arg\\max_a \\sum_{s',r} p(s',r\\mid s,a)[r+\\gamma v_*(s')]$.</p>\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>The whole field bifurcates along these equations. The Bellman <em>expectation</em> equations power <strong>prediction</strong> (estimating value of a fixed policy) and the policy-evaluation half of actor-critic. The Bellman <em>optimality</em> equations power <strong>control</strong> (finding the best policy) via value/Q iteration and DQN. Both are instances of the same fixed-point structure $v = T v$ where the Bellman operator $T$ is a $\\gamma$-contraction in the max-norm — which is exactly why these iterative methods provably converge to a unique solution. The contraction property is the mathematical engine under almost all of dynamic-programming-based RL.</p>\n</div>\n\n<h3>Worked Example: A 2-State MDP</h3>\n<p>Let's compute everything concretely. Consider two states, $\\mathcal{S}=\\{A, B\\}$, with $\\gamma = 0.9$. From each state there are two actions, <code>stay</code> and <code>go</code>, with deterministic transitions and rewards:</p>\n<pre><code>State A:\n  stay -> A, reward +1\n  go   -> B, reward 0\nState B:\n  stay -> B, reward +2\n  go   -> A, reward 0</code></pre>\n\n<h4>Step 1: Evaluate a fixed policy</h4>\n<p>Take the uniform random policy $\\pi(\\text{stay}\\mid s)=\\pi(\\text{go}\\mid s)=0.5$ in both states. The Bellman expectation equations give a $2\\times 2$ linear system:</p>\n$$v_\\pi(A) = 0.5\\,[1 + 0.9\\,v_\\pi(A)] + 0.5\\,[0 + 0.9\\,v_\\pi(B)],$$\n$$v_\\pi(B) = 0.5\\,[2 + 0.9\\,v_\\pi(B)] + 0.5\\,[0 + 0.9\\,v_\\pi(A)].$$\n<p>Simplify each. For $A$: $v_\\pi(A) = 0.5 + 0.45\\,v_\\pi(A) + 0.45\\,v_\\pi(B)$, i.e. $0.55\\,v_\\pi(A) - 0.45\\,v_\\pi(B) = 0.5$. For $B$: $v_\\pi(B) = 1 + 0.45\\,v_\\pi(B) + 0.45\\,v_\\pi(A)$, i.e. $-0.45\\,v_\\pi(A) + 0.55\\,v_\\pi(B) = 1$. Adding the two equations: $0.1\\,v_\\pi(A) + 0.1\\,v_\\pi(B) = 1.5$, so $v_\\pi(A)+v_\\pi(B)=15$. Subtracting the first from the second: $v_\\pi(B) - v_\\pi(A) = 0.5$. Let's also solve directly to pin down each value. From the sum, $v_\\pi(B)=15-v_\\pi(A)$. Substitute into $0.55\\,v_\\pi(A) - 0.45(15 - v_\\pi(A)) = 0.5$: $0.55\\,v_\\pi(A) - 6.75 + 0.45\\,v_\\pi(A) = 0.5$, so $v_\\pi(A) = 7.25$ and $v_\\pi(B) = 7.75$. (These also satisfy $v_\\pi(B)-v_\\pi(A)=0.5$, as the subtraction predicted.)</p>\n<p>So under the random policy, $v_\\pi(A)=7.25$ and $v_\\pi(B)=7.75$. Sanity check: $B$ is worth more, as expected — its <code>stay</code> reward is larger.</p>\n\n<h4>Step 2: Compute the optimal values and policy</h4>\n<p>Now solve the Bellman optimality equation. Intuitively the best plan is \"always <code>stay</code> in B (collect +2 forever); from A, get to B.\" Let's verify by guessing $\\pi_*(A)=\\text{go}$, $\\pi_*(B)=\\text{stay}$ and checking consistency, then confirming with the max.</p>\n$$v_*(B) = \\max\\big\\{\\underbrace{2 + 0.9\\,v_*(B)}_{\\text{stay}},\\; \\underbrace{0 + 0.9\\,v_*(A)}_{\\text{go}}\\big\\},\\qquad v_*(A) = \\max\\big\\{\\underbrace{1 + 0.9\\,v_*(A)}_{\\text{stay}},\\; \\underbrace{0 + 0.9\\,v_*(B)}_{\\text{go}}\\big\\}.$$\n<p>Assume the bracketed first option wins in B and the second option wins in A (our guessed optimal actions). Then $v_*(B) = 2 + 0.9\\,v_*(B) \\Rightarrow v_*(B) = 20$. And $v_*(A) = 0.9\\,v_*(B) = 18$ (taking <code>go</code>). Check the maxes hold: in B, <code>stay</code> gives $2 + 0.9(20)=20$ vs <code>go</code> gives $0.9(18)=16.2$ — yes, <code>stay</code> wins. In A, <code>go</code> gives $0.9(20)=18$ vs <code>stay</code> gives $1+0.9(18)=17.2$ — yes, <code>go</code> wins (by a slim 0.8 margin, the kind of thing intuition can miss). Consistent.</p>\n<p>So $v_*(A)=18$, $v_*(B)=20$, and the optimal action-values in each state are:</p>\n<pre><code>q*(A, stay) = 17.2    q*(A, go) = 18.0   -> pi*(A) = go\nq*(B, stay) = 20.0    q*(B, go) = 16.2   -> pi*(B) = stay</code></pre>\n<p>Reading the greedy policy off $q_*$: $\\pi_*(A)=\\text{go}$, $\\pi_*(B)=\\text{stay}$. And notice $v_*(s) > v_\\pi(s)$ in both states (18 vs 7.25, 20 vs 7.75) — the optimal policy dominates the random one everywhere, exactly as the theory promises.</p>\n\n<h3>Summary</h3>\n<ul>\n<li><strong>Policy</strong> $\\pi(a\\mid s)$: a distribution over actions per state; the agent's behavior.</li>\n<li><strong>State-value</strong> $v_\\pi(s)=\\mathbb{E}_\\pi[G_t\\mid S_t=s]$ and <strong>action-value</strong> $q_\\pi(s,a)=\\mathbb{E}_\\pi[G_t\\mid S_t=s, A_t=a]$ score states and state-action pairs under $\\pi$.</li>\n<li>They interlock via $v_\\pi(s)=\\sum_a \\pi(a\\mid s)\\,q_\\pi(s,a)$ and $q_\\pi(s,a)=r(s,a)+\\gamma\\sum_{s'}p(s'\\mid s,a)\\,v_\\pi(s')$.</li>\n<li><strong>Bellman expectation</strong> equations (linear, solvable in closed form) evaluate a fixed policy.</li>\n<li><strong>Bellman optimality</strong> equations (nonlinear, with a $\\max$) define $v_*$ and $q_*$; the optimal policy is greedy w.r.t. $q_*$: $\\pi_*(s)=\\arg\\max_a q_*(s,a)$.</li>\n</ul>\n<p>Next we'll turn these equations into algorithms: policy iteration and value iteration, which solve the Bellman optimality equation by repeated application of the Bellman operator.</p>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"rl-gridworld\"></div>\n<h3>Code it: the discounted return</h3>\n<p>The return is just a weighted sum — so sum it. Run this, then push <code>gamma</code> toward 1 (far-sighted) or down toward 0 (myopic) and watch G change; notice the forward and backward (recursive) forms always agree.</p>\n<div data-code=\"javascript\" data-expected=\"Return G   = 3.8593\nBackward G = 3.8593\">// The return is the discounted sum of future rewards:  G = Σ γᵗ · rₜ\nconst rewards = [1, 0, 2, -1, 3];   // reward received at each step t = 0,1,2,…\nconst gamma   = 0.9;                 // discount factor: 0 = myopic, →1 = far-sighted\n\n// Forward: weight each reward by γ raised to its time step.\nlet G = 0, discount = 1;\nfor (let t = 0; t &lt; rewards.length; t++) { G += discount * rewards[t]; discount *= gamma; }\nconsole.log(\"Return G   = \" + G.toFixed(4));\n\n// Backward: the recursive form  Gₜ = rₜ + γ·Gₜ₊₁  (the seed of every Bellman equation).\nlet g = 0;\nfor (let t = rewards.length - 1; t &gt;= 0; t--) g = rewards[t] + gamma * g;\nconsole.log(\"Backward G = \" + g.toFixed(4));   // identical — two views of one number</div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the Bellman equation is a <em>fixed point</em> — and that is why the algorithms converge</summary>\n<p>The Bellman equation $V^\\pi(s) = \\mathbb{E}\\!\\left[r + \\gamma V^\\pi(s') \\mid s\\right]$ looks like a definition, but it is really a <strong>self-consistency condition</strong>: the value of where you are must equal the reward you collect now plus the discounted value of where you land. Read it as an operator — the Bellman operator $T^\\pi$ — that takes a guess $V$ and returns a sharper one:</p>\n$$(T^\\pi V)(s) = \\mathbb{E}\\!\\left[r + \\gamma V(s') \\mid s\\right].$$\n<p>The true value $V^\\pi$ is precisely the <em>fixed point</em> $V = T^\\pi V$. What makes this usable is that $T^\\pi$ is a <strong>$\\gamma$-contraction</strong> in the max norm: for any two guesses, $\\lVert T^\\pi V - T^\\pi U\\rVert_\\infty \\le \\gamma\\,\\lVert V - U\\rVert_\\infty$. Since $\\gamma < 1$, each application shrinks the error by at least a factor $\\gamma$, so by the Banach fixed-point theorem the solution is <em>unique</em> and the iteration $V \\leftarrow T^\\pi V$ converges to it <em>from any starting guess</em>. That one fact is the engine under policy evaluation, value iteration, and (approximately) every TD method — and it is why the discount isn't mere modeling taste: $\\gamma < 1$ is what guarantees the whole enterprise converges at all.</p>\n</details>",
          "mcq": [
            {
              "q": "What is the precise difference between $v_\\pi(s)$ and $q_\\pi(s,a)$?",
              "choices": [
                "$v_\\pi$ uses discounting but $q_\\pi$ does not",
                "$q_\\pi$ fixes an arbitrary first action $a$ and follows $\\pi$ afterward, while $v_\\pi$ follows $\\pi$ from the very first step",
                "$v_\\pi$ is for deterministic policies and $q_\\pi$ is for stochastic policies",
                "$q_\\pi$ is always larger than $v_\\pi$ in every state"
              ],
              "answer": 1,
              "explain": "Both use the same return and discounting; the only difference is that $q_\\pi(s,a)$ commits to taking $a$ first (possibly off-policy) then follows $\\pi$, whereas $v_\\pi$ follows $\\pi$ immediately. Indeed $v_\\pi(s)=\\sum_a\\pi(a\\mid s)q_\\pi(s,a)$."
            },
            {
              "q": "How do the Bellman optimality equations differ structurally from the Bellman expectation equations?",
              "choices": [
                "They drop the discount factor $\\gamma$",
                "They replace the immediate reward $r$ with the return $G_t$",
                "They replace the policy-weighted sum $\\sum_a \\pi(a\\mid s)(\\cdot)$ over actions with a $\\max_a(\\cdot)$",
                "They add an extra expectation over the policy at the next state"
              ],
              "answer": 2,
              "explain": "The expectation equations average action-values under the policy; the optimality equations take the maximum over actions. That single change makes them nonlinear and encodes optimal (greedy) decision-making."
            },
            {
              "q": "Given the optimal action-value function $q_*$, how do you obtain an optimal policy, and why is this convenient?",
              "choices": [
                "Act greedily, $\\pi_*(s)=\\arg\\max_a q_*(s,a)$; no model of the dynamics is required",
                "Solve $(I-\\gamma P_\\pi)^{-1}\\mathbf{r}_\\pi$ for each candidate policy",
                "Take $\\pi_*(s)=\\arg\\max_a \\sum_{s',r}p(s',r\\mid s,a)[r+\\gamma v_*(s')]$, which needs the model $p$",
                "Average $q_*$ over all actions and pick the state with the highest average"
              ],
              "answer": 0,
              "explain": "The optimal policy is greedy with respect to $q_*$, requiring only a lookup over actions in the current state. Extracting a policy from $v_*$ (option 3) is also valid but needs the transition model for a one-step look-ahead."
            },
            {
              "q": "For a finite MDP with $\\gamma<1$, why does the Bellman expectation equation for $v_\\pi$ have a unique closed-form solution while the Bellman optimality equation generally does not?",
              "choices": [
                "The optimality equation has more unknowns than equations",
                "The expectation equation is linear ($\\mathbf{v}_\\pi=(I-\\gamma P_\\pi)^{-1}\\mathbf{r}_\\pi$), whereas the $\\max$ in the optimality equation makes it nonlinear",
                "The discount factor only appears in the expectation equation",
                "The optimality equation has no solution unless the MDP is deterministic"
              ],
              "answer": 1,
              "explain": "Fixing $\\pi$ makes the system linear with invertible $I-\\gamma P_\\pi$. The $\\max_a$ in the optimality equation is nonlinear, so it is solved iteratively (value iteration) rather than by matrix inversion, though it still has a unique fixed point by the contraction property."
            },
            {
              "q": "Why is it enough for a policy $\\pi$ to depend only on the current state $S_t$, rather than on the entire history of states and actions?",
              "choices": [
                "Because the discount factor $\\gamma$ erases the influence of past states",
                "Because in a Markov environment the current state is a sufficient statistic for the future, so no extra history can improve a policy that already conditions on the state",
                "Because policies are required by definition to be deterministic",
                "Because the reward function $r(s,a)$ ignores everything except the most recent action"
              ],
              "answer": 1,
              "explain": "The Markov property makes the current state a sufficient statistic for the future, so conditioning on history adds nothing -- which is also why a poor state representation that hides relevant information can make every Markov policy suboptimal."
            },
            {
              "q": "In the lesson's worked 2-state MDP ($\\gamma=0.9$), under the optimal policy state B uses action 'stay' giving reward +2 each step forever. What is $v_*(B)$?",
              "choices": [
                "$2$",
                "$2.2$",
                "$20$",
                "$11$"
              ],
              "answer": 2,
              "explain": "Self-consistency gives $v_*(B)=2+0.9\\,v_*(B)$, so $v_*(B)=2/(1-0.9)=20$, matching the geometric sum of a constant +2 reward discounted at $\\gamma=0.9$."
            },
            {
              "q": "The identity $q_\\pi(s,a) = r(s,a) + \\gamma\\sum_{s'} p(s'\\mid s,a)\\,v_\\pi(s')$ expresses the action-value as which of the following?",
              "choices": [
                "The expected immediate reward for taking $a$ plus the discounted expected value of the next state under $\\pi$",
                "The maximum over all future rewards reachable from $s$",
                "The policy-weighted average of $v_\\pi$ over all actions in $s$",
                "The undiscounted sum of all rewards collected after taking $a$"
              ],
              "answer": 0,
              "explain": "This is the one-step decomposition: take $a$ now to earn expected immediate reward $r(s,a)$, then collect the discounted value $\\gamma v_\\pi(s')$ of wherever you land, averaged over next states. The max version would describe $q_*$, and averaging $q_\\pi$ over actions under $\\pi$ recovers $v_\\pi$, not $q_\\pi$."
            },
            {
              "q": "The lesson notes that both Bellman equations are instances of a fixed point $v = Tv$ where the Bellman operator $T$ is a $\\gamma$-contraction in the max-norm. Why does this property matter?",
              "choices": [
                "It proves the optimal policy must be stochastic",
                "It guarantees a unique fixed point that iterative methods (value iteration, Q-learning) provably converge to from any starting estimate",
                "It makes the Bellman optimality equation linear and solvable by a matrix inverse",
                "It removes the need for a discount factor when $\\gamma = 1$"
              ],
              "answer": 1,
              "explain": "By the Banach fixed-point theorem a $\\gamma$-contraction has a unique fixed point and repeatedly applying $T$ converges to it geometrically from any start -- this is the engine behind value iteration and Q-learning convergence. The optimality operator is nonlinear because of the $\\max$, so no matrix-inverse solution exists."
            },
            {
              "q": "In the lesson's worked 2-state MDP ($\\gamma=0.9$, with $v_*(A)=18$ and $v_*(B)=20$), the action <code>go</code> from state $A$ deterministically moves to $B$ with reward $0$. Using $q_\\pi(s,a)=r(s,a)+\\gamma\\sum_{s'}p(s'\\mid s,a)\\,v_\\pi(s')$, what is $q_*(A,\\text{go})$?",
              "choices": [
                "$q_*(A,\\text{go}) = 0$, because the immediate reward of <code>go</code> is $0$.",
                "$q_*(A,\\text{go}) = 18$, since $0 + 0.9\\cdot 20 = 18$.",
                "$q_*(A,\\text{go}) = 20$, equal to $v_*(B)$ since <code>go</code> lands in $B$.",
                "$q_*(A,\\text{go}) = 16.2$, since $0 + 0.9\\cdot 18 = 16.2$."
              ],
              "answer": 1,
              "explain": "Plug in: $q_*(A,\\text{go}) = 0 + 0.9\\,v_*(B) = 0 + 0.9\\cdot 20 = 18$. Option 3 forgets the $\\gamma$ factor, and option 4 mistakenly uses $v_*(A)$ instead of the value of the successor state $B$."
            },
            {
              "q": "In the same 2-state MDP, $A$ offers <code>stay</code> (reward $+1$, stay in $A$) or <code>go</code> (reward $0$, move to $B$). With $\\gamma=0.9$ the optimal action in $A$ is <code>go</code>. If we instead set $\\gamma=0$ (a fully myopic agent), what is the optimal action in $A$, and why does this reveal a subtlety?",
              "choices": [
                "Still <code>go</code>, because $B$ is the higher-value state regardless of $\\gamma$.",
                "<code>stay</code>, because with $\\gamma=0$ only the immediate reward counts and $+1>0$ — so changing $\\gamma$ can flip the optimal action.",
                "Undefined, because the Bellman optimality equation has no solution when $\\gamma=0$.",
                "<code>go</code>, because the discount factor never affects which action is greedy, only the magnitude of the values."
              ],
              "answer": 1,
              "explain": "With $\\gamma=0$ the return is just $R_{t+1}$, so the agent maximizes immediate reward: <code>stay</code> ($+1$) beats <code>go</code> ($0$). The optimal action genuinely depends on $\\gamma$ — patience ($\\gamma=0.9$) makes the short-term sacrifice of <code>go</code> worthwhile to reach the richer state $B$."
            },
            {
              "q": "A student claims: \"For any finite MDP, there is always a deterministic optimal policy, and no stochastic policy can ever beat the best deterministic one.\" Is this correct?",
              "choices": [
                "Correct: a deterministic policy that is greedy with respect to $q_*$ achieves the optimal value $v_*$ in every state, so no policy (stochastic or not) can do better.",
                "Incorrect: stochastic policies always dominate deterministic ones because randomization improves exploration.",
                "Incorrect: deterministic optimal policies only exist when the MDP has a unique optimal action in every state.",
                "Correct, but only when $\\gamma=1$; for $\\gamma<1$ the optimal policy must be stochastic."
              ],
              "answer": 0,
              "explain": "For a finite MDP there is always a deterministic policy that is greedy w.r.t. $q_*$ and attains $v_*$ everywhere, which is optimal by definition. Randomization can tie this value (e.g., spreading mass over equally-optimal actions) but never exceed it; exploration is a learning concern, not a property of the optimal policy itself."
            },
            {
              "q": "Define the Bellman expectation operator $(T^\\pi v)(s)=\\sum_a \\pi(a\\mid s)\\big[r(s,a)+\\gamma\\sum_{s'}p(s'\\mid s,a)\\,v(s')\\big]$. Starting from an arbitrary value vector $v_0$ and repeatedly applying $T^\\pi$, what does the sequence $v_{k+1}=T^\\pi v_k$ converge to?",
              "choices": [
                "It converges to $v_*$, the optimal value function, regardless of $\\pi$.",
                "It oscillates and does not converge unless $v_0$ is chosen close to $v_\\pi$.",
                "It converges to $v_\\pi$, the value function of the policy $\\pi$ used to define $T^\\pi$.",
                "It converges to $\\max_\\pi v_\\pi$ because each application improves the policy."
              ],
              "answer": 2,
              "explain": "$T^\\pi$ is a $\\gamma$-contraction whose unique fixed point is $v_\\pi$ (it has no $\\max$ over actions — it evaluates the fixed policy $\\pi$), so iteration converges to $v_\\pi$ from any $v_0$. Reaching $v_*$ requires the Bellman optimality operator (which takes a max over actions), not $T^\\pi$."
            },
            {
              "q": "What is the state-value function $v_\\pi(s)$?",
              "choices": [
                "The immediate reward received in state $s$",
                "The expected return when you start in state $s$ and then follow policy $\\pi$ thereafter",
                "The number of times state $s$ is visited",
                "The probability the policy assigns to the best action in $s$"
              ],
              "answer": 1,
              "explain": "$v_\\pi(s)=\\mathbb{E}_\\pi[G_t\\mid S_t=s]$: starting here and behaving according to $\\pi$, how much discounted reward do I expect to accumulate? It scores <i>states</i> under a fixed policy."
            },
            {
              "q": "What is the action-value (Q) function $q_\\pi(s,a)$?",
              "choices": [
                "The same as $v_\\pi(s)$ for every action $a$",
                "The immediate reward $r(s,a)$ only, ignoring the future",
                "The probability of taking action $a$ under $\\pi$",
                "The expected return from taking action $a$ in state $s$ now and following $\\pi$ thereafter — which lets you compare actions in a state"
              ],
              "answer": 3,
              "explain": "$q_\\pi(s,a)=\\mathbb{E}_\\pi[G_t\\mid S_t=s,A_t=a]$ \"probes\" an arbitrary first action $a$ (even one $\\pi$ wouldn't pick) and then defers to $\\pi$. Comparing $q$ across actions is how you improve a policy without a model — the basis of Q-learning and SARSA."
            },
            {
              "q": "What does a Bellman equation express?",
              "choices": [
                "A self-consistency relation: a state's value equals the immediate expected reward plus the discounted value of the next state",
                "The gradient of the policy with respect to its parameters",
                "The total number of states reachable from $s$",
                "The loss function used to train a supervised classifier"
              ],
              "answer": 0,
              "explain": "Bellman equations decompose value recursively: $v_\\pi(s)=\\mathbb{E}[\\,R_{t+1}+\\gamma\\,v_\\pi(S_{t+1})\\,]$. \"Value now = one step of reward + discounted value of where you land.\" This recursion is what makes dynamic-programming and TD methods possible."
            },
            {
              "q": "What are the optimal value function $v_*(s)$ and an optimal policy $\\pi_*$?",
              "choices": [
                "The value and policy of a randomly initialized agent",
                "The average value taken over all possible policies",
                "$v_*$ is the best achievable expected return from each state; an optimal policy $\\pi_*$ attains it (e.g. by acting greedily with respect to $q_*$)",
                "Quantities defined only for supervised-learning problems"
              ],
              "answer": 2,
              "explain": "$v_*(s)=\\max_\\pi v_\\pi(s)$ — the most return obtainable from $s$. Once you have $q_*$, an optimal policy is simply greedy: $\\pi_*(s)=\\arg\\max_a q_*(s,a)$ — which is why so much of RL focuses on estimating optimal value functions."
            }
          ],
          "flashcards": [
            {
              "front": "Bellman expectation equation for $v_\\pi$",
              "back": "$v_\\pi(s)=\\sum_a \\pi(a\\mid s)\\sum_{s',r} p(s',r\\mid s,a)\\,[\\,r+\\gamma v_\\pi(s')\\,]$. Average over the policy, then over next reward/state."
            },
            {
              "front": "Bellman expectation equation for $q_\\pi$",
              "back": "$q_\\pi(s,a)=\\sum_{s',r} p(s',r\\mid s,a)\\,[\\,r+\\gamma\\sum_{a'}\\pi(a'\\mid s')\\,q_\\pi(s',a')\\,]$. Fix first action, average next action under $\\pi$."
            },
            {
              "front": "Bellman optimality equation for $v_*$",
              "back": "$v_*(s)=\\max_a \\sum_{s',r} p(s',r\\mid s,a)\\,[\\,r+\\gamma v_*(s')\\,]$. The policy-average becomes a $\\max$ over actions."
            },
            {
              "front": "Bellman optimality equation for $q_*$",
              "back": "$q_*(s,a)=\\sum_{s',r} p(s',r\\mid s,a)\\,[\\,r+\\gamma\\max_{a'} q_*(s',a')\\,]$. Max appears at the next state's action."
            },
            {
              "front": "How are $v_\\pi$ and $q_\\pi$ related (both directions)?",
              "back": "$v_\\pi(s)=\\sum_a \\pi(a\\mid s)\\,q_\\pi(s,a)$ (average over policy) and $q_\\pi(s,a)=r(s,a)+\\gamma\\sum_{s'}p(s'\\mid s,a)\\,v_\\pi(s')$ (one-step reward + discounted next value)."
            },
            {
              "front": "How do you get the optimal policy from $q_*$?",
              "back": "Act greedily: $\\pi_*(s)=\\arg\\max_a q_*(s,a)$. No model needed — that is why $q_*$ directly encodes optimal control."
            }
          ],
          "homework": [
            {
              "prompt": "Consider a 2-state MDP with states $\\{X, Y\\}$ and $\\gamma=0.8$. From $X$: the only action leads to $Y$ with reward $+4$. From $Y$: the only action leads back to $X$ with reward $-1$. (There is effectively one action per state, so the policy is forced.) Hand-derive $v_\\pi(X)$ and $v_\\pi(Y)$ by setting up and solving the Bellman expectation equations.",
              "hint": "With one action per state the $\\sum_a \\pi(a\\mid s)(\\cdot)$ disappears and transitions are deterministic. Write two linear equations: $v(X)=4+\\gamma v(Y)$ and $v(Y)=-1+\\gamma v(X)$, then substitute one into the other.",
              "solution": "Set up: $v_\\pi(X)=4+0.8\\,v_\\pi(Y)$ and $v_\\pi(Y)=-1+0.8\\,v_\\pi(X)$. Substitute the second into the first: $v_\\pi(X)=4+0.8(-1+0.8\\,v_\\pi(X))=4-0.8+0.64\\,v_\\pi(X)=3.2+0.64\\,v_\\pi(X)$. So $0.36\\,v_\\pi(X)=3.2$, giving $v_\\pi(X)=3.2/0.36\\approx 8.89$. Then $v_\\pi(Y)=-1+0.8(8.89)\\approx-1+7.11=6.11$. Check: $v_\\pi(X)=4+0.8(6.11)=4+4.89=8.89$. Consistent."
            },
            {
              "prompt": "An agent is in state $s$ with four available actions. You are told the optimal action-values are $q_*(s,\\text{up})=3.0$, $q_*(s,\\text{down})=5.5$, $q_*(s,\\text{left})=5.5$, $q_*(s,\\text{right})=2.1$. (a) What is $v_*(s)$? (b) What is/are the optimal action(s) in $s$? (c) Is the optimal policy unique here? Explain.",
              "hint": "Recall $v_*(s)=\\max_a q_*(s,a)$ and $\\pi_*(s)=\\arg\\max_a q_*(s,a)$. Watch for ties in the argmax.",
              "solution": "(a) $v_*(s)=\\max_a q_*(s,a)=\\max\\{3.0, 5.5, 5.5, 2.1\\}=5.5$. (b) The argmax is achieved by both $\\text{down}$ and $\\text{left}$ (each $5.5$), so either is optimal in $s$. (c) The optimal policy is NOT unique: any policy that puts all its probability on $\\{\\text{down}, \\text{left}\\}$ in this state — deterministically choosing one, or randomizing between them in any proportion — is optimal, since both attain $v_*(s)$. All such policies share the same value functions. This illustrates that optimal policies can be non-unique even though $v_*$ and $q_*$ are unique."
            },
            {
              "prompt": "Use the 2-state worked example from the lesson (states $A,B$; actions stay/go; $\\gamma=0.9$; rewards: A-stay$\\to A$ +1, A-go$\\to B$ 0, B-stay$\\to B$ +2, B-go$\\to A$ 0). Verify the optimal values by running value iteration starting from $v_0(A)=v_0(B)=0$, i.e. compute $v_1$ and $v_2$, and comment on whether they are moving toward the known fixed point $v_*(A)=18, v_*(B)=20$.",
              "hint": "Value iteration applies the Bellman optimality operator: $v_{k+1}(s)=\\max_a[\\,r(s,a)+\\gamma\\sum_{s'}p(s'\\mid s,a)v_k(s')\\,]$. Plug in $v_k$ on the right to get $v_{k+1}$.",
              "solution": "Sweep 1 from $v_0=(0,0)$: $v_1(A)=\\max\\{1+0.9(0),\\,0+0.9(0)\\}=\\max\\{1,0\\}=1$. $v_1(B)=\\max\\{2+0.9(0),\\,0+0.9(0)\\}=\\max\\{2,0\\}=2$. Sweep 2 from $v_1=(1,2)$: $v_2(A)=\\max\\{1+0.9(1),\\,0+0.9(2)\\}=\\max\\{1.9,\\,1.8\\}=1.9$ (stay narrowly wins this early). $v_2(B)=\\max\\{2+0.9(2),\\,0+0.9(1)\\}=\\max\\{3.8,\\,0.9\\}=3.8$. So $v_1=(1,2)$ and $v_2=(1.9, 3.8)$. Both estimates are increasing toward the fixed point $(18,20)$ and the gap shrinks each sweep — consistent with the Bellman optimality operator being a $\\gamma=0.9$ contraction, so $v_k\\to v_*$ geometrically. (Note the greedy action in $A$ may flip from stay to go as the estimates grow, eventually settling on go, which is optimal.)"
            }
          ],
          "examples": [
            {
              "title": "Evaluating a Policy on a Two-State Chain",
              "body": "Consider an MDP with states $\\mathcal{S} = \\{s_1, s_2\\}$ and a single action available in each state, so the policy $\\pi$ is forced (deterministic). From $s_1$ the agent gets reward $r = 2$ and transitions to $s_2$ with probability $1$; from $s_2$ it gets reward $r = 4$ and transitions back to $s_1$ with probability $1$. With discount $\\gamma = 0.5$, compute the state-value function $v_\\pi(s_1)$ and $v_\\pi(s_2)$ by solving the Bellman expectation equations.",
              "solution": "The state-value function is the expected return starting from $s$ and following $\\pi$:\n$$v_\\pi(s) = \\mathbb{E}_\\pi\\!\\left[\\,\\sum_{k=0}^{\\infty} \\gamma^k R_{t+k+1} \\;\\middle|\\; S_t = s\\right].$$\n\n<strong>Step 1: Write the Bellman expectation equation.</strong> For a general policy,\n$$v_\\pi(s) = \\sum_{a} \\pi(a\\mid s) \\sum_{s', r} p(s', r \\mid s, a)\\,\\big[r + \\gamma\\, v_\\pi(s')\\big].$$\nHere each state has one action with a deterministic next state and reward, so the inner sums collapse:\n$$v_\\pi(s_1) = r(s_1) + \\gamma\\, v_\\pi(s_2), \\qquad v_\\pi(s_2) = r(s_2) + \\gamma\\, v_\\pi(s_1).$$\n\n<strong>Step 2: Plug in the numbers</strong> ($r(s_1)=2$, $r(s_2)=4$, $\\gamma = 0.5$):\n$$v_\\pi(s_1) = 2 + 0.5\\, v_\\pi(s_2), \\qquad v_\\pi(s_2) = 4 + 0.5\\, v_\\pi(s_1).$$\n\n<strong>Step 3: Solve the linear system by substitution.</strong> Substitute the second equation into the first:\n$$v_\\pi(s_1) = 2 + 0.5\\,(4 + 0.5\\, v_\\pi(s_1)) = 2 + 2 + 0.25\\, v_\\pi(s_1) = 4 + 0.25\\, v_\\pi(s_1).$$\nSo $0.75\\, v_\\pi(s_1) = 4$, giving\n$$v_\\pi(s_1) = \\frac{4}{0.75} = \\frac{16}{3} \\approx 5.33.$$\nThen\n$$v_\\pi(s_2) = 4 + 0.5 \\cdot \\frac{16}{3} = 4 + \\frac{8}{3} = \\frac{20}{3} \\approx 6.67.$$\n\n<strong>Step 4: Sanity check</strong> by following the deterministic reward stream from $s_1$: rewards are $2, 4, 2, 4, \\dots$ discounted by $1, 0.5, 0.25, \\dots$\n$$v_\\pi(s_1) = (2 + 0.5\\cdot 4) + 0.25(2 + 0.5\\cdot 4) + \\cdots = 4 \\sum_{k=0}^{\\infty} 0.25^k = \\frac{4}{1 - 0.25} = \\frac{16}{3}.\\;\\checkmark$$\n\n<strong>Answer:</strong> $v_\\pi(s_1) = \\tfrac{16}{3} \\approx 5.33$ and $v_\\pi(s_2) = \\tfrac{20}{3} \\approx 6.67$."
            },
            {
              "title": "Greedy Action Selection with the Action-Value Function",
              "body": "An agent is in state $s$ where two actions are available: $a_{\\text{left}}$ and $a_{\\text{right}}$. Action $a_{\\text{left}}$ gives reward $r = 1$ and lands in state $x$ with probability $1$; action $a_{\\text{right}}$ is stochastic: with probability $0.7$ it gives reward $r = 0$ and lands in $y$, and with probability $0.3$ it gives reward $r = 10$ and lands in $z$. You are told $v_\\pi(x) = 8$, $v_\\pi(y) = 6$, $v_\\pi(z) = 0$, and $\\gamma = 0.9$. Compute $q_\\pi(s, a_{\\text{left}})$ and $q_\\pi(s, a_{\\text{right}})$, and identify the greedy action.",
              "solution": "The action-value function $q_\\pi(s,a)$ is the expected return after taking action $a$ in state $s$ and then following $\\pi$. The relation to the next-state values is\n$$q_\\pi(s, a) = \\sum_{s', r} p(s', r \\mid s, a)\\,\\big[r + \\gamma\\, v_\\pi(s')\\big].$$\n\n<strong>Step 1: Evaluate $q_\\pi(s, a_{\\text{left}})$.</strong> This action is deterministic ($x$ with probability $1$, reward $1$):\n$$q_\\pi(s, a_{\\text{left}}) = 1 + 0.9 \\cdot v_\\pi(x) = 1 + 0.9 \\cdot 8 = 1 + 7.2 = 8.2.$$\n\n<strong>Step 2: Evaluate $q_\\pi(s, a_{\\text{right}})$.</strong> This action has two outcomes; sum over both, weighting by probability:\n$$q_\\pi(s, a_{\\text{right}}) = 0.7\\,\\big[\\,0 + 0.9\\, v_\\pi(y)\\big] + 0.3\\,\\big[\\,10 + 0.9\\, v_\\pi(z)\\big].$$\nCompute each term:\n$$0.7\\,[\\,0 + 0.9 \\cdot 6\\,] = 0.7 \\cdot 5.4 = 3.78,$$\n$$0.3\\,[\\,10 + 0.9 \\cdot 0\\,] = 0.3 \\cdot 10 = 3.0.$$\nAdd them:\n$$q_\\pi(s, a_{\\text{right}}) = 3.78 + 3.0 = 6.78.$$\n\n<strong>Step 3: Compare and pick the greedy action.</strong> The greedy action is the one with the larger $q$-value:\n$$q_\\pi(s, a_{\\text{left}}) = 8.2 \\quad > \\quad q_\\pi(s, a_{\\text{right}}) = 6.78.$$\nSo the greedy choice is $a_{\\text{left}}$.\n\n<strong>Remark (why the rare big reward is not enough):</strong> The $r=10$ payoff of $a_{\\text{right}}$ looks tempting, but it arrives only $30\\%$ of the time, and the $70\\%$ branch leads to a merely decent state ($v_\\pi(y)=6$). After taking the expectation and discounting, the steady value $v_\\pi(x)=8$ behind $a_{\\text{left}}$ wins. This is exactly the kind of one-step look-ahead the policy-improvement step of dynamic programming uses: define $\\pi'(s) = \\arg\\max_a q_\\pi(s,a)$ to get a policy at least as good as $\\pi$.\n\n<strong>Answer:</strong> $q_\\pi(s, a_{\\text{left}}) = 8.2$, $q_\\pi(s, a_{\\text{right}}) = 6.78$; the greedy action is $a_{\\text{left}}$."
            },
            {
              "title": "V from Q: the value of a policy",
              "body": "A policy $\\pi$ and the action-values $Q(s,a)$ pin down the state-value: $V_\\pi(s)=\\sum_a \\pi(a\\mid s)\\,Q(s,a)$. Compute $V$ for a state with two actions whose values are $Q=[10,\\,4]$.",
              "solution": "<strong>Greedy policy.</strong> If $\\pi$ always takes the best action, $\\pi=[1,0]$:\n$$V_\\pi(s)=1\\cdot10+0\\cdot4=10.$$\n<strong>A stochastic policy.</strong> If $\\pi=[0.7,\\,0.3]$ (70% the good action, 30% the worse one):\n$$V_\\pi(s)=0.7\\cdot10+0.3\\cdot4=8.2.$$\n<strong>The takeaway.</strong> $V_\\pi$ is just the $\\pi$-weighted average of the action-values, so putting weight on worse actions (exploring) <em>lowers</em> the value. The greedy value is the most any policy can extract from these $Q$'s ($\\max_a Q = 10$); the gap $10-8.2=1.8$ is the price of this policy's randomness."
            }
          ]
        }
      ]
    },
    {
      "id": "rl-dynamic-programming",
      "title": "Planning with Dynamic Programming",
      "lessons": [
        {
          "id": "rl-policy-iteration",
          "title": "Policy Evaluation and Policy Iteration",
          "minutes": 16,
          "content": "<h3>From \"How good is this policy?\" to \"Give me the best policy\"</h3>\n<p>In the previous lessons we defined Markov Decision Processes (MDPs) and the Bellman equations that any value function must satisfy. We now turn those equations into <em>algorithms</em>. The whole of this lesson rests on a single, beautifully recursive idea: if you have a way to <strong>measure</strong> how good a policy is, you can almost mechanically <strong>improve</strong> it — and if you alternate measuring and improving, you converge to optimality. This is <strong>policy iteration</strong>, the cleanest member of the dynamic-programming (DP) family.</p>\n<p>Throughout, assume a finite MDP $(\\mathcal{S}, \\mathcal{A}, P, R, \\gamma)$ with known dynamics: $P(s' \\mid s, a)$ is the transition probability, $R(s,a)$ the expected immediate reward, and $\\gamma \\in [0,1)$ the discount factor. A (stationary) policy $\\pi(a \\mid s)$ maps states to distributions over actions. \"Known dynamics\" is what makes this <em>planning</em> rather than learning — but the update rules we derive are the conceptual ancestors of nearly every value-based learning method, from Q-learning to deep RL.</p>\n\n<h3>Part 1 — Iterative Policy Evaluation</h3>\n<h4>The object we want: the state-value function</h4>\n<p>For a fixed policy $\\pi$, the <strong>state-value function</strong> is the expected discounted return when starting in $s$ and acting according to $\\pi$ forever:</p>\n$$v_\\pi(s) = \\mathbb{E}_\\pi\\!\\left[\\sum_{k=0}^{\\infty} \\gamma^k R_{t+k+1} \\,\\middle|\\, S_t = s\\right].$$\n<p>This is a single number per state — but the expectation hides an infinite horizon, so we cannot compute it by brute-force simulation in finite time. Instead we exploit its self-referential structure. By peeling off the first reward and using the Markov property, $v_\\pi$ satisfies the <strong>Bellman expectation equation</strong>:</p>\n$$v_\\pi(s) = \\sum_{a} \\pi(a\\mid s) \\left[ R(s,a) + \\gamma \\sum_{s'} P(s'\\mid s,a)\\, v_\\pi(s') \\right].$$\n<p>This is one linear equation per state, so for $|\\mathcal{S}|$ states it is a linear system $v_\\pi = R_\\pi + \\gamma P_\\pi v_\\pi$, solvable directly as $v_\\pi = (I - \\gamma P_\\pi)^{-1} R_\\pi$. The matrix inverse exists because $\\gamma < 1$ makes $I - \\gamma P_\\pi$ nonsingular. But inversion costs $O(|\\mathcal{S}|^3)$ and is awkward for large state spaces, so in practice we solve it <em>iteratively</em>.</p>\n\n<h4>The backup: turning the equation into an update</h4>\n<p>Define the <strong>Bellman expectation operator</strong> $T^\\pi$ acting on any value vector $v$:</p>\n$$(T^\\pi v)(s) \\;=\\; \\sum_{a} \\pi(a\\mid s) \\left[ R(s,a) + \\gamma \\sum_{s'} P(s'\\mid s,a)\\, v(s') \\right].$$\n<p>Notice $v_\\pi$ is precisely the vector satisfying $T^\\pi v_\\pi = v_\\pi$ — it is the <strong>fixed point</strong> of $T^\\pi$. Iterative policy evaluation simply applies the operator over and over, starting from any guess $v_0$ (often all zeros):</p>\n$$v_{k+1} \\;\\leftarrow\\; T^\\pi v_k.$$\n<p>In words — this is the <strong>backup update rule</strong> you must internalize:</p>\n<pre><code>for each state s:\n    v_new(s) = sum over a of pi(a|s) * [ R(s,a)\n                 + gamma * sum over s' of P(s'|s,a) * v_old(s') ]</code></pre>\n<p>We call it a \"backup\" because it pushes value information one step <em>back</em> from successor states $s'$ to the current state $s$. Each sweep uses the entire current estimate $v_k$ on the right-hand side. (A variant, <em>in-place</em> or Gauss–Seidel evaluation, overwrites entries as it goes and typically converges faster; the synchronous version above is easier to analyze.)</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Picture value sloshing through the state graph. Initially you know nothing ($v_0 = 0$). After one sweep, each state has \"discovered\" its immediate reward. After two sweeps, it has absorbed rewards two steps away (discounted by $\\gamma$). After $k$ sweeps, the estimate is correct about everything within $k$ steps and the un-accounted tail is bounded by $\\gamma^k$ times the max return — which shrinks geometrically.</p>\n</div>\n\n<h4>Why it converges: $T^\\pi$ is a contraction</h4>\n<p>Convergence is not hand-waving; it follows from the <strong>Banach fixed-point theorem</strong>. The key property is that $T^\\pi$ is a <strong>$\\gamma$-contraction in the max-norm</strong> $\\lVert v \\rVert_\\infty = \\max_s |v(s)|$. For any two value vectors $u, v$:</p>\n$$\\lVert T^\\pi u - T^\\pi v \\rVert_\\infty \\;\\le\\; \\gamma \\,\\lVert u - v \\rVert_\\infty.$$\n<p>The proof is short and worth seeing. The $\\pi$- and reward terms cancel, leaving</p>\n$$|(T^\\pi u)(s) - (T^\\pi v)(s)| = \\gamma \\left| \\sum_a \\pi(a\\mid s)\\sum_{s'} P(s'\\mid s,a)\\big(u(s') - v(s')\\big)\\right| \\le \\gamma \\max_{s'} |u(s') - v(s')|,$$\n<p>because $\\pi(\\cdot\\mid s)$ and $P(\\cdot\\mid s,a)$ are probability distributions (non-negative, summing to 1), so the weighted average of the differences cannot exceed their maximum. Taking the max over $s$ gives the contraction bound. Two consequences follow immediately:</p>\n<ul>\n<li><strong>Uniqueness:</strong> a contraction has exactly one fixed point, so $v_\\pi$ is unique.</li>\n<li><strong>Geometric convergence:</strong> $\\lVert v_k - v_\\pi \\rVert_\\infty \\le \\gamma^k \\lVert v_0 - v_\\pi \\rVert_\\infty$. The error shrinks by a factor $\\gamma$ every sweep, regardless of where you start.</li>\n</ul>\n<p>In practice you stop when $\\max_s |v_{k+1}(s) - v_k(s)| < \\theta$ for a small tolerance $\\theta$.</p>\n\n<h3>Part 2 — Policy Improvement</h3>\n<h4>The action-value function</h4>\n<p>To improve a policy we need to ask a counterfactual: \"what if, just for the first step in state $s$, I took action $a$ instead of what $\\pi$ recommends, and then followed $\\pi$ thereafter?\" That quantity is the <strong>action-value function</strong>:</p>\n$$q_\\pi(s,a) = R(s,a) + \\gamma \\sum_{s'} P(s'\\mid s,a)\\, v_\\pi(s').$$\n<p>By construction, averaging $q_\\pi(s,a)$ over $\\pi$'s own action choice recovers the state value: $v_\\pi(s) = \\sum_a \\pi(a\\mid s)\\, q_\\pi(s,a)$. So $v_\\pi(s)$ is what $\\pi$ <em>actually</em> achieves, while $q_\\pi(s,a)$ tells us what each <em>alternative</em> first move is worth.</p>\n\n<h4>The greedy policy</h4>\n<p>The natural move: in every state, pick the action with the highest $q_\\pi$. This defines the <strong>greedy policy</strong> with respect to $v_\\pi$:</p>\n$$\\pi'(s) = \\arg\\max_{a} \\; q_\\pi(s,a) = \\arg\\max_{a} \\left[ R(s,a) + \\gamma \\sum_{s'} P(s'\\mid s,a)\\, v_\\pi(s') \\right].$$\n<p>This is greedy because it optimizes only the <em>first</em> action assuming we revert to the old $\\pi$ afterward. The remarkable fact — the engine of the whole method — is that committing to this greedy choice <em>everywhere and forever</em> is never worse than $\\pi$.</p>\n\n<h4>The Policy Improvement Theorem</h4>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Key fact</div>\n<p><strong>Policy Improvement Theorem.</strong> Let $\\pi$ and $\\pi'$ be any two deterministic policies such that for every state $s$, $\\;q_\\pi(s, \\pi'(s)) \\ge v_\\pi(s)$. Then $\\pi'$ is at least as good as $\\pi$ everywhere: $v_{\\pi'}(s) \\ge v_\\pi(s)$ for all $s$. The greedy policy satisfies the premise by construction, since $q_\\pi(s,\\pi'(s)) = \\max_a q_\\pi(s,a) \\ge \\sum_a \\pi(a\\mid s)q_\\pi(s,a) = v_\\pi(s)$.</p>\n</div>\n<p><strong>Why the local inequality becomes a global one.</strong> The subtle part is that $q_\\pi(s,\\pi'(s)) \\ge v_\\pi(s)$ only compares \"use $\\pi'$ for one step, then $\\pi$\" against \"use $\\pi$ throughout.\" It does <em>not</em> obviously imply that using $\\pi'$ <em>forever</em> is better. The proof is a telescoping argument: keep substituting the one-step inequality into itself.</p>\n$$\\begin{aligned}\nv_\\pi(s) &\\le q_\\pi(s, \\pi'(s)) = \\mathbb{E}_{\\pi'}\\!\\big[R_{t+1} + \\gamma\\, v_\\pi(S_{t+1}) \\mid S_t = s\\big] \\\\\n&\\le \\mathbb{E}_{\\pi'}\\!\\big[R_{t+1} + \\gamma\\, q_\\pi(S_{t+1}, \\pi'(S_{t+1})) \\mid S_t = s\\big] \\\\\n&\\le \\mathbb{E}_{\\pi'}\\!\\big[R_{t+1} + \\gamma R_{t+2} + \\gamma^2 v_\\pi(S_{t+2}) \\mid S_t = s\\big] \\\\\n&\\;\\;\\vdots \\\\\n&\\le \\mathbb{E}_{\\pi'}\\!\\big[R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\cdots \\mid S_t = s\\big] = v_{\\pi'}(s).\n\\end{aligned}$$\n<p>Each step replaces a $v_\\pi$ by a $q_\\pi(\\cdot, \\pi'(\\cdot))$ (valid by the premise) and then expands $q_\\pi$ one step under $\\pi'$'s dynamics. The expectation is taken under $\\pi'$ because we are committing to $\\pi'$'s actions; the discount $\\gamma < 1$ kills the residual $v_\\pi$ term in the limit. This is exactly the kind of \"unroll the recursion and let the tail vanish\" argument that recurs all over RL theory.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Why does a greedy <em>local</em> choice never backfire <em>globally</em>? Because the value of the old policy $v_\\pi$ acts as a self-consistent baseline. Any state where the greedy action strictly beats the baseline is a free improvement; every other state at least matches it. Since the new policy is at least as good at the very next decision <em>and</em> the future is again evaluated against the same baseline, errors can only accumulate <em>upward</em>. There is no mechanism by which a strictly-better first move leads to a worse long-run outcome — the discounted tail is always re-anchored to $v_\\pi$, which $\\pi'$ can only beat or tie.</p>\n</div>\n\n<h4>When improvement stops</h4>\n<p>If a greedy step produces no change — i.e. $v_{\\pi'} = v_\\pi$ — then for all $s$, $\\;v_\\pi(s) = \\max_a q_\\pi(s,a) = \\max_a [R(s,a) + \\gamma\\sum_{s'}P(s'\\mid s,a)v_\\pi(s')]$. But that is exactly the <strong>Bellman optimality equation</strong>. So when greedy improvement stops, $v_\\pi = v_*$ and $\\pi$ is an <strong>optimal policy</strong>. Improvement cannot get stuck at a suboptimal point — the only fixed point is optimality.</p>\n\n<h3>Part 3 — Policy Iteration</h3>\n<p>Now alternate the two phases until the policy stops changing:</p>\n<pre><code>1. Initialize pi arbitrarily (e.g. all \"up\")\n2. Repeat:\n   a. POLICY EVALUATION: compute v_pi\n        (iterate v <- T^pi v until ||change|| < theta)\n   b. POLICY IMPROVEMENT: pi' <- greedy(v_pi)\n   c. if pi' == pi:  return pi (optimal); else pi <- pi'</code></pre>\n<p>This produces a chain $\\pi_0 \\to v_{\\pi_0} \\to \\pi_1 \\to v_{\\pi_1} \\to \\cdots$ that mathematicians call the <strong>generalized policy iteration</strong> pattern — two interacting processes, one making the value consistent with the policy, the other making the policy greedy with respect to the value. They pull toward each other and meet only at the optimum.</p>\n\n<h4>Convergence — why it terminates, fast</h4>\n<p>Two facts combine. First, by the improvement theorem each iteration is monotone: $v_{\\pi_{k+1}} \\ge v_{\\pi_k}$ component-wise. Second, in a <em>finite</em> MDP there are only finitely many deterministic policies ($|\\mathcal{A}|^{|\\mathcal{S}|}$ of them). A monotone sequence that strictly increases at every change, over a finite set, must terminate; since the only place it can stop is the Bellman optimality fixed point, it terminates <em>at the optimal policy</em> after finitely many iterations. Empirically, policy iteration converges in a startlingly small number of outer iterations — often a handful even for large problems — because each improvement step typically corrects many states at once.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>Policy iteration is the conceptual blueprint for an enormous swath of modern AI. Replace exact evaluation with sampled returns and you get <strong>Monte Carlo control</strong>; replace it with a one-step bootstrapped estimate and you get <strong>SARSA / Q-learning</strong>; replace the lookup table with a neural network and the greedy step with a policy-gradient update and you get <strong>actor–critic</strong> methods and deep RL. Even AlphaGo/AlphaZero are policy-iteration at heart: the MCTS search is a powerful policy-improvement operator, and the network training is policy/value evaluation. The \"evaluate, then improve, repeat\" loop is one of the most reusable ideas in the field.</p>\n</div>\n\n<h3>Worked Example: A 1×4 corridor</h3>\n<p>Consider four cells in a row: <code>[ S0 | S1 | S2 | G ]</code>. State $G$ (cell 3) is a terminal goal. Actions are <code>Left</code> and <code>Right</code>; movement is deterministic and bumping into the left wall keeps you in place. Every step yields reward $-1$ until you reach $G$ (so the agent wants to finish fast). Use $\\gamma = 1$ for clarity (the corridor is short and episodic, so returns stay finite — provided the policy actually reaches $G$). Set $v(G) = 0$ always.</p>\n<p><strong>Start policy $\\pi_0$: always go Left</strong> (a deliberately bad policy).</p>\n<p><em>Evaluation of $\\pi_0$.</em> Under \"always Left,\" from $S0$ you bump the wall forever (never reach $G$): return $= -\\infty$. From $S1$ you go to $S0$ then loop forever: also $-\\infty$. Same for $S2$. So $v_{\\pi_0}(S0)=v_{\\pi_0}(S1)=v_{\\pi_0}(S2) = -\\infty$, $v_{\\pi_0}(G)=0$. (This divergence is exactly why $\\gamma=1$ only behaves nicely for policies that actually terminate; iterative evaluation would drive these toward $-\\infty$. In practice you'd cap iterations, but the ordering is what matters next.)</p>\n<p><em>Improvement.</em> Compute $q_{\\pi_0}(s,a) = -1 + v_{\\pi_0}(\\text{next})$ for each action:</p>\n<ul>\n<li>$S2$: Right $\\to G$, $q = -1 + 0 = -1$; Left $\\to S1$, $q = -1 + (-\\infty)$. Greedy picks <strong>Right</strong>.</li>\n<li>$S1$: Right $\\to S2$, $q = -1 + (-\\infty)$; Left $\\to S0$, same. (Both look like $-\\infty$ here, but a single sweep of <em>truncated</em> evaluation breaks the tie — see below.) Greedy will pick <strong>Right</strong> once $S2$'s value has improved.</li>\n</ul>\n<p>To see the mechanics crisply, restart with <strong>truncated evaluation</strong> (the practical approach): initialize $v = 0$ everywhere and do the full algorithm with one evaluation sweep per round.</p>\n<p><strong>Round 1.</strong> Evaluate $\\pi_0$ (\"Left\") for one synchronous sweep from $v_0 = [0,0,0,0]$. Under \"Left\": $S0\\to S0$, $S1\\to S0$, $S2\\to S1$.</p>\n<ul>\n<li>$v(S0) = -1 + v_0(S0) = -1$; $v(S1) = -1 + v_0(S0) = -1$; $v(S2) = -1 + v_0(S1) = -1$; $v(G)=0$.</li>\n</ul>\n<p>So $v_1 = [-1,-1,-1,0]$. Now improve greedily using $q(s,a) = -1 + v_1(\\text{next})$:</p>\n<ul>\n<li>$S2$: Right$\\to G$: $-1+0 = -1$; Left$\\to S1$: $-1+(-1)=-2$. Pick <strong>Right</strong>.</li>\n<li>$S1$: Right$\\to S2$: $-1+(-1)=-2$; Left$\\to S0$: $-1+(-1)=-2$. Tie; keep current or pick Right.</li>\n<li>$S0$: Right$\\to S1$: $-1+(-1)=-2$; Left$\\to S0$: $-1+(-1)=-2$. Tie.</li>\n</ul>\n<p>New policy $\\pi_1 = [\\,?, ?, \\text{Right}, -]$ — at least $S2$ now correctly points Right.</p>\n<p><strong>Round 2.</strong> Evaluate $\\pi_1$ (Right at $S2$, say Right elsewhere) one sweep from $v_1=[-1,-1,-1,0]$. Under \"Right\": $S0\\to S1$, $S1\\to S2$, $S2\\to G$.</p>\n<ul>\n<li>$v(S2) = -1 + v_1(G) = -1$; $v(S1) = -1 + v_1(S2) = -2$; $v(S0) = -1 + v_1(S1) = -2$.</li>\n</ul>\n<p>$v_2 = [-2,-2,-1,0]$. Improve: at $S1$, Right$\\to S2$: $-1+(-1)=-2$ vs Left$\\to S0$: $-1+(-2)=-3$ — pick <strong>Right</strong>. At $S0$, Right$\\to S1$: $-1+(-2)=-3$ vs Left$\\to S0$: $-1+(-2)=-3$ — still a tie this round.</p>\n<p><strong>Round 3.</strong> Another evaluation+improvement sweep resolves $S0 \\to$ <strong>Right</strong>, and values settle to the true optimum:</p>\n$$v_* = [-3, -2, -1, 0], \\qquad \\pi_* = [\\text{Right}, \\text{Right}, \\text{Right}, -].$$\n<p>These are exactly the shortest-path distances to the goal (negated), which is precisely what we'd expect: with $-1$ per step, the optimal value of a state is minus its distance to $G$. Policy iteration discovered the shortest-path policy purely from the backup and greedy rules — no graph-search code required. Notice how the correct \"Right\" decision propagated <em>backward</em> from the goal, one cell per round; that geometric, back-to-front spread of information is the hallmark of dynamic programming.</p>\n\n<h3>Summary</h3>\n<ul>\n<li><strong>Policy evaluation</strong> = repeatedly apply the Bellman expectation backup $v \\leftarrow T^\\pi v$; it converges geometrically to the unique fixed point $v_\\pi$ because $T^\\pi$ is a $\\gamma$-contraction in max-norm.</li>\n<li><strong>Policy improvement</strong> = act greedily w.r.t. $q_\\pi$. The policy improvement theorem (proved by telescoping a one-step inequality) guarantees the new policy is never worse, with equality only at optimality (Bellman optimality equation).</li>\n<li><strong>Policy iteration</strong> = alternate the two. It is monotone and, over a finite policy set, terminates at an optimal policy in finitely many steps — usually very few.</li>\n<li>This evaluate–improve loop is the skeleton underneath Monte Carlo control, SARSA, Q-learning, actor–critic, and modern deep RL.</li>\n</ul>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"rl-gridworld\"></div>",
          "mcq": [
            {
              "q": "In iterative policy evaluation with a fixed policy $\\pi$, what is the update applied to each state $s$ in a synchronous sweep?",
              "choices": [
                "$v(s) \\leftarrow \\max_a [R(s,a) + \\gamma \\sum_{s'} P(s'|s,a) v(s')]$",
                "$v(s) \\leftarrow \\sum_a \\pi(a|s)[R(s,a) + \\gamma \\sum_{s'} P(s'|s,a) v(s')]$",
                "$v(s) \\leftarrow R(s,\\pi(s)) + \\gamma\\, v(s)$",
                "$v(s) \\leftarrow \\sum_{s'} P(s'|s,\\pi(s)) v(s')$"
              ],
              "answer": 1,
              "explain": "Policy evaluation uses the Bellman EXPECTATION backup: average over the policy's action distribution (not a max, which is the optimality backup). Choice A is the optimality/value-iteration update; C and D drop the reward or the expectation over actions."
            },
            {
              "q": "The policy improvement theorem says: if $q_\\pi(s,\\pi'(s)) \\ge v_\\pi(s)$ for all $s$, then $v_{\\pi'}(s) \\ge v_\\pi(s)$ for all $s$. Why does this one-step (local) inequality extend to the infinite horizon?",
              "choices": [
                "Because $\\gamma < 1$ forces all value functions to be equal in the limit",
                "Because the one-step inequality is repeatedly substituted into itself (telescoping), and the residual $v_\\pi$ term vanishes as $\\gamma^k \\to 0$",
                "Because greedy policies are always deterministic, which guarantees monotonicity",
                "Because $q_\\pi$ is always larger than $v_{\\pi'}$ by definition"
              ],
              "answer": 1,
              "explain": "The proof unrolls the recursion: each substitution peels off one real reward under $\\pi'$ and pushes the $v_\\pi$ baseline one step further, where it is discounted by an extra $\\gamma$; the tail $\\gamma^k v_\\pi \\to 0$, leaving $v_{\\pi'}$."
            },
            {
              "q": "During policy iteration, the policy improvement step produces a new greedy policy $\\pi'$ that turns out to be identical to $\\pi$. What does this imply?",
              "choices": [
                "The algorithm has stalled at a local optimum and should restart from a new initialization",
                "$v_\\pi$ satisfies the Bellman optimality equation, so $\\pi$ is optimal",
                "The discount factor $\\gamma$ is too small and must be increased",
                "Evaluation did not converge tightly enough; lower the tolerance $\\theta$"
              ],
              "answer": 1,
              "explain": "If greedy improvement yields no change, then $v_\\pi(s) = \\max_a q_\\pi(s,a)$ for all $s$, which is exactly the Bellman optimality equation; therefore $v_\\pi = v_*$ and $\\pi$ is optimal. There are no suboptimal fixed points to get stuck in."
            },
            {
              "q": "Why is iterative policy evaluation guaranteed to converge to a unique $v_\\pi$ from any starting vector?",
              "choices": [
                "Because the reward function is bounded",
                "Because the Bellman expectation operator $T^\\pi$ is a $\\gamma$-contraction in the max-norm, so the Banach fixed-point theorem applies",
                "Because the policy $\\pi$ is held fixed during evaluation",
                "Because the state space is finite, so any sequence must converge"
              ],
              "answer": 1,
              "explain": "Contraction in max-norm ($\\|T^\\pi u - T^\\pi v\\|_\\infty \\le \\gamma \\|u-v\\|_\\infty$) gives both uniqueness of the fixed point and geometric convergence $\\|v_k - v_\\pi\\|_\\infty \\le \\gamma^k \\|v_0 - v_\\pi\\|_\\infty$. A fixed policy is necessary but not sufficient; finiteness alone doesn't guarantee convergence of an iteration."
            },
            {
              "q": "The Bellman expectation equation can be written in matrix form $v_\\pi = R_\\pi + \\gamma P_\\pi v_\\pi$, giving the closed-form solution $v_\\pi = (I - \\gamma P_\\pi)^{-1} R_\\pi$. If a direct solution is available, why does the lesson bother with the *iterative* policy-evaluation method at all?",
              "choices": [
                "The iterative method avoids the $O(|\\mathcal{S}|^3)$ cost of the matrix inversion, which is prohibitive for large state spaces",
                "The closed-form solution is only an approximation, whereas the iterative method is exact",
                "The matrix $(I - \\gamma P_\\pi)$ is never invertible when $\\gamma < 1$",
                "The iterative method converges in a single step while inversion requires many"
              ],
              "answer": 0,
              "explain": "Matrix inversion costs $O(|\\mathcal{S}|^3)$, so for large state spaces the cheaper per-iteration backups of the iterative method are preferred even though both target the same exact $v_\\pi$. The closed form is exact (not an approximation), and $(I-\\gamma P_\\pi)$ is in fact always invertible for $\\gamma<1$."
            },
            {
              "q": "In policy iteration, what guarantees that the algorithm terminates after a *finite* number of iterations for a finite MDP?",
              "choices": [
                "There are only finitely many deterministic policies, and each improvement step strictly improves the policy until no change occurs",
                "The discount factor $\\gamma$ eventually shrinks all future rewards to exactly zero",
                "Each policy-evaluation step converges in finitely many backups",
                "The reward function $R(s,a)$ is bounded, so the values cannot grow without limit"
              ],
              "answer": 0,
              "explain": "Because there is a finite set of deterministic policies and each improvement step yields a strictly better policy (or no change, signaling optimality), the process must terminate after finitely many iterations. Discounting and bounded rewards do not by themselves force termination, and iterative evaluation converges only asymptotically."
            },
            {
              "q": "The state-value function is defined as an infinite-horizon expected discounted return. Why can it nonetheless be computed without simulating infinitely far into the future?",
              "choices": [
                "Its self-referential (recursive) structure lets the infinite sum be captured by the Bellman fixed-point equation $T^\\pi v_\\pi = v_\\pi$",
                "The discount factor truncates the sum to a finite number of nonzero terms",
                "Rewards beyond a fixed horizon are defined to be exactly zero",
                "The Markov property guarantees the return is the same from every state"
              ],
              "answer": 0,
              "explain": "Peeling off the first reward and using the Markov property collapses the infinite horizon into the recursive Bellman equation, whose fixed point is $v_\\pi$. Discounting shrinks distant terms toward zero but never makes them exactly zero, so it does not truncate the sum."
            },
            {
              "q": "A practitioner runs iterative policy evaluation but, to save time, stops the sweeps *before* full convergence and immediately performs a greedy policy-improvement step. What is the most accurate characterization of this scheme?",
              "choices": [
                "It is a valid variant (generalized/modified policy iteration) that can still converge to the optimal policy",
                "It is invalid because policy improvement requires the exact $v_\\pi$ to be theoretically sound",
                "It necessarily diverges because the value estimates are biased",
                "It is identical to standard policy iteration with no difference in behavior"
              ],
              "answer": 0,
              "explain": "Interleaving partial evaluation with improvement is the generalized/modified policy iteration idea, which still converges to optimality without ever computing $v_\\pi$ exactly. Improvement does not require exact $v_\\pi$, the scheme does not diverge, and it differs from standard policy iteration which evaluates to convergence each round."
            },
            {
              "q": "Consider a 2-state MDP under a fixed policy $\\pi$. The Bellman expectation backup is $v_{k+1}(s) = R_\\pi(s) + \\gamma \\sum_{s'} P_\\pi(s'\\mid s)\\, v_k(s')$. Suppose $R_\\pi = [2, 0]^\\top$, $\\gamma = 0.5$, transitions are $P_\\pi(\\cdot\\mid s_1) = [0, 1]$ and $P_\\pi(\\cdot\\mid s_2) = [1, 0]$, and you initialize $v_0 = [0, 0]^\\top$. What is $v_2$ after two synchronous sweeps?",
              "choices": [
                "$v_2 = [2.0,\\ 1.0]^\\top$",
                "$v_2 = [4.0,\\ 0.0]^\\top$",
                "$v_2 = [2.0,\\ 0.0]^\\top$",
                "$v_2 = [2.5,\\ 1.0]^\\top$"
              ],
              "answer": 0,
              "explain": "Sweep 1 from $v_0=[0,0]$: $v_1(s_1)=2+0.5\\cdot v_0(s_2)=2$, $v_1(s_2)=0+0.5\\cdot v_0(s_1)=0$, so $v_1=[2,0]$. Sweep 2: $v_2(s_1)=2+0.5\\cdot v_1(s_2)=2$, $v_2(s_2)=0+0.5\\cdot v_1(s_1)=0.5\\cdot 2=1$, so $v_2=[2,1]$. Choice $[2.0,0.0]$ is just $v_1$—the result of stopping after a single sweep rather than completing the second one."
            },
            {
              "q": "In policy iteration, the greedy improvement step sets $\\pi'(s) = \\arg\\max_a \\big[ R(s,a) + \\gamma \\sum_{s'} P(s'\\mid s,a)\\, v_\\pi(s') \\big]$ where $v_\\pi$ is the value of the OLD policy $\\pi$. A student objects that this is circular, since $v_\\pi$ does not reflect the new policy's behavior. What is the correct response?",
              "choices": [
                "The objection is valid; one must first compute $v_{\\pi'}$ before defining $\\pi'$, so the formula as written is wrong.",
                "Using $v_\\pi$ is intentional: it makes $\\pi'$ greedy with respect to the old policy's values, and the policy improvement theorem guarantees $v_{\\pi'} \\ge v_\\pi$ regardless.",
                "It only works if $v_\\pi$ is replaced by $v_*$, the optimal value function, otherwise no improvement is guaranteed.",
                "The values $v_\\pi$ must be recomputed after every single state's update within the improvement step to avoid bias."
              ],
              "answer": 1,
              "explain": "Greedy improvement deliberately uses the old policy's $v_\\pi$; the policy improvement theorem proves the resulting $\\pi'$ satisfies $v_{\\pi'}\\ge v_\\pi$, so it is not circular. Requiring $v_*$ (choice 2) would assume you already solved the problem, defeating the purpose of iteration."
            },
            {
              "q": "A common misconception is that the discount factor $\\gamma$ is merely a 'preference for sooner rewards' with no other role. In iterative policy evaluation, what additional, essential mathematical role does $\\gamma \\in [0,1)$ play?",
              "choices": [
                "It normalizes the reward so that all state values lie in $[0,1]$.",
                "It ensures each sweep visits every state exactly once, guaranteeing a synchronous update.",
                "It makes the Bellman expectation operator a $\\gamma$-contraction in the max-norm, which is what guarantees convergence to a unique fixed point.",
                "It guarantees the transition matrix $P_\\pi$ becomes stochastic, which is required for the matrix inverse to exist."
              ],
              "answer": 2,
              "explain": "With $\\gamma<1$ the Bellman expectation operator is a contraction with modulus $\\gamma$ in the max-norm, so by the Banach fixed-point theorem the iterates converge geometrically to the unique $v_\\pi$. Choice 0 is false (values can exceed 1), and $P_\\pi$ is already stochastic independent of $\\gamma$ (choice 3)."
            },
            {
              "q": "Suppose two distinct deterministic policies $\\pi$ and $\\pi'$ happen to share the exact same state-value function, i.e. $v_\\pi = v_{\\pi'}$ at every state. If you run one greedy policy-improvement step starting from $v_\\pi$, which conclusion is justified?",
              "choices": [
                "The improvement step must fail to produce a valid policy because the $\\arg\\max$ is ambiguous between $\\pi$ and $\\pi'$.",
                "Greedy improvement from $v_\\pi$ yields a policy whose value is at least $v_\\pi$, and if both $\\pi$ and $\\pi'$ are already greedy w.r.t. $v_\\pi$ then this shared value is optimal, $v_\\pi = v_*$.",
                "Sharing a value function is impossible for two distinct policies, so the premise cannot occur.",
                "The two policies must differ in value at some state, so the premise contradicts the Bellman expectation equation."
              ],
              "answer": 1,
              "explain": "Greedy improvement always returns a policy with value $\\ge v_\\pi$ (policy improvement theorem). If improvement returns a policy with the same value (a fixed point), the Bellman optimality equation is satisfied, so $v_\\pi=v_*$. Distinct policies can indeed share a value function (e.g. ties in the $\\arg\\max$), so choice 2 is false."
            },
            {
              "q": "What does <em>policy evaluation</em> compute?",
              "choices": [
                "It searches for the single best action to take in each state",
                "The state-value function $v_\\pi$ of a <em>fixed</em> policy $\\pi$ — how much return that policy earns from each state — by iterating the Bellman expectation backup to convergence",
                "It updates the policy to be greedy with respect to the current values",
                "It estimates the environment's transition probabilities from sampled data"
              ],
              "answer": 1,
              "explain": "Policy evaluation answers \"how good is <em>this</em> policy?\" — it computes $v_\\pi$ for a fixed $\\pi$. Because $v_\\pi$ is the fixed point of the Bellman expectation operator $T^\\pi$, you can reach it by applying the backup $v_{k+1}=T^\\pi v_k$ repeatedly from any start."
            },
            {
              "q": "In policy iteration, what does the <em>policy-improvement</em> step do?",
              "choices": [
                "Re-runs policy evaluation with a smaller discount factor",
                "Averages the values of all actions in each state",
                "Adds noise to the policy to encourage exploration",
                "Builds a new policy that acts greedily with respect to the current value function: $\\pi'(s)=\\arg\\max_a\\big[R(s,a)+\\gamma\\sum_{s'}P(s'\\mid s,a)\\,v_\\pi(s')\\big]$"
              ],
              "answer": 3,
              "explain": "Improvement makes the policy greedy w.r.t. the value of the current policy. The policy-improvement theorem guarantees this new $\\pi'$ is at least as good as $\\pi$ everywhere — so alternating evaluation and improvement can only climb."
            },
            {
              "q": "What is <em>policy iteration</em>?",
              "choices": [
                "Alternating policy evaluation and greedy policy improvement, repeating until the policy stops changing — at which point it is optimal",
                "Running a single Bellman expectation backup once and stopping",
                "Randomly trying many policies and keeping the best one seen",
                "Estimating values from Monte-Carlo rollouts with no model"
              ],
              "answer": 0,
              "explain": "Policy iteration loops: evaluate $\\pi$ → improve to $\\pi'$ → evaluate $\\pi'$ → … For a finite MDP it converges to an optimal policy in finitely many steps; when an improvement step returns the same policy, the Bellman optimality equation holds and you are done."
            },
            {
              "q": "Dynamic programming (policy/value iteration) is called <em>planning</em> rather than <em>learning</em>. Why?",
              "choices": [
                "Because it uses a neural network to approximate the value function",
                "Because it only works on continuous state spaces",
                "Because it assumes the dynamics $P(s'\\mid s,a)$ and reward $R$ are fully known — it computes a solution from the model rather than learning from sampled experience",
                "Because the agent must physically act in the environment to gather rewards"
              ],
              "answer": 2,
              "explain": "DP needs a <em>model</em>: the transition and reward functions are given, so it solves the MDP by computation. Model-free methods (Monte-Carlo, TD, Q-learning — the next module) instead <em>learn</em> from sampled experience, with no access to $P$ or $R$."
            }
          ],
          "flashcards": [
            {
              "front": "Write the Bellman expectation backup (the policy-evaluation update).",
              "back": "$v_{k+1}(s) = \\sum_a \\pi(a|s)\\big[R(s,a) + \\gamma \\sum_{s'} P(s'|s,a)\\, v_k(s')\\big]$. Equivalently $v_{k+1} \\leftarrow T^\\pi v_k$; its fixed point is $v_\\pi$."
            },
            {
              "front": "What property of $T^\\pi$ guarantees policy evaluation converges, and how fast?",
              "back": "$T^\\pi$ is a $\\gamma$-contraction in the max-norm: $\\|T^\\pi u - T^\\pi v\\|_\\infty \\le \\gamma\\|u-v\\|_\\infty$. By Banach, the fixed point $v_\\pi$ is unique and error shrinks geometrically: $\\|v_k - v_\\pi\\|_\\infty \\le \\gamma^k\\|v_0 - v_\\pi\\|_\\infty$."
            },
            {
              "front": "Define the greedy policy with respect to $v_\\pi$.",
              "back": "$\\pi'(s) = \\arg\\max_a q_\\pi(s,a) = \\arg\\max_a [R(s,a) + \\gamma \\sum_{s'} P(s'|s,a)\\, v_\\pi(s')]$. It optimizes only the first action, assuming $\\pi$ is followed afterward."
            },
            {
              "front": "State the Policy Improvement Theorem.",
              "back": "If $q_\\pi(s,\\pi'(s)) \\ge v_\\pi(s)$ for all $s$, then $v_{\\pi'}(s) \\ge v_\\pi(s)$ for all $s$. The greedy policy satisfies the premise, so greedy improvement never makes the policy worse."
            },
            {
              "front": "Why does policy iteration terminate in finitely many iterations on a finite MDP?",
              "back": "Improvement is monotone ($v_{\\pi_{k+1}} \\ge v_{\\pi_k}$) and there are only finitely many deterministic policies ($|A|^{|S|}$). The values strictly increase at every policy change, so over a finite set the process must stop — and it can only stop at the Bellman optimality fixed point, i.e. the optimal policy."
            },
            {
              "front": "What happens when a policy-improvement step leaves the policy unchanged?",
              "back": "Then $v_\\pi(s) = \\max_a q_\\pi(s,a)$ for all $s$ — the Bellman optimality equation. So $v_\\pi = v_*$ and the policy is optimal. Improvement cannot halt at any suboptimal policy."
            }
          ],
          "homework": [
            {
              "prompt": "Consider a 2-state MDP $\\{A, B\\}$ with one action per state (so $\\pi$ is fixed and trivial). From $A$ you get reward $+1$ and go to $B$; from $B$ you get reward $0$ and stay in $B$. Use $\\gamma = 0.9$. Run iterative policy evaluation starting from $v_0(A)=v_0(B)=0$ for three sweeps, and also compute the exact fixed point $v_\\pi$ in closed form.",
              "hint": "$B$ is a self-loop, so its value is a geometric series you can sum directly. Once you know $v_\\pi(B)$, $v_\\pi(A)$ is a single backup away. For the iterative part, apply $v(s) \\leftarrow R(s) + \\gamma v(\\text{next})$ each sweep.",
              "solution": "Exact: $v_\\pi(B) = 0 + 0.9\\,v_\\pi(B) \\Rightarrow v_\\pi(B)(1-0.9)=0 \\Rightarrow v_\\pi(B)=0$. Then $v_\\pi(A) = 1 + 0.9\\,v_\\pi(B) = 1 + 0 = 1$. So $v_\\pi = (1, 0)$.\nIterative sweeps (synchronous, using old values on the RHS):\n- $v_0 = (0,0)$.\n- Sweep 1: $v_1(A)=1+0.9\\cdot v_0(B)=1$; $v_1(B)=0+0.9\\cdot v_0(B)=0$. $v_1=(1,0)$.\n- Sweep 2: $v_2(A)=1+0.9\\cdot v_1(B)=1$; $v_2(B)=0+0.9\\cdot v_1(B)=0$. $v_2=(1,0)$.\n- Sweep 3: unchanged, $v_3=(1,0)$.\nIt converges in one sweep here because $B$'s reward is 0 and its successor value starts at 0; in general convergence is geometric, not one-shot."
            },
            {
              "prompt": "On the 1x4 corridor from the worked example ([S0|S1|S2|G], reward $-1$ per step, $\\gamma=1$, deterministic moves, left wall blocks, $G$ terminal with $v(G)=0$), suppose someone proposes the policy $\\pi = [\\text{Right}, \\text{Left}, \\text{Right}, -]$. (a) Evaluate it exactly. (b) Perform one policy-improvement step and state the resulting policy. (c) Is the original $\\pi$ optimal? Justify using the result of (b).",
              "hint": "For (a), trace the actual trajectory from each start state until it reaches G (or cycles). Watch S1: it points Left to S0, but S0 points Right back to S1 — that's a 2-cycle that never reaches G. For (b), compute $q(s,a) = -1 + v_\\pi(\\text{next})$ for both actions in each non-terminal state and take the argmax.",
              "solution": "(a) Evaluation. From S2: Right -> G, return $-1$, so $v_\\pi(S2) = -1$. From S0: Right -> S1; from S1: Left -> S0 -> ... S0 and S1 form an infinite 2-cycle that never reaches G, accumulating $-1$ forever, so $v_\\pi(S0) = v_\\pi(S1) = -\\infty$. Thus $v_\\pi = [-\\infty, -\\infty, -1, 0]$.\n(b) Improvement, $q(s,a) = -1 + v_\\pi(\\text{next})$:\n- S2: Right -> G: $-1+0 = -1$; Left -> S1: $-1+(-\\infty)=-\\infty$. Greedy = Right.\n- S1: Right -> S2: $-1+(-1) = -2$; Left -> S0: $-1+(-\\infty) = -\\infty$. Greedy = Right.\n- S0: Right -> S1: $-1+(-\\infty)=-\\infty$; Left -> S0: $-1+(-\\infty)=-\\infty$. Tie (both diverge under this $v_\\pi$); a subsequent round, once S1 is fixed to Right, resolves S0 to Right.\nResulting policy after this step: $[\\,\\cdot, \\text{Right}, \\text{Right}, -]$ with S1 and S2 now Right (S0 to be resolved next round). \n(c) The original $\\pi$ is NOT optimal: improvement strictly changed S1 from Left to Right (and S1's value jumps from $-\\infty$ to a finite number), so by the policy improvement theorem the new policy is strictly better. A policy is optimal only when greedy improvement leaves it unchanged. Continuing policy iteration yields $\\pi_* = [\\text{Right},\\text{Right},\\text{Right},-]$ with $v_* = [-3,-2,-1,0]$."
            },
            {
              "prompt": "Prove that the Bellman expectation operator $T^\\pi$ is a $\\gamma$-contraction in the max-norm, i.e. $\\|T^\\pi u - T^\\pi v\\|_\\infty \\le \\gamma \\|u - v\\|_\\infty$ for all value vectors $u, v$. Then explain in one sentence what this buys you.",
              "hint": "Write out $(T^\\pi u)(s) - (T^\\pi v)(s)$; the reward and $\\pi$-weighting terms are identical for $u$ and $v$, so they subtract away, leaving only $\\gamma$ times a weighted average of $(u(s')-v(s'))$. Use that a probability-weighted average is bounded by the maximum.",
              "solution": "For any state $s$:\n$(T^\\pi u)(s) - (T^\\pi v)(s) = \\sum_a \\pi(a|s)\\big[R(s,a)+\\gamma\\sum_{s'}P(s'|s,a)u(s')\\big] - \\sum_a \\pi(a|s)\\big[R(s,a)+\\gamma\\sum_{s'}P(s'|s,a)v(s')\\big]$.\nThe $R(s,a)$ terms cancel, leaving $\\gamma \\sum_a \\pi(a|s)\\sum_{s'}P(s'|s,a)\\,(u(s')-v(s'))$.\nTaking absolute values and using the triangle inequality plus the fact that $\\pi(\\cdot|s)$ and $P(\\cdot|s,a)$ are non-negative and sum to 1 (so the double sum is a convex combination):\n$|(T^\\pi u)(s) - (T^\\pi v)(s)| \\le \\gamma \\sum_a \\pi(a|s)\\sum_{s'}P(s'|s,a)\\,|u(s')-v(s')| \\le \\gamma \\max_{s'}|u(s')-v(s')| = \\gamma\\|u-v\\|_\\infty$.\nThis holds for every $s$, so taking the max over $s$ on the left gives $\\|T^\\pi u - T^\\pi v\\|_\\infty \\le \\gamma\\|u-v\\|_\\infty$. \nWhat it buys you: by the Banach fixed-point theorem, $T^\\pi$ has a unique fixed point $v_\\pi$ and iterative policy evaluation converges to it geometrically from any starting point ($\\|v_k - v_\\pi\\|_\\infty \\le \\gamma^k\\|v_0 - v_\\pi\\|_\\infty$)."
            }
          ],
          "examples": [
            {
              "title": "Iterative policy evaluation on a two-state chain",
              "body": "Consider an MDP with states $\\mathcal{S}=\\{A, B\\}$ and $\\gamma = 0.9$. Under the fixed policy $\\pi$ the dynamics are deterministic: from $A$ you get reward $R=2$ and go to $B$; from $B$ you get reward $R=0$ and stay in $B$ ($B$ is absorbing). Starting from the initial guess $v_0(A)=v_0(B)=0$, run iterative policy evaluation for three sweeps and report the values, then compare to the exact fixed point.",
              "solution": "Iterative policy evaluation repeatedly applies the Bellman expectation backup. Because $\\pi$ is deterministic and the transitions are deterministic, the per-state update collapses to\n$$v_{k+1}(s) = R(s,\\pi(s)) + \\gamma\\, v_k\\big(s'(s)\\big),$$\nwhere $s'(s)$ is the unique successor. The two update rules are:\n$$v_{k+1}(A) = 2 + 0.9\\, v_k(B), \\qquad v_{k+1}(B) = 0 + 0.9\\, v_k(B).$$\n\n<strong>Sweep 1</strong> (using $v_0(A)=v_0(B)=0$):\n$$v_1(A) = 2 + 0.9(0) = 2, \\qquad v_1(B) = 0.9(0) = 0.$$\nArray $[v(A),v(B)] = [2,\\,0]$.\n\n<strong>Sweep 2</strong> (using $v_1$):\n$$v_2(A) = 2 + 0.9(0) = 2, \\qquad v_2(B) = 0.9(0) = 0.$$\nArray $[2,\\,0]$.\n\n<strong>Sweep 3</strong> (using $v_2$):\n$$v_3(A) = 2 + 0.9(0) = 2, \\qquad v_3(B) = 0.9(0) = 0.$$\nArray $[2,\\,0]$.\n\nThe values stopped changing after sweep 1, so we have converged. We can check against the exact fixed point. State $B$ satisfies $v_\\pi(B) = 0 + 0.9\\,v_\\pi(B)$, which forces $v_\\pi(B)(1-0.9)=0$, i.e. $v_\\pi(B)=0$. Then $v_\\pi(A) = 2 + 0.9\\,v_\\pi(B) = 2$.\n\n<strong>Answer:</strong> $v_\\pi(A)=2,\\ v_\\pi(B)=0$, reached after a single sweep here because $B$ is absorbing with zero reward and $A$'s value depends only on $B$."
            },
            {
              "title": "One full step of policy iteration on a 1-D corridor",
              "body": "States $\\mathcal{S}=\\{1,2,3\\}$ lie on a line; state $3$ is a terminal goal with value $0$. Actions are $\\mathcal{A}=\\{\\text{L},\\text{R}\\}$ (move left/right, deterministic; moving left out of state $1$ stays in $1$). Every non-terminal transition gives reward $R=-1$; $\\gamma=1$. Start from the bad policy $\\pi_0$ that always moves Left. Evaluate $\\pi_0$, then do one policy-improvement step and show the policy changes.",
              "solution": "<strong>Step 1 — Policy evaluation of $\\pi_0$ (\"always Left\").</strong> Under $\\pi_0$: from state $2$ you go to $1$ ($R=-1$); from state $1$ you stay in $1$ ($R=-1$); state $3$ is terminal with $v(3)=0$. The Bellman expectation equations (with $\\gamma=1$) are:\n$$v_{\\pi_0}(1) = -1 + v_{\\pi_0}(1), \\qquad v_{\\pi_0}(2) = -1 + v_{\\pi_0}(1).$$\nThe equation for state $1$ is $v(1) = -1 + v(1)$, which has *no finite solution*: forever bouncing in state $1$ accrues $-1$ per step, so $v_{\\pi_0}(1) = -\\infty$ and likewise $v_{\\pi_0}(2) = -\\infty$. (Numerically, iterative evaluation drives these values down without bound: after $k$ sweeps $v_k(1)=-k$.) Record $v_{\\pi_0} = [-\\infty,\\, -\\infty,\\, 0]$ for states $[1,2,3]$.\n\n<strong>Step 2 — Policy improvement (act greedily w.r.t. $v_{\\pi_0}$).</strong> For each state pick $\\arg\\max_a \\big[R(s,a) + \\gamma\\, v_{\\pi_0}(s')\\big]$.\n\nState $2$: \n- Action R goes to terminal $3$: $q(2,\\text{R}) = -1 + v_{\\pi_0}(3) = -1 + 0 = -1$. \n- Action L goes to $1$: $q(2,\\text{L}) = -1 + v_{\\pi_0}(1) = -1 + (-\\infty) = -\\infty$. \nGreedy choice: $\\pi_1(2) = \\text{R}$ (since $-1 > -\\infty$). This *differs* from $\\pi_0(2)=\\text{L}$.\n\nState $1$: \n- Action R goes to $2$: $q(1,\\text{R}) = -1 + v_{\\pi_0}(2) = -\\infty$. \n- Action L stays in $1$: $q(1,\\text{L}) = -1 + v_{\\pi_0}(1) = -\\infty$. \nBoth are $-\\infty$ under this evaluation, so a tie; the greedy step may keep $\\text{L}$ here. That is fine — the improvement theorem only guarantees the new policy is no worse, and state $2$ has already strictly improved.\n\n<strong>Step 3 — Why this is progress.</strong> The improved policy $\\pi_1$ now reaches the goal from state $2$ in one step ($v_{\\pi_1}(2)=-1$, finite), a strict improvement over $-\\infty$. Re-evaluating $\\pi_1$ and improving again will fix state $1$ (it will prefer R toward the now-finite state $2$), giving the optimal $\\pi_*(1)=\\pi_*(2)=\\text{R}$ with $v_*(1)=-2,\\ v_*(2)=-1,\\ v_*(3)=0$.\n\n<strong>Answer:</strong> One policy-iteration step turns \"always Left\" into a policy that moves Right at state $2$ ($\\pi_1(2)=\\text{R}$), strictly improving $v(2)$ from $-\\infty$ to $-1$ — a concrete demonstration of the policy-improvement theorem en route to the optimal corridor policy."
            }
          ]
        },
        {
          "id": "rl-value-iteration",
          "title": "Value Iteration and Generalized Policy Iteration",
          "minutes": 14,
          "content": "<h3>From Policy Iteration to Value Iteration</h3>\n<p>In the previous lesson we met <strong>policy iteration</strong>: a two-phase loop that alternates between <em>policy evaluation</em> (compute $v_\\pi$ for the current policy $\\pi$) and <em>policy improvement</em> (act greedily with respect to $v_\\pi$ to get a better policy $\\pi'$). It is elegant and provably converges to an optimal policy in a finite number of iterations for a finite MDP. But it hides an awkward inefficiency: each evaluation step is itself an iterative process — we sweep the state space repeatedly, applying the Bellman expectation backup until $v_\\pi$ converges, only to then throw most of that precision away when we make a greedy improvement.</p>\n<p>This invites a natural question: <em>do we really need to evaluate the policy to convergence before improving it?</em> The answer is no — and pursuing that answer leads us to <strong>value iteration</strong> and, more broadly, to the unifying principle of <strong>Generalized Policy Iteration (GPI)</strong> that sits at the heart of nearly all of reinforcement learning.</p>\n\n<h3>The Bellman Optimality Equation</h3>\n<p>Recall the two flavors of Bellman equation. For a fixed policy $\\pi$, the value function satisfies the <strong>Bellman expectation equation</strong>:</p>\n$$v_\\pi(s) = \\sum_a \\pi(a\\mid s)\\sum_{s',r} p(s',r\\mid s,a)\\big[r + \\gamma\\, v_\\pi(s')\\big].$$\n<p>The <strong>optimal</strong> value function $v_*$, on the other hand, satisfies the <strong>Bellman optimality equation</strong>, in which the expectation over actions is replaced by a maximization:</p>\n$$v_*(s) = \\max_a \\sum_{s',r} p(s',r\\mid s,a)\\big[r + \\gamma\\, v_*(s')\\big] = \\max_a q_*(s,a).$$\n<p>Intuitively, an optimal value is obtained by acting optimally for one step (the $\\max_a$) and then continuing optimally thereafter (the $\\gamma\\, v_*(s')$ inside). This is a fixed-point equation: $v_*$ is the unique function that is left unchanged by the right-hand side operation.</p>\n\n<h3>Value Iteration: The Algorithm</h3>\n<p>Value iteration simply turns the Bellman optimality equation into an <em>update rule</em>. We define the <strong>Bellman optimality backup operator</strong> $T_*$ acting on any value function $v$:</p>\n$$(T_* v)(s) \\;\\doteq\\; \\max_a \\sum_{s',r} p(s',r\\mid s,a)\\big[r + \\gamma\\, v(s')\\big],$$\n<p>and we iterate $v_{k+1} = T_* v_k$ starting from an arbitrary $v_0$. Written out as a per-state assignment, one sweep is:</p>\n<pre><code>Initialize v(s) arbitrarily for all s (e.g. 0), set v(terminal)=0\nrepeat\n    delta = 0\n    for each state s:\n        v_old = v(s)\n        v(s) = max_a  sum_{s',r} p(s',r | s,a) [ r + gamma * v(s') ]\n        delta = max(delta, |v_old - v(s)|)\nuntil delta < theta          # theta: small convergence threshold\n\n# Extract a deterministic greedy policy at the end:\npi(s) = argmax_a  sum_{s',r} p(s',r | s,a) [ r + gamma * v(s') ]</code></pre>\n<p>Notice what is <em>missing</em>: there is no separate policy. We never explicitly evaluate a policy to convergence. We just repeatedly apply the optimality backup to the values themselves, and only at the very end read off a greedy policy.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Value iteration is policy iteration with the inner evaluation loop <strong>truncated to a single sweep</strong>. Each pass does one step of (partial) evaluation <em>and</em> a greedy improvement, fused into a single $\\max$. Instead of \"evaluate fully, then improve,\" it does \"improve a little, evaluate a little, repeat\" — and the two collapse into one operation because the $\\max_a$ is exactly the greedy improvement.</p>\n</div>\n\n<h4>Why the fusion works</h4>\n<p>Compare the two backups. The Bellman <em>expectation</em> backup for a fixed greedy policy would (a) pick the greedy action, then (b) back up its value. The Bellman <em>optimality</em> backup does both at once: the $\\max_a$ <em>is</em> the act of choosing the greedy action, and the bracketed term <em>is</em> the one-step backup. So a single value-iteration sweep is mathematically identical to: take the policy that is greedy w.r.t. the current $v_k$, do exactly one sweep of its evaluation, and call the result $v_{k+1}$. That is \"truncated policy iteration\" made precise.</p>\n\n<h3>Why It Converges: Contraction Mapping</h3>\n<p>The convergence of value iteration is not hand-waving — it is a direct consequence of the Banach fixed-point theorem. The key fact is that $T_*$ is a <strong>$\\gamma$-contraction in the max-norm</strong> (sup-norm), $\\|v\\|_\\infty = \\max_s |v(s)|$. That is, for any two value functions $u$ and $v$:</p>\n$$\\|T_* u - T_* v\\|_\\infty \\;\\le\\; \\gamma\\,\\|u - v\\|_\\infty.$$\n\n<h4>Proof sketch of the contraction</h4>\n<p>Fix a state $s$. Using the elementary inequality $|\\max_a f(a) - \\max_a g(a)| \\le \\max_a |f(a) - g(a)|$,</p>\n$$\\big|(T_* u)(s) - (T_* v)(s)\\big| \\le \\max_a \\Big| \\sum_{s',r} p(s',r\\mid s,a)\\,\\gamma\\big[u(s') - v(s')\\big]\\Big| \\le \\gamma \\max_a \\sum_{s'} p(s'\\mid s,a)\\,\\|u-v\\|_\\infty = \\gamma\\,\\|u-v\\|_\\infty,$$\n<p>since the reward terms cancel and the transition probabilities sum to one. Taking the max over $s$ gives the result.</p>\n<p>Because $0 \\le \\gamma < 1$, $T_*$ shrinks distances. Banach's theorem then guarantees: (1) $T_*$ has a <strong>unique</strong> fixed point — which is exactly $v_*$ — and (2) iterating $T_*$ from <em>any</em> starting point converges to it, <strong>geometrically</strong>:</p>\n$$\\|v_k - v_*\\|_\\infty \\le \\gamma^k\\,\\|v_0 - v_*\\|_\\infty.$$\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters</div>\n<p>The contraction property is one of the most important facts in all of RL. It is the reason bootstrapping (estimating values from other estimates) does not spiral out of control: the discount $\\gamma$ acts as a damping factor that pulls every estimate toward the true value at a guaranteed rate $\\gamma$ per sweep. The same argument underlies the convergence of TD(0), Q-learning (in the tabular case), and asynchronous variants — they are all stochastic or partial approximations of applying a contraction.</p>\n</div>\n\n<h3>Generalized Policy Iteration (GPI)</h3>\n<p>Step back and notice that policy iteration and value iteration are two points on a spectrum. Both maintain a value function and a policy; both repeatedly let evaluation make the value consistent with the policy, and let improvement make the policy greedy w.r.t. the value. They differ only in <em>how much</em> evaluation they do between improvements:</p>\n<ul>\n<li><strong>Policy iteration</strong>: evaluate to convergence (many sweeps), then improve.</li>\n<li><strong>Value iteration</strong>: do exactly one evaluation sweep, then improve — fused into one $\\max$.</li>\n<li><strong>Anything in between</strong> (e.g. $k$ sweeps of evaluation per improvement, \"modified policy iteration\") also works.</li>\n</ul>\n<p><strong>Generalized Policy Iteration</strong> is the umbrella term for <em>any</em> scheme that lets these two processes — making the value consistent with the policy, and making the policy greedy w.r.t. the value — interact, regardless of the granularity or order. Almost every RL method, model-based or model-free, tabular or with function approximation, is an instance of GPI.</p>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>Think of two competing-yet-cooperating forces. Evaluation drives the value function toward $v_\\pi$ (consistency with the current policy). Improvement drives the policy toward greedy (consistency with the current values). Each tends to <em>break</em> the other's goal — a newly greedy policy is no longer correctly evaluated; a freshly updated value makes the old policy no longer greedy. Yet they have a common fixed point: when neither can change anything, the value satisfies the Bellman <em>optimality</em> equation and the policy is greedy w.r.t. it. That joint fixed point is optimality. This evaluation/improvement tension is the conceptual engine behind actor-critic methods, SARSA, Q-learning, and policy-gradient algorithms alike.</p>\n</div>\n\n<h3>Asynchronous Dynamic Programming</h3>\n<p>The pseudocode above performs <em>synchronous</em> sweeps: it computes all new values from the old values, then swaps them in. This is conceptually clean but wasteful — it requires two copies of the value array and forces you to update every state the same number of times, even states that barely matter.</p>\n<p><strong>Asynchronous DP</strong> relaxes this. It updates states <em>in place</em> and <em>in any order</em>, using whatever values are currently available (including ones updated earlier in the same pass). Remarkably, convergence still holds, provided every state continues to be selected for update infinitely often (so none is starved). Common variants:</p>\n<ul>\n<li><strong>In-place value iteration</strong>: a single array, updated state-by-state; later updates in a sweep already see earlier ones, which often speeds convergence (a Gauss–Seidel effect).</li>\n<li><strong>Prioritized sweeping</strong>: maintain a priority queue keyed by the Bellman error (the magnitude of a state's would-be change); always update the state whose value is most \"out of date,\" and propagate to its predecessors. This focuses computation where it changes the most.</li>\n<li><strong>Real-time DP</strong>: only update the states the agent actually visits as it interacts, concentrating effort on the relevant part of the state space.</li>\n</ul>\n<p>Asynchronous DP matters because it lets us <em>interleave</em> planning with acting and to direct scarce computation at the states that matter — the philosophical bridge from textbook DP toward practical, large-scale RL.</p>\n\n<h3>A Fully Worked Example</h3>\n<p>Consider a tiny deterministic gridworld: a 1-D corridor of four states $S_0, S_1, S_2, S_3$. State $S_3$ is a terminal <em>goal</em>. From any non-terminal state the agent may go <code>Left</code> or <code>Right</code> (deterministically; trying to move past an end keeps you in place). Every transition gives reward $-1$ (we want to reach the goal quickly); reaching $S_3$ ends the episode. Use $\\gamma = 1$ (episodic, undiscounted — the contraction argument still applies because episodes terminate).</p>\n<p>Initialize $v_0(s) = 0$ for all $s$, with $v(S_3) = 0$ fixed. The backup is $v(s) = \\max_a [\\,-1 + v(\\text{next}(s,a))\\,]$.</p>\n<p><strong>Sweep 1</strong> (synchronous, all from $v_0$):</p>\n<ul>\n<li>$S_0$: Right $\\to S_1$: $-1+0=-1$; Left $\\to S_0$: $-1+0=-1$. Max $=-1$.</li>\n<li>$S_1$: Right $\\to S_2$: $-1+0=-1$; Left $\\to S_0$: $-1$. Max $=-1$.</li>\n<li>$S_2$: Right $\\to S_3$: $-1+0=-1$; Left $\\to S_1$: $-1$. Max $=-1$.</li>\n</ul>\n<p>So $v_1 = [-1, -1, -1, 0]$.</p>\n<p><strong>Sweep 2</strong> (from $v_1$):</p>\n<ul>\n<li>$S_2$: Right $\\to S_3$: $-1+0=-1$; Left $\\to S_1$: $-1+(-1)=-2$. Max $=-1$.</li>\n<li>$S_1$: Right $\\to S_2$: $-1+(-1)=-2$; Left $\\to S_0$: $-1+(-1)=-2$. Max $=-2$.</li>\n<li>$S_0$: Right $\\to S_1$: $-1+(-1)=-2$; Left $\\to S_0$: $-2$. Max $=-2$.</li>\n</ul>\n<p>So $v_2 = [-2, -2, -1, 0]$.</p>\n<p><strong>Sweep 3</strong> (from $v_2$):</p>\n<ul>\n<li>$S_2$: Right: $-1$; Left: $-1+(-2)=-3$. Max $=-1$.</li>\n<li>$S_1$: Right: $-1+(-1)=-2$; Left: $-1+(-2)=-3$. Max $=-2$.</li>\n<li>$S_0$: Right: $-1+(-2)=-3$; Left: $-3$. Max $=-3$.</li>\n</ul>\n<p>So $v_3 = [-3, -2, -1, 0]$. A fourth sweep produces no change ($\\delta = 0$), so we have converged: $v_* = [-3, -2, -1, 0]$, which is exactly \"negative distance to the goal.\" Reading off the greedy policy: from $S_0, S_1, S_2$ go <code>Right</code> — the shortest path, as expected.</p>\n<p>Two pedagogical observations. First, information propagates <em>one state per sweep</em> outward from the goal — that is the geometric \"wavefront\" of value iteration, and it is why the number of sweeps to convergence scales with the diameter of the problem. Second, a word of caution about asynchronous DP: in this particular corridor, in-place updates give <em>no</em> speedup, because the value information has to flow leftward from the goal while every state's \"stay-in-place\" option (Left at the boundary $S_0$, or simply revisiting a not-yet-lowered neighbor) keeps the wrong action looking attractive until the wavefront physically arrives. In fact one can check that <em>no</em> single in-place sweep — in any order — reaches the converged values here; like the synchronous version, in-place value iteration still needs three sweeps. The well-known Gauss–Seidel speedup of in-place updates appears when the sweep order follows the direction in which information actually flows <em>and</em> no competing self-transition masks the improvement; this small symmetric example happens to lack that structure, a useful reminder that the speedup is problem-dependent rather than automatic.</p>\n\n<h3>The Limitations of Dynamic Programming</h3>\n<p>Value iteration and policy iteration are exact and beautifully principled, but they buy that rigor with two demanding assumptions.</p>\n<h4>1. A known model is required</h4>\n<p>Every backup contains the term $\\sum_{s',r} p(s',r\\mid s,a)[\\,\\cdot\\,]$. DP needs the full transition dynamics $p(s',r\\mid s,a)$ in advance — it is a <strong>planning</strong> method, not a <strong>learning</strong> method. In most real problems (a robot, a game from pixels, a recommender) we do not have $p$; we only get samples by interacting. This gap is precisely what model-free RL (Monte Carlo, TD, Q-learning) was invented to close: those methods replace the exact expected backup with <em>sampled</em> backups, trading the model for experience.</p>\n<h4>2. The curse of dimensionality</h4>\n<p>Each sweep touches every state and, per state, every action and every possible successor: cost on the order of $O(|S|^2 |A|)$ per sweep (or $O(|S||A|)$ when each action has few possible successors). The catch is that $|S|$ grows <em>exponentially</em> with the number of state variables. A problem with $d$ features each taking $n$ values has $|S| = n^d$ states. Backgammon has $\\sim 10^{20}$ states; Go has $\\sim 10^{170}$. Enumerating the state space — even once — is hopeless. Coined by Richard Bellman himself, this is the <strong>curse of dimensionality</strong>.</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Connection to ML</div>\n<p>Both limitations point straight at modern reinforcement learning. We defeat the <em>curse of dimensionality</em> by replacing the tabular value array with a <strong>function approximator</strong> $\\hat v(s;\\mathbf{w})$ — a linear model or a deep neural network — that generalizes across states it has never enumerated. We defeat the <em>known-model</em> requirement with <strong>sample-based</strong> backups. Deep Q-Networks, for instance, are essentially value iteration where the exact $T_*$ backup becomes a stochastic-gradient step toward a sampled Bellman-optimality target $r + \\gamma \\max_{a'} \\hat q(s',a';\\mathbf{w})$. Understanding value iteration as \"applying a contraction\" is exactly what lets you reason about when these approximations remain stable — and when, as with the infamous \"deadly triad,\" they do not.</p>\n</div>\n\n<h3>Summary</h3>\n<ul>\n<li><strong>Value iteration</strong> iterates the Bellman <em>optimality</em> backup $v_{k+1} = T_* v_k$; it equals policy iteration with evaluation truncated to one sweep, fusing evaluation and improvement into a single $\\max_a$.</li>\n<li>$T_*$ is a $\\gamma$-contraction in the max-norm, so iteration converges geometrically to the unique fixed point $v_*$: $\\|v_k - v_*\\|_\\infty \\le \\gamma^k \\|v_0 - v_*\\|_\\infty$.</li>\n<li><strong>GPI</strong> is the general principle: let evaluation and improvement interact at any granularity; their joint fixed point is optimality.</li>\n<li><strong>Asynchronous DP</strong> (in-place, prioritized sweeping, real-time DP) updates states in any order and focuses computation where it helps most; its speedup over synchronous sweeps is real but problem-dependent.</li>\n<li>DP's twin limitations — a <strong>known model</strong> and the <strong>curse of dimensionality</strong> — motivate model-free, function-approximation-based reinforcement learning.</li>\n</ul>\n<h4>Interactive — explore it</h4>\n<div data-viz=\"rl-gridworld\"></div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why value iteration <em>always</em> converges — the Bellman operator is a contraction</summary>\n<p>Value iteration is the single rule $V_{k+1} = T V_k$ applied over and over, where the <strong>Bellman optimality operator</strong> $T$ acts on a value function by $(T V)(s) = \\max_a \\big[ r(s,a) + \\gamma \\sum_{s'} P(s'\\mid s,a)\\, V(s') \\big]$. Why should hammering an arbitrary starting guess with $T$ land you on $V^\\star$?</p>\n<p>The reason is one inequality: $T$ is a <strong>$\\gamma$-contraction</strong> in the max-norm. For <em>any</em> two value functions $U, V$, $$\\lVert TU - TV \\rVert_\\infty \\le \\gamma\\, \\lVert U - V \\rVert_\\infty.$$ Each application of $T$ pulls any two value estimates at least a factor $\\gamma < 1$ closer together. Intuitively the $\\max$ and the probability-weighted sum are both non-expansive (they can't stretch differences), and the discount $\\gamma$ strictly shrinks them — so disagreements about the far future are discounted away faster than they can pile up.</p>\n<p>Now invoke the <strong>Banach fixed-point theorem</strong>: a contraction on a complete space has exactly one fixed point, and iterating it from <em>anywhere</em> converges to that point geometrically. The fixed point of $T$ is precisely $V^\\star$ (it solves $V^\\star = TV^\\star$, the Bellman optimality equation), so $V_k \\to V^\\star$ regardless of where you start, with error falling like $\\lVert V_k - V^\\star\\rVert_\\infty \\le \\gamma^k \\lVert V_0 - V^\\star\\rVert_\\infty$.</p>\n<p>This is the bedrock under all of dynamic programming. Policy evaluation uses the operator $T^\\pi$ (no $\\max$, just the action $\\pi$ picks), which is <em>also</em> a $\\gamma$-contraction with fixed point $V^\\pi$ — so the same theorem guarantees it too. It also explains a practical annoyance: a discount $\\gamma$ near $1$ makes the contraction weak, so convergence crawls — the horizon you care about and the speed you converge are in direct tension.</p>\n</details>\n<h4>Try it in code</h4>\n<p>A value-iteration sweep applies the Bellman optimality update to each state: <code>V(s) ← max over actions of [reward + γ·V(next)]</code>. Run one update and watch the <em>patient</em> action win:</p>\n<div data-code=\"javascript\" data-expected=\"9.0\">// One Bellman optimality update: V(s) = max over actions of (reward + gamma * V(next)).\nfunction bellman(actions, gamma) {\n  var best = -Infinity;\n  for (var i = 0; i &lt; actions.length; i++) {\n    var q = actions[i].r + gamma * actions[i].vNext;   // this action's value\n    if (q &gt; best) best = q;\n  }\n  return best;\n}\n// action A: reward 0, lands on a state worth 10;  action B: reward 1, lands on a state worth 5\nvar V = bellman([{ r: 0, vNext: 10 }, { r: 1, vNext: 5 }], 0.9);\nconsole.log(V.toFixed(1));   // 9.0 -- patience (0 + 0.9*10) beats the quick point (1 + 0.9*5)</div>\n",
          "mcq": [
            {
              "q": "Which statement best captures the relationship between value iteration and policy iteration?",
              "choices": [
                "Value iteration is policy iteration with the policy-evaluation step truncated to a single sweep, with the greedy improvement folded into the $\\max_a$ of the backup",
                "Value iteration evaluates the policy to convergence between improvements, while policy iteration does only one sweep",
                "Value iteration uses the Bellman expectation backup, while policy iteration uses the Bellman optimality backup",
                "Value iteration never improves the policy; it only evaluates a fixed random policy"
              ],
              "answer": 0,
              "explain": "Value iteration truncates evaluation to one sweep and fuses it with greedy improvement via the $\\max_a$; full evaluation-to-convergence is policy iteration's behavior, not value iteration's."
            },
            {
              "q": "The Bellman optimality operator $T_*$ satisfies $\\|T_* u - T_* v\\|_\\infty \\le \\gamma \\|u-v\\|_\\infty$. What does this contraction property directly guarantee?",
              "choices": [
                "That value iteration converges in exactly one sweep regardless of $\\gamma$",
                "That $T_*$ has a unique fixed point $v_*$ and that iterating $T_*$ from any $v_0$ converges to it geometrically at rate $\\gamma$",
                "That the optimal policy is always stochastic",
                "That convergence requires the initial values to be set to the true $v_*$"
              ],
              "answer": 1,
              "explain": "A $\\gamma$-contraction with $\\gamma<1$ satisfies the Banach fixed-point theorem: a unique fixed point ($v_*$) that is reached from any starting point with error shrinking by a factor $\\gamma$ each sweep."
            },
            {
              "q": "What are the two fundamental limitations of dynamic programming for solving MDPs?",
              "choices": [
                "It requires a stochastic policy and only works for $\\gamma=1$",
                "It cannot handle negative rewards and requires deterministic transitions",
                "It requires a known model $p(s',r\\mid s,a)$ and suffers the curse of dimensionality (cost grows with $|S|$, which is exponential in the number of state variables)",
                "It only converges for episodic tasks and cannot extract a greedy policy"
              ],
              "answer": 2,
              "explain": "DP backups contain the exact expectation over $p$, so the model must be known (planning, not learning); and every sweep enumerates the state space, whose size explodes exponentially with state dimensionality."
            },
            {
              "q": "In asynchronous (in-place) dynamic programming, which condition is sufficient to preserve convergence to $v_*$?",
              "choices": [
                "States must be updated strictly in the order $s_0, s_1, \\ldots$ every sweep",
                "Every state must continue to be selected for update infinitely often (no state is permanently starved)",
                "Two copies of the value array must be maintained and swapped each sweep",
                "The policy must be evaluated to convergence before any value is changed"
              ],
              "answer": 1,
              "explain": "Asynchronous DP allows updates in any order and in place; convergence is preserved as long as no state is starved — each is revisited infinitely often. Maintaining two arrays and swapping is the synchronous approach."
            },
            {
              "q": "Value iteration can be viewed as a special case of policy iteration in which each policy-evaluation phase is truncated. How many sweeps of policy evaluation does this truncation correspond to before each improvement step?",
              "choices": [
                "Exactly one sweep",
                "Zero sweeps (no evaluation at all)",
                "Sweeps until $v_\\pi$ fully converges",
                "A number that grows with the iteration index $k$"
              ],
              "answer": 0,
              "explain": "Value iteration is equivalent to policy iteration where policy evaluation is stopped after just a single sweep, after which a greedy improvement is implicitly folded into the same $\\max_a$ update."
            },
            {
              "q": "In the value iteration update $(T_* v)(s) = \\max_a \\sum_{s',r} p(s',r\\mid s,a)[r + \\gamma\\, v(s')]$, what is the key structural difference from the Bellman expectation backup used in policy evaluation?",
              "choices": [
                "The $\\max_a$ replaces the expectation $\\sum_a \\pi(a\\mid s)$ over actions",
                "It omits the discount factor $\\gamma$",
                "It sums over actions instead of over next states",
                "It uses $v(s)$ rather than $v(s')$ inside the bracket"
              ],
              "answer": 0,
              "explain": "The optimality backup maximizes over actions ($\\max_a$) instead of averaging them under a fixed policy's distribution $\\pi(a\\mid s)$, which is exactly what turns evaluation into optimization."
            },
            {
              "q": "During the intermediate iterations of value iteration, the value function $v_k$ produced by the updates generally...",
              "choices": [
                "does not correspond to the value function of any particular policy",
                "always equals $v_\\pi$ for the current greedy policy $\\pi$",
                "is guaranteed to be an upper bound on $v_*$",
                "stays constant until the final iteration"
              ],
              "answer": 0,
              "explain": "Because each sweep applies a $\\max_a$ that may pick different actions across states and iterations, the intermediate $v_k$ need not be the true value of any single policy, even though it converges to $v_*$."
            },
            {
              "q": "Generalized Policy Iteration (GPI) is described as sitting at the heart of nearly all reinforcement learning. What is the essential idea GPI abstracts?",
              "choices": [
                "Any interleaving of policy-evaluation and policy-improvement processes that push toward each other converges to optimality",
                "Policy evaluation must always be run to full convergence before any improvement",
                "Improvement and evaluation must operate on disjoint subsets of states",
                "The value function must be initialized to the optimal value to guarantee convergence"
              ],
              "answer": 0,
              "explain": "GPI is the general principle that letting evaluation and improvement processes interact and mutually adjust, regardless of granularity or ordering, drives both the value function and policy toward their optimal, mutually consistent fixed point."
            },
            {
              "q": "Consider a single state $s$ with two deterministic actions. Action $a_1$ gives reward $1$ and leads to a state with current estimated value $v(s_1)=10$; action $a_2$ gives reward $4$ and leads to a state with $v(s_2)=5$. With $\\gamma=0.9$, what is the value-iteration update $(T_* v)(s)$, and which action is greedy?",
              "choices": [
                "$10.0$, taking action $a_1$",
                "$8.5$, taking action $a_2$",
                "$9.25$, averaging the two actions",
                "$8.5$, taking action $a_1$"
              ],
              "answer": 0,
              "explain": "Value iteration takes the max over actions: $a_1$ gives $1+0.9\\cdot10=10.0$ and $a_2$ gives $4+0.9\\cdot5=8.5$. The max is $10.0$ via $a_1$. The tempting distractor $8.5$ comes from being lured by the larger immediate reward of $a_2$, ignoring the discounted future value, and averaging is wrong because $T_*$ uses $\\max$, not an expectation over actions."
            },
            {
              "q": "After value iteration has converged to (approximately) $v_*$, how is the optimal policy $\\pi_*$ obtained?",
              "choices": [
                "It is read off directly as a byproduct, since value iteration explicitly maintains and updates a policy at every sweep",
                "By performing one final greedy extraction: $\\pi_*(s)=\\arg\\max_a \\sum_{s',r} p(s',r\\mid s,a)[r+\\gamma\\, v_*(s')]$",
                "By running policy evaluation on $v_*$ to recover the action probabilities",
                "By normalizing $v_*(s)$ into a probability distribution over actions"
              ],
              "answer": 1,
              "explain": "Value iteration only tracks a value function; the optimal policy is recovered after convergence by a single greedy (argmax) one-step lookahead. It does not maintain an explicit policy during its sweeps, which distinguishes it from policy iteration."
            },
            {
              "q": "A student claims: \"In value iteration, the intermediate value function $v_k$ is the true value $v_{\\pi_k}$ of the greedy policy $\\pi_k$ implied at iteration $k$.\" Why is this claim wrong?",
              "choices": [
                "Because $v_k$ is the value of the optimal policy $v_*$ at every iteration, not of $\\pi_k$",
                "Because $v_k$ is generally not the value of any policy at all — it is just an intermediate iterate of the operator $T_*$ and need not equal $v_{\\pi_k}$",
                "Because the greedy policy $\\pi_k$ changes every sweep, so $v_{\\pi_k}$ is undefined",
                "Because $v_k$ underestimates $v_{\\pi_k}$ by exactly a factor of $\\gamma$ each sweep"
              ],
              "answer": 1,
              "explain": "Each $v_k$ is just the result of applying $T_*$ to $v_0$ $k$ times; it is an estimate converging to $v_*$ but is generally not the exact value function of any policy. Truly evaluating the greedy policy $\\pi_k$ would require running policy evaluation to convergence, which value iteration deliberately skips."
            },
            {
              "q": "In Generalized Policy Iteration, evaluation and improvement are described as two processes that simultaneously cooperate and compete. In what sense do they 'compete'?",
              "choices": [
                "Improvement makes the policy greedy w.r.t. the current value, which typically makes that value an incorrect (over-optimistic) estimate of the new policy, so evaluation must work to catch up",
                "Evaluation and improvement run on separate copies of the value function that must later be reconciled by averaging",
                "They compete for computational budget, and only the faster one is allowed to run each iteration",
                "Improvement decreases the value function while evaluation increases it, and equilibrium is where they cancel"
              ],
              "answer": 0,
              "explain": "Greedifying changes the policy, so the value function (computed for the old policy) no longer matches the new policy — improvement 'breaks' evaluation's consistency, and evaluation then chases the moving target. They cooperate because both drive toward the same fixed point (the Bellman optimality equation), where the policy is greedy w.r.t. its own value."
            },
            {
              "q": "What does <em>value iteration</em> do?",
              "choices": [
                "It evaluates a fixed policy to convergence and then stops",
                "It samples trajectories and averages the observed returns",
                "It repeatedly applies the Bellman <em>optimality</em> backup (a $\\max_a$ over a one-step lookahead) to the values until they converge to $v_*$ — with no explicit policy maintained until the end",
                "It enumerates every possible policy and picks the best"
              ],
              "answer": 2,
              "explain": "Value iteration iterates $v_{k+1}=T_* v_k$ where $(T_* v)(s)=\\max_a\\sum_{s',r}p(s',r\\mid s,a)[r+\\gamma v(s')]$. The $\\max_a$ folds greedy improvement into the backup, so there is no separate evaluate-then-improve loop; you read off the greedy policy only at the end."
            },
            {
              "q": "What does the Bellman <em>optimality</em> equation say the optimal value $v_*(s)$ equals?",
              "choices": [
                "$\\max_a\\sum_{s',r}p(s',r\\mid s,a)\\big[r+\\gamma\\,v_*(s')\\big]$ — act optimally for one step, then continue optimally",
                "$\\sum_a \\pi(a\\mid s)\\big[\\dots\\big]$ — an average over a fixed policy's actions",
                "$R(s)$ — simply the immediate reward in state $s$",
                "$\\min_a\\big[\\dots\\big]$ — the value of the worst available action"
              ],
              "answer": 0,
              "explain": "The optimality equation replaces the expectation-over-the-policy with a <em>maximization</em> over actions: $v_*(s)=\\max_a q_*(s,a)$. That single $\\max$ is the difference from the Bellman <em>expectation</em> equation, and it is what makes $v_*$ describe optimal (not merely some policy's) behavior."
            },
            {
              "q": "What is <em>Generalized Policy Iteration</em> (GPI)?",
              "choices": [
                "A method that only works when the discount factor is exactly 1",
                "A way to evaluate a policy without any model of the environment",
                "A schedule for decaying the learning rate during training",
                "The general pattern of letting policy evaluation and policy improvement interact — at any granularity or order — until they converge to the optimal value and policy; nearly all of RL is an instance of it"
              ],
              "answer": 3,
              "explain": "GPI abstracts away <em>how much</em> you evaluate or improve each round. Policy iteration (evaluate fully) and value iteration (one sweep) are both special cases; Monte-Carlo and TD control are too. Evaluation makes the value consistent with the policy; improvement makes the policy greedy w.r.t. the value; together they converge."
            },
            {
              "q": "Value iteration's loop runs \"until $\\Delta<\\theta$.\" What is this stopping rule, and why is it sound?",
              "choices": [
                "Stop once the policy has been improved exactly $|\\mathcal{S}|$ times",
                "Stop when the largest value change over a sweep, $\\Delta=\\max_s|v_{\\text{new}}(s)-v_{\\text{old}}(s)|$, drops below a small threshold $\\theta$ — sound because the $\\gamma$-contraction bounds the remaining distance to $v_*$",
                "Stop when every state's value becomes exactly zero",
                "Stop when the discount factor $\\gamma$ reaches 1"
              ],
              "answer": 1,
              "explain": "Each sweep is a $\\gamma$-contraction, so consecutive iterates get geometrically closer to the unique fixed point $v_*$. A small max-change $\\Delta$ therefore certifies $v_k$ is close to $v_*$ (within $\\tfrac{\\gamma}{1-\\gamma}\\Delta$), giving a principled stopping test."
            }
          ],
          "flashcards": [
            {
              "front": "Write the Bellman optimality backup operator $T_*$ used by value iteration.",
              "back": "$(T_* v)(s) = \\max_a \\sum_{s',r} p(s',r\\mid s,a)\\,[\\,r + \\gamma\\, v(s')\\,]$. Value iteration repeats $v_{k+1} = T_* v_k$ until convergence, then extracts the greedy policy."
            },
            {
              "front": "How does value iteration relate to policy iteration?",
              "back": "It is policy iteration with policy evaluation truncated to a single sweep; the greedy improvement is fused into the $\\max_a$ of the optimality backup."
            },
            {
              "front": "What is the contraction property of $T_*$ and what does it imply?",
              "back": "$\\|T_* u - T_* v\\|_\\infty \\le \\gamma \\|u - v\\|_\\infty$ (a $\\gamma$-contraction in the max-norm). By Banach's theorem it has a unique fixed point $v_*$, reached geometrically: $\\|v_k - v_*\\|_\\infty \\le \\gamma^k \\|v_0 - v_*\\|_\\infty$."
            },
            {
              "front": "What is Generalized Policy Iteration (GPI)?",
              "back": "The umbrella principle that lets policy evaluation (make values consistent with the policy) and policy improvement (make the policy greedy w.r.t. values) interact at any granularity/order. Their joint fixed point is optimality; nearly all RL methods are instances of it."
            },
            {
              "front": "What is asynchronous DP and when does it still converge?",
              "back": "DP that updates states in place and in any order using currently available values (e.g. in-place VI, prioritized sweeping, real-time DP). It converges to $v_*$ provided every state continues to be updated infinitely often."
            },
            {
              "front": "What are DP's two key limitations, and how does RL address each?",
              "back": "(1) Requires a known model $p(s',r\\mid s,a)$ -> addressed by sample-based (model-free) backups like TD/Q-learning. (2) Curse of dimensionality, since $|S|$ is exponential in state variables -> addressed by function approximation (e.g. neural nets) that generalizes across states."
            }
          ],
          "homework": [
            {
              "prompt": "Implement one synchronous value-iteration update (a single sweep) for this small MDP. States: $\\{A, B, C\\}$ with $C$ terminal ($v(C)=0$). Actions from $A$: 'right' -> $B$ (reward $-1$, deterministic); 'stay' -> $A$ (reward $-1$). Actions from $B$: 'right' -> $C$ (reward $+5$, deterministic); 'left' -> $A$ (reward $-1$). Use $\\gamma = 0.9$ and start from $v_0(A)=v_0(B)=v_0(C)=0$. Compute $v_1(A)$ and $v_1(B)$ using the Bellman optimality backup, and give the resulting greedy action at each state.",
              "hint": "For each non-terminal state apply $v_1(s) = \\max_a [\\,r(s,a) + \\gamma\\, v_0(s')\\,]$. Since all $v_0 = 0$, the $\\gamma v_0(s')$ terms vanish on this first sweep, so you are just maximizing the immediate rewards.",
              "solution": "Backup $v_1(s) = \\max_a [r(s,a) + 0.9\\, v_0(s')]$, with all $v_0 = 0$.\nState $A$: 'right' gives $-1 + 0.9\\cdot v_0(B) = -1 + 0 = -1$; 'stay' gives $-1 + 0.9\\cdot v_0(A) = -1$. So $v_1(A) = \\max(-1,-1) = -1$ (greedy action: either, say 'right').\nState $B$: 'right' gives $+5 + 0.9\\cdot v_0(C) = 5$; 'left' gives $-1 + 0.9\\cdot v_0(A) = -1$. So $v_1(B) = \\max(5,-1) = 5$ (greedy action: 'right').\nResult after sweep 1: $v_1 = [A:-1,\\; B:5,\\; C:0]$. (A second sweep would then give $v_2(A) = \\max(-1+0.9\\cdot5,\\,-1+0.9\\cdot(-1)) = \\max(3.5,-1.9)=3.5$, showing value propagating back from $B$ to $A$.)"
            },
            {
              "prompt": "Prove that the Bellman optimality operator $T_*$ is a $\\gamma$-contraction in the max-norm, i.e. show $\\|T_* u - T_* v\\|_\\infty \\le \\gamma \\|u - v\\|_\\infty$ for any two value functions $u, v$. Then state precisely what this implies about value iteration's convergence.",
              "hint": "Use the inequality $|\\max_a f(a) - \\max_a g(a)| \\le \\max_a |f(a) - g(a)|$ at a fixed state $s$. Notice the reward terms are identical in $T_* u$ and $T_* v$, so they cancel, and the transition probabilities for a fixed action sum to 1.",
              "solution": "Fix a state $s$. By definition $(T_* u)(s) - (T_* v)(s) = \\max_a Q_u(s,a) - \\max_a Q_v(s,a)$ where $Q_w(s,a) = \\sum_{s',r} p(s',r\\mid s,a)[r + \\gamma w(s')]$. Apply $|\\max_a f - \\max_a g| \\le \\max_a |f - g|$:\n$|(T_* u)(s) - (T_* v)(s)| \\le \\max_a |Q_u(s,a) - Q_v(s,a)|$.\nThe reward terms cancel, leaving $Q_u(s,a) - Q_v(s,a) = \\gamma \\sum_{s'} p(s'\\mid s,a)[u(s') - v(s')]$. Bounding the bracket by its sup-norm:\n$|Q_u(s,a) - Q_v(s,a)| \\le \\gamma \\sum_{s'} p(s'\\mid s,a)\\,\\|u-v\\|_\\infty = \\gamma\\,\\|u-v\\|_\\infty$,\nusing $\\sum_{s'} p(s'\\mid s,a) = 1$. This bound is uniform in $a$, so $|(T_* u)(s) - (T_* v)(s)| \\le \\gamma\\|u-v\\|_\\infty$. Taking the max over $s$ gives $\\|T_* u - T_* v\\|_\\infty \\le \\gamma\\|u-v\\|_\\infty$. \nImplication: since $0 \\le \\gamma < 1$, $T_*$ is a contraction, so by the Banach fixed-point theorem it has a unique fixed point $v_*$ and value iteration converges to it from any initialization, with error decaying geometrically: $\\|v_k - v_*\\|_\\infty \\le \\gamma^k \\|v_0 - v_*\\|_\\infty$."
            },
            {
              "prompt": "Policy iteration evaluates the current policy to convergence before each improvement, while value iteration improves after a single evaluation sweep. (a) Give one scenario where policy iteration converges in fewer iterations of the outer loop, and explain why this does not necessarily mean it is faster in wall-clock time. (b) Explain why 'modified policy iteration' (doing $k$ evaluation sweeps per improvement, $1 < k < \\infty$) can be a good practical compromise.",
              "hint": "Count total backups, not just outer-loop iterations. Each full evaluation in policy iteration is itself many sweeps. Think about what the extra evaluation sweeps buy you per improvement.",
              "solution": "(a) Policy iteration typically needs very few outer iterations because each greedy improvement is based on a fully accurate $v_\\pi$, so it can make large, well-informed policy changes; for small MDPs it often converges in a handful of policy updates. But each of those outer iterations hides a complete policy evaluation, which is itself an iterative process of many Bellman-expectation sweeps. Value iteration's outer 'iterations' are single cheap sweeps. So the right cost measure is the total number of backups: policy iteration's few outer steps can involve far more total backups than value iteration's many cheap sweeps, meaning fewer outer iterations does not imply less total computation or wall-clock time.\n(b) Modified policy iteration runs $k$ evaluation sweeps per improvement. With $k=1$ it is value iteration; with $k=\\infty$ it is policy iteration. Intermediate $k$ captures the benefits of both: a few evaluation sweeps make $v$ accurate enough that the greedy improvement is more informative than value iteration's single-sweep estimate (fewer wasted improvements), yet you avoid the cost of driving evaluation all the way to convergence each round. Empirically a moderate $k$ often minimizes total backups, which is why it is a common practical choice and why GPI is described as a spectrum rather than two discrete algorithms."
            }
          ],
          "examples": [
            {
              "title": "One Bellman backup",
              "body": "A non-terminal state's best action gives reward $r=0$ and lands (deterministically) in a state worth $V=10$. With $\\gamma=0.9$, what's the updated value?",
              "solution": "$V \\leftarrow r + \\gamma \\max_{a'} V(s') = 0 + 0.9\\cdot10 = 9$. Value iteration applies this backup to every state until the values stop changing."
            },
            {
              "title": "Why discount?",
              "body": "Why must $\\gamma<1$ for an infinite-horizon task?",
              "solution": "With $\\gamma<1$ the geometric series $\\sum_k \\gamma^k r$ converges to a finite return even over infinitely many steps, so values are well-defined and the iteration contracts to a unique fixed point."
            }
          ]
        }
      ]
    },
    {
      "id": "rl-model-free-prediction",
      "title": "Model-Free Prediction and Control",
      "lessons": [
        {
          "id": "rl-monte-carlo",
          "title": "Monte Carlo Methods",
          "minutes": 15,
          "content": "<h3>From Models to Samples</h3>\n<p>In dynamic programming we computed value functions by <em>sweeping</em> over the MDP using full knowledge of the transition dynamics $p(s', r \\mid s, a)$ and the reward function. That is a luxury we rarely have. The agent driving a car, playing Go, or running a recommender system does not possess the equations of its world — it only gets to <em>act</em> and <em>observe what happens</em>. <strong>Monte Carlo (MC) methods</strong> are the first family of algorithms in this course that learn purely from experience: they estimate value functions from sampled returns, with no model of the environment whatsoever.</p>\n<p>The name \"Monte Carlo\" — borrowed from the casino — signals the core idea: when you cannot compute an expectation analytically, you <em>average samples</em>. The value of a state is defined as an expectation,</p>\n$$v_\\pi(s) = \\mathbb{E}_\\pi\\!\\left[ G_t \\mid S_t = s \\right], \\qquad G_t = R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\cdots,$$\n<p>so the most direct possible estimator is simply: roll out the policy many times, collect the actual returns $G_t$ that followed visits to $s$, and average them. By the law of large numbers, that sample average converges to the true expectation.</p>\n<div class=\"callout sage\"><div class=\"c-tag\">Key fact</div><p>MC replaces the <em>bootstrapping</em> of DP and TD (\"estimate from other estimates\") with <em>real, complete returns</em>. It needs no model and makes no assumption about the Markov property of the state — it only assumes episodes <strong>terminate</strong>.</p></div>\n\n<h3>The Episode Requirement</h3>\n<p>A return $G_t$ is a sum that runs to the end of the episode. To compute even a single sample of $G_t$, you must wait until the episode actually finishes — you cannot evaluate $R_{t+1} + \\gamma R_{t+2} + \\cdots$ while it is still being generated. This has a sharp consequence:</p>\n<ul>\n  <li>MC applies only to <strong>episodic</strong> tasks — tasks that reach a terminal state (a finished game, a completed trip, a session that ends).</li>\n  <li>MC updates only at the <strong>end of an episode</strong>, not step by step: a return is available only once the episode has terminated. (This is exactly what temporal-difference learning will fix in the next lesson, by updating after every step.)</li>\n</ul>\n<p>For a continuing task with no terminal state, the return is an infinite sum and MC as stated cannot be applied.</p>\n\n<h3>First-Visit vs Every-Visit MC</h3>\n<p>Within a single episode, a state $s$ may be visited more than once. This raises a design question: when we average returns for $s$, do we use the return following <em>every</em> visit, or only the <em>first</em> visit in each episode? This gives the two classic variants.</p>\n<h4>First-visit MC</h4>\n<p>For each episode, find the <strong>first</strong> time step $t$ at which $s$ is visited, take the return $G_t$ from that point onward, and average these first-visit returns across episodes.</p>\n<h4>Every-visit MC</h4>\n<p>Take the return $G_t$ following <strong>every</strong> occurrence of $s$ within each episode, and average all of them across episodes.</p>\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>First-visit returns are <em>independent</em> across episodes (each comes from a different roll-out), which makes their statistics clean. Every-visit returns from the same episode are <em>correlated</em> (they overlap in time), which complicates the analysis but lets you reuse more data.</p></div>\n<p>Their statistical properties differ subtly:</p>\n<ul>\n  <li><strong>First-visit MC</strong> averages i.i.d. samples of $G_t$, so each estimate is an <em>unbiased</em> estimator of $v_\\pi(s)$, and by the law of large numbers it converges to $v_\\pi(s)$ as the number of first visits $\\to \\infty$. Its standard error falls like $1/\\sqrt{n}$.</li>\n  <li><strong>Every-visit MC</strong> is <em>biased</em> for finite samples (because within-episode returns are not independent), but the bias vanishes asymptotically; it too converges to $v_\\pi(s)$. It is the more natural variant to combine with function approximation and is often slightly more data-efficient.</li>\n</ul>\n<p>Both are correct in the limit. The distinction matters most in small-sample regimes and in proofs — and it is a favorite exam question, so make sure you can compute each by hand (see the worked example below).</p>\n\n<h3>The Incremental Mean Update</h3>\n<p>Storing every return and recomputing the average is wasteful. The sample mean admits a beautiful online form. If $\\bar{V}_n$ is the average of the first $n$ returns and the $n$-th return $G$ arrives,</p>\n$$\\bar{V}_{n} = \\bar{V}_{n-1} + \\frac{1}{n}\\left(G - \\bar{V}_{n-1}\\right).$$\n<p>This is the prototype of nearly every learning rule you will meet in RL and ML: <strong>new estimate = old estimate + step size × (target − old estimate)</strong>. The quantity $(G - \\bar{V}_{n-1})$ is an <em>error</em>, and we nudge our estimate toward the target $G$ in proportion to a step size.</p>\n<p>In code, for each state we keep a visit count $N(s)$ and a running value $V(s)$. After computing a return $G$ for a visit to $s$:</p>\n<pre><code>N(s) ← N(s) + 1\nV(s) ← V(s) + (1 / N(s)) · (G − V(s))</code></pre>\n<p>If instead of $1/N(s)$ we use a <strong>constant step size</strong> $\\alpha$,</p>\n$$V(s) \\leftarrow V(s) + \\alpha\\,(G - V(s)),$$\n<p>the estimate becomes an <em>exponentially weighted</em> moving average that gives more weight to recent returns. This is preferred in <strong>non-stationary</strong> problems (e.g. when the policy is still changing during control), because it never stops adapting — exactly the same reason a constant learning rate is used in online gradient descent.</p>\n\n<h3>From Prediction to Control</h3>\n<p>So far we have done <em>prediction</em>: evaluating a fixed policy $\\pi$. <strong>Control</strong> means improving the policy toward optimal. The general recipe is <em>generalized policy iteration</em> (GPI): alternate policy evaluation with greedy policy improvement.</p>\n<p>A crucial twist: with no model, we cannot improve a policy from $V(s)$ alone, because greedy improvement $\\pi'(s) = \\arg\\max_a \\sum_{s',r} p(s',r\\mid s,a)[r + \\gamma V(s')]$ needs the model $p$. The fix is to learn <strong>action values</strong> $Q(s,a)$ instead — then greedy improvement is model-free:</p>\n$$\\pi'(s) = \\arg\\max_a Q(s,a).$$\n<p>So MC control estimates $q_\\pi(s,a)$ by averaging returns following each <em>state–action</em> pair, then acts greedily with respect to $Q$.</p>\n\n<h3>The Exploration Problem</h3>\n<p>There is a catch hiding in \"act greedily.\" If the policy is deterministic and greedy, it only ever takes one action per state, so many $(s,a)$ pairs are <em>never visited</em> — and we can never estimate $Q$ for actions we never try. Without exploration, the agent can get permanently stuck on a suboptimal action it happened to like early. Two standard remedies:</p>\n<h4>Exploring starts (ES)</h4>\n<p>Begin each episode at a $(s,a)$ pair chosen so that <strong>every</strong> pair has nonzero probability of being a starting point. This guarantees, over many episodes, that all pairs are sampled. <em>Monte Carlo ES</em> alternates MC evaluation of $Q$ with greedy improvement and, under exploring starts plus infinite episodes, converges to the optimal policy.</p>\n<div class=\"callout\"><div class=\"c-tag\">Caveat</div><p>Exploring starts is clean in theory but often <em>unrealistic</em>: in many real environments you cannot arbitrarily teleport the agent into an arbitrary state and force an arbitrary first action (you can't restart a robot mid-air). Hence the second approach.</p></div>\n<h4>Epsilon-soft / epsilon-greedy policies</h4>\n<p>Keep exploration <em>inside</em> the policy. An <strong>$\\varepsilon$-soft</strong> policy assigns probability at least $\\varepsilon/|\\mathcal{A}(s)|$ to every action in every state. The canonical instance is <strong>$\\varepsilon$-greedy</strong>: with probability $1-\\varepsilon$ take the greedy action, and with probability $\\varepsilon$ pick uniformly at random among all actions. Formally,</p>\n$$\\pi(a\\mid s) = \\begin{cases} 1 - \\varepsilon + \\dfrac{\\varepsilon}{|\\mathcal{A}(s)|}, & a = \\arg\\max_{a'} Q(s,a') \\\\[2mm] \\dfrac{\\varepsilon}{|\\mathcal{A}(s)|}, & \\text{otherwise.} \\end{cases}$$\n<p>Because every action retains positive probability, all $(s,a)$ pairs keep getting visited without needing exploring starts. A key theoretical guarantee: greedy improvement <em>restricted to $\\varepsilon$-soft policies</em> is monotonic — the new $\\varepsilon$-greedy policy is at least as good as the old one with respect to $q_\\pi$. This is an <strong>on-policy</strong> method: we evaluate and improve the very policy used to generate the data, so the policy we learn is the best $\\varepsilon$-soft policy, not the truly optimal deterministic one. (Decaying $\\varepsilon \\to 0$ over time recovers optimality in the limit — this is the GLIE condition: Greedy in the Limit with Infinite Exploration.)</p>\n\n<h3>Worked Example: First-Visit vs Every-Visit</h3>\n<p>Consider a tiny episodic MDP with $\\gamma = 1$ (undiscounted). We observe two episodes; each line is a (state, reward-received-on-arrival) trace ending in terminal state $T$. Rewards shown are received on the transition <em>out of</em> the listed state.</p>\n<pre><code>Episode 1:  A,+1 → B,+0 → A,+2 → B,+1 → T\nEpisode 2:  B,+3 → A,+0 → T</code></pre>\n<p>We want $V(A)$ under both variants, with $\\gamma = 1$ so returns are plain sums of remaining rewards.</p>\n<p><strong>Episode 1 returns.</strong> Total rewards left after each visit:</p>\n<ul>\n  <li>$t=1$, visit to $A$: return $= 1 + 0 + 2 + 1 = 4$ &nbsp;(first visit of $A$)</li>\n  <li>$t=2$, visit to $B$: return $= 0 + 2 + 1 = 3$</li>\n  <li>$t=3$, visit to $A$: return $= 2 + 1 = 3$ &nbsp;(second visit of $A$)</li>\n  <li>$t=4$, visit to $B$: return $= 1$</li>\n</ul>\n<p><strong>Episode 2 returns.</strong></p>\n<ul>\n  <li>$t=1$, visit to $B$: return $= 3 + 0 = 3$</li>\n  <li>$t=2$, visit to $A$: return $= 0$ &nbsp;(first and only visit of $A$ this episode)</li>\n</ul>\n<p><strong>First-visit MC for $A$:</strong> use only the first visit of $A$ in each episode → returns $\\{4, 0\\}$.</p>\n$$V_{\\text{FV}}(A) = \\frac{4 + 0}{2} = 2.$$\n<p><strong>Every-visit MC for $A$:</strong> use all visits of $A$ → returns $\\{4, 3, 0\\}$ (two from episode 1, one from episode 2).</p>\n$$V_{\\text{EV}}(A) = \\frac{4 + 3 + 0}{3} = \\frac{7}{3} \\approx 2.33.$$\n<p>The two estimates differ because every-visit reused the second, correlated visit of $A$ in episode 1. With more data both would converge to the true $v_\\pi(A)$. Notice how mechanical the procedure is: compute returns from each visit, then decide which returns enter the average.</p>\n\n<h3>Bias and Variance: The Defining Trade-off</h3>\n<p>MC's signature property is that it is built on <em>full</em> returns, the actual definition of the value function. This gives it two faces.</p>\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>First-visit MC has <strong>zero bias</strong> — it is an unbiased estimator of $v_\\pi(s)$ — but <strong>high variance</strong>, because each return is a sum of many random rewards and random transitions across an entire episode. Temporal-difference methods invert this: they bootstrap (introducing bias) but use only one step of randomness (low variance). This bias–variance dial is one of the most important organizing ideas in all of RL, and it directly parallels the bias–variance trade-off in supervised learning.</p></div>\n<p>Why high variance? A single return depends on every action and stochastic transition until termination; long episodes compound many random quantities into one number. Why does this matter practically? It means MC can need many episodes to give stable estimates, and it cannot learn from incomplete episodes or in continuing tasks. The upsides are equally real: MC is <em>unbiased</em>, <em>simple</em>, <em>model-free</em>, robust to violations of the Markov property (it does not exploit the state's Markovness, so a non-Markov state representation hurts it less), and it naturally focuses computation on the states the policy actually visits.</p>\n\n<h3>Connections to ML and AI</h3>\n<ul>\n  <li>The update <em>new ← old + α(target − old)</em> is the same template as stochastic gradient descent on a squared error $\\tfrac12(G - V)^2$: the MC return $G$ is the regression target and $V$ the prediction. MC prediction is literally fitting a value function by Monte Carlo regression.</li>\n  <li>The first-visit-vs-every-visit and exploring-starts ideas resurface in modern policy-gradient methods (e.g. REINFORCE uses full MC returns as the signal) — MC is the conceptual ancestor of unbiased policy-gradient estimators, which also suffer from high variance and motivate variance-reduction tricks like baselines.</li>\n  <li>The exploration/exploitation tension introduced here ($\\varepsilon$-greedy, GLIE) is foundational to bandits, deep RL exploration strategies, and even active learning.</li>\n</ul>\n\n<h3>Summary</h3>\n<ul>\n  <li>MC learns value functions by <strong>averaging complete sampled returns</strong> — model-free, but requires <strong>terminating episodes</strong> and updates only at episode end.</li>\n  <li><strong>First-visit</strong> averages the first return per episode (unbiased); <strong>every-visit</strong> averages all returns (biased in finite samples). Both converge to $v_\\pi$.</li>\n  <li>The <strong>incremental mean</strong> $V \\leftarrow V + \\tfrac{1}{N}(G - V)$ (or constant $\\alpha$ for non-stationarity) gives an online update.</li>\n  <li><strong>Control</strong> uses $Q(s,a)$ (model-free greedy improvement) with exploration via <strong>exploring starts</strong> or <strong>$\\varepsilon$-soft</strong> policies; GLIE recovers optimality.</li>\n  <li>MC's identity: <strong>zero bias, high variance</strong> — the opposite end of the dial from TD.</li>\n</ul>\n<details class=\"deep-dive\">\n<summary>Deeper dive: Monte Carlo vs TD — \"wait for the truth\" or \"trust your own guess\"</summary>\n<p>Monte Carlo and temporal-difference learning are the two ways to estimate a value, and they sit at opposite ends of one trade-off. <b>Monte Carlo waits.</b> It plays a whole episode to the end, observes the <em>actual</em> return $G_t = r_{t+1} + \\gamma r_{t+2} + \\cdots$, and nudges $V(s_t)$ toward that real number. No guessing — but you must wait for the episode to finish, and the return swings wildly from run to run (every random reward along the way is baked in). That's <b>unbiased but high-variance</b>.</p>\n<p><b>TD trusts its own estimate.</b> After a single step it updates toward $r_{t+1} + \\gamma V(s_{t+1})$ — the reward it just saw plus its <em>current guess</em> for the rest. This is <b>bootstrapping</b>: an estimate built on another estimate. It can learn online, mid-episode, and the target barely fluctuates — but if $V(s_{t+1})$ is wrong, that error leaks into the update. That's <b>low-variance but biased</b>.</p>\n<p>The \"aha\": the whole MC-to-TD spectrum is just <em>how far you look before you start trusting your own value function</em>. Look all the way to the end $\\Rightarrow$ Monte Carlo. Look one step $\\Rightarrow$ TD(0). Look $n$ steps, or blend every horizon with a decay $\\lambda$ $\\Rightarrow$ $n$-step returns and TD($\\lambda$). MC needs episodes that terminate; TD does not — which is exactly why bootstrapping methods dominate continuing, long-horizon control.</p>\n</details>\n",
          "mcq": [
            {
              "q": "Using the episodes below with $\\gamma=1$, what is the first-visit MC estimate of $V(A)$?<br><code>Ep1: A,+1 → B,+0 → A,+2 → T</code><br><code>Ep2: A,+4 → T</code>",
              "choices": [
                "$3.5$",
                "$4.5$",
                "$3.0$",
                "$5.0$"
              ],
              "answer": 0,
              "explain": "First visit of A in Ep1 gives return $1+0+2=3$; Ep2 gives $4$. Average $=(3+4)/2=3.5$. (Every-visit would also include the second A in Ep1 with return $2$, giving $(3+2+4)/3=3$.)"
            },
            {
              "q": "Why must Monte Carlo prediction wait until an episode terminates before updating?",
              "choices": [
                "Because the return $G_t$ is a sum of rewards extending to the end of the episode and cannot be computed beforehand",
                "Because the Markov property only holds at terminal states",
                "Because the policy can only be evaluated once per episode by definition",
                "Because bootstrapping requires the next state's value, available only at termination"
              ],
              "answer": 0,
              "explain": "MC uses the actual complete return $G_t=R_{t+1}+\\gamma R_{t+2}+\\cdots$, which is unknown until the episode ends. MC notably does NOT bootstrap — that is TD."
            },
            {
              "q": "Which statement about first-visit vs every-visit MC is correct?",
              "choices": [
                "First-visit MC is unbiased; every-visit MC is biased in finite samples but both converge to $v_\\pi$",
                "Every-visit MC is unbiased while first-visit MC is biased",
                "Both are biased and neither converges to $v_\\pi$",
                "They always produce identical estimates regardless of sample size"
              ],
              "answer": 0,
              "explain": "First-visit averages i.i.d. returns (unbiased); every-visit reuses correlated within-episode returns (biased for finite n), yet both are consistent and converge to $v_\\pi$."
            },
            {
              "q": "In MC control, why do we estimate action values $Q(s,a)$ rather than state values $V(s)$?",
              "choices": [
                "Greedy policy improvement from $V$ alone would require the transition model $p$, which is unavailable model-free",
                "$Q$ has lower variance than $V$",
                "$V$ cannot be estimated by Monte Carlo at all",
                "$Q$ removes the need for any exploration"
              ],
              "answer": 0,
              "explain": "Improving a policy greedily from $V$ needs $\\arg\\max_a \\sum p(s',r|s,a)[r+\\gamma V(s')]$, i.e. the model. With $Q$, greedy improvement is just $\\arg\\max_a Q(s,a)$ — fully model-free."
            },
            {
              "q": "An agent runs MC control where the policy keeps changing between episodes, making the target returns non-stationary. Compared with the $\\tfrac{1}{N(s)}$ averaging rule, what does replacing it with a constant step size $\\alpha$ in $V(s)\\leftarrow V(s)+\\alpha\\,(G-V(s))$ achieve?",
              "choices": [
                "It produces an exponentially weighted average that keeps weighting recent returns, so the estimate never stops adapting",
                "It makes the estimate converge to the exact sample mean of all returns ever seen",
                "It eliminates the variance of the return $G$ entirely",
                "It removes the need to wait for episodes to terminate"
              ],
              "answer": 0,
              "explain": "A constant $\\alpha$ weights recent returns exponentially more than old ones (old returns decay by $(1-\\alpha)$ each step), so the estimate keeps tracking a moving target — ideal for non-stationary control. The $\\tfrac{1}{N(s)}$ rule instead gives the exact equal-weighted sample mean."
            },
            {
              "q": "Relative to temporal-difference learning, what is the signature bias–variance profile of first-visit Monte Carlo?",
              "choices": [
                "Zero bias but high variance, because a full return aggregates the randomness of every reward and transition until termination",
                "High bias but low variance, because it bootstraps from current estimates",
                "Both low bias and low variance, which is why it dominates TD in every setting",
                "Zero bias and zero variance, since it uses the exact definition of the value function"
              ],
              "answer": 0,
              "explain": "MC averages complete returns, which are unbiased estimates of the value (zero bias), but each return compounds randomness across an entire episode (high variance) — the opposite end of the dial from bootstrapping TD, which is biased but lower-variance."
            },
            {
              "q": "In a state with $|\\mathcal{A}(s)|=4$ actions and $\\varepsilon=0.2$, under the $\\varepsilon$-greedy policy what probability is assigned to the single greedy action?",
              "choices": [
                "$0.85$",
                "$0.80$",
                "$0.95$",
                "$0.20$"
              ],
              "answer": 0,
              "explain": "The greedy action gets $1-\\varepsilon+\\varepsilon/|\\mathcal{A}(s)| = 0.8 + 0.2/4 = 0.8+0.05 = 0.85$; each of the three non-greedy actions gets $\\varepsilon/|\\mathcal{A}(s)|=0.05$, and $0.85+3(0.05)=1$."
            },
            {
              "q": "Why are $\\varepsilon$-soft policies often preferred over exploring starts as the exploration mechanism in MC control?",
              "choices": [
                "Exploring starts requires being able to begin episodes from arbitrary state–action pairs, which is unrealistic in many real environments, whereas $\\varepsilon$-soft keeps exploration inside the policy",
                "$\\varepsilon$-soft policies are guaranteed to converge to the optimal deterministic policy while exploring starts is not",
                "Exploring starts cannot guarantee that every $(s,a)$ pair is eventually visited",
                "$\\varepsilon$-soft policies remove the need to estimate $Q(s,a)$ at all"
              ],
              "answer": 0,
              "explain": "You usually cannot teleport an agent into an arbitrary $(s,a)$ pair to start an episode, so $\\varepsilon$-soft policies sustain exploration on-policy without that assumption. (By definition exploring starts do guarantee every $(s,a)$ is visited, and $\\varepsilon$-soft converges only to the best $\\varepsilon$-soft policy, not a deterministic optimum.)"
            },
            {
              "q": "An agent wants to evaluate a target policy $\\pi$ while collecting episodes from a different behavior policy $b$. Using ordinary importance sampling, each return $G_t$ is weighted by $\\rho_{t:T-1}=\\prod_{k=t}^{T-1}\\frac{\\pi(A_k\\mid S_k)}{b(A_k\\mid S_k)}$. For this estimator of $v_\\pi(s)$ to be valid, which condition on $b$ is required?",
              "choices": [
                "$b$ must be the greedy policy with respect to the current $Q$ estimates",
                "$b(a\\mid s)>0$ whenever $\\pi(a\\mid s)>0$ (coverage)",
                "$b$ must equal $\\pi$ on at least half of all states",
                "$b$ must be deterministic so that each $\\rho_{t:T-1}$ equals $0$ or $1$"
              ],
              "answer": 1,
              "explain": "Importance sampling requires the assumption of coverage: every action the target policy can take must have nonzero probability under the behavior policy, otherwise some returns can never be sampled and the estimate is biased. If $b$ were deterministic it would generally violate coverage for a stochastic $\\pi$, and $b$ need not equal or be greedy w.r.t. $\\pi$."
            },
            {
              "q": "In MC control with an $\\varepsilon$-greedy behavior policy, why is letting $\\varepsilon$ decay toward $0$ over time (e.g. $\\varepsilon_k=1/k$) important for convergence to the optimal policy?",
              "choices": [
                "It guarantees every episode terminates faster, reducing return variance",
                "It removes the need to average returns, since later estimates are exact",
                "It maintains enough exploration that all actions are tried infinitely often, while ensuring the policy becomes greedy in the limit",
                "It makes the returns stationary so a constant step size is no longer needed"
              ],
              "answer": 2,
              "explain": "This is the GLIE idea (Greedy in the Limit with Infinite Exploration): a fixed $\\varepsilon>0$ keeps exploring forever but stays $\\varepsilon$-soft (never fully greedy), so decaying $\\varepsilon$ to $0$ lets the policy approach the true greedy optimum while still visiting every action infinitely often. Decaying $\\varepsilon$ does not speed termination or make estimates exact, and it actually makes the target more non-stationary, not less."
            },
            {
              "q": "You maintain a running MC estimate of $V(s)$ using the incremental form $V(s)\\leftarrow V(s)+\\frac{1}{N(s)}\\big(G-V(s)\\big)$. Currently $V(s)=10$ with $N(s)=4$ (four returns averaged so far). A fifth episode visits $s$ and yields return $G=20$. What is the updated $V(s)$?",
              "choices": [
                "$15$",
                "$11$",
                "$12$",
                "$14$"
              ],
              "answer": 2,
              "explain": "After the new visit $N(s)=5$, so $V(s)\\leftarrow 10+\\frac{1}{5}(20-10)=10+2=12$, which equals the true mean of the five returns. Choosing $15$ wrongly averages only the old mean and the new return as $(10+20)/2$; $11$ and $14$ are simply incorrect values that do not match the incremental average (note that mistakenly using the old $N=4$ would instead give $10+\\frac{1}{4}(20-10)=12.5$)."
            },
            {
              "q": "For which of the following tasks is plain Monte Carlo prediction LEAST suitable as described in this lesson?",
              "choices": [
                "A continuing task with no terminal state, where interaction never ends",
                "An episodic game like Blackjack where each hand ends in a win or loss",
                "A gridworld navigation task that always reaches a goal or trap state",
                "A simulated maze where every rollout eventually terminates"
              ],
              "answer": 0,
              "explain": "MC methods average complete returns and therefore require episodes that terminate; in a purely continuing task there is no episode boundary at which the return $G_t$ becomes available, so plain MC cannot form an update. The other three are all episodic tasks with guaranteed termination, exactly where MC applies."
            },
            {
              "q": "What is the core idea of Monte Carlo prediction?",
              "choices": [
                "Estimate $v_\\pi(s)$ by averaging the actual returns $G_t$ observed after visits to $s$ across many sampled episodes — a sample mean standing in for the expectation",
                "Sweep all states using the known transition probabilities $p(s'\\mid s,a)$",
                "Bootstrap each state's value from the estimated value of the next state",
                "Fit a neural network to predict the immediate reward at each step"
              ],
              "answer": 0,
              "explain": "$v_\\pi(s)=\\mathbb{E}_\\pi[G_t\\mid S_t=s]$ is an expectation, so the most direct estimator is to roll out the policy, collect the actual returns following $s$, and average them. By the law of large numbers that sample average converges to $v_\\pi(s)$."
            },
            {
              "q": "What does it mean that Monte Carlo methods are <em>model-free</em>?",
              "choices": [
                "They use a smaller discount factor than dynamic programming",
                "They require the full transition and reward model to be known in advance",
                "They learn purely from sampled experience (episodes the agent actually generates), needing no model of the transition dynamics or reward function",
                "They only work in deterministic environments"
              ],
              "answer": 2,
              "explain": "Unlike dynamic programming, which needs $p(s',r\\mid s,a)$, MC just acts and observes. It estimates values straight from the returns it experiences — exactly the situation of an agent that does not possess the equations of its world."
            },
            {
              "q": "Monte Carlo prediction notably does <em>not</em> rely on the Markov property. What does it assume instead?",
              "choices": [
                "That the environment is deterministic",
                "Only that episodes terminate, so a complete return $G_t$ can actually be observed",
                "That the transition probabilities are known",
                "That the state space is finite and small"
              ],
              "answer": 1,
              "explain": "Because MC averages whole observed returns rather than bootstrapping off a state estimate, it doesn't need the current state to be a sufficient statistic (the Markov property). Its one real requirement is termination — a return is a sum that runs to the end of an episode."
            },
            {
              "q": "Why rewrite the Monte Carlo average as the incremental update $V(s)\\leftarrow V(s)+\\frac{1}{N(s)}\\big(G-V(s)\\big)$?",
              "choices": [
                "It changes the estimate from a mean into a maximum",
                "It introduces bootstrapping into Monte Carlo",
                "It deliberately makes the estimate biased",
                "It maintains the running average <em>online</em> — algebraically the same sample mean, but updated after each new return without storing all past returns"
              ],
              "answer": 3,
              "explain": "The incremental form is exactly the batch average rewritten so you can update on the fly: keep a count $N(s)$ and nudge $V(s)$ toward each new return by $1/N(s)$. Replacing $1/N(s)$ with a constant $\\alpha$ gives a \"recency-weighted\" average, useful when the target is non-stationary."
            }
          ],
          "flashcards": [
            {
              "front": "What does Monte Carlo estimate the value of a state with, and what is the one structural requirement?",
              "back": "It averages actual complete sampled returns $G_t$ following visits to the state; requires episodes that terminate (episodic tasks). Model-free, no bootstrapping."
            },
            {
              "front": "First-visit vs every-visit MC",
              "back": "First-visit: average the return from only the first time a state is visited per episode (unbiased). Every-visit: average returns from every visit (biased in finite samples). Both converge to $v_\\pi$."
            },
            {
              "front": "Incremental mean update for MC",
              "back": "$V(s) \\leftarrow V(s) + \\frac{1}{N(s)}\\,(G - V(s))$. With a constant step $\\alpha$ instead of $1/N$, it becomes an exponentially-weighted average — used for non-stationary problems."
            },
            {
              "front": "MC bias and variance profile",
              "back": "(First-visit) MC is unbiased (zero bias) because $G_t$ is a sample of the true value, but has high variance since the return sums many random rewards/transitions over a whole episode. Opposite of TD."
            },
            {
              "front": "$\\varepsilon$-greedy policy probabilities",
              "back": "Greedy action: $1-\\varepsilon+\\varepsilon/|\\mathcal{A}|$; every other action: $\\varepsilon/|\\mathcal{A}|$. Keeps all actions positive-probability ($\\varepsilon$-soft) so all $(s,a)$ pairs get explored."
            },
            {
              "front": "Two ways MC control ensures exploration; what is GLIE?",
              "back": "Exploring starts (every $(s,a)$ can be the episode start) or $\\varepsilon$-soft policies (on-policy). GLIE = Greedy in the Limit with Infinite Exploration (e.g. $\\varepsilon\\to0$), which recovers the optimal policy."
            }
          ],
          "homework": [
            {
              "prompt": "Given these two episodes with $\\gamma = 1$ (reward shown is received on leaving the listed state), compute the first-visit AND every-visit MC estimates of $V(B)$.<br><code>Ep1: A,+2 → B,+1 → C,+0 → B,+3 → T</code><br><code>Ep2: B,+4 → C,+1 → T</code>",
              "hint": "For each visit to B, sum all rewards from that point to the end (since $\\gamma=1$). Then decide which returns go into each average: first-visit uses only the earliest B per episode; every-visit uses them all.",
              "solution": "Ep1 returns from each B visit: at the 2nd state (first B), remaining rewards $=1+0+3=4$; at the 4th state (second B), remaining $=3$. Ep2 B (first state): $4+1=5$.\\n\\nFirst-visit MC: first B of Ep1 = 4, first B of Ep2 = 5 → $V_{FV}(B)=(4+5)/2=4.5$.\\n\\nEvery-visit MC: returns $\\{4, 3, 5\\}$ → $V_{EV}(B)=(4+3+5)/3=12/3=4.0$."
            },
            {
              "prompt": "An agent uses first-visit MC with the incremental update $V(s)\\leftarrow V(s)+\\frac{1}{N(s)}(G-V(s))$. State $s$ starts with $V(s)=0,\\;N(s)=0$. First-visit returns for $s$ arrive in order: $G=10$, then $G=4$, then $G=7$. Show $V(s)$ after each update and confirm it equals the running sample mean.",
              "hint": "Apply the update once per return, incrementing $N$ first. After $k$ returns, $V(s)$ should equal the plain average of those $k$ returns.",
              "solution": "Update 1: $N=1$, $V=0+\\frac{1}{1}(10-0)=10$. (mean of {10}=10 ✓)\\nUpdate 2: $N=2$, $V=10+\\frac{1}{2}(4-10)=10-3=7$. (mean of {10,4}=7 ✓)\\nUpdate 3: $N=3$, $V=7+\\frac{1}{3}(7-7)=7$. (mean of {10,4,7}=21/3=7 ✓)\\nFinal $V(s)=7$, exactly the arithmetic mean of the three returns — confirming the incremental rule reproduces the sample mean."
            },
            {
              "prompt": "A state has 4 available actions and you use an $\\varepsilon$-greedy policy with $\\varepsilon=0.2$. (a) Give the probability of the greedy action and of each non-greedy action. (b) Explain why this scheme, unlike a purely greedy policy, guarantees every $(s,a)$ pair is visited infinitely often given infinite episodes, and what must change for the policy to become optimal.",
              "hint": "Greedy prob $=1-\\varepsilon+\\varepsilon/|\\mathcal{A}|$; non-greedy $=\\varepsilon/|\\mathcal{A}|$ with $|\\mathcal{A}|=4$. For optimality, think about the GLIE condition.",
              "solution": "(a) $|\\mathcal{A}|=4$, $\\varepsilon=0.2$ so $\\varepsilon/|\\mathcal{A}|=0.05$. Greedy action: $1-0.2+0.05=0.85$. Each of the 3 non-greedy actions: $0.05$. (Check: $0.85+3(0.05)=1.0$.)\\n\\n(b) Every action has probability $\\geq 0.05 > 0$, so over infinitely many episodes each $(s,a)$ pair is taken infinitely often — the policy is $\\varepsilon$-soft, providing persistent exploration. A purely greedy policy gives the non-greedy actions probability 0, so their $Q$-values are never sampled and the agent can lock onto a suboptimal action. To converge to the truly optimal (deterministic) policy, exploration must vanish in the limit: decay $\\varepsilon\\to0$ over time while still exploring infinitely (the GLIE condition, e.g. $\\varepsilon_k=1/k$). Otherwise MC converges only to the best $\\varepsilon$-soft policy, not the optimal one."
            }
          ],
          "examples": [
            {
              "title": "First-visit MC prediction on a 3-step episode",
              "body": "An agent following a fixed policy generates one episode with discount $\\gamma = 0.9$. The trajectory of states and rewards is: $S_0 = A$, $R_1 = 2$, $S_1 = B$, $R_2 = 0$, $S_2 = A$, $R_3 = 1$, $S_3 = C$ (terminal), $R_4 = 4$. Using first-visit Monte Carlo, compute the value estimates $V(A)$, $V(B)$, and $V(C)$ from this single episode.",
              "solution": "First-visit MC estimates $v_\\pi(s)$ by averaging the return $G_t$ following the <strong>first</strong> time each state is visited within an episode. We compute returns backward from the terminal state using $G_t = R_{t+1} + \\gamma G_{t+1}$, with $G_T = 0$ at the terminal state.\n\n<strong>Step 1 — compute returns backward.</strong> The rewards are $R_1=2,\\ R_2=0,\\ R_3=1,\\ R_4=4$. Starting from the end:\n$$G_3 = R_4 = 4.$$\n$$G_2 = R_3 + \\gamma G_3 = 1 + 0.9(4) = 1 + 3.6 = 4.6.$$\n$$G_1 = R_2 + \\gamma G_2 = 0 + 0.9(4.6) = 4.14.$$\n$$G_0 = R_1 + \\gamma G_1 = 2 + 0.9(4.14) = 2 + 3.726 = 5.726.$$\n\n<strong>Step 2 — identify first visits.</strong> Scan the episode forward and mark the first occurrence of each state:\n$$t=0:\\ A\\ (\\text{first visit to } A),\\quad t=1:\\ B\\ (\\text{first visit to } B),\\quad t=2:\\ A\\ (\\text{repeat, ignore}).$$\nState $C$ is terminal, so it gets no return assigned (it is never a visited non-terminal state here; we set $V(C)=0$).\n\n<strong>Step 3 — assign returns to first visits.</strong> With only one episode, each average is just the single observed return:\n$$V(A) = G_0 = 5.726, \\qquad V(B) = G_1 = 4.14.$$\nNote that the second visit to $A$ at $t=2$ (which had return $G_2 = 4.6$) is <em>discarded</em> by first-visit MC.\n\n<strong>Answer:</strong>\n$$V(A) = 5.726, \\qquad V(B) = 4.14, \\qquad V(C) = 0.$$"
            },
            {
              "title": "First-visit vs. every-visit MC across two episodes",
              "body": "A policy generates two episodes with $\\gamma = 1$ (undiscounted). Episode 1: $A \\xrightarrow{R=1} A \\xrightarrow{R=2} \\text{terminal}$. Episode 2: $A \\xrightarrow{R=0} \\text{terminal}$. Estimate $V(A)$ using both first-visit MC and every-visit MC, and compare.",
              "solution": "Here state $A$ is visited <strong>twice</strong> in Episode 1 and once in Episode 2. The two MC variants differ in how they treat the repeated visit: first-visit uses only the return from the first occurrence of $A$ in each episode, while every-visit uses the return from <em>every</em> occurrence. With $\\gamma = 1$ the return is just the sum of remaining rewards.\n\n<strong>Step 1 — compute returns for Episode 1.</strong> Rewards are $R_1 = 1$ (after the first $A$) and $R_2 = 2$ (after the second $A$). Backward, with $G_T = 0$:\n$$G_1 = R_2 = 2 \\quad (\\text{return from the 2nd visit to } A),$$\n$$G_0 = R_1 + G_1 = 1 + 2 = 3 \\quad (\\text{return from the 1st visit to } A).$$\n\n<strong>Step 2 — compute returns for Episode 2.</strong> One reward $R_1 = 0$:\n$$G_0 = R_1 = 0 \\quad (\\text{return from the only visit to } A).$$\n\n<strong>Step 3 — first-visit MC.</strong> Use only the first visit to $A$ per episode: return $3$ from Episode 1, return $0$ from Episode 2. Average over the $2$ first-visit samples:\n$$V_{\\text{FV}}(A) = \\frac{3 + 0}{2} = \\frac{3}{2} = 1.5.$$\n\n<strong>Step 4 — every-visit MC.</strong> Use the return following <em>every</em> occurrence of $A$: returns $3$ and $2$ from Episode 1, and $0$ from Episode 2 — three samples in total:\n$$V_{\\text{EV}}(A) = \\frac{3 + 2 + 0}{3} = \\frac{5}{3} \\approx 1.667.$$\n\n<strong>Step 5 — compare.</strong> The estimates differ: $V_{\\text{FV}}(A) = 1.5$ versus $V_{\\text{EV}}(A) \\approx 1.667$. First-visit MC averages independent, unbiased samples of $G_t$, so it is unbiased for $v_\\pi(A)$. Every-visit MC reuses correlated returns from within the same episode (the visits to $A$ at $t=0$ and $t=1$ share reward $R_2$), making it biased for finite data, though both converge to $v_\\pi(A)$ as the number of episodes $\\to \\infty$.\n\n<strong>Answer:</strong>\n$$V_{\\text{FV}}(A) = 1.5, \\qquad V_{\\text{EV}}(A) = \\tfrac{5}{3} \\approx 1.667.$$"
            }
          ]
        },
        {
          "id": "rl-td-learning",
          "title": "Temporal-Difference Learning and TD(0)",
          "minutes": 16,
          "content": "<h3>From episodes to single steps: the idea behind TD</h3>\n<p>So far in model-free prediction we have met two extremes. <strong>Dynamic Programming (DP)</strong> evaluates a policy by sweeping the whole state space using the Bellman expectation equation — but it needs a complete model of the environment (the transition probabilities $P$ and rewards $R$). <strong>Monte Carlo (MC)</strong> needs no model: it just plays out whole episodes and averages the actual returns it observes. The price MC pays is that it must <em>wait until an episode ends</em> before it can learn anything, and the returns it averages are noisy.</p>\n<p><strong>Temporal-Difference (TD) learning</strong> is the beautiful synthesis of the two. Like MC, it learns directly from raw experience with no model. Like DP, it updates its current estimate using <em>other current estimates</em> — a trick called <strong>bootstrapping</strong> — so it can learn after every single step, before the episode is even over. TD is arguably the central idea of reinforcement learning, and the TD error it computes turns out to have a striking analog in the dopamine signaling of biological brains.</p>\n\n<h3>Recap: what are we estimating?</h3>\n<p>We are doing <em>prediction</em> (a.k.a. policy evaluation): given a fixed policy $\\pi$, we want the state-value function</p>\n$$V^\\pi(s) = \\mathbb{E}_\\pi\\!\\left[\\,G_t \\mid S_t = s\\,\\right], \\qquad G_t = R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\cdots$$\n<p>where $G_t$ is the <strong>return</strong> (discounted sum of future rewards) and $\\gamma \\in [0,1]$ is the discount factor. The whole question of prediction is: how do we turn streams of experience into a good estimate of $V^\\pi$?</p>\n\n<h4>The Monte Carlo update</h4>\n<p>MC uses the definition directly. After an episode finishes, we know the actual return $G_t$ that followed each visited state. We nudge our estimate toward that observed sample:</p>\n$$V(S_t) \\leftarrow V(S_t) + \\alpha\\big[\\,G_t - V(S_t)\\,\\big]$$\n<p>Here $\\alpha$ is a step size (learning rate). The bracket is a prediction error: \"the return I actually got, minus what I predicted.\" MC's <em>target</em> is the full return $G_t$, which is an <strong>unbiased</strong> sample of $V^\\pi(S_t)$ but requires the whole episode and carries the variance of many random rewards and transitions.</p>\n\n<h3>The TD(0) update</h3>\n<p>The key move is to recall the <strong>Bellman expectation equation</strong>, which expresses the value of a state recursively:</p>\n$$V^\\pi(s) = \\mathbb{E}_\\pi\\!\\left[\\,R_{t+1} + \\gamma V^\\pi(S_{t+1}) \\mid S_t = s\\,\\right].$$\n<p>This says the true return can be decomposed into \"one real reward, then the value of where we land.\" TD exploits this. Instead of waiting for the full return $G_t$, it takes <em>one</em> real step, observes the immediate reward $R_{t+1}$ and the next state $S_{t+1}$, and then <em>substitutes its own current estimate</em> $V(S_{t+1})$ for the unknown remainder of the return. This gives the <strong>TD target</strong>:</p>\n$$\\text{TD target} \\;=\\; R_{t+1} + \\gamma\\, V(S_{t+1}).$$\n<p>The full <strong>TD(0)</strong> update rule is then:</p>\n$$\\boxed{\\,V(S_t) \\leftarrow V(S_t) + \\alpha\\big[\\,R_{t+1} + \\gamma V(S_{t+1}) - V(S_t)\\,\\big]\\,}$$\n<p>The \"(0)\" labels this as the one-step member of a whole family ($\\text{TD}(\\lambda)$) that we will meet later; TD(0) bootstraps off exactly the next state.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>MC asks \"what return did I <em>actually</em> get all the way to the end?\" TD asks \"was my one-step prediction consistent with the next reward plus my <em>guess</em> of what comes after?\" TD learns a guess from a guess — and remarkably, repeated nudges drag those guesses toward the truth.</p></div>\n\n<h4>The TD error</h4>\n<p>The quantity in brackets is so important it gets its own name and symbol, the <strong>TD error</strong> $\\delta_t$:</p>\n$$\\delta_t \\;=\\; R_{t+1} + \\gamma V(S_{t+1}) - V(S_t).$$\n<p>So compactly, $V(S_t) \\leftarrow V(S_t) + \\alpha\\,\\delta_t$. The TD error measures the discrepancy between the estimate <em>before</em> taking the step, $V(S_t)$, and a better estimate available <em>after</em> the step, $R_{t+1} + \\gamma V(S_{t+1})$. It is a <em>surprise</em> signal: positive $\\delta_t$ means things went better than expected (raise the value), negative means worse (lower it). If our value function were already exactly correct, then $\\mathbb{E}[\\delta_t] = 0$ for every state — the Bellman equation would hold and there would be nothing to learn.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Deeper connection</div><p>This $\\delta_t$ is the celebrated <strong>reward prediction error</strong>. In the brains of mammals, phasic dopamine neuron firing tracks a signal that behaves almost exactly like the TD error — spiking at unexpected reward and dipping at omitted-but-expected reward. TD learning, invented to make machines learn, turned out to be one of computational neuroscience's best models of biological learning. The same $\\delta$ is also the engine inside deep RL agents like DQN and the actor-critic methods behind AlphaGo.</p></div>\n\n<h3>A fully worked example</h3>\n<p>Consider an episode generated under policy $\\pi$ with discount $\\gamma = 1$ and step size $\\alpha = 0.1$. Suppose our current value estimates are:</p>\n<pre><code>V(A) = 0.5    V(B) = 0.8    V(C) = 0.0  (terminal, value fixed at 0)</code></pre>\n<p>The agent experiences the trajectory:</p>\n<pre><code>A --(reward 2)--> B --(reward 1)--> C (terminal)</code></pre>\n<p>The actual return from A is $G = 2 + 1 = 3$, and from B is $G = 1$.</p>\n\n<h4>TD(0) update at state A</h4>\n<p>We use the transition $A \\to B$ with reward $R = 2$:</p>\n$$\\delta_A = R + \\gamma V(B) - V(A) = 2 + (1)(0.8) - 0.5 = 2.3.$$\n$$V(A) \\leftarrow 0.5 + 0.1 \\times 2.3 = 0.5 + 0.23 = 0.73.$$\n<p>Notice TD updated $V(A)$ using only the <em>next</em> reward and the <em>existing guess</em> $V(B) = 0.8$ — it did not need to know what happened after B.</p>\n\n<h4>MC update at state A</h4>\n<p>MC waits for the episode to end and uses the full observed return $G = 3$:</p>\n$$V(A) \\leftarrow 0.5 + 0.1\\,(3 - 0.5) = 0.5 + 0.25 = 0.75.$$\n\n<h4>Comparing the two</h4>\n<p>Both methods raised $V(A)$, but toward different targets: TD aimed at $R + \\gamma V(B) = 2.8$, while MC aimed at the real return $3$. They disagree precisely because $V(B) = 0.8$ is currently an <em>under</em>-estimate of B's true value-to-go ($G_B = 1$). TD's target is biased by that stale estimate; MC's is not. But TD's target has lower variance — it depends on only one random reward and one bootstrapped value, whereas MC's target $G$ accumulates the randomness of every reward and transition in the rest of the episode. This single comparison is the whole bias-variance story in miniature.</p>\n\n<div data-viz=\"rl-td-mc\"></div>\n<h3>MC vs TD vs DP: the three-way comparison</h3>\n<p>It helps to line up all three along the dimensions that actually matter.</p>\n<ul>\n<li><strong>Model required?</strong> DP needs the full model $\\langle P, R\\rangle$ to take the expectation analytically. MC and TD are <em>model-free</em> — they learn from sampled experience.</li>\n<li><strong>Bootstrapping?</strong> DP and TD <strong>bootstrap</strong>: their update target contains an estimate of another state's value. MC does <em>not</em> bootstrap — its target is a pure sample of the return, independent of the current $V$.</li>\n<li><strong>Sampling?</strong> MC and TD <strong>sample</strong> the environment (one trajectory at a time). DP does a full expectation (a sweep over all successor states), not a sample.</li>\n<li><strong>Full episodes / continuing tasks?</strong> MC needs <em>complete episodes</em> to compute $G_t$, so it cannot be applied online or to non-terminating tasks. TD updates after every step, works online, and handles continuing (infinite-horizon) tasks naturally.</li>\n</ul>\n\n<h4>Bias and variance</h4>\n<ul>\n<li><strong>MC target $G_t$</strong>: an <strong>unbiased</strong> estimate of $V^\\pi(S_t)$, but <strong>high variance</strong> (sum of many random rewards).</li>\n<li><strong>TD target $R_{t+1} + \\gamma V(S_{t+1})$</strong>: <strong>biased</strong> (because it uses the current, imperfect estimate $V$, not the true $V^\\pi$), but <strong>much lower variance</strong> (depends on one transition and one reward). The bias shrinks as $V$ improves.</li>\n<li>(The \"true\" TD target $R_{t+1} + \\gamma V^\\pi(S_{t+1})$ <em>would</em> be unbiased — the bias comes entirely from bootstrapping off our own estimate.)</li>\n</ul>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>Bias-variance is the same tradeoff you know from supervised learning, here playing out over <em>time</em> rather than over a dataset. In practice TD's variance reduction usually wins: TD methods typically converge faster than MC and are more sample-efficient, especially in long episodes. The cost — bias and the danger that bootstrapping can diverge when combined with function approximation and off-policy data (the infamous \"deadly triad\") — is the central tension in modern deep RL.</p></div>\n\n<h4>Convergence and the \"different fixed points\" subtlety</h4>\n<p>With a tabular representation and a suitably decaying step size, both TD(0) and MC converge to $V^\\pi$. But on <em>finite</em> data they find different answers. Given a fixed batch of episodes:</p>\n<ul>\n<li><strong>Batch MC</strong> converges to the values that minimize mean-squared error on the observed returns — it fits the data.</li>\n<li><strong>Batch TD(0)</strong> converges to the values of the <strong>maximum-likelihood Markov model</strong> implied by the data — it builds the most likely MDP consistent with what it saw, then solves it. This is why TD often generalizes better when the world really is Markovian: it exploits the Markov structure, whereas MC ignores it.</li>\n</ul>\n\n<h3>Algorithm in pseudocode</h3>\n<pre><code>Input: policy pi to evaluate, step size alpha in (0,1], discount gamma\nInitialize V(s) arbitrarily for all s; V(terminal) = 0\nRepeat (for each episode):\n    Initialize S\n    Repeat (for each step of the episode):\n        A  &lt;- action given by pi for S\n        Take action A, observe reward R and next state S'\n        delta &lt;- R + gamma * V(S') - V(S)      # TD error\n        V(S)  &lt;- V(S) + alpha * delta            # TD(0) update\n        S     &lt;- S'\n    until S is terminal</code></pre>\n<p>The inner update is online and constant-time per step — no episode buffer, no model, just the running estimate $V$. That simplicity, plus bootstrapping, is exactly why TD scales to large problems and forms the backbone of value-based deep RL.</p>\n\n<h3>Takeaways</h3>\n<ul>\n<li>TD(0) learns $V^\\pi$ from raw experience, updating every step via $V(S_t) \\leftarrow V(S_t) + \\alpha\\,\\delta_t$ with TD error $\\delta_t = R_{t+1} + \\gamma V(S_{t+1}) - V(S_t)$.</li>\n<li>It <strong>bootstraps</strong> like DP but is <strong>model-free</strong> like MC — the best of both.</li>\n<li>TD trades MC's unbiasedness for lower variance and online, incremental learning; the bias vanishes as estimates improve.</li>\n<li>The TD error $\\delta$ is the unit of \"surprise\" — central to RL theory, deep RL, and even neuroscience.</li>\n</ul>\n<details class=\"deep-dive\">\n<summary>Deeper dive: bootstrapping — why TD learns from a <em>guess</em>, and when that beats Monte Carlo</summary>\n<p>Monte Carlo estimates $V(s)$ from the <strong>actual return</strong> $G_t = r_{t+1} + \\gamma r_{t+2} + \\gamma^2 r_{t+3} + \\cdots$ — it waits for the episode to finish, then nudges $V(s_t)$ toward the realized total. TD(0) instead updates toward $r_{t+1} + \\gamma V(s_{t+1})$: the immediate reward plus its <em>own current estimate</em> of where it landed. Updating an estimate toward another estimate is <strong>bootstrapping</strong>.</p>\n<p>The whole story is bias versus variance. MC's target $G_t$ is <strong>unbiased</strong> — its expectation is exactly $V^\\pi(s)$ — but <strong>high variance</strong>, because it accumulates the randomness of every reward and transition across the entire episode. TD's target $r_{t+1} + \\gamma V(s_{t+1})$ is <strong>biased</strong> (it leans on a possibly-wrong $V(s_{t+1})$) but <strong>low variance</strong>, since only one step's randomness enters. Early in training TD is biased; as $V$ sharpens the bias melts away, and the variance saving usually makes TD learn faster — exactly what the 5-state random-walk demo shows.</p>\n<p>Bootstrapping buys something MC structurally cannot have: TD can learn <strong>online, after every single step</strong>, never waiting for an episode to end. That is essential in <em>continuing</em> tasks that have no terminal state — MC simply has no return to wait for there.</p>\n<p>The bill comes later: because TD chases a moving target stitched from its own estimates, it is more delicate once you add function approximation — this is the seed of the <strong>deadly triad</strong> (bootstrapping + function approximation + off-policy training). But for tabular prediction, TD(0) provably converges to $V^\\pi$, typically with lower variance than MC.</p>\n</details>\n<h4>Try it in code</h4>\n<p>TD(0) nudges a state's value toward a one-step <em>bootstrapped</em> estimate: <code>V(s) ← V(s) + α[r + γV(s′) − V(s)]</code>. The bracket is the TD error — how surprised we were. Run one update:</p>\n<div data-code=\"javascript\" data-expected=\"5.50\">// One TD(0) update. V(s) moves a fraction alpha toward r + gamma*V(next).\nfunction td(V, r, gamma, Vnext, alpha) {\n  var tdError = r + gamma * Vnext - V;   // reward + discounted next value, minus current guess\n  return V + alpha * tdError;\n}\n// V(s)=5, reward 1, gamma 0.9, V(next)=10, alpha 0.1\nconsole.log(td(5, 1, 0.9, 10, 0.1).toFixed(2));   // 5.50 -- TD error was +5, scaled by 0.1</div>\n",
          "mcq": [
            {
              "q": "Which statement about the TD target $R_{t+1} + \\gamma V(S_{t+1})$ versus the MC target $G_t$ is correct?",
              "choices": [
                "The TD target is unbiased but high-variance; the MC target is biased but low-variance",
                "The TD target is biased (it bootstraps off the current estimate) but low-variance; the MC target is unbiased but high-variance",
                "Both targets are unbiased, but the TD target has higher variance",
                "Both targets are biased, but the MC target has lower variance"
              ],
              "answer": 1,
              "explain": "MC's full-return target is an unbiased sample of $V^\\pi$ but accumulates the variance of many random rewards; TD's one-step target uses the current (imperfect) estimate $V(S_{t+1})$, making it biased but far lower variance."
            },
            {
              "q": "Given $V(S_t)=4$, $V(S_{t+1})=10$, observed reward $R_{t+1}=1$, $\\gamma=0.9$, what is the TD error $\\delta_t$?",
              "choices": [
                "$3$",
                "$6$",
                "$-3$",
                "$11$"
              ],
              "answer": 1,
              "explain": "$\\delta_t = R_{t+1} + \\gamma V(S_{t+1}) - V(S_t) = 1 + 0.9(10) - 4 = 1 + 9 - 4 = 6$."
            },
            {
              "q": "Which property is shared by DP and TD(0) but NOT by Monte Carlo?",
              "choices": [
                "Being model-free",
                "Sampling individual trajectories from the environment",
                "Bootstrapping (using an estimate of another state's value in the update target)",
                "Requiring complete episodes before updating"
              ],
              "answer": 2,
              "explain": "DP and TD both bootstrap (their targets include an estimate of a successor state's value). MC does not bootstrap; its target is the pure sampled return. (Model-free and sampling are shared by MC and TD, not DP.)"
            },
            {
              "q": "Why can TD(0) be applied to continuing (non-terminating) tasks while standard Monte Carlo cannot?",
              "choices": [
                "TD requires a model of the environment, which resolves the infinite horizon",
                "TD updates after every step using a one-step bootstrap, whereas MC needs a complete episode to compute the return $G_t$",
                "MC has lower variance and so needs fewer episodes",
                "TD only works when $\\gamma = 1$"
              ],
              "answer": 1,
              "explain": "MC must wait for an episode to terminate to compute $G_t$; in a continuing task that never happens. TD bootstraps off $V(S_{t+1})$ and updates online every step, so no terminal state is needed."
            },
            {
              "q": "Given $V(S_t)=4$, $V(S_{t+1})=10$, observed reward $R_{t+1}=1$, $\\gamma=0.9$, what is the TD error $\\delta_t = R_{t+1} + \\gamma V(S_{t+1}) - V(S_t)$?",
              "choices": [
                "$6.0$",
                "$5.4$",
                "$7.0$",
                "$-6.0$"
              ],
              "answer": 0,
              "explain": "$\\delta_t = 1 + 0.9 \\times 10 - 4 = 1 + 9 - 4 = 6.0$. The positive error means the outcome was better than predicted, so the TD(0) update would increase $V(S_t)$."
            },
            {
              "q": "The TD(0) update rule is $V(S_t) \\leftarrow V(S_t) + \\alpha\\,\\big[R_{t+1} + \\gamma V(S_{t+1}) - V(S_t)\\big]$. A student claims TD(0) is unbiased because it uses the real observed reward $R_{t+1}$. What is the most accurate response?",
              "choices": [
                "The student is correct; TD(0) is unbiased for the same reason MC is.",
                "TD(0) is generally biased because its target bootstraps on the estimate $V(S_{t+1})$, which is itself inaccurate during learning.",
                "TD(0) is unbiased only when $\\gamma = 1$, otherwise the discount introduces bias.",
                "TD(0) is unbiased but has higher variance than MC, which is the real drawback."
              ],
              "answer": 1,
              "explain": "The TD target $R_{t+1} + \\gamma V(S_{t+1})$ depends on the current (imperfect) estimate $V(S_{t+1})$, so it is a biased estimate of $V^\\pi(S_t)$ even though the reward itself is real. MC, which uses the full return $G_t$, is the unbiased one; and TD actually has lower variance than MC, not higher."
            },
            {
              "q": "Consider a transition from state $A$ to state $B$ with reward $R_{t+1}=2$ and $\\gamma=0.5$. Currently $V(A)=3$ and $V(B)=6$. Using step size $\\alpha=0.1$, what is the new value $V(A)$ after one TD(0) update?",
              "choices": [
                "$3.0$",
                "$5.0$",
                "$3.2$",
                "$2.8$"
              ],
              "answer": 2,
              "explain": "The TD error is $\\delta = 2 + 0.5\\cdot 6 - 3 = 2$, so $V(A) \\leftarrow 3 + 0.1\\cdot 2 = 3.2$. The distractor $5.0$ wrongly moves $V(A)$ all the way to the target instead of only an $\\alpha$-fraction toward it."
            },
            {
              "q": "Which scenario best illustrates a situation where TD(0) can learn something useful but Monte Carlo cannot (within the same amount of experience)?",
              "choices": [
                "An agent that has only experienced full episodes from start to terminal states.",
                "An agent partway through a long episode that has not yet terminated, observing one new transition.",
                "An agent in a fully deterministic environment with a known model.",
                "An agent that wants the lowest-variance possible estimate of returns."
              ],
              "answer": 1,
              "explain": "TD(0) updates after each step via bootstrapping, so it learns from an in-progress, non-terminated episode; MC must wait for the episode to end to compute $G_t$. The known-model case favors DP, and lowest variance favors MC, not TD."
            },
            {
              "q": "Suppose we run TD(0) with a fixed step size $\\alpha$ that is held constant (not decayed) on a stochastic environment. What is the expected long-run behavior of the estimates $V$?",
              "choices": [
                "They converge exactly to $V^\\pi$ because TD(0) is guaranteed to converge for any $\\alpha$.",
                "They diverge to infinity because constant $\\alpha$ always destabilizes bootstrapping.",
                "They fluctuate around $V^\\pi$ without fully settling, because a constant step keeps responding to noise.",
                "They converge to the Monte Carlo estimate rather than $V^\\pi$."
              ],
              "answer": 2,
              "explain": "Tabular TD(0) requires a decaying step size (Robbins-Monro conditions) to converge exactly; with a constant $\\alpha$ it tracks but keeps bouncing around the true values due to ongoing stochasticity. It does not diverge in the tabular case, nor does it target the MC estimate specifically."
            },
            {
              "q": "In the limit of infinite experience from a fixed batch of episodes, TD(0) and Monte Carlo converge to different solutions. What does the TD(0) batch solution correspond to?",
              "choices": [
                "The value function of the maximum-likelihood Markov model fit to the observed data (the certainty-equivalence estimate).",
                "The value function that minimizes the mean-squared error on the observed returns.",
                "The optimal value function $V^*$ under the greedy policy.",
                "The same solution as MC, since both are consistent estimators."
              ],
              "answer": 0,
              "explain": "Batch TD(0) converges to the certainty-equivalence solution: the values of the maximum-likelihood MDP implied by the data. Batch MC instead minimizes mean-squared error on the observed returns, which is why the two can differ on finite data."
            },
            {
              "q": "A reward-prediction-error interpretation links the TD error $\\delta_t$ to dopamine signaling. If an outcome is exactly as good as the agent's current value estimate predicted, what should $\\delta_t$ be?",
              "choices": [
                "Equal to the reward $R_{t+1}$, since reward always drives the signal.",
                "Approximately zero, because the bootstrapped target matches the current estimate.",
                "Large and positive, signaling a successful prediction.",
                "Equal to $\\gamma V(S_{t+1})$, the discounted future value."
              ],
              "answer": 1,
              "explain": "$\\delta_t = R_{t+1} + \\gamma V(S_{t+1}) - V(S_t)$ measures surprise: when the outcome matches the prediction, the target equals the current estimate and $\\delta_t \\approx 0$. A nonzero (especially positive) signal indicates the outcome was better than expected, mirroring the dopamine reward-prediction-error story."
            },
            {
              "q": "Which of the following correctly characterizes the bias-variance trade-off between the TD(0) target and the Monte Carlo target?",
              "choices": [
                "Both targets have the same bias and variance; only the timing of updates differs.",
                "The MC target has lower variance because it averages many rewards, while TD has higher variance from bootstrapping.",
                "The TD target has lower variance (it depends on one random reward and transition) but is biased, while the MC target is unbiased but higher-variance.",
                "The TD target is both lower-bias and lower-variance, which is why it dominates MC."
              ],
              "answer": 2,
              "explain": "The TD target uses just $R_{t+1}$ and one bootstrapped value, so it has lower variance than the full random return $G_t$, but bootstrapping on an imperfect estimate makes it biased. MC's $G_t$ is unbiased but accumulates randomness over the whole episode, giving higher variance."
            },
            {
              "q": "What is the TD(0) <em>target</em>?",
              "choices": [
                "The full return $G_t$ summed all the way to the end of the episode",
                "The maximum action-value available at the next state",
                "$R_{t+1} + \\gamma V(S_{t+1})$ — one observed reward plus the discounted <em>current estimate</em> of the next state's value",
                "The average reward across all states"
              ],
              "answer": 2,
              "explain": "TD exploits the Bellman expectation equation: instead of waiting for the whole return, it takes one real step and substitutes its own estimate $V(S_{t+1})$ for the unknown remainder. That $R_{t+1}+\\gamma V(S_{t+1})$ is the TD target — \"one real reward, then trust my guess about the rest.\""
            },
            {
              "q": "What does the TD error $\\delta_t$ represent?",
              "choices": [
                "A prediction error — the TD target minus the current estimate, $\\delta_t=R_{t+1}+\\gamma V(S_{t+1})-V(S_t)$ — i.e. \"was my one-step prediction consistent with what actually happened?\"",
                "The total reward collected over the whole episode",
                "The difference between two successive policies",
                "The gradient of the value function with respect to its parameters"
              ],
              "answer": 0,
              "explain": "$\\delta_t$ is the surprise: how far the observed reward-plus-next-value was from what you predicted. TD nudges $V(S_t)$ by $\\alpha\\delta_t$. If an outcome is exactly as good as predicted, $\\delta_t=0$ and nothing changes — the same quantity that mirrors dopamine reward-prediction-error signals."
            },
            {
              "q": "In what sense is TD learning like Monte Carlo, and how does it differ?",
              "choices": [
                "It needs the full transition model, exactly like dynamic programming",
                "It can only be used for prediction, never for control",
                "It requires storing every reward of the episode before updating",
                "Like MC, it learns directly from raw experience with no model of the environment — but unlike MC it updates after <em>every step</em> instead of waiting for the episode to end"
              ],
              "answer": 3,
              "explain": "TD is the synthesis: model-free like MC (learns from experience), bootstrapping like DP (updates an estimate from another estimate). That bootstrapping is what lets it update online, every step, and even on continuing (non-terminating) tasks."
            },
            {
              "q": "Run as a prediction method for a fixed policy $\\pi$ (with a suitably decaying step size), TD(0) converges to what?",
              "choices": [
                "The optimal value function $v_*$, regardless of the policy followed",
                "The value function $v_\\pi$ of the policy $\\pi$ that is generating the experience",
                "The average reward per step",
                "Zero for every state"
              ],
              "answer": 1,
              "explain": "TD(0) prediction estimates the value of whatever policy is producing the data: it converges to $v_\\pi$. Finding $v_*$ requires <em>control</em> (improving the policy too), which is the job of SARSA and Q-learning in the next lesson."
            }
          ],
          "flashcards": [
            {
              "front": "Write the TD(0) update rule for state-value prediction.",
              "back": "$V(S_t) \\leftarrow V(S_t) + \\alpha\\big[R_{t+1} + \\gamma V(S_{t+1}) - V(S_t)\\big]$, where $\\alpha$ is the step size and $\\gamma$ the discount."
            },
            {
              "front": "Define the TD error $\\delta_t$ and say what it measures.",
              "back": "$\\delta_t = R_{t+1} + \\gamma V(S_{t+1}) - V(S_t)$. It is the discrepancy between the prior estimate $V(S_t)$ and the improved one-step (bootstrapped) estimate — a 'surprise' / reward-prediction-error signal."
            },
            {
              "front": "What is the TD target, and how does it differ from the MC target?",
              "back": "TD target = $R_{t+1} + \\gamma V(S_{t+1})$ (one real reward plus a bootstrapped estimate). MC target = $G_t$, the full observed return to the end of the episode."
            },
            {
              "front": "Bias-variance: compare the TD and MC targets.",
              "back": "MC target $G_t$: unbiased estimate of $V^\\pi$, high variance. TD target: biased (bootstraps off current $V$), low variance; bias shrinks as $V$ improves."
            },
            {
              "front": "Which of MC / TD / DP bootstrap, sample, and need a model?",
              "back": "Bootstrap: DP and TD (not MC). Sample experience: MC and TD (not DP). Need a model: only DP. MC also needs complete episodes; TD updates online every step."
            },
            {
              "front": "What does batch TD(0) converge to, versus batch MC, on a fixed dataset?",
              "back": "Batch TD(0) converges to the values of the maximum-likelihood Markov (MDP) model fit to the data; batch MC converges to the values minimizing mean-squared error on the observed returns."
            }
          ],
          "homework": [
            {
              "prompt": "An agent under policy $\\pi$ has current estimates $V(X)=6$, $V(Y)=2$, with $\\gamma=0.9$ and $\\alpha=0.5$. It observes the transition $X \\xrightarrow{R=3} Y$. Compute the TD error $\\delta$ and the updated $V(X)$ after one TD(0) update.",
              "hint": "First form the TD target $R + \\gamma V(Y)$, subtract $V(X)$ to get $\\delta$, then apply $V(X) \\leftarrow V(X) + \\alpha\\,\\delta$.",
              "solution": "TD target $= R + \\gamma V(Y) = 3 + 0.9(2) = 3 + 1.8 = 4.8$. TD error $\\delta = 4.8 - V(X) = 4.8 - 6 = -1.2$. Update: $V(X) \\leftarrow 6 + 0.5(-1.2) = 6 - 0.6 = 5.4$. The negative $\\delta$ means the step went worse than expected, so the estimate is lowered."
            },
            {
              "prompt": "Take $\\gamma=1$, $\\alpha=0.1$, and initial estimates $V(A)=1.0$, $V(B)=1.0$ (terminal value 0). The episode is $A \\xrightarrow{R=0} B \\xrightarrow{R=4} \\text{terminal}$. (a) Do a TD(0) update for state $A$. (b) Do the MC update for state $A$ using the full return. (c) Explain why the two targets differ.",
              "hint": "For TD use only the first transition and the current $V(B)$. For MC compute $G_A$ = sum of all rewards from A to the end.",
              "solution": "(a) TD: $\\delta_A = R + \\gamma V(B) - V(A) = 0 + 1(1.0) - 1.0 = 0$, so $V(A) \\leftarrow 1.0 + 0.1(0) = 1.0$ — no change, because the bootstrap target $0 + V(B) = 1.0$ already matches $V(A)$. (b) MC: full return $G_A = 0 + 4 = 4$, so $V(A) \\leftarrow 1.0 + 0.1(4 - 1.0) = 1.0 + 0.3 = 1.3$. (c) They differ because $V(B)=1.0$ badly underestimates B's true value-to-go (the actual return from B is 4). TD trusts the stale estimate $V(B)$ (biased, low variance), while MC uses the real return (unbiased but reflecting the full episode's randomness). As $V(B)$ is corrected over time, the TD target for A would also move toward the truth."
            },
            {
              "prompt": "True or false, with justification: 'Monte Carlo prediction can be run online, updating its estimates after every individual step, and works on continuing tasks that never terminate.'",
              "hint": "Recall exactly what quantity MC's update target requires, and whether that quantity is available mid-episode.",
              "solution": "False. MC's update uses the full return $G_t = R_{t+1} + \\gamma R_{t+2} + \\cdots$, which can only be computed once the episode terminates; therefore MC cannot update mid-episode and cannot be applied to continuing (non-terminating) tasks. TD(0), by contrast, replaces the unknown tail of the return with the bootstrap $\\gamma V(S_{t+1})$, so it updates online after each step and handles continuing tasks naturally."
            }
          ],
          "examples": [
            {
              "title": "A single TD(0) update on one transition",
              "body": "An agent follows a fixed policy $\\pi$ with discount $\\gamma = 0.9$ and step size $\\alpha = 0.1$. Current estimates are $V(A) = 5$ and $V(B) = 8$. The agent takes one step: from state $A$ it receives reward $R = 2$ and transitions to state $B$. Compute the TD error and the updated value $V(A)$.",
              "solution": "<p>The TD(0) update rule replaces the unknown true return $G_t$ in the Monte Carlo update with the one-step <em>bootstrapped</em> estimate $R_{t+1} + \\gamma V(S_{t+1})$, called the <strong>TD target</strong>. The full update is:</p>\n$$V(S_t) \\;\\leftarrow\\; V(S_t) + \\alpha\\,\\underbrace{\\big[\\,R_{t+1} + \\gamma V(S_{t+1}) - V(S_t)\\,\\big]}_{\\text{TD error }\\delta_t}.$$\n<p><strong>Step 1 — Identify the pieces.</strong> Here $S_t = A$, $S_{t+1} = B$, $R_{t+1} = 2$, $V(S_t) = V(A) = 5$, and $V(S_{t+1}) = V(B) = 8$.</p>\n<p><strong>Step 2 — Compute the TD target.</strong></p>\n$$R_{t+1} + \\gamma V(B) = 2 + 0.9 \\times 8 = 2 + 7.2 = 9.2.$$\n<p><strong>Step 3 — Compute the TD error</strong> $\\delta_t$ (target minus current estimate):</p>\n$$\\delta_t = 9.2 - V(A) = 9.2 - 5 = 4.2.$$\n<p>The error is positive, so this transition turned out <em>better than expected</em>: $A$'s value will be nudged upward.</p>\n<p><strong>Step 4 — Apply the update.</strong></p>\n$$V(A) \\leftarrow 5 + 0.1 \\times 4.2 = 5 + 0.42 = 5.42.$$\n<p><strong>Answer:</strong> the TD error is $\\delta_t = 4.2$ and the new estimate is $V(A) = 5.42$. Notice the agent learned from a <em>single step</em> without waiting for the episode to end, and it used its own current guess $V(B)$ to do so — that is bootstrapping.</p>"
            },
            {
              "title": "Tracing TD(0) across one short episode (with a terminal step)",
              "body": "Run TD(0) on a single 3-step episode with $\\gamma = 1$ and $\\alpha = 0.5$. The trajectory is $S_1 \\xrightarrow{R=0} S_2 \\xrightarrow{R=0} S_3 \\xrightarrow{R=1} \\text{terminal}$. Initial estimates are $V(S_1) = V(S_2) = V(S_3) = 0.5$, and by convention $V(\\text{terminal}) = 0$. Apply the update online (after every step) and give the final value table.",
              "solution": "<p>We sweep the transitions in order, applying $V(S_t) \\leftarrow V(S_t) + \\alpha\\big[R_{t+1} + \\gamma V(S_{t+1}) - V(S_t)\\big]$ at each step. Because updates are online, each later step may use a value that an earlier step did <em>not</em> change here (the states are distinct), but the key edge case is the <strong>terminal transition</strong>, where the bootstrap term vanishes since $V(\\text{terminal}) = 0$.</p>\n<p><strong>Step 1 — Transition $S_1 \\to S_2$, $R = 0$.</strong></p>\n$$\\delta = 0 + 1\\cdot V(S_2) - V(S_1) = 0 + 0.5 - 0.5 = 0.$$\n$$V(S_1) \\leftarrow 0.5 + 0.5 \\times 0 = 0.5.$$\n<p>No reward, no surprise, no change yet. Values: $[\\,V(S_1),V(S_2),V(S_3)\\,] = [0.5,\\,0.5,\\,0.5]$.</p>\n<p><strong>Step 2 — Transition $S_2 \\to S_3$, $R = 0$.</strong></p>\n$$\\delta = 0 + 1\\cdot V(S_3) - V(S_2) = 0 + 0.5 - 0.5 = 0,$$\n$$V(S_2) \\leftarrow 0.5 + 0.5 \\times 0 = 0.5.$$\n<p>Again unchanged. Values: $[0.5,\\,0.5,\\,0.5]$.</p>\n<p><strong>Step 3 — Terminal transition $S_3 \\to \\text{terminal}$, $R = 1$.</strong> The next state is terminal, so $V(S_{t+1}) = 0$ and the target is just the reward:</p>\n$$\\delta = 1 + 1\\cdot 0 - V(S_3) = 1 - 0.5 = 0.5,$$\n$$V(S_3) \\leftarrow 0.5 + 0.5 \\times 0.5 = 0.5 + 0.25 = 0.75.$$\n<p>Values after the episode: $[0.5,\\,0.5,\\,0.75]$.</p>\n<p><strong>Answer:</strong> after one episode only $V(S_3)$ moved, to $\\mathbf{0.75}$; $V(S_1)$ and $V(S_2)$ stayed at $0.5$. This exposes a defining feature of TD(0): the reward signal propagates <em>one state backward per episode</em>. On a <em>second</em> identical episode, step 2 would then see the raised $V(S_3) = 0.75$ and finally push $V(S_2)$ up, and on a third episode $V(S_1)$ would move — the information seeps backward step by step. (Monte Carlo, by contrast, would have credited all three states with the observed return $G = 1$ immediately, since with $\\gamma=1$ each state's return is $1$.)</p>"
            }
          ]
        },
        {
          "id": "rl-sarsa-qlearning",
          "title": "SARSA, Q-Learning, and On- vs Off-Policy",
          "minutes": 18,
          "content": "<h3>From Prediction to Control</h3>\n<p>In the previous lessons we used <strong>temporal-difference (TD) learning</strong> to <em>predict</em> the value of a fixed policy. Prediction answers \"how good is this policy?\" But the real prize in reinforcement learning is <strong>control</strong>: finding a policy that is actually good. This lesson is about the two workhorse algorithms of model-free TD control — <strong>SARSA</strong> and <strong>Q-learning</strong> — and the conceptual axis that separates them: <strong>on-policy</strong> vs <strong>off-policy</strong> learning.</p>\n\n<p>Both algorithms follow the pattern of <strong>generalized policy iteration (GPI)</strong>: interleave (i) estimating an action-value function $Q$ and (ii) improving the policy by acting greedily (or near-greedily) with respect to $Q$. The crucial design choice is <em>which</em> $Q$ — the value of the policy we are <em>using to choose actions</em>, or the value of the policy we ultimately <em>want</em>.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why action-values, not state-values</div>\n<p>Control needs $q(s,a)$, not $v(s)$. With $v$ alone, improving the policy ($\\pi'(s) = \\arg\\max_a \\sum_{s',r} p(s',r\\mid s,a)[r + \\gamma v(s')]$) requires the model $p$. With action-values, greedy improvement is model-free: $\\pi'(s) = \\arg\\max_a Q(s,a)$. This is exactly why TD <em>control</em> centers on $Q$.</p>\n</div>\n\n<h3>The Behavior Policy vs the Target Policy</h3>\n<p>Every learning agent has two (possibly distinct) policies in play:</p>\n<ul>\n<li>The <strong>behavior policy</strong> $b$ — the policy the agent actually follows to generate experience. It must <em>explore</em>, so it cannot be fully greedy.</li>\n<li>The <strong>target policy</strong> $\\pi$ — the policy whose value we are learning and trying to improve. This is the policy we want to deploy.</li>\n</ul>\n<p>The on/off-policy distinction is precisely the relationship between these two:</p>\n<ul>\n<li><strong>On-policy:</strong> $b = \\pi$. We learn about the same policy we use to act. To keep exploring, the policy itself stays soft (e.g. $\\varepsilon$-greedy) — so we converge to the best <em>soft</em> policy, not the optimal deterministic one (unless $\\varepsilon \\to 0$).</li>\n<li><strong>Off-policy:</strong> $b \\ne \\pi$. We act with an exploratory $b$ but learn the value of a different (often greedy) target $\\pi$. This decouples exploration from the policy we evaluate.</li>\n</ul>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>On-policy is \"learn while doing, and own the consequences of your exploration.\" Off-policy is \"explore freely, but evaluate as if you had behaved optimally.\" A self-driving agent that must take random actions to learn might prefer off-policy: it wants the value of <em>good</em> driving, not the value of \"drive well but occasionally swerve at random.\"</p>\n</div>\n\n<h3>SARSA: On-Policy TD Control</h3>\n<p>SARSA gets its name from the quintuple of experience it uses for one update: $(S_t, A_t, R_{t+1}, S_{t+1}, A_{t+1})$ — <strong>S-A-R-S-A</strong>. The agent picks $A_{t+1}$ from its current ($\\varepsilon$-greedy) policy <em>before</em> updating, and that actually-taken next action drives the bootstrap target:</p>\n$$Q(S_t,A_t) \\leftarrow Q(S_t,A_t) + \\alpha\\Big[\\underbrace{R_{t+1} + \\gamma\\, Q(S_{t+1},A_{t+1})}_{\\text{TD target}} - Q(S_t,A_t)\\Big]$$\n<p>The full quantity in brackets is the <strong>TD error</strong> $\\delta_t = R_{t+1} + \\gamma\\, Q(S_{t+1},A_{t+1}) - Q(S_t,A_t)$. Because $A_{t+1}$ is drawn from the same policy the agent follows, SARSA evaluates and improves <em>that</em> policy — it is on-policy. The TD target is a sample of $\\mathbb{E}_{\\pi}[R_{t+1} + \\gamma Q(S_{t+1}, A_{t+1})]$, i.e. the Bellman <em>expectation</em> equation for $q_\\pi$.</p>\n\n<pre><code>Initialize Q(s,a) arbitrarily, Q(terminal,·)=0\nFor each episode:\n    S ← initial state\n    A ← epsilon-greedy(Q, S)\n    Repeat for each step:\n        Take action A, observe R, S'\n        A' ← epsilon-greedy(Q, S')          # next action chosen now\n        Q(S,A) ← Q(S,A) + alpha[R + gamma*Q(S',A') - Q(S,A)]\n        S ← S';  A ← A'\n    until S is terminal</code></pre>\n\n<p><strong>Convergence.</strong> SARSA converges to the optimal action-value function $q_*$ (and an optimal policy) provided all state-action pairs are visited infinitely often and the policy converges to greedy in the limit — formalized as <strong>GLIE</strong> (Greedy in the Limit with Infinite Exploration), e.g. $\\varepsilon_k = 1/k$, together with a Robbins-Monro step-size schedule ($\\sum_k \\alpha_k = \\infty$, $\\sum_k \\alpha_k^2 < \\infty$).</p>\n\n<h3>Q-Learning: Off-Policy TD Control</h3>\n<p>Q-learning makes one decisive change to the target: instead of bootstrapping from the action actually taken, it bootstraps from the <em>best</em> action available at $S_{t+1}$:</p>\n$$Q(S_t,A_t) \\leftarrow Q(S_t,A_t) + \\alpha\\Big[R_{t+1} + \\gamma\\, \\max_{a'} Q(S_{t+1},a') - Q(S_t,A_t)\\Big]$$\n<p>The $\\max$ encodes the greedy target policy $\\pi(s) = \\arg\\max_a Q(s,a)$, regardless of what the behavior policy actually did. So the agent can explore with any $b$ (e.g. $\\varepsilon$-greedy) while learning $q_*$ directly. This is why Q-learning is off-policy: $A_{t+1}$ never appears in the update.</p>\n\n<p>The target $R_{t+1} + \\gamma \\max_{a'} Q(S_{t+1},a')$ is a sample of the Bellman <em>optimality</em> equation for $q_*$:</p>\n$$q_*(s,a) = \\mathbb{E}\\big[R_{t+1} + \\gamma \\max_{a'} q_*(S_{t+1},a') \\mid S_t=s, A_t=a\\big].$$\n<p>That is the deep reason Q-learning converges to $q_*$ even while following a thoroughly exploratory policy: its update is a stochastic-approximation fixed-point iteration on the optimality operator, which does not depend on $b$ — it only requires that $b$ keeps trying every action (so every $(s,a)$ is updated infinitely often).</p>\n\n<pre><code>Initialize Q(s,a) arbitrarily, Q(terminal,·)=0\nFor each episode:\n    S ← initial state\n    Repeat for each step:\n        A ← epsilon-greedy(Q, S)            # behavior policy\n        Take action A, observe R, S'\n        Q(S,A) ← Q(S,A) + alpha[R + gamma*max_a' Q(S',a') - Q(S,A)]\n        S ← S'\n    until S is terminal</code></pre>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">The Cliff Walking story</div>\n<p>On the classic Cliff Walking gridworld (a row of -100 cliff cells beside the optimal path), Q-learning learns the <em>optimal</em> path right along the cliff edge — because its target assumes greedy future behavior. SARSA learns a <em>safer</em>, longer path one row away, because its on-policy target accounts for the fact that $\\varepsilon$-greedy exploration will occasionally step off the cliff. With $\\varepsilon$ fixed, SARSA earns <strong>higher online reward</strong> during training, while Q-learning has learned the better policy to deploy once exploration stops. This is the on/off-policy tradeoff made concrete: optimal-to-deploy vs safe-while-learning.</p>\n</div>\n\n<h3>Expected SARSA: Reducing Variance</h3>\n<p>SARSA's target uses a single <em>sampled</em> next action $A_{t+1}$, which injects variance. <strong>Expected SARSA</strong> replaces that sample with its expectation under the current policy:</p>\n$$Q(S_t,A_t) \\leftarrow Q(S_t,A_t) + \\alpha\\Big[R_{t+1} + \\gamma \\sum_{a'} \\pi(a' \\mid S_{t+1})\\,Q(S_{t+1},a') - Q(S_t,A_t)\\Big].$$\n<p>By averaging over the policy's action distribution, Expected SARSA <strong>eliminates the variance due to the random choice of $A_{t+1}$</strong>, so it typically learns faster and tolerates larger step sizes (it can use $\\alpha = 1$ in deterministic environments). It is computationally a bit heavier (a sum over actions per step) but usually worth it.</p>\n\n<p>Expected SARSA is also a beautiful unifier. The target policy $\\pi$ in the expectation need not equal the behavior policy:</p>\n<ul>\n<li>If $\\pi$ is the <strong>same $\\varepsilon$-greedy policy used to behave</strong>, Expected SARSA is on-policy.</li>\n<li>If $\\pi$ is the <strong>greedy policy</strong>, then $\\sum_{a'} \\pi(a'\\mid S_{t+1}) Q(S_{t+1},a') = \\max_{a'} Q(S_{t+1},a')$ — and Expected SARSA <em>becomes exactly Q-learning</em>. Q-learning is the special, off-policy case of Expected SARSA with a greedy target.</li>\n</ul>\n\n<h3>Maximization Bias and Double Q-Learning</h3>\n<p>Q-learning's $\\max$ operator hides a subtle, systematic error. Suppose the true values of several actions at a state are all equal (say $0$), but our estimates $Q(s,a)$ are noisy. Then $\\max_a Q(s,a)$ is the maximum of several noisy estimates, and $\\mathbb{E}[\\max_a Q(s,a)] \\ge \\max_a \\mathbb{E}[Q(s,a)]$ (the $\\max$ function is convex, so this follows from Jensen's inequality). We use a single estimator both to <strong>choose</strong> the best action and to <strong>evaluate</strong> it, so noise that happens to be positive gets selected and propagated. The result is a positive <strong>maximization bias</strong> (a.k.a. overestimation bias).</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why this matters for ML</div>\n<p>Maximization bias is the tabular ancestor of overestimation in <strong>Deep Q-Networks (DQN)</strong>. <strong>Double DQN</strong> — used in essentially every modern value-based deep RL system — is the direct neural extension of Double Q-learning: it decouples action <em>selection</em> from action <em>evaluation</em> to fight the same bias. The same \"select with one estimator, evaluate with another\" trick recurs across statistics (cross-validation, sample splitting) wherever you reuse data to both pick and score.</p>\n</div>\n\n<p><strong>Double Q-learning</strong> fixes this with two independent estimators $Q_1$ and $Q_2$. On each step we flip a coin to decide which to update; the one being updated uses the <em>other</em> to evaluate the action it itself selected:</p>\n$$Q_1(S,A) \\leftarrow Q_1(S,A) + \\alpha\\Big[R + \\gamma\\, Q_2\\big(S',\\, \\textstyle\\arg\\max_{a'} Q_1(S',a')\\big) - Q_1(S,A)\\Big]$$\n<p>(and symmetrically with $Q_1 \\leftrightarrow Q_2$ on the other half of updates). Because $Q_1$ <em>selects</em> the action but $Q_2$ — estimated from a different stream of samples — <em>evaluates</em> it, the positive noise no longer correlates between selection and evaluation, and the overestimation largely vanishes. Conditioned on the action $Q_1$ selected, $Q_2$ provides an (approximately) unbiased estimate of that action's true value. The behavior policy is typically $\\varepsilon$-greedy with respect to $Q_1 + Q_2$.</p>\n\n<h3>Worked Example: One Transition, Three Updates</h3>\n<p>Setup: $\\gamma = 0.9$, step size $\\alpha = 0.5$. The agent is in state $S$, takes action $A$, receives reward $R = 2$, and lands in state $S'$. Current estimates:</p>\n<ul>\n<li>$Q(S,A) = 3$</li>\n<li>At $S'$ there are two actions: $Q(S', \\text{up}) = 5$ and $Q(S', \\text{down}) = 1$.</li>\n<li>The agent uses an $\\varepsilon$-greedy policy with $\\varepsilon = 0.2$ (two actions, so greedy action gets prob $1 - \\varepsilon + \\varepsilon/2 = 0.9$, the other $\\varepsilon/2 = 0.1$).</li>\n<li>For SARSA, the action actually selected at $S'$ was $A' = \\text{down}$ (an exploratory move).</li>\n</ul>\n\n<h4>Q-learning</h4>\n<p>Target uses the max over $S'$: $\\max_{a'} Q(S',a') = \\max(5,1) = 5$.</p>\n$$\\text{target} = R + \\gamma \\cdot 5 = 2 + 0.9(5) = 6.5,\\quad \\delta = 6.5 - 3 = 3.5$$\n$$Q(S,A) \\leftarrow 3 + 0.5(3.5) = 4.75$$\n\n<h4>SARSA</h4>\n<p>Target uses the <em>sampled</em> next action $A' = \\text{down}$, with $Q(S',\\text{down}) = 1$:</p>\n$$\\text{target} = R + \\gamma\\, Q(S',\\text{down}) = 2 + 0.9(1) = 2.9,\\quad \\delta = 2.9 - 3 = -0.1$$\n$$Q(S,A) \\leftarrow 3 + 0.5(-0.1) = 2.95$$\n<p>Same transition, opposite-sign update: Q-learning pulled $Q(S,A)$ <em>up</em> toward the best future; SARSA nudged it <em>down</em>, because the exploratory action it actually took was poor. This is the on/off-policy difference in a single number.</p>\n\n<h4>Expected SARSA</h4>\n<p>Target averages over the policy at $S'$. Greedy action is \"up\" (value 5, prob 0.9); \"down\" (value 1, prob 0.1):</p>\n$$\\mathbb{E}_{\\pi}[Q(S',\\cdot)] = 0.9(5) + 0.1(1) = 4.6$$\n$$\\text{target} = 2 + 0.9(4.6) = 6.14,\\quad \\delta = 6.14 - 3 = 3.14$$\n$$Q(S,A) \\leftarrow 3 + 0.5(3.14) = 4.57$$\n<p>Notice Expected SARSA's target ($6.14$) sits just below Q-learning's ($6.5$): the only difference is the 0.1 probability mass on the worse action. As $\\varepsilon \\to 0$, Expected SARSA's target $\\to$ Q-learning's. And unlike plain SARSA, the result does not depend on which action happened to be sampled — that is the variance reduction.</p>\n\n<h3>Summary: The Decision Table</h3>\n<ul>\n<li><strong>SARSA</strong> — on-policy; target $R + \\gamma Q(S',A')$; uses the action actually taken; learns the value of the (soft) policy it follows; safer during exploration.</li>\n<li><strong>Q-learning</strong> — off-policy; target $R + \\gamma \\max_{a'} Q(S',a')$; ignores the action taken; learns $q_*$ directly while exploring; the canonical off-policy bootstrap.</li>\n<li><strong>Expected SARSA</strong> — target $R + \\gamma \\sum_{a'}\\pi(a'\\mid S')Q(S',a')$; lower variance; on- or off-policy depending on $\\pi$; generalizes both SARSA and Q-learning.</li>\n<li><strong>Double Q-learning</strong> — two estimators decouple selection from evaluation to remove maximization bias; the conceptual seed of Double DQN.</li>\n</ul>\n<p>Hold onto the single organizing question: <em>which action's value does the target bootstrap from — the one I took (on-policy) or the one I wish I'd taken (off-policy)?</em> Everything else follows.</p>\n<p>See it learn: the agent below starts knowing nothing and explores ε-greedily, updating its Q-values from each transition (using the off-policy max target). Press <strong>Train 200</strong> and watch the greedy arrows snap toward the goal while steering around the pit.</p>\n<div data-viz=\"rl-q-learning\"></div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: on-policy vs off-policy — why SARSA and Q-learning split at the cliff's edge</summary>\n<p>Both methods nudge $Q(s,a)$ toward $r + \\gamma \\times [\\,\\text{value of the next state}\\,]$. The <em>only</em> difference is what fills that bracket:</p>\n<ul>\n<li><strong>SARSA</strong> uses $Q(s', a')$ where $a'$ is the action the agent <em>actually takes next</em> under its current $\\varepsilon$-greedy policy. It evaluates and improves the very policy it follows — <em>exploration included</em>. This is <strong>on-policy</strong>: the policy being learned is the policy generating the data.</li>\n<li><strong>Q-learning</strong> uses $\\max_{a'} Q(s', a')$ — the value of the <em>best</em> next action, no matter what the agent actually does. It learns about the greedy (optimal) policy while behaving with a different, exploratory one. This is <strong>off-policy</strong>: target policy $\\ne$ behavior policy.</li>\n</ul>\n<p>The famous consequence is <strong>cliff-walking</strong>. Q-learning learns the optimal route hugging the cliff edge (it's shortest), but since it keeps exploring with $\\varepsilon$-greedy, those random steps occasionally tip it off the edge — so its <em>online</em> reward during training is worse. SARSA, because its update accounts for its own exploration, learns a <em>safer</em> path one row back from the edge: lower theoretical optimum, but more reward earned while learning. Neither is wrong — Q-learning optimizes the greedy policy you would <em>deploy</em>; SARSA optimizes the policy you are actually <em>running</em>, exploration and all.</p>\n<p>Off-policy learning is the more powerful idea — it's what lets DQN train on a <strong>replay buffer</strong> of old experience generated by stale policies — but decoupling target from behavior is also what makes it harder to stabilize (the deadly triad again).</p>\n</details>\n<h3>Code it: one Q-learning update</h3>\n<p>The whole algorithm is this one line, applied over and over. Run it to see the TD target, the error (the \"surprise\"), and the new estimate after a half-step. Try setting <code>alpha = 1</code> (jump straight to the target) or change <code>nextQ</code>.</p>\n<div data-code=\"javascript\" data-expected=\"TD target = 1.72\nTD error  = 1.72\nUpdated Q = 0.86\">// Q-learning update:  Q(s,a) ← Q(s,a) + α·[ r + γ·maxₐ′ Q(s′,a′) − Q(s,a) ]\nlet   Q      = 0.0;            // current estimate for the (s,a) we just took\nconst alpha  = 0.5;           // learning rate — how far to step toward the target\nconst gamma  = 0.9;           // discount\nconst r      = 1.0;           // reward observed after taking a in s\nconst nextQ  = [0.4, 0.8, 0.2];   // Q(s′, ·) for the actions available in the next state\n\nconst maxNext  = Math.max(...nextQ);     // off-policy: bootstrap off the GREEDY next value\nconst tdTarget = r + gamma * maxNext;    // what we now believe Q(s,a) should be\nconst tdError  = tdTarget - Q;           // the \"surprise\"\nQ = Q + alpha * tdError;                 // move partway toward the target\n\nconsole.log(\"TD target = \" + tdTarget.toFixed(2));\nconsole.log(\"TD error  = \" + tdError.toFixed(2));\nconsole.log(\"Updated Q = \" + Q.toFixed(2));</div>",
          "mcq": [
            {
              "q": "Which target rule belongs to Q-learning?",
              "choices": [
                "$R_{t+1} + \\gamma\\, Q(S_{t+1}, A_{t+1})$ where $A_{t+1}$ is the action actually taken",
                "$R_{t+1} + \\gamma \\max_{a'} Q(S_{t+1}, a')$",
                "$R_{t+1} + \\gamma \\sum_{a'} \\pi(a'\\mid S_{t+1}) Q(S_{t+1}, a')$",
                "$R_{t+1} + \\gamma\\, V(S_{t+1})$ with $V$ the on-policy state value"
              ],
              "answer": 1,
              "explain": "Q-learning bootstraps from the greedy (max) action value at the next state, independent of what the behavior policy did. Choice 0 is SARSA; choice 2 is Expected SARSA."
            },
            {
              "q": "Why is Q-learning called off-policy while SARSA is on-policy?",
              "choices": [
                "Q-learning needs a model of the environment; SARSA does not",
                "Q-learning's target evaluates the greedy target policy regardless of the behavior policy that picked the action, whereas SARSA's target uses the action its own policy actually took",
                "SARSA cannot use $\\varepsilon$-greedy exploration but Q-learning can",
                "Q-learning updates state values and SARSA updates action values"
              ],
              "answer": 1,
              "explain": "Off-policy means the target policy (greedy, via max) differs from the behavior policy (e.g. $\\varepsilon$-greedy). SARSA's target uses $A_{t+1}$ drawn from the same policy it follows, so behavior = target. Both are model-free and both use action values."
            },
            {
              "q": "Maximization bias in Q-learning arises because:",
              "choices": [
                "The discount factor $\\gamma$ is too close to 1",
                "The same noisy estimator is used both to select the maximizing action and to evaluate it, and $\\mathbb{E}[\\max Q] \\ge \\max \\mathbb{E}[Q]$",
                "The step size $\\alpha$ does not decay over time",
                "Rewards are stochastic rather than deterministic"
              ],
              "answer": 1,
              "explain": "Selecting and evaluating with one noisy estimator makes positive noise systematically chosen, so the max overestimates the true value (the max is convex, so Jensen's inequality gives the bias). Double Q-learning fixes this by using a second independent estimator for evaluation."
            },
            {
              "q": "Setting the target policy $\\pi$ in Expected SARSA to be fully greedy makes the algorithm equivalent to:",
              "choices": [
                "Plain SARSA",
                "Monte Carlo control",
                "Q-learning",
                "TD(0) prediction"
              ],
              "answer": 2,
              "explain": "With a greedy $\\pi$, $\\sum_{a'} \\pi(a'\\mid S')Q(S',a') = \\max_{a'} Q(S',a')$, which is exactly Q-learning's target. Q-learning is the greedy-target special case of Expected SARSA."
            },
            {
              "q": "Why does model-free TD control center on estimating action-values $Q(s,a)$ rather than state-values $v(s)$?",
              "choices": [
                "Action-values converge faster than state-values under TD updates",
                "Greedy improvement from $Q$ is $\\arg\\max_a Q(s,a)$, which needs no model, whereas improving from $v$ requires the transition model $p(s',r\\mid s,a)$",
                "State-values cannot represent the optimal policy, only action-values can",
                "$Q$ requires less memory to store than $v$"
              ],
              "answer": 1,
              "explain": "With $v$ alone, policy improvement needs $p$ to look ahead, but $\\arg\\max_a Q(s,a)$ is directly model-free, which is exactly why control uses $Q$."
            },
            {
              "q": "In the on/off-policy distinction, what is the precise definition of an on-policy method?",
              "choices": [
                "The behavior policy $b$ equals the target policy $\\pi$, so the agent learns about the same policy it uses to act",
                "The behavior policy is always fully greedy with respect to $Q$",
                "The agent never explores and follows a deterministic policy",
                "The target policy $\\pi$ differs from the behavior policy $b$ to decouple exploration"
              ],
              "answer": 0,
              "explain": "On-policy means $b = \\pi$: the agent learns about the very policy it follows, which must stay soft (e.g. $\\varepsilon$-greedy) to keep exploring."
            },
            {
              "q": "An on-policy method using an $\\varepsilon$-greedy policy with a fixed $\\varepsilon > 0$ converges to which policy?",
              "choices": [
                "The optimal deterministic policy",
                "The best soft (near-greedy) policy, not the optimal deterministic one unless $\\varepsilon \\to 0$",
                "A purely random policy",
                "Whatever policy the behavior policy was initialized to"
              ],
              "answer": 1,
              "explain": "Because the policy itself stays soft to keep exploring, on-policy learning converges to the best soft policy, reaching the optimal deterministic policy only as $\\varepsilon \\to 0$."
            },
            {
              "q": "For a self-driving agent that must occasionally take random actions to learn, why is off-policy learning often preferable?",
              "choices": [
                "Off-policy learning eliminates the need for any exploration",
                "It can evaluate the value of good driving (greedy target $\\pi$) while still exploring with $b$, rather than valuing 'drive well but occasionally swerve at random'",
                "On-policy learning cannot handle continuous action spaces",
                "Off-policy methods never suffer from any estimation bias"
              ],
              "answer": 1,
              "explain": "Off-policy decouples exploration from evaluation, so the agent learns the value of the optimal target policy instead of the value of a policy that includes its own random exploratory swerves."
            },
            {
              "q": "Using the lesson's setup ($\\gamma = 0.9$, $\\alpha = 0.5$, $Q(S,A)=3$, $R=2$, and at $S'$ the values $Q(S',\\text{up})=5$, $Q(S',\\text{down})=1$), suppose the agent's exploratory move at $S'$ was $A'=\\text{up}$ instead of down. What is the resulting SARSA update for $Q(S,A)$?",
              "choices": [
                "$2.95$",
                "$4.75$",
                "$4.57$",
                "$2.90$"
              ],
              "answer": 1,
              "explain": "SARSA bootstraps from the sampled action: target $= 2 + 0.9\\cdot Q(S',\\text{up}) = 2 + 0.9(5) = 6.5$, so $\\delta = 6.5-3=3.5$ and $Q \\leftarrow 3 + 0.5(3.5) = 4.75$. Here the sampled action happens to be the greedy one, so SARSA momentarily coincides with the Q-learning result (4.75); the 2.95 distractor is the original case where $A'=\\text{down}$."
            },
            {
              "q": "An engineer claims: \"Expected SARSA has lower variance than plain SARSA, so it must also be less computationally expensive per step.\" What is wrong with this reasoning?",
              "choices": [
                "Expected SARSA actually has higher variance because summing over actions amplifies estimation noise",
                "Lower variance and cost are unrelated: Expected SARSA removes the sampling variance of $A_{t+1}$ but pays extra cost by summing $\\sum_{a'}\\pi(a'\\mid S')Q(S',a')$ over all actions each step",
                "Expected SARSA cannot use $\\alpha=1$, so it is strictly slower to converge in every environment",
                "Expected SARSA and plain SARSA have identical per-step cost because both touch only one next action"
              ],
              "answer": 1,
              "explain": "Variance reduction comes from replacing the single sampled $A_{t+1}$ with its expectation, but computing that expectation requires a sum over all actions, making each step heavier, not lighter. The two properties trade off rather than coincide; the lesson notes the extra cost is 'usually worth it.'"
            },
            {
              "q": "On the Cliff Walking gridworld with a fixed exploration rate $\\varepsilon > 0$, why does SARSA accumulate higher online reward during training even though Q-learning has learned the better deploy-time policy?",
              "choices": [
                "SARSA's on-policy target accounts for $\\varepsilon$-greedy slips, so it learns a safer path away from the cliff that loses less reward when exploration occurs",
                "SARSA uses a larger step size, so it simply learns the optimal cliff-edge path faster than Q-learning",
                "Q-learning's $\\max$ operator makes it ignore rewards entirely until $\\varepsilon \\to 0$",
                "SARSA disables exploration near the cliff, so it never falls off during training"
              ],
              "answer": 0,
              "explain": "SARSA's target bootstraps from the action actually taken under the soft policy, so it 'knows' that exploration will occasionally step off the cliff and prefers a safer detour, earning more online reward. Q-learning's greedy target learns the optimal edge path but suffers costly exploratory falls while $\\varepsilon$ stays fixed."
            },
            {
              "q": "Why does using a single estimator $Q$ to both select and evaluate the best next action produce a positive (not negative or zero) maximization bias, even when all actions have equal true value?",
              "choices": [
                "Because the step size $\\alpha$ accumulates positive rounding errors over time",
                "Because off-policy bootstrapping always inflates targets relative to on-policy bootstrapping",
                "Because the same noisy estimates are reused to pick the action, so $\\mathbb{E}[\\max_a Q(s,a)] \\ge \\max_a \\mathbb{E}[Q(s,a)]$ by Jensen's inequality (max is convex)",
                "Because $\\gamma < 1$ discounts negative noise more heavily than positive noise"
              ],
              "answer": 2,
              "explain": "The $\\max$ of noisy estimates selects whichever action's noise happened to be largest, and since $\\max$ is convex, $\\mathbb{E}[\\max_a Q] \\ge \\max_a \\mathbb{E}[Q]$ (Jensen), giving a systematic upward bias. It is the selection-and-evaluation with one estimator, not the step size or discount, that creates the bias; Double Q-learning fixes it by decoupling the two roles."
            },
            {
              "q": "What is the difference between <em>prediction</em> and <em>control</em> in RL?",
              "choices": [
                "They are two names for the same task",
                "Prediction finds the best policy; control merely evaluates a fixed one",
                "Control requires a known model while prediction does not",
                "Prediction estimates how good a <em>fixed</em> policy is ($v_\\pi$ or $q_\\pi$); control searches for a <em>good</em> policy — the actual goal of RL"
              ],
              "answer": 3,
              "explain": "Prediction (policy evaluation) answers \"how good is this policy?\"; control answers \"what is a good policy?\" SARSA and Q-learning are control methods — they interleave estimating $Q$ with improving the policy greedily w.r.t. it (generalized policy iteration)."
            },
            {
              "q": "What characterizes the SARSA update, and where does its name come from?",
              "choices": [
                "It updates using the maximum action-value at the next state, ignoring what the policy does",
                "It updates $Q(S_t,A_t)$ toward $R_{t+1}+\\gamma Q(S_{t+1},A_{t+1})$ using the next action $A_{t+1}$ <em>actually chosen</em> by the current policy — the tuple $(S,A,R,S,A)$ names it, and makes it on-policy",
                "It requires the environment's transition model to compute the target",
                "It can only evaluate a policy, never improve it"
              ],
              "answer": 1,
              "explain": "SARSA bootstraps off the action the agent <em>actually takes next</em> under its current ($\\varepsilon$-greedy) policy, so it evaluates and improves that very policy — on-policy. The five symbols $S_t,A_t,R_{t+1},S_{t+1},A_{t+1}$ give the method its name."
            },
            {
              "q": "What is the difference between an agent's <em>behavior</em> policy and its <em>target</em> policy?",
              "choices": [
                "They must always be identical",
                "The behavior policy is the one we deploy; the target policy only explores",
                "The <em>behavior</em> policy $b$ is the one the agent follows to generate experience (it must explore); the <em>target</em> policy $\\pi$ is the one whose value we are learning and ultimately want to deploy",
                "Both are fixed and never change during learning"
              ],
              "answer": 2,
              "explain": "On-policy methods (SARSA) use $b=\\pi$; off-policy methods (Q-learning) let $b\\ne\\pi$ — act with an exploratory $b$ but learn the value of a greedy target $\\pi$. Off-policy decouples exploration from the policy being evaluated."
            },
            {
              "q": "In TD control, why must the behavior policy keep exploring (e.g. $\\varepsilon$-greedy) rather than act purely greedily?",
              "choices": [
                "If it acted purely greedily it might never try other actions, so their $Q$ estimates stay wrong and it can lock onto a suboptimal choice — exploration keeps improving every action-value",
                "Exploration is only ever needed in dynamic programming",
                "A greedy policy cannot be represented by a $Q$-table",
                "Random actions are required to satisfy the Markov property"
              ],
              "answer": 0,
              "explain": "Control estimates $Q(s,a)$ from experience, so an action that is never tried never gets a reliable value. A purely greedy agent can fixate on a seemingly-best action and never discover a better one; $\\varepsilon$-greedy guarantees every action keeps being sampled."
            }
          ],
          "flashcards": [
            {
              "front": "SARSA update target",
              "back": "$R_{t+1} + \\gamma\\, Q(S_{t+1}, A_{t+1})$, where $A_{t+1}$ is the next action actually selected by the (soft) policy. On-policy: behavior policy = target policy."
            },
            {
              "front": "Q-learning update target",
              "back": "$R_{t+1} + \\gamma \\max_{a'} Q(S_{t+1}, a')$. Off-policy: bootstraps from the greedy target policy regardless of the exploratory behavior policy; converges to $q_*$."
            },
            {
              "front": "Behavior policy vs target policy",
              "back": "Behavior policy $b$ generates the experience (must explore); target policy $\\pi$ is the one being evaluated/improved. On-policy: $b=\\pi$. Off-policy: $b\\ne\\pi$."
            },
            {
              "front": "Expected SARSA target",
              "back": "$R_{t+1} + \\gamma \\sum_{a'} \\pi(a'\\mid S_{t+1}) Q(S_{t+1}, a')$. Removes variance from sampling $A_{t+1}$; reduces to SARSA (soft $\\pi$) or Q-learning (greedy $\\pi$)."
            },
            {
              "front": "Maximization bias and its fix",
              "back": "Using one noisy estimator to both select and evaluate the max gives positive overestimation ($\\mathbb{E}[\\max Q]\\ge\\max\\mathbb{E}[Q]$). Double Q-learning uses two estimators: $Q_1$ selects $\\arg\\max$, $Q_2$ evaluates it."
            },
            {
              "front": "GLIE condition for SARSA to reach $q_*$",
              "back": "Greedy in the Limit with Infinite Exploration: every $(s,a)$ visited infinitely often and the policy becomes greedy in the limit (e.g. $\\varepsilon_k = 1/k$), plus Robbins-Monro step sizes ($\\sum\\alpha=\\infty,\\ \\sum\\alpha^2<\\infty$)."
            }
          ],
          "homework": [
            {
              "prompt": "A shared transition: $\\gamma = 1$, $\\alpha = 0.1$. Agent in state $S$ takes action $A$, gets reward $R = -1$, lands in $S'$. Current estimates: $Q(S,A) = 0$, and at $S'$ the action values are $Q(S',\\text{left}) = 4$, $Q(S',\\text{right}) = -2$. The agent's $\\varepsilon$-greedy policy ($\\varepsilon = 0.5$, two actions) happened to sample $A' = \\text{right}$ at $S'$. Compute the new $Q(S,A)$ under (a) SARSA and (b) Q-learning, and state which update is larger and why.",
              "hint": "SARSA uses the sampled $A'=\\text{right}$; Q-learning uses $\\max(4,-2)$. New value = old + $\\alpha$(target - old).",
              "solution": "SARSA target: $R + \\gamma Q(S',\\text{right}) = -1 + 1(-2) = -3$. $\\delta = -3 - 0 = -3$. New $Q(S,A) = 0 + 0.1(-3) = -0.3$. \\n\\nQ-learning target: $R + \\gamma \\max(4,-2) = -1 + 4 = 3$. $\\delta = 3 - 0 = 3$. New $Q(S,A) = 0 + 0.1(3) = 0.3$. \\n\\nQ-learning's update is larger (and positive) because its target bootstraps from the best next action (left, value 4), assuming greedy future behavior. SARSA's update is negative because the agent actually explored into the poor action (right, value -2), so on-policy SARSA correctly reflects the cost of its own exploratory behavior."
            },
            {
              "prompt": "Classify each as on-policy or off-policy and justify in one sentence: (i) SARSA; (ii) Q-learning; (iii) Expected SARSA whose target policy equals its $\\varepsilon$-greedy behavior policy; (iv) Expected SARSA whose target policy is greedy while it behaves $\\varepsilon$-greedily.",
              "hint": "Ask for each: is the policy being evaluated (target) the same as the one generating actions (behavior)?",
              "solution": "(i) SARSA — on-policy: its target uses $A_{t+1}$ drawn from the very policy it follows, so target = behavior. (ii) Q-learning — off-policy: the target is greedy (the max) but behavior is exploratory $\\varepsilon$-greedy, so they differ. (iii) Expected SARSA with matching policies — on-policy: the expectation is taken under the same policy used to act. (iv) Expected SARSA with a greedy target but $\\varepsilon$-greedy behavior — off-policy; in fact it is identical to Q-learning, since the greedy expectation collapses to $\\max_{a'} Q(S',a')$."
            },
            {
              "prompt": "Explain, using a concrete two-action example with noisy estimates, why single-estimator Q-learning overestimates, and show how Double Q-learning's two-estimator rule removes the bias for that example.",
              "hint": "Let both actions have true value 0, but give each estimator independent symmetric noise. Compare $\\mathbb{E}[\\max(Q(a_1),Q(a_2))]$ to the cross-estimator evaluation.",
              "solution": "Let true $q(s,a_1)=q(s,a_2)=0$. Suppose a single estimator gives independent estimates each equal to $+1$ or $-1$ with probability 1/2 (mean 0). Then $\\max$ of the two estimates is $+1$ unless both are $-1$ (prob 1/4), so $\\mathbb{E}[\\max] = (3/4)(1) + (1/4)(-1) = 0.5 > 0 = \\max_a \\mathbb{E}[Q]$. The max systematically picks up positive noise — a $+0.5$ overestimation. \\n\\nDouble Q-learning keeps two independent estimators $Q_1, Q_2$. It selects the maximizing action with $Q_1$: $a^* = \\arg\\max_a Q_1(s,a)$, but evaluates it with $Q_2$: it uses $Q_2(s, a^*)$ in the target. Because $a^*$ is chosen by $Q_1$ but its value read from the independent $Q_2$, the positive noise that made $Q_1(s,a^*)$ large is uncorrelated with $Q_2(s,a^*)$. Conditioned on the (essentially arbitrary, noise-driven) choice of $a^*$, $\\mathbb{E}[Q_2(s,a^*)] = q(s,a^*) = 0$. So the evaluation is unbiased and the $+0.5$ overestimate disappears. (Updates alternate which estimator is selector vs evaluator so both stay calibrated.)"
            }
          ],
          "examples": [
            {
              "title": "One SARSA update vs. one Q-learning update on the same transition",
              "body": "An agent is in a tiny MDP with discount $\\gamma = 0.9$ and learning rate $\\alpha = 0.5$. It is at state $s$, takes action $a$, receives reward $r = 2$, and lands in state $s'$. The current action-value estimates for $s'$ are $Q(s', a_1) = 4$, $Q(s', a_2) = 10$, and $Q(s', a_3) = 1$. The behavior policy is $\\varepsilon$-greedy and, on this step, it actually picks the exploratory action $a' = a_1$ in $s'$. Starting from $Q(s, a) = 0$, compute the updated $Q(s, a)$ under (i) SARSA and (ii) Q-learning, and explain why they differ.",
              "solution": "Both algorithms use the same TD update form\n\n$$Q(s,a) \\leftarrow Q(s,a) + \\alpha\\big[\\,\\text{target} - Q(s,a)\\,\\big],$$\n\nbut they differ in what they plug in as the <strong>TD target</strong> at $s'$.\n\n<strong>Step 1 — SARSA target (on-policy).</strong> SARSA uses the action $a'$ that the behavior policy <em>actually took</em> in $s'$. Here $a' = a_1$, so it uses $Q(s', a_1) = 4$:\n\n$$\\text{target}_{\\text{SARSA}} = r + \\gamma\\, Q(s', a') = 2 + 0.9 \\cdot 4 = 2 + 3.6 = 5.6.$$\n\n<strong>Step 2 — SARSA update.</strong>\n\n$$Q(s,a) \\leftarrow 0 + 0.5\\,(5.6 - 0) = 0.5 \\cdot 5.6 = 2.8.$$\n\n<strong>Step 3 — Q-learning target (off-policy).</strong> Q-learning ignores which action was taken and uses the <em>greedy</em> (max) value at $s'$, regardless of behavior:\n\n$$\\text{target}_{\\text{QL}} = r + \\gamma \\max_{a''} Q(s', a'') = 2 + 0.9 \\cdot \\max\\{4, 10, 1\\} = 2 + 0.9 \\cdot 10 = 2 + 9 = 11.$$\n\n<strong>Step 4 — Q-learning update.</strong>\n\n$$Q(s,a) \\leftarrow 0 + 0.5\\,(11 - 0) = 0.5 \\cdot 11 = 5.5.$$\n\n<strong>Why they differ.</strong> The exploratory choice $a' = a_1$ has a low value ($4$), but the greedy action $a_2$ has value $10$. SARSA's target ($5.6$) is <em>contaminated</em> by the exploratory move it actually made — it learns the value of the $\\varepsilon$-greedy behavior policy. Q-learning's target ($11$) bootstraps from the best action $a_2$ as if it would act greedily next — it learns the value of the greedy target policy directly, independent of how the agent explored.\n\n<strong>Answer.</strong> $Q(s,a) = 2.8$ under SARSA and $Q(s,a) = 5.5$ under Q-learning. They coincide only when the action taken in $s'$ happens to be the greedy one."
            },
            {
              "title": "SARSA vs. Q-learning on a 'cliff' state: why on-policy plays it safe",
              "body": "Consider a state $s$ with two actions: $a_{\\text{safe}}$ and $a_{\\text{risky}}$. Taking $a_{\\text{risky}}$ leads, with the current $\\varepsilon$-greedy behavior policy ($\\varepsilon = 0.5$), into a successor state $s'$ where the greedy action has value $Q(s', g) = +10$ but the only other (exploratory) action falls off a cliff with value $Q(s', c) = -100$. Taking $a_{\\text{safe}}$ leads to $s''$ with both actions valued at $Q(s'', \\cdot) = +1$. With $\\gamma = 1$ and immediate reward $r = 0$ on either transition, compute the bootstrap target each method assigns to $a_{\\text{risky}}$ (in expectation over behavior for SARSA), compare it to $a_{\\text{safe}}$, and say which action each method will eventually prefer.",
              "solution": "With $\\gamma = 1$ and $r = 0$, every TD target reduces to the (discount-1) bootstrap value of the successor state. We evaluate $a_{\\text{risky}}$ and $a_{\\text{safe}}$ under each algorithm.\n\n<strong>Step 1 — Q-learning target for $a_{\\text{risky}}$ (off-policy, uses $\\max$).</strong> Q-learning bootstraps from the best action at $s'$, ignoring the cliff action entirely:\n\n$$\\text{target}_{\\text{QL}}(a_{\\text{risky}}) = r + \\gamma \\max_{a''} Q(s', a'') = 0 + 1 \\cdot \\max\\{+10,\\,-100\\} = +10.$$\n\n<strong>Step 2 — Q-learning target for $a_{\\text{safe}}$.</strong>\n\n$$\\text{target}_{\\text{QL}}(a_{\\text{safe}}) = 0 + 1 \\cdot \\max\\{+1,\\,+1\\} = +1.$$\n\nSince $+10 > +1$, <strong>Q-learning prefers $a_{\\text{risky}}$.</strong> It learns the value of the optimal (greedy) policy, which would never voluntarily step off the cliff, so the $-100$ never enters its target.\n\n<strong>Step 3 — SARSA target for $a_{\\text{risky}}$ (on-policy, expectation over behavior).</strong> SARSA bootstraps from the action the $\\varepsilon$-greedy behavior policy <em>actually takes</em> in $s'$. With $\\varepsilon = 0.5$, the agent takes the greedy action with probability $1 - \\varepsilon/2$ and each non-greedy action with probability $\\varepsilon/2$. With two actions, the greedy one $g$ is chosen with probability $1 - 0.5/2 = 0.75$ and the cliff action $c$ with probability $0.5/2 = 0.25$. In expectation the SARSA target is\n\n$$\\mathbb{E}[\\text{target}_{\\text{SARSA}}(a_{\\text{risky}})] = 0.75 \\cdot (+10) + 0.25 \\cdot (-100) = 7.5 - 25 = -17.5.$$\n\n<strong>Step 4 — SARSA target for $a_{\\text{safe}}$.</strong> At $s''$ both actions are valued $+1$, so whatever the behavior policy picks, the target is\n\n$$\\mathbb{E}[\\text{target}_{\\text{SARSA}}(a_{\\text{safe}})] = 0.75 \\cdot (+1) + 0.25 \\cdot (+1) = +1.$$\n\nSince $+1 > -17.5$, <strong>SARSA prefers $a_{\\text{safe}}$.</strong>\n\n<strong>Interpretation.</strong> SARSA evaluates actions <em>as if the agent will keep exploring</em>. Because exploration near the cliff occasionally triggers the $-100$ outcome, SARSA penalizes the risky route and routes the agent along the safe path — exactly the behavior seen in Sutton & Barto's Cliff Walking example. Q-learning, learning the greedy policy's value, judges the risky route by its potential ($+10$) and ignores the cost of its own exploration, so it favors the cliff edge even while an $\\varepsilon$-greedy agent occasionally falls.\n\n<strong>Answer.</strong> Targets: Q-learning gives $a_{\\text{risky}} = +10$ vs. $a_{\\text{safe}} = +1$ (prefers risky); SARSA gives $a_{\\text{risky}} = -17.5$ vs. $a_{\\text{safe}} = +1$ (prefers safe). The difference is the on-policy ($\\mathbb{E}$ over behavior, including exploration) vs. off-policy ($\\max$, greedy target) bootstrap."
            }
          ]
        },
        {
          "id": "rl-eligibility-traces",
          "title": "n-step Returns and Eligibility Traces",
          "minutes": 14,
          "content": "<h3>Where We Are: Between Two Extremes</h3>\n<p>We have two ways to estimate a state's value $v_\\pi(s)$ from experience. <strong>Monte Carlo (MC)</strong> waits until an episode ends and updates toward the <em>full return</em> $G_t = R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\cdots$. <strong>Temporal-difference learning, TD(0)</strong>, updates after a single step toward the <em>one-step target</em> $R_{t+1} + \\gamma V(S_{t+1})$, where it <em>bootstraps</em> — it builds its estimate partly on top of another estimate.</p>\n<p>These are not rivals so much as the two endpoints of a continuum. MC is unbiased but high-variance: the full return aggregates the noise of every reward and every random transition until termination. TD(0) is low-variance but biased: it leans on a current value estimate $V(S_{t+1})$ that may be wrong, especially early in learning. The natural question — and the subject of this lesson — is: <em>what lives in between, and can we get the best of both?</em></p>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>MC asks \"what actually happened, all the way to the end?\" TD(0) asks \"what happened in one step, then trust my guess about the rest?\" In between sits a family of methods that look ahead $n$ steps with real rewards, then bootstrap. The further you look, the more you behave like MC; the less you look, the more you behave like TD.</p>\n</div>\n\n<h3>n-step Returns</h3>\n<p>The idea is direct: take $n$ real reward steps, then bootstrap from the estimated value of the state you land in. The <strong>n-step return</strong> from time $t$ is</p>\n$$G_t^{(n)} = R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\cdots + \\gamma^{n-1} R_{t+n} + \\gamma^n V(S_{t+n}).$$\n<p>Read the two pieces separately. The sum $\\sum_{k=1}^{n} \\gamma^{k-1} R_{t+k}$ is $n$ steps of <em>actual, sampled</em> reward. The trailing term $\\gamma^n V(S_{t+n})$ is the bootstrap: a single estimate that summarizes \"everything from step $n$ onward.\" Special cases recover the endpoints:</p>\n<ul>\n<li>$n = 1$: $G_t^{(1)} = R_{t+1} + \\gamma V(S_{t+1})$ — exactly the TD(0) target.</li>\n<li>$n = \\infty$ (or $n$ reaching the terminal step): $G_t^{(\\infty)} = G_t$ — the full Monte Carlo return, since there is no state left to bootstrap from.</li>\n</ul>\n<p>The <strong>n-step TD update</strong> then nudges the value toward this target:</p>\n$$V(S_t) \\leftarrow V(S_t) + \\alpha \\left[ G_t^{(n)} - V(S_t) \\right].$$\n<p>Because the target uses rewards through time $t+n$, you can only perform this update once you have observed $S_{t+n}$ — so n-step methods incur a delay of $n$ steps. Implementations keep a small sliding window of recent states and rewards and apply each update once enough future has arrived.</p>\n\n<h4>Why n is a bias–variance knob</h4>\n<p>Each extra step of real reward replaces one factor of \"trust my estimate\" with one factor of \"use what actually happened.\" More real reward means the target depends less on the possibly-wrong current value function — that reduces <em>bias</em>. But more real reward also means the target inherits the randomness of more transitions and rewards — that increases <em>variance</em>. There is typically an intermediate $n$ (often a single-digit number like $n=4$ or $n=8$) that learns faster than either extreme. This is the same bias–variance tradeoff that pervades all of statistical machine learning, here expressed in the temporal dimension.</p>\n\n<h3>The $\\lambda$-Return: Averaging Over All n</h3>\n<p>Choosing a single $n$ feels arbitrary. Why commit to looking exactly 4 steps ahead? A more elegant idea is to <em>average</em> n-step returns for all $n$ at once. Any weighted average of valid targets (with weights summing to 1) is itself a valid target. The <strong>$\\lambda$-return</strong> uses a specific geometric weighting controlled by a parameter $\\lambda \\in [0,1]$:</p>\n$$G_t^{\\lambda} = (1-\\lambda) \\sum_{n=1}^{\\infty} \\lambda^{\\,n-1} \\, G_t^{(n)}.$$\n<p>The weight on the $n$-step return is $(1-\\lambda)\\lambda^{n-1}$. These weights decay geometrically and sum to exactly 1: $(1-\\lambda)\\sum_{n=1}^\\infty \\lambda^{n-1} = (1-\\lambda)\\cdot \\frac{1}{1-\\lambda} = 1$. So $G_t^\\lambda$ is a genuine convex combination of all the n-step returns — short looks get the most weight, longer looks get exponentially less.</p>\n<p>For an episode that <strong>terminates</strong> at time $T$ (so $t+n \\ge T$ means the n-step return is just the full return $G_t$), the weights for all $n$ that reach termination collapse onto $G_t$. The exact finite-horizon form is:</p>\n$$G_t^{\\lambda} = (1-\\lambda) \\sum_{n=1}^{T-t-1} \\lambda^{\\,n-1} G_t^{(n)} \\;+\\; \\lambda^{\\,T-t-1} G_t.$$\n<p>The leftover weight $\\lambda^{T-t-1}$ on the final term is exactly the tail of the geometric series, so the weights still sum to 1.</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Key fact</div>\n<p>The two endpoints of $\\lambda$ recover the methods we already know. With $\\lambda = 0$, only the $n=1$ term survives ($\\lambda^{n-1}$ is $0$ for $n>1$, using the convention $0^0=1$), so $G_t^0 = G_t^{(1)}$ — pure <strong>TD(0)</strong>. With $\\lambda = 1$, the finite-horizon weights collapse onto the longest available return — the full return — giving $G_t^1 = G_t$, pure <strong>Monte Carlo</strong>. So $\\lambda$ is a smooth dial from one-step bootstrapping to full returns.</p>\n</div>\n\n<h3>Forward View vs. Backward View</h3>\n<p>The $\\lambda$-return as written is a <strong>forward view</strong>: to update $V(S_t)$ you look <em>forward</em> into the future at all the rewards and states that follow. It is conceptually beautiful but practically awkward — you must wait until the end of the episode (or until $\\lambda^{n}$ is negligibly small) before you can compute the target. It is also non-causal in spirit: each state stares into its own future.</p>\n<p>The remarkable result is that there is a mechanically equivalent <strong>backward view</strong> that updates <em>online</em>, incrementally, after every single step, using only quantities available at that moment. The device that makes this possible is the <strong>eligibility trace</strong>.</p>\n\n<h4>Eligibility traces</h4>\n<p>Keep one extra number per state, $E_t(s)$, the eligibility trace. Intuitively it is a short-term memory of \"how recently and how often have I visited $s$?\" — and therefore \"how much credit or blame should $s$ receive for whatever surprise I am about to encounter?\" The accumulating trace is updated every step:</p>\n$$E_t(s) = \\gamma \\lambda E_{t-1}(s) + \\mathbb{1}[S_t = s], \\qquad E_0(s) = 0 \\;\\;\\forall s.$$\n<p>Every step, all traces decay by the factor $\\gamma\\lambda$, and the state you are currently in gets bumped up by 1. A recently visited state has a large trace; a state visited long ago has a trace that has nearly decayed to zero. Traces blend two heuristics for credit assignment that psychologists studied long before RL: <em>recency</em> (the decay) and <em>frequency</em> (the repeated $+1$ bumps).</p>\n\n<h4>Backward TD(λ)</h4>\n<p>At each step we compute the ordinary one-step <strong>TD error</strong>:</p>\n$$\\delta_t = R_{t+1} + \\gamma V(S_{t+1}) - V(S_t).$$\n<p>Then — and this is the key move — we broadcast that single scalar error to <em>every</em> state, scaled by its current eligibility:</p>\n$$V(s) \\leftarrow V(s) + \\alpha \\, \\delta_t \\, E_t(s) \\qquad \\text{for all } s.$$\n<p>So the surprise that occurred at the current step flows backward in time to all the states that led up to it, in proportion to how \"eligible\" each one still is. A state visited 3 steps ago receives a fraction $(\\gamma\\lambda)^3$ of the update; one visited just now receives nearly the full update. This is exactly the temporal credit-assignment problem solved with a single elegant mechanism.</p>\n<div class=\"callout violet\">\n<div class=\"c-tag\">The big picture</div>\n<p><strong>Equivalence theorem.</strong> For offline updates (accumulated over an episode and applied at the end), the total update made by backward TD($\\lambda$) at each state equals the update prescribed by the forward $\\lambda$-return view. The forward view tells you <em>what</em> you are computing (an average of n-step returns); the backward view tells you <em>how</em> to compute it efficiently and causally. This forward/backward duality — a clean offline objective realized by an online, local update rule — recurs throughout ML, most visibly in backpropagation, where a global loss is realized by local gradient messages flowing backward through a network.</p>\n</div>\n<p>Note the endpoints again, now mechanically: with $\\lambda=0$, the trace is $E_t(s)=\\mathbb{1}[S_t=s]$ (it never persists), so only the current state is updated, by $\\alpha\\delta_t$ — that is literally TD(0). With $\\lambda=1$ (and $\\gamma=1$), credit never decays within an episode, and the accumulated updates reproduce every-visit Monte Carlo. Hence the algorithm's name, TD($\\lambda$): a parameterized family spanning TD(0) to MC.</p>\n\n<h3>Worked Example: Computing an n-step Return</h3>\n<p>Consider an episode with $\\gamma = 0.9$. Starting at state $S_0$ we observe the trajectory and rewards:</p>\n<pre><code>S0 --R1=2--> S1 --R2=0--> S2 --R3=1--> S3 --R4=3--> S4 (terminal)</code></pre>\n<p>Suppose our current value estimates are $V(S_1)=5$, $V(S_2)=4$, $V(S_3)=2$, and $V(S_4)=0$ (terminal). Compute several targets for updating $V(S_0)$.</p>\n<p><strong>1-step (TD(0)) target:</strong></p>\n$$G_0^{(1)} = R_1 + \\gamma V(S_1) = 2 + 0.9 \\times 5 = 6.5.$$\n<p><strong>2-step target:</strong></p>\n$$G_0^{(2)} = R_1 + \\gamma R_2 + \\gamma^2 V(S_2) = 2 + 0.9(0) + 0.81(4) = 2 + 0 + 3.24 = 5.24.$$\n<p><strong>3-step target:</strong></p>\n$$G_0^{(3)} = R_1 + \\gamma R_2 + \\gamma^2 R_3 + \\gamma^3 V(S_3) = 2 + 0 + 0.81(1) + 0.729(2) = 2 + 0.81 + 1.458 = 4.268.$$\n<p><strong>Full return (MC, here the 4-step return since $S_4$ is terminal):</strong></p>\n$$G_0 = R_1 + \\gamma R_2 + \\gamma^2 R_3 + \\gamma^3 R_4 = 2 + 0 + 0.81 + 0.729(3) = 2 + 0.81 + 2.187 = 4.997.$$\n<p>Notice how the targets shift as we look further ahead. The 1-step target ($6.5$) leans heavily on the optimistic estimate $V(S_1)=5$, and as we incorporate more real reward the targets pull down toward the reward-grounded region ($5.24 \\to 4.268$), with the full MC return settling at $4.997$. Each extra step swaps a bit of estimate for a bit of reality — and because the rewards and intermediate estimates differ, the sequence need not be perfectly monotone (here the 3-step target slightly undershoots the MC return). With $\\alpha = 0.1$, the TD(0) update would be $V(S_0)\\leftarrow V(S_0) + 0.1(6.5 - V(S_0))$, while the MC update would target $4.997$ instead.</p>\n\n<h4>Now combine them: a quick $\\lambda$-return</h4>\n<p>Let $\\lambda = 0.5$, $\\gamma = 0.9$. The episode terminates after 4 steps from $S_0$, so the relevant n-step returns are $G_0^{(1)}=6.5$, $G_0^{(2)}=5.24$, $G_0^{(3)}=4.268$, and $G_0^{(4)}=G_0=4.997$ (the full return). Using the finite-horizon form with $T-t = 4$:</p>\n$$G_0^{\\lambda} = (1-\\lambda)\\left[\\lambda^0 G_0^{(1)} + \\lambda^1 G_0^{(2)} + \\lambda^2 G_0^{(3)}\\right] + \\lambda^3 G_0^{(4)}.$$\n<p>Plugging in $\\lambda = 0.5$ (so $1-\\lambda = 0.5$, $\\lambda^1=0.5$, $\\lambda^2=0.25$, $\\lambda^3=0.125$):</p>\n$$G_0^{\\lambda} = 0.5\\left[(1)(6.5) + (0.5)(5.24) + (0.25)(4.268)\\right] + (0.125)(4.997).$$\n$$= 0.5\\left[6.5 + 2.62 + 1.067\\right] + 0.624625 = 0.5(10.187) + 0.624625 = 5.0935 + 0.624625 = 5.718125 \\approx 5.718.$$\n<p>Sanity check on the weights: $0.5,\\ 0.25,\\ 0.125$ on the first three returns plus $0.125$ on the full return sum to $1.0$. Good — it is a true weighted average, landing between the short-sighted TD value and the grounded MC value, but tilted toward the near-term returns because $\\lambda=0.5$ decays weight quickly.</p>\n\n<h3>Choosing λ in Practice and the Connection to Modern RL</h3>\n<p>Empirically, performance as a function of $\\lambda$ tends to be U-shaped: intermediate values (commonly $\\lambda \\approx 0.8$–$0.95$) often outperform both $\\lambda=0$ and $\\lambda=1$, because they capture multi-step signal while damping variance. The exact sweet spot depends on the environment's stochasticity and how good your value estimates already are.</p>\n<p>These ideas are not historical curiosities. n-step returns are central to modern deep RL: <strong>n-step Q-learning</strong> appears in the Rainbow DQN agent, and <strong>n-step / λ-style returns</strong> underpin actor–critic methods. <strong>Generalized Advantage Estimation (GAE)</strong>, the advantage estimator used by PPO and most contemporary policy-gradient systems (including in RLHF pipelines that align large language models), is precisely an exponentially weighted average of n-step advantage estimates with a parameter $\\lambda$ — the eligibility-trace idea in advantage form. When you tune GAE's $\\lambda$, you are turning the very bias–variance dial introduced here.</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>The forward/backward duality and the bias–variance dial are transferable mental models. \"Trade a noisy unbiased estimate against a smooth biased one, and average over horizons\" is the same instinct behind GAE in PPO, behind TD-target choices in value learning, and even behind the recency/frequency intuition for credit assignment. Master TD($\\lambda$) and you understand the spine of a large fraction of practical RL.</p>\n</div>\n\n<h3>Summary</h3>\n<ul>\n<li>The <strong>n-step return</strong> $G_t^{(n)} = \\sum_{k=1}^{n}\\gamma^{k-1}R_{t+k} + \\gamma^n V(S_{t+n})$ interpolates between TD(0) ($n=1$) and MC ($n=\\infty$).</li>\n<li>Larger $n$ (or larger $\\lambda$) means lower bias, higher variance; smaller means the reverse — a temporal bias–variance tradeoff.</li>\n<li>The <strong>$\\lambda$-return</strong> $G_t^\\lambda = (1-\\lambda)\\sum_n \\lambda^{n-1} G_t^{(n)}$ is a geometric average over all n-step returns; $\\lambda=0$ gives TD(0), $\\lambda=1$ gives MC.</li>\n<li>The <strong>forward view</strong> defines the target; the <strong>backward view</strong> with <strong>eligibility traces</strong> ($E_t(s)=\\gamma\\lambda E_{t-1}(s)+\\mathbb{1}[S_t=s]$, updates $V(s)\\mathrel{+}=\\alpha\\delta_t E_t(s)$) computes it online. They are equivalent for offline updates.</li>\n<li>These mechanisms scale up to deep RL via n-step targets and GAE.</li>\n</ul>",
          "mcq": [
            {
              "q": "An episode runs with $\\gamma = 1$. From state $S_t$ the agent receives rewards $R_{t+1}=1,\\ R_{t+2}=2,\\ R_{t+3}=4$, then lands in $S_{t+3}$ with $V(S_{t+3})=10$. What is the 3-step return $G_t^{(3)}$?",
              "choices": [
                "7",
                "17",
                "13",
                "10"
              ],
              "answer": 1,
              "explain": "With $\\gamma=1$, $G_t^{(3)} = 1 + 2 + 4 + V(S_{t+3}) = 7 + 10 = 17$. The first three terms are real rewards; the fourth is the bootstrap from the landing state."
            },
            {
              "q": "In the backward view of TD($\\lambda$), setting $\\lambda = 0$ produces which behavior?",
              "choices": [
                "Every-visit Monte Carlo, because credit never decays",
                "Pure TD(0): only the current state is updated by $\\alpha\\delta_t$, since the trace does not persist",
                "An equal-weighted average of all n-step returns",
                "No updates at all, because all traces are zero"
              ],
              "answer": 1,
              "explain": "With $\\lambda=0$ the trace is $E_t(s)=\\mathbb{1}[S_t=s]$ (it decays instantly), so only the current state gets updated by the one-step TD error — exactly TD(0). $\\lambda=1$ would give Monte Carlo."
            },
            {
              "q": "Which statement about the bias–variance behavior of n-step returns is correct?",
              "choices": [
                "Increasing $n$ increases bias and decreases variance",
                "Increasing $n$ decreases bias (less reliance on possibly-wrong estimates) but increases variance (more random rewards/transitions)",
                "$n$ affects neither bias nor variance, only computational cost",
                "Decreasing $n$ toward 1 makes the estimate unbiased"
              ],
              "answer": 1,
              "explain": "More real reward steps reduce dependence on the bootstrap estimate (lower bias) but accumulate more sampling noise (higher variance). The MC end ($n=\\infty$) is unbiased; the TD end ($n=1$) is biased but low-variance."
            },
            {
              "q": "Why is the $\\lambda$-return a valid update target even though it averages many different n-step returns?",
              "choices": [
                "Because $\\lambda$ is always less than 1",
                "Because the geometric weights $(1-\\lambda)\\lambda^{n-1}$ are nonnegative and sum to 1, making it a convex combination of valid targets",
                "Because only the longest n-step return actually matters",
                "Because the eligibility traces normalize it automatically"
              ],
              "answer": 1,
              "explain": "Any convex combination (nonnegative weights summing to 1) of valid targets is itself a valid target; the geometric series $(1-\\lambda)\\sum_n \\lambda^{n-1}=1$ guarantees this."
            },
            {
              "q": "An agent observes rewards $R_{t+1}=2$, $R_{t+2}=0$, $R_{t+3}=4$ with $\\gamma=0.5$, and the current estimate $V(S_{t+3})=10$. What is the 3-step return $G_t^{(3)}$?",
              "choices": [
                "$4.25$",
                "$3.25$",
                "$6.00$",
                "$13.00$"
              ],
              "answer": 0,
              "explain": "$G_t^{(3)} = R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\gamma^3 V(S_{t+3}) = 2 + 0.5\\cdot 0 + 0.25\\cdot 4 + 0.125\\cdot 10 = 2 + 0 + 1 + 1.25 = 4.25$."
            },
            {
              "q": "Why do n-step methods incur a delay of $n$ steps before they can update $V(S_t)$?",
              "choices": [
                "Because the target $G_t^{(n)}$ requires rewards through time $t+n$ and the bootstrap value $V(S_{t+n})$, which are only known after observing $S_{t+n}$",
                "Because the learning rate $\\alpha$ must be annealed over $n$ steps before any update is valid",
                "Because bootstrapping introduces bias that takes $n$ steps to wash out of the estimate",
                "Because the episode must terminate before any n-step return can be computed"
              ],
              "answer": 0,
              "explain": "The n-step target depends on rewards up to $R_{t+n}$ and on the bootstrap value $V(S_{t+n})$, so the update for $S_t$ cannot be performed until step $t+n$ has been observed."
            },
            {
              "q": "As $n$ increases, how do the bias and variance of the n-step return $G_t^{(n)}$ as an estimate of $v_\\pi(S_t)$ tend to change?",
              "choices": [
                "Bias decreases (less reliance on the bootstrap estimate) while variance increases (more sampled rewards accumulate noise)",
                "Both bias and variance decrease, which is why large $n$ is always optimal",
                "Bias increases because more bootstrapping is used, while variance decreases",
                "Both bias and variance stay constant since $n$ only affects the update delay"
              ],
              "answer": 0,
              "explain": "Larger $n$ uses more real sampled rewards and less of the (possibly inaccurate) bootstrap, lowering bias but accumulating more reward noise and thus raising variance, moving toward the Monte Carlo endpoint."
            },
            {
              "q": "In the n-step return formula, what role does the trailing term $\\gamma^n V(S_{t+n})$ play?",
              "choices": [
                "It is the bootstrap term: a single value estimate that summarizes all expected return from step $n$ onward",
                "It is a regularization penalty that shrinks the value estimate toward zero",
                "It is the exact remaining true return from $S_{t+n}$, making the target unbiased",
                "It is the importance-sampling correction needed for off-policy n-step updates"
              ],
              "answer": 0,
              "explain": "The term $\\gamma^n V(S_{t+n})$ bootstraps by substituting a current value estimate for everything beyond the $n$ sampled reward steps; it vanishes only when $S_{t+n}$ is terminal (recovering the full Monte Carlo return)."
            },
            {
              "q": "Using accumulating eligibility traces with $\\gamma=1$ and $\\lambda=0.5$, an agent follows $S_A \\to S_B \\to S_A$ (it revisits $S_A$). Traces start at 0. What is $E(S_A)$ at the moment just after the second visit to $S_A$?",
              "choices": [
                "$0.25$",
                "$1.0$",
                "$1.25$",
                "$0.5$"
              ],
              "answer": 2,
              "explain": "After the first visit, $E(S_A)=1$. Two decays by $\\gamma\\lambda=0.5$ would leave $0.25$, but the accumulating trace then *adds* 1 on the revisit: $0.5\\cdot 1 \\cdot 0.5 + ... $ — concretely the old trace decays to $0.5\\times1=0.5$ over the $S_B$ step, then to $0.25$, and the $+1$ bump gives $0.25+1=1.25$. Choosing $1.0$ wrongly treats it as a replacing trace that resets to 1."
            },
            {
              "q": "The forward-view $\\lambda$-return and the backward-view TD($\\lambda$) with eligibility traces are described as 'equivalent.' Under what condition does this equivalence hold exactly?",
              "choices": [
                "Only when $\\lambda=0$, since both then reduce to TD(0)",
                "For offline updates accumulated over an episode and applied at the end",
                "Always, for every individual online update at every time step",
                "Only in deterministic environments where returns have no variance"
              ],
              "answer": 1,
              "explain": "The equivalence theorem holds for *offline* updates: summed over an episode, backward TD($\\lambda$) produces the same per-state total update as the forward $\\lambda$-return. It is not exact for individual online updates (that motivated later 'true online' variants), so the 'always, every step' option is the tempting but wrong choice."
            },
            {
              "q": "For an episode that terminates at step $T$, the finite-horizon $\\lambda$-return places weight $(1-\\lambda)\\lambda^{n-1}$ on each n-step return up to termination, plus a leftover weight on the full return $G_t$. Why does that final term get weight $\\lambda^{T-t-1}$ rather than $(1-\\lambda)\\lambda^{T-t-1}$?",
              "choices": [
                "Because the full return is unbiased and therefore earns a larger weight by design",
                "Because it absorbs the entire remaining tail of the geometric series, so the weights still sum to exactly 1",
                "Because $\\lambda^{T-t-1}$ is the eligibility trace value at termination",
                "Because termination forces $\\lambda$ to be reset to 1 on the last step"
              ],
              "answer": 1,
              "explain": "Once the n-step return reaches termination it equals the full return $G_t$ for all larger $n$, so all the remaining geometric weights $(1-\\lambda)\\sum_{n\\ge T-t}\\lambda^{n-1}=\\lambda^{T-t-1}$ collapse onto $G_t$. Keeping the weights summing to 1 is what makes $G_t^\\lambda$ a valid convex combination."
            },
            {
              "q": "In a highly stochastic environment where your value estimates are already fairly accurate, which choice of $\\lambda$ is most likely to learn best, and why?",
              "choices": [
                "$\\lambda=1$ (Monte Carlo), because unbiased targets are always preferable",
                "A small-to-moderate $\\lambda$, because good estimates make bootstrapping reliable while small $\\lambda$ suppresses the high variance of long noisy returns",
                "$\\lambda$ near $1$, because high stochasticity demands looking all the way to termination",
                "$\\lambda$ has no effect once value estimates are accurate"
              ],
              "answer": 1,
              "explain": "When estimates are already good, bootstrapping introduces little bias, so leaning on it (smaller $\\lambda$) is safe; meanwhile high stochasticity makes long returns very noisy, so a smaller $\\lambda$ cuts variance. Picking $\\lambda=1$ ignores that MC's main cost — variance — is worst exactly in stochastic settings."
            },
            {
              "q": "The $n$-step return interpolates between which two methods?",
              "choices": [
                "Between supervised and unsupervised learning",
                "Between TD(0) and Monte Carlo: $n=1$ is exactly the TD(0) target, and $n\\to\\infty$ (reaching termination) is the full Monte-Carlo return",
                "Between on-policy and off-policy control",
                "Between deterministic and stochastic policies"
              ],
              "answer": 1,
              "explain": "$G_t^{(n)}=R_{t+1}+\\gamma R_{t+2}+\\cdots+\\gamma^{n-1}R_{t+n}+\\gamma^n V(S_{t+n})$ takes $n$ real reward steps then bootstraps. $n=1$ recovers the TD(0) target; $n=\\infty$ recovers the full return $G_t$ (MC). $n$ is thus a bias–variance knob in the temporal dimension."
            },
            {
              "q": "What is the $\\lambda$-return?",
              "choices": [
                "The largest $n$-step return among all $n$",
                "The $n$-step return for the single best choice of $n$",
                "The return achieved by the greedy policy",
                "A single target that geometrically averages <em>all</em> $n$-step returns, weighting $G_t^{(n)}$ by $(1-\\lambda)\\lambda^{n-1}$ — a smooth blend controlled by $\\lambda\\in[0,1]$"
              ],
              "answer": 3,
              "explain": "Rather than commit to one $n$, the $\\lambda$-return $G_t^\\lambda=(1-\\lambda)\\sum_{n\\ge1}\\lambda^{n-1}G_t^{(n)}$ averages them all. Any weighted average of valid targets (weights summing to 1) is itself valid. $\\lambda=0$ gives TD(0); $\\lambda=1$ gives the Monte-Carlo return."
            },
            {
              "q": "What is an <em>eligibility trace</em>?",
              "choices": [
                "A short-term, fading memory marking how recently (and often) each state was visited, so a single TD error can update all recently-visited states in proportion to their trace",
                "A log of every reward received during the episode",
                "The gradient of the policy with respect to its parameters",
                "A fixed table listing the optimal action in each state"
              ],
              "answer": 0,
              "explain": "In the backward view, each state's trace is bumped when visited and decays by $\\gamma\\lambda$ each step. When a TD error occurs, every state is updated scaled by its current trace — so credit flows back to the states that led here, implementing the $\\lambda$-return online."
            },
            {
              "q": "What is the relationship between the <em>forward view</em> and the <em>backward view</em> of TD($\\lambda$)?",
              "choices": [
                "They are unrelated algorithms that merely share a name",
                "The forward view is for control; the backward view is for prediction",
                "The forward view defines the target by looking ahead (the $\\lambda$-return); the backward view implements it online with eligibility traces, looking back to credit recent states — and the two are equivalent",
                "The backward view requires a model of the environment"
              ],
              "answer": 2,
              "explain": "Forward view: at each state, look ahead and update toward the $\\lambda$-return — conceptually clean but acausal (needs the future). Backward view: keep eligibility traces and apply each TD error to all recently-visited states — causal and online. They produce the same total updates (exactly so, offline)."
            }
          ],
          "flashcards": [
            {
              "front": "Define the n-step return $G_t^{(n)}$.",
              "back": "$G_t^{(n)} = R_{t+1} + \\gamma R_{t+2} + \\cdots + \\gamma^{n-1}R_{t+n} + \\gamma^n V(S_{t+n})$: n real reward steps plus a bootstrap from the value of the state reached after n steps."
            },
            {
              "front": "What do $n=1$ and $n=\\infty$ recover for the n-step return?",
              "back": "$n=1$ gives the TD(0) target $R_{t+1}+\\gamma V(S_{t+1})$; $n=\\infty$ (reaching termination) gives the full Monte Carlo return $G_t$."
            },
            {
              "front": "Write the $\\lambda$-return and its weights.",
              "back": "$G_t^\\lambda = (1-\\lambda)\\sum_{n=1}^{\\infty}\\lambda^{n-1} G_t^{(n)}$. The weight on the n-step return is $(1-\\lambda)\\lambda^{n-1}$; weights are nonnegative and sum to 1."
            },
            {
              "front": "What do $\\lambda=0$ and $\\lambda=1$ give in TD($\\lambda$)?",
              "back": "$\\lambda=0$ gives TD(0) (one-step bootstrapping, only current state updated); $\\lambda=1$ gives Monte Carlo (full return / no decay of credit)."
            },
            {
              "front": "Give the accumulating eligibility-trace update and the backward TD($\\lambda$) value update.",
              "back": "Trace: $E_t(s)=\\gamma\\lambda E_{t-1}(s)+\\mathbb{1}[S_t=s]$. Update for all states: $V(s)\\leftarrow V(s)+\\alpha\\,\\delta_t\\,E_t(s)$, with TD error $\\delta_t=R_{t+1}+\\gamma V(S_{t+1})-V(S_t)$."
            },
            {
              "front": "What is the forward/backward equivalence of TD($\\lambda$)?",
              "back": "For offline updates, backward-view TD($\\lambda$) (eligibility traces broadcasting $\\delta_t$) produces the same total per-state update as the forward-view $\\lambda$-return. Forward defines the target; backward computes it online."
            }
          ],
          "homework": [
            {
              "prompt": "An episode with $\\gamma=1$ and $\\lambda=0.5$ produces this trajectory from $S_0$: rewards $R_1=2,\\ R_2=2,\\ R_3=2$, then terminates (3 steps total, $S_3$ terminal). Current estimates are $V(S_1)=1,\\ V(S_2)=1$ (and $V(S_3)=0$). Compute $G_0^{(1)}, G_0^{(2)}, G_0^{(3)}$ and then the $\\lambda$-return $G_0^\\lambda$.",
              "hint": "Since the episode is 3 steps long, $G_0^{(3)}$ is the full return $G_0$. Use the finite-horizon form: $G_0^\\lambda=(1-\\lambda)[\\lambda^0 G_0^{(1)}+\\lambda^1 G_0^{(2)}]+\\lambda^2 G_0^{(3)}$. Check the weights sum to 1.",
              "solution": "With $\\gamma=1$: $G_0^{(1)}=R_1+V(S_1)=2+1=3$. $G_0^{(2)}=R_1+R_2+V(S_2)=2+2+1=5$. $G_0^{(3)}=R_1+R_2+R_3=2+2+2=6$ (full return, since $S_3$ is terminal). Weights for $\\lambda=0.5$: $(1-\\lambda)\\lambda^0=0.5$ on $G_0^{(1)}$, $(1-\\lambda)\\lambda^1=0.25$ on $G_0^{(2)}$, and the tail $\\lambda^2=0.25$ on $G_0^{(3)}$ (sum $=0.5+0.25+0.25=1$). Therefore $G_0^\\lambda=0.5(3)+0.25(5)+0.25(6)=1.5+1.25+1.5=4.25$."
            },
            {
              "prompt": "Using the backward view, an agent visits states $S_0\\to S_1\\to S_2$ (all distinct), with $\\gamma=1,\\ \\lambda=0.8$. Accumulating traces start at 0. Write the eligibility trace values $E(S_0), E(S_1), E(S_2)$ at the moment just after $S_2$ is visited (i.e., at time step $t=2$). Then state how much of the TD error $\\delta_2$ flows to $S_0$ versus $S_2$ under update $\\Delta V(s)=\\alpha\\delta_2 E(s)$.",
              "hint": "Each step, multiply all existing traces by $\\gamma\\lambda=0.8$ and add 1 to the current state. Track the trace of $S_0$ across two decays.",
              "solution": "Step 0 (visit $S_0$): $E(S_0)=1$. Step 1 (visit $S_1$): decay all by $0.8$, then bump $S_1$: $E(S_0)=0.8,\\ E(S_1)=1$. Step 2 (visit $S_2$): decay all by $0.8$, then bump $S_2$: $E(S_0)=0.64,\\ E(S_1)=0.8,\\ E(S_2)=1$. So just after $S_2$: $E(S_0)=0.64,\\ E(S_1)=0.8,\\ E(S_2)=1$. Under $\\Delta V(s)=\\alpha\\delta_2 E(s)$, state $S_2$ receives the full $\\alpha\\delta_2$, while $S_0$ receives only $0.64\\,\\alpha\\delta_2$ — older states get geometrically less credit, exactly $(\\gamma\\lambda)^2=0.64$ of the current step's surprise."
            },
            {
              "prompt": "Argue qualitatively why an intermediate $\\lambda$ (say $0.8$) often learns faster than both $\\lambda=0$ and $\\lambda=1$ in a stochastic environment with imperfect early value estimates. Frame your answer using bias and variance.",
              "hint": "Recall what each endpoint relies on: $\\lambda=0$ leans entirely on current (possibly wrong) estimates; $\\lambda=1$ leans entirely on noisy full returns. What does averaging over horizons buy you?",
              "solution": "At $\\lambda=0$ (TD(0)), every target is $R_{t+1}+\\gamma V(S_{t+1})$, which depends heavily on the value estimate. Early in training those estimates are inaccurate, so updates are strongly biased and propagate slowly (information moves only one step per update). At $\\lambda=1$ (MC), targets are full returns: unbiased but high-variance, because they sum the randomness of every reward and transition until termination — noisy updates require many episodes to average out. An intermediate $\\lambda\\approx0.8$ forms a geometric average that (a) incorporates several steps of real reward, reducing reliance on bad early estimates (lower bias than TD(0)), while (b) damping the contribution of long, noisy tails (lower variance than MC). It also propagates credit backward over multiple steps per update via eligibility traces, speeding learning. The net effect is the characteristic U-shaped performance curve with an interior optimum."
            }
          ],
          "examples": [
            {
              "title": "Tracing eligibility traces through a 3-step episode",
              "body": "Run backward-view TD($\\lambda$) on the episode $S_A \\to S_B \\to S_A \\to T$ with rewards $R_1=0,\\ R_2=1,\\ R_3=2$, parameters $\\gamma=1$, $\\lambda=0.5$, $\\alpha=0.1$, accumulating traces, and initial values $V(S_A)=V(S_B)=0$. Show the trace vector and the TD error at each step, accumulating the updates and applying them at episode end (offline).",
              "solution": "We track, at each step $t$, the TD error $\\delta_t = R_{t+1} + \\gamma V(S_{t+1}) - V(S_t)$ and the accumulating trace $E_t(s) = \\gamma\\lambda E_{t-1}(s) + \\mathbb{1}[S_t=s]$. Here $\\gamma\\lambda = 1 \\times 0.5 = 0.5$, and all values start at $0$ (so $V(T)=0$ too). Since we accumulate updates offline, $V$ stays fixed while we sum the contributions.<br><br><strong>Step $t=0$ (in $S_A$, observe $R_1=0$, go to $S_B$).</strong> Bump the current state's trace:<br>$E_0(S_A)=1,\\ E_0(S_B)=0$.<br>$\\delta_0 = R_1 + \\gamma V(S_B) - V(S_A) = 0 + 0 - 0 = 0$.<br>Update contribution $\\alpha\\delta_0 E_0(s) = 0$ for every state.<br><br><strong>Step $t=1$ (in $S_B$, observe $R_2=1$, go to $S_A$).</strong> Decay then bump:<br>$E_1(S_A) = 0.5(1) = 0.5,\\quad E_1(S_B) = 0.5(0)+1 = 1$.<br>$\\delta_1 = R_2 + \\gamma V(S_A) - V(S_B) = 1 + 0 - 0 = 1$.<br>Contributions $\\alpha\\delta_1 E_1$: to $S_A$: $0.1(1)(0.5)=0.05$; to $S_B$: $0.1(1)(1)=0.1$.<br><br><strong>Step $t=2$ (in $S_A$, observe $R_3=2$, go to $T$).</strong> Decay then bump $S_A$ again (this is why the trace <em>accumulates</em>):<br>$E_2(S_A) = 0.5(0.5)+1 = 1.25,\\quad E_2(S_B) = 0.5(1) = 0.5$.<br>$\\delta_2 = R_3 + \\gamma V(T) - V(S_A) = 2 + 0 - 0 = 2$.<br>Contributions $\\alpha\\delta_2 E_2$: to $S_A$: $0.1(2)(1.25)=0.25$; to $S_B$: $0.1(2)(0.5)=0.1$.<br><br><strong>Sum the accumulated updates (applied at episode end).</strong><br>$\\Delta V(S_A) = 0 + 0.05 + 0.25 = 0.30 \\Rightarrow V(S_A) = 0.30$.<br>$\\Delta V(S_B) = 0 + 0.1 + 0.1 = 0.20 \\Rightarrow V(S_B) = 0.20$.<br><br><strong>Answer:</strong> after the episode, $V(S_A)=0.30$ and $V(S_B)=0.20$. Notice the mechanism at work: the surprise $\\delta_2=2$ at the last step flowed <em>backward</em> to the earlier $S_B$ visit (weighted $0.5$) and reinforced the repeated $S_A$ visits (accumulated trace $1.25$) — recency and frequency, exactly as advertised."
            },
            {
              "title": "Verifying forward = backward on $S_A$",
              "body": "For the same episode and parameters as above ($S_A \\to S_B \\to S_A \\to T$, $R_1=0,R_2=1,R_3=2$, $\\gamma=1$, $\\lambda=0.5$, $\\alpha=0.1$, all $V=0$), compute the <em>forward-view</em> $\\lambda$-return update for the first visit to $S_A$ and confirm it matches the backward-view trace contribution that $S_A$ received from that visit.",
              "solution": "The equivalence theorem says the offline backward update at a state equals the forward-view update from the $\\lambda$-return. We test it for the <strong>first visit</strong> to $S_A$ (at $t=0$). With $\\gamma=1$ and all values $0$, the n-step returns from $t=0$ are pure reward sums plus a (zero) bootstrap:<br><br>$G_0^{(1)} = R_1 + \\gamma V(S_B) = 0 + 0 = 0$.<br>$G_0^{(2)} = R_1 + \\gamma R_2 + \\gamma^2 V(S_A) = 0 + 1 + 0 = 1$.<br>$G_0^{(3)} = R_1 + \\gamma R_2 + \\gamma^2 R_3 = 0 + 1 + 2 = 3$ (this is also the full return $G_0$, since $T$ is reached at $n=3$).<br><br><strong>Finite-horizon $\\lambda$-return</strong> with $T-t=3$, so $n=1,2$ get geometric weights and the full return absorbs the tail weight $\\lambda^{T-t-1}=\\lambda^2$:<br>$$G_0^{\\lambda} = (1-\\lambda)\\big[\\lambda^0 G_0^{(1)} + \\lambda^1 G_0^{(2)}\\big] + \\lambda^2 G_0^{(3)}.$$<br>With $\\lambda=0.5$ ($1-\\lambda=0.5$, $\\lambda^1=0.5$, $\\lambda^2=0.25$):<br>$$G_0^{\\lambda} = 0.5\\big[(1)(0) + (0.5)(1)\\big] + (0.25)(3) = 0.5(0.5) + 0.75 = 0.25 + 0.75 = 1.0.$$<br>Weight check: $0.5,\\ 0.25$ on $G_0^{(1)},G_0^{(2)}$ plus $0.25$ on $G_0^{(3)}$ sum to $1.0$. Good.<br><br><strong>Forward update for the first $S_A$ visit:</strong><br>$$\\Delta_{\\text{fwd}} V(S_A) = \\alpha\\big[G_0^{\\lambda} - V(S_A)\\big] = 0.1(1.0 - 0) = 0.10.$$<br><strong>Compare to the backward view.</strong> In Example 1, $S_A$ accumulated $\\Delta V(S_A)=0.30$ total — but that includes the contribution seeded by the <em>second</em> $S_A$ visit at $t=2$. The portion attributable to the <em>first</em> visit's eligibility is the trace mass that the first visit ($E_0(S_A)=1$) contributed, which decays as $\\delta_1$ and $\\delta_2$ arrive: $\\alpha\\big[\\delta_0(1) + \\delta_1(0.5) + \\delta_2(0.25)\\big]$, where $0.5$ and $0.25$ are $(\\gamma\\lambda)^1,(\\gamma\\lambda)^2$ acting on that first bump. This equals $0.1\\big[0 + 1(0.5) + 2(0.25)\\big] = 0.1[0.5+0.5] = 0.10$.<br><br><strong>Answer:</strong> both views give $\\boxed{0.10}$ for the first $S_A$ visit. The forward $\\lambda$-return target ($1.0$) and the trace-weighted sum of TD errors agree exactly — a concrete instance of the forward/backward equivalence theorem. (The extra $0.20$ that $S_A$ received in Example 1 is the forward update credited to its second visit at $t=2$, whose own $\\lambda$-return is $\\alpha[G_2^\\lambda - 0] = 0.1\\cdot 2 = 0.20$.)"
            }
          ]
        }
      ]
    },
    {
      "id": "rl-function-approximation",
      "title": "Function Approximation and Value-Based Deep RL",
      "lessons": [
        {
          "id": "rl-value-approximation",
          "title": "Value Function Approximation",
          "minutes": 16,
          "content": "<h3>From Tables to Functions: Why We Need Approximation</h3>\n<p>Everything you learned about tabular RL — dynamic programming, Monte Carlo, TD(0), Sarsa, Q-learning — assumed you could store one number per state (or per state-action pair) in a lookup table. That assumption quietly dies the moment the state space gets large. Backgammon has roughly $10^{20}$ states; Go has more than $10^{170}$; a robot reading raw camera pixels has a <em>continuous</em>, effectively infinite state space. You cannot allocate a table entry per state, you could never visit them all to fill it in, and even if you could, the table would tell you nothing about states you have never seen.</p>\n<p>The cure is to replace the table with a <strong>parameterized function</strong>. Instead of a vector of values $v(s)$ indexed by state, we write</p>\n$$\\hat{v}(s, \\mathbf{w}) \\approx v_\\pi(s), \\qquad \\mathbf{w} \\in \\mathbb{R}^d,$$\n<p>where $\\mathbf{w}$ is a weight vector with $d$ parameters and, crucially, $d \\ll |\\mathcal{S}|$. The same idea applies to action values, $\\hat{q}(s, a, \\mathbf{w}) \\approx q_\\pi(s, a)$. Updating one weight now changes the estimated value of <em>many</em> states at once. This is the double-edged sword at the heart of the whole subject: <strong>generalization</strong>.</p>\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>This is the bridge from RL to mainstream machine learning. A value function is just a regression model whose targets we generate ourselves, on the fly, from the agent's own experience. Everything you know about features, linear models, neural nets, overfitting, and gradient descent now applies — with one essential twist (the \"semi-gradient\") that we will derive below.</p></div>\n\n<h3>Feature Construction: Turning States into Vectors</h3>\n<p>To feed a state into a function approximator we first encode it as a <strong>feature vector</strong> $\\mathbf{x}(s) = (x_1(s), x_2(s), \\dots, x_d(s))^\\top \\in \\mathbb{R}^d$. Each component $x_i(s)$ is a number computed from the raw state. Good features expose the structure that matters for predicting return.</p>\n<ul>\n<li><strong>State aggregation</strong>: partition states into groups; the feature vector is a one-hot indicator of which group $s$ falls in. This is the simplest generalizer — all states in a group share one value. (Tabular RL is the extreme special case where every state is its own group and $\\mathbf{x}(s)$ is a one-hot over all states.)</li>\n<li><strong>Polynomial features</strong>: for a 2D continuous state $(s_1, s_2)$, use $(1, s_1, s_2, s_1 s_2, s_1^2, s_2^2, \\dots)$ to let the model fit curved value surfaces.</li>\n<li><strong>Coarse coding / tile coding</strong>: overlay multiple offset grids (\"tilings\") over the state space; each tile is a binary feature that is 1 when the state lies inside it. With several overlapping tilings you get cheap, sparse, locally-generalizing features — a classic, robust choice for low-dimensional continuous control.</li>\n<li><strong>Radial basis functions</strong>: Gaussian bumps $x_i(s) = \\exp(-\\|s - c_i\\|^2 / 2\\sigma^2)$ centered at prototypes $c_i$, giving smooth generalization.</li>\n<li><strong>Learned features</strong>: a deep neural network <em>is</em> a feature constructor — its hidden layers learn $\\mathbf{x}(s)$ and its final linear layer learns $\\mathbf{w}$. This is the modern, scalable answer and the subject of value-based deep RL.</li>\n</ul>\n\n<h3>Linear Value Function Approximation</h3>\n<p>The cleanest case — and the one where the theory is fully understood — is the <strong>linear</strong> approximator. The estimated value is an inner product of weights and features:</p>\n$$\\hat{v}(s, \\mathbf{w}) = \\mathbf{w}^\\top \\mathbf{x}(s) = \\sum_{i=1}^{d} w_i\\, x_i(s).$$\n<p>Its gradient with respect to the weights is beautifully simple — it is just the feature vector, independent of $\\mathbf{w}$:</p>\n$$\\nabla_{\\mathbf{w}} \\hat{v}(s, \\mathbf{w}) = \\mathbf{x}(s).$$\n<p>This linearity is exactly why linear methods enjoy the strongest convergence guarantees: the objective surface is well-behaved, and (for on-policy TD) there is a unique solution toward which learning provably moves. Nonlinear approximators like neural nets give up these guarantees in exchange for vastly more expressive features.</p>\n\n<h3>The Objective: Mean Squared Value Error</h3>\n<p>What does it mean for $\\hat{v}$ to be \"good\"? We cannot make $\\hat{v}(s,\\mathbf{w}) = v_\\pi(s)$ for every state at once — there are far fewer weights than states, so some error is unavoidable. We therefore minimize a <em>weighted</em> average squared error, weighting each state by how much we care about it. The standard choice is the <strong>on-policy state distribution</strong> $\\mu(s)$ — the fraction of time the policy $\\pi$ spends in state $s$ (for an ergodic chain, its stationary distribution). The objective is the <strong>Mean Squared Value Error</strong>:</p>\n$$\\overline{\\text{VE}}(\\mathbf{w}) \\;=\\; \\sum_{s \\in \\mathcal{S}} \\mu(s)\\,\\big[\\, v_\\pi(s) - \\hat{v}(s, \\mathbf{w}) \\,\\big]^2.$$\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>$\\mu(s)$ makes the model spend its limited capacity where it counts: states the agent actually visits often get accurate values; rarely-visited states are allowed to be wrong. Weighting by where you live is the difference between a useful approximation and one that wastes parameters on irrelevant corners of the state space.</p></div>\n<p>The catch: $v_\\pi(s)$, the thing we are trying to match, is <strong>unknown</strong> — estimating it is the whole point. So we cannot compute $\\overline{\\text{VE}}$ directly. We must substitute an estimated target, and the choice of target is where Monte Carlo and TD diverge in spirit.</p>\n\n<h3>Stochastic Gradient Descent and the Semi-Gradient Trick</h3>\n<p>Suppose, hypothetically, we observed the true value $v_\\pi(S_t)$ on a visit to state $S_t$. The per-sample squared error is $\\big[v_\\pi(S_t) - \\hat{v}(S_t,\\mathbf{w})\\big]^2$, and stochastic gradient descent would update</p>\n$$\\mathbf{w} \\leftarrow \\mathbf{w} + \\alpha\\,\\big[\\,v_\\pi(S_t) - \\hat{v}(S_t,\\mathbf{w})\\,\\big]\\,\\nabla_{\\mathbf{w}}\\hat{v}(S_t,\\mathbf{w}),$$\n<p>where $\\alpha > 0$ is the step size. (Sampling $S_t \\sim \\mu$ by simply following the policy is what makes the expected update point down the $\\overline{\\text{VE}}$ gradient — this is why $\\mu$ is the natural weighting.)</p>\n<p>We do not have $v_\\pi(S_t)$, so we replace it with an estimated <strong>target</strong> $U_t$. In Monte Carlo, $U_t = G_t$, the actual sampled return; since $G_t$ is an unbiased sample of $v_\\pi(S_t)$ that does <em>not</em> depend on $\\mathbf{w}$, the result is an honest (true-gradient) SGD method.</p>\n<p>In <strong>TD(0)</strong>, we <strong>bootstrap</strong>: the target is the one-step estimate using our own current value function,</p>\n$$U_t \\;=\\; R_{t+1} + \\gamma\\,\\hat{v}(S_{t+1}, \\mathbf{w}).$$\n<p>Substituting gives the <strong>linear semi-gradient TD(0)</strong> update. Define the TD error</p>\n$$\\delta_t \\;=\\; R_{t+1} + \\gamma\\,\\hat{v}(S_{t+1}, \\mathbf{w}) - \\hat{v}(S_t, \\mathbf{w}),$$\n<p>and the update is</p>\n$$\\boxed{\\;\\mathbf{w} \\leftarrow \\mathbf{w} + \\alpha\\,\\delta_t\\,\\nabla_{\\mathbf{w}}\\hat{v}(S_t,\\mathbf{w}) \\;=\\; \\mathbf{w} + \\alpha\\,\\delta_t\\,\\mathbf{x}(S_t)\\;}$$\n<p>where the last equality holds for the linear case. The name <strong>semi-gradient</strong> is the crucial subtlety: the target $U_t$ <em>also</em> depends on $\\mathbf{w}$ (through $\\hat{v}(S_{t+1},\\mathbf{w})$), but we deliberately <strong>treat it as a constant</strong> and do <em>not</em> differentiate through it. We only take the gradient of the prediction $\\hat{v}(S_t,\\mathbf{w})$, not of the whole error. It is \"semi\" because we ignore half of the dependence on $\\mathbf{w}$.</p>\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>The semi-gradient is not the true gradient of any fixed loss, so semi-gradient TD is <em>not</em> genuine gradient descent. We accept this because it is what makes <em>bootstrapping</em> work: we want the target to act like a fixed, supervised label so the prediction is pulled toward it. This is exactly the same idea as a \"stop-gradient\" or a frozen <strong>target network</strong> in deep Q-learning — you detach the target so the network chases it rather than colluding with it. The price is that convergence guarantees weaken (and, as we will see, can vanish entirely).</p></div>\n\n<h3>Worked Example: Two-State Corridor with Aggregation</h3>\n<p>Consider a tiny MDP to make the update concrete. States $A$ and $B$ feed into a terminal state. The policy always moves $A \\to B \\to$ terminal. Rewards: $A \\to B$ gives $R = 0$; $B \\to$ terminal gives $R = 1$. Discount $\\gamma = 1$. The true values are $v_\\pi(B) = 1$ and $v_\\pi(A) = 0 + 1\\cdot v_\\pi(B) = 1$.</p>\n<p>Now suppose our features <strong>aggregate $A$ and $B$ into a single group</strong>, so $\\mathbf{x}(A) = \\mathbf{x}(B) = (1)$ and there is one weight $w$. Then $\\hat{v}(A,w) = \\hat{v}(B,w) = w$. Start with $w = 0$, step size $\\alpha = 0.1$. We process the transitions of one episode in order.</p>\n<p><strong>Transition $A \\to B$</strong> ($R = 0$):</p>\n$$\\delta = R + \\gamma\\,\\hat{v}(B,w) - \\hat{v}(A,w) = 0 + 1\\cdot 0 - 0 = 0,$$\n$$w \\leftarrow 0 + 0.1 \\cdot 0 \\cdot 1 = 0.$$\n<p><strong>Transition $B \\to$ terminal</strong> ($R = 1$, and $\\hat{v}(\\text{terminal}) = 0$ by convention):</p>\n$$\\delta = 1 + 1\\cdot 0 - \\hat{v}(B,w) = 1 - 0 = 1,$$\n$$w \\leftarrow 0 + 0.1 \\cdot 1 \\cdot 1 = 0.1.$$\n<p>After this episode both states are estimated at $0.1$. Because the single shared weight cannot represent any difference between $A$ and $B$, the best the model can do under $\\overline{\\text{VE}}$ is to settle at a $\\mu$-weighted compromise. Here $v_\\pi(A) = v_\\pi(B) = 1$, so over many episodes $w$ converges to $1$ and the aggregation happens to be lossless. Change the rewards so the true values differ (say $v_\\pi(A)=0$, $v_\\pi(B)=1$) and the same machinery would converge to a blend like $w \\approx 0.5$, weighted by how often each state is visited — a vivid demonstration of generalization forcing a tradeoff.</p>\n<p>The key mechanical takeaways: (1) the update touches only the weights of the feature vector at $S_t$; (2) bootstrapping let $B$'s reward propagate into the shared weight in one step; and (3) limited feature capacity caps achievable accuracy.</p>\n\n<h3>The Deadly Triad: When Learning Diverges</h3>\n<p>Tabular TD always converges. On-policy <em>linear</em> semi-gradient TD converges too (to the TD fixed point, whose error is bounded relative to the best possible $\\overline{\\text{VE}}$). So when can value-based learning blow up — weights racing to infinity? Sutton and Barto identify three ingredients; danger arises only when <strong>all three</strong> are present together. This is the <strong>deadly triad</strong>:</p>\n<ol>\n<li><strong>Function approximation</strong> — generalizing across states with $\\hat{v}(s,\\mathbf{w})$ (as opposed to a table). A single weight change ripples into the targets of other states.</li>\n<li><strong>Bootstrapping</strong> — building update targets from the agent's own current estimates (TD, DP) rather than full sampled returns (Monte Carlo). The target moves as the weights move.</li>\n<li><strong>Off-policy training</strong> — learning about a target policy $\\pi$ from data generated by a different behavior policy $b$. The training distribution no longer matches the on-policy distribution $\\mu$ that makes the semi-gradient update well-behaved.</li>\n</ol>\n<div class=\"callout violet\"><div class=\"c-tag\">Deeper connection</div><p>Why does the <em>combination</em> bite? Off-policy sampling means you update states in proportions that do not reflect $\\mu$, so the expected semi-gradient update is no longer guaranteed to contract toward a fixed point. Bootstrapping means an over-estimate at one state feeds into the target of another, which feeds back — a positive feedback loop. Function approximation means that loop is coupled across states through shared weights, so the feedback is not damped state-by-state. Each ingredient alone is benign; wired together they can form an amplifier with no stable fixed point. Baird's counterexample is the classic demonstration of provable divergence with all three present.</p></div>\n<p><strong>Remove any one and stability returns.</strong> Drop function approximation (use a table) and on-policy/off-policy TD both converge. Drop bootstrapping (use Monte Carlo / full returns) and you have true SGD on a fixed loss, which is stable even with function approximation and off-policy importance sampling. Drop off-policy (learn on-policy) and linear semi-gradient TD converges. Q-learning is the canonical at-risk algorithm precisely because it bundles all three: it uses function approximation in deep RL, it bootstraps via $\\max_a \\hat{q}$, and its $\\max$ makes the target greedy/off-policy relative to an exploratory behavior policy.</p>\n\n<h3>Living With the Triad: What Deep RL Actually Does</h3>\n<p>The deadly triad explains why naive deep Q-learning was historically unstable, and why the DQN breakthrough leaned on engineering that attacks the triad's failure modes:</p>\n<ul>\n<li><strong>Target networks</strong> freeze the bootstrap target $\\hat{q}(s',a',\\mathbf{w}^-)$ for many steps, weakening the feedback loop (it makes the target behave more like a fixed supervised label — the semi-gradient idea taken to its logical conclusion).</li>\n<li><strong>Experience replay</strong> reshapes and decorrelates the training distribution, partially mitigating the off-policy distribution mismatch and breaking temporal correlations.</li>\n<li><strong>Gradient-TD methods</strong> (e.g. GTD2, TDC) attack the problem head-on: they minimize a genuine objective (the projected Bellman error) and are <em>provably</em> stable under all three conditions, at the cost of a second set of weights and more complexity.</li>\n</ul>\n<p>None of these fully \"solve\" the triad — they manage it. Recognizing which of the three ingredients your algorithm has is the single most useful diagnostic when a value-based agent's loss explodes.</p>\n\n<h3>Summary</h3>\n<ul>\n<li>Replace the value <em>table</em> with a parameterized $\\hat{v}(s,\\mathbf{w})$ so a few weights generalize across many states; features $\\mathbf{x}(s)$ encode the state, and linear approximation sets $\\hat{v}(s,\\mathbf{w}) = \\mathbf{w}^\\top\\mathbf{x}(s)$ with $\\nabla_{\\mathbf{w}}\\hat{v} = \\mathbf{x}(s)$.</li>\n<li>The learning objective is the $\\mu$-weighted Mean Squared Value Error $\\overline{\\text{VE}}(\\mathbf{w}) = \\sum_s \\mu(s)[v_\\pi(s) - \\hat{v}(s,\\mathbf{w})]^2$.</li>\n<li>TD(0) bootstraps with target $R_{t+1} + \\gamma\\hat{v}(S_{t+1},\\mathbf{w})$ and updates $\\mathbf{w} \\leftarrow \\mathbf{w} + \\alpha\\delta_t\\mathbf{x}(S_t)$; it is a <strong>semi-gradient</strong> because we do not differentiate through the bootstrapped target.</li>\n<li>The <strong>deadly triad</strong> — function approximation + bootstrapping + off-policy — can cause divergence; removing any one restores stability. Target networks, replay, and gradient-TD are how deep RL copes.</li>\n</ul>",
          "mcq": [
            {
              "q": "In linear semi-gradient TD(0) with $\\hat{v}(s,\\mathbf{w}) = \\mathbf{w}^\\top\\mathbf{x}(s)$, which is the correct per-step weight update?",
              "choices": [
                "$\\mathbf{w} \\leftarrow \\mathbf{w} + \\alpha\\,[R_{t+1} + \\gamma\\hat{v}(S_{t+1},\\mathbf{w}) - \\hat{v}(S_t,\\mathbf{w})]\\,\\mathbf{x}(S_t)$",
                "$\\mathbf{w} \\leftarrow \\mathbf{w} + \\alpha\\,[R_{t+1} + \\gamma\\hat{v}(S_{t+1},\\mathbf{w}) - \\hat{v}(S_t,\\mathbf{w})]\\,[\\gamma\\mathbf{x}(S_{t+1}) - \\mathbf{x}(S_t)]$",
                "$\\mathbf{w} \\leftarrow \\mathbf{w} + \\alpha\\,[G_t - \\hat{v}(S_t,\\mathbf{w})]\\,\\mathbf{x}(S_t)$",
                "$\\mathbf{w} \\leftarrow \\mathbf{w} - \\alpha\\,[R_{t+1} + \\gamma\\hat{v}(S_{t+1},\\mathbf{w}) - \\hat{v}(S_t,\\mathbf{w})]\\,\\mathbf{x}(S_t)$"
              ],
              "answer": 0,
              "explain": "The semi-gradient uses only the gradient of the prediction $\\nabla\\hat{v}(S_t)=\\mathbf{x}(S_t)$, scaled by the TD error and a positive $+\\alpha$ (choice 1). Choice 2 differentiates through the target (a residual-style term with $\\gamma\\mathbf{x}(S_{t+1})$), choice 3 is Monte Carlo (target $G_t$), and choice 4 has the wrong sign $-\\alpha$."
            },
            {
              "q": "Why is semi-gradient TD called 'semi'-gradient rather than a full gradient method?",
              "choices": [
                "Because it only updates half of the weight vector on each step",
                "Because the bootstrapped target also depends on $\\mathbf{w}$, but we ignore that dependence and differentiate only the prediction",
                "Because the step size $\\alpha$ is halved relative to Monte Carlo",
                "Because it uses half the data, processing every other transition"
              ],
              "answer": 1,
              "explain": "The target $R_{t+1}+\\gamma\\hat{v}(S_{t+1},\\mathbf{w})$ contains $\\mathbf{w}$, but we treat it as a constant ('stop-gradient') and take the gradient of $\\hat{v}(S_t,\\mathbf{w})$ only — so it is not the true gradient of any fixed loss."
            },
            {
              "q": "Which combination constitutes the 'deadly triad' that risks divergence in value-based RL?",
              "choices": [
                "Large step size + high discount + sparse rewards",
                "Function approximation + bootstrapping + off-policy training",
                "Continuous actions + exploration + delayed rewards",
                "Neural networks + experience replay + target networks"
              ],
              "answer": 1,
              "explain": "The deadly triad is function approximation, bootstrapping, and off-policy training together. Danger requires all three; removing any one restores convergence guarantees."
            },
            {
              "q": "You are running on-policy semi-gradient TD(0) with a nonlinear (neural-net) approximator and it diverges. Switching to Monte Carlo with the same network and same data fixes it. What does this most directly reveal?",
              "choices": [
                "The instability was caused by bootstrapping; Monte Carlo uses full returns and removes that triad ingredient",
                "Monte Carlo always converges faster than TD",
                "Nonlinear features can never be used with TD; only Monte Carlo supports neural networks",
                "The reward scale was too large for TD but not for Monte Carlo"
              ],
              "answer": 0,
              "explain": "Monte Carlo replaces the bootstrapped target with the actual return $G_t$, which does not depend on $\\mathbf{w}$, making it true SGD on a fixed loss. Removing bootstrapping eliminates one triad ingredient and restores stability — even with nonlinear function approximation, where on-policy semi-gradient TD has no convergence guarantee. (Note: with LINEAR features, on-policy semi-gradient TD provably converges, so it could not diverge in the first place; the nonlinearity is what permits the divergence here.)"
            },
            {
              "q": "Why does replacing a value table with a parameterized $\\hat{v}(s,\\mathbf{w})$ produce *generalization*, the 'double-edged sword' of function approximation?",
              "choices": [
                "Because updating one weight changes the estimated value of many states at once, for better or worse",
                "Because the weight vector $\\mathbf{w}$ is guaranteed to converge faster than a table",
                "Because each state still gets its own independent value entry, just stored more compactly",
                "Because the function can only represent states it has already visited"
              ],
              "answer": 0,
              "explain": "Since states share weights, one update affects many states simultaneously, which transfers learning to unseen states but can also corrupt previously good estimates."
            },
            {
              "q": "In the parameterized form $\\hat{v}(s,\\mathbf{w}) \\approx v_\\pi(s)$ with $\\mathbf{w} \\in \\mathbb{R}^d$, what is the essential requirement on $d$ that makes approximation worthwhile?",
              "choices": [
                "$d \\ll |\\mathcal{S}|$, so there are far fewer weights than states",
                "$d = |\\mathcal{S}|$, exactly one weight per state",
                "$d \\gg |\\mathcal{S}|$, so the model has enough capacity to memorize",
                "$d = 1$, a single scalar weight suffices for any state space"
              ],
              "answer": 0,
              "explain": "The whole point is that the number of parameters $d$ is far smaller than the number of states, so we cannot store one value per state and must generalize instead."
            },
            {
              "q": "The lesson frames a value function as 'a regression model whose targets we generate ourselves.' What is the key way this differs from ordinary supervised regression?",
              "choices": [
                "The training targets are produced on the fly from the agent's own experience rather than given by a fixed labeled dataset",
                "It uses no features and operates directly on raw states",
                "It cannot use neural networks, only linear models",
                "Overfitting and gradient descent no longer apply"
              ],
              "answer": 0,
              "explain": "Unlike standard regression with a fixed labeled dataset, RL bootstraps its own regression targets from the agent's experience, which is what motivates the special 'semi-gradient' twist."
            },
            {
              "q": "Under state aggregation, why is tabular RL described as the extreme special case?",
              "choices": [
                "Every state forms its own singleton group, so $\\mathbf{x}(s)$ becomes a one-hot indicator over all states",
                "All states are merged into a single group sharing one value",
                "Polynomial features are applied to each aggregated group",
                "The feature vector becomes continuous rather than one-hot"
              ],
              "answer": 0,
              "explain": "When each group contains exactly one state, the one-hot group indicator reduces to a one-hot over all states, recovering the per-state lookup table of tabular RL."
            },
            {
              "q": "Gradient Monte Carlo minimizes the Mean Squared Value Error $\\overline{VE}(\\mathbf{w}) = \\sum_s \\mu(s)\\,[v_\\pi(s) - \\hat{v}(s,\\mathbf{w})]^2$. What role does the weighting $\\mu(s)$ play, and why does it matter once a table is replaced by an approximator?",
              "choices": [
                "It is a fixed uniform weight over all states, ensuring every state is fit with equal accuracy regardless of how often it occurs",
                "It is the on-policy state distribution (how often each state is visited), so the approximator trades off accuracy across states in proportion to how much time the policy spends in them",
                "It is the discount factor raised to the time of first visit, downweighting states reached late in an episode",
                "It is a learnable parameter optimized jointly with $\\mathbf{w}$ to decide which states deserve the most accuracy"
              ],
              "answer": 1,
              "explain": "$\\mu(s)$ is the on-policy distribution specifying how often states occur under $\\pi$; because limited capacity ($d \\ll |\\mathcal{S}|$) prevents fitting every state exactly, the objective sacrifices accuracy on rare states to do better on frequently visited ones. It is neither uniform nor a tunable parameter."
            },
            {
              "q": "Using $\\hat{v}(s,\\mathbf{w}) = \\mathbf{w}^\\top \\mathbf{x}(s)$, suppose feature vector $\\mathbf{x}(S_t) = (2, 0, 1)^\\top$, current weights $\\mathbf{w} = (1, 5, -1)^\\top$, the Monte Carlo return is $G_t = 6$, and step size $\\alpha = 0.1$. What is the new weight vector after one gradient Monte Carlo update?",
              "choices": [
                "$(2.0, 5, -0.5)^\\top$",
                "$(2.2, 5, -0.4)^\\top$",
                "$(1.5, 5.5, -0.5)^\\top$",
                "$(2.0, 5.5, -0.5)^\\top$"
              ],
              "answer": 0,
              "explain": "$\\hat{v} = 2(1)+0(5)+1(-1) = 1$, so the error is $G_t - \\hat{v} = 6 - 1 = 5$; the update is $\\mathbf{w} \\leftarrow \\mathbf{w} + \\alpha\\,(G_t-\\hat{v})\\,\\mathbf{x}(S_t) = (1,5,-1)^\\top + 0.1\\cdot 5 \\cdot (2,0,1)^\\top = (1,5,-1)^\\top + (1,0,0.5)^\\top = (2.0, 5, -0.5)^\\top$. The middle weight is unchanged because its feature is 0; $(2.2,5,-0.4)$ wrongly uses error $6$ (forgetting to subtract $\\hat{v}$), and the others incorrectly change the middle weight whose feature is zero."
            },
            {
              "q": "A student claims: 'In semi-gradient TD(0), the target is $R_{t+1} + \\gamma\\,\\hat{v}(S_{t+1},\\mathbf{w})$, which depends on $\\mathbf{w}$, so the true gradient of the squared TD error must include a $-\\gamma\\,\\nabla\\hat{v}(S_{t+1},\\mathbf{w})$ term — and dropping it is just a sloppy approximation we make for speed.' What is the correct response?",
              "choices": [
                "The student is right that it is purely a speed optimization; including that term would converge to the same fixed point, only more slowly",
                "The omission is deliberate, not for speed: we treat the bootstrapped target as a fixed label so the update follows the gradient of the prediction toward that target, which is exactly the behavior that gives TD its bootstrapping fixed point",
                "The student is wrong because $\\hat{v}(S_{t+1},\\mathbf{w})$ does not actually depend on $\\mathbf{w}$ when $S_{t+1} \\neq S_t$",
                "Including the missing term would make the method a true gradient method that always converges even under the deadly triad"
              ],
              "answer": 1,
              "explain": "The bootstrapped target is intentionally held fixed (not differentiated), so the update moves the prediction toward the target rather than down the full gradient; this is the defining 'semi' behavior, not a speed hack. The 'full-gradient' variant (residual gradient) is a different method with different fixed points, and it does not immunize against the deadly triad."
            },
            {
              "q": "With a finite weight vector $\\mathbf{w} \\in \\mathbb{R}^d$ and $d \\ll |\\mathcal{S}|$, what is the most accurate statement about whether $\\hat{v}(s,\\mathbf{w})$ can equal $v_\\pi(s)$ at every state simultaneously?",
              "choices": [
                "Yes, with enough training iterations any approximator drives $\\overline{VE}$ to exactly zero at all states",
                "In general no: with fewer parameters than states the best we can usually do is minimize a weighted error, accepting residual error at many states — exact equality everywhere is the tabular special case",
                "Yes, but only for linear approximators; nonlinear networks can never reach zero error",
                "Exact equality everywhere is guaranteed whenever the features $\\mathbf{x}(s)$ are linearly independent across states"
              ],
              "answer": 1,
              "explain": "Because $d \\ll |\\mathcal{S}|$, the approximator cannot independently set every state's value, so minimizing $\\overline{VE}$ generally leaves nonzero error at many states; exact representation of every state is precisely the tabular (one-parameter-per-state) extreme. Linear independence across all states would require $d \\geq |\\mathcal{S}|$, defeating the purpose of approximation."
            },
            {
              "q": "Why does large-scale RL need <em>function approximation</em> instead of a value table?",
              "choices": [
                "To make the value function train faster on a small gridworld",
                "Because real state spaces (images, continuous control, Go's $10^{170}$ states) are far too large or infinite to store one value per state — and a table can't generalize to states never visited",
                "Because tables cannot represent negative values",
                "To avoid having to define a reward function"
              ],
              "answer": 1,
              "explain": "A lookup table needs one entry per state, which is impossible for continuous or astronomically large state spaces — and even if you could store it, it would say nothing about unseen states. A parameterized $\\hat v(s,\\mathbf w)$ with $d\\ll|\\mathcal S|$ both fits in memory and <em>generalizes</em> across similar states."
            },
            {
              "q": "What is a <em>feature vector</em> $\\mathbf{x}(s)$ in value-function approximation?",
              "choices": [
                "The vector of weights $\\mathbf{w}$ that the model learns",
                "The sequence of rewards collected during an episode",
                "A one-hot encoding of the action the agent chose",
                "An encoding of a state as a numeric vector $\\mathbf{x}(s)=(x_1(s),\\dots,x_d(s))$ that the approximator consumes — good features expose the structure that predicts return"
              ],
              "answer": 3,
              "explain": "Before a function approximator can score a state it must be turned into numbers. The feature vector does that; choices range from state aggregation and tile coding to RBFs or learned (neural-net) features. The quality of $\\mathbf x(s)$ largely determines how well the values generalize."
            },
            {
              "q": "What is the form of a <em>linear</em> value-function approximator?",
              "choices": [
                "$\\hat v(s,\\mathbf{w})=\\mathbf{w}^\\top\\mathbf{x}(s)$ — a weighted sum of the features; its gradient w.r.t. $\\mathbf{w}$ is simply $\\mathbf{x}(s)$",
                "$\\hat v(s,\\mathbf{w})=\\max_a \\mathbf{w}^\\top\\mathbf{x}(s,a)$",
                "$\\hat v(s,\\mathbf{w})=\\mathbf{w}^\\top\\mathbf{w}$, independent of the state",
                "a lookup table with one entry per state"
              ],
              "answer": 0,
              "explain": "Linear VFA takes the inner product of weights and features. Because $\\nabla_{\\mathbf w}\\hat v=\\mathbf x(s)$ (independent of $\\mathbf w$), the optimization surface is well-behaved — which is why linear methods enjoy the strongest convergence guarantees, while nonlinear nets trade those guarantees for expressiveness."
            },
            {
              "q": "In what sense is a neural network a value-function approximator?",
              "choices": [
                "The whole network is discarded and replaced by a table at test time",
                "A neural network cannot be used as a value-function approximator",
                "Its hidden layers learn the feature representation $\\mathbf{x}(s)$ while the final linear layer learns the weights $\\mathbf{w}$ — a learned, scalable feature constructor",
                "Only the input layer matters; the hidden layers are fixed random projections"
              ],
              "answer": 2,
              "explain": "A deep net is a <em>learned</em> feature constructor: its hidden layers transform the raw state into useful features and its last linear layer combines them into a value. This is the modern, scalable answer to feature design and the foundation of value-based deep RL (DQN)."
            }
          ],
          "flashcards": [
            {
              "front": "Define the Mean Squared Value Error objective $\\overline{\\text{VE}}(\\mathbf{w})$.",
              "back": "$\\overline{\\text{VE}}(\\mathbf{w}) = \\sum_s \\mu(s)\\,[v_\\pi(s) - \\hat{v}(s,\\mathbf{w})]^2$, the squared prediction error averaged over states weighted by the on-policy distribution $\\mu(s)$ (time spent in each state)."
            },
            {
              "front": "Linear semi-gradient TD(0) weight update?",
              "back": "$\\mathbf{w} \\leftarrow \\mathbf{w} + \\alpha\\,\\delta_t\\,\\mathbf{x}(S_t)$, where $\\delta_t = R_{t+1} + \\gamma\\hat{v}(S_{t+1},\\mathbf{w}) - \\hat{v}(S_t,\\mathbf{w})$ and $\\hat{v}(s,\\mathbf{w})=\\mathbf{w}^\\top\\mathbf{x}(s)$."
            },
            {
              "front": "What makes a TD update a 'semi-gradient'?",
              "back": "The bootstrapped target depends on $\\mathbf{w}$, but we treat it as a constant and take the gradient only of the prediction $\\hat{v}(S_t,\\mathbf{w})$. It is therefore not the true gradient of any fixed loss."
            },
            {
              "front": "Name the three ingredients of the deadly triad.",
              "back": "(1) Function approximation, (2) bootstrapping, (3) off-policy training. Divergence risk requires all three together; removing any one restores stability."
            },
            {
              "front": "What is the gradient of a linear value function $\\hat{v}(s,\\mathbf{w}) = \\mathbf{w}^\\top\\mathbf{x}(s)$ w.r.t. $\\mathbf{w}$?",
              "back": "$\\nabla_{\\mathbf{w}}\\hat{v}(s,\\mathbf{w}) = \\mathbf{x}(s)$, the feature vector itself (independent of $\\mathbf{w}$)."
            },
            {
              "front": "How do target networks and experience replay relate to the deadly triad?",
              "back": "They mitigate triad failure modes in deep RL: target networks freeze the bootstrap target (weakening the feedback loop, like an extreme stop-gradient); replay reshapes/decorrelates the data distribution to ease off-policy mismatch. They manage, not eliminate, the triad."
            }
          ],
          "homework": [
            {
              "prompt": "Derive the linear semi-gradient TD(0) update from first principles. Start from the per-sample squared error $\\tfrac{1}{2}[U_t - \\hat{v}(S_t,\\mathbf{w})]^2$ with target $U_t = R_{t+1} + \\gamma\\hat{v}(S_{t+1},\\mathbf{w})$ and $\\hat{v}(s,\\mathbf{w}) = \\mathbf{w}^\\top\\mathbf{x}(s)$. Show clearly where the 'semi-gradient' approximation enters.",
              "hint": "Apply the chain rule to differentiate the squared error w.r.t. $\\mathbf{w}$, then deliberately treat $U_t$ as a constant (do not differentiate through $\\hat{v}(S_{t+1},\\mathbf{w})$). Recall $\\nabla_{\\mathbf{w}}\\hat{v}(s,\\mathbf{w}) = \\mathbf{x}(s)$ for the linear case.",
              "solution": "Let $L(\\mathbf{w}) = \\tfrac{1}{2}[U_t - \\hat{v}(S_t,\\mathbf{w})]^2$. Differentiating with the chain rule: $\\nabla_{\\mathbf{w}} L = [U_t - \\hat{v}(S_t,\\mathbf{w})]\\cdot\\nabla_{\\mathbf{w}}[U_t - \\hat{v}(S_t,\\mathbf{w})]$. The bracket $U_t = R_{t+1} + \\gamma\\hat{v}(S_{t+1},\\mathbf{w})$ actually depends on $\\mathbf{w}$. The SEMI-GRADIENT step is to treat $U_t$ as constant, so $\\nabla_{\\mathbf{w}}[U_t - \\hat{v}(S_t,\\mathbf{w})] \\approx -\\nabla_{\\mathbf{w}}\\hat{v}(S_t,\\mathbf{w}) = -\\mathbf{x}(S_t)$ (using linearity). Thus $\\nabla_{\\mathbf{w}} L \\approx -[U_t - \\hat{v}(S_t,\\mathbf{w})]\\,\\mathbf{x}(S_t)$. Gradient DESCENT moves opposite the gradient: $\\mathbf{w} \\leftarrow \\mathbf{w} - \\alpha\\nabla_{\\mathbf{w}}L = \\mathbf{w} + \\alpha[U_t - \\hat{v}(S_t,\\mathbf{w})]\\,\\mathbf{x}(S_t)$. Substituting $U_t$ and writing $\\delta_t = R_{t+1} + \\gamma\\hat{v}(S_{t+1},\\mathbf{w}) - \\hat{v}(S_t,\\mathbf{w})$ gives $\\mathbf{w} \\leftarrow \\mathbf{w} + \\alpha\\,\\delta_t\\,\\mathbf{x}(S_t)$. The approximation entered precisely when we dropped the $\\gamma\\nabla_{\\mathbf{w}}\\hat{v}(S_{t+1},\\mathbf{w}) = \\gamma\\mathbf{x}(S_{t+1})$ term from the target's derivative; keeping it would give the true gradient (the residual-gradient method) and a different, generally inferior, update."
            },
            {
              "prompt": "For each scenario, state whether it is at risk of deadly-triad divergence, and if it is NOT, name which triad ingredient is missing: (a) tabular Q-learning; (b) on-policy linear semi-gradient TD(0) (i.e. linear TD prediction following the data-generating policy); (c) Monte Carlo control with a neural network function approximator and off-policy importance sampling; (d) deep Q-learning (a neural net, $\\max_a$ bootstrap target, exploratory behavior policy).",
              "hint": "List the three ingredients (function approximation, bootstrapping, off-policy) and check each scenario against all three. Divergence risk requires all three present.",
              "solution": "(a) Tabular Q-learning: bootstraps and is off-policy (greedy target vs. exploratory behavior), but uses a TABLE, so function approximation is MISSING -> not at risk; tabular Q-learning is known to converge. (b) On-policy linear semi-gradient TD(0): has function approximation and bootstrapping, but is ON-policy, so off-policy is MISSING -> not at risk (linear on-policy TD provably converges to the TD fixed point). (c) Monte Carlo with NN and importance sampling: has function approximation and off-policy training, but Monte Carlo uses full returns, so BOOTSTRAPPING is MISSING -> not at risk (true SGD on a fixed loss, stable). (d) Deep Q-learning: function approximation (neural net) + bootstrapping ($\\max_a\\hat{q}$ target) + off-policy (greedy target vs. exploratory behavior) = ALL THREE present -> AT RISK of divergence. This is exactly why DQN needs target networks and experience replay to stabilize training."
            },
            {
              "prompt": "Consider three states $\\{1,2,3\\}$ aggregated into two groups: group G1 $= \\{1,2\\}$ and group G2 $= \\{3\\}$, with feature vectors $\\mathbf{x}(1)=\\mathbf{x}(2)=(1,0)^\\top$ and $\\mathbf{x}(3)=(0,1)^\\top$, weights $\\mathbf{w}=(w_1,w_2)^\\top$. Currently $\\mathbf{w}=(0,0)^\\top$, $\\alpha=0.5$, $\\gamma=1$. You observe the transition $S_t=1, R_{t+1}=2, S_{t+1}=3$. Compute the TD error $\\delta_t$ and the updated weight vector. Which component(s) of $\\mathbf{w}$ change, and what is $\\hat{v}(2,\\mathbf{w})$ after the update?",
              "hint": "Compute $\\hat{v}(1,\\mathbf{w})=\\mathbf{w}^\\top\\mathbf{x}(1)$ and $\\hat{v}(3,\\mathbf{w})=\\mathbf{w}^\\top\\mathbf{x}(3)$, form $\\delta_t=R+\\gamma\\hat{v}(S_{t+1})-\\hat{v}(S_t)$, then apply $\\mathbf{w}\\leftarrow\\mathbf{w}+\\alpha\\delta_t\\mathbf{x}(S_t)$. Note states 1 and 2 share $w_1$.",
              "solution": "Predictions at $\\mathbf{w}=(0,0)$: $\\hat{v}(1)=\\mathbf{w}^\\top(1,0)^\\top=0$ and $\\hat{v}(3)=\\mathbf{w}^\\top(0,1)^\\top=0$. TD error: $\\delta_t = R_{t+1} + \\gamma\\hat{v}(3) - \\hat{v}(1) = 2 + 1\\cdot 0 - 0 = 2$. Update: $\\mathbf{w} \\leftarrow \\mathbf{w} + \\alpha\\delta_t\\mathbf{x}(1) = (0,0)^\\top + 0.5\\cdot 2\\cdot(1,0)^\\top = (1,0)^\\top$. Only $w_1$ changes (the active feature of $S_t=1$); $w_2$ stays 0 because $\\mathbf{x}(1)$ has 0 in that component. After the update, $\\hat{v}(2,\\mathbf{w}) = \\mathbf{w}^\\top\\mathbf{x}(2) = (1,0)\\cdot(1,0)^\\top = 1$. State 2's value changed even though we never visited it: this is GENERALIZATION via the shared weight $w_1$, the defining behavior of function approximation."
            }
          ],
          "examples": [
            {
              "title": "A linear value-function update by hand",
              "body": "You estimate state value with a linear approximator $\\hat{v}(s,\\mathbf{w}) = \\mathbf{w}^\\top \\mathbf{x}(s)$. A state $s$ has feature vector $\\mathbf{x}(s) = [2,\\,0,\\,-1]^\\top$ and current weights are $\\mathbf{w} = [0.5,\\,1.0,\\,2.0]^\\top$. A Monte Carlo return of $G = 6$ was observed from $s$. With step size $\\alpha = 0.1$, perform one stochastic-gradient step and report the new prediction.",
              "solution": "<strong>Step 1: Current prediction.</strong> For a linear model, $\\hat{v}(s,\\mathbf{w}) = \\mathbf{w}^\\top\\mathbf{x}(s) = (0.5)(2) + (1.0)(0) + (2.0)(-1) = 1.0 + 0 - 2.0 = -1.0.$\n\n<strong>Step 2: Gradient.</strong> For a linear approximator the gradient with respect to $\\mathbf{w}$ is simply the feature vector:\n$$\\nabla_{\\mathbf{w}}\\,\\hat{v}(s,\\mathbf{w}) = \\mathbf{x}(s) = [2,\\,0,\\,-1]^\\top.$$\n\n<strong>Step 3: Prediction error (target minus estimate).</strong>\n$$\\delta = G - \\hat{v}(s,\\mathbf{w}) = 6 - (-1.0) = 7.0.$$\n\n<strong>Step 4: SGD weight update.</strong> The gradient Monte Carlo update is $\\mathbf{w} \\leftarrow \\mathbf{w} + \\alpha\\,[G - \\hat{v}(s,\\mathbf{w})]\\,\\nabla_{\\mathbf{w}}\\hat{v}(s,\\mathbf{w}) = \\mathbf{w} + \\alpha\\,\\delta\\,\\mathbf{x}(s)$.\nCompute the increment $\\alpha\\,\\delta\\,\\mathbf{x}(s) = (0.1)(7.0)\\,[2,0,-1]^\\top = 0.7\\,[2,0,-1]^\\top = [1.4,\\,0,\\,-0.7]^\\top.$\nSo\n$$\\mathbf{w}_{\\text{new}} = [0.5,\\,1.0,\\,2.0]^\\top + [1.4,\\,0,\\,-0.7]^\\top = [1.9,\\,1.0,\\,1.3]^\\top.$$\n\n<strong>Step 5: New prediction.</strong>\n$$\\hat{v}(s,\\mathbf{w}_{\\text{new}}) = (1.9)(2) + (1.0)(0) + (1.3)(-1) = 3.8 + 0 - 1.3 = 2.5.$$\n\n<strong>Sanity check.</strong> We moved from $-1.0$ toward the target $6$; the new value $2.5$ is closer but does not overshoot. In fact for a single linear example the prediction always moves by exactly $\\alpha\\,\\|\\mathbf{x}(s)\\|^2\\,\\delta$: here $\\|\\mathbf{x}(s)\\|^2 = 2^2 + 0^2 + (-1)^2 = 5$, so the change is $(0.1)(5)(7.0) = 3.5$, and indeed $-1.0 + 3.5 = 2.5.$ <strong>Answer: $\\mathbf{w}_{\\text{new}} = [1.9,\\,1.0,\\,1.3]^\\top$ and $\\hat{v}(s,\\mathbf{w}_{\\text{new}}) = 2.5$.</strong>"
            },
            {
              "title": "Semi-gradient TD(0) and the generalization side effect",
              "body": "Two states share a tabular-style feature scheme but one feature is shared (aliased). State $A$ has $\\mathbf{x}(A) = [1,\\,0,\\,1]^\\top$ and state $B$ has $\\mathbf{x}(B) = [0,\\,1,\\,1]^\\top$, with linear $\\hat{v}(s,\\mathbf{w}) = \\mathbf{w}^\\top\\mathbf{x}(s)$ and current weights $\\mathbf{w} = [0,\\,0,\\,0]^\\top$. The agent observes the transition $A \\to B$ with reward $R = 4$, discount $\\gamma = 0.9$, and step size $\\alpha = 0.5$. Do one semi-gradient TD(0) update on this transition, then report the new values of <em>both</em> $A$ and $B$.",
              "solution": "<strong>Step 1: Predictions before the update.</strong> With $\\mathbf{w} = [0,0,0]^\\top$ everything is zero: $\\hat{v}(A) = 0$ and $\\hat{v}(B) = 0.$\n\n<strong>Step 2: TD target and TD error.</strong> The semi-gradient TD(0) target uses the bootstrapped estimate of the next state but treats it as a fixed constant (we do <em>not</em> differentiate through it — that is what makes it <em>semi</em>-gradient):\n$$\\text{target} = R + \\gamma\\,\\hat{v}(B,\\mathbf{w}) = 4 + (0.9)(0) = 4.$$\n$$\\delta = \\text{target} - \\hat{v}(A,\\mathbf{w}) = 4 - 0 = 4.$$\n\n<strong>Step 3: Update direction.</strong> The gradient is taken only at the updated state $A$: $\\nabla_{\\mathbf{w}}\\hat{v}(A,\\mathbf{w}) = \\mathbf{x}(A) = [1,0,1]^\\top$. The update rule is\n$$\\mathbf{w} \\leftarrow \\mathbf{w} + \\alpha\\,\\delta\\,\\mathbf{x}(A) = [0,0,0]^\\top + (0.5)(4)\\,[1,0,1]^\\top = [2,\\,0,\\,2]^\\top.$$\n\n<strong>Step 4: New value of the updated state $A$.</strong>\n$$\\hat{v}(A,\\mathbf{w}_{\\text{new}}) = (2)(1) + (0)(0) + (2)(1) = 4.$$\nIn one step $A$ jumped from $0$ to exactly its target $4$, because $\\alpha\\,\\|\\mathbf{x}(A)\\|^2 = (0.5)(2) = 1$ — a step that lands exactly on the target.\n\n<strong>Step 5: The generalization side effect — what happened to $B$?</strong> We never explicitly updated $B$, yet its weights changed through the shared third feature:\n$$\\hat{v}(B,\\mathbf{w}_{\\text{new}}) = (2)(0) + (0)(1) + (2)(1) = 2.$$\nState $B$'s value moved from $0$ to $2$ as a free byproduct of updating $A$, purely because $A$ and $B$ share feature 3. This is the double-edged sword from the lesson: a single weight update changed the estimate of a state we did not even target.\n\n<strong>Caveat / why <em>semi</em>-gradient matters.</strong> If we had also differentiated through the target $\\gamma\\hat{v}(B,\\mathbf{w})$, the effective gradient would have been $\\mathbf{x}(A) - \\gamma\\,\\mathbf{x}(B) = [1,-0.9,0.1]^\\top$, giving a different (and generally non-convergent for off-policy bootstrapping) update. The semi-gradient choice ignores that term. <strong>Answer: $\\hat{v}(A) = 4$ and, via generalization, $\\hat{v}(B) = 2$, with $\\mathbf{w}_{\\text{new}} = [2,0,2]^\\top$.</strong>"
            }
          ]
        },
        {
          "id": "rl-dqn",
          "title": "Deep Q-Networks (DQN)",
          "minutes": 18,
          "content": "<h3>From Tabular Q-Learning to a Neural Network</h3>\n<p>Recall the Q-learning update from the tabular setting. For a transition $(s, a, r, s')$, we nudge the action-value estimate toward a bootstrapped target:</p>\n$$Q(s,a) \\leftarrow Q(s,a) + \\alpha \\Big[\\underbrace{r + \\gamma \\max_{a'} Q(s', a')}_{\\text{TD target}} - Q(s,a)\\Big].$$\n<p>This works beautifully when we can store one number per state-action pair. But the moment the state is an image (Atari frames are $84 \\times 84 \\times 4 \\approx 28000$ pixels), a lookup table is hopeless: there are astronomically many states, almost none of which we ever visit twice. We need <strong>function approximation</strong> — a parametric model $Q(s,a;\\theta)$ that <em>generalizes</em> across states.</p>\n<p>The natural move is to make $Q$ a neural network with weights $\\theta$ and fit it by minimizing the squared TD error. Treating the target $y = r + \\gamma \\max_{a'} Q(s',a';\\theta)$ as if it were a regression label, the per-sample loss is</p>\n$$\\ell(\\theta) = \\big(y - Q(s,a;\\theta)\\big)^2 .$$\n<p>This is the seductive idea — and it is also exactly where naive Deep Q-Learning <em>diverges</em>. The 2015 DQN paper (Mnih et al., \"Human-level control through deep reinforcement learning\") is famous not for this idea but for two engineering tricks that make it actually converge. Understanding <em>why</em> those tricks are necessary is the whole point of this lesson.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>DQN is best understood as the collision of two worlds. Supervised learning assumes <strong>i.i.d. data</strong> and <strong>fixed targets</strong>. Reinforcement learning gives you neither: data arrives as a correlated stream, and the \"labels\" depend on the very network you are training. Every DQN trick is a patch that smuggles one of those supervised-learning assumptions back in.</p></div>\n\n<h3>Why Naive Deep Q-Learning Fails: \"The Deadly Triad\"</h3>\n<p>Sutton names three ingredients that, when combined, can cause value-based RL to diverge: <strong>function approximation</strong>, <strong>bootstrapping</strong> (targets built from your own estimates), and <strong>off-policy learning</strong> (learning about the greedy policy while behaving more exploratory). DQN uses all three. Two concrete failure modes drive the instability:</p>\n<ul>\n<li><strong>Correlated samples.</strong> Consecutive transitions in a trajectory are highly similar (the screen barely changes frame to frame). Stochastic gradient descent assumes roughly i.i.d. minibatches; feeding it a correlated stream causes it to overfit to whatever it is seeing right now and forget the rest. Worse, the data distribution itself shifts as the policy changes.</li>\n<li><strong>Moving targets.</strong> The regression target $y = r + \\gamma \\max_{a'} Q(s',a';\\theta)$ depends on $\\theta$. When you take a gradient step to push $Q(s,a;\\theta)$ toward $y$, you simultaneously <em>move</em> $y$, because $\\theta$ also parameterizes the target. You are chasing a target that runs away from you — a positive feedback loop that amplifies errors and can blow value estimates up to infinity.</li>\n</ul>\n\n<h3>Trick 1: Experience Replay</h3>\n<p>Instead of learning from each transition once, in order, DQN stores every transition $(s_t, a_t, r_t, s_{t+1})$ in a fixed-size <strong>replay buffer</strong> $\\mathcal{D}$ (typically $10^6$ transitions, a FIFO queue). Each learning step samples a <em>uniform random minibatch</em> from $\\mathcal{D}$ and performs SGD on it.</p>\n<p>This buys three distinct things:</p>\n<ul>\n<li><strong>Breaks temporal correlation.</strong> A random minibatch mixes transitions from many different episodes and time steps, approximating the i.i.d. assumption SGD wants. This is the single biggest stabilizer.</li>\n<li><strong>Data efficiency.</strong> Each expensive environment interaction is reused in many gradient updates instead of being thrown away after one. This matters enormously when simulation/interaction is the bottleneck.</li>\n<li><strong>Smooths the data distribution.</strong> Averaging over many past behaviors prevents the network from oscillating or getting trapped by a sudden burst of one kind of experience (e.g., repeatedly dying in the same spot).</li>\n</ul>\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Experience replay is only legitimate because Q-learning is <em>off-policy</em>. The Q-learning update targets the greedy policy regardless of which policy generated the data, so it is perfectly happy to learn from old transitions collected by a now-obsolete version of the network. An on-policy method like SARSA cannot reuse stale data this way — the data must reflect the current policy. This is a deep reason DQN is built on Q-learning rather than SARSA.</p></div>\n<p>One caveat worth internalizing: replay assumes the value of a transition doesn't depend on <em>when</em> it was collected, which is true for the off-policy target but not for the behavior distribution. Very old transitions can become unrepresentative; the finite FIFO buffer is the pragmatic compromise.</p>\n\n<h3>Trick 2: The Target Network</h3>\n<p>To stop chasing a moving target, DQN keeps a <strong>second copy</strong> of the network, the <em>target network</em> with parameters $\\theta^-$, used only to compute the bootstrap target:</p>\n$$y = r + \\gamma \\max_{a'} Q(s', a'; \\theta^-).$$\n<p>The online network $\\theta$ is updated every step by gradient descent. The target network $\\theta^-$ is held <strong>frozen</strong> and only periodically refreshed by copying the online weights: every $C$ steps (the original paper used $C = 10{,}000$), set $\\theta^- \\leftarrow \\theta$.</p>\n<p>Between refreshes, the targets $y$ are constants with respect to the parameters we are optimizing. For $C$ steps the problem looks like ordinary supervised regression onto fixed labels — exactly the regime where SGD is well-behaved. Freezing the target decouples the two roles of $\\theta$ (predictor vs. target generator) and breaks the runaway feedback loop.</p>\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>The target network is a form of <strong>stabilized fixed-point iteration</strong>. The Bellman optimality operator $\\mathcal{T}$ is a contraction in the tabular case, so iterating $Q \\leftarrow \\mathcal{T}Q$ converges. With function approximation that contraction guarantee is lost, but holding $\\theta^-$ fixed approximates \"apply $\\mathcal{T}$ once, then fully fit it\" — a damped, slowed-down version of value iteration that empirically restores stability. A popular soft variant updates continuously, $\\theta^- \\leftarrow \\tau\\,\\theta + (1-\\tau)\\,\\theta^-$ with small $\\tau$ (e.g. $\\tau = 0.001$ in the original DDPG, and $\\tau = 0.005$ in TD3/SAC), trading slower tracking for smoother targets.</p></div>\n\n<h3>The DQN Loss Function</h3>\n<p>Putting both tricks together, DQN minimizes, over minibatches sampled from the replay buffer $\\mathcal{D}$,</p>\n$$L(\\theta) = \\mathbb{E}_{(s,a,r,s') \\sim \\mathcal{D}}\\left[\\Big(\\underbrace{r + \\gamma \\max_{a'} Q(s',a';\\theta^-)}_{\\text{target, uses }\\theta^-} - Q(s,a;\\theta)\\Big)^2\\right].$$\n<p>Three subtleties that experts must keep straight:</p>\n<ul>\n<li><strong>The gradient flows only through the online network.</strong> We do <em>not</em> backpropagate through $\\theta^-$; it is treated as a constant. In code this means calling <code>.detach()</code> (PyTorch) or <code>stop_gradient</code> (JAX/TF) on the target. The semi-gradient is\n$$\\nabla_\\theta L = -\\mathbb{E}\\big[\\,(y - Q(s,a;\\theta))\\,\\nabla_\\theta Q(s,a;\\theta)\\,\\big].$$\nThis is a <em>semi-gradient</em>: it ignores the dependence of $y$ on parameters, which is precisely why the target network's freezing is conceptually clean.</li>\n<li><strong>Terminal states.</strong> If $s'$ is terminal, there is no future, so the target is just $y = r$ (drop the $\\gamma \\max$ term). Implementations track a <code>done</code> flag and multiply the bootstrap term by $(1 - \\text{done})$.</li>\n<li><strong>Huber loss in practice.</strong> The paper clips the TD error to $[-1, 1]$, equivalent to using the <strong>Huber loss</strong> instead of pure squared error. This makes training robust to occasional huge TD errors (outliers), preventing exploding gradients.</li>\n</ul>\n\n<h3>The Full DQN Algorithm</h3>\n<pre><code>Initialize replay buffer D (capacity N)\nInitialize online network Q with random weights theta\nInitialize target network Q_hat with weights theta_minus = theta\n\nfor each step t:\n    # ---- Act (epsilon-greedy, off-policy behavior) ----\n    with prob epsilon: a_t = random action\n    else:              a_t = argmax_a Q(s_t, a; theta)\n    execute a_t, observe r_t, s_{t+1}, done\n    store (s_t, a_t, r_t, s_{t+1}, done) in D\n\n    # ---- Learn ----\n    sample minibatch (s, a, r, s', done) ~ Uniform(D)\n    if done: y = r\n    else:    y = r + gamma * max_a' Q_hat(s', a'; theta_minus)   # detached\n    loss = Huber( y - Q(s, a; theta) )\n    theta <- theta - lr * grad(loss)          # online net only\n\n    # ---- Periodically sync target network ----\n    every C steps: theta_minus <- theta\n</code></pre>\n\n<h3>Worked Example: One Gradient Step</h3>\n<p>Two discrete actions, $\\gamma = 0.99$, learning rate $\\alpha = 0.1$. Sample one transition $(s, a, r, s', \\text{done})$ with $a = 0$, $r = 2$, $\\text{done} = \\text{False}$.</p>\n<p>The <strong>online</strong> network currently outputs $Q(s, \\cdot; \\theta) = [Q(s,0), Q(s,1)] = [5.0,\\; 3.0]$. The <strong>target</strong> network (older weights $\\theta^-$) outputs at the next state $Q(s', \\cdot; \\theta^-) = [7.0,\\; 9.0]$.</p>\n<p><strong>Step 1 — target.</strong> Since $s'$ is non-terminal, use the target network's max:</p>\n$$y = r + \\gamma \\max_{a'} Q(s',a';\\theta^-) = 2 + 0.99 \\times \\max(7.0,\\,9.0) = 2 + 0.99 \\times 9.0 = 10.91.$$\n<p><strong>Step 2 — TD error.</strong> We compare against the online network's value for the action actually taken, $a = 0$:</p>\n$$\\delta = y - Q(s,0;\\theta) = 10.91 - 5.0 = 5.91.$$\n<p><strong>Step 3 — update.</strong> The gradient only touches the $Q(s,0)$ output (action $a=1$ was not taken, so its loss gradient is zero for this sample). With a linear-output approximation the update for that head is</p>\n$$Q(s,0) \\leftarrow Q(s,0) + \\alpha\\,\\delta = 5.0 + 0.1 \\times 5.91 = 5.591.$$\n<p>Notice three things that distinguish DQN from a naive version: (1) the bootstrap used $\\theta^-$, not $\\theta$, so $y$ did <em>not</em> move when we updated $\\theta$; (2) only the taken action's value changed; (3) had this transition been sampled in sequence rather than from a shuffled buffer, the next sample would likely be highly correlated with it — replay is what prevents that.</p>\n\n<h3>Key Extensions</h3>\n<h4>Double DQN — fixing maximization bias</h4>\n<p>The $\\max$ in the target systematically <strong>overestimates</strong> action values. Intuition: $\\mathbb{E}[\\max_a Q] \\ge \\max_a \\mathbb{E}[Q]$ (Jensen), so taking a max over noisy estimates picks up positive noise. Standard DQN both <em>selects</em> and <em>evaluates</em> the next action with the same network, compounding the bias. <strong>Double DQN</strong> decouples them: the online network chooses the action, the target network scores it:</p>\n$$y^{\\text{DDQN}} = r + \\gamma\\, Q\\big(s',\\; \\arg\\max_{a'} Q(s',a';\\theta);\\; \\theta^-\\big).$$\n<p>Selection by $\\theta$, evaluation by $\\theta^-$ — if the online net overrates an action, the (different) target net is unlikely to share that exact overestimate, cancelling much of the bias. Crucially, it needs no new network: it reuses the target network you already have.</p>\n\n<h4>Dueling architecture — separating value and advantage</h4>\n<p>Often the <em>state</em> value matters far more than the choice of action (in many states all actions are roughly equivalent). The <strong>dueling network</strong> splits the final layers into two streams — a scalar state value $V(s)$ and a per-action advantage $A(s,a)$ — then recombines them. To make the decomposition identifiable (otherwise you could add a constant to $V$ and subtract it from $A$), the advantages are mean-centered:</p>\n$$Q(s,a) = V(s) + \\Big(A(s,a) - \\tfrac{1}{|\\mathcal{A}|}\\textstyle\\sum_{a'} A(s,a')\\Big).$$\n<p>This is an architectural change only — it slots into any DQN variant and lets the network learn $V(s)$ efficiently from all actions' updates.</p>\n\n<h4>Prioritized Experience Replay — sample what surprises you</h4>\n<p>Uniform sampling wastes effort on transitions the network already predicts well. <strong>Prioritized replay</strong> samples transitions with probability proportional to their last-seen TD error magnitude, $p_i \\propto |\\delta_i|^\\alpha$ — big errors are \"surprising\" and informative. Because this biases the sampling distribution away from $\\mathcal{D}$, it must be corrected with <strong>importance-sampling weights</strong> $w_i = \\big(\\tfrac{1}{N}\\cdot\\tfrac{1}{P(i)}\\big)^\\beta$ applied to each sample's loss, with $\\beta$ annealed toward $1$ over training. Without that correction you'd optimize the wrong objective.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>These extensions are largely orthogonal and combine: the <strong>Rainbow</strong> agent (Hessel et al., 2018) stacks Double DQN, dueling, prioritized replay, multi-step returns, distributional value learning, and noisy exploration into one agent that substantially outperforms any single component. The general lesson — that independently-motivated improvements to a base algorithm often compose into large combined gains — recurs throughout deep learning.</p></div>\n\n<h3>Summary</h3>\n<ul>\n<li>DQN = Q-learning with a neural net $Q(s,a;\\theta)$, made stable by two tricks.</li>\n<li><strong>Experience replay</strong> breaks sample correlation, recovers (approximate) i.i.d. minibatches, and reuses data; it relies on Q-learning being off-policy.</li>\n<li><strong>Target network</strong> $\\theta^-$ freezes the bootstrap target for $C$ steps, turning a moving-target problem into stable supervised regression.</li>\n<li>Loss: squared/Huber TD error with the target computed from $\\theta^-$ and detached; terminal states drop the bootstrap term.</li>\n<li>Extensions: Double DQN (overestimation), dueling (value/advantage split), prioritized replay (sample by surprise) — all composable, as in Rainbow.</li>\n</ul>\n<details class=\"deep-dive\">\n<summary>Deeper dive: DQN's two tricks fix the two ways deep Q-learning self-destructs</summary>\n<p>Bolting a neural network onto Q-learning naively <em>diverges</em>, for two distinct reasons — and DQN adds exactly one fix for each. <b>Problem 1: correlated, non-stationary data.</b> Consecutive transitions in an episode are highly correlated and their distribution shifts as the policy changes, which violates the i.i.d. assumption SGD relies on. <b>Fix: experience replay</b> — store transitions in a buffer and train on <em>random</em> minibatches, decorrelating the samples and reusing each one many times.</p>\n<p><b>Problem 2: a moving target.</b> The update aims $Q(s,a)$ at $r + \\gamma \\max_{a'} Q(s', a')$ — but that target is computed by the <em>same</em> network you're updating, so the instant you take a step the target moves too: you're chasing your own tail, and small errors amplify. <b>Fix: a target network</b> — a frozen copy that supplies the target and is only refreshed every few thousand steps, holding the goal still long enough to converge toward it.</p>\n<p>The \"aha\": replay <em>decorrelates the data</em>, the target network <em>stabilizes the objective</em>. They aren't bells and whistles — remove either and DQN falls apart. Every later value-based method (Double DQN, Rainbow) keeps both and just refines them.</p>\n</details>\n",
          "mcq": [
            {
              "q": "Why does experience replay specifically require that DQN is built on an off-policy algorithm (Q-learning) rather than an on-policy one (SARSA)?",
              "choices": [
                "Because Q-learning has a smaller variance, so old samples are less noisy",
                "Because the Q-learning target estimates the value of the greedy policy regardless of which policy generated the stored transition, so stale data from old policies is still valid",
                "Because SARSA cannot be represented by a neural network",
                "Because off-policy methods do not use bootstrapping, avoiding the moving-target problem"
              ],
              "answer": 1,
              "explain": "Replay reuses transitions collected by older (now obsolete) network versions. Only an off-policy target, which evaluates the greedy policy independent of the behavior policy, remains correct on such stale data; SARSA's target depends on the policy that generated the action."
            },
            {
              "q": "The DQN target is $y = r + \\gamma \\max_{a'} Q(s',a';\\theta^-)$. What goes wrong if you replace $\\theta^-$ with the online parameters $\\theta$ and backpropagate through it?",
              "choices": [
                "Nothing changes; $\\theta^-$ is just a notational convenience",
                "The target moves every time you update $\\theta$, creating a positive-feedback loop that can cause value estimates to diverge",
                "The loss becomes non-differentiable",
                "It turns DQN into an on-policy method"
              ],
              "answer": 1,
              "explain": "Tying the target to the online weights means each gradient step shifts the very target you are regressing toward. This chasing-a-moving-target feedback loop amplifies errors and is a primary cause of divergence; the frozen target network breaks it."
            },
            {
              "q": "How does Double DQN reduce the overestimation bias of standard DQN?",
              "choices": [
                "It uses two replay buffers and averages their samples",
                "It clips the reward to $[-1,1]$ before computing the target",
                "It uses the online network to select the maximizing next action but the target network to evaluate that action's value, decoupling selection from evaluation",
                "It removes the max operator entirely and averages over all next actions"
              ],
              "answer": 2,
              "explain": "Standard DQN selects and evaluates the next action with the same (noisy) network, so positive noise is systematically picked up by the max. Double DQN selects with $\\theta$ and evaluates with $\\theta^-$, so an overestimate by one network is unlikely to be echoed by the other."
            },
            {
              "q": "In prioritized experience replay, transitions are sampled with probability proportional to $|\\delta_i|^\\alpha$. Why are importance-sampling weights necessary?",
              "choices": [
                "To make the buffer use less memory",
                "To correct the bias introduced by sampling from a non-uniform distribution, so the expected gradient still matches the intended objective",
                "To increase the learning rate on rare transitions",
                "To prevent the TD errors from becoming negative"
              ],
              "answer": 1,
              "explain": "Non-uniform sampling changes the distribution over which the loss expectation is taken. The IS weights $w_i = (N \\cdot P(i))^{-\\beta}$ (equivalently $w_i = (\\tfrac{1}{N}\\cdot\\tfrac{1}{P(i)})^{\\beta}$) reweight each sample's loss to undo that bias, recovering an (approximately) unbiased gradient as $\\beta \\to 1$."
            },
            {
              "q": "The lesson describes DQN as 'the collision of two worlds.' What single assumption from supervised learning is violated by the fact that the regression target $y = r + \\gamma \\max_{a'} Q(s',a';\\theta)$ is computed using the same network being trained?",
              "choices": [
                "The assumption of fixed (stationary) targets",
                "The assumption of i.i.d. data",
                "The assumption of bounded rewards",
                "The assumption of a discrete action space"
              ],
              "answer": 0,
              "explain": "Because the label $y$ depends on the very parameters $\\theta$ being updated, the regression target moves as the network learns, breaking supervised learning's assumption that targets are fixed. (The i.i.d. assumption is violated separately, by correlated samples, not by how the target is computed.)"
            },
            {
              "q": "According to the lesson, which exact trio of ingredients constitutes Sutton's 'deadly triad' that can cause value-based RL to diverge?",
              "choices": [
                "Function approximation, bootstrapping, and off-policy learning",
                "Large state spaces, sparse rewards, and exploration",
                "Stochastic gradients, replay buffers, and target networks",
                "Function approximation, on-policy learning, and Monte Carlo returns"
              ],
              "answer": 0,
              "explain": "The deadly triad is function approximation, bootstrapping (targets built from your own estimates), and off-policy learning; DQN combines all three. Monte Carlo returns do not bootstrap and on-policy learning is not off-policy, so the last option is wrong."
            },
            {
              "q": "The lesson notes that a lookup table is hopeless for Atari because an $84\\times84\\times4$ frame has about 28,000 pixels. What property of a neural network $Q(s,a;\\theta)$ specifically solves this problem that a table cannot?",
              "choices": [
                "It generalizes across states, sharing learned structure between states never visited twice",
                "It guarantees convergence to the optimal policy unlike a table",
                "It removes the need for a discount factor $\\gamma$",
                "It stores one separate parameter for every possible state-action pair"
              ],
              "answer": 0,
              "explain": "A parametric network generalizes across the astronomically many states, so experience from one state informs predictions on similar unseen states. DQN offers no convergence guarantee, still needs $\\gamma$, and crucially does NOT store a separate entry per state-action pair (that is exactly what the table does)."
            },
            {
              "q": "The lesson identifies correlated samples as a failure mode because 'the screen barely changes frame to frame.' Why does feeding this correlated stream to stochastic gradient descent cause trouble?",
              "choices": [
                "SGD assumes roughly i.i.d. minibatches, so it overfits to the current situation and forgets the rest",
                "SGD requires the targets to be non-stationary, which correlation prevents",
                "Correlated samples make the learning rate $\\alpha$ grow without bound",
                "Correlation guarantees the gradient is always zero, halting learning"
              ],
              "answer": 0,
              "explain": "SGD's stability relies on roughly i.i.d. minibatches, so a highly correlated trajectory drives the network to overfit whatever it is currently seeing and forget previously learned behavior. SGD does not require non-stationary targets, correlation does not change $\\alpha$, and the gradient is not forced to zero."
            },
            {
              "q": "Consider a 2-action DQN with $\\gamma = 0.99$, $\\alpha = 0.1$, action $a=0$, reward $r=2$, online output $Q(s,\\cdot;\\theta)=[5.0,\\,3.0]$, and target output $Q(s',\\cdot;\\theta^-)=[7.0,\\,9.0]$. Suppose this transition is a $\\textbf{terminal}$ one ($\\text{done}=\\text{True}$). What is the new value of $Q(s,0)$ after one gradient step?",
              "choices": [
                "$5.591$ (the terminal flag does not affect the value update)",
                "$4.7$, because $y = r = 2$ gives $\\delta = -3.0$ and $Q(s,0) \\leftarrow 5.0 + 0.1(-3.0)$",
                "$10.91$, the bootstrap target overwrites the old estimate",
                "$2.0$, the network is set directly to the reward at terminal states"
              ],
              "answer": 1,
              "explain": "At a terminal state the bootstrap term is dropped, so $y = r = 2$. Then $\\delta = 2 - 5.0 = -3.0$ and $Q(s,0) \\leftarrow 5.0 + 0.1(-3.0) = 4.7$. Choice (a) is the non-terminal result ($y = 2 + 0.99\\cdot 9 = 10.91$, $\\delta=5.91$, giving $5.591$) and wrongly ignores that 'done' zeroes the $\\gamma\\max$ term; (c) is the bootstrap target value, not the updated estimate; (d) confuses the SGD nudge with directly overwriting the value."
            },
            {
              "q": "A practitioner replaces the hard periodic sync $\\theta^- \\leftarrow \\theta$ (every $C$ steps) with the soft update $\\theta^- \\leftarrow \\tau\\,\\theta + (1-\\tau)\\,\\theta^-$ using $\\tau = 0.005$. Compared to a large hard-sync period like $C = 10{,}000$, what is the main qualitative tradeoff?",
              "choices": [
                "The soft update makes the target network identical to the online network, eliminating the moving-target problem entirely",
                "The soft update tracks the online weights more smoothly and continuously but more slowly, trading abrupt target jumps for gradual lag",
                "The soft update removes the need for experience replay because targets are now stationary",
                "The soft update guarantees the Bellman operator regains its contraction property under function approximation"
              ],
              "answer": 1,
              "explain": "A small $\\tau$ means $\\theta^-$ barely moves each step, giving smooth, continuously-tracking targets that lag the online net rather than jumping every $C$ steps. (a) is wrong because $\\tau$ is tiny so $\\theta^-\\neq\\theta$; (c) replay addresses correlation, an orthogonal issue; (d) the lesson states the contraction guarantee is lost under function approximation and target networks only approximate stability."
            },
            {
              "q": "In the dueling architecture, $Q(s,a) = V(s) + \\big(A(s,a) - \\frac{1}{|\\mathcal{A}|}\\sum_{a'} A(s,a')\\big)$. Why is the mean-subtraction term essential rather than just using $Q(s,a) = V(s) + A(s,a)$?",
              "choices": [
                "It guarantees all advantages are non-negative, which is required for the $\\max$ in the TD target",
                "It normalizes $Q$-values to sum to one so they can be interpreted as a policy distribution",
                "Without it the decomposition is unidentifiable: any constant could shift from $V$ into $A$ and back, leaving $Q$ unchanged but the streams ill-defined",
                "It is what removes the overestimation bias addressed by Double DQN"
              ],
              "answer": 2,
              "explain": "Plain $V + A$ is underdetermined: adding $c$ to $V(s)$ and subtracting $c$ from every $A(s,a)$ yields the same $Q$, so the network cannot pin down $V$ and $A$ separately. Mean-centering fixes a reference, making the split identifiable. The other options describe unrelated mechanisms (non-negativity, normalization, overestimation)."
            },
            {
              "q": "Suppose you set the target-network refresh period $C$ to a very small value (e.g. $C=1$, copying $\\theta^- \\leftarrow \\theta$ every single step). What is the most accurate consequence?",
              "choices": [
                "Training becomes maximally stable, since the target network is always up to date",
                "Data efficiency improves because each transition is now reused more times",
                "You effectively recover the naive moving-target setting, reintroducing the runaway feedback loop the target network was meant to prevent",
                "Overestimation bias from the $\\max$ operator is eliminated"
              ],
              "answer": 2,
              "explain": "With $C=1$ the target $y$ uses parameters that change every step alongside the online net, so $y$ chases the predictor again, the exact moving-target instability the frozen target was designed to break. (a) inverts the truth; (b) data reuse is governed by replay, not $C$; (d) overestimation comes from the $\\max$/shared selection-evaluation, addressed by Double DQN, not by $C$."
            },
            {
              "q": "What is a Deep Q-Network (DQN)?",
              "choices": [
                "A tabular Q-learning agent that simply uses a larger table",
                "A policy-gradient method that directly outputs action probabilities",
                "Q-learning in which a neural network $Q(s,a;\\theta)$ replaces the lookup table, fit by minimizing the squared TD error — so Q-learning scales to huge or image-based state spaces",
                "A model-based planner that learns the transition dynamics and plans against them"
              ],
              "answer": 2,
              "explain": "DQN keeps the Q-learning target $r+\\gamma\\max_{a'}Q(s',a')$ but represents $Q$ with a neural network, training it like a regression toward that target. That is what let Q-learning play Atari from raw pixels — but the naive version diverges without the two stabilizing tricks below."
            },
            {
              "q": "What is <em>experience replay</em> in DQN?",
              "choices": [
                "Storing past transitions $(s,a,r,s')$ in a buffer and training on uniformly-sampled random minibatches from it, rather than learning from only the latest transition",
                "Replaying the single best episode over and over until the agent memorizes it",
                "A second network that predicts the immediate reward",
                "Gradually decaying the exploration rate $\\varepsilon$ over training"
              ],
              "answer": 0,
              "explain": "A FIFO replay buffer (often $10^6$ transitions) is sampled at random each update. This breaks the temporal correlation of consecutive frames (restoring SGD's near-i.i.d. assumption), reuses each costly interaction many times, and smooths the data distribution. It's legitimate precisely because Q-learning is off-policy."
            },
            {
              "q": "What is the <em>target network</em> in DQN?",
              "choices": [
                "The policy network that selects actions during play",
                "A network that predicts the environment's next state",
                "The replay buffer that stores past transitions",
                "A periodically-frozen copy of the Q-network, with weights $\\theta^-$, used to compute the bootstrap target $y=r+\\gamma\\max_{a'}Q(s',a';\\theta^-)$ so the target doesn't move every gradient step"
              ],
              "answer": 3,
              "explain": "If the target $y$ used the live weights $\\theta$, each gradient step would move $Q(s,a)$ and the target together — chasing a runaway target. Freezing a copy $\\theta^-$ (synced every $C$ steps, or slowly via a soft update) holds the target still long enough for stable regression."
            },
            {
              "q": "Given a state, how does a DQN produce action-values?",
              "choices": [
                "It requires a separate forward pass for every possible action",
                "The network outputs the Q-values for <em>all</em> actions in a single forward pass, so the greedy action and $\\max_{a'}Q$ are read straight off the output vector",
                "It outputs a single scalar that must be thresholded to pick an action",
                "It outputs the next state rather than any action values"
              ],
              "answer": 1,
              "explain": "The standard DQN maps a state to a length-$|\\mathcal A|$ vector of Q-values in one pass. This is efficient (one network evaluation per state) and makes the $\\max_{a'}Q(s',a')$ in the target and the greedy $\\arg\\max$ for acting trivial to compute."
            }
          ],
          "flashcards": [
            {
              "front": "Write the DQN loss function.",
              "back": "$L(\\theta) = \\mathbb{E}_{(s,a,r,s')\\sim\\mathcal{D}}\\big[(y - Q(s,a;\\theta))^2\\big]$ where $y = r + \\gamma \\max_{a'} Q(s',a';\\theta^-)$ (and $y = r$ for terminal $s'$). The target uses the frozen target-network weights $\\theta^-$ and is detached (no gradient)."
            },
            {
              "front": "What two problems does experience replay solve?",
              "back": "(1) Breaks temporal correlation between consecutive transitions, restoring approximately i.i.d. minibatches for SGD. (2) Data efficiency: each environment interaction is reused in many gradient updates. (Bonus: smooths the training data distribution.)"
            },
            {
              "front": "What is the target network and how is it updated (hard update)?",
              "back": "A frozen copy of the Q-network with parameters $\\theta^-$ used only to compute bootstrap targets. Hard update: every $C$ steps copy $\\theta^- \\leftarrow \\theta$ (original DQN: $C=10{,}000$). Soft variant: $\\theta^- \\leftarrow \\tau\\theta + (1-\\tau)\\theta^-$ with small $\\tau$ (e.g. $\\tau=0.001$ in DDPG)."
            },
            {
              "front": "Why does the target network stabilize training?",
              "back": "It freezes the regression targets for $C$ steps, decoupling the predictor role and target-generator role of the parameters. This turns a moving-target problem into stable supervised regression and breaks the divergent positive-feedback loop."
            },
            {
              "front": "Give the Double DQN target and what bias it fixes.",
              "back": "$y = r + \\gamma\\, Q(s', \\arg\\max_{a'} Q(s',a';\\theta);\\, \\theta^-)$. It fixes the maximization (overestimation) bias of the single-network max by selecting the action with the online net and evaluating it with the target net."
            },
            {
              "front": "What is the 'deadly triad' and which parts does DQN use?",
              "back": "Function approximation + bootstrapping + off-policy learning. Combining all three can cause value-based RL to diverge. DQN uses all three, which is exactly why it needs replay and a target network for stability."
            }
          ],
          "homework": [
            {
              "prompt": "Write the complete DQN loss function for a sampled minibatch, including correct handling of terminal transitions, and state precisely which parameters the gradient is taken with respect to and which are held constant. Then write the target-network update schedule for both the hard-update and soft-update variants.",
              "hint": "The target must use $\\theta^-$, not $\\theta$, and you must drop the bootstrap term when the next state is terminal. The gradient should flow only through the online network.",
              "solution": "Loss over a minibatch $B$ sampled from replay buffer $\\mathcal{D}$:\n$$L(\\theta) = \\frac{1}{|B|}\\sum_{(s,a,r,s',d)\\in B} \\big(y - Q(s,a;\\theta)\\big)^2,\\quad y = r + (1-d)\\,\\gamma \\max_{a'} Q(s',a';\\theta^-).$$\nHere $d\\in\\{0,1\\}$ is the terminal flag: when the transition is terminal ($d=1$) the bootstrap term vanishes and $y=r$. The gradient is taken only with respect to the online parameters $\\theta$; the target parameters $\\theta^-$ are held constant (detached / stop-gradient), giving the semi-gradient $\\nabla_\\theta L = -\\frac{1}{|B|}\\sum (y - Q(s,a;\\theta))\\nabla_\\theta Q(s,a;\\theta)$. In practice the squared error is often replaced by the Huber loss for robustness.\n\nTarget-network update schedule:\n- Hard update: every $C$ training steps, copy $\\theta^- \\leftarrow \\theta$ (original DQN used $C = 10{,}000$). Between copies $\\theta^-$ is frozen.\n- Soft update: at every step, $\\theta^- \\leftarrow \\tau\\,\\theta + (1-\\tau)\\,\\theta^-$ with small $\\tau$ (e.g. $\\tau = 0.001$ in the original DDPG), an exponential moving average that tracks the online weights slowly and continuously."
            },
            {
              "prompt": "You have two discrete actions, $\\gamma = 0.9$. For a sampled transition with action $a=1$, reward $r=1$, and non-terminal $s'$, the online network outputs $Q(s,\\cdot;\\theta)=[2.0,\\,4.0]$, $Q(s',\\cdot;\\theta)=[6.0,\\,3.0]$, and the target network outputs $Q(s',\\cdot;\\theta^-)=[5.0,\\,8.0]$. Compute the regression target $y$ and the TD error $\\delta$ for (a) standard DQN and (b) Double DQN. Explain why they differ.",
              "hint": "Standard DQN takes the max of the target network's outputs. Double DQN uses the online network to pick the argmax action, then reads that action's value off the target network. Always compare against $Q(s,a;\\theta)$ for the action $a$ actually taken ($a=1$).",
              "solution": "The action taken is $a=1$, so the prediction is $Q(s,1;\\theta)=4.0$.\n\n(a) Standard DQN: $y = r + \\gamma \\max_{a'} Q(s',a';\\theta^-) = 1 + 0.9 \\times \\max(5.0, 8.0) = 1 + 0.9\\times 8.0 = 8.2$. TD error $\\delta = 8.2 - 4.0 = 4.2$.\n\n(b) Double DQN: first select the next action with the ONLINE net: $\\arg\\max_{a'} Q(s',a';\\theta) = \\arg\\max(6.0, 3.0) = a'=0$. Evaluate that action with the TARGET net: $Q(s',0;\\theta^-)=5.0$. So $y = 1 + 0.9 \\times 5.0 = 5.5$. TD error $\\delta = 5.5 - 4.0 = 1.5$.\n\nThey differ because standard DQN's max picks action 1 (value 8.0 under $\\theta^-$), while Double DQN is forced to evaluate the action the online net actually prefers (action 0, value 5.0 under $\\theta^-$). The online net and target net disagree about which next action is best, so decoupling selection from evaluation yields a lower, less inflated target — this is precisely the overestimation-bias reduction Double DQN provides."
            },
            {
              "prompt": "Explain, with reference to the 'deadly triad,' why removing experience replay (learning online from the correlated stream) AND removing the target network (bootstrapping from $\\theta$ itself) is far more likely to diverge than removing either one alone. What single property of supervised learning does each trick restore?",
              "hint": "Think about what assumptions ordinary SGD on a regression problem relies on: i.i.d. data and fixed targets. Map each trick to one assumption.",
              "solution": "The deadly triad is the combination of function approximation, bootstrapping, and off-policy learning; DQN uses all three, so it sits in the regime where divergence is possible. The two tricks each restore one assumption that supervised learning relies on but RL violates:\n\n- Experience replay restores (approximate) i.i.d. data. SGD's convergence guarantees assume samples are drawn independently from a fixed distribution; the raw RL trajectory is a highly correlated, non-stationary stream. Random sampling from a large buffer decorrelates minibatches and stabilizes the data distribution.\n- The target network restores fixed regression targets. Ordinary regression has labels that do not move; DQN's bootstrap target depends on the parameters being optimized. Freezing $\\theta^-$ makes the targets constant for $C$ steps, turning each interval into a well-posed supervised regression.\n\nRemoving only one trick leaves the other assumption intact, so SGD still has a fighting chance: with a target network but no replay you regress onto stable targets from correlated data; with replay but no target network you have decorrelated data but a moving target. Removing both simultaneously violates BOTH assumptions at once — you chase a moving target using correlated, non-stationary data, and the two pathologies reinforce each other (correlated updates push $\\theta$ hard in one direction, which immediately shifts the targets in that same direction, amplifying the move). This compounding feedback is why the doubly-stripped version is dramatically more prone to divergence than either single ablation, and why the original DQN paper found both tricks were jointly necessary for human-level Atari performance."
            }
          ],
          "examples": [
            {
              "title": "One DQN gradient step on a single transition",
              "body": "A 2-action DQN outputs $Q(s,\\cdot;\\theta)=[Q(s,a_0),Q(s,a_1)]=[2.0,\\,5.0]$ for the current state and $Q(s',\\cdot;\\theta^-)=[7.0,\\,3.0]$ for the next state from a frozen target network. We observe the transition $(s,a_1,r,s')$ with $r=1$, $\\gamma=0.9$, the state is non-terminal, and we use loss $\\ell(\\theta)=\\tfrac12\\big(y-Q(s,a_1;\\theta)\\big)^2$ with learning rate $\\alpha=0.1$. Compute the TD target, the TD error, and the new value of $Q(s,a_1)$ after one gradient step (treat $\\partial Q(s,a_1;\\theta)/\\partial Q(s,a_1)=1$).",
              "solution": "<strong>Step 1 — Form the TD target using the target network.</strong> The max in the bootstrap is taken over the <em>target</em> network outputs $Q(s',\\cdot;\\theta^-)=[7.0,3.0]$, so $\\max_{a'}Q(s',a';\\theta^-)=7.0$. Then\n$$y = r + \\gamma\\max_{a'}Q(s',a';\\theta^-) = 1 + 0.9\\cdot 7.0 = 1 + 6.3 = 7.3.$$\nNote we take the max over $s'$, not $s$, and we read it off $\\theta^-$, not $\\theta$.\n\n<strong>Step 2 — Read off the current prediction.</strong> The action actually taken was $a_1$, so the prediction is $Q(s,a_1;\\theta)=5.0$. Only this one output enters the loss; $Q(s,a_0)$ is untouched on this update.\n\n<strong>Step 3 — TD error.</strong>\n$$\\delta = y - Q(s,a_1;\\theta) = 7.3 - 5.0 = 2.3.$$\n\n<strong>Step 4 — Gradient of the loss.</strong> With $\\ell=\\tfrac12(y-Q)^2$ and $y$ held constant (it depends on $\\theta^-$, which we do not differentiate),\n$$\\frac{\\partial \\ell}{\\partial Q(s,a_1)} = -(y-Q(s,a_1;\\theta))\\cdot 1 = -\\delta = -2.3.$$\n\n<strong>Step 5 — Gradient-descent update.</strong>\n$$Q(s,a_1) \\leftarrow Q(s,a_1) - \\alpha\\frac{\\partial \\ell}{\\partial Q(s,a_1)} = 5.0 - 0.1\\cdot(-2.3) = 5.0 + 0.23 = 5.23.$$\n\n<strong>Answer.</strong> TD target $y=7.3$, TD error $\\delta=2.3$, and after one step $Q(s,a_1)\\approx 5.23$ (nudged up toward the target by $\\alpha\\delta=0.23$). This is identical in spirit to the tabular update $Q\\leftarrow Q+\\alpha[y-Q]$ — DQN just realizes $Q$ as a network and gets the gradient by backprop."
            },
            {
              "title": "Why a frozen target network stabilizes the bootstrap",
              "body": "Use the same prediction as above, $Q(s,a;\\theta)=5.0$ for the taken action, with target $y=7.3$ and $\\alpha=0.1$. Suppose state $s'$ is identical to $s$ (a self-loop), so the next-state max is computed on the <em>same</em> output we are training. Compare two updates: (A) <strong>naive</strong> DQN, where the target is recomputed from the live network $\\theta$ each step (no target network, so $\\max_{a'}Q(s',a';\\theta)$ tracks $Q(s,a)$ instantly), versus (B) <strong>DQN with a frozen target network</strong> $\\theta^-$ held fixed for several steps. Trace 3 updates of each and explain the qualitative difference. Take $r=1$, $\\gamma=0.9$, and assume the self-loop action is the argmax so $\\max_{a'}Q=Q(s,a)$.",
              "solution": "<strong>Setup.</strong> Because $s'=s$ and the taken action is the argmax, the bootstrap target is $y=r+\\gamma\\,Q(s,a)=1+0.9\\,Q$. The update is $Q\\leftarrow Q+\\alpha(y-Q)$.\n\n<strong>Case A — naive (target moves with every step).</strong> Here $y$ is recomputed from the <em>current</em> $Q$ before each update, so the prediction is chasing a target that depends on itself.\n<ul>\n<li>Step 1: $y=1+0.9\\cdot 5.0=5.5$; $Q\\leftarrow 5.0+0.1(5.5-5.0)=5.05$.</li>\n<li>Step 2: $y=1+0.9\\cdot 5.05=5.545$; $Q\\leftarrow 5.05+0.1(5.545-5.05)=5.0995$.</li>\n<li>Step 3: $y=1+0.9\\cdot 5.0995=5.58955$; $Q\\leftarrow 5.0995+0.1(0.49005)=5.14851$.</li>\n</ul>\nThe target $y$ <em>rises every time $Q$ rises</em>, so $Q$ keeps being pulled toward an ever-receding goal. The true fixed point is $Q^*=1+0.9Q^*\\Rightarrow Q^*=\\tfrac{1}{0.1}=10$, and the moving target makes convergence to it slow and, in deep nonlinear nets, prone to oscillation/divergence — the prediction and its own label are entangled.\n\n<strong>Case B — frozen target network ($\\theta^-$ fixed, computed once from $Q=5.0$).</strong> The label is locked: $y=1+0.9\\cdot 5.0=5.5$ for all three steps.\n<ul>\n<li>Step 1: $Q\\leftarrow 5.0+0.1(5.5-5.0)=5.05$.</li>\n<li>Step 2: $Q\\leftarrow 5.05+0.1(5.5-5.05)=5.095$.</li>\n<li>Step 3: $Q\\leftarrow 5.095+0.1(5.5-5.095)=5.1355$.</li>\n</ul>\nNow the problem is an ordinary supervised regression toward a <em>fixed</em> label $5.5$: $Q$ contracts monotonically toward $5.5$ with no feedback loop. After the target network is synced ($\\theta^-\\leftarrow\\theta$), a new fixed label $\\approx 1+0.9\\cdot 5.1355=5.622$ is set and the process repeats, walking $Q$ stably toward the true $Q^*=10$ in stable stages.\n\n<strong>Answer / takeaway.</strong> Both cases move $Q$ up, but the mechanism differs sharply. Naive DQN's target $y$ depends on the very weights being updated, creating a self-referential chase (here $y$ climbs $5.5\\to5.545\\to5.590$) that destabilizes nonlinear function approximation. The frozen target network decouples the label from the live weights, turning each phase into a stable supervised-regression problem toward a constant target ($5.5$) — exactly the engineering trick the 2015 DQN paper uses to keep deep Q-learning from diverging."
            }
          ]
        }
      ]
    },
    {
      "id": "rl-policy-gradient",
      "title": "Policy-Gradient and Actor-Critic Methods",
      "lessons": [
        {
          "id": "rl-policy-gradient-theorem",
          "title": "Policy Gradients and REINFORCE",
          "minutes": 18,
          "content": "<h3>From Value Functions to Policies: Why Parameterize the Policy Directly?</h3>\n\n<p>So far in this module's predecessors you have likely met value-based methods — Q-learning, SARSA, DQN — which learn an action-value function $Q(s,a)$ and then act greedily (or $\\epsilon$-greedily) with respect to it. The policy is implicit: it is whatever maximizes the learned values. <strong>Policy-gradient methods</strong> flip this around. We define a parameterized, differentiable policy $\\pi_\\theta(a \\mid s)$ — typically a neural network with weights $\\theta$ — and optimize $\\theta$ <em>directly</em> by gradient ascent on the expected return. The value function, if used at all, plays a supporting role.</p>\n\n<p>Why bother? Three reasons make direct policy parameterization not just convenient but sometimes necessary:</p>\n\n<ul>\n<li><strong>Continuous and high-dimensional action spaces.</strong> Greedy action selection requires solving $\\arg\\max_a Q(s,a)$ at every step. If $a \\in \\mathbb{R}^d$ (robot joint torques, portfolio weights, a steering angle), that inner maximization is itself a hard optimization problem at every timestep. A policy network simply <em>outputs</em> the action (or its distribution) in one forward pass — e.g. $\\pi_\\theta(\\cdot \\mid s) = \\mathcal{N}\\big(\\mu_\\theta(s), \\Sigma_\\theta(s)\\big)$.</li>\n<li><strong>Stochastic optimal policies.</strong> In partially observed or adversarial settings, the optimal policy can be genuinely random (think rock-paper-scissors, or a poker bluff). A deterministic greedy policy over $Q$ cannot represent \"play heads 50% of the time\"; a stochastic $\\pi_\\theta$ can.</li>\n<li><strong>Smoother optimization and better convergence properties.</strong> Small changes in $\\theta$ produce small changes in action probabilities. Value-based methods can oscillate because a tiny change in $Q$ can flip the $\\arg\\max$ discontinuously. Policy gradients move the policy smoothly, which often gives more stable convergence to a (local) optimum.</li>\n</ul>\n\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>Policy gradients are <em>the</em> bridge between reinforcement learning and the rest of deep learning. They turn \"find a good policy\" into \"do gradient ascent on an objective\" — the same machinery (autodiff, SGD, Adam) that trains image classifiers and language models. Indeed, RLHF for large language models is built on policy gradients: the LM <em>is</em> the policy $\\pi_\\theta$, a token is an action, and the reward comes from a learned preference model. Understanding REINFORCE is the conceptual root of PPO, GRPO, and the alignment pipelines you read about.</p>\n</div>\n\n<h3>The Objective</h3>\n\n<p>Let a trajectory be $\\tau = (s_0, a_0, s_1, a_1, \\dots, s_{T-1}, a_{T-1}, s_T)$. Its probability under policy $\\pi_\\theta$ in an environment with dynamics $p(s_{t+1}\\mid s_t,a_t)$ and start distribution $\\rho_0(s_0)$ is</p>\n\n$$p_\\theta(\\tau) = \\rho_0(s_0) \\prod_{t=0}^{T-1} \\pi_\\theta(a_t \\mid s_t)\\, p(s_{t+1}\\mid s_t, a_t).$$\n\n<p>Define the (undiscounted, for clarity) return of a trajectory as $R(\\tau) = \\sum_{t=0}^{T-1} r(s_t, a_t)$. Our objective is the <strong>expected return</strong>:</p>\n\n$$J(\\theta) = \\mathbb{E}_{\\tau \\sim p_\\theta}\\big[R(\\tau)\\big] = \\int p_\\theta(\\tau)\\, R(\\tau)\\, d\\tau.$$\n\n<p>We want $\\nabla_\\theta J(\\theta)$ so we can climb it: $\\theta \\leftarrow \\theta + \\alpha \\nabla_\\theta J(\\theta)$. The difficulty is immediate and worth naming precisely: <strong>the distribution we are taking the expectation over itself depends on $\\theta$.</strong> We cannot just push the gradient inside an expectation whose sampling distribution is fixed, because it is not fixed. This is the central technical obstacle, and the log-derivative trick is exactly how we get around it.</p>\n\n<h3>The Log-Derivative Trick</h3>\n\n<p>The trick is a one-line identity. For any differentiable, positive function $p_\\theta(\\tau)$,</p>\n\n$$\\nabla_\\theta p_\\theta(\\tau) = p_\\theta(\\tau)\\, \\frac{\\nabla_\\theta p_\\theta(\\tau)}{p_\\theta(\\tau)} = p_\\theta(\\tau)\\, \\nabla_\\theta \\log p_\\theta(\\tau).$$\n\n<p>The middle step is just multiplying and dividing by $p_\\theta(\\tau)$; the last step uses $\\nabla \\log p = \\nabla p / p$ (chain rule on the logarithm). Trivial algebra — but it is the hinge of the whole subject, because it converts a gradient of a density into a density times a gradient of a log-density, and densities-times-something are exactly what expectations are made of.</p>\n\n<p>Apply it to the objective. Differentiate under the integral sign:</p>\n\n$$\\nabla_\\theta J(\\theta) = \\int \\nabla_\\theta p_\\theta(\\tau)\\, R(\\tau)\\, d\\tau = \\int p_\\theta(\\tau)\\, \\nabla_\\theta \\log p_\\theta(\\tau)\\, R(\\tau)\\, d\\tau = \\mathbb{E}_{\\tau \\sim p_\\theta}\\Big[ \\nabla_\\theta \\log p_\\theta(\\tau)\\; R(\\tau) \\Big].$$\n\n<p>This is already remarkable: the gradient of the expected return is itself an expectation under the <em>same</em> sampling distribution $p_\\theta$. So we can estimate it by rolling out trajectories with our current policy and averaging — no need to differentiate through the environment.</p>\n\n<h4>The dynamics drop out</h4>\n\n<p>Now expand $\\log p_\\theta(\\tau)$ using the factorization above:</p>\n\n$$\\log p_\\theta(\\tau) = \\log \\rho_0(s_0) + \\sum_{t=0}^{T-1} \\log \\pi_\\theta(a_t\\mid s_t) + \\sum_{t=0}^{T-1} \\log p(s_{t+1}\\mid s_t,a_t).$$\n\n<p>Only the middle sum depends on $\\theta$. The start distribution $\\rho_0$ and the transition dynamics $p(s_{t+1}\\mid s_t,a_t)$ contain <em>no</em> $\\theta$, so their gradients vanish. Therefore</p>\n\n$$\\nabla_\\theta \\log p_\\theta(\\tau) = \\sum_{t=0}^{T-1} \\nabla_\\theta \\log \\pi_\\theta(a_t \\mid s_t).$$\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters</div>\n<p>This is the property that makes model-free RL possible. We never need to know or differentiate the environment's transition function $p(s'\\mid s,a)$ — the unknown, possibly nondifferentiable, possibly black-box dynamics drop out of the gradient entirely. All we need is to be able to <em>sample</em> from the environment and to differentiate our own policy's log-likelihood. That is why a policy network can be trained on a physics simulator, an Atari emulator, or a live trading API without a model of any of them.</p>\n</div>\n\n<h3>The Policy Gradient Theorem (REINFORCE Form)</h3>\n\n<p>Substituting back gives the foundational result. In its most basic (\"vanilla\") form:</p>\n\n$$\\boxed{\\;\\nabla_\\theta J(\\theta) = \\mathbb{E}_{\\tau \\sim p_\\theta}\\left[ \\left(\\sum_{t=0}^{T-1} \\nabla_\\theta \\log \\pi_\\theta(a_t\\mid s_t)\\right) R(\\tau) \\right].\\;}$$\n\n<p>The <strong>REINFORCE</strong> algorithm (Williams, 1992) is the Monte Carlo estimate of this: sample $N$ trajectories, compute the bracketed quantity for each, and average. The single-sample estimator is</p>\n\n$$\\hat{g} = \\left(\\sum_{t=0}^{T-1} \\nabla_\\theta \\log \\pi_\\theta(a_t\\mid s_t)\\right) R(\\tau).$$\n\n<h4>Reading the formula: weighted maximum likelihood</h4>\n\n<p>Look at $\\nabla_\\theta \\log \\pi_\\theta(a_t\\mid s_t)$ in isolation — this is exactly the gradient you would use to do <em>maximum-likelihood learning</em> of $a_t$ given $s_t$ (as in supervised classification with a softmax). Following it pushes $\\theta$ to make action $a_t$ more probable in state $s_t$. The policy gradient multiplies that direction by the return $R(\\tau)$:</p>\n\n<ul>\n<li>If a trajectory earned high return, $R(\\tau)$ is large and positive: we increase the probability of every action taken along it.</li>\n<li>If it earned low (or negative) return, we decrease those probabilities.</li>\n</ul>\n\n<p>So REINFORCE is \"imitate yourself, weighted by how well things turned out.\" It is trial-and-error made differentiable. This is also exactly why the score function $\\nabla_\\theta \\log \\pi_\\theta(a\\mid s)$ is sometimes called the <em>score</em>, and why these are also known as <strong>score-function estimators</strong> — they appear far beyond RL, in variational inference, in training discrete latent-variable models, and anywhere you need the gradient of an expectation over a distribution you control.</p>\n\n<h4>Causality: the reward-to-go refinement</h4>\n\n<p>The vanilla form weights $\\nabla_\\theta \\log \\pi_\\theta(a_t\\mid s_t)$ by the <em>full</em> return $R(\\tau)$, including rewards earned <em>before</em> time $t$. But an action at time $t$ cannot affect rewards in the past — those earlier rewards are pure noise as far as $a_t$ is concerned. Removing them keeps the estimator unbiased while reducing its variance. The improved form replaces $R(\\tau)$ with the <strong>reward-to-go</strong> $G_t = \\sum_{t'=t}^{T-1} r(s_{t'}, a_{t'})$:</p>\n\n$$\\nabla_\\theta J(\\theta) = \\mathbb{E}\\left[ \\sum_{t=0}^{T-1} \\nabla_\\theta \\log \\pi_\\theta(a_t\\mid s_t)\\; G_t \\right].$$\n\n<p>(With discounting, $G_t = \\sum_{t'=t}^{T-1} \\gamma^{t'-t} r_{t'}$.) This is the form most people mean by \"REINFORCE.\"</p>\n\n<h3>The Variance Problem</h3>\n\n<p>REINFORCE is unbiased — in expectation it points uphill — but it is notoriously <strong>high-variance</strong>. A single noisy estimate can point in nearly any direction, so learning is slow and erratic. Several sources conspire:</p>\n\n<ul>\n<li><strong>Monte Carlo returns are noisy.</strong> $G_t$ is the sum of many stochastic rewards along a stochastic trajectory; its variance grows with the horizon $T$.</li>\n<li><strong>The magnitude of $G_t$ matters, not just its sign.</strong> Consider an environment where every return happens to lie between $+1000$ and $+1002$. Every action gets pushed <em>up</em> (all returns positive), and the tiny differences that actually distinguish good from bad actions are swamped by a huge common offset. The estimator spends its variance budget on a constant that carries no useful gradient signal.</li>\n</ul>\n\n<p>That second observation is the key. Intuitively, what should matter is not \"was the return large?\" but \"was this action <em>better than typical</em> for this state?\" That is precisely what a baseline buys us.</p>\n\n<h3>Baselines and the Advantage</h3>\n\n<p>We subtract a <strong>baseline</strong> $b(s_t)$ — a function of state but crucially <em>not</em> of the action — from the reward-to-go:</p>\n\n$$\\nabla_\\theta J(\\theta) = \\mathbb{E}\\left[ \\sum_{t=0}^{T-1} \\nabla_\\theta \\log \\pi_\\theta(a_t\\mid s_t)\\,\\big(G_t - b(s_t)\\big) \\right].$$\n\n<p>The remarkable fact is that this leaves the gradient <strong>exactly unbiased</strong> for any choice of $b$ that does not depend on the action. (Proving this is your homework; the engine is that $\\mathbb{E}_{a\\sim\\pi}[\\nabla_\\theta \\log \\pi_\\theta(a\\mid s)] = 0$.) Meanwhile, a well-chosen baseline dramatically cuts variance by recentering the weights around zero, so that good actions get a positive push and bad actions a negative one, regardless of any constant offset in the rewards.</p>\n\n<h4>The natural choice: the value function</h4>\n\n<p>A near-optimal and standard baseline is the state-value function $V^\\pi(s_t) = \\mathbb{E}_{\\pi}[G_t \\mid s_t]$ — the expected return from $s_t$ under the current policy. (The strictly variance-minimizing baseline is a gradient-magnitude-weighted average of returns; $V^\\pi$ is the practical, near-optimal stand-in.) With $b(s_t) = V^\\pi(s_t)$, the weight becomes</p>\n\n$$G_t - V^\\pi(s_t) \\;\\approx\\; A^\\pi(s_t, a_t) = Q^\\pi(s_t,a_t) - V^\\pi(s_t),$$\n\n<p>the <strong>advantage function</strong>: how much better action $a_t$ is than the policy's average behavior in state $s_t$. The update now reads, in words, \"increase the log-probability of actions that beat the state's baseline, decrease it for actions that fall short.\" This is the conceptual seed of <strong>actor-critic</strong> methods, the subject of the next lesson: an <em>actor</em> $\\pi_\\theta$ provides $\\nabla_\\theta \\log \\pi_\\theta$, and a <em>critic</em> $V_\\phi \\approx V^\\pi$ supplies the learned baseline.</p>\n\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>A baseline is a \"grading curve.\" Telling a student \"you scored 1001 out of 1002\" is nearly useless feedback. Telling them \"you scored 7 points above the class average\" tells them exactly whether to do more or less of what they did. Subtracting $V^\\pi(s)$ converts absolute returns into relative performance — the advantage — which is the signal the policy actually needs.</p>\n</div>\n\n<h3>Worked Example: A One-Step Bandit</h3>\n\n<p>Let us make everything concrete in the simplest non-trivial case: a single state $s$, two actions $\\{a_1, a_2\\}$, and a softmax policy with one parameter $\\theta \\in \\mathbb{R}^2$, $\\theta = (\\theta_1,\\theta_2)$:</p>\n\n$$\\pi_\\theta(a_i) = \\frac{e^{\\theta_i}}{e^{\\theta_1}+e^{\\theta_2}}.$$\n\n<p>Rewards are deterministic: $r(a_1) = 1$, $r(a_2) = 0$. With one step, $G = r(a)$ and $J(\\theta) = \\pi_\\theta(a_1)\\cdot 1 + \\pi_\\theta(a_2)\\cdot 0 = \\pi_\\theta(a_1)$. We want to push $\\pi_\\theta(a_1)\\to 1$.</p>\n\n<p><strong>Step 1 — the score.</strong> For a softmax, the gradient of the log-probability of the chosen action $a_i$ with respect to component $\\theta_j$ is the familiar \"one-hot minus softmax\":</p>\n\n$$\\frac{\\partial}{\\partial \\theta_j} \\log \\pi_\\theta(a_i) = \\mathbb{1}[i=j] - \\pi_\\theta(a_j).$$\n\n<p>Suppose currently $\\theta = (0,0)$, so $\\pi_\\theta(a_1)=\\pi_\\theta(a_2)=0.5$.</p>\n\n<p><strong>Step 2 — no baseline.</strong> The estimator from a single sample is $\\hat g = \\nabla_\\theta \\log \\pi_\\theta(a)\\cdot r(a)$.</p>\n<ul>\n<li>If we sample $a_1$ (prob 0.5, $r=1$): $\\hat g = (1 - 0.5,\\; 0 - 0.5)\\cdot 1 = (0.5,\\,-0.5)$. Good: pushes $\\theta_1$ up.</li>\n<li>If we sample $a_2$ (prob 0.5, $r=0$): $\\hat g = (0-0.5,\\;1-0.5)\\cdot 0 = (0,0)$. The push is zero — useless. We learn <em>nothing</em> from the bad action because its reward is exactly zero.</li>\n</ul>\n<p>Taking the expectation: $\\mathbb{E}[\\hat g] = 0.5\\cdot(0.5,-0.5) + 0.5\\cdot(0,0) = (0.25,\\,-0.25)$. Correct direction, but every \"explore $a_2$\" sample is wasted.</p>\n\n<p><strong>Step 3 — with a baseline.</strong> Use $b = V^\\pi = \\mathbb{E}[r] = 0.5\\cdot 1 + 0.5\\cdot 0 = 0.5$. Now weight by $r(a)-b$:</p>\n<ul>\n<li>Sample $a_1$: weight $1-0.5 = +0.5$, so $\\hat g = (0.5,-0.5)\\cdot 0.5 = (0.25,\\,-0.25)$.</li>\n<li>Sample $a_2$: weight $0-0.5 = -0.5$, so $\\hat g = (-0.5, +0.5)\\cdot(-0.5) = (0.25,\\,-0.25)$.</li>\n</ul>\n<p>Now <em>both</em> samples push in the identical, correct direction $(0.25,-0.25)$ — sampling the bad action $a_2$ teaches us to do it <em>less</em>, which is just as informative as sampling the good one. The expectation is unchanged at $(0.25,-0.25)$ (unbiased!), but the <strong>variance across samples has collapsed to zero</strong>. This toy case shows in miniature exactly what baselines do in the wild: same expected gradient, far less noise.</p>\n\n<h4>Pseudocode for the full algorithm</h4>\n\n<pre><code>Initialize policy params theta, baseline/critic params phi\nrepeat:\n    # 1. Collect: roll out N trajectories with pi_theta\n    for each trajectory tau:\n        record (s_t, a_t, r_t) for all t\n    # 2. Compute reward-to-go (with discount gamma)\n    G_t = sum_{t'>=t} gamma^(t'-t) * r_{t'}     for each t\n    # 3. Compute advantage using baseline\n    A_t = G_t - V_phi(s_t)\n    # 4. Policy (actor) update — gradient ASCENT\n    theta += alpha_theta * mean_t[ grad_theta log pi_theta(a_t|s_t) * A_t ]\n    # 5. Baseline (critic) update — regress V_phi toward G_t\n    phi   -= alpha_phi   * grad_phi  mean_t[ (V_phi(s_t) - G_t)^2 ]\nuntil converged</code></pre>\n\n<p>In an autodiff framework you do not code the gradient by hand. You construct a <em>surrogate loss</em> $L(\\theta) = -\\frac{1}{N}\\sum_t \\log \\pi_\\theta(a_t\\mid s_t)\\,\\hat A_t$ with $\\hat A_t$ treated as a constant (detached / stop-gradient), and call <code>.backward()</code>. Differentiating this surrogate reproduces the policy gradient exactly — the negative sign converts ascent into the descent your optimizer expects.</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters</div>\n<p>REINFORCE has two well-known weaknesses that the rest of this module exists to fix. (1) It is <em>on-policy</em> and Monte Carlo: every gradient step needs fresh rollouts and a full episode, which is sample-inefficient. (2) Even with a baseline, the variance is large and the step size is delicate — too big a step changes the policy so much that the next batch of data is off-distribution. Actor-critic methods (next lesson) attack variance with a bootstrapped critic; trust-region and clipped methods (PPO/TRPO) attack the step-size fragility. But all of them are, at heart, the policy gradient theorem plus a baseline — the two ideas on this page.</p>\n</div>\n\n<div data-viz=\"rl-policy-gradient\"></div>\n\n<h3>Summary</h3>\n<ul>\n<li>Parameterize $\\pi_\\theta(a\\mid s)$ directly to handle continuous actions, represent stochastic optima, and optimize smoothly.</li>\n<li>The log-derivative trick $\\nabla_\\theta p_\\theta = p_\\theta \\nabla_\\theta \\log p_\\theta$ turns $\\nabla_\\theta J$ into an expectation we can sample, and the unknown environment dynamics cancel.</li>\n<li>The policy gradient theorem: $\\nabla_\\theta J = \\mathbb{E}[\\sum_t \\nabla_\\theta \\log \\pi_\\theta(a_t\\mid s_t)\\, G_t]$ — weighted log-likelihood, where the weight is the reward-to-go.</li>\n<li>REINFORCE is high-variance. Subtracting a state-only baseline $b(s)$ — ideally $V^\\pi(s)$, giving the advantage $A^\\pi(s,a)$ — cuts variance while remaining exactly unbiased.</li>\n</ul>\n<details class=\"deep-dive\">\n<summary>Deeper dive: training by trial — and why the baseline is just grading on a curve</summary>\n<p>The honest problem policy gradients solve: you want to follow $\\nabla_\\theta \\mathbb{E}[\\text{reward}]$, but the reward is produced by the <strong>environment</strong>, which you cannot differentiate through. The score-function (log-derivative) trick is the escape hatch — it rewrites that gradient as an <em>expectation you can sample</em>: run the policy, watch what happens, and nudge.</p>\n<p>The nudge is intuitive: <strong>raise the log-probability of the actions you took, in proportion to the reward they earned.</strong> Good-outcome actions get pushed up; bad-outcome actions get pushed down. It is training a dog with treats — reinforce what worked, without ever being told the <em>correct</em> action. No labels, just consequences.</p>\n<p>The catch is variance. If every reward is positive, <em>every</em> action gets reinforced (only by differing amounts), which is noisy. The <strong>baseline</strong> fixes this by grading on a curve: subtract the expected reward $b(s)\\approx V^\\pi(s)$ so you only reinforce actions that did <strong>better than average</strong> — the advantage $A^\\pi(s,a)$. Because the baseline does not depend on the action, it changes nothing in expectation (the estimate stays unbiased); it only quiets the noise.</p>\n</details>",
          "mcq": [
            {
              "q": "In the policy gradient $\\nabla_\\theta J(\\theta) = \\mathbb{E}_{\\tau\\sim p_\\theta}[\\nabla_\\theta \\log p_\\theta(\\tau)\\, R(\\tau)]$, why does the environment's transition model $p(s_{t+1}\\mid s_t,a_t)$ not appear in the final estimator?",
              "choices": [
                "Because $\\log p_\\theta(\\tau)$ splits into a sum, and the transition terms (like $\\rho_0$) contain no $\\theta$, so their gradients are zero",
                "Because the transitions are assumed to be deterministic in REINFORCE",
                "Because the transition probabilities are approximated by the value function",
                "Because the log-derivative trick cancels all probability terms, including the policy"
              ],
              "answer": 0,
              "explain": "Taking $\\nabla_\\theta$ of $\\log p_\\theta(\\tau)=\\log\\rho_0+\\sum\\log\\pi_\\theta+\\sum\\log p(s'\\mid s,a)$ kills every term independent of $\\theta$, leaving only $\\sum_t \\nabla_\\theta\\log\\pi_\\theta(a_t\\mid s_t)$ — this is exactly why the method is model-free."
            },
            {
              "q": "For a softmax policy $\\pi_\\theta(a_i)=e^{\\theta_i}/\\sum_k e^{\\theta_k}$, what is $\\frac{\\partial}{\\partial\\theta_j}\\log\\pi_\\theta(a_i)$ for the chosen action $a_i$?",
              "choices": [
                "$\\pi_\\theta(a_j) - \\mathbb{1}[i=j]$",
                "$\\mathbb{1}[i=j] - \\pi_\\theta(a_j)$",
                "$\\mathbb{1}[i=j]\\cdot \\pi_\\theta(a_j)$",
                "$\\log\\pi_\\theta(a_j)$"
              ],
              "answer": 1,
              "explain": "The softmax log-likelihood gradient is the standard 'one-hot minus softmax', $\\mathbb{1}[i=j]-\\pi_\\theta(a_j)$ — identical to the cross-entropy gradient in supervised classification, which is why REINFORCE looks like return-weighted maximum likelihood."
            },
            {
              "q": "Why is subtracting a baseline that depends on the action a BAD idea, whereas one depending only on the state is fine?",
              "choices": [
                "An action-dependent baseline makes the variance larger but keeps the estimator unbiased",
                "Both are equally valid; the distinction is only computational",
                "An action-dependent baseline introduces bias, because the proof of unbiasedness relies on $\\mathbb{E}_{a\\sim\\pi}[\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)]=0$, which requires $b$ to be constant in $a$",
                "A state-only baseline is biased, so action-dependence is preferred in practice"
              ],
              "answer": 2,
              "explain": "The cancellation $\\mathbb{E}_a[b(s)\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)] = b(s)\\,\\mathbb{E}_a[\\nabla_\\theta\\log\\pi_\\theta]=b(s)\\cdot 0=0$ only goes through when $b$ can be pulled out of the action-expectation; if $b$ depends on $a$ it cannot, and bias appears."
            },
            {
              "q": "Replacing the full return $R(\\tau)$ with the reward-to-go $G_t=\\sum_{t'\\ge t} r_{t'}$ in the REINFORCE estimator does what?",
              "choices": [
                "Introduces bias but greatly reduces variance",
                "Has no effect on either bias or variance",
                "Reduces bias but increases variance",
                "Keeps the estimator unbiased and reduces variance, by dropping past rewards that an action at time $t$ cannot influence"
              ],
              "answer": 3,
              "explain": "Rewards before time $t$ are independent of $a_t$ and contribute zero in expectation to its term, so removing them is unbiased; it removes a noisy additive component, lowering variance — a free improvement, analogous in spirit to using a baseline."
            },
            {
              "q": "A robotic arm is controlled by 7 continuous joint torques, each $a_i \\in \\mathbb{R}$. Why does a value-based method like DQN struggle here, while a policy network does not?",
              "choices": [
                "Selecting an action requires $\\arg\\max_a Q(s,a)$, which is itself a hard optimization over a 7-D continuous space at every step, whereas the policy outputs the action in one forward pass",
                "DQN cannot store a Q-table large enough for 7 dimensions, but a policy network compresses it",
                "Q-learning needs a reward function while policy gradients do not",
                "Policy networks are always faster to train than value networks"
              ],
              "answer": 0,
              "explain": "Greedy action selection requires solving the inner $\\arg\\max_a Q(s,a)$ at every timestep, which is intractable over continuous high-dimensional actions, whereas a policy network directly emits the action (or its distribution) in a single forward pass."
            },
            {
              "q": "In rock-paper-scissors against an adaptive opponent, the optimal play is uniformly random. Why can a deterministic greedy-over-$Q$ policy NOT achieve this, while a stochastic $\\pi_\\theta$ can?",
              "choices": [
                "Q-learning cannot handle adversarial rewards at all",
                "A greedy policy always picks a single action for a given state and cannot represent 'play each option one-third of the time'",
                "Stochastic policies have more parameters, so they memorize the opponent",
                "Greedy policies require continuous actions, which RPS lacks"
              ],
              "answer": 1,
              "explain": "Acting greedily with respect to $Q$ yields a deterministic action per state, so it cannot represent a genuinely random optimal policy, whereas a parameterized stochastic $\\pi_\\theta$ can output a probability distribution like uniform-random."
            },
            {
              "q": "The lesson argues policy gradients give 'smoother optimization' than value-based methods. What is the core mechanism behind this claimed stability advantage?",
              "choices": [
                "Policy gradients ignore the value function entirely, removing a source of error",
                "Gradient ascent is mathematically guaranteed to reach the global optimum",
                "Small changes in $\\theta$ produce small changes in action probabilities, whereas a tiny change in $Q$ can discontinuously flip the $\\arg\\max$ and abruptly change the policy",
                "Policy networks use Adam while value methods are stuck with plain SGD"
              ],
              "answer": 2,
              "explain": "Because the policy depends continuously on $\\theta$, small parameter updates shift action probabilities gradually, avoiding the discontinuous policy jumps that value-based methods suffer when a small $Q$ change flips the $\\arg\\max$."
            },
            {
              "q": "The lesson frames RLHF for large language models as an instance of policy gradients. In that mapping, what plays the role of the policy $\\pi_\\theta$, the action, and the reward respectively?",
              "choices": [
                "The reward model is the policy, a sentence is the action, and human labels are the reward",
                "The tokenizer is the policy, a word embedding is the action, and perplexity is the reward",
                "The optimizer is the policy, a gradient step is the action, and the loss is the reward",
                "The language model is the policy, a generated token is the action, and a learned preference (reward) model supplies the reward"
              ],
              "answer": 3,
              "explain": "In RLHF the language model itself is the policy $\\pi_\\theta$, each emitted token is an action, and the reward comes from a learned preference (reward) model, making REINFORCE the conceptual root of the alignment pipeline."
            },
            {
              "q": "In the autodiff implementation, the lesson builds the surrogate loss $L(\\theta) = -\\frac{1}{N}\\sum_t \\log \\pi_\\theta(a_t\\mid s_t)\\,\\hat A_t$ and calls <code>.backward()</code>. Why must $\\hat A_t$ be detached (stop-gradient) rather than left as a live function of $\\theta$?",
              "choices": [
                "The policy gradient theorem treats the weight (return/advantage) as a fixed scalar multiplier on the score; letting gradients flow through $\\hat A_t$ would add spurious terms not present in $\\mathbb{E}[\\sum_t \\nabla_\\theta\\log\\pi_\\theta\\,A_t]$",
                "Detaching $\\hat A_t$ is purely a memory optimization and has no effect on the computed gradient",
                "Detaching is required because $\\hat A_t$ is always negative and would otherwise flip the sign of the ascent direction",
                "Without detaching, the loss would be non-differentiable and <code>.backward()</code> would raise an error"
              ],
              "answer": 0,
              "explain": "The derived estimator only differentiates the $\\log\\pi_\\theta$ factor and uses $A_t$ as a constant weight; if autodiff also backpropagated through $\\hat A_t$ (which may depend on $\\theta$ via the sampled trajectory or critic) it would inject extra gradient terms that do not belong to $\\nabla_\\theta J$, biasing the update. It is not merely a memory trick, and the sign claim is irrelevant."
            },
            {
              "q": "For a continuous Gaussian policy $\\pi_\\theta(a\\mid s)=\\mathcal{N}\\big(\\mu_\\theta(s),\\sigma^2\\big)$ with fixed $\\sigma$, what is the score $\\nabla_{\\mu}\\log\\pi_\\theta(a\\mid s)$ used to weight the return in REINFORCE?",
              "choices": [
                "$\\dfrac{(a-\\mu_\\theta(s))^2}{2\\sigma^2}$",
                "$\\dfrac{a-\\mu_\\theta(s)}{\\sigma^2}$",
                "$\\dfrac{\\mu_\\theta(s)-a}{\\sigma}$",
                "$-\\dfrac{1}{\\sigma^2}$"
              ],
              "answer": 1,
              "explain": "From $\\log\\pi_\\theta = -\\frac{(a-\\mu)^2}{2\\sigma^2}+\\text{const}$, differentiating w.r.t. $\\mu$ gives $(a-\\mu_\\theta(s))/\\sigma^2$. Weighted by a positive return, this nudges $\\mu$ toward the sampled action $a$ — the continuous analogue of 'make the chosen action more likely'; the squared and constant forms are the log-density itself or the $\\sigma$-gradient, not the $\\mu$-score."
            },
            {
              "q": "A student claims: 'Subtracting the value-function baseline $V^\\pi(s)$ works because it makes REINFORCE's gradient point in a better direction than the unbiased estimator does.' What is the precise correction?",
              "choices": [
                "Correct — the baseline tilts the expected gradient toward higher-advantage actions",
                "The baseline changes both the expected gradient and the variance, trading a little bias for much less variance",
                "The baseline leaves the EXPECTED gradient exactly unchanged (still unbiased); it only reduces the VARIANCE of the single-sample estimate around that same expectation",
                "The baseline reduces variance but introduces bias proportional to $V^\\pi(s)$, which must be corrected separately"
              ],
              "answer": 2,
              "explain": "Because $\\mathbb{E}_{a\\sim\\pi}[\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)]=0$, any state-only $b(s)$ subtracts a mean-zero term, so $\\mathbb{E}[\\hat g]$ is identical to the no-baseline case — the bandit example confirms both give $(0.25,-0.25)$. The benefit is purely variance reduction, with no bias and no change of direction in expectation."
            },
            {
              "q": "The lesson notes the score function $\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)$ also appears 'in variational inference and in training discrete latent-variable models.' What general problem does this estimator solve in all those settings?",
              "choices": [
                "It computes $\\arg\\max$ over a discrete action set without enumerating all actions",
                "It differentiates through the environment's transition dynamics to enable model-based planning",
                "It converts a stochastic policy into an equivalent deterministic one for faster inference",
                "It estimates the gradient of an expectation $\\mathbb{E}_{x\\sim p_\\theta}[f(x)]$ with respect to the parameters $\\theta$ of the very distribution being sampled from"
              ],
              "answer": 3,
              "explain": "The log-derivative / score-function trick gives an unbiased estimate of $\\nabla_\\theta\\mathbb{E}_{x\\sim p_\\theta}[f(x)]$ even when $f$ is non-differentiable or the sampling distribution depends on $\\theta$ — exactly the obstacle named in the lesson ('the distribution we take the expectation over depends on $\\theta$'). It does not perform $\\arg\\max$, touch dynamics, or determinize the policy."
            },
            {
              "q": "What defines <em>policy-gradient</em> methods (vs value-based methods)?",
              "choices": [
                "They directly parameterize a differentiable policy $\\pi_\\theta(a\\mid s)$ and optimize $\\theta$ by gradient ascent on expected return — rather than learning $Q$ and acting greedily",
                "They learn a transition model of the environment and plan with it",
                "They store one value per state in a lookup table",
                "They only work for small discrete action spaces"
              ],
              "answer": 0,
              "explain": "Value-based methods (Q-learning, DQN) learn $Q(s,a)$ and act greedily — the policy is implicit. Policy-gradient methods make the policy an explicit differentiable function $\\pi_\\theta$ and climb $\\nabla_\\theta J(\\theta)$, which is what makes continuous actions and genuinely stochastic optimal policies natural."
            },
            {
              "q": "What objective $J(\\theta)$ do policy-gradient methods maximize?",
              "choices": [
                "The squared TD error of a value function",
                "The entropy of the policy",
                "The expected return $J(\\theta)=\\mathbb{E}_{\\tau\\sim\\pi_\\theta}[R(\\tau)]$ — the average total reward of trajectories the policy generates",
                "The KL divergence between successive policies"
              ],
              "answer": 2,
              "explain": "The goal is simply to make the policy earn more reward on average: $J(\\theta)=\\mathbb{E}_{\\tau\\sim p_\\theta}[R(\\tau)]$. The catch is that the sampling distribution $p_\\theta(\\tau)$ itself depends on $\\theta$ — which the log-derivative (score-function) trick resolves."
            },
            {
              "q": "What is the core REINFORCE gradient estimator?",
              "choices": [
                "It sets the value of every state equal to its immediate reward",
                "$\\nabla_\\theta J=\\mathbb{E}\\big[\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)\\,R\\big]$ — scale each action's log-probability gradient by the return, pushing up the probability of actions that led to high reward",
                "It maximizes $Q(s,a)$ by dynamic programming over a known model",
                "It clips the policy ratio to a trust region"
              ],
              "answer": 1,
              "explain": "Via the log-derivative trick, $\\nabla_\\theta J=\\mathbb{E}_{\\tau}[\\nabla_\\theta\\log\\pi_\\theta(\\tau)\\,R(\\tau)]$. Intuitively: take the gradient that raises the log-probability of the actions you took, and weight it by how much reward followed — good trajectories get reinforced. Crucially the environment's dynamics drop out."
            },
            {
              "q": "Why subtract a <em>baseline</em> $b(s)$ from the return in the policy gradient?",
              "choices": [
                "To bias the gradient toward more exploration",
                "To increase the learning rate automatically",
                "To force the policy to become deterministic",
                "To reduce the variance of the gradient estimate without adding bias — subtracting a state-only baseline (e.g. $V(s)$) leaves the gradient's expectation unchanged"
              ],
              "answer": 3,
              "explain": "Because $\\mathbb{E}_{a\\sim\\pi}[\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)\\,b(s)]=0$ for any function of the state alone, the baseline doesn't change the expected gradient — but choosing $b(s)=V(s)$ makes the weight \"how much better than average,\" which can sharply cut variance and speed learning."
            }
          ],
          "flashcards": [
            {
              "front": "State the log-derivative (score-function) trick.",
              "back": "$\\nabla_\\theta p_\\theta(\\tau) = p_\\theta(\\tau)\\,\\nabla_\\theta \\log p_\\theta(\\tau)$. It converts the gradient of a density into (density) x (gradient of log-density), letting $\\nabla_\\theta J$ be written as an expectation that can be Monte-Carlo sampled."
            },
            {
              "front": "Write the policy gradient theorem in REINFORCE (reward-to-go) form.",
              "back": "$\\nabla_\\theta J(\\theta) = \\mathbb{E}_{\\tau\\sim p_\\theta}\\big[\\sum_{t=0}^{T-1} \\nabla_\\theta \\log \\pi_\\theta(a_t\\mid s_t)\\, G_t\\big]$, where $G_t=\\sum_{t'\\ge t}\\gamma^{t'-t} r_{t'}$ is the reward-to-go."
            },
            {
              "front": "Why does the unknown environment dynamics model drop out of the policy gradient?",
              "back": "Because $\\log p_\\theta(\\tau)=\\log\\rho_0+\\sum\\log\\pi_\\theta(a_t\\mid s_t)+\\sum\\log p(s_{t+1}\\mid s_t,a_t)$, and only the $\\pi_\\theta$ terms depend on $\\theta$. The $\\theta$-gradient leaves only $\\sum_t\\nabla_\\theta\\log\\pi_\\theta(a_t\\mid s_t)$ — making RL model-free."
            },
            {
              "front": "What is the advantage function, and how does it relate to the baseline?",
              "back": "$A^\\pi(s,a)=Q^\\pi(s,a)-V^\\pi(s)$: how much better action $a$ is than the policy's average in state $s$. Using baseline $b(s)=V^\\pi(s)$ makes the REINFORCE weight $G_t-V^\\pi(s_t)\\approx A^\\pi(s_t,a_t)$ — the seed of actor-critic."
            },
            {
              "front": "Why does a state-only baseline keep the policy gradient unbiased?",
              "back": "Because $\\mathbb{E}_{a\\sim\\pi}[\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)]=\\sum_a\\nabla_\\theta\\pi_\\theta(a\\mid s)=\\nabla_\\theta\\sum_a\\pi_\\theta(a\\mid s)=\\nabla_\\theta 1=0$. Subtracting $b(s)$ adds the term $b(s)\\,\\mathbb{E}_a[\\nabla_\\theta\\log\\pi_\\theta]=0$, so the expected gradient is unchanged."
            },
            {
              "front": "Intuitively, what does the REINFORCE update do, and what is its main weakness?",
              "back": "It increases the log-probability of actions in proportion to the return they led to ('return-weighted maximum likelihood' / imitate-yourself-weighted-by-outcome). Main weakness: very high variance (and being on-policy/Monte-Carlo), which baselines and actor-critic methods reduce."
            }
          ],
          "homework": [
            {
              "prompt": "Prove that subtracting any state-dependent baseline $b(s_t)$ (a function of the state only, not the action) leaves the policy gradient unbiased. That is, show $\\mathbb{E}_{\\tau\\sim p_\\theta}\\big[\\sum_t \\nabla_\\theta\\log\\pi_\\theta(a_t\\mid s_t)\\, b(s_t)\\big] = 0$, so it can be subtracted from $G_t$ without changing $\\nabla_\\theta J$.",
              "hint": "Focus on a single timestep $t$ and condition on the state $s_t$. The action $a_t$ is drawn from $\\pi_\\theta(\\cdot\\mid s_t)$. Pull $b(s_t)$ outside the expectation over $a_t$, then use the log-derivative trick in reverse: $\\pi_\\theta\\nabla_\\theta\\log\\pi_\\theta = \\nabla_\\theta\\pi_\\theta$, and remember that probabilities sum (integrate) to 1.",
              "solution": "Work term by term. For a fixed $t$, use the tower rule (law of total expectation), conditioning on the state $s_t$ visited at time $t$:\n\n$$\\mathbb{E}_{\\tau}\\big[\\nabla_\\theta\\log\\pi_\\theta(a_t\\mid s_t)\\,b(s_t)\\big] = \\mathbb{E}_{s_t}\\Big[\\,\\mathbb{E}_{a_t\\sim\\pi_\\theta(\\cdot\\mid s_t)}\\big[\\nabla_\\theta\\log\\pi_\\theta(a_t\\mid s_t)\\,b(s_t)\\big]\\,\\Big].$$\n\nInside the inner expectation, $b(s_t)$ does not depend on $a_t$, so factor it out:\n\n$$\\mathbb{E}_{a_t\\sim\\pi_\\theta}\\big[\\nabla_\\theta\\log\\pi_\\theta(a_t\\mid s_t)\\big]\\, b(s_t).$$\n\nNow evaluate the inner expectation (write the discrete-action sum; the integral case is identical):\n\n$$\\mathbb{E}_{a\\sim\\pi_\\theta}[\\nabla_\\theta\\log\\pi_\\theta(a\\mid s_t)] = \\sum_a \\pi_\\theta(a\\mid s_t)\\,\\nabla_\\theta\\log\\pi_\\theta(a\\mid s_t).$$\n\nApply the log-derivative trick in reverse, $\\pi_\\theta\\nabla_\\theta\\log\\pi_\\theta = \\nabla_\\theta\\pi_\\theta$:\n\n$$= \\sum_a \\nabla_\\theta\\pi_\\theta(a\\mid s_t) = \\nabla_\\theta\\sum_a \\pi_\\theta(a\\mid s_t) = \\nabla_\\theta(1) = 0,$$\n\nsince the policy is a valid probability distribution that sums to 1 for every state, and the gradient of a constant is zero. Therefore the inner expectation is the zero vector, the whole term is $\\mathbb{E}_{s_t}[0\\cdot b(s_t)] = 0$, and summing over $t$ gives 0. Hence $\\mathbb{E}[\\sum_t\\nabla_\\theta\\log\\pi_\\theta(a_t\\mid s_t)(G_t-b(s_t))] = \\mathbb{E}[\\sum_t\\nabla_\\theta\\log\\pi_\\theta\\,G_t] - 0 = \\nabla_\\theta J(\\theta)$: the baseline changes the variance but not the expectation. The crucial step is factoring $b(s_t)$ out of the action-expectation, which is only legal because $b$ does not depend on $a_t$ — this is exactly why an action-dependent baseline would introduce bias."
            },
            {
              "prompt": "Consider a Gaussian policy for a 1-D continuous action, $\\pi_\\theta(a\\mid s)=\\mathcal{N}(a;\\,\\mu_\\theta(s),\\,\\sigma^2)$ with fixed $\\sigma$. Derive the score $\\nabla_{\\mu}\\log\\pi_\\theta(a\\mid s)$ with respect to the mean $\\mu=\\mu_\\theta(s)$, and interpret what the REINFORCE update does to $\\mu$ for an action with positive advantage.",
              "hint": "Write out $\\log$ of the Gaussian density: $\\log\\pi = -\\tfrac{1}{2}\\log(2\\pi\\sigma^2) - \\tfrac{(a-\\mu)^2}{2\\sigma^2}$. Only the last term depends on $\\mu$. Differentiate it.",
              "solution": "The Gaussian log-density is\n\n$$\\log\\pi_\\theta(a\\mid s) = -\\tfrac{1}{2}\\log(2\\pi\\sigma^2) - \\frac{(a-\\mu)^2}{2\\sigma^2}.$$\n\nDifferentiate with respect to $\\mu$ (the first term is constant in $\\mu$):\n\n$$\\nabla_\\mu \\log\\pi_\\theta(a\\mid s) = -\\frac{1}{2\\sigma^2}\\cdot 2(a-\\mu)\\cdot(-1) = \\frac{a-\\mu}{\\sigma^2}.$$\n\nThe REINFORCE update to the mean is then proportional to $\\frac{a-\\mu}{\\sigma^2}\\,\\hat A$, where $\\hat A$ is the (advantage-adjusted) weight. Interpretation: $a-\\mu$ is the direction from the current mean toward the action that was actually sampled. If that action had positive advantage ($\\hat A>0$), the update moves $\\mu$ toward $a$ — i.e. the policy mean shifts in the direction of actions that performed better than the baseline. If $\\hat A<0$, $\\mu$ moves away from $a$. The $1/\\sigma^2$ factor means a more concentrated policy (small $\\sigma$) reacts more strongly to a given displacement $a-\\mu$. By the chain rule, the actual parameter update is $\\nabla_\\theta\\log\\pi = \\frac{a-\\mu_\\theta(s)}{\\sigma^2}\\nabla_\\theta\\mu_\\theta(s)$, backpropagated through the network producing the mean."
            },
            {
              "prompt": "An agent runs in an environment where every episode's return lies in $[1000, 1002]$. Explain quantitatively why vanilla REINFORCE (no baseline) learns extremely slowly here, and show that the constant baseline $b=1001$ recovers a well-conditioned gradient. Use the structure of the estimator to justify your answer.",
              "hint": "Split the return into a constant part plus a small fluctuation: $G = 1001 + \\delta$ where $\\delta\\in[-1,1]$. What happens to the term $\\nabla_\\theta\\log\\pi_\\theta\\cdot 1001$ in expectation versus in a single sample?",
              "solution": "Write each sampled return as $G = 1001 + \\delta$ with $\\delta\\in[-1,1]$ carrying the only useful information (which actions are actually better). The single-sample estimator is\n\n$$\\hat g = \\nabla_\\theta\\log\\pi_\\theta(a\\mid s)\\,(1001 + \\delta) = \\underbrace{1001\\,\\nabla_\\theta\\log\\pi_\\theta}_{\\text{huge, uninformative}} + \\underbrace{\\delta\\,\\nabla_\\theta\\log\\pi_\\theta}_{\\text{small, informative}}.$$\n\nIn expectation the first term vanishes, because $\\mathbb{E}_a[\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)]=0$ (the same identity as the baseline proof) — so $b=1001$ would be subtractable for free. But in any *finite* sample it does NOT vanish: it is a vector of magnitude $\\approx 1001\\times\\lVert\\nabla_\\theta\\log\\pi_\\theta\\rVert$ pointing in an essentially random direction (depending only on which action was sampled), completely swamping the informative term whose magnitude is only $\\approx 1\\times\\lVert\\nabla_\\theta\\log\\pi_\\theta\\rVert$. The signal-to-noise ratio is on the order of $1/1001$. To average down the huge noise term you would need on the order of $1001^2\\approx 10^6$ times more samples than with a centered signal — hence painfully slow learning.\n\nSubtracting $b=1001$ replaces the weight $G$ with $G-1001=\\delta\\in[-1,1]$. Now the estimator is $\\hat g=\\delta\\,\\nabla_\\theta\\log\\pi_\\theta$, with no large common-mode offset; its scale matches the informative signal, and the variance is reduced by roughly the factor $(1001/1)^2$. The expected gradient is unchanged (baseline is unbiased), but it is now well-conditioned: positive-$\\delta$ actions get pushed up, negative-$\\delta$ actions pushed down, exactly as desired. This is the quantitative version of the 'grading curve' intuition, and it is why in practice one uses $b(s)=V^\\pi(s)$ to recenter returns into advantages."
            }
          ],
          "examples": [
            {
              "title": "A single REINFORCE update on a 2-armed bandit",
              "body": "Consider a one-step \"contextual bandit\" with a single state and two actions $\\{a_0, a_1\\}$. The policy is a softmax over a scalar logit vector $\\theta = (\\theta_0, \\theta_1) = (0, 0)$, so $\\pi_\\theta(a_i) = \\frac{e^{\\theta_i}}{e^{\\theta_0}+e^{\\theta_1}}$. You sample action $a_1$, receive return $G = +2$, and use learning rate $\\alpha = 0.1$. Perform one REINFORCE gradient-ascent step and report the new $\\theta$ and the new probability of $a_1$.",
              "solution": "REINFORCE updates parameters by ascending the score-function estimator:\n$$\\theta \\leftarrow \\theta + \\alpha\\, G\\, \\nabla_\\theta \\log \\pi_\\theta(a_t).$$\n\n<strong>Step 1 — Current policy.</strong> With $\\theta = (0,0)$, both logits are equal, so\n$$\\pi_\\theta(a_0) = \\pi_\\theta(a_1) = \\frac{e^0}{e^0+e^0} = \\frac{1}{2}.$$\n\n<strong>Step 2 — Score function for softmax.</strong> For a softmax policy, the gradient of the log-probability of the chosen action $a_j$ with respect to logit $\\theta_i$ is the standard identity\n$$\\frac{\\partial \\log \\pi_\\theta(a_j)}{\\partial \\theta_i} = \\mathbb{1}[i=j] - \\pi_\\theta(a_i).$$\nWith $j = 1$ (we sampled $a_1$):\n$$\\frac{\\partial \\log \\pi_\\theta(a_1)}{\\partial \\theta_0} = 0 - \\tfrac{1}{2} = -\\tfrac{1}{2}, \\qquad \\frac{\\partial \\log \\pi_\\theta(a_1)}{\\partial \\theta_1} = 1 - \\tfrac{1}{2} = +\\tfrac{1}{2}.$$\nSo $\\nabla_\\theta \\log \\pi_\\theta(a_1) = (-\\tfrac{1}{2}, +\\tfrac{1}{2})$.\n\n<strong>Step 3 — Apply the update.</strong> With $\\alpha = 0.1$ and $G = +2$, the scale factor is $\\alpha G = 0.2$:\n$$\\theta_0 \\leftarrow 0 + 0.2 \\cdot (-\\tfrac{1}{2}) = -0.1,\\qquad \\theta_1 \\leftarrow 0 + 0.2 \\cdot (+\\tfrac{1}{2}) = +0.1.$$\nNew parameters: $\\theta = (-0.1,\\, +0.1)$.\n\n<strong>Step 4 — New probability of $a_1$.</strong>\n$$\\pi_\\theta(a_1) = \\frac{e^{0.1}}{e^{-0.1}+e^{0.1}} = \\frac{1.1052}{0.9048 + 1.1052} = \\frac{1.1052}{2.0100} \\approx 0.5498.$$\n\n<strong>Answer.</strong> After one REINFORCE step, $\\theta = (-0.1, +0.1)$ and $\\pi_\\theta(a_1) \\approx 0.550$, up from $0.5$. The positive return pushed probability mass toward the action that was actually taken, exactly as policy-gradient ascent intends."
            },
            {
              "title": "Full-trajectory REINFORCE with discounted returns and a baseline",
              "body": "An agent runs one episode of length $3$ in an environment with discount $\\gamma = 0.9$, collecting rewards $r_1 = 1,\\ r_2 = 0,\\ r_3 = 2$. Suppose at every timestep the score function for the taken action is $\\nabla_\\theta \\log \\pi_\\theta(a_t\\mid s_t) = g_t$ with the concrete values $g_1 = +1,\\ g_2 = -1,\\ g_3 = +2$. Compute (a) the discounted return-to-go $G_t$ at each step, (b) the plain REINFORCE gradient estimate $\\sum_t G_t\\, g_t$, and (c) the same estimate after subtracting the mean-return baseline $b = \\frac{1}{3}\\sum_t G_t$. Comment on what the baseline does.",
              "solution": "REINFORCE for a full trajectory uses the <em>return-to-go</em> at each step, $G_t = \\sum_{k=t}^{T} \\gamma^{\\,k-t} r_k$, giving the gradient estimate $\\sum_t G_t\\, \\nabla_\\theta \\log \\pi_\\theta(a_t\\mid s_t)$. A baseline $b$ that does not depend on the action can be subtracted without introducing bias, reducing variance.\n\n<strong>Step 1 — Return-to-go at each step (work backwards).</strong>\n$$G_3 = r_3 = 2.$$\n$$G_2 = r_2 + \\gamma G_3 = 0 + 0.9 \\cdot 2 = 1.8.$$\n$$G_1 = r_1 + \\gamma G_2 = 1 + 0.9 \\cdot 1.8 = 1 + 1.62 = 2.62.$$\nSo $(G_1, G_2, G_3) = (2.62,\\ 1.8,\\ 2)$.\n\n<strong>Step 2 — Plain REINFORCE gradient estimate.</strong> Multiply each return-to-go by its score and sum:\n$$\\sum_t G_t\\, g_t = (2.62)(1) + (1.8)(-1) + (2)(2) = 2.62 - 1.8 + 4 = 4.82.$$\n\n<strong>Step 3 — Compute the baseline.</strong> The mean return-to-go is\n$$b = \\frac{1}{3}(2.62 + 1.8 + 2) = \\frac{6.42}{3} = 2.14.$$\n\n<strong>Step 4 — Baselined (advantage) estimate.</strong> Replace $G_t$ by $A_t = G_t - b$:\n$$A_1 = 2.62 - 2.14 = 0.48,\\quad A_2 = 1.8 - 2.14 = -0.34,\\quad A_3 = 2 - 2.14 = -0.14.$$\nThen\n$$\\sum_t (G_t - b)\\, g_t = (0.48)(1) + (-0.34)(-1) + (-0.14)(2) = 0.48 + 0.34 - 0.28 = 0.54.$$\n\n<strong>Step 5 — Interpretation.</strong> The plain estimate is $4.82$; the baselined estimate is $0.54$. Because all returns-to-go here are positive, the plain estimator pushes <em>up</em> the probability of every taken action, distinguishing them only by magnitude. Subtracting $b = 2.14$ recenters the signal: only step $1$ (above-average return) now gets a positive push, while the below-average steps $2$ and $3$ get pushed down. The expected gradient is unchanged (the baseline is action-independent, so $\\mathbb{E}[b\\,\\nabla_\\theta \\log \\pi_\\theta] = b\\,\\nabla_\\theta \\sum_a \\pi_\\theta = b\\,\\nabla_\\theta 1 = 0$), but the per-sample magnitudes shrink, which is the variance-reduction benefit of a baseline.\n\n<strong>Answer.</strong> (a) $(G_1,G_2,G_3) = (2.62, 1.8, 2)$; (b) plain estimate $= 4.82$; (c) with baseline $b = 2.14$, estimate $= 0.54$. The baseline leaves the gradient unbiased while sharply cutting its magnitude and re-centering credit around the average return."
            }
          ]
        },
        {
          "id": "rl-actor-critic",
          "title": "Actor-Critic Methods",
          "minutes": 16,
          "content": "<h3>From Pure Policy Gradients to Actor-Critic</h3>\n\n<p>In the previous lesson you derived the policy-gradient theorem and met REINFORCE, the simplest algorithm that follows it. Recall the core update. For a parameterized policy $\\pi_\\theta(a\\mid s)$ we ascend the gradient of expected return $J(\\theta)$:</p>\n\n$$\\nabla_\\theta J(\\theta) = \\mathbb{E}_{\\tau \\sim \\pi_\\theta}\\!\\left[\\sum_{t=0}^{T} \\nabla_\\theta \\log \\pi_\\theta(a_t\\mid s_t)\\, \\Psi_t\\right].$$\n\n<p>The quantity $\\Psi_t$ is the <em>credit signal</em>: it tells each action how good it was, and the gradient nudges the policy to make good actions more likely. REINFORCE sets $\\Psi_t = G_t$, the Monte-Carlo return from time $t$ onward. That estimator is <strong>unbiased</strong> but suffers <strong>enormous variance</strong>: $G_t$ is a sum of many random rewards across an entire trajectory, so a single lucky or unlucky tail can swamp the actual influence of action $a_t$. High variance means slow, noisy learning and a desperate need for many trajectories per update.</p>\n\n<p>The whole subject of this lesson is one idea: <strong>replace the noisy Monte-Carlo signal with a learned estimate produced by a second model</strong>. We keep the policy — now called the <strong>actor</strong> — and add a <strong>critic</strong>, a learned value function that scores states (and the actor's choices) so the actor no longer has to wait for the full return.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>The actor acts; the critic criticizes. The actor proposes actions and gets better at proposing the ones the critic praises. The critic watches the actor and gets better at predicting how much reward will follow. Two networks bootstrapping each other — the same coupled-improvement dance you see in GANs (generator/discriminator) and in many self-play setups.</p></div>\n\n<h3>What Goes in $\\Psi_t$? A Menu of Credit Signals</h3>\n\n<p>A beautiful fact underlies everything here. The policy gradient is unchanged if we subtract any function of the state alone (a <strong>baseline</strong> $b(s)$) from the credit signal, because $\\mathbb{E}_{a\\sim\\pi}[\\nabla_\\theta \\log \\pi_\\theta(a\\mid s)\\, b(s)] = b(s)\\,\\nabla_\\theta \\sum_a \\pi_\\theta(a\\mid s) = b(s)\\,\\nabla_\\theta 1 = 0$. The baseline does not bias the gradient, but it can dramatically cut its variance. The natural baseline is the state-value function $V^\\pi(s)$ — the average return from $s$ — so that $\\Psi_t$ measures how much <em>better than average</em> an action was.</p>\n\n<p>Here are the standard choices for $\\Psi_t$, in roughly increasing sophistication:</p>\n\n<ul>\n<li>$G_t$ — full Monte-Carlo return. Unbiased, highest variance (REINFORCE).</li>\n<li>$G_t - b(s_t)$ — return minus a baseline. Still unbiased, lower variance.</li>\n<li>$Q^\\pi(s_t,a_t)$ — action-value. Lower variance, but needs to be estimated.</li>\n<li>$A^\\pi(s_t,a_t) = Q^\\pi(s_t,a_t) - V^\\pi(s_t)$ — the <strong>advantage</strong>. The variance-optimal choice in this family.</li>\n<li>$r_t + \\gamma V^\\pi(s_{t+1}) - V^\\pi(s_t)$ — the <strong>TD error</strong>, a one-step bootstrapped advantage estimate.</li>\n</ul>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Key fact</div><p>The <strong>advantage</strong> $A^\\pi(s,a) = Q^\\pi(s,a) - V^\\pi(s)$ is the centerpiece of actor-critic methods. It answers exactly the question the policy gradient cares about: \"compared to my current policy's average behavior in this state, was taking $a$ a good idea?\" Positive advantage pushes the action up; negative pushes it down. Using $A^\\pi$ as $\\Psi_t$ gives an unbiased gradient with near-minimal variance.</p></div>\n\n<h4>The TD error is an unbiased estimate of the advantage</h4>\n\n<p>We cannot compute $A^\\pi$ directly because we do not know $Q^\\pi$ or $V^\\pi$. But notice that the one-step <strong>temporal-difference (TD) error</strong></p>\n\n$$\\delta_t = r_t + \\gamma V^\\pi(s_{t+1}) - V^\\pi(s_t)$$\n\n<p>satisfies, in expectation over the environment dynamics and the policy,</p>\n\n$$\\mathbb{E}\\big[\\,r_t + \\gamma V^\\pi(s_{t+1})\\;\\big|\\;s_t,a_t\\big] = Q^\\pi(s_t,a_t),$$\n\n<p>so $\\mathbb{E}[\\delta_t \\mid s_t, a_t] = Q^\\pi(s_t,a_t) - V^\\pi(s_t) = A^\\pi(s_t,a_t)$. The TD error, using only the true $V^\\pi$, is an unbiased estimate of the advantage that requires <em>only a learned state-value function</em> — we never need to learn $Q$ separately. This is the practical magic that makes actor-critic cheap: the critic only has to learn $V$.</p>\n\n<h3>The Critic: Learning $V$</h3>\n\n<p>The critic is a function approximator $V_\\phi(s)$ (typically a neural net sharing a torso with the actor) trained to predict $V^\\pi$. We fit it by regression toward a target. With a one-step <strong>bootstrap target</strong> $y_t = r_t + \\gamma V_\\phi(s_{t+1})$, the critic minimizes the mean-squared TD error:</p>\n\n$$L_{\\text{critic}}(\\phi) = \\tfrac{1}{2}\\,\\mathbb{E}\\big[(y_t - V_\\phi(s_t))^2\\big], \\qquad y_t = r_t + \\gamma\\, V_{\\phi^-}(s_{t+1}).$$\n\n<p>Crucially, the target is treated as a <em>constant</em> — we do not backpropagate through $V_\\phi(s_{t+1})$ (denoted $\\phi^-$, a \"stop-gradient\" or detached copy). This is <strong>semi-gradient</strong> TD learning; it is what makes the method stable enough to work in practice, just as in DQN. The critic update is then a gradient-descent step:</p>\n\n$$\\phi \\leftarrow \\phi + \\beta\\,\\big(y_t - V_\\phi(s_t)\\big)\\,\\nabla_\\phi V_\\phi(s_t) \\;=\\; \\phi + \\beta\\,\\delta_t\\,\\nabla_\\phi V_\\phi(s_t).$$\n\n<p>Here $\\beta$ is the critic's learning rate. Notice the same $\\delta_t$ that drives the actor also drives the critic — one TD error, two consumers.</p>\n\n<h3>The Actor: Following the Advantage</h3>\n\n<p>The actor ascends the policy gradient with the critic-supplied advantage. For a single transition, the (sample) actor update is:</p>\n\n$$\\theta \\leftarrow \\theta + \\alpha\\,\\nabla_\\theta \\log \\pi_\\theta(a_t\\mid s_t)\\,\\hat A_t,$$\n\n<p>where $\\alpha$ is the actor's learning rate and $\\hat A_t$ is our advantage estimate — for the simplest one-step actor-critic, $\\hat A_t = \\delta_t = r_t + \\gamma V_\\phi(s_{t+1}) - V_\\phi(s_t)$. (Again $\\hat A_t$ is detached: we do not let the actor's gradient flow into the critic, and vice versa.)</p>\n\n<p>It is worth pausing on the sign logic, because it is the soul of the method. If $\\delta_t > 0$, the outcome was better than the critic expected, so $a_t$ was a pleasant surprise: increase $\\log \\pi_\\theta(a_t\\mid s_t)$, i.e. make $a_t$ more probable. If $\\delta_t < 0$, the action under-delivered: make it less probable. The critic's prediction $V_\\phi(s_t)$ acts as the floating reference point — the baseline — so actions are judged relative to expectation rather than in absolute terms.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>This is a <strong>bias-variance trade made architectural</strong>. REINFORCE is all-Monte-Carlo: unbiased, high variance. One-step actor-critic bootstraps off $V_\\phi$: lower variance but now <em>biased</em>, because $V_\\phi$ is only an approximation and the one-step target leans heavily on it. The deep question becomes: how do we dial smoothly between these two regimes? That is exactly what GAE answers.</p></div>\n\n<h3>Generalized Advantage Estimation (GAE)</h3>\n\n<p>The one-step TD advantage $\\delta_t$ has low variance but high bias (it trusts $V_\\phi(s_{t+1})$ completely after one step). The full Monte-Carlo advantage $G_t - V_\\phi(s_t)$ has no bootstrap bias but high variance. In between sit the <strong>$n$-step</strong> advantage estimators, which bootstrap only after $n$ real rewards:</p>\n\n$$\\hat A_t^{(n)} = \\underbrace{r_t + \\gamma r_{t+1} + \\cdots + \\gamma^{n-1} r_{t+n-1} + \\gamma^n V_\\phi(s_{t+n})}_{n\\text{-step return}} - V_\\phi(s_t).$$\n\n<p>Larger $n$ means more real signal (less bias) and more accumulated reward noise (more variance). Rather than pick one $n$, <strong>GAE</strong> (Schulman et al., 2016) takes an <em>exponentially weighted average</em> of all the $n$-step estimators, with decay parameter $\\lambda \\in [0,1]$. The remarkably clean result is a discounted sum of TD errors:</p>\n\n$$\\hat A_t^{\\text{GAE}(\\gamma,\\lambda)} = \\sum_{l=0}^{\\infty} (\\gamma\\lambda)^l\\,\\delta_{t+l}, \\qquad \\delta_{t+l} = r_{t+l} + \\gamma V_\\phi(s_{t+l+1}) - V_\\phi(s_{t+l}).$$\n\n<p>This mirrors the $\\text{TD}(\\lambda)$ / eligibility-trace idea from value-based RL, but applied to the <em>advantage</em> used in the policy gradient. The two endpoints recover the familiar cases:</p>\n\n<ul>\n<li>$\\lambda = 0$: $\\hat A_t = \\delta_t$ — the low-variance, high-bias one-step TD advantage.</li>\n<li>$\\lambda = 1$: $\\hat A_t = \\sum_{l\\ge 0}\\gamma^l \\delta_{t+l} = G_t - V_\\phi(s_t)$ — the high-variance, low-bias Monte-Carlo advantage (the inner sum telescopes; check it!).</li>\n</ul>\n\n<p>In practice $\\lambda \\approx 0.95$ and $\\gamma \\approx 0.99$ are excellent defaults: mostly Monte-Carlo, with a touch of bootstrapping to tame variance. GAE is computed efficiently by a single backward pass over a finite rollout:</p>\n\n<pre><code># Given rollout of length T: rewards r[t], values V[t], V[T] (bootstrap), dones\nA = 0.0\nadv = [0.0] * T\nfor t in reversed(range(T)):\n    nonterminal = 1.0 - done[t]\n    delta = r[t] + gamma * V[t+1] * nonterminal - V[t]\n    A = delta + gamma * lam * nonterminal * A\n    adv[t] = A\nreturns = [adv[t] + V[t] for t in range(T)]   # critic regression targets\n</code></pre>\n\n<p>The same loop yields both the actor's advantages (<code>adv</code>) and the critic's regression targets (<code>returns = adv + V</code>), which is precisely the $\\lambda$-return $V_\\phi(s_t) + \\hat A_t^{\\text{GAE}}$.</p>\n\n<h3>Putting It Together: A2C</h3>\n\n<p><strong>A2C</strong> (Advantage Actor-Critic) is the canonical synchronous actor-critic. One iteration:</p>\n\n<ol>\n<li><strong>Collect</strong> a rollout of $T$ steps from one or many parallel environment copies using the current policy $\\pi_\\theta$.</li>\n<li><strong>Estimate advantages</strong> $\\hat A_t$ (GAE) and targets $\\hat R_t = \\hat A_t + V_\\phi(s_t)$.</li>\n<li><strong>Update the actor</strong>: ascend $\\sum_t \\nabla_\\theta \\log\\pi_\\theta(a_t\\mid s_t)\\,\\hat A_t$.</li>\n<li><strong>Update the critic</strong>: descend $\\sum_t \\nabla_\\phi \\tfrac12(\\hat R_t - V_\\phi(s_t))^2$.</li>\n</ol>\n\n<p>In modern implementations both are folded into one loss with shared parameters and an <strong>entropy bonus</strong> $H(\\pi_\\theta(\\cdot\\mid s_t))$ to encourage exploration:</p>\n\n$$L(\\theta,\\phi) = \\underbrace{-\\,\\hat A_t\\log\\pi_\\theta(a_t\\mid s_t)}_{\\text{actor}} \\;+\\; \\underbrace{c_v\\,(\\hat R_t - V_\\phi(s_t))^2}_{\\text{critic}} \\;-\\; \\underbrace{c_e\\, H\\big(\\pi_\\theta(\\cdot\\mid s_t)\\big)}_{\\text{exploration}}.$$\n\n<p>(The actor term carries a minus sign because we minimize $L$ but want to ascend the policy objective; $\\hat A_t$ is detached so it acts as a fixed weight on $\\log\\pi_\\theta$.)</p>\n\n<h4>A3C vs A2C: asynchronous vs synchronous</h4>\n\n<p><strong>A3C</strong> (Asynchronous Advantage Actor-Critic, Mnih et al., 2016) came first. Many worker threads each hold a copy of the network, interact with their own environment, compute gradients on short rollouts, and <em>asynchronously</em> push those gradients to a shared parameter server (Hogwild-style, no locks). The diversity of de-correlated experience across workers replaces the experience-replay buffer that DQN needed for stability — and it runs on commodity multi-core CPUs.</p>\n\n<p><strong>A2C</strong> is the synchronous, deterministic counterpart: a coordinator waits for all workers to finish their rollouts, then averages their experience into one big batch and performs a single update. Researchers found A2C matches or beats A3C while being simpler, more reproducible (no race conditions), and a better fit for GPUs (one large batch = efficient matrix math).</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>A3C/A2C parallelism is the same insight that powers large-scale supervised training: <strong>de-correlated, batched data stabilizes SGD</strong>. In RL the danger is that consecutive states in one trajectory are highly correlated; running many environments at once breaks that correlation, just as shuffling breaks it in supervised learning. The async-vs-sync choice — Hogwild-style stale updates vs synchronized averaging — is the very same debate as asynchronous vs synchronous distributed deep-learning training.</p></div>\n\n<h3>Worked Example: One Update Step</h3>\n\n<p>Consider a tiny problem with a softmax policy over two actions $\\{L, R\\}$ in a state $s$, with logits $z = (z_L, z_R) = (0.0,\\,0.0)$ so $\\pi_\\theta(L\\mid s) = \\pi_\\theta(R\\mid s) = 0.5$. The critic currently predicts $V_\\phi(s) = 1.0$. We sample action $a = R$, take it, and observe reward $r = 2.0$ and next state $s'$ with $V_\\phi(s') = 0.5$. Use $\\gamma = 0.9$, actor LR $\\alpha = 0.1$, critic LR $\\beta = 0.1$, and a one-step advantage ($\\lambda = 0$).</p>\n\n<p><strong>Step 1 — TD error / advantage.</strong></p>\n$$\\delta = r + \\gamma V_\\phi(s') - V_\\phi(s) = 2.0 + 0.9(0.5) - 1.0 = 1.45.$$\n<p>So $\\hat A = 1.45 > 0$: action $R$ beat expectations. The actor should make $R$ more likely.</p>\n\n<p><strong>Step 2 — Actor gradient.</strong> For a softmax policy, $\\nabla_{z_{a'}}\\log\\pi_\\theta(a\\mid s) = \\mathbf{1}[a' = a] - \\pi_\\theta(a'\\mid s)$. With $a = R$:</p>\n$$\\frac{\\partial \\log\\pi(R\\mid s)}{\\partial z_R} = 1 - 0.5 = 0.5, \\qquad \\frac{\\partial \\log\\pi(R\\mid s)}{\\partial z_L} = 0 - 0.5 = -0.5.$$\n<p>The actor update $z \\leftarrow z + \\alpha\\,\\hat A\\,\\nabla_z\\log\\pi(R\\mid s)$ gives:</p>\n$$z_R \\leftarrow 0 + 0.1(1.45)(0.5) = 0.0725,\\qquad z_L \\leftarrow 0 + 0.1(1.45)(-0.5) = -0.0725.$$\n<p>New probabilities: $\\pi(R\\mid s) = \\sigma(z_R - z_L) = \\sigma(0.145) \\approx 0.536$. The probability of $R$ rose from 0.500 to about 0.536, exactly as the positive advantage demanded.</p>\n\n<p><strong>Step 3 — Critic update.</strong> Assume the critic outputs $V_\\phi(s)$ directly through a parameter $w$ with $\\nabla_w V_\\phi(s) = 1$. Then</p>\n$$w \\leftarrow w + \\beta\\,\\delta\\,\\nabla_w V_\\phi(s) = 1.0 + 0.1(1.45)(1) = 1.145.$$\n<p>The critic raises its estimate of $V(s)$ from 1.0 toward the observed target $r + \\gamma V(s') = 2.45$, shrinking future TD errors. Both networks moved in the right direction from a single transition, sharing the one number $\\delta = 1.45$.</p>\n\n<h3>Practical Notes and Connections</h3>\n\n<ul>\n<li><strong>Normalize advantages.</strong> Standardizing $\\hat A_t$ to zero mean and unit variance across a batch is a cheap, near-universal stabilizer.</li>\n<li><strong>Shared vs separate networks.</strong> Sharing a torso is parameter-efficient but couples the two losses; the critic loss can dominate and must be down-weighted ($c_v$, often 0.5).</li>\n<li><strong>Don't cross the streams.</strong> The advantage feeding the actor must be detached from the critic's graph, and the critic's target must be detached too — forgetting either is the most common actor-critic bug.</li>\n<li><strong>Lineage.</strong> A2C is the direct ancestor of <strong>PPO</strong>, which keeps the GAE-based advantage and the actor/critic structure but replaces the raw policy-gradient step with a clipped surrogate objective for safer, larger updates. If you understand A2C + GAE, PPO is a small delta away.</li>\n</ul>\n\n<p>The mental model to carry forward: <em>actor-critic = policy gradient with a learned baseline-and-target supplied by a value network, with GAE as the variance/bias dial and A2C/A3C as the parallelism strategy.</em></p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: actor-critic is REINFORCE with a built-in baseline</summary>\n<p>Pure policy gradients (REINFORCE) work but are <b>noisy</b>: each update scales the policy gradient by the whole return $G_t$, which swings wildly from episode to episode, so learning crawls. Pure value methods (Q-learning) are low-variance but awkward for continuous or stochastic actions. <b>Actor-critic takes the best of both.</b></p>\n<p>It runs two learners at once: the <em>actor</em> (the policy) and the <em>critic</em> (a value function $V(s)$). The critic supplies a <b>baseline</b>, so the actor updates on the <em>advantage</em> $A = G_t - V(s)$ — \"how much better than expected was this action?\" — instead of the raw return. Subtracting a baseline leaves the gradient's expectation unchanged (no bias) but sharply cuts its variance: you're no longer jerked around by how good the state happened to be, only by how much the action beat the average.</p>\n<p>The \"aha\": the critic isn't a separate algorithm bolted on — it's a <b>variance-reduction device</b> for the actor. That one idea (learn a baseline, act on the advantage) is the backbone of A2C, A3C, and PPO.</p>\n</details>\n",
          "mcq": [
            {
              "q": "In one-step actor-critic, what does the TD error $\\delta_t = r_t + \\gamma V_\\phi(s_{t+1}) - V_\\phi(s_t)$ serve as?",
              "choices": [
                "Only the critic's regression loss; the actor uses the full Monte-Carlo return",
                "An estimate of the advantage $A^\\pi(s_t,a_t)$ that drives the actor, and simultaneously the error signal that trains the critic",
                "The actor's entropy bonus",
                "The discount factor applied to future rewards"
              ],
              "answer": 1,
              "explain": "Because $\\mathbb{E}[r_t+\\gamma V^\\pi(s_{t+1})\\mid s_t,a_t]=Q^\\pi(s_t,a_t)$, the TD error is an unbiased estimate of the advantage; the same $\\delta_t$ weights the actor's $\\nabla\\log\\pi$ and is the residual the critic regresses to reduce."
            },
            {
              "q": "What does the GAE parameter $\\lambda$ control, and what do its extremes give?",
              "choices": [
                "The learning rate; $\\lambda=0$ means no learning, $\\lambda=1$ means maximal learning",
                "The discount on future rewards; it is just a second name for $\\gamma$",
                "The bias-variance trade-off in the advantage estimate; $\\lambda=0$ gives the one-step TD advantage (low variance, high bias) and $\\lambda=1$ gives the Monte-Carlo advantage $G_t-V_\\phi(s_t)$ (high variance, low bias)",
                "The entropy coefficient that encourages exploration"
              ],
              "answer": 2,
              "explain": "GAE is an exponentially weighted average of all $n$-step advantage estimators; $\\lambda=0$ collapses to $\\delta_t$ and $\\lambda=1$ telescopes to the Monte-Carlo advantage, interpolating bias against variance."
            },
            {
              "q": "Subtracting a state-dependent baseline $b(s)$ (e.g. $V_\\phi(s)$) from the credit signal in the policy gradient is valid because:",
              "choices": [
                "It biases the gradient toward better actions, which speeds convergence",
                "$\\mathbb{E}_{a\\sim\\pi}[\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)\\,b(s)]=0$, so the gradient stays unbiased while its variance can drop",
                "Baselines are only valid when the policy is deterministic",
                "It converts the policy gradient into a value-iteration update"
              ],
              "answer": 1,
              "explain": "Since $\\sum_a \\nabla_\\theta \\pi_\\theta(a\\mid s) = \\nabla_\\theta 1 = 0$, any function of $s$ alone has zero expected contribution to the gradient, so it leaves the estimator unbiased while reducing variance."
            },
            {
              "q": "What is the main practical difference between A2C and A3C?",
              "choices": [
                "A2C learns a value function but A3C does not",
                "A3C uses the advantage while A2C uses the raw return",
                "A3C has workers push gradients asynchronously to shared parameters (lock-free, stale updates), whereas A2C synchronizes all workers into one batched update each step",
                "A2C is only for continuous actions and A3C only for discrete actions"
              ],
              "answer": 2,
              "explain": "Both are advantage actor-critic; the distinction is coordination: A3C is asynchronous/Hogwild-style across threads, while A2C waits and averages workers into a single synchronous update, which is simpler and more GPU-friendly."
            },
            {
              "q": "In REINFORCE, the credit signal is set to $\\Psi_t = G_t$, the full Monte-Carlo return. Why does actor-critic replace this with a learned value estimate?",
              "choices": [
                "$G_t$ is a biased estimator of the action's value, and the critic removes that bias",
                "$G_t$ has enormous variance because it sums many random rewards across the whole trajectory, so a single lucky/unlucky tail can swamp an action's true influence",
                "$G_t$ cannot be computed in continuous-action environments",
                "$G_t$ ignores the discount factor, while the critic restores it"
              ],
              "answer": 1,
              "explain": "The lesson states $G_t$ is unbiased but suffers enormous variance because it is a sum of many random rewards across an entire trajectory, so a single lucky/unlucky tail can swamp an action's influence, motivating a lower-variance learned estimate. Choice 0 is wrong because $G_t$ is unbiased."
            },
            {
              "q": "The lesson notes that subtracting a baseline $b(s)$ leaves the policy gradient unbiased because $\\mathbb{E}_{a\\sim\\pi}[\\nabla_\\theta \\log \\pi_\\theta(a\\mid s)\\, b(s)] = 0$. What is the key reason this expectation vanishes?",
              "choices": [
                "Because $b(s)$ is multiplied by the reward, which averages to zero",
                "Because $b(s)$ does not depend on the action, it factors out and leaves $b(s)\\,\\nabla_\\theta \\sum_a \\pi_\\theta(a\\mid s) = b(s)\\,\\nabla_\\theta 1 = 0$",
                "Because the log-probability gradient is always zero in expectation regardless of any multiplier",
                "Because the baseline is chosen to exactly equal the return, cancelling the term"
              ],
              "answer": 1,
              "explain": "Since $b(s)$ is independent of the action it pulls out of the sum, and the gradient of the normalized probabilities $\\sum_a \\pi_\\theta(a\\mid s)=1$ is zero, giving $b(s)\\,\\nabla_\\theta 1 = 0$, exactly as the lesson derives."
            },
            {
              "q": "The lesson describes the actor and critic as 'two networks bootstrapping each other,' analogous to GANs and self-play. What roles do the actor and critic play in this dance?",
              "choices": [
                "The actor predicts state values while the critic selects actions to maximize them",
                "The actor proposes actions and improves toward ones the critic praises, while the critic learns to predict how much reward will follow",
                "Both networks predict returns and the one with lower error is used to act",
                "The critic generates trajectories and the actor labels them as good or bad"
              ],
              "answer": 1,
              "explain": "Per the lesson, the actor acts and gets better at proposing the actions the critic praises, while the critic watches the actor and gets better at predicting how much reward will follow. Choice 0 reverses the two roles."
            },
            {
              "q": "Why is the state-value function $V^\\pi(s)$ called the 'natural' baseline for the credit signal $\\Psi_t$?",
              "choices": [
                "It is the only baseline that keeps the gradient unbiased",
                "It is the average return from $s$, so subtracting it makes $\\Psi_t$ measure how much better than average an action was",
                "It is the easiest function to compute exactly without learning",
                "It guarantees zero variance in the gradient estimate"
              ],
              "answer": 1,
              "explain": "The lesson identifies $V^\\pi(s)$ as the average return from $s$, so subtracting it makes $\\Psi_t$ express how much better than average an action turned out to be. Choice 0 is wrong because any function of the state alone keeps the gradient unbiased, not only $V^\\pi$."
            },
            {
              "q": "In the critic update $\\phi \\leftarrow \\phi + \\beta(y_t - V_\\phi(s_t))\\nabla_\\phi V_\\phi(s_t)$ with target $y_t = r_t + \\gamma V_{\\phi^-}(s_{t+1})$, why is the bootstrap target $y_t$ treated as a constant (stop-gradient on $\\phi^-$) rather than differentiated?",
              "choices": [
                "Detaching the target gives semi-gradient TD learning, which is what makes the method stable in practice; differentiating through $V_\\phi(s_{t+1})$ would chase a moving target and destabilize training",
                "The target $y_t$ does not actually depend on $\\phi$, so detaching it changes nothing mathematically",
                "It is required so that the actor and critic can share parameters in one network",
                "Differentiating the target would make the critic loss negative, which gradient descent cannot handle"
              ],
              "answer": 0,
              "explain": "The target genuinely contains $V_\\phi(s_{t+1})$, so it does depend on $\\phi$; deliberately detaching it yields semi-gradient TD (as in DQN), trading a true-gradient guarantee for the stability of regressing toward a fixed-looking target. Choice 1 is the tempting misconception — the dependence is real, which is exactly why a stop-gradient is needed."
            },
            {
              "q": "A rollout ends at a non-terminal state, so $V_\\phi(s_T)$ is used to bootstrap the final return. A practitioner instead sets the bootstrap value to $0$ at this non-terminal cutoff. What is the most likely effect on the GAE advantages near the end of the rollout?",
              "choices": [
                "No effect, because GAE already discounts late terms to negligible weight",
                "It only changes the critic targets, never the advantages",
                "It introduces bias: pretending future value is $0$ makes the last TD errors artificially negative, underestimating advantages for actions late in the rollout",
                "It reduces variance with no downside, which is why truncation is always done this way"
              ],
              "answer": 2,
              "explain": "Bootstrapping with $V_\\phi(s_T)$ is correct precisely because the episode did not end; forcing it to $0$ falsely asserts no future reward, so $\\delta_{T-1}=r_{T-1}+\\gamma\\cdot 0 - V_\\phi(s_{T-1})$ is biased low and that bias propagates backward through the GAE recursion. The zero-value treatment is only correct at genuine terminal states."
            },
            {
              "q": "Using the worked example's setup ($V_\\phi(s)=1.0$, $\\gamma=0.9$), suppose instead the observed reward is $r=0.0$ and the next-state value is $V_\\phi(s')=0.5$ after sampling action $R$. What is the one-step advantage $\\hat A=\\delta$, and which way does the actor push $\\pi(R\\mid s)$?",
              "choices": [
                "$\\delta = -0.55$; decrease the probability of $R$",
                "$\\delta = +0.45$; increase the probability of $R$",
                "$\\delta = -0.45$; increase the probability of $R$",
                "$\\delta = +0.55$; decrease the probability of $R$"
              ],
              "answer": 0,
              "explain": "$\\delta = r + \\gamma V_\\phi(s') - V_\\phi(s) = 0.0 + 0.9(0.5) - 1.0 = -0.55$; a negative advantage means $R$ under-delivered relative to the critic's reference, so the gradient step lowers $\\log\\pi(R\\mid s)$ and makes $R$ less probable."
            },
            {
              "q": "In the combined A2C loss $L = -\\hat A_t\\log\\pi_\\theta(a_t\\mid s_t) + c_v(\\hat R_t - V_\\phi(s_t))^2 - c_e H(\\pi_\\theta(\\cdot\\mid s_t))$, what is the role of the entropy term $-c_e H$?",
              "choices": [
                "It is the critic's regression target and replaces the value loss",
                "Minimizing $-c_e H$ raises the policy's entropy, discouraging premature collapse to a near-deterministic policy and thus encouraging exploration",
                "It biases the advantage estimate toward zero to stabilize the gradient",
                "It is a second baseline that makes the policy gradient unbiased"
              ],
              "answer": 1,
              "explain": "Because the loss is minimized, the $-c_e H$ term pushes entropy $H$ up, keeping $\\pi_\\theta$ stochastic so the agent keeps exploring rather than locking onto one action too early. It plays no role in the critic regression or in the unbiasedness argument (that is the baseline's job)."
            },
            {
              "q": "What is an <em>actor-critic</em> method?",
              "choices": [
                "Two competing policies playing a zero-sum game",
                "A value table plus an $\\varepsilon$-greedy action rule",
                "A model of the environment plus a planner",
                "A learned policy (the <em>actor</em>) paired with a learned value function (the <em>critic</em>) that scores states/actions, so the actor no longer needs the full Monte-Carlo return to learn"
              ],
              "answer": 3,
              "explain": "The actor is $\\pi_\\theta$; the critic is a learned $V_\\phi$ (or $Q_\\phi$). The actor proposes actions and the critic evaluates them, supplying a low-variance credit signal so the policy can update every step instead of waiting for the episode's full return — two networks improving each other."
            },
            {
              "q": "What does the <em>advantage</em> function $A^\\pi(s,a)$ represent?",
              "choices": [
                "The total discounted return of an entire episode",
                "$A^\\pi(s,a)=Q^\\pi(s,a)-V^\\pi(s)$ — how much better taking action $a$ is than the policy's average behavior in state $s$ (positive → make it more likely)",
                "The entropy of the action distribution",
                "The probability the policy assigns to action $a$"
              ],
              "answer": 1,
              "explain": "The advantage centers the action-value on the state's own baseline: $A=Q-V$. It answers exactly what the policy gradient cares about — \"was $a$ better or worse than what I usually do here?\" — and using it as the credit signal gives an unbiased gradient with near-minimal variance."
            },
            {
              "q": "Why does actor-critic replace REINFORCE's credit signal $\\Psi_t=G_t$ (the Monte-Carlo return)?",
              "choices": [
                "Because $G_t$ is biased, since it bootstraps off a value estimate",
                "Because $G_t$ requires a model of the environment",
                "Because $G_t$ is a sum of many random rewards across a whole trajectory, so one lucky/unlucky tail can swamp action $a_t$'s true effect — giving very high variance and slow learning",
                "Because $G_t$ can only be applied to discrete action spaces"
              ],
              "answer": 2,
              "explain": "$G_t$ is unbiased but extremely high-variance: it aggregates the noise of every reward and transition to the end of the episode. Actor-critic swaps it for a learned, bootstrapped estimate (e.g. the TD error as an advantage), trading a little bias for a large variance reduction."
            },
            {
              "q": "How is the critic itself trained?",
              "choices": [
                "Like a value-function approximator — by regression, nudging $V_\\phi(s)$ toward a target such as the TD target $r+\\gamma V_\\phi(s')$ or the observed return",
                "By maximizing the policy's entropy",
                "By the same clipped objective the actor uses",
                "It is not trained — the environment provides it"
              ],
              "answer": 0,
              "explain": "The critic learns a value function by minimizing a squared error toward a bootstrapped (TD) or Monte-Carlo target — exactly value-function approximation. Its target is treated as a constant (stop-gradient) so the regression is stable, and the improving critic in turn sharpens the actor's credit signal."
            }
          ],
          "flashcards": [
            {
              "front": "Define the advantage function and why actor-critic uses it.",
              "back": "$A^\\pi(s,a) = Q^\\pi(s,a) - V^\\pi(s)$: how much better than the policy's average an action is. As the credit signal $\\Psi_t$ it gives an unbiased policy gradient with near-minimal variance."
            },
            {
              "front": "Why is the TD error a good advantage estimate?",
              "back": "$\\mathbb{E}[r_t+\\gamma V^\\pi(s_{t+1})\\mid s_t,a_t]=Q^\\pi(s_t,a_t)$, so $\\delta_t = r_t+\\gamma V^\\pi(s_{t+1})-V^\\pi(s_t)$ has expectation $A^\\pi(s_t,a_t)$ — and needs only a learned $V$, not $Q$."
            },
            {
              "front": "GAE formula and the meaning of its two endpoints.",
              "back": "$\\hat A_t^{GAE(\\gamma,\\lambda)} = \\sum_{l\\ge0}(\\gamma\\lambda)^l\\delta_{t+l}$. $\\lambda=0\\Rightarrow\\delta_t$ (low variance, high bias); $\\lambda=1\\Rightarrow G_t-V_\\phi(s_t)$ (high variance, low bias)."
            },
            {
              "front": "Actor and critic update rules for one transition.",
              "back": "Actor: $\\theta \\leftarrow \\theta + \\alpha\\,\\nabla_\\theta\\log\\pi_\\theta(a_t\\mid s_t)\\,\\hat A_t$. Critic: $\\phi \\leftarrow \\phi + \\beta\\,\\delta_t\\,\\nabla_\\phi V_\\phi(s_t)$, with target $y_t=r_t+\\gamma V_\\phi(s_{t+1})$ detached (semi-gradient)."
            },
            {
              "front": "A2C vs A3C in one line each.",
              "back": "A3C: asynchronous, lock-free workers push gradients to shared params (Hogwild). A2C: synchronous — wait for all workers, average into one batched update; simpler, reproducible, GPU-friendly."
            },
            {
              "front": "Why does subtracting a baseline $b(s)$ leave the policy gradient unbiased?",
              "back": "$\\mathbb{E}_{a\\sim\\pi}[\\nabla_\\theta\\log\\pi_\\theta(a\\mid s)\\,b(s)] = b(s)\\nabla_\\theta\\sum_a\\pi_\\theta(a\\mid s)=b(s)\\nabla_\\theta 1 = 0$. Zero expected contribution, but variance can drop."
            }
          ],
          "homework": [
            {
              "prompt": "Write out the actor and critic gradient updates for a single transition $(s_t, a_t, r_t, s_{t+1})$ in one-step advantage actor-critic. State explicitly what the advantage estimate is, which quantities are detached (stop-gradient), and the role of each learning rate.",
              "hint": "There is exactly one TD error and it appears in both updates. Think about which terms must be treated as constants so gradients don't flow where they shouldn't.",
              "solution": "Compute the TD error / one-step advantage: $\\delta_t = r_t + \\gamma V_\\phi(s_{t+1}) - V_\\phi(s_t)$, so $\\hat A_t = \\delta_t$.\\n\\nActor update (gradient ascent on the policy objective, learning rate $\\alpha$):\\n$$\\theta \\leftarrow \\theta + \\alpha\\,\\nabla_\\theta \\log\\pi_\\theta(a_t\\mid s_t)\\,\\hat A_t,$$\\nwhere $\\hat A_t$ is DETACHED (a fixed scalar weight); no gradient flows into the critic through it.\\n\\nCritic update (semi-gradient descent on $\\tfrac12(y_t - V_\\phi(s_t))^2$ with target $y_t = r_t + \\gamma V_\\phi(s_{t+1})$, learning rate $\\beta$):\\n$$\\phi \\leftarrow \\phi + \\beta\\,(y_t - V_\\phi(s_t))\\,\\nabla_\\phi V_\\phi(s_t) = \\phi + \\beta\\,\\delta_t\\,\\nabla_\\phi V_\\phi(s_t),$$\\nwhere the target $y_t$ is DETACHED (we do not differentiate through $V_\\phi(s_{t+1})$ — this is the semi-gradient/stop-gradient that gives stability). $\\alpha$ scales how aggressively the policy moves; $\\beta$ scales how fast the value estimate is corrected. Both updates consume the same $\\delta_t$."
            },
            {
              "prompt": "Show that the $\\lambda=1$ case of GAE equals the Monte-Carlo advantage: $\\sum_{l=0}^{\\infty}\\gamma^l\\delta_{t+l} = G_t - V_\\phi(s_t)$, where $G_t=\\sum_{l\\ge0}\\gamma^l r_{t+l}$.",
              "hint": "Substitute $\\delta_{t+l} = r_{t+l} + \\gamma V_\\phi(s_{t+l+1}) - V_\\phi(s_{t+l})$ and look for a telescoping pattern in the value terms.",
              "solution": "Set $\\lambda=1$ so the weight is $\\gamma^l$. Expand:\\n$$\\sum_{l=0}^{\\infty}\\gamma^l\\delta_{t+l} = \\sum_{l=0}^{\\infty}\\gamma^l\\big(r_{t+l} + \\gamma V_\\phi(s_{t+l+1}) - V_\\phi(s_{t+l})\\big).$$\\nGroup the reward terms and the value terms:\\n$$= \\sum_{l=0}^{\\infty}\\gamma^l r_{t+l} + \\sum_{l=0}^{\\infty}\\big(\\gamma^{l+1}V_\\phi(s_{t+l+1}) - \\gamma^l V_\\phi(s_{t+l})\\big).$$\\nThe first sum is $G_t$. The second is telescoping: writing terms for $l=0,1,2,\\dots$ gives $(\\gamma V_{t+1}-V_t) + (\\gamma^2 V_{t+2}-\\gamma V_{t+1}) + (\\gamma^3 V_{t+3}-\\gamma^2 V_{t+2}) + \\cdots$, where consecutive terms cancel, leaving $-V_\\phi(s_t)$ (assuming $\\gamma^l V_\\phi(s_{t+l})\\to0$, which holds for $\\gamma<1$ with bounded values, or at episode termination). Therefore $\\sum_{l\\ge0}\\gamma^l\\delta_{t+l} = G_t - V_\\phi(s_t)$, the Monte-Carlo advantage. QED."
            },
            {
              "prompt": "A critic gives $V_\\phi(s)=3.0$ and $V_\\phi(s')=4.0$. You take action $a$ from $s$, receive $r=1.0$, and land in $s'$; use $\\gamma=0.99$. (a) Compute the one-step advantage. (b) Using a softmax policy over 3 actions with current probabilities $\\pi=(0.2,0.5,0.3)$, and $a$ the third action, give the gradient of $\\log\\pi(a\\mid s)$ with respect to the three logits, and state whether the chosen action's probability will rise or fall after the actor update.",
              "hint": "For softmax, $\\partial \\log\\pi(a)/\\partial z_j = \\mathbf{1}[j=a] - \\pi(j)$. The sign of the advantage times this gradient tells you the direction of change.",
              "solution": "(a) $\\delta = r + \\gamma V_\\phi(s') - V_\\phi(s) = 1.0 + 0.99(4.0) - 3.0 = 1.0 + 3.96 - 3.0 = 1.96$. So $\\hat A = 1.96 > 0$.\\n\\n(b) With $a$ = action 3 and $\\pi=(0.2,0.5,0.3)$:\\n$\\partial\\log\\pi(a)/\\partial z_1 = 0 - 0.2 = -0.2$,\\n$\\partial\\log\\pi(a)/\\partial z_2 = 0 - 0.5 = -0.5$,\\n$\\partial\\log\\pi(a)/\\partial z_3 = 1 - 0.3 = +0.7$.\\nThe actor update is $z_j \\leftarrow z_j + \\alpha\\,\\hat A\\,(\\mathbf{1}[j=a]-\\pi(j))$. Since $\\hat A>0$ and the gradient w.r.t. $z_3$ is positive, logit $z_3$ increases while $z_1,z_2$ decrease, so the chosen action's probability RISES (the others fall). This is correct: a positive advantage means the action beat expectations, so the policy should favor it more."
            }
          ],
          "examples": [
            {
              "title": "The Credit-Signal Menu and Why the TD Error Equals the Advantage",
              "body": "In state $s$ the actor takes action $a$. With $\\gamma = 1$, the environment sends $(s,a)$ to one of two next states: with probability $0.5$ to $s_1$ where $V^\\pi(s_1) = 10$, and with probability $0.5$ to $s_2$ where $V^\\pi(s_2) = 4$; the immediate reward is $r = 0$ in both branches. The critic's value for the current state is $V^\\pi(s) = 5$. Compute $Q^\\pi(s,a)$, the advantage $A^\\pi(s,a)$, the one-step TD error $\\delta$ in each branch, and verify on these numbers that $\\mathbb{E}[\\delta \\mid s,a] = A^\\pi(s,a)$.",
              "solution": "<p><strong>Step 1 — Action value $Q^\\pi(s,a)$.</strong> By definition $Q^\\pi(s,a) = \\mathbb{E}[\\,r + \\gamma V^\\pi(s') \\mid s,a\\,]$, averaging over the two next states:</p>$$Q^\\pi(s,a) = 0.5\\,(0 + 1\\cdot 10) + 0.5\\,(0 + 1\\cdot 4) = 0.5(10) + 0.5(4) = 7.$$<p><strong>Step 2 — Advantage $A^\\pi(s,a)$.</strong> The advantage subtracts the state baseline:</p>$$A^\\pi(s,a) = Q^\\pi(s,a) - V^\\pi(s) = 7 - 5 = 2.$$<p>A positive advantage means $a$ is better than the policy's average behavior in $s$, so the actor should make $a$ more probable.</p><p><strong>Step 3 — TD error in each branch.</strong> Using the true $V^\\pi$, $\\delta = r + \\gamma V^\\pi(s') - V^\\pi(s)$ depends on which next state actually occurs:</p><ul><li>If the transition lands in $s_1$: $\\;\\delta_1 = 0 + 1(10) - 5 = 5.$</li><li>If the transition lands in $s_2$: $\\;\\delta_2 = 0 + 1(4) - 5 = -1.$</li></ul><p>The single sampled $\\delta$ swings between $+5$ and $-1$ depending on luck — that spread is exactly the variance the critic is helping us manage.</p><p><strong>Step 4 — Take the expectation.</strong> Averaging the two branches with their probabilities:</p>$$\\mathbb{E}[\\delta \\mid s,a] = 0.5(5) + 0.5(-1) = 2.5 - 0.5 = 2 = A^\\pi(s,a).$$<p>So even though any one $\\delta$ is a noisy, biased-looking number, <em>on average</em> the one-step TD error reproduces the advantage exactly. This is the concrete payoff of the identity $\\mathbb{E}[r + \\gamma V^\\pi(s') \\mid s,a] = Q^\\pi(s,a)$: the critic only ever has to learn $V$, yet $\\delta$ hands the actor an unbiased advantage signal.</p><p><strong>Where this sits on the menu.</strong> Ranking the credit signals for this $(s,a)$: $Q^\\pi = 7$, baseline-subtracted advantage $A^\\pi = 2$, and the per-sample TD advantage $\\hat A = \\delta \\in \\{5, -1\\}$ with mean $2$. <strong>Answer:</strong> $Q^\\pi(s,a) = 7$, $A^\\pi(s,a) = 2$, $\\delta_1 = 5$, $\\delta_2 = -1$, and $\\mathbb{E}[\\delta\\mid s,a] = 2 = A^\\pi(s,a)$.</p>"
            },
            {
              "title": "Computing GAE Over a Three-Step Rollout (and Checking Both Endpoints)",
              "body": "A rollout of $T = 3$ steps ends in a terminal state. The critic's value estimates are $V_\\phi(s_0) = 2,\\ V_\\phi(s_1) = 3,\\ V_\\phi(s_2) = 1$ (bootstrap value $V_\\phi(s_3) = 0$ since $s_3$ is terminal), and the rewards are $r_0 = 1,\\ r_1 = 0,\\ r_2 = 4$. Using $\\gamma = 1$, compute the TD errors $\\delta_t$, then the GAE advantages with $\\lambda = 0.5$ via the backward recursion, the critic regression targets $\\hat R_t$, and verify that $\\lambda = 0$ recovers $\\delta_t$ and $\\lambda = 1$ recovers the Monte-Carlo advantage $G_t - V_\\phi(s_t)$.",
              "solution": "<p><strong>Step 1 — TD errors.</strong> With $\\delta_t = r_t + \\gamma V_\\phi(s_{t+1}) - V_\\phi(s_t)$ and $\\gamma = 1$ (the last step uses $V_\\phi(s_3) = 0$ because $s_3$ is terminal):</p><ul><li>$\\delta_0 = 1 + (3) - 2 = 2$</li><li>$\\delta_1 = 0 + (1) - 3 = -2$</li><li>$\\delta_2 = 4 + (0) - 1 = 3$</li></ul><p><strong>Step 2 — GAE backward recursion with $\\lambda = 0.5$.</strong> The recursion is $\\hat A_t = \\delta_t + \\gamma\\lambda\\,\\hat A_{t+1}$, run from the end with $\\hat A_3 = 0$ and $\\gamma\\lambda = 0.5$:</p><ul><li>$\\hat A_2 = \\delta_2 = 3$</li><li>$\\hat A_1 = \\delta_1 + 0.5\\,\\hat A_2 = -2 + 0.5(3) = -0.5$</li><li>$\\hat A_0 = \\delta_0 + 0.5\\,\\hat A_1 = 2 + 0.5(-0.5) = 1.75$</li></ul><p>So the GAE($\\gamma{=}1,\\lambda{=}0.5$) advantages are $\\hat A = (1.75,\\ -0.5,\\ 3)$. These are the per-step weights the actor multiplies onto $\\nabla_\\theta \\log\\pi_\\theta(a_t\\mid s_t)$.</p><p><strong>Step 3 — Critic regression targets.</strong> The $\\lambda$-return target is $\\hat R_t = \\hat A_t + V_\\phi(s_t)$:</p>$$\\hat R_0 = 1.75 + 2 = 3.75,\\quad \\hat R_1 = -0.5 + 3 = 2.5,\\quad \\hat R_2 = 3 + 1 = 4.$$<p>The critic descends $\\tfrac12(\\hat R_t - V_\\phi(s_t))^2$ toward these; the same backward loop produced both the actor's advantages and the critic's targets.</p><p><strong>Step 4 — Endpoint $\\lambda = 0$.</strong> Then $\\gamma\\lambda = 0$, the recursion collapses to $\\hat A_t = \\delta_t$, giving $(2,\\ -2,\\ 3)$ — the low-variance, high-bias one-step TD advantages, exactly the $\\delta_t$ from Step 1.</p><p><strong>Step 5 — Endpoint $\\lambda = 1$.</strong> Now $\\gamma\\lambda = 1$ and $\\hat A_t = \\sum_{l \\ge 0}\\delta_{t+l}$. Compute by hand:</p><ul><li>$\\hat A_2 = \\delta_2 = 3$</li><li>$\\hat A_1 = \\delta_1 + \\delta_2 = -2 + 3 = 1$</li><li>$\\hat A_0 = \\delta_0 + \\delta_1 + \\delta_2 = 2 - 2 + 3 = 3$</li></ul><p>Now check these against the Monte-Carlo advantage $G_t - V_\\phi(s_t)$. The undiscounted returns are $G_2 = 4$, $G_1 = r_1 + r_2 = 4$, $G_0 = r_0 + r_1 + r_2 = 5$, so</p>$$G_0 - V_\\phi(s_0) = 5 - 2 = 3,\\quad G_1 - V_\\phi(s_1) = 4 - 3 = 1,\\quad G_2 - V_\\phi(s_2) = 4 - 1 = 3.$$<p>These match $\\hat A = (3,\\ 1,\\ 3)$ from the $\\lambda = 1$ recursion exactly. The reason is telescoping: at $t = 0$, $\\delta_0 + \\delta_1 + \\delta_2 = (1{+}V_1{-}V_0) + (0{+}V_2{-}V_1) + (4{+}0{-}V_2)$; every intermediate $V$ cancels, leaving $(r_0{+}r_1{+}r_2) - V_0 = G_0 - V_\\phi(s_0)$.</p><p><strong>Answer:</strong> $\\delta = (2,-2,3)$; GAE$(\\lambda{=}0.5)$ advantages $\\hat A = (1.75,\\,-0.5,\\,3)$ with critic targets $\\hat R = (3.75,\\,2.5,\\,4)$; the $\\lambda{=}0$ endpoint gives $(2,-2,3)=\\delta_t$ and the $\\lambda{=}1$ endpoint gives $(3,1,3)=G_t-V_\\phi(s_t)$, confirming $\\lambda$ is the bias/variance dial between one-step TD and Monte-Carlo.</p>"
            }
          ]
        },
        {
          "id": "rl-trpo-ppo",
          "title": "Trust Regions and PPO",
          "minutes": 18,
          "content": "<h3>Why Step Size Is a Life-or-Death Decision in Policy Gradients</h3>\n\n<p>In supervised learning, a slightly-too-large gradient step is usually a minor annoyance: the loss bounces, you lower the learning rate, you move on. The data distribution is fixed, so a bad step only costs you on <em>this</em> batch. Reinforcement learning is crueler. In policy gradient methods, the policy $\\pi_\\theta$ is not just the thing you are optimizing — it is also the thing that <em>generates your data</em>. The state distribution $d^{\\pi_\\theta}$ and the actions you observe both depend on $\\theta$. So a single overly aggressive update can push the policy into a region where it visits worse states, collects worse data, and produces gradients that point in even worse directions. The feedback loop is self-reinforcing, and recovery is often impossible. This is the central pathology that trust-region methods and PPO are designed to prevent.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>A policy update is like steering a car whose camera is bolted to the steering wheel. Turn a little and you see a slightly different road and correct smoothly. Yank the wheel and the camera now points at a ditch — and every subsequent \"correction\" is computed from the view of the ditch. The fix is not to steer more carefully in the abstract; it is to <strong>limit how far each turn can move you from what you could actually see.</strong></p></div>\n\n<h3>The Object We Actually Want to Improve</h3>\n\n<p>Recall the vanilla policy gradient. We maximize expected return $J(\\theta) = \\mathbb{E}_{\\tau \\sim \\pi_\\theta}[R(\\tau)]$, and the REINFORCE/actor-critic gradient is</p>\n\n$$\\nabla_\\theta J(\\theta) = \\mathbb{E}_{s \\sim d^{\\pi_\\theta},\\, a \\sim \\pi_\\theta}\\big[\\nabla_\\theta \\log \\pi_\\theta(a \\mid s)\\, A^{\\pi_\\theta}(s,a)\\big],$$\n\n<p>where $A^{\\pi_\\theta}(s,a) = Q^{\\pi_\\theta}(s,a) - V^{\\pi_\\theta}(s)$ is the advantage — how much better action $a$ is than the policy's average behavior in state $s$. The trouble is that this is a <em>local</em> object. It tells you the steepest-ascent direction <em>at the current $\\theta$</em>, and says nothing about how big a step preserves that improvement. If you take a finite step $\\theta \\to \\theta'$, the data distribution shifts from $d^{\\pi_\\theta}$ to $d^{\\pi_{\\theta'}}$, and the gradient you computed may no longer describe the landscape you have landed in.</p>\n\n<p>The key theoretical insight (Kakade &amp; Langford, 2002) is a near-exact accounting of how much a new policy $\\pi'$ improves over an old one $\\pi$. The <strong>performance difference lemma</strong> states:</p>\n\n$$J(\\pi') - J(\\pi) = \\mathbb{E}_{s \\sim d^{\\pi'},\\, a \\sim \\pi'}\\big[A^{\\pi}(s,a)\\big].$$\n\n<p>This is exact, but it is also useless as a direct objective: the expectation is over $d^{\\pi'}$, the state distribution of the policy we do not yet have. The whole game of trust-region methods is to <strong>approximate $d^{\\pi'}$ by $d^{\\pi}$</strong> — to pretend the states stay roughly the same — and then bound the error of that pretense. Define the surrogate</p>\n\n$$L_\\pi(\\pi') = \\mathbb{E}_{s \\sim d^{\\pi},\\, a \\sim \\pi}\\!\\left[\\frac{\\pi'(a\\mid s)}{\\pi(a\\mid s)}\\, A^{\\pi}(s,a)\\right].$$\n\n<p>Note the two changes from the exact lemma: states are now sampled from the <em>old</em> $d^{\\pi}$, and because we still want to evaluate the new policy's preferences using old data, we use <strong>importance sampling</strong> — the ratio $\\pi'(a\\mid s)/\\pi(a\\mid s)$ reweights old actions to reflect how the new policy would have favored them.</p>\n\n<h3>The Importance-Sampling Ratio</h3>\n\n<p>Let us name it, because it is the protagonist of this entire lesson:</p>\n\n$$r_t(\\theta) = \\frac{\\pi_\\theta(a_t \\mid s_t)}{\\pi_{\\theta_{\\text{old}}}(a_t \\mid s_t)}.$$\n\n<p>Here $\\pi_{\\theta_{\\text{old}}}$ is the policy that <em>collected the data</em> (the behavior policy for this batch), frozen at the start of the update; $\\pi_\\theta$ is the policy we are currently optimizing. At the very first gradient step of an update, $\\theta = \\theta_{\\text{old}}$ so $r_t = 1$ everywhere. As we keep optimizing on the same batch, $r_t$ drifts away from 1.</p>\n\n<ul>\n<li>$r_t > 1$: the new policy makes action $a_t$ <em>more</em> likely than the data-collecting policy did.</li>\n<li>$r_t < 1$: the new policy makes $a_t$ <em>less</em> likely.</li>\n<li>$r_t = 1$: no change in probability for that action.</li>\n</ul>\n\n<p>Importance sampling lets us reuse a batch of old data for several gradient steps — a huge sample-efficiency win over vanilla policy gradient, which must throw data away after one step. But it carries a sharp edge: importance weights have <strong>unbounded variance</strong>. When $\\pi_{\\theta_{\\text{old}}}(a_t\\mid s_t)$ is tiny, the ratio can explode, and the surrogate becomes dominated by a few high-variance, possibly garbage samples. The estimate $L_\\pi(\\pi')$ is only trustworthy when $\\pi'$ stays <em>close</em> to $\\pi$, i.e., when $r_t$ stays near 1. Stray too far and the importance-sampling approximation silently breaks. This is the formal reason \"small steps\" matter, and it motivates both solutions below.</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>The surrogate $L_\\pi$ is a <em>first-order accurate local model</em> of the true objective $J$: it matches $J$ in value and gradient at $\\pi' = \\pi$, but its accuracy decays as $\\pi'$ moves away. Trust-region optimization — a classic idea from numerical optimization — says: optimize your local model, but only within a region where you trust it. RL inherits this idea wholesale; the \"region\" is measured in policy space, not parameter space.</p></div>\n\n<h3>TRPO: A Hard KL Constraint</h3>\n\n<p>Trust Region Policy Optimization makes the trust region explicit. There is a theorem that bounds the gap between the surrogate and the true improvement by a term proportional to the KL divergence between the two policies:</p>\n\n$$J(\\pi') \\ge L_\\pi(\\pi') - C \\cdot \\max_s \\mathrm{KL}\\big(\\pi(\\cdot\\mid s)\\,\\|\\,\\pi'(\\cdot\\mid s)\\big),$$\n\n<p>for a constant $C$ depending on the discount and the advantage magnitude. This is a genuine <strong>monotonic-improvement guarantee</strong>: if you maximize the right-hand side, you cannot decrease true performance. In practice the penalty coefficient $C$ from theory is far too conservative (it would force microscopic steps), so TRPO converts the penalty into a <strong>constraint</strong> with a tunable trust-region size $\\delta$:</p>\n\n$$\\max_\\theta\\; L_{\\theta_{\\text{old}}}(\\theta) \\quad \\text{subject to} \\quad \\mathbb{E}_{s\\sim d^{\\pi_{\\theta_{\\text{old}}}}}\\!\\big[\\mathrm{KL}(\\pi_{\\theta_{\\text{old}}}(\\cdot\\mid s)\\,\\|\\,\\pi_\\theta(\\cdot\\mid s))\\big] \\le \\delta.$$\n\n<p>TRPO solves this constrained problem approximately each iteration: it takes a first-order (linear) model of the objective and a second-order (quadratic) model of the KL constraint, which makes the step a <em>natural gradient</em> step computed via the Fisher information matrix, followed by a line search to enforce the constraint exactly. The KL is measured in <strong>distribution space</strong>, which is what we actually care about — two parameter vectors can be far apart yet define nearly identical policies, or close together yet define wildly different ones, so constraining $\\|\\theta - \\theta_{\\text{old}}\\|$ would be the wrong thing.</p>\n\n<p>TRPO works and gives the guarantee, but it is heavy: you must form Fisher-vector products (conjugate gradient over second-order information), run a backtracking line search, and the whole apparatus is awkward to combine with techniques like parameter sharing between policy and value networks, dropout, or simple first-order optimizers like Adam. This complexity is exactly what PPO was invented to shed.</p>\n\n<h3>PPO: The Clipped Surrogate Objective</h3>\n\n<p>Proximal Policy Optimization (Schulman et al., 2017) keeps the spirit of the trust region — <em>don't move too far</em> — but enforces it with a trick simple enough to write in three lines of code and optimize with ordinary SGD/Adam. The clipped surrogate objective is:</p>\n\n$$L^{\\text{CLIP}}(\\theta) = \\mathbb{E}_t\\Big[\\min\\big(r_t(\\theta)\\,\\hat A_t,\\;\\; \\mathrm{clip}(r_t(\\theta),\\, 1-\\epsilon,\\, 1+\\epsilon)\\,\\hat A_t\\big)\\Big],$$\n\n<p>where $\\hat A_t$ is an advantage estimate (typically from GAE) and $\\epsilon$ is a small hyperparameter, commonly $0.1$ or $0.2$. There are two pieces inside the $\\min$:</p>\n\n<ul>\n<li><strong>The unclipped term</strong> $r_t \\hat A_t$ — the ordinary importance-sampled surrogate.</li>\n<li><strong>The clipped term</strong> $\\mathrm{clip}(r_t, 1-\\epsilon, 1+\\epsilon)\\,\\hat A_t$ — the same thing but with the ratio pinned to the interval $[1-\\epsilon, 1+\\epsilon]$, so it cannot leave the trust region.</li>\n</ul>\n\n<p>The genius is in the $\\min$. We take the <strong>pessimistic (smaller) of the two</strong>. Let us trace through both signs of the advantage, because this is where the mechanism actually lives.</p>\n\n<h4>Case 1: Positive advantage, $\\hat A_t > 0$ (a good action)</h4>\n\n<p>We want to increase $r_t$ (make the good action more likely). The objective $r_t \\hat A_t$ rises as $r_t$ grows. But once $r_t > 1+\\epsilon$, the clipped term $(1+\\epsilon)\\hat A_t$ is constant, and since $\\hat A_t>0$ the clipped value is the smaller one, so the $\\min$ selects it. <strong>The objective flatlines.</strong> Its gradient with respect to $\\theta$ becomes zero — there is no longer any incentive to push $r_t$ higher. The policy is allowed to increase the action's probability, but only up to a $1+\\epsilon$ multiple of the old probability; beyond that, free profit is cut off.</p>\n\n<h4>Case 2: Negative advantage, $\\hat A_t < 0$ (a bad action)</h4>\n\n<p>We want to decrease $r_t$ (make the bad action less likely). Here the clip floor at $1-\\epsilon$ is the relevant boundary. Because $\\hat A_t < 0$, the $\\min$ now selects the <em>more negative</em> of the two terms. For $r_t > 1-\\epsilon$ the unclipped term $r_t\\hat A_t$ is the more negative one and is active, so gradient flows (we keep pushing the probability down). Once $r_t$ falls below $1-\\epsilon$, the clipped term $(1-\\epsilon)\\hat A_t$ is constant; because $\\hat A_t<0$, multiplying by the larger factor $(1-\\epsilon)$ instead of the smaller $r_t$ makes the clipped term the <em>more negative</em> one, so the $\\min$ now selects the constant clipped term. Its gradient is zero, so gradient ascent will <strong>stop driving $r_t$ down</strong> once we have crossed the boundary. Again the trust region is respected.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">The asymmetry that matters</div><p>The clip removes the <em>incentive</em> to move too far — it does not hard-clip the parameters. Crucially, because we take the <em>minimum</em>, the objective is only flattened on the side where the update is \"winning.\" If a step overshoots in the harmful direction (e.g., $\\hat A_t>0$ but $r_t$ ended up below $1-\\epsilon$ from a previous mini-batch), the <strong>unclipped term is still active and pulls the ratio back</strong>. The $\\min$ makes the bound one-sided in a way that always permits <em>undoing</em> excessive moves but never <em>rewarding</em> them.</p></div>\n\n<h4>The clip function, drawn</h4>\n\n<p>It is worth fixing the shape in your mind. Plot $L^{\\text{CLIP}}$ for a single sample as a function of $r$:</p>\n\n<pre><code>  A > 0  (good action)              A < 0  (bad action)\n  objective                         objective\n     |        ____                    |  ____\n     |       /                        |      \\\n     |      /  (flat after 1+e)       |       \\   (flat before 1-e)\n     |     /                          |        \\____\n     +----+----+----- r              +----+----+------ r\n        1-e  1+e                        1-e  1+e\n  rises with slope A until r=1+e,    falls with slope A until r=1-e,\n  then flat (gradient 0)             then flat (gradient 0)</code></pre>\n\n<p>In both cases there is a sloped region (gradient flows, learning happens) and a flat region (gradient is zero, the step is \"satisfied\"). The flat region is the trust region, enforced not by projection but by the disappearance of incentive.</p>\n\n<h3>Worked Example: One Sample, Numbers In Hand</h3>\n\n<p>Let $\\epsilon = 0.2$, so the clip interval is $[0.8,\\,1.2]$. Suppose the data-collecting policy assigned $\\pi_{\\theta_{\\text{old}}}(a\\mid s) = 0.40$ to the action we took, and during optimization the current policy has drifted to $\\pi_\\theta(a\\mid s) = 0.60$. Then</p>\n\n$$r_t(\\theta) = \\frac{0.60}{0.40} = 1.5.$$\n\n<p><strong>Subcase A — the action was good, $\\hat A_t = +3$.</strong> The two terms are:</p>\n\n<ul>\n<li>Unclipped: $r_t \\hat A_t = 1.5 \\times 3 = 4.5$.</li>\n<li>Clipped: $\\mathrm{clip}(1.5,\\,0.8,\\,1.2)\\,\\hat A_t = 1.2 \\times 3 = 3.6$.</li>\n</ul>\n\n<p>The objective is $\\min(4.5,\\,3.6) = 3.6$. Because $r_t = 1.5$ lies beyond the $1.2$ ceiling, the <em>clipped</em> term is chosen. Its derivative with respect to $\\theta$ is zero — no gradient. The optimizer gets no reward for having pushed the probability from $0.40$ all the way to $0.60$; the contribution is capped at the value it would have had at $r_t = 1.2$ (i.e., $\\pi_\\theta = 0.48$). The action was good, but PPO refuses to chase that goodness past the trust region on a single batch.</p>\n\n<p><strong>Subcase B — the action was bad, $\\hat A_t = -3$.</strong> Now:</p>\n\n<ul>\n<li>Unclipped: $r_t \\hat A_t = 1.5 \\times (-3) = -4.5$.</li>\n<li>Clipped: $1.2 \\times (-3) = -3.6$.</li>\n</ul>\n\n<p>The objective is $\\min(-4.5,\\,-3.6) = -4.5$ — the <em>unclipped</em> term, because it is the more negative (pessimistic) one. Its derivative is <em>nonzero</em>: $\\partial(r_t \\hat A_t)/\\partial r_t = \\hat A_t = -3 < 0$. Gradient ascent therefore tries to <strong>decrease</strong> $r_t$, i.e., pull the probability of this bad action back down toward and below the data-collecting level. This is the \"always allowed to undo a bad overshoot\" property in action: even though $r_t$ would be in the clip zone for positive advantages, with negative advantage at $r_t > 1$ the gradient is alive and corrective.</p>\n\n<p>The two subcases together show the full logic: clipping kills the gradient only when the update is moving the ratio <em>too far in the direction the advantage wants</em>; in every other configuration, the gradient stays on to keep the policy honest.</p>\n\n<h3>The Full PPO Objective and the Training Loop</h3>\n\n<p>The clipped surrogate is the heart, but the practical loss adds two standard terms:</p>\n\n$$L_t(\\theta) = \\underbrace{L^{\\text{CLIP}}_t(\\theta)}_{\\text{policy}} - c_1\\, \\underbrace{(V_\\theta(s_t) - V^{\\text{targ}}_t)^2}_{\\text{value loss}} + c_2\\, \\underbrace{H[\\pi_\\theta(\\cdot\\mid s_t)]}_{\\text{entropy bonus}}.$$\n\n<p>The value-function term trains the critic (often a shared network) so advantages are accurate; the entropy bonus $H$ encourages exploration and discourages premature collapse to a deterministic policy. Coefficients $c_1, c_2$ are small and fixed.</p>\n\n<p>The training loop is the key to understanding why clipping is even necessary:</p>\n\n<pre><code>for each iteration:\n    run policy pi_old for T timesteps, collect (s, a, r)   # on-policy rollout\n    compute advantages A_hat via GAE, value targets V_targ\n    theta_old <- theta                                     # freeze the behavior policy\n    for K epochs:                                          # reuse the SAME batch K times\n        for each minibatch:\n            r = pi_theta(a|s) / pi_old(a|s)\n            L = min(r * A_hat, clip(r, 1-eps, 1+eps) * A_hat)\n            theta <- theta + lr * grad(L + value + entropy)</code></pre>\n\n<p>The inner loop reuses one batch of data for $K$ epochs (typically 3–10). After the first epoch $\\pi_\\theta$ no longer equals $\\pi_{\\theta_{\\text{old}}}$, so $r_t$ departs from 1 and the importance-sampling estimate begins to degrade. Without clipping, those later epochs would happily exploit stale data and blow up the policy. The clip ensures that no matter how many epochs you run, the effective update per sample stays bounded — you extract the safe improvement and ignore the rest. This is precisely the sample-efficiency-vs-stability bargain that makes PPO practical.</p>\n\n<h3>Why PPO Is the Practical Default</h3>\n\n<ul>\n<li><strong>Simplicity.</strong> No Fisher matrix, no conjugate gradient, no line search. It is a small modification to the policy-gradient loss that drops into any autodiff framework and trains with Adam.</li>\n<li><strong>Compatibility.</strong> Because it is a first-order objective, it composes effortlessly with shared actor-critic networks, recurrent policies, dropout, layer norm, and large-scale distributed rollout collection.</li>\n<li><strong>Robustness.</strong> A single $\\epsilon$ (around $0.1$–$0.2$) works across a wide range of tasks with little tuning, whereas vanilla policy gradient is exquisitely sensitive to learning rate.</li>\n<li><strong>Sample reuse.</strong> Multiple epochs over each batch give far better data efficiency than the strictly one-step vanilla policy gradient.</li>\n</ul>\n\n<p>The cost is that PPO's clip gives only a <em>heuristic</em> trust region, not TRPO's formal monotonic-improvement guarantee — the clip bounds the per-sample objective but does not bound the expected KL exactly, and a few samples can still produce large ratios within a batch. In practice this trade is overwhelmingly worth it, which is why PPO became the workhorse of modern deep RL and, notably, the policy-optimization algorithm behind <strong>RLHF</strong> — the reinforcement-learning-from-human-feedback step used to align large language models, where $\\pi_{\\theta_{\\text{old}}}$ is the pre-RL model and the KL/clip mechanism keeps the fine-tuned model from drifting catastrophically far from a coherent language model.</p>\n\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>Trust regions are a recurring motif across machine learning: proximal operators in convex optimization, natural gradient and mirror descent, the KL penalty in variational inference, and the very same KL term that anchors an RLHF policy to a reference model. The unifying idea is that <strong>when your objective is only a local approximation of what you truly want, progress should be measured and constrained in the space of distributions you can trust, not the space of parameters you happen to be using.</strong> TRPO states this exactly; PPO states it cheaply; and that cheapness is why PPO, not TRPO, is what you reach for.</p></div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why PPO <em>clips</em> — the pessimism that keeps policy gradients from self-destructing</summary>\n<p>Plain policy gradients are dangerously fragile, and for a reason supervised learning never faces: the data is collected <em>by the current policy</em>. One oversized update can collapse the policy, and then every future rollout is drawn from that broken policy — there's no clean dataset to recover from. So the whole game is taking the <em>biggest step you safely can</em> and no bigger.</p>\n<p>TRPO enforces this with a hard trust region (a KL constraint); PPO gets ~the same effect with a cheap first-order trick — a <strong>clipped surrogate objective</strong>. Let $r_t(\\theta) = \\pi_\\theta(a_t\\mid s_t)/\\pi_{\\text{old}}(a_t\\mid s_t)$ be how much more likely the new policy makes the action taken, and $A_t$ its advantage. PPO maximizes</p>\n$$L^{\\text{CLIP}} = \\mathbb{E}\\big[\\min\\big(r_t A_t,\\; \\text{clip}(r_t,\\,1-\\epsilon,\\,1+\\epsilon)\\,A_t\\big)\\big].$$\n<p>The $\\min$ with the clipped term is the key: once the ratio has moved past $1\\pm\\epsilon$ in the helpful direction, the objective <strong>flattens</strong> — there is no further reward for pushing the probability higher, so no incentive to take a destructive leap. It is a deliberately <em>pessimistic</em> lower bound on the improvement. That one line — simple, first-order, robust — is why PPO became the default policy-gradient method.</p>\n</details>",
          "mcq": [
            {
              "q": "In the PPO clipped objective $\\min\\!\\big(r_t \\hat A_t,\\ \\mathrm{clip}(r_t, 1-\\epsilon, 1+\\epsilon)\\hat A_t\\big)$ with $\\epsilon = 0.2$, suppose $\\hat A_t > 0$ and $r_t = 1.5$. What happens?",
              "choices": [
                "The unclipped term $1.5\\,\\hat A_t$ is selected and the gradient drives $r_t$ higher",
                "The clipped term $1.2\\,\\hat A_t$ is selected and the gradient w.r.t. $\\theta$ is zero",
                "The ratio $r_t$ is hard-reset to $1.2$ in the parameters",
                "The objective becomes negative, penalizing the good action"
              ],
              "answer": 1,
              "explain": "With $\\hat A_t>0$ and $r_t>1+\\epsilon$, the clipped value $1.2\\hat A_t$ is the smaller of the two, so $\\min$ picks it; being constant, it has zero gradient, so there is no incentive to push the probability further."
            },
            {
              "q": "Why does PPO take the $\\min$ of the clipped and unclipped terms rather than always using the clipped term?",
              "choices": [
                "To make the objective differentiable everywhere",
                "To increase the variance of the gradient estimate",
                "So that excessive updates can still be corrected: when a step overshoots harmfully, the unclipped term stays active and pulls the ratio back",
                "Because the clipped term is biased and the unclipped term removes the bias"
              ],
              "answer": 2,
              "explain": "The $\\min$ makes the bound one-sided: it removes the reward for moving too far in the advantage's favored direction, but keeps the gradient alive to undo overshoots (e.g., a positive-advantage action whose ratio fell below $1-\\epsilon$), so the policy can always be pulled back."
            },
            {
              "q": "What is the primary purpose of the importance-sampling ratio $r_t(\\theta) = \\pi_\\theta(a_t\\mid s_t)/\\pi_{\\theta_{\\text{old}}}(a_t\\mid s_t)$ in PPO?",
              "choices": [
                "To normalize the advantages to zero mean",
                "To compute the KL divergence exactly",
                "To replace the value-function baseline",
                "To reweight data collected by the old policy so it estimates the new policy's surrogate objective, enabling multiple epochs of reuse"
              ],
              "answer": 3,
              "explain": "The ratio is an importance weight that lets a batch collected under $\\pi_{\\theta_{\\text{old}}}$ be reused to estimate the objective for the updated $\\pi_\\theta$ across several epochs; its variance grows as policies diverge, which is exactly why the trust region / clip is needed."
            },
            {
              "q": "How does TRPO differ from PPO in enforcing the trust region?",
              "choices": [
                "TRPO imposes an explicit KL-divergence constraint solved via natural gradient and line search, while PPO uses a cheap clipped surrogate optimizable by ordinary SGD",
                "TRPO clips the ratio while PPO uses a hard KL constraint",
                "TRPO constrains the parameter norm $\\|\\theta-\\theta_{\\text{old}}\\|$ while PPO constrains KL",
                "They are identical; PPO is just a faster implementation of TRPO"
              ],
              "answer": 0,
              "explain": "TRPO solves a KL-constrained problem (second-order, Fisher-vector products, line search) giving a monotonic-improvement guarantee; PPO replaces all that with a first-order clipped objective that approximates the same 'stay close' effect at a fraction of the complexity."
            },
            {
              "q": "The lesson stresses that RL is \"crueler\" than supervised learning regarding step size. What is the core reason a single overly large policy update can be unrecoverable?",
              "choices": [
                "The policy network's weights overflow numerically once the gradient exceeds a threshold",
                "The policy generates its own training data, so a bad update shifts the state distribution $d^{\\pi_\\theta}$ and the actions sampled, feeding worse gradients back into the next update",
                "RL uses a fixed dataset that cannot be re-shuffled after a bad batch",
                "The reward signal is delayed, so the optimizer cannot detect the bad step until the episode ends"
              ],
              "answer": 1,
              "explain": "The pathology is the self-reinforcing feedback loop: $\\pi_\\theta$ both is optimized and generates the data, so a bad step degrades the data distribution and thus all future gradients. Supervised learning has a fixed data distribution, which is exactly why a bad step there is only a local annoyance."
            },
            {
              "q": "In the clipped objective with $\\epsilon = 0.2$, suppose $\\hat A_t < 0$ (the action was worse than average) and the new policy makes it more likely, giving $r_t = 0.7$. What is the value of the clipped surrogate term for this sample?",
              "choices": [
                "$0.7\\,\\hat A_t$, because $0.7$ lies outside $[0.8, 1.2]$ but clipping only applies when $\\hat A_t > 0$",
                "$1.2\\,\\hat A_t$, the upper clip bound",
                "$0.8\\,\\hat A_t$, because $r_t = 0.7$ is clipped up to the lower bound $1 - \\epsilon = 0.8$ and the $\\min$ selects it",
                "$\\hat A_t$, because the ratio is reset to $1$ whenever it leaves the trust region"
              ],
              "answer": 2,
              "explain": "With $\\hat A_t<0$, $\\mathrm{clip}(0.7, 0.8, 1.2)=0.8$. The unclipped term is $0.7\\hat A_t$ and the clipped term is $0.8\\hat A_t$; since $\\hat A_t<0$, $0.8\\hat A_t < 0.7\\hat A_t$, so the $\\min$ picks $0.8\\hat A_t$. This caps the incentive to keep increasing a bad action's probability."
            },
            {
              "q": "A practitioner reuses one batch of trajectories collected under $\\pi_{\\theta_{\\text{old}}}$ for many gradient epochs on the PPO objective. Why does this remain approximately valid, and what eventually breaks it?",
              "choices": [
                "It is valid because PPO recomputes the advantages from scratch each epoch; nothing breaks",
                "It is valid only because the clip removes all bias from the importance sampling estimator",
                "It works because the state distribution $d^{\\pi_\\theta}$ is guaranteed constant within a batch",
                "The importance ratio $r_t$ corrects for the mismatch between $\\pi_\\theta$ and $\\pi_{\\theta_{\\text{old}}}$, but as $\\theta$ drifts far from $\\theta_{\\text{old}}$ the ratios become large/small and the off-policy estimate degrades"
              ],
              "answer": 3,
              "explain": "The ratio $r_t = \\pi_\\theta/\\pi_{\\theta_{\\text{old}}}$ is an importance-sampling correction that lets a sample from the old policy estimate the new policy's objective, but importance sampling only stays well-behaved while the policies are close. As $\\theta$ moves far, variance blows up; clipping limits but does not eliminate this degradation."
            },
            {
              "q": "The lesson's analogy is a car whose camera is bolted to the steering wheel. Which design principle of trust-region / PPO methods does this most directly illustrate?",
              "choices": [
                "Limit how far each update can move the policy, because the data (the \"view\") you use for the next correction depends on where this step lands you",
                "Increase the learning rate over time so corrections become sharper as training proceeds",
                "Always steer toward the highest-advantage action regardless of step size",
                "Decouple the value function from the policy so the camera and wheel move independently"
              ],
              "answer": 0,
              "explain": "The camera-on-the-wheel captures that your next observations depend on the current move, so the fix is bounding each step's size, which is precisely what trust regions and the PPO clip enforce. Cranking the learning rate or ignoring step size is the failure mode the analogy warns against."
            },
            {
              "q": "Once $r_t$ for a positive-advantage sample is pushed past $1+\\epsilon$, what does the clipped objective do to that sample's gradient, and why is this the intended behavior?",
              "choices": [
                "It scales the gradient by $1+\\epsilon$ so the update keeps growing but more slowly",
                "It zeroes the gradient contribution from that sample, removing the incentive to push the ratio any further outside the trust region",
                "It flips the gradient sign to actively decrease that action's probability",
                "It leaves the gradient unchanged because clipping only affects the reported objective value, not the backprop"
              ],
              "answer": 1,
              "explain": "For $\\hat A_t>0$ with $r_t>1+\\epsilon$, the $\\min$ selects the constant $(1+\\epsilon)\\hat A_t$, whose derivative w.r.t. $\\theta$ is zero, so that sample stops contributing gradient. This is the mechanism that prevents the policy from moving too far in one direction; it does not flip the sign or keep scaling up."
            },
            {
              "q": "A common misconception is that the PPO clip is just gradient clipping under a different name. Which statement correctly distinguishes them?",
              "choices": [
                "They are identical; both rescale the gradient vector to a fixed norm",
                "Gradient clipping bounds $r_t$, while the PPO clip bounds the gradient norm",
                "The PPO clip bounds the probability ratio $r_t$ in the objective (limiting how much the policy distribution changes), whereas gradient clipping bounds the magnitude of the gradient vector regardless of distribution change",
                "The PPO clip only affects the value-function loss, while gradient clipping affects the policy loss"
              ],
              "answer": 2,
              "explain": "Gradient clipping caps the size of the update step in parameter space; the PPO clip caps how far the policy's output distribution can move (via $r_t$) regardless of the resulting gradient norm. They operate on different quantities, so they are not interchangeable."
            },
            {
              "q": "Suppose the optimal new policy would have $r_t = 3.0$ on a high-advantage sample. With $\\epsilon = 0.2$, what does the clipped objective accomplish, and what limitation remains?",
              "choices": [
                "It hard-constrains $r_t$ so the policy can never reach $3.0$ in any number of updates",
                "It guarantees a monotonic improvement bound, exactly like TRPO's constraint",
                "It rescales the advantage to $\\hat A_t / 3.0$ to keep the effective ratio at $1$",
                "It removes the gradient incentive once $r_t > 1.2$, discouraging a single large jump, but multiple successive PPO updates can still move the policy far over many iterations"
              ],
              "answer": 3,
              "explain": "The clip only flattens the objective beyond $1\\pm\\epsilon$ within a single optimization phase; it discourages a large jump per update but each new round resamples and resets $\\theta_{\\text{old}}$, so cumulative drift over many iterations is allowed. It is a soft heuristic, not the hard monotonic-improvement guarantee that TRPO derives."
            },
            {
              "q": "PPO is usually trained on the advantage $\\hat A_t$ rather than the raw return $G_t$ inside the clipped ratio objective. What is the main benefit relevant to the trust-region motivation?",
              "choices": [
                "Subtracting the value baseline reduces variance of the policy-gradient estimate, giving cleaner update directions so that each bounded step is more likely to be an improvement",
                "Advantages are always positive, so the clip never has to handle the negative case",
                "Advantages make the importance ratio $r_t$ unnecessary",
                "Using returns would make the objective off-policy, while advantages keep it on-policy"
              ],
              "answer": 0,
              "explain": "The advantage centers the signal by subtracting a baseline (the value estimate), which lowers gradient variance without adding bias, so each clipped step points in a more reliable direction. Advantages can be negative, do not replace $r_t$, and both returns and advantages are estimated from the same sampled data."
            },
            {
              "q": "What is a <em>trust region</em> in policy optimization?",
              "choices": [
                "A region of the state space the agent is forbidden from entering",
                "A constraint that keeps each policy update <em>close</em> to the current policy, so the data distribution and the local gradient estimate stay approximately valid",
                "The set of actions that currently have positive advantage",
                "A fixed learning-rate schedule"
              ],
              "answer": 1,
              "explain": "Because the policy generates its own data, a too-large step lands you in a region the old gradient never described — a self-reinforcing collapse. A trust region limits how far each update can move the policy, keeping the surrogate objective an accurate guide."
            },
            {
              "q": "What does PPO's <em>clipped</em> objective accomplish at a high level?",
              "choices": [
                "It clips the gradient's norm to a fixed maximum",
                "It zeroes out all negative advantages",
                "It decays the discount factor $\\gamma$ over training",
                "It discourages the probability ratio $r_t=\\pi_\\theta/\\pi_{\\theta_{\\text{old}}}$ from moving far outside $[1-\\epsilon,1+\\epsilon]$, so no single update changes the policy too much — a cheap, first-order stand-in for a hard trust region"
              ],
              "answer": 3,
              "explain": "PPO removes the incentive to push $r_t$ beyond the clip range: once a positive-advantage action's ratio exceeds $1+\\epsilon$ (or a negative one's drops below $1-\\epsilon$), the objective flattens and its gradient vanishes. This bounds the policy change per update without TRPO's expensive constrained optimization."
            },
            {
              "q": "Why must PPO collect fresh trajectories every iteration rather than train forever on one batch?",
              "choices": [
                "PPO is on-policy: the importance-sampling surrogate is only trustworthy while $\\pi_\\theta$ stays near $\\pi_{\\theta_{\\text{old}}}$, so after a few epochs on a batch you must gather new data with the updated policy",
                "PPO never needs new data; it trains indefinitely on the first batch",
                "PPO requires the full transition model in order to recollect data",
                "PPO learns entirely offline from a fixed, pre-collected dataset"
              ],
              "answer": 0,
              "explain": "The surrogate reweights old data by $r_t=\\pi_\\theta/\\pi_{\\theta_{\\text{old}}}$, an approximation valid only near $\\pi_{\\theta_{\\text{old}}}$. A handful of epochs is fine, but once the policy has moved the importance weights become unreliable — so PPO re-collects on-policy data each round."
            },
            {
              "q": "What does the probability ratio $r_t(\\theta)=\\pi_\\theta(a_t\\mid s_t)/\\pi_{\\theta_{\\text{old}}}(a_t\\mid s_t)$ measure?",
              "choices": [
                "The advantage of the action taken",
                "The entropy of the current policy",
                "How much more ($r_t>1$) or less ($r_t<1$) likely the new policy makes the taken action versus the old policy — it equals 1 at the very start of each update (when $\\theta=\\theta_{\\text{old}}$)",
                "The discounted sum of future rewards"
              ],
              "answer": 2,
              "explain": "$r_t$ is the importance-sampling weight that lets PPO evaluate the new policy's preferences on data drawn from the old one. $r_t=1$ means no change; $r_t>1$ means the update favors that action more, $r_t<1$ less — and clipping bounds exactly this quantity."
            }
          ],
          "flashcards": [
            {
              "front": "Write the PPO clipped surrogate objective.",
              "back": "$L^{\\text{CLIP}}(\\theta) = \\mathbb{E}_t\\big[\\min(r_t\\hat A_t,\\ \\mathrm{clip}(r_t, 1-\\epsilon, 1+\\epsilon)\\hat A_t)\\big]$, where $r_t = \\pi_\\theta(a_t\\mid s_t)/\\pi_{\\theta_{\\text{old}}}(a_t\\mid s_t)$."
            },
            {
              "front": "What is the importance-sampling ratio $r_t(\\theta)$ and what does $r_t=1$ mean?",
              "back": "$r_t(\\theta)=\\pi_\\theta(a_t\\mid s_t)/\\pi_{\\theta_{\\text{old}}}(a_t\\mid s_t)$. $r_t=1$ means the current policy assigns the same probability to the action as the data-collecting policy did (true at the start of every update)."
            },
            {
              "front": "For a POSITIVE advantage, when does the PPO clip stop the gradient, and why?",
              "back": "When $r_t > 1+\\epsilon$. The clipped term $(1+\\epsilon)\\hat A_t$ becomes the smaller (constant) one, $\\min$ selects it, and its gradient is zero — removing any incentive to increase the action's probability further."
            },
            {
              "front": "Why must each large policy step be conservative in policy gradient RL?",
              "back": "The policy generates its own training data, so a large step shifts the state-action distribution; the locally-accurate surrogate (and importance-sampling estimate) then becomes invalid, and bad data can drive the policy into an unrecoverable region."
            },
            {
              "front": "State the trust-region/TRPO constrained objective.",
              "back": "$\\max_\\theta L_{\\theta_{\\text{old}}}(\\theta)$ subject to $\\mathbb{E}_s[\\mathrm{KL}(\\pi_{\\theta_{\\text{old}}}(\\cdot\\mid s)\\,\\|\\,\\pi_\\theta(\\cdot\\mid s))] \\le \\delta$ — maximize the importance-weighted surrogate while keeping the policy within a KL ball."
            },
            {
              "front": "Give three reasons PPO is the practical default over TRPO.",
              "back": "(1) Simplicity: first-order, no Fisher matrix / line search, trains with Adam. (2) Compatibility with shared actor-critic nets, RNNs, dropout. (3) Robustness and sample reuse: one $\\epsilon\\approx0.2$ works broadly, and multiple epochs per batch improve data efficiency."
            }
          ],
          "homework": [
            {
              "prompt": "Sketch the per-sample PPO clipped objective $L^{\\text{CLIP}}$ as a function of the ratio $r$ for both $\\hat A > 0$ and $\\hat A < 0$, using $\\epsilon = 0.2$. Mark the sloped (gradient-flowing) and flat (zero-gradient) regions, and explain in words what the optimizer does when $r$ becomes large (say $r = 2$) in each case.",
              "hint": "Plug $r$ into both terms of the $\\min$ and remember the $\\min$ picks the smaller. The sign of $\\hat A$ flips which term is smaller and which boundary ($1-\\epsilon$ or $1+\\epsilon$) is the active one.",
              "solution": "For $\\hat A>0$: the objective rises linearly with slope $\\hat A$ from $r=0$ up to $r=1.2$, then is flat at $1.2\\hat A$ for all $r>1.2$. (Below $1-\\epsilon$ the unclipped term is the smaller one and still slopes, but the action-encouraging direction is $r>1$.) At $r=2$ the clipped term $1.2\\hat A$ is selected; it is constant, so the gradient is zero and the optimizer gets no further reward for raising the probability — the update is capped. For $\\hat A<0$: the objective falls linearly with slope $\\hat A$ as $r$ increases for all $r>1-\\epsilon$, and for $r<0.8$ it is flat at $0.8\\hat A$. Why flat below 0.8: with $\\hat A<0$, the clipped term $0.8\\hat A$ is the MORE negative (smaller) one there — because multiplying by the larger factor 0.8 instead of $r<0.8$ makes the product more negative — so $\\min$ selects the constant clipped term and the gradient is zero. The key live region: for $r>1$ with $\\hat A<0$ the unclipped term $r\\hat A$ is the more negative and is selected, so the gradient is alive and pushes $r$ down. At $r=2$ with $\\hat A<0$, $\\min(2\\hat A, 1.2\\hat A)=2\\hat A$ (more negative), gradient $=\\hat A<0$, so the optimizer drives $r$ down toward the trust region. Summary: clipping zeros the gradient only when the update moves $r$ too far in the direction the advantage favors; otherwise the gradient stays on to keep or pull the policy back."
            },
            {
              "prompt": "Let $\\epsilon=0.2$, $\\pi_{\\theta_{\\text{old}}}(a\\mid s)=0.5$, and during optimization $\\pi_\\theta(a\\mid s)=0.7$. Compute $r_t$, then evaluate the PPO clipped objective and state whether the gradient w.r.t. $\\theta$ is zero, for (a) $\\hat A_t=+2$ and (b) $\\hat A_t=-2$.",
              "hint": "Clip interval is $[0.8, 1.2]$. Compute $r_t=0.7/0.5$. Form both terms, take the $\\min$, and check whether the selected term is the constant clipped one (gradient zero) or the linear unclipped one (gradient nonzero).",
              "solution": "$r_t = 0.7/0.5 = 1.4$, which exceeds $1+\\epsilon=1.2$. (a) $\\hat A_t=+2$: unclipped $=1.4\\times2=2.8$; clipped $=1.2\\times2=2.4$; $\\min=2.4$, the clipped term. Since it is constant, the gradient w.r.t. $\\theta$ is ZERO — PPO refuses to reward pushing the good action past $r=1.2$. (b) $\\hat A_t=-2$: unclipped $=1.4\\times(-2)=-2.8$; clipped $=1.2\\times(-2)=-2.4$; $\\min=-2.8$, the unclipped term. Its derivative is $\\hat A_t=-2\\ne0$, so the gradient is NONZERO and drives $r_t$ back down — correcting the overshoot on a bad action even though $r_t$ is outside the clip range."
            },
            {
              "prompt": "Explain why PPO can reuse the same batch of rollouts for several optimization epochs while vanilla policy gradient cannot — and how the clip keeps this safe. Reference the importance-sampling ratio in your answer.",
              "hint": "Think about what the gradient estimator assumes about the data distribution, and what changes to $r_t$ after the first epoch.",
              "solution": "Vanilla policy gradient uses $\\mathbb{E}_{a\\sim\\pi_\\theta}[\\nabla\\log\\pi_\\theta\\,\\hat A]$, an on-policy estimator that is only unbiased when the data was sampled from the current $\\pi_\\theta$. After a single update $\\theta$ changes, so the existing batch is off-policy and must be discarded. PPO instead optimizes the importance-weighted surrogate with ratio $r_t=\\pi_\\theta/\\pi_{\\theta_{\\text{old}}}$, which explicitly corrects for the mismatch between the data-collecting policy $\\pi_{\\theta_{\\text{old}}}$ and the current $\\pi_\\theta$. This lets the same batch be reused for $K$ epochs: at epoch 1, $r_t=1$; in later epochs $r_t$ drifts from 1 as $\\pi_\\theta$ moves. The danger is that importance weights have unbounded variance — large $r_t$ from stale data can produce huge, destabilizing updates. The clip caps the effective contribution of any sample to the $[1-\\epsilon,1+\\epsilon]$ range (by zeroing the gradient once $r_t$ leaves the favored side of that interval), so additional epochs extract the trustworthy improvement and ignore the rest. Thus PPO gains sample efficiency from reuse while the clip provides the stability that raw importance sampling would lack."
            }
          ],
          "examples": [
            {
              "title": "Clipping a single PPO surrogate term by hand",
              "body": "You collect one transition under the old policy with advantage estimate $\\hat{A} = +2$ and old action probability $\\pi_{\\theta_{\\text{old}}}(a\\mid s) = 0.40$. Using the PPO clipped objective with $\\epsilon = 0.2$, compute the per-sample objective $L^{\\text{CLIP}}$ for two candidate new policies: (a) $\\pi_\\theta(a\\mid s) = 0.50$, and (b) $\\pi_\\theta(a\\mid s) = 0.60$. Which update does the clip suppress?",
              "solution": "The PPO clipped surrogate for a single sample is\n$$L^{\\text{CLIP}} = \\min\\!\\Big(r(\\theta)\\,\\hat{A},\\ \\operatorname{clip}\\big(r(\\theta),\\,1-\\epsilon,\\,1+\\epsilon\\big)\\,\\hat{A}\\Big),$$\nwhere $r(\\theta) = \\dfrac{\\pi_\\theta(a\\mid s)}{\\pi_{\\theta_{\\text{old}}}(a\\mid s)}$ is the probability ratio. With $\\epsilon = 0.2$ the clip range is $[1-0.2,\\,1+0.2] = [0.8,\\,1.2]$.\n\n<strong>Case (a): $\\pi_\\theta = 0.50$.</strong>\nRatio: $r = \\dfrac{0.50}{0.40} = 1.25$.\nUnclipped term: $r\\hat{A} = 1.25 \\times 2 = 2.50$.\nClipped ratio: $r = 1.25 > 1.2$, so $\\operatorname{clip}(1.25, 0.8, 1.2) = 1.2$, giving clipped term $1.2 \\times 2 = 2.40$.\nObjective: $\\min(2.50,\\ 2.40) = 2.40$.\n\n<strong>Case (b): $\\pi_\\theta = 0.60$.</strong>\nRatio: $r = \\dfrac{0.60}{0.40} = 1.50$.\nUnclipped term: $r\\hat{A} = 1.50 \\times 2 = 3.00$.\nClipped ratio: $\\operatorname{clip}(1.50, 0.8, 1.2) = 1.2$, giving clipped term $1.2 \\times 2 = 2.40$.\nObjective: $\\min(3.00,\\ 2.40) = 2.40$.\n\n<strong>Interpretation.</strong> Because $\\hat{A} > 0$, we want to increase $\\pi_\\theta(a\\mid s)$. But both candidates push the ratio past $1.2$, so both objectives are pinned at the same value $2.40$. Crucially, the gradient of $L^{\\text{CLIP}}$ with respect to $\\theta$ is <em>zero</em> in this clipped region (the objective no longer depends on $\\pi_\\theta$). So moving from $0.50$ to $0.60$ buys <strong>no extra reward in the surrogate</strong>: the clip removes the incentive to keep enlarging the ratio past $1+\\epsilon$, which is exactly how PPO keeps the new policy from sprinting away from $\\theta_{\\text{old}}$.\n\n<strong>Answer.</strong> $L^{\\text{CLIP}}_{(a)} = L^{\\text{CLIP}}_{(b)} = 2.40$. The clip suppresses both over-large updates equally — neither $0.50$ nor $0.60$ is rewarded beyond the $r = 1.2$ ceiling."
            },
            {
              "title": "Why the clip is asymmetric: a negative-advantage trap",
              "body": "An action turned out badly: $\\hat{A} = -3$ with old probability $\\pi_{\\theta_{\\text{old}}}(a\\mid s) = 0.50$ and $\\epsilon = 0.2$. Compute $L^{\\text{CLIP}}$ for (a) a cautious decrease to $\\pi_\\theta = 0.45$, and (b) an aggressive crash to $\\pi_\\theta = 0.10$. Show that the clip DOES cap case (b) — limiting the credited reward and flattening the gradient — and explain why that is the intended behavior.",
              "solution": "Same clipped surrogate as before, $L^{\\text{CLIP}} = \\min\\!\\big(r\\hat{A},\\ \\operatorname{clip}(r,0.8,1.2)\\,\\hat{A}\\big)$, with clip range $[0.8,\\,1.2]$ and now $\\hat{A} = -3$.\n\n<strong>Case (a): $\\pi_\\theta = 0.45$.</strong>\nRatio: $r = \\dfrac{0.45}{0.50} = 0.90$ (inside $[0.8,1.2]$).\nUnclipped term: $r\\hat{A} = 0.90 \\times (-3) = -2.70$.\nClipped ratio stays $0.90$, clipped term $= 0.90 \\times (-3) = -2.70$.\nObjective: $\\min(-2.70,\\ -2.70) = -2.70$.\n\n<strong>Case (b): $\\pi_\\theta = 0.10$.</strong>\nRatio: $r = \\dfrac{0.10}{0.50} = 0.20$.\nUnclipped term: $r\\hat{A} = 0.20 \\times (-3) = -0.60$.\nClipped ratio: $r = 0.20 < 0.8$, so $\\operatorname{clip}(0.20,0.8,1.2) = 0.8$, clipped term $= 0.8 \\times (-3) = -2.40$.\nObjective: $\\min(-0.60,\\ -2.40) = -2.40$.\n\n<strong>The asymmetry.</strong> Watch which branch the $\\min$ selects. With $\\hat{A} < 0$ we are <em>maximizing a negative quantity</em>, i.e. we want it as close to $0$ as possible. The aggressive crash gives unclipped value $-0.60$ (very attractive!) but the clipped value is $-2.40$, and $\\min(-0.60, -2.40) = -2.40$ — the $\\min$ deliberately picks the <strong>worse (more negative)</strong> clipped branch. So the surrogate refuses to credit the policy for slashing $r$ all the way to $0.20$: it is rewarded only as if $r = 0.8$. This is the clip capping case (b): the objective is held at $-2.40$ instead of the tempting $-0.60$.\n\n<strong>Why this is the intended behavior.</strong> Once $r < 0.8$ the objective is flat at $-2.40$, so its gradient with respect to $\\theta$ is <em>zero</em> — the clip turns off the incentive to keep driving $\\pi_\\theta$ lower. Contrast with the <em>unclipped</em> objective $r\\hat{A}$, which would have rewarded the crash with $-0.60$ and an active gradient pulling $\\pi_\\theta$ even lower toward $0$. That unbounded incentive is precisely the runaway, self-reinforcing update the lesson warns about: a single batch could drive $\\pi_\\theta(a\\mid s)$ to near zero, change the visited-state distribution $d^{\\pi_\\theta}$, and invalidate the advantage estimates the step was based on. (The asymmetry is in the ratio direction: for $\\hat{A}<0$ the binding cap is the lower edge $r=0.8$, whereas for $\\hat{A}>0$ it was the upper edge $r=1.2$.)\n\n<strong>Answer.</strong> $L^{\\text{CLIP}}_{(a)} = -2.70$ (unclipped, normal gradient) and $L^{\\text{CLIP}}_{(b)} = -2.40$ (clipped at the $r = 0.8$ edge, zero gradient). The clip caps the over-aggressive probability reduction and turns off its reward gradient, confining each update to a trust region near $\\theta_{\\text{old}}$ — the same protection seen for positive advantages, now on the lower side of the ratio."
            }
          ]
        }
      ]
    },
    {
      "id": "rl-practice-frontiers",
      "title": "Exploration, Practice, and Connections",
      "lessons": [
        {
          "id": "rl-exploration",
          "title": "Exploration Strategies",
          "minutes": 14,
          "content": "<h3>Why exploration is the hard part</h3>\n<p>In supervised learning, the data is given to you. In reinforcement learning, <strong>the agent generates its own data by acting</strong>, and an action it never tries is a reward it can never learn about. This creates the defining tension of RL: the <strong>exploration–exploitation tradeoff</strong>. Exploit, and you cash in on what you already believe is best. Explore, and you spend a turn gathering information that may reveal something better — or may simply be wasted. Naive policies that always pick the current best estimate (pure greedy) can lock onto a mediocre option forever, because they never collect the evidence that would overturn their belief.</p>\n<p>$\\varepsilon$-greedy — act greedily with probability $1-\\varepsilon$, act uniformly at random otherwise — is the first exploration scheme everyone learns, and it works surprisingly well. But it is <em>blind</em>: it explores by flipping a coin, treating a barely-tried action and an exhaustively-tested one identically, and it keeps wasting exploration on options it has already proven to be bad. This lesson surveys smarter strategies — <strong>optimism under uncertainty (UCB)</strong>, <strong>Boltzmann/softmax</strong>, <strong>Thompson sampling</strong>, and <strong>intrinsic-motivation/curiosity bonuses</strong> — and gives us a clean testbed and metric to compare them: the multi-armed bandit and <em>regret</em>.</p>\n\n<h3>The multi-armed bandit: a pure-exploration testbed</h3>\n<p>Strip an RL problem down to its bones — remove state, remove transitions, remove the long-horizon credit-assignment problem — and you are left with the <strong>multi-armed bandit (MAB)</strong>. There are $K$ actions (\"arms\"). At each timestep $t = 1, 2, \\dots, T$ you pull one arm $A_t \\in \\{1,\\dots,K\\}$ and receive a reward $R_t$ drawn from that arm's fixed but unknown distribution. Arm $a$ has an unknown mean $q_*(a) = \\mathbb{E}[R_t \\mid A_t = a]$. The name comes from \"one-armed bandit,\" slang for a slot machine; imagine a row of $K$ of them.</p>\n<p>The bandit is the ideal exploration testbed precisely because it has <strong>no state and no delayed consequences</strong>. The only thing your action affects is the immediate reward and the <em>information</em> you gain. So whatever performance gap appears between two strategies is attributable purely to how they handle the explore–exploit tradeoff, with nothing else muddying the picture. (Contextual bandits add a state/feature vector but no transitions; full RL adds transitions on top. The bandit is the base case.)</p>\n\n<div class=\"callout sage\">\n<div class=\"c-tag\">Why it matters for ML</div>\n<p>Bandits are not just a teaching toy — they run live in production. A/B testing, ad and news-article selection, recommender cold-start, hyperparameter search (Hyperband, Successive Halving), and clinical-trial design are all bandit problems. The exact algorithms below ship in real systems.</p>\n</div>\n\n<h4>Regret: the right way to score exploration</h4>\n<p>How do we measure success? Raw cumulative reward is hard to interpret across problems. Instead we measure how much we <em>lost</em> relative to an oracle that knew the best arm from the start. Let $q_* = \\max_a q_*(a)$ be the value of the optimal arm. The <strong>(expected) cumulative regret</strong> after $T$ steps is</p>\n$$L_T = \\sum_{t=1}^{T} \\big( q_* - q_*(A_t) \\big) = T\\,q_* - \\sum_{t=1}^{T} q_*(A_t).$$\n<p>Equivalently, writing the <em>gap</em> $\\Delta_a = q_* - q_*(a)$ and letting $N_T(a)$ be the number of times arm $a$ was pulled, regret is the gap-weighted count of suboptimal pulls:</p>\n$$L_T = \\sum_{a} \\Delta_a \\, \\mathbb{E}[N_T(a)].$$\n<p>Regret is always $\\ge 0$, and an algorithm is \"good\" if its regret grows <strong>sublinearly</strong> in $T$ — meaning average per-step regret $L_T / T \\to 0$, so it eventually plays optimally almost all the time. A few benchmarks make the scale concrete:</p>\n<ul>\n<li><strong>Linear regret</strong> ($L_T = \\Theta(T)$): the mark of failure. Pure greedy and fixed-$\\varepsilon$ greedy both suffer linear regret — fixed $\\varepsilon$ keeps pulling random (often bad) arms forever, so it loses a constant $\\approx \\varepsilon \\cdot \\bar\\Delta$ every step.</li>\n<li><strong>Logarithmic regret</strong> ($L_T = \\Theta(\\log T)$): the gold standard for stochastic bandits. The Lai–Robbins lower bound proves <em>no</em> algorithm can beat $\\Omega(\\log T)$ asymptotically, and UCB and Thompson sampling both achieve it.</li>\n</ul>\n\n<div data-viz=\"rl-bandit\"></div>\n<h3>Strategy 1 — Optimism under uncertainty: UCB</h3>\n<p>The guiding principle is a beautiful heuristic: <strong>\"optimism in the face of uncertainty.\"</strong> When you are unsure about an arm, act <em>as if</em> it is as good as it plausibly could be. Why is that sensible? Either the optimistic guess is right — great, you found a good arm — or it is wrong, in which case pulling it teaches you so, shrinking your uncertainty and removing it from future contention. Either way you make progress, and crucially you only over-explore arms you are <em>uncertain</em> about, never arms you have already pinned down as bad.</p>\n<p>The <strong>Upper Confidence Bound (UCB1)</strong> algorithm operationalizes this. Maintain the empirical mean $\\hat{Q}_t(a)$ and pull count $N_t(a)$. At each step choose</p>\n$$A_t = \\arg\\max_{a} \\left[ \\hat{Q}_t(a) + c\\,\\sqrt{\\frac{\\ln t}{N_t(a)}}\\,\\right].$$\n<p>The first term is the <em>exploitation</em> value (how good we think the arm is). The second term is an <em>exploration bonus</em> — an upper confidence width on our estimate. Read it carefully, because the algorithm's whole behavior is in this term:</p>\n<ul>\n<li>The bonus <strong>shrinks as $N_t(a)$ grows</strong> ($\\sqrt{1/N_t(a)}$): the more we sample an arm, the tighter our estimate, the smaller its uncertainty. This matches the statistics — the standard error of a mean falls like $1/\\sqrt{N}$.</li>\n<li>The bonus <strong>grows with $\\ln t$</strong>: as total time passes, arms we have been ignoring become relatively more uncertain, so they get nudged back into consideration. This prevents permanent neglect.</li>\n<li>An arm with $N_t(a) = 0$ has an infinite bonus, so <strong>UCB tries every arm once</strong> before anything else.</li>\n<li>$c > 0$ controls the optimism level (the standard theoretical choice is $c = \\sqrt{2}$).</li>\n</ul>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>UCB doesn't ask \"which arm looks best?\" It asks \"which arm <em>could</em> plausibly be best, given how little I know about it?\" An untested arm with a wide confidence interval can win even with a low mean — because its <em>upper</em> bound is high. As evidence accumulates, the bound collapses toward the true mean and the bluff is called.</p>\n</div>\n\n<h3>Strategy 2 — Boltzmann / softmax exploration</h3>\n<p>$\\varepsilon$-greedy treats all non-greedy actions equally: when it explores, the second-best arm and the worst arm are picked with the same probability. That is wasteful. <strong>Boltzmann (softmax) exploration</strong> fixes this by making selection probability a smooth function of estimated value:</p>\n$$\\pi_t(a) = \\frac{\\exp\\!\\big(\\hat{Q}_t(a)/\\tau\\big)}{\\sum_{b} \\exp\\!\\big(\\hat{Q}_t(b)/\\tau\\big)}.$$\n<p>The <strong>temperature</strong> $\\tau > 0$ interpolates between two extremes. As $\\tau \\to \\infty$, all exponents go to zero and the policy becomes <em>uniform</em> (pure exploration). As $\\tau \\to 0$, the largest $\\hat{Q}$ dominates and the policy becomes <em>greedy</em> (pure exploitation). In between, better-looking arms get more probability, but proportionally — a small value gap means a small probability gap. A common practice is to <em>anneal</em> $\\tau$ downward over time, exploring broadly early and committing later.</p>\n<p>This is the same softmax you know from classification heads and from policy-gradient methods, which is no coincidence: a policy network with a softmax output over discrete actions <em>is</em> Boltzmann exploration with $\\tau$ folded into the logit scale, and entropy-regularized RL (e.g. soft actor-critic, the maximum-entropy framework) makes this temperature an explicit, principled knob. Boltzmann's weakness is that it scores arms purely by estimated <em>value</em> and ignores <em>uncertainty</em>: a confidently-known mediocre arm and a barely-sampled arm with the same $\\hat{Q}$ get identical probability, whereas UCB and Thompson would treat them very differently.</p>\n\n<h3>Strategy 3 — Thompson sampling (probability matching)</h3>\n<p>Thompson sampling is the Bayesian's answer, and it is older (1933) than almost everything else in RL. Maintain a <strong>posterior distribution</strong> over each arm's mean. To choose an action: draw one random sample from each arm's posterior, then play the arm whose <em>sample</em> is highest. You act greedily — but with respect to a randomly sampled, hallucinated world drawn in proportion to how plausible it is.</p>\n<p>This is <strong>probability matching</strong>: an arm is played with exactly the probability that it is, according to the current posterior, the optimal arm. Well-explored arms have tight posteriors and rarely produce surprising samples; poorly-explored arms have wide posteriors and occasionally sample high, earning a pull. Exploration emerges automatically from posterior uncertainty — no $\\varepsilon$, no temperature, no bonus constant to tune.</p>\n<p>The canonical case is the <strong>Bernoulli bandit</strong> (rewards are 0/1). Put a Beta prior on each arm's success probability; the Beta is conjugate to the Bernoulli, so updates are trivial bookkeeping of successes and failures:</p>\n<pre><code>For each arm a: keep counts (S_a, F_a), prior Beta(1, 1)\nLoop:\n    for each arm a:  theta_a ~ Beta(1 + S_a, 1 + F_a)   # sample\n    pull arm  A = argmax_a theta_a\n    observe reward r in {0, 1}\n    if r == 1: S_A += 1   else: F_A += 1                  # posterior update\n</code></pre>\n<p>Despite its simplicity, Thompson sampling achieves the optimal $O(\\log T)$ regret and often <em>beats</em> UCB empirically. It is widely used in industry precisely because it is easy to implement, naturally handles delayed/batched feedback, and degrades gracefully.</p>\n<div class=\"callout violet\">\n<div class=\"c-tag\">Big picture</div>\n<p>Notice the unifying theme. UCB injects optimism <em>deterministically</em> via an additive bonus; Thompson injects it <em>stochastically</em> via posterior sampling. Both make exploration <strong>proportional to uncertainty</strong> rather than blind — that is the single idea that separates principled exploration from $\\varepsilon$-greedy. Carry it into deep RL and \"uncertainty\" becomes the frontier: ensembles, bootstrapped DQN, and Bayesian neural nets are all attempts to estimate the confidence width that UCB and Thompson get for free in a tabular bandit.</p>\n</div>\n\n<h3>Strategy 4 — Intrinsic motivation and curiosity for sparse rewards</h3>\n<p>Everything above assumes you receive an informative reward on every pull. Real RL problems often do not: in a game where reward arrives only at the very end, or a robot that must complete a long sequence of subtasks before any payoff, the extrinsic reward is <strong>sparse</strong> — almost always zero. Here $\\varepsilon$-greedy, UCB, and friends are nearly useless, because there is no reward signal to distinguish good exploration from bad: random flailing produces zero, and so does everything else.</p>\n<p>The fix is to manufacture an <strong>intrinsic reward</strong> $r^{\\text{int}}_t$ that rewards the agent for <em>novelty or learning progress</em>, and optimize $r_t = r^{\\text{ext}}_t + \\beta\\, r^{\\text{int}}_t$. This is the deep-RL descendant of UCB's \"bonus for the unfamiliar.\" Major families:</p>\n<ul>\n<li><strong>Count-based bonuses.</strong> Generalize UCB's $1/\\sqrt{N(a)}$ to states: reward the agent $\\propto 1/\\sqrt{N(s)}$ for visiting rarely-seen states. In high-dimensional spaces exact counts are impossible, so <em>pseudo-counts</em> are derived from a density model over states.</li>\n<li><strong>Prediction-error / curiosity (ICM).</strong> Train a forward model that predicts the next state's features from the current state and action; use its <em>prediction error</em> as intrinsic reward. The agent is drawn to transitions it cannot yet predict — i.e. things it hasn't learned. A learned-feature encoder prevents the agent from getting hypnotized by inherently unpredictable noise (the classic \"noisy-TV problem\").</li>\n<li><strong>Random Network Distillation (RND).</strong> Reward the prediction error of a network trying to mimic a fixed, random target network. Error is high on novel states (the predictor hasn't seen them) and low on familiar ones — a clean, stable novelty signal that helped crack hard exploration games like <em>Montezuma's Revenge</em>.</li>\n</ul>\n\n<h3>Worked example: one step of UCB by hand</h3>\n<p>A 3-armed bandit, with $c = \\sqrt{2} \\approx 1.414$. Suppose after some play we have, at the start of timestep $t = 11$:</p>\n<ul>\n<li>Arm 1: $\\hat{Q}=0.60$, $N=8$</li>\n<li>Arm 2: $\\hat{Q}=0.50$, $N=1$</li>\n<li>Arm 3: $\\hat{Q}=0.55$, $N=2$</li>\n</ul>\n<p>Greedy would pick Arm 1 ($\\hat{Q}=0.60$, the highest mean). Let's see what UCB does. The bonus is $c\\sqrt{\\ln t / N}$ with $\\ln 11 \\approx 2.398$.</p>\n<p><strong>Arm 1:</strong> bonus $= 1.414\\sqrt{2.398/8} = 1.414\\sqrt{0.2998} = 1.414 \\times 0.5475 = 0.774$. Score $= 0.60 + 0.774 = 1.374$.</p>\n<p><strong>Arm 2:</strong> bonus $= 1.414\\sqrt{2.398/1} = 1.414 \\times 1.549 = 2.190$. Score $= 0.50 + 2.190 = 2.690$.</p>\n<p><strong>Arm 3:</strong> bonus $= 1.414\\sqrt{2.398/2} = 1.414\\sqrt{1.199} = 1.414 \\times 1.095 = 1.548$. Score $= 0.55 + 1.548 = 2.098$.</p>\n<p>UCB pulls <strong>Arm 2</strong> — the arm with the <em>lowest</em> estimated value! It does so because Arm 2 has been pulled only once; its enormous uncertainty bonus dominates. UCB is correctly saying: \"I have barely tested Arm 2, so I cannot rule it out — let me find out.\" This is exactly the behavior $\\varepsilon$-greedy lacks: $\\varepsilon$-greedy would explore Arm 2 and Arm 3 with equal probability and would never preferentially target the <em>least-known</em> arm. As pulls accumulate, Arm 2's bonus shrinks; if its true mean really is low, its score will fall below Arm 1's and UCB will stop wasting pulls on it.</p>\n\n<h3>Choosing a strategy</h3>\n<ul>\n<li><strong>Need a quick, robust baseline / nonstationary rewards?</strong> $\\varepsilon$-greedy (constant $\\varepsilon$ tracks drift; decaying $\\varepsilon$ for stationary problems). Simple and hard to beat as a starting point.</li>\n<li><strong>Stationary stochastic bandit, want strong guarantees?</strong> UCB or Thompson — both achieve optimal $O(\\log T)$ regret; Thompson is often easier and empirically stronger, UCB is deterministic and easy to reason about.</li>\n<li><strong>Want value-proportional randomization / a differentiable policy?</strong> Boltzmann/softmax — and it connects directly to policy gradients and max-entropy RL.</li>\n<li><strong>Sparse or absent extrinsic reward (deep RL)?</strong> Intrinsic motivation — count/pseudo-count bonuses, curiosity (ICM), or RND.</li>\n</ul>\n<p>The thread running through all of it: blind exploration ($\\varepsilon$-greedy) wastes effort uniformly; <em>directed</em> exploration spends its budget where uncertainty — and therefore potential information — is greatest. That principle scales from a row of slot machines all the way up to agents exploring worlds they have never seen.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why an agent must sometimes act against its own knowledge</summary>\n<p>Here's the bind: to earn reward you should <em>exploit</em> the best action you currently know — but you only learn which action is best by <em>exploring</em> ones you're unsure about. An agent that always exploits its current estimate can lock onto an action that looked good from one lucky try and never discover the genuinely better option it under-sampled. Some deliberate sub-optimal action is the price of information.</p>\n<p>$\\varepsilon$-greedy pays that price bluntly: act greedily, but a fraction $\\varepsilon$ of the time pick at random. <b>UCB</b> pays it intelligently — it adds an optimism bonus $\\sqrt{\\frac{2 \\ln t}{N(a)}}$ to each action's estimate, large for actions tried few times ($N(a)$ small) and shrinking as evidence accumulates. So uncertainty itself attracts exploration, and the pull fades once an action is well understood.</p>\n<p>The \"aha\": exploration isn't noise to be minimized — it's how the agent buys the information that makes future exploitation worth anything. The art is spending it where uncertainty is highest (UCB) rather than uniformly at random ($\\varepsilon$-greedy), and tapering it as the estimates firm up.</p>\n</details>\n",
          "mcq": [
            {
              "q": "In the multi-armed bandit, an algorithm is considered good if its cumulative regret $L_T$ grows...",
              "choices": [
                "Linearly in $T$ ($\\Theta(T)$)",
                "Sublinearly, e.g. logarithmically ($\\Theta(\\log T)$)",
                "Exponentially in $T$",
                "As a constant independent of $T$"
              ],
              "answer": 1,
              "explain": "Sublinear (logarithmic) regret means per-step regret $L_T/T \\to 0$, so the agent eventually plays near-optimally; the Lai-Robbins bound shows $\\Omega(\\log T)$ is the best achievable. Constant regret is impossible because every arm must be sampled at least a little."
            },
            {
              "q": "Using UCB1 with $c=\\sqrt{2}$ at time $t$ with $\\ln t = 4$, arm A has $\\hat{Q}=0.9, N=16$ and arm B has $\\hat{Q}=0.5, N=1$. Which arm does UCB select?",
              "choices": [
                "Arm A, because its estimated mean is higher",
                "Arm B, because its uncertainty bonus dominates",
                "Either is equally likely (UCB randomizes)",
                "Neither — UCB pulls the least recently used arm"
              ],
              "answer": 1,
              "explain": "Arm A score = 0.9 + 1.414*sqrt(4/16) = 0.9 + 0.707 = 1.607. Arm B score = 0.5 + 1.414*sqrt(4/1) = 0.5 + 2.828 = 3.328. B's small N gives a huge bonus, so UCB explores it despite the lower mean."
            },
            {
              "q": "Why are intrinsic-motivation / curiosity bonuses needed in sparse-reward problems where UCB and $\\varepsilon$-greedy struggle?",
              "choices": [
                "They reduce the variance of the value estimate using importance sampling",
                "They provide a learning/novelty signal so the agent is guided even when extrinsic reward is almost always zero",
                "They guarantee logarithmic regret in continuous state spaces",
                "They eliminate the need for a discount factor"
              ],
              "answer": 1,
              "explain": "When extrinsic reward is nearly always zero, value-based exploration has no signal to act on. An intrinsic reward for novelty or prediction error (count bonuses, ICM, RND) gives the agent a dense gradient toward unexplored regions."
            },
            {
              "q": "What fundamental information does Boltzmann (softmax) exploration ignore that both UCB and Thompson sampling use?",
              "choices": [
                "The estimated mean value of each arm",
                "The total number of timesteps elapsed",
                "The uncertainty / confidence in each arm's estimate",
                "The reward received on the previous step"
              ],
              "answer": 2,
              "explain": "Softmax assigns probability purely from estimated value $\\hat{Q}$, so a confidently-bad arm and a barely-sampled arm with equal $\\hat{Q}$ are treated identically. UCB (via its bonus) and Thompson (via posterior width) both explicitly exploit uncertainty."
            },
            {
              "q": "What property makes the multi-armed bandit the ideal pure-exploration testbed, distinguishing it from full RL?",
              "choices": [
                "It has no state and no delayed consequences, so an action affects only the immediate reward and the information gained",
                "Its rewards are always deterministic, so there is no noise to average out",
                "It guarantees that a greedy policy converges to the optimal arm",
                "It includes a feature vector (context) but omits the reward signal"
              ],
              "answer": 0,
              "explain": "The bandit strips out state, transitions, and long-horizon credit assignment, so any performance gap between strategies is attributable purely to how they handle the explore-exploit tradeoff."
            },
            {
              "q": "In UCB1, why is every arm guaranteed to be pulled at least once before any arm is pulled a second time?",
              "choices": [
                "The empirical mean $\\hat{Q}$ is initialized to $+\\infty$ for unseen arms",
                "An arm with $N_t(a)=0$ gives a bonus $c\\sqrt{\\ln t / 0}$ that is effectively infinite, so it dominates the score",
                "UCB explicitly hard-codes a round-robin initialization phase separate from the formula",
                "The exploitation term forces selection of the lowest-value arm first"
              ],
              "answer": 1,
              "explain": "Because the uncertainty bonus $c\\sqrt{\\ln t / N_t(a)}$ blows up as $N_t(a)\\to 0$, any never-tried arm has an unbounded score and must be selected, so UCB tries every arm once."
            },
            {
              "q": "Thompson sampling and UCB both make exploration proportional to uncertainty, yet they inject optimism differently. How?",
              "choices": [
                "UCB injects optimism stochastically via posterior sampling; Thompson injects it deterministically via a bonus",
                "UCB adds a deterministic bonus to the mean; Thompson draws a random sample from each arm's posterior and plays the highest",
                "Both add the identical $c\\sqrt{\\ln t / N}$ bonus but UCB rounds it to an integer",
                "Thompson ignores uncertainty entirely and only matches empirical means"
              ],
              "answer": 1,
              "explain": "UCB injects optimism deterministically through an additive confidence bonus, while Thompson injects it stochastically by sampling each arm's posterior and acting greedily on the hallucinated sample."
            },
            {
              "q": "As the temperature $\\tau \\to \\infty$ in Boltzmann (softmax) exploration, what does the action-selection policy converge to?",
              "choices": [
                "A uniform random policy that explores all arms equally",
                "A pure-greedy policy that always picks the highest-value arm",
                "A policy identical to UCB with $c=\\sqrt{2}$",
                "A policy that never selects the current best arm"
              ],
              "answer": 0,
              "explain": "As $\\tau \\to \\infty$ all scaled exponents $Q(a)/\\tau \\to 0$, so $e^{Q(a)/\\tau}\\to 1$ for every arm, flattening the distribution into a uniform policy (pure exploration); $\\tau \\to 0$ instead recovers pure-greedy selection of the top arm."
            },
            {
              "q": "You run Thompson sampling on a Bernoulli bandit with a $\\text{Beta}(1,1)$ prior on each arm. Arm X has been pulled 10 times with 9 successes; arm Y has been pulled 2 times with 2 successes. On the next decision step, which statement best describes how the two arms compete?",
              "choices": [
                "Arm Y is chosen deterministically because its empirical success rate (1.0) exceeds arm X's (0.9)",
                "Arm X is always chosen because it has more total successes (9 > 2)",
                "Each arm draws a sample from its posterior — $\\text{Beta}(10,2)$ for X, $\\text{Beta}(3,1)$ for Y — and the higher sample wins; Y's wider posterior means it still wins a meaningful fraction of the time",
                "Both posteriors are identical because they share the same $\\text{Beta}(1,1)$ prior, so the choice is a fair coin flip"
              ],
              "answer": 2,
              "explain": "Thompson updates to $\\text{Beta}(1+S,1+F)$: X is $\\text{Beta}(10,2)$, Y is $\\text{Beta}(3,1)$. Selection is by sampling, not by comparing point estimates, so Y's wide posterior (few pulls) occasionally samples above X — that is exactly how exploration emerges. Neither arm is chosen deterministically."
            },
            {
              "q": "Fixed-$\\varepsilon$ greedy (constant $\\varepsilon$, never decayed) suffers linear regret $L_T = \\Theta(T)$, the mark of failure. What is the underlying reason?",
              "choices": [
                "It can never identify which arm has the highest mean, even with infinite samples",
                "Even after the best arm is known, it keeps spending a constant fraction $\\approx \\varepsilon$ of steps on uniformly random (often suboptimal) arms forever, losing $\\approx \\varepsilon\\bar\\Delta$ per step",
                "The empirical means $\\hat{Q}$ are biased and never converge to $q_*(a)$",
                "Its exploration bonus grows with $\\ln t$, so total regret accumulates logarithmically"
              ],
              "answer": 1,
              "explain": "Fixed-$\\varepsilon$ greedy estimates the best arm just fine, but it never stops exploring: a constant $\\varepsilon$ fraction of pulls go to random arms every step, incurring a constant per-step regret that sums to $\\Theta(T)$. The fix is to decay $\\varepsilon$; the $\\ln t$ bonus belongs to UCB, not $\\varepsilon$-greedy."
            },
            {
              "q": "A 3-armed bandit has true means $q_*(\\text{A})=1.0,\\ q_*(\\text{B})=0.7,\\ q_*(\\text{C})=0.4$. Over $T=100$ pulls an algorithm pulled A 90 times, B 6 times, and C 4 times. Using $L_T=\\sum_a \\Delta_a\\,N_T(a)$, what is its cumulative regret?",
              "choices": [
                "$4.2$",
                "$10.0$",
                "$1.0$",
                "$71.8$"
              ],
              "answer": 0,
              "explain": "The optimal arm is A, so $\\Delta_A=0$, $\\Delta_B=1.0-0.7=0.3$, $\\Delta_C=1.0-0.4=0.6$. Regret counts only suboptimal pulls: $L_T = 0.3(6)+0.6(4)=1.8+2.4=4.2$. Pulls of the optimal arm contribute nothing to regret."
            },
            {
              "q": "Prediction-error curiosity (ICM) computes intrinsic reward from how badly a forward model predicts the next observation. If applied to raw pixels instead of learned features, the agent can get trapped in the \"noisy-TV problem.\" What goes wrong?",
              "choices": [
                "Raw pixels make the forward model train too fast, collapsing the intrinsic reward to zero everywhere",
                "Inherently unpredictable noise (e.g. a static-filled screen) yields permanently high prediction error, so the agent is rewarded forever for staring at randomness it can never learn",
                "The intrinsic reward becomes negative, which destabilizes the value function",
                "Pixel-space prediction guarantees logarithmic regret but only for deterministic environments"
              ],
              "answer": 1,
              "explain": "Prediction error stays high on anything stochastic and unlearnable, so a source of pure noise gives an endless novelty bonus and hypnotizes the agent. Encoding states into learned features that capture only action-relevant structure filters out this irreducible noise — that is precisely why ICM predicts in feature space, not pixel space."
            },
            {
              "q": "What is the exploration–exploitation tradeoff?",
              "choices": [
                "Exploit known-good actions to cash in reward, vs explore lesser-known actions to gain information — a pure-greedy agent can lock onto a mediocre option forever because it never gathers the evidence to overturn its belief",
                "Whether to use a model of the environment or learn model-free",
                "Whether to update value estimates online or wait until the episode ends",
                "Whether to represent the policy deterministically or stochastically"
              ],
              "answer": 0,
              "explain": "Because the agent generates its own data, an action it never tries is a reward it can never learn about. Exploiting maximizes reward given current beliefs; exploring spends a turn on information that may reveal something better. Balancing the two is the defining tension of RL."
            },
            {
              "q": "What is the $\\varepsilon$-greedy exploration strategy?",
              "choices": [
                "Always pick the action with the highest estimated value",
                "Pick actions with probability proportional to their estimated value",
                "Act greedily with probability $1-\\varepsilon$ and pick a uniformly random action with probability $\\varepsilon$ — simple, but \"blind\" (it explores by coin-flip, treating barely-tried and well-tested actions identically)",
                "Add an optimism bonus to every under-tried action"
              ],
              "answer": 2,
              "explain": "$\\varepsilon$-greedy is the first scheme everyone learns and works surprisingly well, but it explores blindly: it keeps wasting exploration on options already shown to be bad, because it ignores how uncertain each action's value is."
            },
            {
              "q": "In a multi-armed bandit, what does <em>regret</em> measure?",
              "choices": [
                "The total reward collected over $T$ steps",
                "The cumulative reward lost relative to an oracle that always played the best arm — $L_T=\\sum_t\\big(q_*-q_*(A_t)\\big)$; lower is better, and a good algorithm makes it grow <em>sublinearly</em> in $T$",
                "The variance of the reward distribution",
                "The probability of pulling the wrong arm on the final step"
              ],
              "answer": 1,
              "explain": "Raw reward is hard to compare across problems, so we measure the gap to a perfect oracle. Sublinear regret ($L_T/T\\to0$) means the agent eventually plays optimally almost all the time — the hallmark of a good exploration strategy."
            },
            {
              "q": "What is the core idea behind UCB (Upper Confidence Bound) exploration?",
              "choices": [
                "Pick the arm with the lowest estimated value, to gather information",
                "Pick a uniformly random arm at every step",
                "Pick the arm that has been pulled the fewest times, regardless of its value",
                "\"Optimism in the face of uncertainty\": pick the arm with the highest <em>upper confidence bound</em> $\\hat Q(a)+c\\sqrt{\\ln t/N(a)}$ — favoring arms that are either high-value or under-explored, and exploring less as evidence accumulates"
              ],
              "answer": 3,
              "explain": "UCB adds an exploration bonus that shrinks as an arm is pulled more. It tries arms that <em>could plausibly</em> be best given current uncertainty — directed exploration, unlike $\\varepsilon$-greedy's blind coin flip — which earns it logarithmic (sublinear) regret."
            }
          ],
          "flashcards": [
            {
              "front": "Define cumulative regret $L_T$ in a multi-armed bandit.",
              "back": "$L_T = \\sum_{t=1}^T (q_* - q_*(A_t)) = \\sum_a \\Delta_a\\,\\mathbb{E}[N_T(a)]$, where $q_*$ is the optimal arm's value and $\\Delta_a = q_* - q_*(a)$ is arm $a$'s gap. It is the reward lost versus an oracle that always plays the best arm."
            },
            {
              "front": "State the UCB1 action-selection rule and name each term.",
              "back": "$A_t = \\arg\\max_a [\\hat{Q}_t(a) + c\\sqrt{\\ln t / N_t(a)}]$. First term = exploitation (empirical mean); second = exploration bonus (upper confidence width), which shrinks as $N_t(a)$ grows and grows with $\\ln t$. $c$ tunes optimism ($\\sqrt{2}$ standard)."
            },
            {
              "front": "What principle underlies UCB, and what does it mean operationally?",
              "back": "Optimism in the face of uncertainty: act as if each uncertain arm is as good as it plausibly could be. Either the optimism is justified (you found a good arm) or pulling it reveals it is bad and shrinks its uncertainty. Either way you gain."
            },
            {
              "front": "How does Thompson sampling choose an action?",
              "back": "Maintain a posterior over each arm's mean; sample one value from each arm's posterior, then play the arm with the highest sample. This is probability matching: each arm is played with the probability it is currently believed optimal. Achieves $O(\\log T)$ regret."
            },
            {
              "front": "What does the temperature $\\tau$ control in Boltzmann/softmax exploration $\\pi(a)\\propto e^{\\hat{Q}(a)/\\tau}$?",
              "back": "It interpolates exploration vs exploitation: $\\tau\\to\\infty$ gives a uniform (fully exploring) policy; $\\tau\\to 0$ gives greedy (fully exploiting). Often annealed downward over time."
            },
            {
              "front": "Name three families of intrinsic-motivation bonuses for sparse-reward RL.",
              "back": "(1) Count-based / pseudo-count bonuses ($\\propto 1/\\sqrt{N(s)}$); (2) prediction-error curiosity (ICM — reward the forward-model error on learned features); (3) Random Network Distillation (RND — error of predicting a fixed random network)."
            }
          ],
          "homework": [
            {
              "prompt": "A 4-armed bandit at timestep $t=17$ ($\\ln 17 \\approx 2.833$), using UCB1 with $c=1$. Current stats: Arm A $\\hat{Q}=0.70, N=10$; Arm B $\\hat{Q}=0.65, N=4$; Arm C $\\hat{Q}=0.40, N=2$; Arm D $\\hat{Q}=0.55, N=6$. Compute each arm's UCB score and state which arm is pulled.",
              "hint": "Bonus = $c\\sqrt{\\ln t / N}$. Compute $\\sqrt{2.833/N}$ for each, add to $\\hat{Q}$, and take the argmax. Watch the small-$N$ arms.",
              "solution": "Bonuses: A = sqrt(2.833/10)=sqrt(0.2833)=0.532 -> score 0.70+0.532=1.232. B = sqrt(2.833/4)=sqrt(0.708)=0.842 -> 0.65+0.842=1.492. C = sqrt(2.833/2)=sqrt(1.417)=1.190 -> 0.40+1.190=1.590. D = sqrt(2.833/6)=sqrt(0.472)=0.687 -> 0.55+0.687=1.237. Highest score is Arm C (1.590), so UCB pulls Arm C. Even though C has the lowest estimated mean (0.40), it has been pulled only twice, so its uncertainty bonus dominates and UCB explores it."
            },
            {
              "prompt": "Implement and compare $\\varepsilon$-greedy ($\\varepsilon=0.1$) versus UCB1 ($c=\\sqrt{2}$) on a 10-armed Gaussian bandit (true means $q_*(a)\\sim\\mathcal{N}(0,1)$ fixed per run; reward $R_t\\sim\\mathcal{N}(q_*(A_t),1)$). Run each for $T=1000$ steps, average over 500 random bandits, and plot average reward per step and cumulative regret. Which wins, and does the ranking change early vs late?",
              "hint": "Track $\\hat{Q}(a)$ as a running sample mean and $N(a)$ as pull counts. For UCB give unpulled arms infinite priority so each is tried once. Regret per step is $q_* - q_*(A_t)$ using the TRUE means (the agent never sees these — they are only for scoring). Reset everything each of the 500 runs.",
              "solution": "Skeleton:\n\nimport numpy as np\n\ndef run(strategy, T=1000, K=10, eps=0.1, c=np.sqrt(2)):\n    q_true = np.random.randn(K); best = q_true.max()\n    Q = np.zeros(K); N = np.zeros(K); regret = np.zeros(T)\n    for t in range(1, T+1):\n        if strategy=='eps':\n            a = np.random.randint(K) if np.random.rand()<eps else np.argmax(Q)\n        else:  # ucb\n            if (N==0).any():\n                a = np.argmin(N)\n            else:\n                a = np.argmax(Q + c*np.sqrt(np.log(t)/N))\n        r = np.random.randn() + q_true[a]\n        N[a]+=1; Q[a]+=(r-Q[a])/N[a]\n        regret[t-1] = best - q_true[a]\n    return np.cumsum(regret)\n\nrng_runs = 500\neps_reg = np.mean([run('eps') for _ in range(rng_runs)], axis=0)\nucb_reg = np.mean([run('ucb') for _ in range(rng_runs)], axis=0)\n\nExpected outcome: UCB usually wins by the end. Early on (first ~30-50 steps) UCB pays a startup cost pulling every arm once and exploring high-uncertainty arms, so its cumulative regret can briefly exceed eps-greedy's. But UCB's regret curve bends toward logarithmic growth while eps-greedy's stays linear (slope ~ eps * mean-gap, since it keeps pulling random arms 10% of the time forever). So the cumulative-regret lines cross and UCB ends well ahead. The crossover demonstrates the explore-now-pay-later nature of directed exploration."
            }
          ],
          "examples": [
            {
              "title": "Tracing $\\varepsilon$-greedy and scoring it with regret",
              "body": "A 3-armed Bernoulli bandit has unknown true means $q_*(1)=0.2$, $q_*(2)=0.8$, $q_*(3)=0.5$. Run $\\varepsilon$-greedy for $T=5$ steps, starting from $\\hat{Q}_0=[0,0,0]$ and $N_0=[0,0,0]$, using the incremental mean update $\\hat{Q}(a)\\leftarrow \\hat{Q}(a)+\\tfrac{1}{N(a)}\\big(R-\\hat{Q}(a)\\big)$, ties broken by lowest index. The realized coin-flips (explore vs. exploit) and observed rewards are: (t1) exploit, pull arm 1, $R=0$; (t2) explore, pull arm 2, $R=1$; (t3) exploit, pull arm 2, $R=1$; (t4) exploit, pull arm 2, $R=0$; (t5) explore, pull arm 3, $R=1$. Show $\\hat{Q}$ and $N$ after each step, then compute the cumulative regret $L_5$.",
              "solution": "We track the estimate vector $\\hat{Q}=[\\hat{Q}(1),\\hat{Q}(2),\\hat{Q}(3)]$ and the count vector $N=[N(1),N(2),N(3)]$. The update only touches the pulled arm; with $N(a)=1$ it sets $\\hat{Q}(a)=R$ (the running mean of one sample).\n\n<strong>t=1 (exploit).</strong> All estimates tie at $0$, so the greedy choice is the lowest index, arm 1. Observe $R=0$. Update: $N(1)=1$, $\\hat{Q}(1)=0+\\tfrac11(0-0)=0$.\nState: $\\hat{Q}=[0,\\,0,\\,0]$, $N=[1,0,0]$.\n\n<strong>t=2 (explore).</strong> The coin says explore; we pull arm 2 uniformly at random. Observe $R=1$. Update: $N(2)=1$, $\\hat{Q}(2)=0+\\tfrac11(1-0)=1$.\nState: $\\hat{Q}=[0,\\,1,\\,0]$, $N=[1,1,0]$.\n\n<strong>t=3 (exploit).</strong> Greedy picks $\\arg\\max\\hat{Q}=$ arm 2 ($\\hat{Q}=1$). Observe $R=1$. Update: $N(2)=2$, $\\hat{Q}(2)=1+\\tfrac12(1-1)=1$.\nState: $\\hat{Q}=[0,\\,1,\\,0]$, $N=[1,2,0]$.\n\n<strong>t=4 (exploit).</strong> Greedy picks arm 2 again. Observe $R=0$. Update: $N(2)=3$, $\\hat{Q}(2)=1+\\tfrac13(0-1)=1-\\tfrac13=\\tfrac23\\approx0.667$.\nState: $\\hat{Q}=[0,\\,0.667,\\,0]$, $N=[1,3,0]$.\n\n<strong>t=5 (explore).</strong> The coin says explore; pull arm 3. Observe $R=1$. Update: $N(3)=1$, $\\hat{Q}(3)=0+\\tfrac11(1-0)=1$.\nFinal state: $\\hat{Q}=[0,\\,0.667,\\,1]$, $N=[1,3,1]$.\n\n<strong>Regret.</strong> The optimal arm is arm 2 with $q_*=\\max_a q_*(a)=0.8$. The sequence of arms actually pulled was $A_{1..5}=(1,2,2,2,3)$, so\n$$L_5=\\sum_{t=1}^{5}\\big(q_*-q_*(A_t)\\big)=(0.8-0.2)+(0.8-0.8)+(0.8-0.8)+(0.8-0.8)+(0.8-0.5).$$\nThat is $0.6+0+0+0+0.3=0.9$.\n\nCheck with the gap-weighted-count form $L_5=\\sum_a \\Delta_a N_5(a)$ using gaps $\\Delta_1=0.6,\\ \\Delta_2=0,\\ \\Delta_3=0.3$ and counts $N_5=[1,3,1]$: $0.6\\cdot1+0\\cdot3+0.3\\cdot1=0.9$. Both forms agree.\n\n<strong>Answer:</strong> after 5 steps $\\hat{Q}=[0,\\,0.667,\\,1]$, $N=[1,3,1]$, and the cumulative regret is $L_5=0.9$. Note the regret came entirely from the two non-optimal pulls (arm 1 once, arm 3 once); the three pulls of the optimal arm 2 contributed zero."
            },
            {
              "title": "One Thompson-sampling step on a Bernoulli bandit, and probability matching",
              "body": "A 2-armed Bernoulli bandit uses Thompson sampling with $\\mathrm{Beta}(1,1)$ priors. So far arm 1 has $S_1=3$ successes and $F_1=1$ failure, and arm 2 has $S_2=1$ success and $F_2=2$ failures. On the next step the posterior samples drawn are $\\theta_1=0.55$ from arm 1 and $\\theta_2=0.72$ from arm 2; the pulled arm then returns reward $r=1$. Give each arm's posterior and posterior mean, determine which arm is pulled, perform the posterior update, and explain how this realizes probability matching (the posterior says $P(\\text{arm 1 is best})\\approx 0.833$).",
              "solution": "<strong>Step 1 — posteriors.</strong> With a $\\mathrm{Beta}(1,1)$ prior and Bernoulli (0/1) rewards, the Beta is conjugate, so the posterior after $S$ successes and $F$ failures is $\\mathrm{Beta}(1+S,\\,1+F)$.\n- Arm 1: $\\mathrm{Beta}(1+3,\\,1+1)=\\mathrm{Beta}(4,2)$.\n- Arm 2: $\\mathrm{Beta}(1+1,\\,1+2)=\\mathrm{Beta}(2,3)$.\n\nThe mean of $\\mathrm{Beta}(\\alpha,\\beta)$ is $\\tfrac{\\alpha}{\\alpha+\\beta}$, so\n$$\\bar\\theta_1=\\frac{4}{4+2}=\\frac{4}{6}=0.667,\\qquad \\bar\\theta_2=\\frac{2}{2+3}=\\frac{2}{5}=0.400.$$\nBy posterior mean, arm 1 looks clearly better.\n\n<strong>Step 2 — sample and act.</strong> Thompson sampling does <em>not</em> compare means; it compares one random draw from each posterior. The draws are $\\theta_1=0.55$ and $\\theta_2=0.72$. We play $A=\\arg\\max_a \\theta_a=\\arg\\max(0.55,\\,0.72)=\\text{arm 2}$.\n\nNotice arm 2 is pulled even though its posterior mean ($0.400$) is the lower of the two. This is exploration emerging automatically: arm 2's posterior $\\mathrm{Beta}(2,3)$ is wide (only 3 observations), so it occasionally samples a high value like $0.72$ and earns a pull — no $\\varepsilon$, no temperature, no bonus constant needed.\n\n<strong>Step 3 — posterior update.</strong> The pulled arm is arm 2 and the observed reward is $r=1$ (a success), so increment $S_2$ by 1: $(S_2,F_2):(1,2)\\to(2,2)$. The new posterior for arm 2 is\n$$\\mathrm{Beta}(1+2,\\,1+2)=\\mathrm{Beta}(3,3),\\quad \\text{mean }=\\frac{3}{6}=0.5.$$\nArm 1 is untouched, staying at $\\mathrm{Beta}(4,2)$. The single success pulled arm 2's posterior mean up from $0.400$ to $0.500$ and made it slightly tighter.\n\n<strong>Step 4 — probability matching.</strong> Thompson sampling plays each arm with exactly the posterior probability that it is the best arm. With the pre-pull posteriors $\\mathrm{Beta}(4,2)$ and $\\mathrm{Beta}(2,3)$, integrating $P(\\theta_1>\\theta_2)=\\int_0^1 f_{\\mathrm{Beta}(4,2)}(x)\\,F_{\\mathrm{Beta}(2,3)}(x)\\,dx$ gives $\\approx 0.833$. So over many repetitions arm 1 (the apparent best) is selected about $83.3\\%$ of the time and arm 2 about $16.7\\%$ of the time. Our single realized draw landed in that $16.7\\%$ exploration slice, which is exactly the system working as designed: the better-looking arm is exploited most of the time, but the under-sampled arm keeps getting a proportional share of pulls until its posterior is tight enough to rule it out.\n\n<strong>Answer:</strong> posteriors $\\mathrm{Beta}(4,2)$ (mean $0.667$) and $\\mathrm{Beta}(2,3)$ (mean $0.400$); the sampled values pick arm 2, whose posterior updates to $\\mathrm{Beta}(3,3)$ (mean $0.5$) after the success. Selecting the lower-mean arm $\\approx16.7\\%$ of the time is precisely the probability-matching behavior implied by $P(\\text{arm 1 best})\\approx0.833$."
            }
          ]
        },
        {
          "id": "rl-practical-rl",
          "title": "Making RL Work in Practice",
          "minutes": 16,
          "content": "<h3>Why \"It Works in the Paper\" Isn't Enough</h3>\n<p>Reinforcement learning has a reputation for being finicky, and the reputation is earned. The same algorithm that masters Atari can fail to learn a task a child would solve in seconds, not because the math is wrong but because of a hundred engineering decisions made off-camera: how the reward was written, how observations were scaled, which random seed was lucky, and how long someone was willing to wait. This lesson is about that off-camera reality. It is the difference between an RL practitioner and someone who has read the Sutton & Barto chapters.</p>\n<p>We will work through the practical pillars in turn — reward design, normalization, hyperparameter sensitivity, sample efficiency, reproducibility, and reading learning curves — and then step back to the model-free vs. model-based spectrum, which reframes many of these concerns at once.</p>\n\n<h3>Reward Shaping and the Trap of Reward Hacking</h3>\n<p>The reward function is the single most consequential line of code in an RL project. The agent does not optimize what you <em>want</em>; it optimizes exactly what you <em>wrote</em>. The objective is the expected return,</p>\n$$J(\\pi) = \\mathbb{E}_{\\tau \\sim \\pi}\\left[\\sum_{t=0}^{\\infty} \\gamma^t\\, r(s_t, a_t)\\right],$$\n<p>and a sufficiently capable optimizer will find <em>any</em> high-return trajectory, including ones you never imagined. This is the heart of <strong>reward hacking</strong>: the agent maximizes the literal reward while violating its intent.</p>\n<p>The canonical example is the boat-racing game <em>CoastRunners</em>, where an agent rewarded for collecting score-bearing pickups learned to drive in tight circles harvesting respawning targets — racking up reward while never finishing the race, repeatedly catching fire. Nothing went wrong with the optimizer; the reward simply did not encode \"win the race.\"</p>\n\n<h4>Sparse vs. dense rewards</h4>\n<p>A <strong>sparse</strong> reward (e.g. $+1$ only at the goal, $0$ everywhere else) is unambiguous about intent but gives the agent almost no learning signal — credit assignment over hundreds of zero-reward steps is brutal. A <strong>dense</strong> reward provides feedback every step, which speeds learning but invites you to bake in your own (often wrong) assumptions about <em>how</em> the task should be solved. Dense rewards are where most hacking is born.</p>\n\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>Think of the reward as a contract with a ruthless lawyer who will exploit every loophole. If a behavior you dislike scores well, the agent <em>will</em> eventually find it. The question is never \"would a reasonable agent do this?\" but \"does the math forbid it?\"</p></div>\n\n<h4>Potential-based shaping: the one safe shortcut</h4>\n<p>You often want to add helper rewards to densify a sparse signal without changing what the optimal policy is. There is a theorem that tells you exactly how. <strong>Potential-based reward shaping</strong> (Ng, Harada &amp; Russell, 1999) augments the reward with a shaping term built from a potential function $\\Phi: \\mathcal{S} \\to \\mathbb{R}$:</p>\n$$r'(s, a, s') = r(s, a, s') + \\underbrace{\\gamma\\, \\Phi(s') - \\Phi(s)}_{F(s, s')}.$$\n<p>The key result: this transformation leaves the set of optimal policies <strong>unchanged</strong>, for any $\\Phi$. The reason is telescoping — summed over a trajectory, the shaping terms collapse:</p>\n$$\\sum_{t=0}^{T-1} \\gamma^t\\big(\\gamma\\,\\Phi(s_{t+1}) - \\Phi(s_t)\\big) = \\gamma^T \\Phi(s_T) - \\Phi(s_0),$$\n<p>so every trajectory's return shifts by a constant ($-\\Phi(s_0)$, plus a vanishing terminal term), and constants do not change which policy is best. A natural choice is $\\Phi(s) = -\\,\\text{distance-to-goal}(s)$ or, better, the optimal value $\\Phi(s) = V^*(s)$ if you can estimate it (for a shortest-path task with negative step costs, $V^*(s) \\approx -\\text{distance-to-goal}(s)$, so these two choices coincide). <strong>Any shaping that is <em>not</em> of this potential-based form risks creating new, unintended optima</strong> — that is the formal statement of \"your dense reward can be hacked.\"</p>\n\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>This is the RL instance of a problem that runs through all of AI: <strong>specification gaming</strong> / proxy-objective mismatch. An image classifier latching onto a watermark, a recommender optimizing watch-time into a doom-scroll, and an RLHF policy learning to sound confident rather than be correct are all the same failure — Goodhart's Law: \"when a measure becomes a target, it ceases to be a good measure.\"</p></div>\n\n<h3>Observation and Action Normalization</h3>\n<p>Neural networks learn badly when inputs span wildly different scales — a position in meters ($\\sim 1$), a velocity in mm/s ($\\sim 1000$), and an angle in radians ($\\sim 0.1$) fed raw into a network will make the loss landscape an ill-conditioned ravine, and gradient descent will crawl. The fix is the same as in supervised learning, with an RL twist.</p>\n<ul>\n<li><strong>Observation normalization.</strong> Maintain a <em>running</em> mean $\\mu$ and variance $\\sigma^2$ of observations and feed $\\tilde{s} = (s - \\mu)/\\sqrt{\\sigma^2 + \\epsilon}$. The RL twist: the data distribution is non-stationary (it shifts as the policy improves), so the statistics must update online — typically with Welford's algorithm — not be computed once. Always clip the result (e.g. to $[-10, 10]$) so an early outlier cannot inject a huge value.</li>\n<li><strong>Reward normalization / scaling.</strong> Algorithms like PPO are sensitive to reward magnitude because it interacts with the value-loss coefficient, the advantage scale, and the learning rate. A common trick is to divide rewards by a running estimate of the standard deviation of the discounted return. Note this changes the <em>effective</em> learning dynamics but, done as pure scaling, not the optimal policy.</li>\n<li><strong>Action normalization.</strong> For continuous control, have the policy output actions in $[-1, 1]$ (e.g. via a $\\tanh$-squashed Gaussian) and rescale to the environment's true bounds outside the network. This keeps the policy's output distribution well-behaved and decouples it from the physical units of each actuator.</li>\n</ul>\n<div class=\"callout\"><div class=\"c-tag\">Pitfall</div><p>Freeze normalization statistics at evaluation/deployment time. If you keep updating $\\mu, \\sigma$ during a deterministic eval rollout, your \"fixed\" policy silently sees a shifting input transform, and your eval numbers become meaningless.</p></div>\n\n<h3>Hyperparameter Sensitivity</h3>\n<p>RL is dramatically more sensitive to hyperparameters than supervised learning, for a structural reason: the data the agent learns from is <em>generated by the agent itself</em>. A slightly-too-large learning rate causes a bad policy update, which collects worse data, which causes a worse update — a feedback loop with no ground-truth dataset to anchor it. Supervised learning has a fixed dataset that forgives a lot; RL does not.</p>\n<p>The high-leverage knobs, roughly in order of how often they bite:</p>\n<ul>\n<li><strong>Learning rate.</strong> The usual prime suspect. RL often needs smaller LRs than you'd expect, and linear decay to zero is a common, effective default.</li>\n<li><strong>Discount factor $\\gamma$.</strong> Sets the effective horizon $\\approx 1/(1-\\gamma)$. $\\gamma = 0.99$ means roughly a 100-step horizon; if your task needs credit assignment over 1000 steps, $0.99$ is structurally blind to the goal. Raising $\\gamma$ toward 1 increases horizon but also variance and instability.</li>\n<li><strong>Exploration parameters.</strong> $\\epsilon$-greedy schedule, entropy coefficient (for policy-gradient methods), or action noise. Too little exploration $\\Rightarrow$ premature convergence to a mediocre policy; too much $\\Rightarrow$ the policy never commits.</li>\n<li><strong>Batch / rollout size and update epochs.</strong> Controls the bias–variance and on-policy-staleness trade-off (e.g. PPO's number of epochs over collected data).</li>\n<li><strong>Network architecture &amp; target-network update rate.</strong> Off-policy value methods are sensitive to how fast the bootstrapping target moves.</li>\n</ul>\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>Because performance is so seed- and hyperparameter-dependent, a single good run proves almost nothing. The right mental model is that an RL algorithm defines a <em>distribution</em> over outcomes, and your job is to characterize that distribution — its median <em>and</em> its spread — not to find one heroic run.</p></div>\n\n<h3>Sample Efficiency</h3>\n<p><strong>Sample efficiency</strong> is the performance you achieve per unit of environment interaction (steps, episodes, or wall-clock if the simulator is the bottleneck). It is the currency of RL: in a slow simulator or, especially, on real hardware, samples are the binding constraint. A few structural facts:</p>\n<ul>\n<li><strong>Off-policy &gt; on-policy for efficiency.</strong> Off-policy methods (DQN, SAC, TD3) store transitions in a <strong>replay buffer</strong> and reuse each sample many times, so they are typically far more sample-efficient than on-policy methods (PPO, A2C) that must discard data after each update. The trade-off: off-policy methods are often less stable and harder to tune.</li>\n<li><strong>Model-based methods can be the most sample-efficient of all</strong>, because a learned model lets the agent \"practice\" on imagined data (covered below).</li>\n<li><strong>Sample efficiency vs. compute efficiency are different axes.</strong> PPO is sample-hungry but each sample is cheap to process and it parallelizes across thousands of environments, so when a simulator is fast (e.g. Isaac Gym), PPO can win on wall-clock despite poor sample efficiency.</li>\n</ul>\n\n<h3>Reproducibility and Seeding</h3>\n<p>RL results are notoriously hard to reproduce. Henderson et al. (2018), \"Deep Reinforcement Learning that Matters,\" showed that the <em>same</em> algorithm and hyperparameters, differing only in random seed, could produce learning curves so different they'd support opposite conclusions. To make results trustworthy:</p>\n<ul>\n<li><strong>Seed everything</strong> — Python's <code>random</code>, NumPy, the deep-learning framework, <em>and</em> the environment (including its action space's sampler). One unseeded source of randomness undermines the rest.</li>\n<li><strong>Run multiple seeds (5–10+)</strong> and report the distribution, not a single curve. The honest plot shows the median or mean with an uncertainty band (interquartile range or a bootstrapped confidence interval — standard error is often misleading with so few, non-normal samples).</li>\n<li><strong>Beware that perfect determinism is hard</strong> on GPUs (non-deterministic reduction order) and with asynchronous/parallel environments. Document hardware and library versions.</li>\n</ul>\n<p>The community-standard guidance here is Agarwal et al. (2021), \"Deep RL at the Edge of the Statistical Precipice,\" which recommends robust aggregate metrics like the <strong>interquartile mean (IQM)</strong> over the brittle \"mean of a handful of seeds.\"</p>\n\n<h3>Reading Learning Curves</h3>\n<p>A learning curve plots a performance metric (usually episodic return) against environment steps. Reading them well is a diagnostic skill. The x-axis should be <strong>environment steps, not gradient updates or wall-clock</strong>, if you want to compare sample efficiency fairly. Common shapes and what they mean:</p>\n<ul>\n<li><strong>Smooth monotonic rise, then plateau.</strong> Healthy. The plateau height tells you the policy's ceiling; if it's below the task's solvable level, suspect reward design, horizon ($\\gamma$), or capacity.</li>\n<li><strong>Flat at the floor for a long time.</strong> Often a sparse-reward / exploration problem — the agent hasn't yet stumbled onto <em>any</em> reward. Consider shaping (potential-based!), curriculum, or better exploration before touching the learning rate.</li>\n<li><strong>Rises then collapses (\"catastrophic forgetting\" / policy collapse).</strong> Classic instability: learning rate too high, missing or insufficient trust-region/clipping (PPO), entropy collapsing to zero, or a value function diverging. A telltale sign is the entropy curve crashing right before the return does.</li>\n<li><strong>Huge variance across seeds.</strong> The result is not robust; do not report the best run. Diagnose with more seeds and look for bimodality (some seeds solve it, some never do).</li>\n<li><strong>Train return high, eval return low.</strong> Often exploration noise inflates training returns, or you forgot to switch to a deterministic policy and freeze normalization for eval.</li>\n</ul>\n<div class=\"callout\"><div class=\"c-tag\">Practitioner habit</div><p>Always log auxiliary curves alongside return: policy entropy, value loss / explained variance, KL divergence between consecutive policies, and gradient norm. The return tells you <em>that</em> something broke; these tell you <em>what</em>.</p></div>\n\n<h3>The Model-Free vs. Model-Based Spectrum</h3>\n<p>Everything above takes on a different shape depending on where you sit on a fundamental axis: does the agent learn a <strong>model of the environment's dynamics</strong> $p(s' \\mid s, a)$ and reward, or not?</p>\n<h4>Model-free</h4>\n<p>Model-free methods learn a policy and/or value function <em>directly</em> from experience, treating dynamics as an unknown black box. This is DQN, PPO, SAC, TD3 — the workhorses.</p>\n<ul>\n<li><strong>Pros:</strong> simpler, no model-bias to exploit, strong asymptotic performance, mature and well-understood.</li>\n<li><strong>Cons:</strong> sample-hungry — they throw away the rich information in each transition, using it only to nudge a value or policy.</li>\n</ul>\n<h4>Model-based</h4>\n<p>Model-based methods learn (or are given) a dynamics model and use it to plan or to generate synthetic experience. Examples: Dyna, PETS, MuZero, the Dreamer family. The model can be used to (a) <strong>plan</strong> at decision time (e.g. Monte Carlo Tree Search in MuZero, or model-predictive control), or (b) <strong>generate imagined rollouts</strong> to train a policy on cheap simulated data (Dyna, Dreamer).</p>\n<ul>\n<li><strong>Pros:</strong> often dramatically more sample-efficient (the model squeezes more out of each real transition); the model transfers across tasks that share dynamics; enables explicit lookahead.</li>\n<li><strong>Cons:</strong> <strong>model bias</strong> — the policy can learn to exploit errors in an imperfect model (the \"Dyna trap\": planning against a wrong model produces a confidently wrong policy), and longer imagined rollouts compound model error.</li>\n</ul>\n\n<h4>Where each pays off</h4>\n<p>The decision is mostly governed by where your samples come from and how good a model you can build:</p>\n<ul>\n<li><strong>Cheap, fast simulator (samples ~free):</strong> model-free shines — its asymptotic strength and simplicity dominate when you can afford billions of steps (massively parallel sim, games).</li>\n<li><strong>Expensive samples (real robots, slow sims, real users):</strong> model-based earns its complexity by extracting far more learning per interaction.</li>\n<li><strong>Dynamics easy to model, value/policy hard:</strong> lean model-based. <strong>Dynamics chaotic or high-dimensional and hard to model:</strong> model bias can make model-based worse than model-free — lean model-free.</li>\n</ul>\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters for ML</div><p>The spectrum mirrors a deep theme in AI: <em>learning to act</em> (amortized, fast, model-free) vs. <em>reasoning/search at inference time</em> (deliberate, model-based planning). MuZero combines both — learning a model and searching with it — and the same pattern appears in modern LLM systems that pair a fast learned policy with explicit test-time search/reasoning. The trade-off (amortization vs. compute-at-inference) is identical.</p></div>\n\n<h3>Worked Example: Diagnosing and Fixing a Cleaning-Robot Reward</h3>\n<p>Suppose we train a robot to keep a room clean. The naive reward is: <code>+1 for each piece of dirt vacuumed</code>. We run it and find the robot has learned to repeatedly knock over a dustbin and re-vacuum the same dirt forever — a textbook hack. Let's diagnose and fix it rigorously.</p>\n<p><strong>Step 1 — Identify the loophole formally.</strong> The intended objective is \"minimize the amount of dirt in the room over time.\" The written reward rewards the <em>event</em> of vacuuming, not the <em>state</em> of cleanliness. Because dirt can be re-created (knock over bin) and re-vacuumed, there exist cyclic trajectories with unbounded return, and the optimizer found one. The reward is a flow over events, not a function of the state we care about.</p>\n<p><strong>Step 2 — Re-anchor the reward on the goal state.</strong> Define $D(s)$ = amount of dirt on the floor in state $s$. The honest dense objective is to minimize $\\sum_t \\gamma^t D(s_t)$, i.e. use reward $r(s) = -D(s)$ (a cost per unit dirt per step). Now sitting in a clean room is optimal, and creating dirt to re-vacuum it is strictly punished, closing the loophole.</p>\n<p><strong>Step 3 — If we want the dense \"progress\" signal back, do it the safe way.</strong> A reward proportional to dirt <em>removed</em> this step, $\\Delta = D(s_t) - D(s_{t+1})$, gives nice per-step feedback. Recognize this as potential-based shaping with $\\Phi(s) = -D(s)$ and $\\gamma \\approx 1$:</p>\n$$F(s, s') = \\gamma\\,\\Phi(s') - \\Phi(s) = -\\gamma D(s') + D(s) \\approx D(s) - D(s') = \\Delta.$$\n<p>Because it is (approximately) potential-based, it does <em>not</em> introduce new optima — crucially, the telescoping means knocking over the bin (which <em>raises</em> $D$, giving negative shaping reward) exactly cancels the later re-vacuum bonus. The hack nets zero. That is the theorem doing the work.</p>\n<p><strong>Step 4 — Add constraints / cost terms for side effects, not bonuses.</strong> To discourage the robot from achieving cleanliness by destructive means (e.g. smashing a vase to \"remove\" it), add explicit negative cost terms for those events, or use a constrained-MDP formulation. Do not try to express \"don't break things\" as a positive bonus — that just invents a new thing to hack.</p>\n<p><strong>Step 5 — Verify empirically.</strong> Run multiple seeds, watch the dirt-level curve (the true objective) rather than just cumulative reward, and inspect rollouts. The cumulative-reward curve is exactly what hid the original hack — under <code>+1 per vacuum</code>, reward climbed beautifully while the room stayed dirty.</p>\n\n<h3>Putting It Together</h3>\n<p>Making RL work in practice is mostly about <em>aligning the optimizer's literal target with your intent</em> and then <em>removing the numerical obstacles</em> to it finding that target. Reward design (anchor on states, shape only via potentials, add costs for side effects) handles alignment. Normalization, learning-rate care, and sensible horizons remove the obstacles. Multiple seeds, honest aggregate metrics, and disciplined reading of learning curves keep you honest about whether it actually worked. And the model-free / model-based choice is, at bottom, a question of how precious your samples are versus how trustworthy a model you can build.</p>",
          "mcq": [
            {
              "q": "You add an auxiliary reward to densify a sparse task. Which form is guaranteed to leave the set of optimal policies unchanged?",
              "choices": [
                "Any reward that is positive only near states you believe are good",
                "A potential-based term $F(s,s') = \\gamma\\,\\Phi(s') - \\Phi(s)$ for some $\\Phi:\\mathcal{S}\\to\\mathbb{R}$",
                "A reward proportional to the agent's current speed toward the goal, with a tuned coefficient",
                "Any bounded reward, since bounded shaping cannot change the argmax"
              ],
              "answer": 1,
              "explain": "Only potential-based shaping is provably policy-invariant: summed over a trajectory it telescopes to a constant. Hand-crafted positive bonuses or velocity rewards can create new, unintended optima (i.e., they are hackable)."
            },
            {
              "q": "An agent's training-return curve rises steadily, then suddenly collapses to near the floor and stays there. The most diagnostic single curve to inspect for the cause is:",
              "choices": [
                "The cumulative reward, to confirm the collapse is real",
                "The wall-clock time per update, to check for a slowdown",
                "The policy entropy, which often crashes just before a policy collapse",
                "The number of distinct environments used, to check parallelism"
              ],
              "answer": 2,
              "explain": "Policy collapse is typically driven by instability such as entropy crashing to zero (the policy becomes prematurely deterministic) or a value function diverging; the entropy curve usually signals it before the return falls."
            },
            {
              "q": "You must train a policy on a real robot where each environment step is slow and costly, and the dynamics are fairly smooth and learnable. Which approach is the best first choice and why?",
              "choices": [
                "On-policy PPO, because it is the most stable and widely used algorithm",
                "A model-based method, because a learned dynamics model extracts far more learning per real interaction",
                "Model-free DQN with a large replay buffer, because replay alone fully solves sample efficiency on hardware",
                "Any method, since hardware vs. simulator makes no difference to algorithm choice"
              ],
              "answer": 1,
              "explain": "When samples are expensive and dynamics are learnable, model-based methods pay off by squeezing more out of each real transition via planning or imagined rollouts. PPO is sample-hungry; replay helps but model-based typically dominates in the low-sample, learnable-dynamics regime."
            },
            {
              "q": "A team reports a single learning curve from one seed showing their new algorithm beating a baseline. The strongest methodological objection is:",
              "choices": [
                "They should have plotted return against wall-clock time instead of steps",
                "RL outcomes vary enormously across seeds, so one run characterizes nothing; they must report a distribution over many seeds with a robust aggregate like IQM",
                "They used the wrong discount factor, invalidating the comparison",
                "Learning curves are inherently unreliable and should be replaced by final-policy screenshots"
              ],
              "answer": 1,
              "explain": "Henderson et al. and Agarwal et al. showed identical setups differing only in seed can yield opposite conclusions; rigorous reporting requires many seeds and robust aggregate metrics (e.g., interquartile mean with uncertainty bands), not a single curve."
            },
            {
              "q": "Potential-based reward shaping adds a term $F(s, s') = \\gamma\\,\\Phi(s') - \\Phi(s)$ to the reward. Why is this form provably safe (it never changes the optimal policy), whereas an arbitrary positive bonus is not?",
              "choices": [
                "Because $\\Phi$ is chosen to be the true value function $v_*$, so the bonus exactly cancels the optimization error",
                "Because along any trajectory the discounted shaping terms telescope, so they add only a $\\Phi(s_0)$-dependent constant that is the same for every policy and cannot change which policy is best",
                "Because the discount factor $\\gamma$ shrinks the bonus toward zero, making its effect negligible over long horizons",
                "Because $F$ is always negative, so it can only penalize and never create a new high-reward loop"
              ],
              "answer": 1,
              "explain": "Summed with discounting over a trajectory the potential terms telescope, so the total shaped return differs from the true return only by a term that depends on the start state $s_0$ (not on the actions or policy). That common offset leaves the argmax over policies unchanged, which is why an arbitrary positive bonus is unsafe but this form is not."
            },
            {
              "q": "An on-policy agent diverges when raw observations have features on wildly different scales (e.g. one in [0,1], another in the thousands) and rewards are occasionally huge. Standard practice normalizes both observations and value targets (often with a running mean and variance). What is the core reason this helps?",
              "choices": [
                "It changes the task's optimal policy to an easier one that the network can represent",
                "It keeps inputs and regression targets in a well-conditioned numerical range so gradients stay stable and no single large feature or reward dominates the updates",
                "It replaces the true reward function with a denser surrogate, improving credit assignment",
                "It guarantees the value estimates are unbiased by removing the discount factor's effect"
              ],
              "answer": 1,
              "explain": "Normalization rescales inputs and targets to a well-conditioned range, preventing huge-magnitude features or rewards from producing exploding, unstable gradient updates, without altering the underlying optimal policy."
            },
            {
              "q": "Model-based RL learns dynamics $\\hat{p}(s'\\mid s,a)$ and plans against them. In a setting where the environment is hard to model accurately, what is the characteristic failure mode (the 'Dyna trap') that can make model-based WORSE than a model-free baseline?",
              "choices": [
                "The learned model is too accurate, causing the agent to overfit the exact transitions and fail to generalize",
                "Planning consumes so much wall-clock time that the agent never finishes a single episode",
                "The policy exploits errors in the imperfect model, and longer imagined rollouts compound that model bias into a confidently wrong policy",
                "Model-based methods require a known reward function, which is unavailable in this setting"
              ],
              "answer": 2,
              "explain": "When the model is inaccurate, the planner optimizes against its errors and compounding bias over multi-step imagined rollouts yields a confidently wrong policy, the essence of the Dyna trap."
            },
            {
              "q": "You compare two algorithms and find that algorithm A reaches the target performance in far fewer environment steps, but algorithm B reaches it in less total training time on your GPU. Which statement best captures the distinction the lesson draws?",
              "choices": [
                "A is more sample-efficient while B is more wall-clock-efficient; which matters depends on whether environment interaction or computation is your scarce resource",
                "B is strictly better because total training time is the only metric that affects deployment",
                "A and B are equivalent, since sample efficiency and wall-clock time always move together",
                "A is more sample-efficient, which guarantees it is also more reproducible across random seeds"
              ],
              "answer": 0,
              "explain": "Sample efficiency (steps to a target) and wall-clock efficiency (time to a target) are distinct axes, and the right one to optimize depends on whether real-world interaction or compute is the bottleneck."
            },
            {
              "q": "A cleaning robot is rewarded $+1$ each time it picks up a piece of trash and $-1$ when it deposits trash in the bin. After training, it learns to repeatedly knock over the bin and re-collect the same trash forever. This is a textbook example of:",
              "choices": [
                "A normalization failure, since the reward magnitudes were not scaled to unit variance",
                "Reward hacking: the agent maximizes the literal return via a loophole the designer did not intend",
                "A sample-efficiency problem that more environment steps would resolve",
                "Catastrophic forgetting, because the policy overwrote its earlier behavior"
              ],
              "answer": 1,
              "explain": "The agent found a high-return trajectory (endless collect/un-collect cycles) that satisfies the written reward but defeats its purpose; the fix is the reward specification (e.g. reward bin contents, not pickups), not more steps or scaling. Normalization and forgetting concern training dynamics, not the misspecified objective itself."
            },
            {
              "q": "You lower the discount factor from $\\gamma = 0.99$ to $\\gamma = 0.90$ on a task whose meaningful reward arrives only after many steps. Holding everything else fixed, the most likely effect is:",
              "choices": [
                "Training becomes more stable but the agent becomes more short-sighted, possibly ignoring the distant reward",
                "The optimal policy is provably unchanged because $\\gamma$ only rescales returns",
                "Sample efficiency strictly improves with no downside, since smaller $\\gamma$ shrinks the effective horizon",
                "The value estimates diverge, because a smaller $\\gamma$ removes the contraction in the Bellman update"
              ],
              "answer": 0,
              "explain": "A smaller $\\gamma$ shrinks the effective horizon (roughly $1/(1-\\gamma)$, from 100 down to 10 steps), which often stabilizes bootstrapping but down-weights delayed rewards so the agent may neglect a far-off goal. $\\gamma$ changes which policy is optimal, and a smaller $\\gamma$ makes the Bellman operator a tighter contraction, not a divergent one."
            },
            {
              "q": "Two teams report their RL results. Team X gives the mean learning curve over 10 seeds with a shaded interquartile band; Team Y gives the single best curve out of 10 seeds. For the same algorithm, what should you expect and conclude?",
              "choices": [
                "Team Y's curve will look worse, since picking one seed discards the averaging benefit of the other nine",
                "Team Y's curve will look better and is the more trustworthy estimate of typical performance",
                "Team Y's curve will look better but overstates typical performance; Team X's aggregate is the more honest summary",
                "Both reports are equivalent because the underlying algorithm and seeds are identical"
              ],
              "answer": 2,
              "explain": "Reporting the best-of-10 seed is a form of cherry-picking that inflates apparent performance relative to the typical run, whereas the multi-seed mean with a dispersion band reflects what you should actually expect. The reports are not equivalent precisely because Y conditions on the luckiest seed."
            },
            {
              "q": "A practitioner claims: \"Off-policy algorithms like Q-learning with a replay buffer are inherently more sample-efficient than on-policy methods like PPO because they can reuse each transition many times.\" The most accurate response is:",
              "choices": [
                "False: replay buffers only store data; reuse does not affect how many environment steps are needed",
                "Partly right on reuse, but this typically trades sample efficiency for added instability and tuning sensitivity, so it is not free",
                "True without qualification: off-policy reuse always dominates on-policy methods on every axis",
                "False: on-policy methods are always more sample-efficient because their gradient estimates are unbiased"
              ],
              "answer": 1,
              "explain": "Reusing transitions can genuinely cut the number of environment steps, but off-policy bootstrapping (deadly-triad effects, stale data) tends to be more brittle and harder to tune, so the gain comes with a stability cost rather than being a free lunch. The absolute claims in the other options ignore this real-world trade-off."
            },
            {
              "q": "What is <em>reward hacking</em>?",
              "choices": [
                "When the learning rate is set too high and the loss diverges",
                "When the discount factor is too small to value future reward",
                "When the replay buffer overflows and old transitions are lost",
                "When the agent maximizes the <em>literal</em> reward while violating your intent — finding a high-return loophole you never imagined (e.g. the boat that circles to farm respawning pickups instead of finishing the race)"
              ],
              "answer": 3,
              "explain": "The agent optimizes exactly what you wrote, not what you meant. A capable optimizer will find any high-return trajectory, so the question is never \"would a reasonable agent do this?\" but \"does the math forbid it?\" — treat the reward like a contract a ruthless lawyer will exploit."
            },
            {
              "q": "What is the tradeoff between <em>sparse</em> and <em>dense</em> rewards?",
              "choices": [
                "Sparse rewards always train faster than dense rewards",
                "Sparse rewards (e.g. +1 only at the goal) are unambiguous about intent but give little learning signal (brutal credit assignment over many zero steps); dense rewards give feedback every step but invite baked-in wrong assumptions and are where most reward hacking is born",
                "Dense rewards are mathematically guaranteed never to be hacked",
                "Sparse and dense rewards always induce the same optimal policy"
              ],
              "answer": 1,
              "explain": "Sparse = honest about the goal but hard to learn from; dense = easy to learn from but risky, because you're encoding your own (often wrong) idea of <em>how</em> to solve the task. Potential-based shaping is the one provably safe way to densify without changing the optimal policy."
            },
            {
              "q": "What does <em>sample efficiency</em> mean in RL?",
              "choices": [
                "How fast the algorithm runs in wall-clock time on a GPU",
                "The number of parameters in the policy network",
                "How much performance the agent gains per unit of <em>environment interaction</em> (samples) — the metric that matters most when each real-world step is slow or costly",
                "The fraction of the reward that is intrinsic rather than extrinsic"
              ],
              "answer": 2,
              "explain": "Sample efficiency is about data, not compute: an algorithm that reaches a target in fewer environment steps is more sample-efficient even if it costs more GPU time per step. It's decisive on real robots or any setting where collecting experience is the bottleneck."
            },
            {
              "q": "What distinguishes <em>model-free</em> from <em>model-based</em> RL?",
              "choices": [
                "Model-free methods learn values or a policy directly from experience with no model of the world; model-based methods learn the dynamics $\\hat p(s'\\mid s,a)$ and plan against them — usually more sample-efficient, but limited by model error",
                "Model-free methods require a simulator; model-based methods do not",
                "Model-based methods can only be used with discrete action spaces",
                "They are two names for the same approach"
              ],
              "answer": 0,
              "explain": "Model-based RL can squeeze more learning from each interaction by planning in a learned model — but if the environment is hard to model, errors compound (the \"Dyna trap\") and it can underperform a simple model-free baseline. The choice hinges on how learnable the dynamics are."
            }
          ],
          "flashcards": [
            {
              "front": "What is reward hacking, and why is it inevitable rather than a bug?",
              "back": "The agent maximizes the literal reward while violating its intent. It's inevitable because the optimizer finds ANY high-return trajectory; if an undesired behavior scores well, a capable agent will eventually find it. (Goodhart's Law / specification gaming.)"
            },
            {
              "front": "State the potential-based reward shaping theorem.",
              "back": "Adding $F(s,s') = \\gamma\\,\\Phi(s') - \\Phi(s)$ for any potential $\\Phi:\\mathcal{S}\\to\\mathbb{R}$ leaves the set of optimal policies unchanged. Reason: over a trajectory the terms telescope to $\\gamma^T\\Phi(s_T)-\\Phi(s_0)$, shifting every return by ~a constant."
            },
            {
              "front": "Why is RL far more hyperparameter- and seed-sensitive than supervised learning?",
              "back": "The training data is generated by the agent itself, creating a feedback loop: a bad update collects worse data, causing worse updates, with no fixed ground-truth dataset to anchor learning."
            },
            {
              "front": "Off-policy vs. on-policy: which is more sample-efficient and why?",
              "back": "Off-policy (DQN, SAC, TD3) is more sample-efficient because a replay buffer lets each transition be reused many times. On-policy (PPO, A2C) discards data after each update. Trade-off: off-policy is often less stable."
            },
            {
              "front": "Effective horizon implied by the discount factor $\\gamma$?",
              "back": "Roughly $1/(1-\\gamma)$ steps. So $\\gamma=0.99 \\Rightarrow$ ~100-step horizon. If credit assignment must span far more steps, the agent is structurally blind to the distant goal."
            },
            {
              "front": "Model-based RL: main benefit and main failure mode?",
              "back": "Benefit: much higher sample efficiency (plan or train on imagined rollouts), and transferable dynamics. Failure mode: model bias — the policy exploits model errors, and error compounds over long imagined rollouts."
            }
          ],
          "homework": [
            {
              "prompt": "Critique this reward for a trading agent and propose a fix. The agent gets reward equal to the realized profit of each trade it closes, and $0$ for holding. After training it churns: it opens and closes tiny positions constantly, and although cumulative reward is high, its account value is flat or down once fees are considered. Identify the loophole formally and design a corrected reward.",
              "hint": "The reward is defined over an EVENT (closing a trade) and ignores a real cost and the true objective. Anchor the reward on the quantity you actually care about, and account for everything the optimizer can exploit (here, transaction fees).",
              "solution": "Loophole: the reward measures per-trade realized profit but omits transaction costs and is not anchored on the agent's true objective — growth of total account value (mark-to-market wealth $W_t$). Many tiny 'profitable' trades can each clear the spread by a hair yet collectively lose money to fees, so a churning policy maximizes the written reward while the real objective falls. Fix: define reward on the state we care about — the per-step change in mark-to-market wealth net of all costs: $r_t = (W_{t+1} - W_t) - c\\cdot(\\text{traded volume}_t)$, where $c$ captures fees/slippage. This is potential-based shaping with $\\Phi(s) = W$ on the wealth part (so it tracks the true objective and the telescoping prevents 'manufacture-then-realize' loops from netting positive), plus an explicit cost term for the side effect (trading activity). Optionally optimize a risk-adjusted objective (e.g. penalize variance of returns, or use a differential-Sharpe reward) so the agent isn't rewarded for taking uncompensated risk. Verify by plotting the true metric — net account value over time, not cumulative per-trade reward — across multiple seeds; the original churning hack is invisible in cumulative reward but obvious in net wealth."
            },
            {
              "prompt": "You suspect an observation-normalization bug is silently hurting a continuous-control agent. Describe (a) the symptoms you'd expect on the learning curves, (b) how non-stationarity of the data makes this harder than in supervised learning, and (c) a concrete checklist to confirm and fix it.",
              "hint": "Think about what raw, badly-scaled inputs do to gradient descent, and what happens to running statistics when the policy (and thus the visited states) keeps changing — including at evaluation time.",
              "solution": "(a) Symptoms: slow or stalled learning despite a reasonable algorithm; high seed variance; a train/eval gap where eval is worse than train. If statistics are computed once and then frozen on early data, later states are mis-scaled and the curve plateaus low; if statistics keep updating during eval, the 'fixed' policy sees a shifting input transform and eval numbers wander. (b) Non-stationarity: in supervised learning the input distribution is fixed, so you compute mean/variance once. In RL the state distribution shifts as the policy improves, so normalization stats must update online (e.g. Welford's running mean/variance). A single early outlier can also poison the running variance, so clipping the normalized output (e.g. to [-10,10]) is essential. (c) Checklist: (1) Confirm a running normalizer is used, not one-shot stats. (2) Verify stats update during training but are FROZEN during evaluation/deployment. (3) Add clipping after normalization. (4) Check action scaling: policy outputs in [-1,1] (tanh-squashed) and is rescaled to true bounds outside the network. (5) Consider reward scaling by running return std if the value loss dominates. (6) Re-run multiple seeds and compare median curves before vs. after to confirm the fix, not a lucky seed."
            },
            {
              "prompt": "Your simulator runs at over 1 million environment steps per second on a GPU, dynamics are high-dimensional and somewhat chaotic, and you have a large compute budget but a tight wall-clock deadline. A teammate proposes a model-based method 'because it's more sample-efficient.' Argue for the better choice given these constraints.",
              "hint": "Separate sample efficiency from compute/wall-clock efficiency, and weigh the model-based benefit against model bias in chaotic, high-dimensional dynamics.",
              "solution": "Prefer a massively parallel model-free method (e.g. PPO). Sample efficiency is the wrong currency here: with >1M steps/sec, environment samples are nearly free, so the model-based advantage (more learning per real sample) buys little. Meanwhile its costs are high in this regime: chaotic, high-dimensional dynamics are hard to model accurately, so model bias is severe and imagined rollouts compound error quickly — the policy may learn to exploit model inaccuracies (the Dyna trap), often making model-based WORSE than model-free here. PPO is also embarrassingly parallel across thousands of envs and processes each cheap sample fast, so despite poor sample efficiency it typically wins on wall-clock when the simulator is this fast. The decision rule: model-based pays off when samples are expensive AND dynamics are learnable; both conditions fail here. Caveat: if a deadline is met early, one could explore a hybrid (e.g. MuZero-style learned model + search) but only if a reliable enough model proves learnable on this chaotic system."
            }
          ],
          "examples": [
            {
              "title": "Catching a Reward Hack in a Racing Game",
              "body": "A boat-racing agent gets reward $r = +1$ for each checkpoint buoy it touches, and the race has $3$ buoys placed around a loop. The designer intends the agent to finish laps. With $\\gamma = 1$ and an episode capped at $T = 12$ steps, compare two policies: (A) complete one lap touching buoys in order $1\\to2\\to3$ taking $4$ steps each ($12$ steps total), versus (B) sit next to buoy $2$ and re-touch it every $2$ steps. Which return does the optimizer prefer, and what does this reveal?",
              "solution": "We evaluate the undiscounted return $J = \\sum_{t=0}^{T-1} r_t$ for each policy over the $T=12$ step episode.\n\n<strong>Policy A (intended: finish the lap).</strong> The agent reaches buoy $1$ at step $4$, buoy $2$ at step $8$, buoy $3$ at step $12$. Each touch gives $+1$:\n$$J_A = 1 + 1 + 1 = 3.$$\n\n<strong>Policy B (the hack: farm one buoy).</strong> The agent re-touches buoy $2$ every $2$ steps. In $12$ steps it scores at $t = 2,4,6,8,10,12$ — that is $6$ touches:\n$$J_B = \\underbrace{1+1+1+1+1+1}_{6\\text{ touches}} = 6.$$\n\n<strong>Comparison.</strong> Since $J_B = 6 > 3 = J_A$, a competent optimizer prefers Policy B. The agent never finishes a lap, yet earns twice the return — it is maximizing exactly what was written (\"touch buoys\"), not what was meant (\"finish the race fastest\").\n\n<strong>The lesson / a fix.</strong> The reward did not forbid re-touching the same buoy, so the maximum-return trajectory is degenerate. A repair is to make each buoy a one-time event per lap (reward only the <em>first</em> touch of each buoy in order) or to reward lap completion / progress, e.g. $+1$ only when buoy index increases. Under \"reward first ordered touch only,\" Policy B collapses to $J_B = 1$ (only the initial touch counts) while $J_A = 3$, restoring the intended ordering. <strong>Answer: the optimizer prefers Policy B with return $6$ vs $3$; this is reward hacking arising from a reward that pays for a repeatable action rather than genuine task progress.</strong>"
            },
            {
              "title": "Observation Normalization with a Running Mean and Variance",
              "body": "An agent observes a single scalar feature (a velocity in cm/s) whose values stream in as $x = 100,\\ 102,\\ 98,\\ 100,\\ 5000$, where the last value is a corrupted sensor spike. You normalize online with a running estimate $\\hat x = (x - \\mu)/\\sqrt{\\sigma^2 + \\epsilon}$, $\\epsilon = 10^{-8}$, updating $\\mu, \\sigma^2$ after each sample. Show the normalized value fed to the network at each step, and explain what the spike does.",
              "solution": "We maintain Welford-style running statistics over the samples seen <em>so far</em>, normalize the incoming $x$ with the stats from the previous samples, then update. (Using stats from prior samples is the honest online setting; for the very first sample there is no spread yet.)\n\n<strong>Step 1, $x_1 = 100$.</strong> No prior data, so $\\mu = 0,\\ \\sigma^2 = 0$ initially gives $\\hat x_1 = (100-0)/\\sqrt{0 + 10^{-8}} \\approx 10^{6}$ — a huge value, which is why implementations either skip normalizing the first sample or warm up the stats. After update: $\\mu = 100,\\ \\sigma^2 = 0$.\n\n<strong>Step 2, $x_2 = 102$.</strong> Normalize with $\\mu=100,\\sigma^2=0$: $\\hat x_2 = (102-100)/\\sqrt{0+10^{-8}} = 2/10^{-4} = 2\\times10^{4}$. Update over $\\{100,102\\}$: $\\mu = 101$, population variance $\\sigma^2 = \\tfrac{1}{2}((100-101)^2+(102-101)^2) = 1$.\n\n<strong>Step 3, $x_3 = 98$.</strong> Normalize with $\\mu=101,\\sigma^2=1$: $\\hat x_3 = (98-101)/\\sqrt{1+10^{-8}} \\approx -3.0$. Update over $\\{100,102,98\\}$: $\\mu = 100$, $\\sigma^2 = \\tfrac{1}{3}(0+4+4) = \\tfrac{8}{3}\\approx 2.667$.\n\n<strong>Step 4, $x_4 = 100$.</strong> Normalize with $\\mu=100,\\sigma^2\\approx2.667$: $\\hat x_4 = (100-100)/\\sqrt{2.667} = 0.0$. Update over $\\{100,102,98,100\\}$: $\\mu = 100$, $\\sigma^2 = \\tfrac{1}{4}(0+4+4+0) = 2.0$.\n\n<strong>Step 5, $x_5 = 5000$ (the spike).</strong> Normalize with the <em>pre-spike</em> stats $\\mu=100,\\sigma^2=2.0$:\n$$\\hat x_5 = \\frac{5000 - 100}{\\sqrt{2.0 + 10^{-8}}} = \\frac{4900}{1.414} \\approx 3465.$$\nThis enormous normalized input ($\\approx 3465$ standard deviations) blows through the network as a giant activation, producing a huge gradient — a single corrupted sample can destabilize training. Worse, <em>after</em> updating the running stats over all five values, $\\mu = 1080$ and $\\sigma^2 \\approx 3.84\\times10^{6}$ (dominated by the spike), so every <em>future</em> normal reading near $100$ now maps to $\\hat x = (100-1080)/\\sqrt{3.84\\times10^6}\\approx -0.50$ — the meaningful $\\pm$ few-cm/s variation has been crushed to near zero, destroying the feature's resolution.\n\n<strong>Answer.</strong> Normalized stream (using prior stats): $\\hat x \\approx 10^6,\\ 2\\times10^4,\\ -3.0,\\ 0.0,\\ 3465$. The single spike both injects a destabilizing $\\approx 3465\\sigma$ input and poisons the running statistics so all subsequent normal observations collapse toward $0$. The practical takeaways: warm up / clip normalized observations (e.g. clip to $[-5,5]$), and guard against outliers (clip raw inputs or use robust stats) so one bad sensor reading cannot wreck both the current update and the running normalizer."
            }
          ]
        },
        {
          "id": "rl-connections-frontiers",
          "title": "Connections to ML/AI and Modern Frontiers",
          "minutes": 14,
          "content": "<h3>Where RL Sits in the ML/AI Landscape</h3>\n<p>Most of machine learning learns a <em>function</em> from a fixed dataset. Supervised learning fits $f_\\theta(x)\\approx y$ from labeled pairs $(x,y)$; unsupervised learning models the structure of $p(x)$. Reinforcement learning is different in kind, not just degree: there is <strong>no fixed dataset and no ground-truth label for each input</strong>. Instead an agent takes actions $a_t$ in states $s_t$, the environment responds with a next state $s_{t+1}$ and a scalar reward $r_t$, and the agent must learn a policy $\\pi(a\\mid s)$ that maximizes expected return $\\mathbb{E}\\!\\left[\\sum_t \\gamma^t r_t\\right]$. Three features make RL its own discipline:</p>\n<ul>\n<li><strong>Evaluative, not instructive feedback.</strong> The reward tells you how good your action was, not what the best action would have been. Supervised learning gets the right answer; RL only gets a score.</li>\n<li><strong>Sequential credit assignment.</strong> A reward at $t{=}100$ may be due to a choice at $t{=}3$. You must propagate credit across time — this is what the Bellman backup and TD learning are <em>for</em>.</li>\n<li><strong>Distribution control.</strong> The agent's own actions determine the data it sees next. This couples learning and data collection (the exploration problem) and breaks the i.i.d. assumption that underpins most of supervised learning theory.</li>\n</ul>\n<div class=\"callout sage\"><div class=\"c-tag\">Key fact</div><p>The single sentence that distinguishes RL from the rest of ML: <strong>the data distribution depends on the model.</strong> Change the policy and you change what you observe. Almost every hard problem in RL — exploration, off-policy correction, distribution shift in offline RL, reward hacking in RLHF — is a consequence of this one fact.</p></div>\n\n<h3>RL vs. Supervised Fine-Tuning: Complements, Not Rivals</h3>\n<p>The cleanest way to feel the difference is through language-model post-training, where both appear in the same pipeline. Suppose we want a model to write helpful answers.</p>\n<h4>Supervised fine-tuning (SFT)</h4>\n<p>We collect demonstrations: prompts $x$ paired with high-quality human-written responses $y^\\star$, and minimize the negative log-likelihood</p>\n$$\\mathcal{L}_{\\text{SFT}}(\\theta) = -\\,\\mathbb{E}_{(x,y^\\star)\\sim \\mathcal{D}}\\left[\\sum_{t} \\log \\pi_\\theta(y^\\star_t \\mid x, y^\\star_{<t})\\right].$$\n<p>This is pure supervised learning (next-token classification). It is <strong>imitation</strong>: the model is pushed toward the exact tokens humans wrote. Its ceiling is the demonstration quality, and it has a structural weakness — it can only teach the model what a good answer <em>looks like</em>, never which of two plausible answers is <em>better</em>, and it gives no signal at all for behaviors that should be avoided.</p>\n<h4>Why you then need RL</h4>\n<p>Two limits of SFT motivate RL. First, for open-ended generation there is no single correct $y^\\star$; preferences are <em>comparative</em> (\"response A is better than B\"), which is evaluative feedback — RL's native language. Second, SFT only ever increases the probability of the demonstrated sequence; it cannot push <em>down</em> the probability of bad-but-fluent completions. RL optimizes a <strong>scalar objective over whole generations</strong>, so it can trade off many tokens to raise an answer-level quality score, and it can penalize undesirable outputs.</p>\n<div class=\"callout\"><div class=\"c-tag\">Intuition</div><p>SFT teaches by example (\"here is a good answer, copy it\"). RL teaches by consequence (\"that whole answer scored 7/10, this one scored 3/10 — adjust\"). SFT clones a policy; RL <em>improves</em> one. In practice SFT gets you into a good region of policy space cheaply, and RL polishes within it.</p></div>\n\n<h3>RLHF and Preference Optimization</h3>\n<p>Reinforcement Learning from Human Feedback (RLHF) is the canonical recipe for aligning LLMs with human preferences. It has three stages.</p>\n<h4>Stage 1 — Supervised fine-tuning</h4>\n<p>Start from a pretrained base model and run SFT on curated demonstrations (above). This produces $\\pi^{\\text{SFT}}$, a reasonable instruction-follower and the initialization for everything that follows.</p>\n<h4>Stage 2 — Reward model training</h4>\n<p>Collect comparison data: for a prompt $x$, sample two responses, have a human label which is preferred, giving pairs $(x, y_w, y_l)$ where $y_w \\succ y_l$. Train a reward model $r_\\phi(x,y)$ (typically the SFT model with a scalar head) under the <strong>Bradley–Terry</strong> preference model, which says the probability that $y_w$ beats $y_l$ is a logistic function of the reward gap:</p>\n$$\\mathcal{L}_{\\text{RM}}(\\phi) = -\\,\\mathbb{E}_{(x,y_w,y_l)}\\Big[\\log \\sigma\\big(r_\\phi(x,y_w) - r_\\phi(x,y_l)\\big)\\Big].$$\n<p>The reward model is a learned, automatic proxy for the human judge — it lets us score arbitrary new generations without asking a person each time.</p>\n<h4>Stage 3 — RL optimization (policy improvement)</h4>\n<p>Now optimize the policy to maximize reward, but with a KL penalty that keeps it close to the SFT reference so it does not drift into degenerate text that fools the reward model:</p>\n$$\\max_{\\theta}\\ \\mathbb{E}_{x\\sim\\mathcal{D},\\,y\\sim\\pi_\\theta(\\cdot\\mid x)}\\Big[\\,r_\\phi(x,y)\\;-\\;\\beta\\,\\log\\tfrac{\\pi_\\theta(y\\mid x)}{\\pi^{\\text{SFT}}(y\\mid x)}\\,\\Big].$$\n<p>This is a genuine RL problem: the \"environment\" is \"generate a response, then receive reward $r_\\phi$\"; the action is the whole sequence (or each token, with the sequence reward distributed). It is classically solved with <strong>PPO</strong>, a policy-gradient method whose clipped objective prevents destructively large updates. The $\\beta$ KL term is the alignment-tax knob: too small and the policy <strong>reward-hacks</strong> (exploits quirks of $r_\\phi$); too large and it barely improves.</p>\n<div class=\"callout violet\"><div class=\"c-tag\">Deeper connection</div><p>The KL-regularized objective has a closed-form optimum: $\\pi^\\star(y\\mid x)\\propto \\pi^{\\text{SFT}}(y\\mid x)\\,\\exp\\!\\big(r_\\phi(x,y)/\\beta\\big)$. <strong>Direct Preference Optimization (DPO)</strong> exploits this. By inverting the relation to write the reward in terms of the optimal policy, the entire RLHF objective collapses into a single supervised-style loss on the preference pairs — no reward model, no sampling, no PPO:</p>\n<p>$$\\mathcal{L}_{\\text{DPO}}=-\\,\\mathbb{E}_{(x,y_w,y_l)}\\Big[\\log\\sigma\\Big(\\beta\\log\\tfrac{\\pi_\\theta(y_w\\mid x)}{\\pi^{\\text{SFT}}(y_w\\mid x)}-\\beta\\log\\tfrac{\\pi_\\theta(y_l\\mid x)}{\\pi^{\\text{SFT}}(y_l\\mid x)}\\Big)\\Big].$$</p>\n<p>DPO is the bridge between the two worlds: it solves an RL-shaped alignment problem with a stable supervised-looking gradient. This is why preference optimization, not \"RL\" per se, is the more accurate umbrella term for modern alignment.</p></div>\n<p>A note on reward sources: RLHF uses a learned reward model, but RL post-training increasingly uses <strong>verifiable rewards</strong> too — for math or code, the reward can be \"did the unit tests pass?\" or \"is the final answer correct?\", a programmatic signal (often called RLVR). The RL machinery is identical; only the reward source changes.</p>\n\n<h3>Offline RL: Learning Without Interaction</h3>\n<p>Standard (\"online\") RL requires acting in the environment to gather data. That is impossible or unsafe in many real settings — you cannot let a learning agent experiment freely on a patient, a power grid, or a self-driving fleet. <strong>Offline RL</strong> (a.k.a. batch RL) learns a policy purely from a <em>fixed, previously collected dataset</em> $\\mathcal{D}=\\{(s,a,r,s')\\}$ generated by some behavior policy $\\pi_\\beta$, with no further interaction.</p>\n<p>If this sounds like supervised learning on logged data, note the trap. The core failure mode is <strong>distributional shift driven by overestimation</strong>. A learned Q-function $Q(s,a)$ is queried at actions the new policy <em>wants</em> to take, but those actions may be out-of-distribution (OOD) relative to $\\mathcal{D}$. The Bellman target $r+\\gamma\\max_{a'}Q(s',a')$ takes a max, and the max systematically picks OOD actions where $Q$ is erroneously high — there is no real data to correct the error, so it compounds. Online RL would simply try the action and get punished; offline RL cannot.</p>\n<p>The fix in every offline algorithm is some form of <strong>staying close to the data</strong>: constrain the policy to the support of $\\pi_\\beta$ (e.g. BCQ, TD3+BC), or be <em>pessimistic</em> about unseen actions by penalizing their Q-values (CQL, Conservative Q-Learning, which adds a term pushing down $Q$ on OOD actions and up on in-data actions). Offline RL is strictly harder than imitation learning but strictly more powerful: unlike pure behavior cloning, it can produce a policy <em>better</em> than the data-generating policy by \"stitching\" together good fragments of different trajectories — provided it respects support constraints.</p>\n<div class=\"callout sage\"><div class=\"c-tag\">Why it matters</div><p>Offline RL is what lets RL graduate from simulators to the real world. It is also the conceptual cousin of RLHF: both learn from a frozen dataset of past behavior and both must guard against drifting into regions the data does not cover (KL-to-reference in RLHF $\\leftrightarrow$ support/pessimism constraints in offline RL).</p></div>\n\n<h3>Model-Based RL: Planning with a Learned Model</h3>\n<p>Everything above is <strong>model-free</strong>: the agent learns values or a policy directly, never an explicit model of the world. <strong>Model-based RL</strong> instead learns (or is given) a model of the dynamics $\\hat{p}(s'\\mid s,a)$ and reward $\\hat{r}(s,a)$, then <em>plans</em> by simulating futures inside that model. The payoff is dramatic <strong>sample efficiency</strong>: imagined rollouts are cheap, so the agent can deliberate without consuming real interactions.</p>\n<h4>AlphaZero: planning with a known model</h4>\n<p>In board games the rules are the perfect model, so dynamics need not be learned. AlphaZero combines a deep network $f_\\theta(s)=(p,v)$ — a policy prior $p$ over moves and a value estimate $v$ — with <strong>Monte Carlo Tree Search (MCTS)</strong>. MCTS grows a search tree by repeatedly selecting actions that maximize an upper-confidence score balancing the network's prior, the running value estimate, and a visit-count exploration bonus:</p>\n$$a = \\arg\\max_a \\left[\\,Q(s,a) + c\\,P(s,a)\\,\\frac{\\sqrt{\\textstyle\\sum_b N(s,b)}}{1+N(s,a)}\\,\\right].$$\n<p>Search produces a refined move distribution (the visit counts), the game outcome supplies a value target, and the network is trained to match both. This is a tight <strong>policy-improvement loop</strong>: search makes the raw network stronger, and that improved behavior becomes the next training target — self-play bootstrapping with no human data beyond the rules.</p>\n<h4>MuZero: planning with a learned model</h4>\n<p>MuZero removes the requirement of knowing the rules. It learns three functions — a <em>representation</em> $h$ mapping observations to a latent state, a <em>dynamics</em> function $g$ predicting the next latent state and reward, and a <em>prediction</em> function $f$ giving policy and value — and runs MCTS entirely in this learned latent space. Crucially, the model is trained <strong>only to predict the quantities that matter for planning</strong> (reward, value, policy), not to reconstruct pixels. That value-equivalence principle is why a learned, abstract model suffices to plan well, and it extends MuZero beyond games to Atari and beyond.</p>\n<div class=\"callout violet\"><div class=\"c-tag\">Big picture</div><p>The model-free / model-based axis mirrors a deep theme in AI: pure pattern recognition (a network's single forward pass) versus deliberate reasoning (search over imagined futures). Notice the rhyme with LLMs: a base model is \"model-free\" reflex, while chain-of-thought and tree-of-thought are a soft form of <em>planning</em>, and RL post-training is the policy-improvement loop that distills good reasoning back into the network — exactly the AlphaZero pattern of \"search to act better, then learn from the better behavior.\"</p></div>\n\n<h3>Worked Example: One PPO-style RLHF Update</h3>\n<p>Let's make Stage 3 concrete on a tiny toy. For prompt $x$ the policy can emit two responses $A$ and $B$. The SFT reference and current policy assign:</p>\n<ul>\n<li>$\\pi^{\\text{SFT}}(A\\mid x)=0.5,\\quad \\pi^{\\text{SFT}}(B\\mid x)=0.5$</li>\n<li>$\\pi_\\theta(A\\mid x)=0.6,\\quad \\pi_\\theta(B\\mid x)=0.4$ (current policy)</li>\n</ul>\n<p>The reward model scores $r(A)=2.0$, $r(B)=0.0$, and we use KL weight $\\beta=1.0$. We optimize the KL-regularized objective $J(\\theta)=\\mathbb{E}_{y\\sim\\pi_\\theta}\\big[r(y)\\big]-\\beta\\,\\mathrm{KL}\\!\\left(\\pi_\\theta\\,\\|\\,\\pi^{\\text{SFT}}\\right)$.</p>\n<p><strong>Step 1 — closed-form optimum.</strong> We derived $\\pi^\\star(y)\\propto \\pi^{\\text{SFT}}(y)\\exp(r(y)/\\beta)$. Compute unnormalized weights:</p>\n$$w_A=0.5\\,e^{2.0/1.0}=0.5\\cdot 7.389=3.695,\\qquad w_B=0.5\\,e^{0/1}=0.5\\cdot1=0.5.$$\n$$\\pi^\\star(A)=\\frac{3.695}{3.695+0.5}=0.881,\\qquad \\pi^\\star(B)=0.119.$$\n<p>So the alignment-optimal policy puts $\\approx 88\\%$ on the better response — not $100\\%$. The KL penalty deliberately holds it back from collapsing entirely onto $A$; <strong>that residual mass is the regularization that prevents reward hacking and preserves diversity.</strong></p>\n<p><strong>Step 2 — sanity-check the direction of the gradient.</strong> Our current policy has $\\pi_\\theta(A)=0.6 < 0.881$, so an update should raise $\\pi_\\theta(A)$. The policy-gradient signal is the <em>advantage</em> $\\hat{A}(y)=r(y)-\\beta\\log\\frac{\\pi_\\theta(y)}{\\pi^{\\text{SFT}}(y)}-b$ where $b$ is a baseline (e.g. the mean). The KL-penalized rewards are:</p>\n$$\\tilde r(A)=2.0-1.0\\cdot\\log\\tfrac{0.6}{0.5}=2.0-0.182=1.818,\\qquad \\tilde r(B)=0.0-1.0\\cdot\\log\\tfrac{0.4}{0.5}=0+0.223=0.223.$$\n<p>With baseline $b=\\mathbb{E}_{\\pi_\\theta}[\\tilde r]=0.6(1.818)+0.4(0.223)=1.180$: advantage of $A$ is $+0.638$ (positive $\\Rightarrow$ increase $\\pi_\\theta(A)$), advantage of $B$ is $-0.957$ (negative $\\Rightarrow$ decrease $\\pi_\\theta(B)$). The gradient pushes the policy from $0.6$ toward the target $0.881$, exactly as the closed form predicts.</p>\n<p><strong>Step 3 — the role of clipping.</strong> PPO would compute the ratio $\\rho=\\pi_\\theta^{\\text{new}}(A)/\\pi_\\theta^{\\text{old}}(A)$ and clip it to $[1-\\epsilon,\\,1+\\epsilon]$ (say $\\epsilon=0.2$). If one update tried to jump $\\pi_\\theta(A)$ from $0.6$ to $0.85$ (ratio $1.42$), clipping caps the effective ratio at $1.2$, so the policy moves toward the target in small, stable steps over many minibatches rather than overshooting on a noisy reward estimate. That stability — not a different objective — is PPO's whole contribution.</p>\n\n<h3>Summary: A Map of the Frontier</h3>\n<ul>\n<li><strong>RL is the ML of evaluative, sequential, self-generated data.</strong> Its signature difficulty is that the data distribution depends on the policy.</li>\n<li><strong>SFT and RL are complementary:</strong> SFT clones good behavior from demonstrations; RL improves behavior from scalar/comparative feedback. Use SFT to initialize, RL to optimize.</li>\n<li><strong>RLHF = SFT $\\to$ reward model (Bradley–Terry) $\\to$ KL-regularized RL (PPO).</strong> DPO and other preference-optimization methods reach the same optimum with a supervised-style loss.</li>\n<li><strong>Offline RL</strong> learns from a fixed dataset without interaction; its enemy is overestimation on out-of-distribution actions, cured by support constraints or pessimism.</li>\n<li><strong>Model-based RL</strong> learns/uses a dynamics model and plans (MCTS in AlphaZero/MuZero), trading computation for sample efficiency — the AI motif of reflex vs. deliberation.</li>\n</ul>",
          "mcq": [
            {
              "q": "A team has an LLM that already writes fluent, on-topic answers after SFT, but it sometimes produces confident-sounding wrong answers and they have no single 'correct' response to demonstrate — only the ability to say which of two answers is better. Which approach directly fits this situation?",
              "choices": [
                "More supervised fine-tuning on the existing demonstrations",
                "RLHF / preference optimization using pairwise comparisons",
                "Unsupervised pretraining on more raw text",
                "Increasing the model size and re-running SFT"
              ],
              "answer": 1,
              "explain": "The feedback available is comparative ('A is better than B'), which is evaluative — RL/preference optimization's native signal. SFT needs a single target response per prompt and can only push probability up on demonstrated text, never down on bad-but-fluent answers."
            },
            {
              "q": "In offline RL, why does naively running Q-learning on a fixed logged dataset tend to fail?",
              "choices": [
                "The dataset is too small to estimate gradients accurately",
                "The $\\max$ in the Bellman target selects out-of-distribution actions whose Q-values are erroneously overestimated, with no new data to correct them",
                "Rewards in logged data are always sparser than in online data",
                "Offline data violates the Markov property by construction"
              ],
              "answer": 1,
              "explain": "The Bellman backup's max systematically queries actions absent from the data, where Q is over-estimated; without interaction those errors compound. Fixes constrain to data support (BCQ/TD3+BC) or add pessimism on OOD actions (CQL)."
            },
            {
              "q": "What is the correct ordering of the three RLHF stages?",
              "choices": [
                "Reward model training, then SFT, then PPO optimization",
                "SFT, then reward model training (Bradley-Terry on preference pairs), then KL-regularized RL",
                "Pretraining, then PPO, then SFT to clean up",
                "Reward model training, then PPO, then DPO"
              ],
              "answer": 1,
              "explain": "RLHF is: (1) supervised fine-tuning to get a good reference policy, (2) train a reward model on human preference comparisons via the Bradley-Terry loss, (3) optimize the policy against that reward with a KL penalty to the SFT reference (classically PPO)."
            },
            {
              "q": "What is the key difference between AlphaZero and MuZero?",
              "choices": [
                "AlphaZero uses MCTS while MuZero uses pure policy gradients with no search",
                "AlphaZero plans with a known/given environment model (the game rules), while MuZero learns a latent dynamics model and plans inside it",
                "MuZero requires human demonstration data while AlphaZero learns from self-play",
                "AlphaZero is model-free while MuZero is model-based"
              ],
              "answer": 1,
              "explain": "Both are model-based and both use MCTS with self-play. The advance of MuZero is that it learns a value-equivalent latent model (representation, dynamics, prediction) and plans without being told the rules, extending the approach beyond games with known dynamics."
            },
            {
              "q": "The lesson claims a single fact explains 'almost every hard problem in RL' — exploration, off-policy correction, offline distribution shift, and reward hacking. What is that fact?",
              "choices": [
                "Rewards are typically sparse and delayed in time",
                "The data distribution depends on the model — changing the policy changes what the agent observes",
                "RL uses bootstrapping, which introduces bias into value estimates",
                "Most RL problems involve continuous, high-dimensional action spaces"
              ],
              "answer": 1,
              "explain": "The lesson's central thesis is that because the agent's own actions determine its future data, the data distribution depends on the policy — and this single coupling underlies exploration, off-policy correction, offline distribution shift, and reward hacking. The other options name real RL features but none is presented as the unifying fact."
            },
            {
              "q": "Direct Preference Optimization (DPO) is presented as a 'bridge between two worlds.' What does it actually exploit to avoid training a reward model, sampling, and running PPO?",
              "choices": [
                "It replaces the Bradley-Terry model with a simpler hinge loss on preference pairs",
                "It uses the closed-form optimum $\\pi^\\star(y\\mid x)\\propto \\pi^{\\text{SFT}}(y\\mid x)\\exp\\!\\big(r(x,y)/\\beta\\big)$, inverting it to write the reward in terms of the policy and collapsing RLHF into one supervised-style loss",
                "It distills the reward model into the policy by minimizing KL between them",
                "It runs PPO but caches the reward model outputs so they need not be recomputed"
              ],
              "answer": 1,
              "explain": "DPO exploits the closed-form optimum of the KL-regularized objective, inverting it to express the reward via the policy so the entire RLHF objective becomes a single supervised-style loss on preference pairs — no reward model, no sampling, no PPO. DPO actually retains the Bradley-Terry/logistic preference form (not a hinge loss), so option 0 is false."
            },
            {
              "q": "In the worked toy example, the alignment-optimal policy puts about 88% probability on the better response $A$ rather than 100%. What is the role of that residual ~12% mass on the worse response?",
              "choices": [
                "It is numerical error from the exponential normalization and should ideally be zero",
                "It is the KL regularization deliberately holding the policy back from collapsing onto $A$, which preserves diversity and guards against reward hacking",
                "It reflects the reward model's uncertainty about whether $A$ is truly better than $B$",
                "It comes from the PPO clipping range, which prevents the probability from reaching 1.0"
              ],
              "answer": 1,
              "explain": "The KL penalty to the SFT reference deliberately keeps the optimal policy from collapsing entirely onto the highest-reward response; the lesson states this residual mass is the regularization that prevents reward hacking and preserves diversity. It is not numerical error, reward-model uncertainty, or a PPO clipping effect — the 0.881/0.119 split comes directly from the closed-form KL-regularized optimum."
            },
            {
              "q": "According to the lesson, what is PPO's distinctive contribution to the RLHF optimization in Stage 3?",
              "choices": [
                "It defines a fundamentally different objective than the KL-regularized reward maximization",
                "It removes the need for a reward model by using verifiable rewards",
                "It clips the probability ratio so the policy moves toward the target in small, stable steps rather than overshooting on noisy reward estimates",
                "It guarantees the policy converges exactly to the closed-form optimum $\\pi^\\star$"
              ],
              "answer": 2,
              "explain": "The lesson states PPO's whole contribution is stability: its clipped ratio caps how far each update can move the policy, so it approaches the target in small steps over many minibatches instead of overshooting on a noisy reward estimate. The text explicitly says this is 'not a different objective,' PPO does not use verifiable rewards or remove the reward model, and it offers no exact-convergence guarantee."
            },
            {
              "q": "Using the KL-regularized optimum $\\pi^\\star(y\\mid x)\\propto \\pi^{\\text{SFT}}(y\\mid x)\\,\\exp(r(y)/\\beta)$ with a uniform reference $\\pi^{\\text{SFT}}(A)=\\pi^{\\text{SFT}}(B)=0.5$ and rewards $r(A)=2.0,\\ r(B)=0.0$, what happens to $\\pi^\\star(A)$ as you increase the KL weight $\\beta$ from $1.0$ toward very large values?",
              "choices": [
                "$\\pi^\\star(A)$ rises toward $1.0$, because a larger $\\beta$ rewards committing harder to the higher-reward response.",
                "$\\pi^\\star(A)$ stays fixed at $\\approx 0.881$, because the optimum depends only on the reward gap, not on $\\beta$.",
                "$\\pi^\\star(A)$ falls back toward $0.5$, because a larger $\\beta$ shrinks the effective reward $r/\\beta$ and pulls the policy toward the reference.",
                "$\\pi^\\star(A)$ drops below $0.5$, because the KL penalty inverts the preference once $\\beta$ exceeds the reward gap."
              ],
              "answer": 2,
              "explain": "Larger $\\beta$ divides the reward, so $\\exp(r/\\beta)\\to 1$ for all responses and the optimum collapses onto the reference distribution (here $0.5$). The tempting choice that bigger $\\beta$ means more commitment reverses the role of $\\beta$ as the alignment-tax knob: large $\\beta$ means barely improve, small $\\beta$ means reward-hack toward $A$."
            },
            {
              "q": "A team replaces the learned reward model in their RLHF Stage 3 with a programmatic check — for each generated solution they run the unit tests and set the reward to $1$ if all pass, else $0$ (RLVR). What changes relative to standard RLHF?",
              "choices": [
                "Nothing about the RL machinery changes; only the source of the scalar reward changes — the agent still maximizes a KL-regularized return over whole generations.",
                "It is no longer RL, because a verifiable pass/fail signal is a ground-truth label, making it ordinary supervised learning.",
                "The KL-to-reference term becomes unnecessary, because a verifiable reward cannot be hacked.",
                "Credit assignment disappears, because each generation now gets a single deterministic score instead of a learned one."
              ],
              "answer": 0,
              "explain": "The lesson states the RL machinery is identical and only the reward source changes when moving from a learned reward model to verifiable rewards. The distractors confuse a programmatic reward with a per-token label (it is still evaluative, sequence-level feedback) and wrongly assume verifiable rewards remove the need for KL regularization or credit assignment."
            },
            {
              "q": "Offline RL is described as 'strictly more powerful' than behavior cloning even though both learn from the same frozen dataset $\\mathcal{D}$ generated by $\\pi_\\beta$. What capability gives offline RL this edge, and what guardrail does it require to keep it?",
              "choices": [
                "It can query the environment for a few corrective interactions, as long as it stays within a safety budget.",
                "It can stitch together good fragments of different trajectories to exceed $\\pi_\\beta$, provided it constrains itself to the support of the data to avoid overestimating OOD actions.",
                "It can extrapolate Q-values to unseen actions, provided the dataset is large enough that no action is truly out-of-distribution.",
                "It can re-weight the dataset toward high-reward transitions, provided the behavior policy was already near-optimal."
              ],
              "answer": 1,
              "explain": "Offline RL can recombine good segments of separate trajectories to beat the data-generating policy, but only if it respects support constraints (or pessimism) so the Bellman max does not exploit erroneously high Q-values on OOD actions. The 'extrapolate to unseen actions' option is exactly the failure mode offline RL must avoid, and offline RL by definition allows no further interaction."
            },
            {
              "q": "After SFT, a chatbot writes fluent answers but still emits a polished, confident falsehood for certain prompts. A colleague proposes 'just add more high-quality demonstrations to the SFT set.' Why is that structurally insufficient, and what does RL post-training add?",
              "choices": [
                "SFT overfits the demonstrations; RL adds dropout-style regularization that improves generalization to new prompts.",
                "SFT only trains on short sequences; RL extends the context window so longer correct answers become reachable.",
                "SFT minimizes a token-level loss that is too noisy; RL replaces it with a lower-variance supervised target.",
                "SFT can only raise the probability of demonstrated sequences and never push down a bad-but-fluent completion; RL optimizes a scalar over whole generations, so it can both reward better answers and penalize undesirable ones."
              ],
              "answer": 3,
              "explain": "The negative-log-likelihood SFT objective only ever increases the probability of the demonstrated tokens; it gives no signal to suppress a fluent-but-wrong completion, so more demonstrations cannot directly down-weight bad outputs. RL optimizes an answer-level scalar objective, letting it trade off tokens to raise quality and explicitly penalize undesirable generations — the other options misattribute the gap to overfitting, context length, or variance."
            },
            {
              "q": "What makes reinforcement learning different \"in kind\" from supervised and unsupervised learning?",
              "choices": [
                "RL simply uses larger neural networks",
                "Evaluative (not instructive) feedback, sequential credit assignment across time, and the agent controlling its own data distribution — together they make RL a different discipline, not just a harder regression",
                "RL never uses gradient descent",
                "RL always requires a perfect model of the environment"
              ],
              "answer": 1,
              "explain": "Supervised learning gets the right answer for each input from a fixed dataset; RL only gets a <em>score</em>, rewards can be delayed, and the policy's own actions determine the next data — breaking the i.i.d. assumption. \"The data distribution depends on the model\" is the single fact behind most hard RL problems."
            },
            {
              "q": "In LLM post-training, what is the core difference between supervised fine-tuning (SFT) and RL?",
              "choices": [
                "They are identical; \"RL\" is just a newer name for fine-tuning",
                "SFT improves a policy by consequence, while RL clones demonstrations",
                "SFT needs a reward model, while RL needs labeled $(x,y^\\star)$ pairs",
                "SFT teaches by <em>example</em> (imitate demonstrated answers — its ceiling is demo quality, and it can't say which of two answers is better); RL teaches by <em>consequence</em> (raise the probability of higher-scoring whole answers and push down bad ones)"
              ],
              "answer": 3,
              "explain": "SFT is pure next-token imitation — it can only increase the probability of demonstrated sequences, never down-weight a bad-but-fluent one. RL optimizes a scalar objective over whole generations, so it can express comparative preferences and penalize undesirable outputs. SFT clones a policy; RL improves one."
            },
            {
              "q": "In RLHF, what is the <em>reward model</em>?",
              "choices": [
                "A model trained on human <em>preference comparisons</em> (A is better than B) that scores a response, providing the scalar reward the RL stage then optimizes — needed because open-ended quality has no single \"correct\" label",
                "The environment's built-in reward function, handed to you",
                "A model that predicts the next state from the current state and action",
                "The discount factor applied to future rewards"
              ],
              "answer": 0,
              "explain": "Because you can't write a ground-truth label for \"a good answer,\" RLHF learns a reward model from human rankings of competing responses, then uses RL (e.g. PPO) to push the policy toward responses the reward model scores highly — turning comparative human judgment into an optimizable signal."
            },
            {
              "q": "What is <em>offline</em> RL?",
              "choices": [
                "RL that runs without a GPU",
                "RL that ignores rewards entirely",
                "Learning a policy from a <em>fixed, previously-collected</em> dataset with no further environment interaction — valuable when live exploration is unsafe or costly (e.g. healthcare), but it must guard against overvaluing actions that are absent from the data",
                "RL where the reward arrives only at the very end of an episode"
              ],
              "answer": 2,
              "explain": "Offline RL decouples learning from data collection entirely. It is strictly more powerful than behavior cloning (it can improve on the logging policy), but naive Q-learning over-estimates out-of-distribution actions it can't verify — so methods constrain the policy to stay near the data's support."
            }
          ],
          "flashcards": [
            {
              "front": "Define offline (batch) RL and name its central failure mode.",
              "back": "Learning a policy from a fixed, previously collected dataset with no further environment interaction. Central failure: overestimation / distributional shift — the Bellman max queries out-of-distribution actions whose Q-values are erroneously high and cannot be corrected. Fixes: support constraints (BCQ, TD3+BC) or pessimism (CQL)."
            },
            {
              "front": "What are the three stages of the RLHF pipeline?",
              "back": "1) Supervised fine-tuning (SFT) on demonstrations to get a reference policy. 2) Reward model training on pairwise human preferences via the Bradley-Terry loss $-\\log\\sigma(r(y_w)-r(y_l))$. 3) RL optimization (PPO) maximizing reward minus a KL penalty to the SFT reference."
            },
            {
              "front": "Closed-form optimum of the KL-regularized RLHF objective, and what DPO does with it.",
              "back": "$\\pi^\\star(y\\mid x)\\propto \\pi^{\\text{SFT}}(y\\mid x)\\exp(r(y)/\\beta)$. DPO inverts this to express reward via the policy, collapsing the whole pipeline into a single supervised-style loss on preference pairs — no reward model, no sampling, no PPO."
            },
            {
              "front": "How does RL differ fundamentally from supervised learning?",
              "back": "Feedback is evaluative (a score) not instructive (the right answer); credit must be assigned across time (sequential); and the agent's own actions determine its future data — so the data distribution depends on the policy, breaking the i.i.d. assumption."
            },
            {
              "front": "Define model-based RL and state its main advantage.",
              "back": "Learning (or being given) a dynamics model $\\hat{p}(s'\\mid s,a)$ and reward, then planning by simulating futures inside it (e.g. MCTS in AlphaZero/MuZero). Main advantage: sample efficiency — imagined rollouts are cheap, trading computation for real interactions."
            },
            {
              "front": "What does the KL penalty (weight $\\beta$) do in RLHF, and what goes wrong at the extremes?",
              "back": "It keeps the optimized policy close to the SFT reference. Too small ($\\beta\\to 0$): the policy reward-hacks, exploiting quirks of the reward model. Too large: the policy barely changes and reward improves little. It is the alignment-tax / regularization knob."
            }
          ],
          "homework": [
            {
              "prompt": "You are given a large dataset of expert human trajectories controlling an industrial cooling system and you cannot run experiments on the live system. (a) Why is plain behavior cloning (supervised imitation) a limited approach here? (b) Why can't you just run standard online Q-learning on the logged data? (c) Name a class of methods designed for exactly this setting and the principle behind them.",
              "hint": "Think about (a) what BC's performance ceiling is, (b) what the Bellman max does on actions absent from the logs, and (c) two families: support constraints and pessimism.",
              "solution": "(a) Behavior cloning only reproduces the experts; its performance ceiling is the data-generating policy and it cannot improve on it, and it has no notion of reward so it can't prefer a better-but-undemonstrated action. It also suffers compounding errors under distribution shift at test time. (b) Standard Q-learning's target $r+\\gamma\\max_{a'}Q(s',a')$ evaluates the max over actions, which selects out-of-distribution actions whose Q-values are over-estimated; with no interaction to correct these errors, they bootstrap and blow up. (c) Offline RL methods. Principle: stay close to the data — either constrain the learned policy to the support of the behavior policy (BCQ, TD3+BC) or be pessimistic by penalizing Q-values on out-of-distribution actions (CQL). Unlike BC, these can still exceed the data policy by stitching good fragments of different trajectories while respecting support."
            },
            {
              "prompt": "For a prompt $x$, a policy can emit responses $A$ or $B$ with reference probabilities $\\pi^{\\text{SFT}}(A)=0.5,\\ \\pi^{\\text{SFT}}(B)=0.5$. The reward model gives $r(A)=1.0,\\ r(B)=0.0$. Using the closed-form optimum of the KL-regularized RLHF objective, compute the optimal policy $\\pi^\\star(A)$ for (i) $\\beta=1.0$ and (ii) $\\beta=0.2$. What does the comparison tell you about the role of $\\beta$?",
              "hint": "Use $\\pi^\\star(y)\\propto \\pi^{\\text{SFT}}(y)\\,e^{r(y)/\\beta}$, then normalize. Note $e^{1/0.2}=e^{5}$.",
              "solution": "Use $\\pi^\\star(y)\\propto \\pi^{\\text{SFT}}(y)e^{r(y)/\\beta}$. (i) $\\beta=1$: weights $w_A=0.5\\,e^{1}=1.359$, $w_B=0.5\\,e^{0}=0.5$. $\\pi^\\star(A)=1.359/(1.359+0.5)=0.731$. (ii) $\\beta=0.2$: $w_A=0.5\\,e^{5}=0.5\\cdot148.41=74.21$, $w_B=0.5$. $\\pi^\\star(A)=74.21/(74.21+0.5)=0.993$. Interpretation: smaller $\\beta$ weights reward more relative to the KL anchor, so the optimal policy concentrates much harder on the higher-reward response (0.73 vs 0.99). Large $\\beta$ keeps the policy near the reference (more conservative, more diverse); small $\\beta$ chases reward aggressively, which raises the risk of reward hacking if $r$ is an imperfect proxy."
            },
            {
              "prompt": "AlphaZero learns to play Go with no human game data, yet MuZero achieves comparable results without even being told the rules of the game. (a) What does AlphaZero assume that MuZero does not? (b) What three functions does MuZero learn, and what is the 'value-equivalence' idea that makes a learned model good enough to plan with? (c) Why is this relevant to LLM post-training?",
              "hint": "(a) think about the environment model. (b) representation / dynamics / prediction, and what the model is trained to predict (not to predict). (c) compare search-then-learn to the AlphaZero loop.",
              "solution": "(a) AlphaZero assumes a perfect known model of the environment — the game rules — so it can run MCTS directly in true game states. MuZero makes no such assumption; it must learn the dynamics. (b) MuZero learns: a representation function $h$ (observation -> latent state), a dynamics function $g$ (latent state + action -> next latent state and reward), and a prediction function $f$ (latent state -> policy and value). Value-equivalence: the model is trained only to predict the quantities needed for planning (reward, value, policy), NOT to reconstruct observations/pixels. A model that gets those planning-relevant quantities right is sufficient for good search even if it is a poor generative model of the world. (c) It is the same policy-improvement loop used in modern LLM reasoning: use deliberate computation (search / chain-of-thought) to act better than the raw network, then train (distill) the network on that improved behavior. RL post-training plays the role of 'search to act better, then learn from the better behavior,' mirroring AlphaZero/MuZero self-improvement."
            }
          ],
          "examples": [
            {
              "title": "Evaluative vs. Instructive Feedback on a 3-Armed Bandit",
              "body": "You face a slot machine with 3 arms. You pull arms and observe only the reward of the arm you chose: pull arm 2 and get $r=1$; pull arm 1 and get $r=0$; pull arm 2 and get $r=1$; pull arm 3 and get $r=0$. Contrast what an RL agent learns from this with what a supervised learner would need, and compute the empirical value estimate $\\hat{Q}(a)$ for each arm.",
              "solution": "<strong>Step 1 — Record the data the agent actually sees.</strong> RL feedback is evaluative: each pull reveals the reward of the chosen arm only, never the rewards of the arms not taken. Our log of $(a_t, r_t)$ is:\n\n$$(2,1),\\ (1,0),\\ (2,1),\\ (3,0).$$\n\n<strong>Step 2 — Compute the sample-average value estimate per arm.</strong> Define $\\hat{Q}(a)=\\frac{1}{N(a)}\\sum_{t:\\,a_t=a} r_t$, where $N(a)$ is the number of times arm $a$ was pulled.\n\n- Arm 1: pulled once, reward $0$, so $\\hat{Q}(1)=\\frac{0}{1}=0$.\n- Arm 2: pulled twice, rewards $1,1$, so $\\hat{Q}(2)=\\frac{1+1}{2}=1$.\n- Arm 3: pulled once, reward $0$, so $\\hat{Q}(3)=\\frac{0}{1}=0$.\n\n<strong>Step 3 — Contrast with supervised learning (instructive feedback).</strong> A supervised learner is handed the <em>correct label</em> for every input. The analogous \"label\" here would be: <em>the best arm is arm 2</em> — told directly, for free, on every example. The supervised learner never has to pull a bad arm to find out it is bad.\n\n<strong>Step 4 — Identify what the RL agent does NOT know.</strong> Our estimates say arm 2 looks best so far, but we have only one sample each for arms 1 and 3. Their true values could exceed arm 2's; we simply have not gathered enough evaluative feedback to know. The reward score told us how good our chosen actions were, never <em>which</em> action was optimal. This is the exploration problem in miniature.\n\n<strong>Answer.</strong> $\\hat{Q}(1)=0,\\ \\hat{Q}(2)=1,\\ \\hat{Q}(3)=0$. RL learns purely from scalar scores on actions taken (evaluative feedback) and must explore to reduce uncertainty, whereas supervised learning would be given the correct best action outright (instructive feedback)."
            },
            {
              "title": "Sequential Credit Assignment via a Bellman Backup",
              "body": "An agent walks a 4-state chain $s_0 \\to s_1 \\to s_2 \\to s_3$ (terminal). All immediate rewards are $0$ except $r=10$ collected on the transition into the terminal state $s_3$. With discount $\\gamma = 0.9$, compute the true return-based value $V(s_t)$ of each state and show how a one-step TD backup propagates credit from the late reward back to the early choice at $s_0$.",
              "solution": "<strong>Step 1 — Set up the return.</strong> The discounted return from state $s_t$ is $G_t = \\sum_{k\\ge 0}\\gamma^k r_{t+k}$. The only nonzero reward, $10$, arrives on the step entering $s_3$. Working backward from the terminal state lets us assign credit across the time gap.\n\n<strong>Step 2 — Compute true values by counting discount steps to the reward.</strong>\n\n- $V(s_3)=0$ (terminal, nothing left to collect).\n- $V(s_2)$: one step to the reward, so $V(s_2)=\\gamma^0 \\cdot 10 = 10$. (The reward is received on the very next transition.)\n- $V(s_1)$: the reward is two transitions away, so $V(s_1)=\\gamma \\cdot 10 = 0.9\\cdot 10 = 9$.\n- $V(s_0)$: three transitions away, so $V(s_0)=\\gamma^2 \\cdot 10 = 0.81\\cdot 10 = 8.1$.\n\n<strong>Step 3 — Verify these satisfy the Bellman equation.</strong> For a transition with reward $r$ to next state $s'$: $V(s) = r + \\gamma V(s')$. Check each:\n\n$$V(s_2)=r_{\\text{into }s_3}+\\gamma V(s_3)=10+0.9\\cdot 0 = 10.$$\n\nThen $V(s_1)=0+0.9\\cdot V(s_2)=0.9\\cdot 10 = 9.$ \nThen $V(s_0)=0+0.9\\cdot V(s_1)=0.9\\cdot 9 = 8.1.$ All consistent.\n\n<strong>Step 4 — Watch TD propagate credit one step at a time.</strong> Start every estimate at $\\hat{V}=0$ and apply the TD(0) update $\\hat{V}(s)\\leftarrow \\hat{V}(s)+\\alpha\\big[r+\\gamma\\hat{V}(s')-\\hat{V}(s)\\big]$ with learning rate $\\alpha=1$ (so the update is exact per visit). Replay the trajectory $s_0,s_1,s_2,s_3$ once, updating in order:\n\n- At $s_2$ (reward $10$ into terminal): $\\hat{V}(s_2)\\leftarrow 0+1\\cdot[10+0.9\\cdot 0-0]=10.$\n- At $s_1$: $\\hat{V}(s_1)\\leftarrow 0+1\\cdot[0+0.9\\cdot \\hat{V}(s_2)-0]=0.9\\cdot 10 = 9.$\n- At $s_0$: $\\hat{V}(s_0)\\leftarrow 0+1\\cdot[0+0.9\\cdot \\hat{V}(s_1)-0]=0.9\\cdot 9 = 8.1.$\n\n<strong>Step 5 — Read off the lesson.</strong> The reward physically appeared only at the end, yet after backups the early state $s_0$ correctly carries value $8.1$. This is sequential credit assignment: a reward at a late time step is propagated backward so that an early decision receives credit for a delayed outcome — exactly the role the Bellman backup and TD learning play, and a problem supervised learning never has to solve.\n\n<strong>Answer.</strong> $V(s_0)=8.1,\\ V(s_1)=9,\\ V(s_2)=10,\\ V(s_3)=0$, with each value obtained by discounting the terminal reward of $10$ by one extra factor of $\\gamma=0.9$ per step of distance, and reproduced exactly by chained one-step TD backups."
            }
          ]
        }
      ]
    },
    {
      "id": "rl-advanced",
      "title": "Model-Based, Offline & Imitation RL",
      "lessons": [
        {
          "id": "rl-model-based",
          "title": "Model-Based RL & Planning",
          "minutes": 17,
          "content": "<h3>1. The hook: learn a model, then plan with it</h3>\n<p>The model-free methods you have seen — Q-learning, SARSA, policy gradients — learn purely from trial and error, often needing millions of environment interactions. That is fine in a simulator but ruinous on a real robot or a costly system. <strong>Model-based RL</strong> takes a different bet: <em>learn how the world works</em> — a model of transitions and rewards — and then <em>plan</em> against that model, squeezing far more learning out of each precious real interaction.</p>\n\n<h3>2. Model-free vs. model-based</h3>\n<p>A <strong>model</strong> predicts the environment's dynamics: given a state $s$ and action $a$, it estimates the next-state distribution $p(s'\\mid s,a)$ and the reward $r(s,a)$. <strong>Model-free</strong> RL skips this and learns a value function or policy directly from experience. <strong>Model-based</strong> RL first learns (or is given) the model, then uses it to compute a good policy by <em>planning</em>. The trade is classic: model-free is simple and unbiased but sample-hungry; model-based is sample-efficient but only as good as its learned model.</p>\n\n<h3>3. Learning the model</h3>\n<p>From logged transitions $(s,a,r,s')$ you fit two predictors: a <strong>transition model</strong> $\\hat{p}(s'\\mid s,a)$ and a <strong>reward model</strong> $\\hat{r}(s,a)$. In small discrete problems these are just tallied frequencies and averages; in large or continuous problems they are neural networks trained by supervised regression. Crucially, model-learning is ordinary supervised learning — and it uses <em>every</em> transition, including the failures, whereas a value update only extracts a single scalar of signal per step.</p>\n\n<h3>4. Planning: turning a model into a policy</h3>\n<p>Once you have a model, you can <strong>plan</strong> without touching the real environment. With a known/learned model the methods you already know apply directly — value iteration and policy iteration compute the optimal policy by sweeping the model's equations. For large spaces you instead do <strong>rollouts</strong>: simulate trajectories from the model to estimate which actions look best from the current state. Planning is \"thinking\" — extra computation traded for fewer real-world samples.</p>\n\n<h3>5. Dyna: learning, planning, and acting together</h3>\n<p><strong>Dyna-Q</strong> elegantly fuses the two worlds. After each <em>real</em> step it does three things: (1) update the value function from the real transition (model-free), (2) update the learned model with that transition, and (3) run $k$ <em>simulated</em> updates by sampling remembered transitions from the model. Those imagined experiences let the agent propagate value information far faster than real steps alone — the same data, replayed mentally, accelerates learning dramatically.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Model-free learning is practicing only by playing real games. Dyna adds <em>imagining</em> games in your head between moves — each real experience is rehearsed many times, so one hard-won sample teaches far more.</p>\n</div>\n\n<h3>6. Monte Carlo Tree Search</h3>\n<p>When the model is a known simulator (board games, planning problems), <strong>Monte Carlo Tree Search (MCTS)</strong> plans by selectively growing a search tree of futures: it repeatedly <em>selects</em> a promising path (balancing exploration and exploitation, e.g. via UCT), <em>expands</em> a new node, <em>simulates</em> a rollout to estimate its value, and <em>backs up</em> the result to update ancestors. MCTS is the planning engine behind <strong>AlphaGo</strong> and <strong>AlphaZero</strong>, where it is guided by learned value and policy networks — a celebrated marriage of learning and planning.</p>\n\n<h3>7. The promise and the peril</h3>\n<p>Model-based RL can be <strong>orders of magnitude more sample-efficient</strong> than model-free — the headline reason to use it on real systems. Its Achilles' heel is <strong>model bias</strong>: planning trusts the model, so errors in $\\hat{p}$ <em>compound</em> over long rollouts, and the agent can learn to exploit fantasy transitions that don't exist. Practical methods fight this with short rollouts, model ensembles (to quantify uncertainty), and by mixing in real experience — accepting that a learned model is a useful but fallible map, not the territory.</p>\n\n<h3>8. Why this matters</h3>\n<p>Model-based RL is the frontier where RL meets the real world: robotics, control, and any setting where interaction is slow, expensive, or dangerous. The \"learn a model, plan with it\" idea also powers the most famous successes in the field (AlphaZero, MuZero — which even learns the model implicitly) and connects RL to control theory and planning. Knowing when the sample-efficiency win outweighs the model-bias risk is a key design judgment.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: a model lets you plan instead of only react</summary>\n<p>Model-free methods (Q-learning, policy gradients) learn purely from experienced rewards — they must actually <em>try</em> things in the world. <b>Model-based RL</b> instead learns a <em>model</em> of the environment: the transition dynamics $P(s' \\mid s, a)$ and the reward $R(s, a)$. With a model in hand the agent can <b>plan</b> — simulate rollouts internally, evaluate actions before committing, even search a tree of possible futures (the engine behind AlphaZero's lookahead).</p>\n<p>The payoff is <b>sample efficiency</b>: real experience is expensive (a robot breaks, a trade costs money), but simulated experience from the model is cheap and unlimited — Dyna interleaves real steps with planning steps off the learned model. The catch is <b>model error</b>: plan against a flawed model and you optimize a fantasy, since small dynamics errors compound over a long rollout.</p>\n<p>The \"aha\": model-free trades data for simplicity; model-based trades simplicity for data-efficiency. The whole design question is whether a learnable model is accurate enough that planning against it beats simply trying things for real.</p>\n</details>\n",
          "mcq": [
            {
              "q": "A team trains a robotic arm where each real-world trial costs money and risks hardware damage. Why might model-based RL be preferred over Q-learning here?",
              "choices": [
                "Model-based RL is guaranteed to find the optimal policy, while Q-learning is not",
                "Model-based RL never suffers from bias, unlike Q-learning",
                "Model-based RL is typically more sample-efficient, extracting more learning per costly real interaction",
                "Model-based RL does not require any reward signal to learn"
              ],
              "answer": 2,
              "explain": "The whole appeal of model-based RL is sample efficiency: it plans against a learned model to get more out of each expensive real interaction. It is not guaranteed optimal (it is limited by model accuracy), and it certainly is not unbiased — a flawed model introduces bias."
            },
            {
              "q": "In a small, discrete environment, how are the transition model $\\hat{p}(s'\\mid s,a)$ and reward model $\\hat{r}(s,a)$ typically estimated from logged transitions $(s,a,r,s')$?",
              "choices": [
                "By training a deep neural network with backpropagation",
                "By solving the Bellman optimality equation directly",
                "By sampling from a fixed prior distribution over dynamics",
                "By counting visit frequencies for transitions and averaging observed rewards"
              ],
              "answer": 3,
              "explain": "For small discrete problems the model reduces to tabulated frequencies (for $\\hat{p}$) and sample averages (for $\\hat{r}$). Neural networks are reserved for large or continuous spaces, and the Bellman equation is part of planning, not model fitting."
            },
            {
              "q": "What is the core trade-off between model-free and model-based RL as described?",
              "choices": [
                "Model-free is sample-efficient but biased; model-based is sample-hungry but unbiased",
                "Model-free is simple and unbiased but sample-hungry; model-based is sample-efficient but only as good as its learned model",
                "Model-free always converges faster in wall-clock time; model-based always converges slower",
                "Model-free requires a known reward function; model-based learns the reward"
              ],
              "answer": 1,
              "explain": "Model-free is simple and unbiased but needs many samples; model-based is sample-efficient yet its quality is capped by model accuracy. The first option simply swaps the properties, making it the classic trap answer."
            },
            {
              "q": "A student claims: 'Once we have learned a perfect model, planning against it gives the optimal policy, so model-based RL can never fail.' What is the flaw?",
              "choices": [
                "Models in practice are imperfect, and planning amplifies any model errors, so the policy is only as good as the learned model",
                "The claim is correct; a perfect model always yields the optimal policy via planning",
                "Planning ignores the reward model, so even a perfect transition model is useless",
                "Optimal policies require model-free methods regardless of model quality"
              ],
              "answer": 0,
              "explain": "The conditional 'once we have a perfect model' rarely holds — learned models have errors, and a planner can exploit those errors, producing a policy that fails in the real environment. This is the well-known model-bias pitfall the lesson warns about."
            },
            {
              "q": "In model-based RL, what does it mean to 'plan' once you have a model?",
              "choices": [
                "To collect more real environment transitions to refine the model",
                "To use the model's predicted dynamics and rewards to compute a good policy without further real interaction",
                "To directly observe the true transition probabilities of the environment",
                "To randomly perturb the current policy and keep improvements"
              ],
              "answer": 1,
              "explain": "Planning means computing a good policy using the model's simulated transitions and rewards, which is precisely how model-based RL saves real interactions. Collecting more real data is model learning, not planning."
            },
            {
              "q": "Suppose a learned transition model is highly accurate near states the agent has visited but wildly wrong in rarely-visited states. Why is this dangerous for a planner seeking high return?",
              "choices": [
                "The planner will avoid all unvisited states and stay perfectly safe",
                "Reward models are unaffected by transition errors, so there is no danger",
                "The planner may be drawn toward unvisited states where the erroneous model hallucinates high reward",
                "Accurate models near visited states guarantee globally accurate planning"
              ],
              "answer": 2,
              "explain": "A planner optimizing predicted return can latch onto regions where model errors falsely promise high reward — exploiting the model's mistakes. This is why naive model exploitation in poorly-modeled regions is risky."
            },
            {
              "q": "A discrete environment has been observed taking action $a$ in state $s$ five times, landing in $s_1$ three times and $s_2$ twice, with rewards $2, 2, 2, 4, 4$. What does the tabular learned model give for $\\hat{p}(s_1\\mid s,a)$ and $\\hat{r}(s,a)$?",
              "choices": [
                "$\\hat{p}(s_1\\mid s,a)=0.5$ and $\\hat{r}(s,a)=3.0$",
                "$\\hat{p}(s_1\\mid s,a)=0.6$ and $\\hat{r}(s,a)=3.0$",
                "$\\hat{p}(s_1\\mid s,a)=0.4$ and $\\hat{r}(s,a)=2.8$",
                "$\\hat{p}(s_1\\mid s,a)=0.6$ and $\\hat{r}(s,a)=2.8$"
              ],
              "answer": 3,
              "explain": "The frequency estimate is $3/5=0.6$, and the reward average is $(2+2+2+4+4)/5=14/5=2.8$. The distractors mix up the count ratio or miscompute the mean (e.g., 3.0 ignores the correct sum)."
            },
            {
              "q": "Why are neural networks used for the model in large or continuous state spaces, rather than the tabular tallying used for small discrete problems?",
              "choices": [
                "In large/continuous spaces, counts per exact state-action are sparse or undefined, so a function approximator is needed to generalize",
                "Neural networks are unbiased estimators of dynamics, unlike tables",
                "Tabular models cannot represent rewards, only transitions",
                "Neural networks remove the need for any logged transitions"
              ],
              "answer": 0,
              "explain": "With continuous or huge state spaces, you almost never revisit an exact state-action pair, so frequency tables fail; a neural network generalizes across similar states. Neural nets are not unbiased, and tables can represent rewards just fine in small problems."
            },
            {
              "q": "Which statement best distinguishes what a model-free method learns from what a model-based method learns first?",
              "choices": [
                "Model-free learns $p(s'\\mid s,a)$ and $r(s,a)$; model-based learns a value function",
                "Model-free learns a value function or policy directly; model-based first learns $p(s'\\mid s,a)$ and $r(s,a)$, then plans",
                "Both learn the transition model, but only model-based plans",
                "Both learn a policy directly, differing only in the optimizer used"
              ],
              "answer": 1,
              "explain": "Model-free skips dynamics and learns values/policies directly from experience; model-based first fits the transition and reward models, then plans. The first option reverses the two definitions, a common confusion."
            },
            {
              "q": "A model-based agent has learned its model from only 50 transitions and immediately plans an aggressive policy that the planner predicts will earn huge reward. What is the most prudent concern?",
              "choices": [
                "The planner is too conservative and should be made greedier",
                "With so little data the model is likely inaccurate, so the predicted huge reward may be a planning artifact, not real",
                "The reward model is irrelevant after planning begins",
                "More data would make the policy worse, so 50 transitions is ideal"
              ],
              "answer": 1,
              "explain": "With scarce data the learned model is unreliable, and the planner may be exploiting model errors that produce illusory high return — overconfidence in an under-trained model is the central model-based pitfall. Gathering more data generally improves, not worsens, the model."
            },
            {
              "q": "Which pair correctly identifies the two predictors fit when learning a model from data?",
              "choices": [
                "A policy network and a value network",
                "An advantage estimator and a baseline",
                "A transition model $\\hat{p}(s'\\mid s,a)$ and a reward model $\\hat{r}(s,a)$",
                "A Q-function and an exploration schedule"
              ],
              "answer": 2,
              "explain": "Learning a model means fitting the dynamics $\\hat{p}(s'\\mid s,a)$ and the reward $\\hat{r}(s,a)$ from logged $(s,a,r,s')$ tuples. Policies, values, advantages, and Q-functions are products of model-free learning or downstream planning, not the model itself."
            },
            {
              "q": "All else equal, if two agents reach the same final policy quality, which property most favors the model-based agent in a setting where real interactions are scarce and expensive?",
              "choices": [
                "It is mathematically simpler to implement",
                "It is guaranteed to be unbiased",
                "It avoids needing a reward signal",
                "It used fewer real environment interactions to get there"
              ],
              "answer": 3,
              "explain": "The defining advantage of model-based RL is sample efficiency — reaching comparable quality with fewer costly real interactions. Simplicity and unbiasedness are actually strengths of model-free methods, and a reward signal is still required to fit the reward model."
            },
            {
              "q": "What is <em>model-based</em> RL?",
              "choices": [
                "Learn a model of the environment — the transition dynamics $\\hat p(s'\\mid s,a)$ and reward $\\hat r(s,a)$ — then <em>plan</em> against it to derive a policy, rather than learning a value/policy directly from experience",
                "Learn a value function purely by trial and error, with no model",
                "Memorize an expert's actions from demonstrations",
                "Run gradient ascent directly on the policy's expected return"
              ],
              "answer": 0,
              "explain": "Model-based RL first fits a model of how the world responds, then computes a good policy by planning against it (value/policy iteration on the model, or rollouts). The bet: squeeze far more from each costly real interaction — at the cost of being only as good as the learned model."
            },
            {
              "q": "What does Dyna(-Q) do?",
              "choices": [
                "It trains two networks adversarially against each other",
                "It plans once at the start, then acts greedily forever",
                "After each real step it (1) updates values from the real transition, (2) updates the learned model, and (3) runs $k$ extra updates on <em>simulated</em> transitions sampled from the model — \"imagining\" experience to learn faster",
                "It discards the model and uses only Monte-Carlo returns"
              ],
              "answer": 2,
              "explain": "Dyna fuses learning and planning: each hard-won real transition is also used to improve the model and then \"rehearsed\" $k$ times via simulated updates. Those imagined experiences propagate value information far faster than real steps alone."
            },
            {
              "q": "What is Monte Carlo Tree Search (MCTS)?",
              "choices": [
                "A method for inferring the reward function from demonstrations",
                "A planner that grows a search tree of futures — repeatedly <em>select</em> a promising path (balancing exploration/exploitation, e.g. UCT), <em>expand</em> a node, <em>simulate</em> a rollout, and <em>back up</em> the value to ancestors — the planning engine behind AlphaGo/AlphaZero",
                "A scheme for normalizing observations before training",
                "A replay buffer that stores past transitions for reuse"
              ],
              "answer": 1,
              "explain": "Given a model (often a known simulator), MCTS spends compute to look ahead selectively, focusing search on promising lines. In AlphaZero it is guided by learned value and policy networks — a celebrated marriage of planning and learning."
            },
            {
              "q": "Why is model-based RL often far more sample-efficient than model-free?",
              "choices": [
                "Because model-based RL needs many more environment samples than model-free",
                "Because the model is always given by the environment and never has to be learned",
                "Because planning removes the need for any reward signal",
                "Because model-learning is ordinary supervised regression that extracts signal from <em>every</em> transition (including failures), whereas a value update extracts only one scalar per step — and planning then trades compute for real samples"
              ],
              "answer": 3,
              "explain": "A transition $(s,a,r,s')$ is a full supervised training example for the model, but only a single scalar of TD signal for a value function. Learning the dynamics once and then planning in it (Dyna, MCTS) reuses each precious real interaction many times over."
            }
          ],
          "flashcards": [
            {
              "front": "What is a model in RL, and how does model-based differ from model-free?",
              "back": "A model predicts the dynamics: transition $\\hat p(s'\\mid s,a)$ and reward $\\hat r(s,a)$. Model-free learns a value/policy directly from experience (simple, unbiased, sample-hungry); model-based learns the model then <em>plans</em> against it (sample-efficient, but limited by model accuracy)."
            },
            {
              "front": "How is the model learned, and why is it data-efficient signal-wise?",
              "back": "By supervised regression on logged $(s,a,r,s')$: fit $\\hat p(s'\\mid s,a)$ and $\\hat r(s,a)$ (tallies for small problems, neural nets for large). It extracts full predictive structure from every transition, vs. one scalar of value-signal per step in model-free updates."
            },
            {
              "front": "What is Dyna-Q's three-step loop after each real step?",
              "back": "(1) Update the value function from the real transition (model-free); (2) update the learned model with it; (3) run $k$ simulated updates from remembered/model-sampled transitions. Imagined experience propagates value far faster than real steps alone."
            },
            {
              "front": "What are the four phases of Monte Carlo Tree Search (MCTS)?",
              "back": "Selection (descend a promising path balancing exploration/exploitation, e.g. UCT), Expansion (add a new node), Simulation (rollout to estimate value), Backup (propagate the result to ancestors). The planning engine behind AlphaGo/AlphaZero."
            },
            {
              "front": "What is the main strength and the main weakness of model-based RL?",
              "back": "Strength: dramatically better sample efficiency (fewer real interactions). Weakness: model bias — errors in $\\hat p$ compound over long rollouts and the agent can exploit nonexistent \"fantasy\" transitions. Mitigations: short rollouts, model ensembles, mixing real data."
            },
            {
              "front": "Why is model-based RL preferred when environment interaction is expensive?",
              "back": "Because planning (\"thinking\") substitutes cheap computation for costly real samples, so each interaction teaches far more — essential for robotics/control where trials are slow, costly, or dangerous."
            }
          ],
          "homework": [
            {
              "prompt": "An agent gets one real environment step per second, but can run 1,000 simulated planning updates per second from a learned model. Qualitatively, how does Dyna-style planning change the number of real interactions needed to learn a good policy, and what is the key risk?",
              "hint": "Each real step is replayed many times in imagination; but the imagined steps use the learned model.",
              "solution": "With Dyna, each real transition is also used to update the model and then \"replayed\" through ~1,000 simulated updates, so value information propagates roughly a thousand times faster per real second — the agent can reach a good policy with far fewer real interactions (often orders of magnitude). The key risk is <strong>model bias</strong>: the 1,000 planning updates trust the learned model, so if $\\hat p$ or $\\hat r$ is wrong, the agent confidently learns from fantasy transitions and may converge to a policy that exploits model errors rather than the real environment. Short rollouts and uncertainty-aware models mitigate this."
            },
            {
              "prompt": "Explain why model errors are more damaging for long planning rollouts than for short ones.",
              "hint": "Each predicted step feeds the next; errors accumulate.",
              "solution": "In a rollout, the model's predicted next state becomes the input for the next prediction, so per-step errors <strong>compound</strong>: a small mistake at step 1 puts the model in a slightly wrong state, where its step-2 prediction is even less reliable, and so on. Over a long horizon the simulated trajectory can drift far from any real trajectory, making late-rollout values meaningless. Short rollouts keep the simulation close to states the model predicts well, bounding the accumulated error — which is why practical model-based methods favor short horizons (and re-ground frequently in real data)."
            },
            {
              "prompt": "AlphaZero combines a learned value/policy network with MCTS planning. Why is this combination more powerful than either the network alone or vanilla MCTS alone?",
              "hint": "The network gives priors/values; MCTS does lookahead search.",
              "solution": "The network alone gives a fast but fixed snap judgment of moves and positions; it cannot look ahead, so it misses tactics that require search. Vanilla MCTS alone must explore an astronomically large game tree with uninformed rollouts, which is far too slow to reach strong play. Combining them, the policy network focuses MCTS on the few promising moves (pruning the branching factor) and the value network replaces long random rollouts with an instant position evaluation (shortening the depth) — so the search is both narrower and shallower yet far more accurate. In turn, the improved move distribution MCTS produces becomes a training target that makes the network better, a self-reinforcing loop of learning + planning that neither component achieves alone."
            }
          ],
          "examples": [
            {
              "title": "Why model-based RL is more sample-efficient — concretely",
              "body": "Two agents learn the same gridworld. Agent A is tabular Q-learning (model-free); Agent B is Dyna-Q with 50 planning steps per real step. Both observe the same first 100 real transitions. Explain why Agent B will typically have a much better value function after those 100 real steps.",
              "solution": "After 100 real transitions, Agent A has performed exactly 100 value-function updates — and crucially, value information propagates only one step backward per update along actually-visited transitions, so it takes many real steps for reward signal to reach distant states. Agent B, from the same 100 real transitions, has (a) built a model that remembers all 100 transitions, and (b) performed $100\\times50=5{,}000$ additional simulated updates by replaying those remembered transitions in varied orders. Those replays let value information flow backward across the whole visited region repeatedly, so reward signal reaches far-away states quickly. With identical real experience, Agent B has effectively done 51× the value-propagation work, yielding a much sharper value function — the essence of model-based sample efficiency. (The caveat: B's gains are only as trustworthy as its model; in a stochastic or poorly-modeled environment some of those replays could mislead.)"
            },
            {
              "title": "When NOT to go model-based",
              "body": "You have a cheap, fast, perfectly-accurate simulator and effectively unlimited compute for environment interaction (e.g. a simple Atari emulator). Argue whether learning a model is worthwhile here.",
              "solution": "When real (simulated) interaction is essentially free and the \"environment\" is already a perfect simulator, the central advantage of model-based RL — saving expensive real samples — largely evaporates. Learning an approximate model $\\hat p$ would only introduce <strong>model bias</strong>: the agent would plan against an imperfect learned model when it could instead query the exact, free ground-truth dynamics directly. So a model-free method (or planning directly with the given perfect simulator, as MCTS does) is preferable: you avoid the modeling error entirely and the sample cost you would have saved is negligible. Model-based RL earns its keep precisely when real interaction is slow, costly, or dangerous — not when samples are abundant and exact."
            }
          ]
        },
        {
          "id": "rl-offline",
          "title": "Offline (Batch) Reinforcement Learning",
          "minutes": 16,
          "content": "<h3>1. The hook: learning from a fixed dataset, no exploration allowed</h3>\n<p>Every method so far assumed the agent can <em>act</em> — try things, see what happens, and learn from the consequences. But in medicine, autonomous driving, and recommendation, letting an untrained agent experiment is unethical, dangerous, or ruinously expensive. <strong>Offline (batch) RL</strong> tackles the hard case: learn the best possible policy purely from a <em>fixed, pre-collected dataset</em> of logged experience, with <em>no</em> further interaction with the environment.</p>\n\n<h3>2. The setting</h3>\n<p>You are handed a dataset $\\mathcal{D}$ of transitions $(s,a,r,s')$ logged by some <strong>behavior policy</strong> (a doctor's past decisions, a deployed recommender, a human driver) — and that is all you ever get. The goal is to output a policy that is <em>better</em> than the behavior policy, using only $\\mathcal{D}$. There is no exploration to fix mistakes, no chance to test a new idea. This single constraint changes everything.</p>\n\n<h3>3. The core problem: distributional shift</h3>\n<p>The defining difficulty is <strong>distributional shift</strong>: a learned policy will want to take actions the dataset rarely or never contains, and there is no data to evaluate them. Worse, value-based methods <em>overestimate</em> these out-of-distribution (OOD) actions. The Q-learning target $\\max_{a'} Q(s',a')$ deliberately picks the highest-valued next action — and for actions absent from the data, $Q$ is an unconstrained extrapolation that tends to be erroneously high. The max then <em>seeks out</em> exactly those over-optimistic phantoms.</p>\n\n<h3>4. Why naive off-policy RL fails offline</h3>\n<p>This creates a vicious cycle unique to the offline setting. Online, an agent that overvalues a bad action simply <em>tries</em> it, sees the low reward, and corrects the estimate. Offline, it can never try it — so the overestimation is never corrected, feeds back through the Bellman target into other states, and compounds. Standard off-policy algorithms (DQN, DDPG) that work fine online often <strong>diverge or produce garbage</strong> when run on a fixed dataset, precisely because the error-correction loop is severed.</p>\n<div class=\"callout sage\">\n<div class=\"c-tag\">The crux</div>\n<p>Online RL's safety net is that bad guesses get tested and fixed. Remove interaction, and any overestimate of an unseen action becomes a permanent delusion the algorithm actively chases. Offline RL is largely the art of <em>not trusting</em> values for actions the data can't vouch for.</p>\n</div>\n\n<h3>5. The fix: stay close to the data</h3>\n<p>Offline algorithms add a <strong>conservatism</strong> that keeps the policy honest about what the data supports:</p>\n<ul>\n<li><strong>Policy constraints</strong> (e.g. BCQ, BEAR): force the learned policy to choose actions close to those in $\\mathcal{D}$, so $Q$ is only ever queried where it has evidence.</li>\n<li><strong>Value penalization</strong> (e.g. CQL — Conservative Q-Learning): explicitly push <em>down</em> the Q-values of OOD actions, learning a lower bound so the policy can't be lured by inflated phantoms.</li>\n</ul>\n<p>Both encode the same principle: prefer actions the dataset can support, and be pessimistic about the rest. Pessimism, not optimism, is the right default when you cannot test your beliefs.</p>\n\n<h3>6. Worked intuition</h3>\n<p>Imagine learning to treat patients only from historical records where doctors gave drug A or B, never the untested drug C. A naive value method might extrapolate a sky-high value for C (nothing in the data contradicts it) and recommend it for everyone — a potentially catastrophic hallucination. An offline-RL method instead recognizes C is unsupported and either avoids recommending it or assigns it a conservative (low/uncertain) value, sticking to improvements it can actually justify from the records. The win is a policy that <em>safely</em> beats the logged behavior, not a fantasy optimum.</p>\n\n<h3>7. The promise</h3>\n<p>Offline RL is what lets RL touch domains where exploration is off the table: learning treatment policies from electronic health records, driving policies from fleets of logged human driving, dialogue and recommendation policies from massive interaction logs. It turns the vast <em>passive</em> data the world already records into decision policies — without the dangerous trial-and-error that made RL impractical there.</p>\n\n<h3>8. Why this matters</h3>\n<p>Offline RL is one of the most active frontiers because it removes RL's biggest deployment barrier — the need to explore in the real world. It also reframes a deep lesson: when you cannot gather more data, the safe move is <em>pessimism about the unknown</em>, a principle that echoes across robust ML and decision-making under uncertainty. The same logged-data abundance that powers supervised learning can, with the right conservatism, power decision-making too.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why offline RL fights distribution shift</summary>\n<p>Offline (batch) RL learns a policy from a <em>fixed</em> dataset of past transitions — no live interaction with the environment. That sounds easier, but it springs a subtle trap: <b>distribution shift</b>.</p>\n<p>A learned policy wants to take actions its value estimates rate highly — but those estimates were trained on the dataset's actions. For an action the data never tried in a given state, the value function is <em>extrapolating</em>, and that extrapolation is often wildly optimistic. Ordinary Q-learning then chases these phantom high values, yielding a policy that looks great on paper and fails in reality. The remedy is <b>conservatism</b>: penalize or avoid out-of-distribution actions (CQL pushes down the values of unseen actions; BCQ keeps the policy near the data's actions).</p>\n<p>The \"aha\": offline RL's hard part isn't optimization — it's <em>not trusting</em> your value estimates where you have no data. The whole field is about staying close enough to the behaviour that generated the dataset that your evaluations stay honest.</p>\n</details>\n",
          "mcq": [
            {
              "q": "In offline RL, what makes the Q-learning target $r + \\gamma\\max_{a'}Q(s',a')$ more dangerous than a target that uses the dataset's logged next action, $r + \\gamma Q(s',a'_{\\text{data}})$?",
              "choices": [
                "The $\\max$ operator is slower to compute over large action spaces",
                "The logged-action target ignores the discount factor $\\gamma$ entirely",
                "The $\\max$ target requires a known transition model $P$, which is unavailable offline",
                "The $\\max$ actively selects the action with the highest estimated value, which is exactly the over-optimistic OOD extrapolation"
              ],
              "answer": 3,
              "explain": "For actions absent from $\\mathcal{D}$, $Q$ is an unconstrained extrapolation that tends to be erroneously high; the $\\max$ deliberately seeks the highest value and so latches onto exactly those inflated OOD phantoms. The logged-action target only queries $Q$ where the data has evidence, so it is far more stable."
            },
            {
              "q": "A practitioner runs vanilla DQN on a fixed dataset and finds the Q-values blow up over training, even though the same DQN code works fine when allowed to interact online. What is the most likely root cause?",
              "choices": [
                "Offline, overestimated OOD action values are never corrected by trying them, so the error feeds back through Bellman targets and compounds",
                "The replay buffer is too small to hold the fixed dataset",
                "The learning rate must always be larger offline than online",
                "Distributional shift only affects policy-gradient methods, so DQN is immune"
              ],
              "answer": 0,
              "explain": "Online, an overvalued action gets tried, the low reward is observed, and the estimate is corrected; offline that corrective loop is severed, so overestimation propagates through Bellman targets and compounds, often causing divergence. Buffer size and learning rate are not the defining issue."
            },
            {
              "q": "Why is 'optimism in the face of uncertainty' — a useful principle in online RL — exactly the wrong default in offline RL?",
              "choices": [
                "Offline datasets are always larger, so there is no uncertainty to be optimistic about",
                "Optimism drives exploration online to validate high guesses, but offline the agent can never try the action, so an optimistic value becomes an uncorrectable delusion the policy chases",
                "Optimism causes the discount factor to exceed 1, destabilizing the Bellman backup",
                "Offline RL maximizes regret rather than return, which reverses the sign of optimism"
              ],
              "answer": 1,
              "explain": "Online, optimism is a feature: high values for under-explored actions push the agent to try them and confirm or correct the guess. Offline there is no trial, so the optimistic estimate is never validated and the policy keeps chasing it — hence pessimism about the unknown is the correct default."
            },
            {
              "q": "Conservative Q-Learning (CQL) and policy-constraint methods (BCQ, BEAR) differ in mechanism but share one underlying principle. What is it?",
              "choices": [
                "Both increase the discount factor to weight long-term rewards more heavily",
                "Both require additional online rollouts to refine the policy after training",
                "Both prefer actions the dataset supports and are pessimistic about everything else",
                "Both replace the $\\max$ with a softmax to smooth the Bellman target"
              ],
              "answer": 2,
              "explain": "CQL pushes down OOD Q-values (value penalization) while BCQ/BEAR force the policy to stay near dataset actions (policy constraint), but both encode the same idea: trust $Q$ only where there is evidence and be pessimistic about unsupported actions. Neither relies on online rollouts."
            },
            {
              "q": "Which of the following best describes what 'distributional shift' refers to in offline RL?",
              "choices": [
                "The reward distribution drifts over time within the logged dataset",
                "The state visitation of the behavior policy is non-stationary across episodes",
                "The discount factor must shift to account for the finite dataset size",
                "The learned policy wants to take actions the dataset rarely or never contains, where $Q$ has no data to be evaluated against"
              ],
              "answer": 3,
              "explain": "Distributional shift is the mismatch between the actions the learned policy prefers and the actions present in $\\mathcal{D}$: the policy queries $Q$ at out-of-distribution actions the data cannot vouch for. It is about the action/state coverage gap, not a drifting reward or discount."
            },
            {
              "q": "Consider an offline learner that, instead of using $\\max_{a'}Q(s',a')$, restricts the maximization to actions with sufficient support in $\\mathcal{D}$ at state $s'$. How does this most directly help?",
              "choices": [
                "It prevents the target from reaching for unsupported OOD actions whose $Q$-values are unreliable extrapolations",
                "It guarantees the policy will exactly match the behavior policy",
                "It eliminates the need for a discount factor in the Bellman backup",
                "It makes the algorithm on-policy rather than off-policy"
              ],
              "answer": 0,
              "explain": "By only maximizing over in-support actions, the target never queries $Q$ at OOD actions where the value is an over-optimistic extrapolation, breaking the overestimation loop. It does not force the policy to copy the behavior policy (it can still pick the best supported action) and does not remove $\\gamma$."
            },
            {
              "q": "The stated goal of offline RL is to output a policy that is BETTER than the behavior policy using only $\\mathcal{D}$. Why is simply doing behavioral cloning on $\\mathcal{D}$ insufficient for this goal?",
              "choices": [
                "Behavioral cloning requires online interaction, which is forbidden offline",
                "Behavioral cloning only reproduces the behavior policy's choices, so it can at best match — not exceed — the logged behavior",
                "Behavioral cloning cannot use the reward signal $r$, so it diverges on fixed data",
                "Behavioral cloning overestimates OOD actions even more aggressively than Q-learning"
              ],
              "answer": 1,
              "explain": "Cloning imitates the logged actions, so it caps performance at roughly the behavior policy's level and cannot improve on it. Offline RL's value is using the rewards in $\\mathcal{D}$ to find a policy that recombines logged decisions into something better, while staying conservative about unsupported actions."
            },
            {
              "q": "A common misconception is that offline RL fails simply because the dataset is too small. Even with an arbitrarily LARGE logged dataset from a fixed behavior policy, why can naive off-policy RL still break down?",
              "choices": [
                "Large datasets cause the discount factor to underflow numerically",
                "Larger datasets always increase variance of the Bellman target without bound",
                "If the behavior policy never takes certain actions, those actions remain OOD regardless of dataset size, so their $Q$-values stay unconstrained extrapolations",
                "With more data the $\\max$ operator becomes biased toward in-distribution actions"
              ],
              "answer": 2,
              "explain": "The problem is coverage, not raw size: actions the behavior policy never selects have no transitions at any dataset size, so $Q$ there is pure extrapolation that the $\\max$ can still latch onto. More samples of the same restricted behavior do not fill the OOD gap."
            },
            {
              "q": "Suppose at state $s'$ an OOD action $a^*$ has an erroneously high $Q(s',a^*)$. Trace the most accurate description of how this single error corrupts an offline Q-learner across the state space.",
              "choices": [
                "The error stays localized at $s'$ because Bellman backups only update the current state",
                "The error is automatically averaged away as more transitions into $s'$ are sampled",
                "The error only affects the policy at $s'$ and never touches the value function",
                "The inflated value enters Bellman targets for predecessor states, raising their $Q$-values, which then inflate THEIR predecessors, propagating backward with no corrective signal"
              ],
              "answer": 3,
              "explain": "The Bellman target $r+\\gamma\\max_{a'}Q(s',a')$ for any transition landing in $s'$ becomes inflated, raising $Q$ for states leading to $s'$; those raised values then inflate their own predecessors, so the overestimation propagates backward and compounds. Offline, no real transition with $a^*$ ever reveals its true low reward to pull it back."
            },
            {
              "q": "You must choose online vs. offline RL for three settings: (a) a board game with a fast, accurate simulator; (b) a sepsis-treatment policy to be learned from 10 years of ICU records; (c) a warehouse robot with a cordoned-off area where it can safely practice. Which assignment is correct?",
              "choices": [
                "(a) offline, (b) online, (c) offline",
                "(a) online, (b) offline, (c) online",
                "(a) offline, (b) offline, (c) online",
                "(a) online, (b) online, (c) offline"
              ],
              "answer": 1,
              "explain": "The deciding question is whether the agent can safely and affordably explore. A fast simulator (a) and a safe practice area (c) make exploration available, favoring online; sepsis treatment (b) cannot be experimented on real patients and already has a large logged dataset, the canonical offline case."
            },
            {
              "q": "An offline learner is trained on hospital records containing only treatments A and B, never an untested drug C. A naive value method recommends C for every patient. What is the conservative-offline diagnosis and remedy?",
              "choices": [
                "C is OOD with an unconstrained, inflated $Q$; a conservative method pushes its value down (or forbids straying to it), keeping the policy to A/B where evidence exists",
                "C is in-distribution but underrewarded; raise its learning rate to fix the estimate",
                "The behavior policy was stochastic, so importance weights overcounted C; reweight the returns",
                "C should be recommended because no data contradicts its high value"
              ],
              "answer": 0,
              "explain": "With no $(s, C, r, s')$ transitions, $Q(s,C)$ is pure upward extrapolation, and the $\\max$ prefers C everywhere — a hallucination that can never be checked. CQL-style value penalization or a policy constraint distrusts unsupported actions, anchoring recommendations to A/B and yielding a policy that safely improves on logged practice."
            },
            {
              "q": "Which statement most accurately captures the core lesson offline RL teaches about decision-making under uncertainty?",
              "choices": [
                "Uncertainty should always be resolved by exploring, regardless of the cost of mistakes",
                "When you cannot gather more data, the safe move is pessimism about the unknown, not optimism",
                "The right response to unseen actions is to assume they match the average value of seen actions",
                "Pessimism is only appropriate when the dataset is small; large datasets justify optimism about OOD actions"
              ],
              "answer": 1,
              "explain": "Because beliefs about unseen actions cannot be tested offline, an optimistic overestimate becomes a permanent, uncorrectable delusion the policy chases; pessimism about the unknown keeps the policy to improvements the data can justify. This principle echoes across robust ML and decision-making under uncertainty, independent of dataset size."
            },
            {
              "q": "What is <em>offline (batch)</em> reinforcement learning?",
              "choices": [
                "Reinforcement learning that simply runs without a GPU",
                "RL where the reward arrives only at the very end of an episode",
                "RL that learns a model of the dynamics and plans against it",
                "Learning the best possible policy purely from a <em>fixed, pre-collected</em> dataset of logged transitions, with <em>no further interaction</em> with the environment"
              ],
              "answer": 3,
              "explain": "Offline RL removes the agent's ability to act: you are handed a dataset $\\mathcal{D}$ of $(s,a,r,s')$ logged by some behavior policy and must produce a better policy from that alone — no exploration to test or fix new ideas."
            },
            {
              "q": "Why does offline RL matter — when is it the right setting?",
              "choices": [
                "Because offline RL is guaranteed to reach the optimal policy",
                "Because in domains like medicine, autonomous driving, or recommendation, letting an untrained agent explore for real is unethical, dangerous, or ruinously expensive — so you must learn from logged experience only",
                "Because it removes the need for any reward function",
                "Because it is mathematically simpler than online RL"
              ],
              "answer": 1,
              "explain": "Online RL assumes the agent can try things and learn from consequences. In high-stakes domains that experimentation is unacceptable, yet large logs of past decisions already exist — offline RL is how you turn those logs into a better policy without risky live exploration."
            },
            {
              "q": "In offline RL, what is the <em>behavior policy</em>?",
              "choices": [
                "The policy the offline algorithm outputs at the end",
                "A learned model of the environment's dynamics",
                "The policy that <em>generated</em> the logged dataset (e.g. the doctors' past decisions, a deployed recommender) — offline RL aims to learn a policy that beats it, using only that data",
                "A uniformly random exploration policy"
              ],
              "answer": 2,
              "explain": "The dataset $\\mathcal{D}$ is whatever the behavior policy did. Offline RL's goal is to <em>improve</em> on it from the logs alone — which is why simply cloning the behavior policy (behavioral cloning) can't exceed it."
            },
            {
              "q": "What is the guiding principle that makes offline RL work?",
              "choices": [
                "Be <em>pessimistic</em> about actions the data can't vouch for — stay close to the dataset and distrust (or penalize) the values of out-of-distribution actions, since you can never test them",
                "Be optimistic about unseen actions to encourage exploration",
                "Always pick the action with the highest extrapolated $Q$-value",
                "Ignore the logged rewards and learn the policy from scratch"
              ],
              "answer": 0,
              "explain": "Online RL's safety net — try a bad guess, see it fail, correct it — is gone offline, so an over-estimated unseen action becomes a permanent delusion the $\\max$ actively chases. Conservatism (policy constraints like BCQ, or value penalties like CQL) keeps the policy to what the data supports. Pessimism, not optimism, is the right default when you can't test your beliefs."
            }
          ],
          "flashcards": [
            {
              "front": "What is the offline (batch) RL setting?",
              "back": "Learn the best possible policy from a fixed, pre-collected dataset $\\mathcal{D}$ of logged transitions (from some behavior policy), with <em>no</em> further environment interaction or exploration. Goal: output a policy better than the behavior policy using only $\\mathcal{D}$."
            },
            {
              "front": "What is distributional shift, the core problem of offline RL?",
              "back": "The learned policy wants to take out-of-distribution (OOD) actions the dataset rarely/never contains, where $Q$ is an unconstrained — and typically over-optimistic — extrapolation. The Bellman $\\max_{a'}Q(s',a')$ actively seeks those inflated phantom values."
            },
            {
              "front": "Why do standard off-policy methods (DQN/DDPG) fail offline but work online?",
              "back": "Online, an overvalued bad action gets tried, the low reward is observed, and the estimate is corrected. Offline, it can never be tried, so the overestimation is never corrected, propagates through Bellman targets, and compounds — often causing divergence."
            },
            {
              "front": "Name the two families of offline-RL fixes and their shared principle.",
              "back": "Policy constraints (BCQ/BEAR: keep the policy's actions close to the data) and value penalization (CQL: push down OOD Q-values to learn a lower bound). Shared principle: be <em>pessimistic</em> about actions the data can't support; only trust $Q$ where there's evidence."
            },
            {
              "front": "Why is pessimism the right default in offline RL?",
              "back": "Because you can't test beliefs by acting. An <em>optimistic</em> overestimate of an unseen action becomes a permanent delusion the algorithm chases; being pessimistic about unsupported actions keeps the policy to improvements the data can actually justify."
            },
            {
              "front": "What does offline RL enable that online RL can't?",
              "back": "Learning decision policies in domains where exploration is unsafe/expensive/unethical — healthcare from EHRs, driving from logged fleets, recommendation/dialogue from interaction logs — turning passively-recorded data into policies without real-world trial and error."
            }
          ],
          "homework": [
            {
              "prompt": "In offline RL, explain why the Q-learning target $r + \\gamma\\max_{a'}Q(s',a')$ is especially dangerous compared to a SARSA-style target $r + \\gamma Q(s',a')$ that uses the dataset's own next action $a'$.",
              "hint": "The max actively selects the highest-valued action, including OOD ones.",
              "solution": "The $\\max_{a'}$ operator deliberately picks the action with the <em>highest</em> estimated value at $s'$ — and for actions absent from the dataset, $Q$ is an unconstrained extrapolation that is typically <em>overestimated</em>. So the max systematically selects exactly the over-optimistic OOD phantoms, injecting inflated values into the Bellman target with no way to correct them (you can't try those actions). A SARSA-style target uses the action $a'$ that actually appears in the data at $s'$, so $Q$ is only queried where there is evidence — it never reaches for unsupported actions and is far more stable offline. This is why many offline methods avoid or constrain the max (or penalize OOD values, as in CQL)."
            },
            {
              "prompt": "A hospital has records of two treatments (A, B) and their outcomes, but never a third option C. A naive offline Q-learner recommends C for all patients. Diagnose what went wrong and how a conservative offline method would behave.",
              "hint": "C is out-of-distribution; nothing in the data constrains its value.",
              "solution": "Treatment C is out-of-distribution: the dataset contains no $(s, C, r, s')$ transitions, so the learner's $Q(s,C)$ is pure extrapolation with nothing to anchor it — and value methods tend to extrapolate such unseen actions <em>upward</em>. The $\\max$ over actions then prefers C everywhere, a confident hallucination that can never be checked or corrected (no one will be given C to gather data). A conservative offline method (e.g. CQL or a policy-constrained method) explicitly distrusts unsupported actions: it pushes down the value of C (or forbids the policy from straying to actions unlike those in the data), so the recommendation stays within A/B where evidence exists, yielding a policy that safely improves on logged practice instead of chasing an untested fantasy."
            },
            {
              "prompt": "Contrast the role of exploration in online vs. offline RL, and explain why \"optimism in the face of uncertainty\" (great online) is exactly wrong offline.",
              "hint": "Optimism drives exploration online; offline there is no exploration to validate it.",
              "solution": "Online, <strong>optimism in the face of uncertainty</strong> is a feature: assigning high value to under-explored actions <em>drives</em> the agent to try them, and the resulting experience either confirms the optimism or corrects it — so optimism efficiently directs exploration. Offline, there is no exploration: the agent can never try the uncertain action, so an optimistic value is never validated and simply becomes a wrong, uncorrectable estimate that the policy then chases. The safety mechanism (try-and-correct) is gone. Therefore offline RL flips the default to <strong>pessimism in the face of uncertainty</strong>: assume unsupported actions are bad (or refuse to rely on their values), which keeps the learned policy anchored to what the data can actually justify. Same uncertainty, opposite correct response, because the ability to test beliefs is precisely what differs."
            }
          ],
          "examples": [
            {
              "title": "The overestimation feedback loop",
              "body": "Walk through how a single overestimated out-of-distribution action value can corrupt an offline Q-learner across many states, and why this loop does not occur online.",
              "solution": "Suppose at state $s'$ the action $a^*$ is OOD and its value $Q(s',a^*)$ is erroneously high. (1) The Bellman target for any transition landing in $s'$ is $r+\\gamma\\max_{a'}Q(s',a')=r+\\gamma Q(s',a^*)$ — inflated. (2) That inflated target raises $Q(s,a)$ for states $s$ leading to $s'$. (3) Those raised values become inflated targets for <em>their</em> predecessors, so the overestimation propagates backward through the state space. (4) Nothing ever pulls it back, because no real transition with $a^*$ is observed to reveal its true (low) reward. The error compounds and the value function can diverge.\n\nOnline, the loop breaks at step (4): the agent, now valuing $a^*$ highly, actually <em>takes</em> $a^*$, receives the true low reward, and the next Bellman update <em>lowers</em> $Q(s',a^*)$ toward reality. The very act of trying overvalued actions is the corrective signal — which offline learning lacks, which is why conservatism (penalizing or avoiding OOD values) must be imposed by hand."
            },
            {
              "title": "Choosing online vs. offline RL for a problem",
              "body": "For each scenario, state whether online or offline RL is appropriate and why: (a) a video-game AI with a fast simulator; (b) a sepsis treatment policy to be learned from 10 years of ICU records; (c) a warehouse robot that can safely practice in a cordoned-off test area.",
              "solution": "(a) <strong>Online</strong>: the simulator makes interaction fast, cheap, and safe, so exploration is free — there is no reason to accept the model-bias/conservatism costs of offline learning. Let the agent explore.\n\n(b) <strong>Offline</strong>: you cannot ethically have an untrained agent experiment with sepsis treatments on real patients, and you already possess a large logged dataset (10 years of ICU records). This is the canonical offline setting — learn a policy from the records with conservatism to avoid recommending unsupported (OOD) treatments.\n\n(c) <strong>Online</strong> (with care): a cordoned-off test area makes real exploration safe and repeatable, so the agent can gather its own interaction data — the online advantage of self-correction applies. (One might still warm-start from any logged data, but the defining feature here is that safe exploration <em>is</em> available, which favors online learning.)\n\nThe deciding question is always: <em>can the agent safely and affordably explore?</em> If yes, online; if no (only logged data exists), offline."
            }
          ]
        },
        {
          "id": "rl-imitation",
          "title": "Imitation Learning & Inverse RL",
          "minutes": 16,
          "content": "<h3>1. The hook: learning from demonstrations</h3>\n<p>Sometimes the easiest way to specify a behavior is not to design a reward but to <em>show</em> what good looks like: an expert drives the car, flies the drone, or plays the game, and the agent learns to imitate. <strong>Imitation learning</strong> turns expert demonstrations into a policy — sidestepping the notoriously hard problem of hand-crafting a reward function that captures what you actually want.</p>\n\n<h3>2. Behavioral cloning: imitation as supervised learning</h3>\n<p>The simplest approach, <strong>behavioral cloning (BC)</strong>, treats imitation as plain supervised learning: collect demonstration pairs (state $\\to$ expert action) and train a classifier/regressor to map states to the expert's actions. It is simple, stable, and needs no environment interaction or reward — just demonstrations. For many tasks with abundant data covering the relevant states, BC works remarkably well.</p>\n\n<h3>3. The fatal flaw: compounding errors</h3>\n<p>BC has a subtle, serious weakness: <strong>covariate shift</strong>. The policy is trained only on states the expert visited, but at deployment the agent acts on <em>its own</em> states. A small mistake takes it slightly off the expert's trajectory into a state it never saw in training — where its next action is even worse, pushing it further off — and errors <strong>compound</strong>. Whereas a supervised classifier's errors grow linearly with the number of decisions, BC's errors can grow <em>quadratically</em> in the episode length, because each mistake changes the future inputs. The agent drifts into uncharted territory and has no idea how to recover.</p>\n<div class=\"callout\">\n<div class=\"c-tag\">Intuition</div>\n<p>Learning to drive only by watching a perfect driver, you never see how to recover from the edge of the lane — because the expert was never there. Your first small drift takes you somewhere the demonstrations never covered, and you have no idea how to get back.</p>\n</div>\n\n<h3>4. DAgger: fixing the distribution mismatch</h3>\n<p><strong>DAgger</strong> (Dataset Aggregation) repairs covariate shift by collecting demonstrations on the <em>agent's own</em> states: run the current policy, and have the expert label the correct action for each state the agent actually visited (including its mistakes), then add these to the dataset and retrain. Iterating this aligns the training distribution with the deployment distribution, teaching the agent how to recover from its own errors. The cost is that it needs an <em>interactive</em> expert who can be queried on new states — not always available.</p>\n\n<h3>5. Inverse RL: recover the reward, not the actions</h3>\n<p><strong>Inverse reinforcement learning (IRL)</strong> takes a deeper route: rather than copying actions, it infers the <em>reward function</em> the expert appears to be optimizing, then runs ordinary RL on that recovered reward. The bet is that the reward is a more <strong>compact and transferable</strong> description of the task than the surface behavior. A reward learned from expert driving (\"stay centered, avoid collisions, make progress\") can generalize to new roads and situations the demonstrations never showed — whereas cloned actions cannot.</p>\n\n<h3>6. Why IRL can beat behavioral cloning</h3>\n<p>The contrast is about <em>what is learned</em>. BC learns a mapping from seen states to actions, so it fails off-distribution. IRL learns <em>why</em> the expert acts — the objective — which an RL agent can then optimize even in novel states, giving robustness to distribution shift and the ability to outperform the demonstrator in places the demos didn't cover. The price is that IRL is harder and more expensive (it solves an RL problem in the inner loop, and the reward is under-determined by behavior). Modern adversarial methods like <strong>GAIL</strong> blend the ideas: a discriminator learns to tell expert from agent trajectories, providing a reward-like signal that the policy is trained to fool — imitation without explicitly recovering a reward.</p>\n\n<h3>7. Worked intuition</h3>\n<p>Teach a robot to pour water. <strong>BC</strong> memorizes the exact joint trajectories of demonstrations and will fail if the cup starts in a new position the demos didn't include. <strong>IRL</strong> instead infers the <em>goal</em> (\"get liquid into the cup without spilling\"); an RL agent optimizing that goal handles new cup positions, because it understands the objective rather than the specific motions. Same demonstrations, but learning the intent generalizes where copying the motion does not.</p>\n\n<h3>8. Why this matters</h3>\n<p>Imitation learning is how we program behavior that is easy to demonstrate but hard to reward-engineer — a huge fraction of robotics, autonomous driving, and increasingly the alignment of large models. In fact, <strong>RLHF</strong> (reinforcement learning from human feedback) is a cousin of these ideas: it learns a reward model from human preference data and optimizes it, exactly the IRL-flavored move of inferring an objective from human behavior rather than hand-coding it. Knowing BC's covariate-shift failure and IRL's reward-transfer advantage is essential to using demonstrations well.</p>",
          "mcq": [
            {
              "q": "Behavioral cloning is best characterized as which kind of learning problem?",
              "choices": [
                "A supervised learning problem: fit a map from states to expert actions",
                "An unsupervised clustering of expert trajectories",
                "An online RL problem that maximizes a known reward via environment interaction",
                "A planning problem that searches the state space for the optimal path"
              ],
              "answer": 0,
              "explain": "BC treats demonstration pairs (state → expert action) as a labeled dataset and trains a classifier/regressor — plain supervised learning, with no reward and no environment interaction. The RL option is the classic confusion BC is precisely defined to avoid."
            },
            {
              "q": "A supervised classifier that errs with probability $\\epsilon$ per decision makes $\\sim\\epsilon T$ mistakes over $T$ i.i.d. examples. Roughly how does a behavioral-cloning policy's total error scale with horizon $T$, and why?",
              "choices": [
                "$O(\\epsilon T)$, because each decision is independent of the others",
                "$O(\\epsilon \\log T)$, because errors partially cancel over long episodes",
                "$O(\\epsilon T^2)$, because each mistake shifts the future state distribution, inducing cascades up to $O(T)$ steps long",
                "$O(\\epsilon^2 T)$, because two independent errors must coincide to cause failure"
              ],
              "answer": 2,
              "explain": "Because the agent's action determines its next state, a single mistake pushes it off-distribution where further mistakes are likelier; each of the $\\sim\\epsilon T$ initial errors can trigger a cascade of up to $O(T)$ steps, giving $O(\\epsilon T^2)$. The $O(\\epsilon T)$ option wrongly assumes the i.i.d. independence that BC violates."
            },
            {
              "q": "What precisely is the 'covariate shift' that makes behavioral cloning fragile?",
              "choices": [
                "The expert's actions drift over the course of a single demonstration",
                "The reward function changes between training and deployment",
                "The labels (expert actions) are noisy and inconsistent across demonstrations",
                "The state distribution at deployment (states the agent visits) differs from the state distribution in training (states the expert visited)"
              ],
              "answer": 3,
              "explain": "Covariate shift is a mismatch in the input (state) distribution: BC trains on expert-visited states but acts on its own states. It is about inputs, not noisy labels or a changing reward — BC has no reward at all."
            },
            {
              "q": "DAgger differs from plain behavioral cloning primarily in that it:",
              "choices": [
                "Collects new expert labels on states the current policy actually visits, then aggregates and retrains",
                "Replaces the expert's actions with rewards inferred by inverse RL",
                "Trains a discriminator to distinguish expert from agent trajectories",
                "Reweights the original demonstrations to emphasize rare expert actions"
              ],
              "answer": 0,
              "explain": "DAgger (Dataset Aggregation) runs the current policy, has an interactive expert label the agent's visited states, adds them to the dataset, and retrains — aligning training with deployment. The discriminator description is GAIL; inferring rewards is IRL."
            },
            {
              "q": "You can only learn from a fixed, historical recording of an expert pilot who is no longer reachable. Which method is fundamentally INAPPLICABLE here?",
              "choices": [
                "Inverse RL on the recorded trajectories",
                "Behavioral cloning on the recorded pairs",
                "DAgger",
                "GAIL using the recorded trajectories as the expert set"
              ],
              "answer": 2,
              "explain": "DAgger requires an interactive expert that can be queried for correct actions on new, agent-visited states; with only a static recording there is no way to obtain those fresh labels. BC, IRL, and GAIL all work from a fixed demonstration set."
            },
            {
              "q": "What does inverse reinforcement learning (IRL) try to recover from demonstrations?",
              "choices": [
                "A direct state→action policy that mimics the expert",
                "A value function $v(s)$ computed by Monte Carlo over the demos",
                "A reward function the expert appears to be optimizing, which RL then maximizes",
                "A transition model $p(s'\\mid s,a)$ of the environment"
              ],
              "answer": 2,
              "explain": "IRL infers the reward the expert is optimizing and then runs ordinary RL on that recovered reward. Learning a direct policy is BC; IRL deliberately recovers the objective ('why'), not the surface actions."
            },
            {
              "q": "Why can an IRL-based agent sometimes generalize to off-distribution states where a behavioral-cloning policy fails?",
              "choices": [
                "IRL trains on far more demonstrations than BC requires",
                "IRL's recovered reward is defined over all states, so RL can compute good actions even in states the demos never showed",
                "IRL memorizes the expert's exact trajectories with higher fidelity",
                "IRL avoids any environment interaction, eliminating distribution shift"
              ],
              "answer": 1,
              "explain": "A recovered reward is a global objective defined everywhere, so an RL agent can derive sensible actions in novel states by optimizing return. BC only stores state→action mappings for seen states, so it has no response off-distribution; and IRL actually requires more interaction (an inner RL loop), not less."
            },
            {
              "q": "A claim states: 'Since behavioral cloning learns directly from a near-optimal expert, with enough data it will reliably surpass the expert's performance.' What is wrong with this claim?",
              "choices": [
                "BC can only surpass the expert if trained with a discount factor $\\gamma < 1$",
                "Nothing is wrong; more data always pushes BC past the demonstrator",
                "BC needs the reward function to exceed the expert, which it never has",
                "BC has no notion of reward and only reproduces demonstrated behavior, so its performance ceiling is roughly the demonstrator's level"
              ],
              "answer": 3,
              "explain": "BC merely copies demonstrated state→action behavior and lacks any reward to judge better-but-undemonstrated actions, so it is capped near the demonstrator. Methods that infer or stitch toward higher return (IRL, RL) are what can exceed the expert."
            },
            {
              "q": "GAIL (Generative Adversarial Imitation Learning) blends imitation and IRL ideas by:",
              "choices": [
                "Explicitly recovering a reward function, then solving the MDP exactly with value iteration",
                "Asking an interactive expert to relabel the agent's visited states each round",
                "Training a discriminator to tell expert from agent trajectories and using its signal as a reward the policy is trained to fool",
                "Supervised-fitting the expert actions, then fine-tuning with PPO on the true reward"
              ],
              "answer": 2,
              "explain": "GAIL uses a discriminator as a learned reward-like signal that the policy learns to fool, matching expert behavior without explicitly recovering a reward. Explicit reward recovery is classical IRL; relabeling visited states is DAgger."
            },
            {
              "q": "Why is RLHF (RL from human feedback) described as a cousin of inverse RL rather than of behavioral cloning?",
              "choices": [
                "It learns a reward model from human preference data and then optimizes it, inferring an objective from human behavior",
                "It clones human-written responses token-by-token with supervised learning",
                "It requires an interactive human to relabel every state the model visits",
                "It searches the environment dynamics to plan optimal responses"
              ],
              "answer": 0,
              "explain": "RLHF fits a reward model from human preferences and runs RL on it — the IRL-flavored move of inferring an objective from human behavior rather than hand-coding a reward. Cloning responses directly would be the BC analogue."
            },
            {
              "q": "An autonomous-driving demonstration set contains only smooth, lane-centered highway driving — no examples of recovering from drifting toward the shoulder. What is the most likely failure mode of a behavioral-cloning policy, and the underlying cause?",
              "choices": [
                "It overfits the reward and drives too cautiously; cause is reward mis-specification",
                "It crashes immediately at the start because it never sees the initial state; cause is poor initialization",
                "It drives well until a small drift takes it to an unseen near-shoulder state, then acts poorly and drifts further; cause is covariate shift",
                "It explores the shoulder to gather data; cause is excessive exploration"
              ],
              "answer": 2,
              "explain": "The near-shoulder recovery states are absent from training, so once the policy drifts there it has no learned response, acts poorly, and drifts further — the compounding-error cascade of covariate shift. BC has no reward, so reward mis-specification is irrelevant."
            },
            {
              "q": "Which statement most accurately captures a genuine DISADVANTAGE of IRL relative to behavioral cloning?",
              "choices": [
                "IRL cannot generalize to states outside the demonstration distribution",
                "IRL is harder and costlier — it solves an RL problem in an inner loop, and the reward is under-determined by behavior",
                "IRL requires an interactive expert that BC does not",
                "IRL ignores the demonstrations entirely and relies only on a hand-coded reward"
              ],
              "answer": 1,
              "explain": "IRL's price is computational and statistical: it embeds an RL problem in its inner loop and the reward is under-determined (many rewards explain the same behavior). Better off-distribution generalization is an IRL advantage, not a drawback, and it does not need an interactive expert."
            },
            {
              "q": "What is <em>imitation learning</em>?",
              "choices": [
                "Learning a reward function purely by trial and error",
                "Learning a policy directly from <em>expert demonstrations</em> (state → action examples) — sidestepping the hard problem of hand-designing a reward that captures what you actually want",
                "Learning a model of the environment's transition dynamics",
                "Learning purely from a scalar reward signal with no examples"
              ],
              "answer": 1,
              "explain": "Sometimes it's far easier to <em>show</em> good behavior than to specify a reward for it. Imitation learning turns expert demonstrations into a policy, avoiding the notoriously hard task of reward design."
            },
            {
              "q": "What is the fundamental difference between behavioral cloning (BC) and inverse RL (IRL)?",
              "choices": [
                "They are two names for the same algorithm",
                "BC recovers the reward function while IRL clones the actions",
                "Both require an interactive expert available throughout training",
                "BC copies the expert's <em>actions</em> (supervised state→action); IRL instead infers the <em>reward</em> the expert seems to be optimizing, then runs ordinary RL on it — a more compact, transferable description of the task"
              ],
              "answer": 3,
              "explain": "BC learns \"what action did the expert take here?\"; IRL learns \"what was the expert trying to achieve?\" Recovering the objective lets an RL agent act sensibly even in states the demonstrations never covered — and potentially surpass the demonstrator."
            },
            {
              "q": "What problem does DAgger address, and how?",
              "choices": [
                "It fixes covariate shift by running the current policy, having the expert label the correct action for the states the <em>agent</em> actually visits (including its mistakes), then aggregating those and retraining — aligning training data with deployment",
                "It learns the reward function instead of the actions",
                "It trains a discriminator to tell expert trajectories from agent ones",
                "It plans against a learned model of the dynamics"
              ],
              "answer": 0,
              "explain": "Plain BC trains only on expert-visited states, so the agent's own drift takes it into unseen territory where errors compound. DAgger (Dataset Aggregation) repeatedly labels the agent's <em>own</em> states with expert actions, teaching it to recover — at the cost of needing an interactive expert to query."
            },
            {
              "q": "Why can an IRL-based agent generalize to situations where behavioral cloning fails?",
              "choices": [
                "Because IRL uses a larger neural network than BC",
                "Because IRL needs no demonstrations at all",
                "Because IRL learns <em>why</em> the expert acts (the objective), which an RL agent can optimize even in novel states the demos never showed — whereas BC's state→action mapping breaks off-distribution",
                "Because IRL memorizes more of the expert's trajectories"
              ],
              "answer": 2,
              "explain": "A learned reward (\"stay centered, avoid collisions, make progress\") is a compact, transferable description of the task that still gives sensible guidance on a brand-new road. Cloned actions, by contrast, are only defined on states resembling the demonstrations."
            }
          ],
          "flashcards": [
            {
              "front": "What is behavioral cloning (BC)?",
              "back": "Imitation as supervised learning: train a model to map states → the expert's actions from demonstration pairs. Simple, stable, needs no reward or environment interaction — just demos."
            },
            {
              "front": "What is the covariate-shift / compounding-error problem in BC?",
              "back": "BC is trained on expert-visited states but acts on its own states. A small error leads to an unseen state where the next action is worse, so errors compound — growing roughly <em>quadratically</em> in horizon (vs. linear for ordinary supervised learning). The agent drifts off-distribution and can't recover."
            },
            {
              "front": "How does DAgger fix BC's distribution mismatch?",
              "back": "Dataset Aggregation: run the current policy, have an <em>interactive expert</em> label the correct action on the states the agent actually visited (including mistakes), add to the dataset, retrain — iterating until the training distribution matches deployment. Cost: needs a queryable expert."
            },
            {
              "front": "What does inverse RL (IRL) learn, and why might that be better than BC?",
              "back": "IRL infers the <em>reward function</em> the expert optimizes, then runs RL on it. The reward is a compact, transferable description of the task, so it generalizes to novel states the demos didn't cover and can even outperform the demonstrator — where cloned actions fail off-distribution."
            },
            {
              "front": "What is GAIL?",
              "back": "Generative Adversarial Imitation Learning: a discriminator learns to distinguish expert from agent trajectories, providing a reward-like signal the policy is trained to fool — adversarial imitation that matches expert behavior without explicitly recovering a reward function."
            },
            {
              "front": "How is RLHF related to imitation/inverse RL?",
              "back": "RLHF learns a <em>reward model</em> from human preference data and optimizes it — the IRL-flavored move of inferring an objective from human behavior rather than hand-coding a reward, then doing RL on the inferred reward."
            }
          ],
          "homework": [
            {
              "prompt": "Explain why behavioral cloning errors can grow quadratically with episode length $T$, while a standard supervised classifier's errors grow linearly.",
              "hint": "In BC, today's action determines tomorrow's input distribution.",
              "solution": "In standard supervised learning the inputs are drawn i.i.d. from a fixed distribution, so if the classifier errs with probability $\\epsilon$ per example, the expected number of mistakes over $T$ examples is $\\sim\\epsilon T$ — linear, because mistakes don't change future inputs. In BC the agent's action determines the <em>next state</em> it sees, so a single mistake (prob $\\epsilon$) pushes it into a state slightly off the expert distribution, where it is more likely to err again, pushing it further off, and so on. Each of the $\\sim\\epsilon T$ initial mistakes can induce a cascade lasting up to $O(T)$ steps in unfamiliar territory, giving total error on the order of $\\epsilon T^2$ — quadratic in the horizon. The coupling between current action and future input distribution (covariate shift) is exactly what BC's i.i.d. assumption violates."
            },
            {
              "prompt": "Why does DAgger require an interactive expert, and in what situation is DAgger therefore not applicable even though plain behavioral cloning is?",
              "hint": "DAgger labels the agent's own visited states.",
              "solution": "DAgger works by running the current (imperfect) policy, collecting the new states it visits, and asking the expert \"what is the correct action <em>here</em>?\" for each — these fresh labels on agent-visited states are what align the training and deployment distributions. That requires an expert who can be <strong>queried on arbitrary new states</strong> at training time (e.g. a human who can sit in the loop, or an algorithmic oracle). Plain BC needs only a fixed batch of pre-recorded demonstrations and never queries the expert again. So DAgger is not applicable when the only thing available is a static demonstration dataset with no way to get new expert labels — for instance, learning from historical recordings of an expert who is no longer available. There, BC (or offline methods) is your only option, and you must live with its covariate-shift weakness."
            },
            {
              "prompt": "A self-driving demonstration dataset contains only smooth, centered highway driving — no recoveries from drifting toward the shoulder. Predict how a behavioral-cloning policy behaves, and explain how IRL could do better from the same data.",
              "hint": "Consider what states are/aren't covered, and what each method learns.",
              "solution": "A BC policy will drive well as long as it stays on the demonstrated (centered) distribution, but the moment it drifts slightly toward the shoulder it enters states <em>absent</em> from the demonstrations; it has no trained response, likely makes a poor action, drifts further, and fails to recover — the classic covariate-shift cascade. The data simply never shows how to correct, so BC can't learn it.\n\nIRL could do better by inferring the <em>reward</em> implied by the expert's behavior — e.g. \"high reward for staying centered and making progress, large penalty for leaving the lane/collision.\" That reward is defined over <em>all</em> states, including off-center ones the demos never visited. An RL agent optimizing this recovered reward will, even from a drifting state, compute that steering back toward center yields higher return — so it learns recovery behavior that was never demonstrated, because it understands the objective rather than merely copying centered-driving actions. (This presumes the recovered reward generalizes sensibly; that's the bet IRL makes, and why it can beat BC off-distribution.)"
            }
          ],
          "examples": [
            {
              "title": "Diagnosing an imitation failure",
              "body": "A drone trained by behavioral cloning flies perfectly in calm demonstrations but crashes in light wind. Explain the failure in terms of distribution shift, and give two distinct remedies (one for each of: needing an interactive expert vs. not).",
              "solution": "<strong>Diagnosis.</strong> The demonstrations were all in calm conditions, so the BC policy only learned state→action mappings for the on-distribution (calm, on-trajectory) states. Wind perturbs the drone into states slightly off that distribution; BC has no trained response there, so it acts poorly, the drone is pushed further off-trajectory into even less familiar states, and errors compound into a crash. This is covariate shift: training states (calm/expert) ≠ deployment states (windy/agent-visited).\n\n<strong>Remedy 1 (interactive expert available): DAgger.</strong> Fly the current policy in windy conditions, have an expert pilot label the correct corrective action for each perturbed state the drone actually encounters, aggregate these into the dataset, and retrain. Iterating teaches recovery from exactly the off-distribution states wind produces, aligning training with deployment.\n\n<strong>Remedy 2 (no interactive expert): inverse RL.</strong> Infer the reward the expert optimizes (stay on path, stay stable, reach the goal) from the calm demos, then run RL — in a simulator with wind, or onboard — to optimize that reward. Because the reward is defined over all states including wind-perturbed ones, the RL agent learns stabilizing/recovery actions the demonstrations never showed, generalizing beyond calm conditions. (GAIL would be a middle path: adversarially match expert-like flight without hand-specifying the reward.)"
            },
            {
              "title": "Imitation vs. designing a reward",
              "body": "You want a robot to set a dinner table. Compare specifying this task by (a) hand-engineering a reward function for RL vs. (b) imitation learning from human demonstrations, and explain why imitation is often the pragmatic choice — and what its main risk is.",
              "solution": "(a) <strong>Hand-engineered reward.</strong> \"Table is set correctly\" is fiendishly hard to encode: you'd need to formalize correct plate/utensil/glass positions, orientations, spacing, not-dropping-things, efficient motion, etc. Reward mis-specification is notorious — the agent will exploit any loophole (e.g. technically placing items while making a mess), and getting the reward exactly right can take more effort than the task itself.\n\n(b) <strong>Imitation learning.</strong> A human simply demonstrates setting the table a few times; BC or IRL turns those demonstrations into a policy with no reward engineering. This is pragmatic precisely because <em>showing</em> the desired behavior is far easier than <em>writing down</em> an objective that captures it — a huge advantage for tasks rich in tacit, hard-to-formalize criteria.\n\n<strong>Main risk:</strong> distribution shift / limited coverage. If demonstrations don't cover a situation (a cup in an unusual spot, an item knocked over), a BC policy won't know how to handle it and errors can compound; the data also caps performance at roughly the demonstrator's level. IRL mitigates this by learning the underlying goal (enabling generalization and even super-demonstrator performance), at the cost of a harder learning problem. The practical lesson: imitation trades the difficulty of reward design for the difficulty of distributional coverage."
            }
          ]
        }
      ]
    }
  ]
}
);
