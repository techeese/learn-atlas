(window.COURSES = window.COURSES || []).push(
{
  "id": "game-theory",
  "title": "Game Theory",
  "icon": "♟",
  "color": "#6b8e8e",
  "blurb": "Strategic interaction — players, payoffs, and equilibria. The math behind GANs, multi-agent RL, adversarial robustness, auctions, and alignment.",
  "modules": [
    {
      "id": "gt-foundations-mod",
      "title": "Foundations: Games and Equilibria",
      "lessons": [
        {
          "id": "gt-foundations",
          "title": "Games, Strategies, and Dominance",
          "minutes": 16,
          "content": "<h3>1. What a game is</h3>\n<p>Game theory is the study of <b>strategic interaction</b>: situations where your best move depends on what others do, and theirs depends on you. A <em>game</em> has three ingredients — <b>players</b> (the decision-makers), <b>strategies</b> (the choices each can make), and <b>payoffs</b> (how much each player values every possible outcome). That's it; from those three pieces an astonishing amount follows.</p>\n<h3>2. The payoff matrix</h3>\n<p>For two players with a few strategies each, the whole game fits in a <b>payoff matrix</b>. The most famous is the <b>Prisoner's Dilemma</b>: two suspects are interrogated separately and each can stay <em>silent</em> (cooperate with each other) or <em>confess</em> (betray). Each cell shows (row player's payoff, column player's payoff) as years of freedom lost — so bigger is better, and 0 is best:</p>\n<table class=\"payoff\"><caption>Prisoner's Dilemma — payoffs are (A, B), higher is better</caption>\n<thead><tr><th></th><th>B: stay silent</th><th>B: confess</th></tr></thead>\n<tbody>\n<tr><th>A: stay silent</th><td>−1, −1</td><td>−10, 0</td></tr>\n<tr><th>A: confess</th><td>0, −10</td><td>−5, −5</td></tr>\n</tbody></table>\n<h3>3. Dominant and dominated strategies</h3>\n<p>A strategy is <b>dominant</b> if it is your best choice <em>no matter</em> what the other player does. Look at player A: if B stays silent, confessing (0) beats silence (−1); if B confesses, confessing (−5) beats silence (−10). Confessing wins in <em>both</em> columns — so \"confess\" strictly <b>dominates</b> \"stay silent.\" The game is symmetric, so confessing dominates for B too. A rational player always plays a dominant strategy and never plays a <b>dominated</b> one.</p>\n<h3>4. Iterated elimination</h3>\n<p>Few games have an outright dominant strategy, but you can often <em>shrink</em> a game by repeatedly deleting dominated strategies — if a choice is never best, assume no one plays it, then re-examine what's left. This <b>iterated elimination of dominated strategies</b> sometimes solves a game outright and otherwise narrows it down before you reach for stronger tools.</p>\n<h3>5. Nash equilibrium</h3>\n<p>The central solution concept is the <b>Nash equilibrium</b>: a combination of strategies where <em>no player can do better by unilaterally changing their own move</em>, holding everyone else's fixed. It's a \"no regrets\" state — given what everyone else did, you're already playing your best response. In the Prisoner's Dilemma, (confess, confess) is the unique Nash equilibrium: from there, switching to silence would drop A from −5 to −10. John Nash proved that <em>every</em> finite game has at least one such equilibrium (allowing randomized strategies).</p>\n<div data-viz=\"gt-nash-2x2\"></div>\n<h3>6. The tragedy: Nash ≠ best for all</h3>\n<p>Here is the sting. The Nash outcome (confess, confess) gives each player −5 — yet if both had stayed silent they'd get −1 <em>each</em>. Mutual silence is strictly better for everyone, but it is <b>unstable</b>: each player is individually tempted to defect. Rational self-interest drives both to a collectively worse outcome. This gap between the equilibrium and the mutually-best outcome — between <em>individual</em> and <em>collective</em> rationality — is the engine behind tragedies of the commons, arms races, and price wars.</p>\n<h3>7. Why this is everywhere in AI</h3>\n<p>Strategic interaction is woven through modern AI. A <a href=\"#/lesson/deep-learning/dl-gans\" data-route>GAN</a> is literally a two-player <em>minimax</em> game between a generator and a discriminator. <b>Multi-agent reinforcement learning</b> studies agents whose rewards depend on each other. <b>Adversarial examples</b> are an attacker–defender game; <b>robustness</b> training is its equilibrium. <b>Mechanism design</b> — game theory run backwards — builds the ad auctions that fund the web and the incentive rules behind crowd-sourced data. Even <b>alignment</b> is a principal–agent game between humans and a capable optimizer. Learning to think in players, strategies, and payoffs is a genuine AI superpower.</p>\n<h3>8. Summary</h3>\n<p>A game is players × strategies × payoffs. A dominant strategy wins in every column; a Nash equilibrium is a state no one can unilaterally improve on; and the Prisoner's Dilemma shows the two can conspire to a collectively bad outcome. These ideas scale from two prisoners to the largest multi-agent AI systems.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: mixed strategies and why a Nash equilibrium always exists</summary>\n<p>Some games have <em>no</em> equilibrium in pure (deterministic) strategies — think rock-paper-scissors, where whatever you always-play can be exploited. The fix is a <b>mixed strategy</b>: a probability distribution over your choices (e.g. each of rock/paper/scissors with probability one-third). Nash's celebrated 1950 theorem says that <em>every</em> finite game has at least one equilibrium once mixed strategies are allowed. The proof is a fixed-point argument (Brouwer/Kakutani): the \"best-response\" map must have a fixed point, and a fixed point of best-response <em>is</em> an equilibrium. At a mixed equilibrium each player is <em>indifferent</em> among the strategies they mix — which is exactly what makes the opponent unable to exploit them.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: Nash vs Pareto — stable is not the same as good</summary>\n<p>An outcome is <b>Pareto-optimal</b> if no one can be made better off without making someone worse off. A <b>Nash equilibrium</b> is merely <em>stable</em> — no one can improve <em>unilaterally</em>. These are different axes, and the Prisoner's Dilemma is the canonical case where they collide: (confess, confess) is the unique Nash equilibrium but is Pareto-<em>dominated</em> by (silent, silent). Stability does not imply efficiency. Much of applied game theory — contracts, treaties, protocol design, mechanism design — is the art of <em>reshaping payoffs</em> so that the stable outcome is also the good one (e.g. repeated play, reputation, or binding penalties can make cooperation a Nash equilibrium).</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: zero-sum games, minimax, and the link to GANs</summary>\n<p>In a <b>zero-sum</b> game one player's gain is exactly the other's loss. Von Neumann's <b>minimax theorem</b> (1928) showed such games have a well-defined value: the most you can guarantee by maximizing your worst case equals the least your opponent can hold you to — <em>max-min = min-max</em>. That single fixed value is why two-player zero-sum games are \"solvable,\" and it underlies game-playing AI from minimax search to self-play. It is also the backbone of <a href=\"#/lesson/deep-learning/dl-gans\" data-route>GANs</a>: the generator and discriminator play a minimax game, and training seeks its equilibrium — which is why GAN training inherits all the instability of chasing a saddle point rather than descending to a minimum.</p>\n</details>\n<h3>Try it: find the dominant strategy</h3>\n<p>A strategy dominates if it beats every alternative in every column. Run this to detect a strictly dominant row:</p>\n<div data-code=\"javascript\" data-expected=\"dominant row: 0\">// A payoff matrix for the ROW player. Is there a row that is best in EVERY column?\nconst A = [[3, 2], [1, 0]];   // row 0 vs row 1, across two columns\nfunction dominantRow(M) {\n  for (let i = 0; i &lt; M.length; i++) {\n    let dom = true;\n    for (let j = 0; j &lt; M.length; j++) if (j !== i)\n      for (let c = 0; c &lt; M[i].length; c++) if (M[i][c] &lt;= M[j][c]) dom = false;\n    if (dom) return i;   // row i beats every other row in every column\n  }\n  return -1;             // no strictly dominant row\n}\nconsole.log(\"dominant row: \" + dominantRow(A));   // row 0: 3>1 and 2>0</div>",
          "mcq": [
            {
              "q": "A game in game theory is fully specified by:",
              "choices": [
                "Players, their strategies, and the payoffs for each outcome",
                "Only the number of players",
                "A single optimal action",
                "The order in which players are born"
              ],
              "answer": 0,
              "explain": "Players × strategies × payoffs is the whole game."
            },
            {
              "q": "A strategy is \"dominant\" when it is:",
              "choices": [
                "The choice the other player makes",
                "Your best choice no matter what the other players do",
                "Best only if the opponent cooperates",
                "Chosen at random"
              ],
              "answer": 1,
              "explain": "Dominant = best in every column."
            },
            {
              "q": "A Nash equilibrium is a strategy profile where:",
              "choices": [
                "All players pick the same strategy",
                "Every player gets their highest possible payoff",
                "No player can do better by changing only their own move",
                "The game has no payoffs"
              ],
              "answer": 2,
              "explain": "Nash = no profitable unilateral deviation."
            },
            {
              "q": "In the Prisoner's Dilemma, the unique Nash equilibrium is:",
              "choices": [
                "There is no equilibrium",
                "Both stay silent",
                "One confesses, one stays silent",
                "Both confess — worse for both than mutual silence"
              ],
              "answer": 3,
              "explain": "(Confess, confess): defection dominates, though it's collectively worse."
            },
            {
              "q": "Why is (stay silent, stay silent) NOT a Nash equilibrium in the Prisoner's Dilemma?",
              "choices": [
                "Either player can improve their own payoff by unilaterally confessing",
                "It gives the worst payoff to both",
                "It is illegal",
                "Silence is a dominant strategy"
              ],
              "answer": 0,
              "explain": "A profitable unilateral deviation exists, so it isn't stable."
            },
            {
              "q": "Nash proved that every finite game has at least one equilibrium, provided you allow:",
              "choices": [
                "Infinitely many players",
                "Mixed (randomized) strategies",
                "Negative payoffs",
                "Cooperation agreements"
              ],
              "answer": 1,
              "explain": "Mixed strategies guarantee existence (fixed-point theorem)."
            },
            {
              "q": "A Pareto-optimal outcome is one where:",
              "choices": [
                "The payoffs sum to zero",
                "Everyone plays their dominant strategy",
                "No one can be made better off without making someone worse off",
                "It is always the Nash equilibrium"
              ],
              "answer": 2,
              "explain": "Pareto = efficiency; distinct from Nash stability."
            },
            {
              "q": "A GAN is, in game-theoretic terms:",
              "choices": [
                "A game with no equilibrium",
                "A single-player optimization with no opponent",
                "A cooperative game with shared payoff",
                "A two-player zero-sum (minimax) game between generator and discriminator"
              ],
              "answer": 3,
              "explain": "Generator vs discriminator is a minimax game."
            },
            {
              "q": "A \"best response\" is:",
              "choices": [
                "The strategy that maximizes your payoff given what the others are doing",
                "The strategy that helps the other player most",
                "Always a dominant strategy",
                "A randomly chosen strategy"
              ],
              "answer": 0,
              "explain": "Best response = optimal reply to fixed opponent play."
            },
            {
              "q": "Iterated elimination of dominated strategies works by:",
              "choices": [
                "Adding new strategies each round",
                "Repeatedly deleting strategies no one would ever play, then re-examining what's left",
                "Picking the highest single payoff in the matrix",
                "Randomizing over all strategies"
              ],
              "answer": 1,
              "explain": "Delete dominated options and re-solve the smaller game."
            },
            {
              "q": "Matching Pennies has no pure-strategy Nash equilibrium, so its only equilibrium is:",
              "choices": [
                "Whatever the first mover picks",
                "Both players choosing Heads",
                "A mixed strategy — randomizing 50/50",
                "There is no equilibrium at all"
              ],
              "answer": 2,
              "explain": "Zero-sum with no pure NE → mix 50/50."
            },
            {
              "q": "A game is \"zero-sum\" when:",
              "choices": [
                "Players cooperate fully",
                "Both players always get zero",
                "The payoffs are all positive",
                "One player's gain is exactly the other's loss"
              ],
              "answer": 3,
              "explain": "Zero-sum: payoffs sum to a constant; pure conflict."
            },
            {
              "q": "Mechanism design is best described as:",
              "choices": [
                "Designing the rules and payoffs so the desired outcome becomes an equilibrium",
                "Finding the Nash equilibrium of a fixed game",
                "Eliminating dominated strategies",
                "Playing the same game repeatedly"
              ],
              "answer": 0,
              "explain": "Game theory run backwards: design incentives."
            },
            {
              "q": "In a repeated Prisoner's Dilemma, cooperation can become stable because:",
              "choices": [
                "Players forget the past each round",
                "Future punishment for defecting can outweigh the one-time gain",
                "Defection stops being possible",
                "The payoffs become zero-sum"
              ],
              "answer": 1,
              "explain": "Reputation/retaliation makes cooperation a best response."
            },
            {
              "q": "A \"dominated\" strategy is one that:",
              "choices": [
                "Is the Nash equilibrium",
                "Always wins",
                "Is never the best choice, whatever the opponent does — so a rational player avoids it",
                "Must be played with positive probability"
              ],
              "answer": 2,
              "explain": "Dominated = beaten in every column; never rational to play."
            },
            {
              "q": "Stag Hunt has two pure Nash equilibria (Stag,Stag) and (Hare,Hare). This captures:",
              "choices": [
                "A zero-sum game",
                "Pure conflict with no cooperation",
                "A game with a single dominant strategy",
                "A coordination problem — the better outcome needs mutual trust, the safe one doesn't"
              ],
              "answer": 3,
              "explain": "Coordination: payoff-dominant vs risk-dominant equilibria."
            }
          ],
          "flashcards": [
            {
              "front": "The three ingredients of a game",
              "back": "<b>Players</b> (who decides), <b>strategies</b> (the choices each has), and <b>payoffs</b> (how each player values every outcome)."
            },
            {
              "front": "Dominant strategy",
              "back": "A choice that is best <em>no matter</em> what the other players do. A rational player always plays it; they never play a <em>dominated</em> strategy."
            },
            {
              "front": "Nash equilibrium",
              "back": "A strategy profile where no player can do better by changing only their own move (everyone else fixed). A \"no unilateral regret\" state. Every finite game has one in mixed strategies."
            },
            {
              "front": "The Prisoner's Dilemma tragedy",
              "back": "The unique Nash equilibrium (both confess) is <em>worse for everyone</em> than mutual silence — but silence is unstable because each player is tempted to defect. Individual vs collective rationality."
            },
            {
              "front": "Mixed strategy",
              "back": "A probability distribution over your choices (e.g. rock/paper/scissors each with probability one-third). Needed when no pure-strategy equilibrium exists; Nash's theorem guarantees a mixed one always does."
            },
            {
              "front": "Zero-sum games and minimax",
              "back": "One player's gain is the other's loss. Von Neumann's minimax theorem gives such games a single value (max-min = min-max) — the basis of game-playing AI and the GAN objective."
            }
          ],
          "homework": [
            {
              "prompt": "In the Prisoner's Dilemma, explain why (stay silent, stay silent) is NOT a Nash equilibrium even though it gives both players a better payoff than (confess, confess).",
              "hint": "Check whether either player can improve by unilaterally deviating.",
              "solution": "Nash equilibrium requires that no player can gain by changing <em>only</em> their own move. From (silent, silent) each player gets −1; but if A alone switches to confess, A's payoff rises from −1 to 0 (B stays at silent). Because a profitable unilateral deviation exists, (silent, silent) is not a Nash equilibrium — it is Pareto-better but unstable. (Confess, confess) is the equilibrium precisely because neither can improve alone."
            },
            {
              "prompt": "A row player has payoff matrix [[5, 1], [4, 3]] (rows are strategies, columns are the opponent's). Is either row strictly dominant?",
              "hint": "A row dominates only if it wins in BOTH columns.",
              "solution": "Compare row 0 = [5, 1] with row 1 = [4, 3]. In column 0, row 0 wins (5 > 4); in column 1, row 1 wins (3 > 1). Neither row beats the other in <em>both</em> columns, so there is <b>no strictly dominant row</b>. The best choice depends on what the opponent does — exactly the situation where you need Nash equilibrium (or more information) rather than dominance."
            },
            {
              "prompt": "Give one example from AI that is naturally a two-player game, and name the two players and what each is trying to maximize.",
              "hint": "Think generator/discriminator, or attacker/defender.",
              "solution": "A <b>GAN</b> is the cleanest example: the <em>generator</em> tries to maximize the discriminator's error (fool it into calling fakes real), while the <em>discriminator</em> tries to maximize its accuracy at telling real from fake. It is a zero-sum minimax game, and training searches for its equilibrium. Other valid answers: adversarial-example attacker vs robust-model defender; bidders vs the auctioneer's mechanism; competing agents in multi-agent RL."
            }
          ],
          "examples": [
            {
              "title": "Spotting a dominant strategy",
              "body": "Two firms each choose a High or Low price. Row firm's payoffs: if it prices High it earns 2 (vs High) or 0 (vs Low); if Low it earns 3 (vs High) or 1 (vs Low). Does it have a dominant strategy?",
              "solution": "Compare Low vs High for the row firm. Against opponent High: Low gives 3 > High's 2. Against opponent Low: Low gives 1 > High's 0. Low wins in <em>both</em> columns, so <b>Low is strictly dominant</b> — the firm should price Low regardless of the rival. If the game is symmetric, both price Low, and (Low, Low) is the Nash equilibrium (often worse for both than (High, High) — a price war, structurally a Prisoner's Dilemma)."
            },
            {
              "title": "Rock-paper-scissors has no pure equilibrium",
              "body": "Why is there no single deterministic \"best move\" in rock-paper-scissors, and what is the equilibrium?",
              "solution": "Any pure strategy is exploitable: if you always play rock, your opponent always plays paper and you always lose. So no pure-strategy Nash equilibrium exists. The unique equilibrium is the <b>mixed strategy</b> of playing each option with probability one-third: then your opponent's expected payoff is the same whatever they do (they are indifferent), so they cannot exploit you. This is the smallest vivid case of why Nash's theorem needs randomization."
            },
            {
              "title": "Reshaping the game to get cooperation",
              "body": "Two countries are in a Prisoner's-Dilemma-style arms race where the Nash outcome is \"both arm.\" How might a treaty change the game?",
              "solution": "Add a <b>binding penalty</b> for defecting (arming). If the penalty for breaking the treaty is large enough, the payoff for \"arm while the other disarms\" drops below the payoff for \"both disarm,\" so disarming becomes a best response and (disarm, disarm) becomes the Nash equilibrium. This is <b>mechanism design</b> in miniature: you don't change the players' rationality, you change the <em>payoffs</em> so the stable outcome is also the good one. Repetition and reputation can achieve the same effect without an external enforcer."
            }
          ]
        },
        {
          "id": "gt-mixed-zero-sum",
          "title": "Mixed Strategies and Zero-Sum Games",
          "minutes": 17,
          "content": "<h3>1. When pure strategies fail</h3>\n<p>Some games have no equilibrium in <em>pure</em> (deterministic) strategies. In rock-paper-scissors, any fixed choice you always make is instantly exploitable — always-rock loses to always-paper. <a href=\"#/lesson/game-theory/gt-foundations\" data-route>Matching Pennies</a> is the same: whatever you reliably do, the opponent reads and beats. There is no \"no-regret\" deterministic profile, so Nash equilibrium seems to fail — until we let players randomize.</p>\n<h3>2. Mixed strategies</h3>\n<p>A <b>mixed strategy</b> is a probability distribution over your options — play rock, paper, and scissors each with probability $\\tfrac13$. Now there is nothing to read: your move is random. A <em>pure</em> strategy is just the special case of a mixed strategy that puts all its weight on one option. Allowing mixing is what rescues the theory.</p>\n<h3>3. The indifference principle</h3>\n<p>Here is the key idea. At a mixed-strategy Nash equilibrium, each player chooses their mixing probabilities so as to make the <em>opponent indifferent</em> among the strategies the opponent actually uses. Why? If the opponent were <em>not</em> indifferent — if one of their options paid more — they would shift all their weight onto it, and your mix would no longer be a best response. Equilibrium mixing is precisely the mix that removes the opponent's incentive to deviate. (Counter-intuitively, you pick your probabilities to balance <em>their</em> payoffs, not your own.)</p>\n<h3>4. Computing a 2×2 mixed equilibrium</h3>\n<p>Apply the indifference principle to a $2\\times2$ game: the row player mixes row 0 with probability $p$, and we choose $p$ so the column player gets the same expected payoff from either column. That's one linear equation in $p$. For symmetric games like rock-paper-scissors it gives the uniform mix; for skewed payoffs it tilts. Solve it directly:</p>\n<div data-code=\"javascript\" data-expected=\"p = 0.33\">// 2x2 zero-sum: row's payoff matrix A. Find the row player's mixing probability p\n// (weight on row 0) that makes the COLUMN player indifferent between its two columns.\nconst A = [[3, -1], [0, 2]];\n// indifference: p*A[0][0] + (1-p)*A[1][0] = p*A[0][1] + (1-p)*A[1][1]\nconst num = A[1][1] - A[1][0];\nconst den = (A[0][0] - A[1][0]) - (A[0][1] - A[1][1]);\nconst p = num / den;\nconsole.log(\"p = \" + p.toFixed(2));   // row 0 with prob ~1/3</div>\n<h3>5. Zero-sum games and the value</h3>\n<p>A game is <b>zero-sum</b> when one player's gain is exactly the other's loss — pure conflict, no room for mutual benefit. Such games have a single number, the <b>value</b>: what the row player can guarantee to win (and the column player can hold them to) under optimal play. Rock-paper-scissors has value 0 — fair. Skewed zero-sum games have a non-zero value captured entirely by the optimal mixed strategies.</p>\n<h3>6. The minimax theorem</h3>\n<p>Von Neumann's <b>minimax theorem</b> (1928) is the cornerstone: in any finite two-player zero-sum game, $\\max_{x}\\min_{y} = \\min_{y}\\max_{x}$ — the most you can guarantee by maximizing your worst case equals the least your opponent can hold you to. That common number <em>is</em> the value, and the strategies that achieve it are the equilibrium mixes. It means \"play to protect your worst case\" and \"exploit the opponent optimally\" coincide. This is why two-player zero-sum games are cleanly solvable.</p>\n<h3>7. From minimax to AI</h3>\n<p>Minimax runs straight through AI. A <a href=\"#/lesson/deep-learning/dl-gans\" data-route>GAN</a> is a minimax game — the generator minimizes what the discriminator maximizes — which is exactly why GAN training is unstable (it chases a saddle point, not a minimum). <b>Self-play</b> (AlphaZero) and classic game-tree <b>minimax search</b> rest on the same theorem. And <b>adversarial robustness</b> is a minimax problem: minimize the loss the worst-case attacker can maximize. Thinking in min-max is a core AI skill.</p>\n<h3>8. Summary</h3>\n<p>When no pure equilibrium exists, players <b>mix</b>; the equilibrium mix makes the opponent indifferent. Zero-sum games have a single <b>value</b>, guaranteed by von Neumann's <b>minimax theorem</b> — the backbone of GANs, self-play, and adversarial robustness.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why you mix to make the OPPONENT indifferent</summary>\n<p>It feels backwards to choose your probabilities to balance the other player's payoffs, but it is forced. Suppose at a candidate equilibrium your opponent strictly preferred column A over column B. Then they would play A with probability 1 — a pure best response — and against that pure choice your own mix is almost certainly <em>not</em> optimal, so you'd deviate too, and nothing is stable. The only way both players can be mixing in equilibrium is if each is <em>indifferent</em> among the options they mix over (every used option earns the same expected payoff). So the equilibrium condition becomes: set your probabilities to equalize the opponent's expected payoffs across their strategies. That single requirement, written out, is the linear equation you solve.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: maximin and the security strategy</summary>\n<p>A cautious player can ask: \"what is the best payoff I can <em>guarantee</em>, regardless of what the opponent does?\" Maximizing your worst-case outcome gives your <b>maximin</b> (security) value, and the strategy achieving it is your <b>security strategy</b>. In a general game maximin can be less than your equilibrium payoff (caution costs you). The beauty of the minimax theorem is that in two-player <em>zero-sum</em> games they coincide: your security strategy <em>is</em> your equilibrium strategy, and the maximin value equals the game's value. Pessimism and optimal play agree exactly — which is special to zero-sum and breaks once interests aren't purely opposed.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why GAN training inherits minimax instability</summary>\n<p>Ordinary deep learning <em>descends</em> to a minimum of one loss; a <a href=\"#/lesson/deep-learning/dl-gans\" data-route>GAN</a> instead seeks a <b>saddle point</b> of a minimax objective — a point that's a minimum for the generator and a maximum for the discriminator simultaneously. Gradient descent-ascent on such objectives can <em>orbit</em> the equilibrium rather than converge (think of the rotational dynamics around a saddle), producing the oscillation, mode collapse, and fragility GANs are infamous for. It is the practical price of playing a game instead of minimizing a function — and why much GAN research is really about stabilizing minimax optimization (gradient penalties, two-timescale updates, spectral normalization).</p>\n</details>",
          "mcq": [
            {
              "q": "Rock-paper-scissors has no pure-strategy Nash equilibrium because:",
              "choices": [
                "Any deterministic choice can be exploited by the opponent's counter",
                "The payoffs are all zero",
                "There are three players",
                "It is not a zero-sum game"
              ],
              "answer": 0,
              "explain": "Determinism is readable and beatable; you must randomize."
            },
            {
              "q": "A mixed strategy is:",
              "choices": [
                "Playing the same move every time",
                "A probability distribution over your available choices",
                "Copying the opponent",
                "The opponent's payoff"
              ],
              "answer": 1,
              "explain": "Mixed = randomized; pure is the all-weight-on-one special case."
            },
            {
              "q": "At a mixed-strategy Nash equilibrium, each player mixes so as to:",
              "choices": [
                "Always play their dominant strategy",
                "Maximize their own single-round payoff greedily",
                "Make the opponent indifferent among the strategies they use",
                "Copy the opponent's last move"
              ],
              "answer": 2,
              "explain": "The indifference principle — remove the opponent's incentive to deviate."
            },
            {
              "q": "A zero-sum game is one where:",
              "choices": [
                "There is no equilibrium",
                "Both players can win together",
                "Payoffs are always positive",
                "One player's gain is exactly the other's loss"
              ],
              "answer": 3,
              "explain": "Pure conflict; payoffs sum to a constant."
            },
            {
              "q": "The \"value\" of a zero-sum game is:",
              "choices": [
                "What the row player can guarantee, and the column player can hold them to, under optimal play",
                "The sum of all payoffs in the matrix",
                "Always zero",
                "The number of strategies"
              ],
              "answer": 0,
              "explain": "A single number achieved by the optimal mixes."
            },
            {
              "q": "Von Neumann's minimax theorem states that in a two-player zero-sum game:",
              "choices": [
                "the first player always wins",
                "max-min equals min-max — your guaranteed value equals what the opponent can hold you to",
                "there is never an equilibrium",
                "mixing is never needed"
              ],
              "answer": 1,
              "explain": "max min = min max defines the value."
            },
            {
              "q": "Why is GAN training notoriously unstable?",
              "choices": [
                "It uses no gradients",
                "It has no loss function",
                "It seeks a saddle point of a minimax objective, not a minimum, so it can oscillate",
                "The generator and discriminator cooperate"
              ],
              "answer": 2,
              "explain": "Saddle-point/minimax dynamics → orbiting, mode collapse."
            },
            {
              "q": "In a two-player zero-sum game, your maximin (security) strategy:",
              "choices": [
                "Is a pure strategy only",
                "Is always worse than equilibrium",
                "Requires knowing the opponent's mix in advance",
                "Coincides with your Nash equilibrium strategy (by the minimax theorem)"
              ],
              "answer": 3,
              "explain": "Zero-sum: caution and optimal play agree."
            }
          ],
          "flashcards": [
            {
              "front": "Why can't rock-paper-scissors have a pure-strategy Nash equilibrium?",
              "back": "Any deterministic choice is exploitable — if you always play X, the opponent best-responds with the counter and you always lose. No pure profile is stable; the equilibrium must be mixed."
            },
            {
              "front": "Mixed strategy",
              "back": "A probability distribution over your options (e.g. each of rock/paper/scissors with probability $\\tfrac13$). A pure strategy is the special case that puts all weight on one option."
            },
            {
              "front": "The indifference principle",
              "back": "At a mixed Nash equilibrium, each player mixes so as to make the <em>opponent</em> indifferent among the strategies they use — otherwise the opponent would shift all weight to a better option and exploit you."
            },
            {
              "front": "Zero-sum game and its value",
              "back": "One player's gain is exactly the other's loss. The game has a single <b>value</b>: what the row player can guarantee and the column player can hold them to under optimal (mixed) play."
            },
            {
              "front": "The minimax theorem (von Neumann)",
              "back": "In any finite two-player zero-sum game, $\\max\\min = \\min\\max$. Maximizing your worst case equals the least the opponent can hold you to — that common number is the value."
            },
            {
              "front": "Why is GAN training unstable?",
              "back": "A GAN seeks a <em>saddle point</em> of a minimax objective (min for generator, max for discriminator), not a minimum. Gradient descent-ascent can orbit rather than converge — hence oscillation and mode collapse."
            }
          ],
          "homework": [
            {
              "prompt": "In Matching Pennies (you win if the coins match, opponent wins if they differ), what is your equilibrium mixed strategy, and why exactly 50/50?",
              "hint": "Use the indifference principle on the opponent.",
              "solution": "Play Heads and Tails each with probability $\\tfrac12$. By the indifference principle, you choose your mix so the opponent is indifferent between their options. If you played Heads more than half the time, the opponent would always pick the action that exploits Heads; only 50/50 makes both of the opponent's choices equally good, removing any exploit. (By symmetry the opponent also mixes 50/50, and the game's value is 0 — fair.)"
            },
            {
              "prompt": "For the zero-sum game with row payoffs A = [[2, 0], [0, 1]], find the row player's mixing probability p on row 0 that makes the column player indifferent.",
              "hint": "Set p·A[0][0]+(1−p)·A[1][0] = p·A[0][1]+(1−p)·A[1][1] and solve.",
              "solution": "Indifference: $p\\cdot2 + (1-p)\\cdot0 = p\\cdot0 + (1-p)\\cdot1$, i.e. $2p = 1-p$, so $3p = 1$ and $p = \\tfrac13$. The row player plays row 0 with probability $\\tfrac13$ and row 1 with probability $\\tfrac23$. (Using the formula: $p=(A_{11}-A_{10})/(A_{00}-A_{10}-A_{01}+A_{11}) = (1-0)/(2-0-0+1)=1/3$.)"
            },
            {
              "prompt": "Explain why, in a two-player zero-sum game, \"play to protect your worst case\" gives the same strategy as \"play the Nash equilibrium.\"",
              "hint": "This is the content of the minimax theorem.",
              "solution": "That equivalence is exactly von Neumann's minimax theorem: $\\max\\min = \\min\\max$. The left side is the maximin (security) value — the best you can guarantee against a worst-case opponent. The right side is what an optimal opponent can hold you to. Because they're equal in zero-sum games, the cautious security strategy and the equilibrium strategy coincide and both achieve the game's value. (This breaks in non-zero-sum games, where caution can cost you relative to equilibrium.)"
            }
          ],
          "examples": [
            {
              "title": "Solving rock-paper-scissors",
              "body": "Why is the unique Nash equilibrium of rock-paper-scissors to play each option with probability one-third?",
              "solution": "By symmetry and the indifference principle. If you played any option more than $\\tfrac13$ of the time, the opponent could shift weight to its counter and profit, so your mix wouldn't be a best response. The only mix that makes the opponent indifferent among rock, paper, and scissors (each yielding expected payoff 0 against you) is the uniform $(\\tfrac13,\\tfrac13,\\tfrac13)$. Both players mix uniformly, the value is 0, and neither can be exploited."
            },
            {
              "title": "Spotting a zero-sum structure",
              "body": "A generator and a discriminator in a GAN: in what sense is their interaction zero-sum, and what does the minimax theorem promise?",
              "solution": "In the idealized GAN objective, the discriminator's gain (correctly classifying real vs fake) is the generator's loss and vice versa — pure opposition, hence zero-sum (minimax). The minimax theorem promises such a game has a well-defined value and equilibrium; at the ideal equilibrium the generator's distribution matches the data and the discriminator is reduced to guessing. In practice the networks are non-convex so we only approximate it — and the saddle-point geometry is why training oscillates."
            },
            {
              "title": "Caution vs exploitation",
              "body": "A poker-like zero-sum game: a player wonders whether to play a defensive \"minimize my worst case\" strategy or an aggressive \"exploit the opponent\" one. What does theory say?",
              "solution": "In a two-player zero-sum game they are the <em>same</em> strategy. By the minimax theorem the maximin (worst-case-protecting) strategy equals the equilibrium (optimally-exploiting) strategy and both secure the game's value. So a player using the equilibrium mix is simultaneously maximally safe and optimally exploitative against a rational opponent. (Against a <em>predictably irrational</em> opponent you could deviate to exploit mistakes — at the cost of exposing yourself if you misread them.)"
            }
          ]
        }
      ]
    }
  ]
}
);
