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
        }
      ]
    }
  ]
}
);
