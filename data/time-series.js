/* Atlas course — Time Series & Forecasting
   The 10th subject. Phase 1: Foundations (what a time series is). More lessons/modules queued
   (stationarity & differencing, ACF/PACF, moving averages & exponential smoothing, ARIMA,
   forecast evaluation/backtesting, features for ML forecasting, deep forecasters). Loop-initiated,
   additive & reversible (one data file + one <script> tag). Generated & guard-checked. */
(window.COURSES = window.COURSES || []).push(
{
  "id": "time-series",
  "title": "Time Series & Forecasting",
  "icon": "∿",
  "color": "#c08a5a",
  "blurb": "From trends and seasonality to ARIMA and deep forecasters — the math of data that unfolds in time.",
  "modules": [
    {
      "id": "ts-foundations",
      "title": "Foundations of Time Series",
      "lessons": [
        {
          "id": "ts-what-is-a-time-series",
          "title": "What Is a Time Series? Trend, Seasonality & Forecasting",
          "minutes": 15,
          "content": "<h3>1. The hook: data with a clock</h3>\n<p>Most datasets are a bag of independent rows — shuffle them and nothing changes. A <b>time series</b> is different: it is a sequence of observations <em>indexed in time order</em> (daily sales, hourly temperature, a heartbeat trace), and the order <em>is</em> the information. Yesterday tells you about today; the gap between points is meaningful; and you can only ever train on the past to predict the future. That single constraint — time flows one way — reshapes everything from how you split the data to which models work.</p>\n<h3>2. The four components</h3>\n<p>A classical lens decomposes a series into four parts. <b>Trend</b>: the slow, long-term drift in the level (a business growing year over year). <b>Seasonality</b>: a pattern that repeats over a <em>fixed</em> period (more ice cream every summer, more traffic every weekday). <b>Cyclic</b>: longer swings with <em>no</em> fixed period (business cycles, booms and busts). <b>Residual</b> (noise): what's left after the structure is removed. Separating these is the first thing any forecaster does.</p>\n<h3>3. Decomposition: additive vs multiplicative</h3>\n<p>How do the components combine? <b>Additive</b>: $y_t = \\text{Trend}_t + \\text{Season}_t + \\text{Residual}_t$ — the seasonal swing is a roughly constant size regardless of the level. <b>Multiplicative</b>: $y_t = \\text{Trend}_t \\times \\text{Season}_t \\times \\text{Residual}_t$ — the swing <em>grows with the level</em> (December sales spike harder every year as the business grows). A logarithm turns a multiplicative series into an additive one ($\\log$ of a product is a sum), which is why analysts so often model $\\log y_t$.</p>\n<h3>4. Smoothing: the moving average</h3>\n<p>The simplest way to see the trend through the noise is a <b>moving average</b> — replace each point with the average of a small window around it. Run a window-3 average over a short series:</p>\n<div data-code=\"javascript\" data-expected=\"11, 12, 13, 14, 15\">// A simple moving average (window 3) smooths noise and exposes the trend\nconst series = [10, 12, 11, 13, 15, 14, 16];\nfunction movingAverage(x, w) {\n  const out = [];\n  for (let i = 0; i + w <= x.length; i++) {\n    let s = 0;\n    for (let j = i; j < i + w; j++) s += x[j];\n    out.push(s / w);\n  }\n  return out;\n}\nconsole.log(movingAverage(series, 3).join(\", \"));\n// The wiggles shrink; the upward drift becomes clear.</div>\n<h3>5. The forecasting task</h3>\n<p><b>Forecasting</b> is predicting future values from past observations: given $y_1,\\dots,y_t$, estimate $y_{t+1}, y_{t+2}, \\dots$ The defining rule is that the future must stay unseen during training. You cannot shuffle and randomly hold out points the way you would for ordinary data — the test set has to be a <em>contiguous block at the end</em>, and any feature must be computable from information available <em>before</em> the time it predicts. Break that and you leak the future into the past.</p>\n<h3>6. Why a time series isn't i.i.d.</h3>\n<p>Standard ML assumes examples are independent and identically distributed. Time series violate this on both counts: consecutive points are <b>autocorrelated</b> (today is close to yesterday), and the distribution itself drifts (the mean and variance change over time). Autocorrelation is not a nuisance — it is the very signal a forecaster exploits. But it also means naive cross-validation, bootstrapping, and \"shuffle then split\" are all <em>wrong</em> here.</p>\n<h3>7. Stationarity (a preview)</h3>\n<p>Many classical methods assume the series is <b>stationary</b> — its statistical properties (mean, variance, autocorrelation structure) don't change over time. Real series rarely are: they trend and they have seasons. The classical workflow is therefore to <em>transform</em> a series toward stationarity (remove the trend by <b>differencing</b> $y_t - y_{t-1}$, stabilize the variance with a log), model the stationary remainder, then invert the transforms to forecast. We'll devote a full lesson to it.</p>\n<h3>8. Where it matters</h3>\n<p>Time series are everywhere: demand and inventory, electricity load, server metrics and anomaly detection, sensor streams, epidemiology, and finance. The classical toolkit (smoothing, ARIMA) still wins on small, regular data; modern deep forecasters (RNNs, temporal convolutions, state-space models, and transformers) take over when you have many related series and rich covariates. This topic builds from the classical foundations to those modern methods — and it is the natural companion to the sequence models you met in Deep Learning and LLMs.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: additive or multiplicative? the log trick</summary>\n<p>The test is simple: look at the seasonal swings. If they stay a <em>constant size</em> as the trend rises, the series is <b>additive</b> ($y_t = T_t + S_t + R_t$). If they <em>grow in proportion</em> to the level — each year's December spike is taller than the last — it is <b>multiplicative</b> ($y_t = T_t \\times S_t \\times R_t$). The elegant fix for the multiplicative case is the logarithm: since $\\log(T_t \\times S_t \\times R_t) = \\log T_t + \\log S_t + \\log R_t$, taking logs converts a multiplicative series into an additive one, so all the additive machinery (and constant-width seasonal terms) applies to $\\log y_t$. This is why financial and demand series are so often modelled in log space.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: never shuffle a time series</summary>\n<p>The single most common time-series mistake is using ordinary k-fold cross-validation, which shuffles rows into random folds. That trains on future points to predict past ones — <b>temporal leakage</b> — and produces a glowing validation score that collapses in production. The fix is <b>forward-chaining</b> (rolling-origin) validation: train on $[1..k]$, test on $k+1$; then train on $[1..k+1]$, test on $k+2$; and so on. The test point is always strictly in the future of the training window. The same discipline applies to features: a \"30-day average\" feature for day $t$ must use only days before $t$, never a window centred on $t$.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: autocorrelation — a series correlated with its own past</summary>\n<p><b>Autocorrelation</b> at lag $k$ is the correlation between the series and a copy of itself shifted by $k$ steps. The plot of these values (the <b>ACF</b>) is the fingerprint of a time series: a slow decay signals a trend; a spike every 7 lags reveals weekly seasonality; near-zero everywhere means the series is essentially noise (white noise) with nothing to forecast. Autocorrelation is what makes a series <em>predictable at all</em> — and measuring it is how you decide which model, and how many lags, to use. It is the time-domain cousin of the covariance ideas from Probability &amp; Statistics.</p>\n</details>",
          "mcq": [
            {
              "q": "A time series is best described as:",
              "choices": [
                "Observations indexed in time order, where the order carries information",
                "An unordered bag of independent rows",
                "A single number",
                "A set of labelled images"
              ],
              "answer": 0,
              "explain": "Time order is the defining feature."
            },
            {
              "q": "The \"trend\" component of a time series is:",
              "choices": [
                "A pattern that repeats every fixed period",
                "The slow, long-term drift in the level",
                "Pure random noise",
                "The largest single value"
              ],
              "answer": 1,
              "explain": "Trend = long-term direction."
            },
            {
              "q": "Seasonality is:",
              "choices": [
                "Long swings with no fixed period",
                "A one-time jump",
                "A pattern that repeats over a fixed period",
                "Independent noise"
              ],
              "answer": 2,
              "explain": "Seasonality repeats on a known period."
            },
            {
              "q": "A decomposition is multiplicative (rather than additive) when:",
              "choices": [
                "There is no seasonality",
                "The series has no trend",
                "The data are shuffled",
                "The seasonal swings grow in proportion to the level"
              ],
              "answer": 3,
              "explain": "Growing swings → multiplicative (use a log)."
            },
            {
              "q": "A moving average is mainly used to:",
              "choices": [
                "Smooth out noise and expose the trend",
                "Add seasonality",
                "Shuffle the data",
                "Remove the trend entirely"
              ],
              "answer": 0,
              "explain": "Averaging a window reduces noise."
            },
            {
              "q": "When splitting a time series for forecasting, you must:",
              "choices": [
                "Shuffle rows into random folds",
                "Keep the test set as a contiguous block in the future",
                "Sort by value",
                "Discard the most recent data"
              ],
              "answer": 1,
              "explain": "Random folds leak the future; test must be later in time."
            },
            {
              "q": "Time series violate the i.i.d. assumption mainly because:",
              "choices": [
                "The values are always positive",
                "There are too few points",
                "Consecutive observations are autocorrelated",
                "They have no noise"
              ],
              "answer": 2,
              "explain": "Autocorrelation = not independent."
            },
            {
              "q": "Forecasting is:",
              "choices": [
                "Labelling each point by hand",
                "Sorting the series",
                "Removing all seasonality",
                "Predicting future values from past observations"
              ],
              "answer": 3,
              "explain": "Forecast = future from past."
            },
            {
              "q": "How does a \"cyclic\" component differ from a seasonal one?",
              "choices": [
                "A cycle has no fixed period; seasonality repeats on a known fixed period",
                "A cycle repeats exactly every 12 months",
                "They are identical",
                "A cycle is pure noise"
              ],
              "answer": 0,
              "explain": "Cyclic = swings with no fixed period (e.g. business cycles)."
            },
            {
              "q": "The residual (noise) component is:",
              "choices": [
                "The long-term direction",
                "What remains after the trend and seasonality are removed",
                "The repeating seasonal pattern",
                "The first value of the series"
              ],
              "answer": 1,
              "explain": "Residual = leftover after structure is removed."
            },
            {
              "q": "Taking the logarithm of a series is useful because it:",
              "choices": [
                "Adds a trend",
                "Removes all noise",
                "Turns a multiplicative series into an additive one",
                "Shuffles the time order"
              ],
              "answer": 2,
              "explain": "log of a product is a sum → multiplicative becomes additive."
            },
            {
              "q": "Differencing a series ($y_t - y_{t-1}$) is mainly used to:",
              "choices": [
                "Reverse the time order",
                "Add seasonality",
                "Increase the noise",
                "Remove a trend and move toward stationarity"
              ],
              "answer": 3,
              "explain": "First differences strip a linear trend."
            },
            {
              "q": "A stationary time series is one whose:",
              "choices": [
                "Statistical properties (mean, variance, autocorrelation) don't change over time",
                "Values are all equal",
                "Trend grows forever",
                "Points are independent"
              ],
              "answer": 0,
              "explain": "Stationary = time-invariant statistics."
            },
            {
              "q": "Forward-chaining (rolling-origin) validation always:",
              "choices": [
                "Shuffles points into random folds",
                "Tests on a period that comes after the training window",
                "Tests on the earliest data",
                "Ignores the time order"
              ],
              "answer": 1,
              "explain": "The test point is strictly in the future of the train window."
            },
            {
              "q": "The autocorrelation function (ACF) measures:",
              "choices": [
                "The number of data points",
                "The average value of the series",
                "The correlation of a series with lagged copies of itself",
                "The trend slope"
              ],
              "answer": 2,
              "explain": "ACF at lag k = correlation with the series shifted by k."
            },
            {
              "q": "A window-$w$ moving average of a length-$n$ series produces:",
              "choices": [
                "A single number",
                "More points than the input",
                "Exactly $n$ points always",
                "Fewer points than the input (it loses points at the edges)"
              ],
              "answer": 3,
              "explain": "A window of w yields n − w + 1 outputs."
            }
          ],
          "flashcards": [
            {
              "front": "What makes a time series different from an ordinary dataset?",
              "back": "Its observations are <em>indexed in time order</em> and that order carries information — you can only train on the past to predict the future, and rows can't be shuffled."
            },
            {
              "front": "The four classical components of a time series",
              "back": "<b>Trend</b> (long-term drift), <b>Seasonality</b> (repeats over a fixed period), <b>Cyclic</b> (swings with no fixed period), and <b>Residual</b>/noise (what's left)."
            },
            {
              "front": "Additive vs multiplicative decomposition",
              "back": "Additive ($y=T+S+R$): seasonal swing is roughly constant. Multiplicative ($y=T\\times S\\times R$): swing grows with the level. A log turns multiplicative into additive."
            },
            {
              "front": "Why can't you shuffle-and-split a time series?",
              "back": "It causes <b>temporal leakage</b> — training on future points to predict the past. Use forward-chaining (rolling-origin) validation; the test block must be in the future."
            },
            {
              "front": "Autocorrelation",
              "back": "The correlation of a series with a time-shifted copy of itself (at lag $k$). It is the signal a forecaster exploits — and why time series violate the i.i.d. assumption."
            },
            {
              "front": "Stationarity (preview)",
              "back": "A series whose statistical properties (mean, variance, autocorrelation) don't change over time. Classical methods assume it; differencing and logs transform a series toward it."
            }
          ],
          "homework": [
            {
              "prompt": "Monthly ice-cream sales rise every summer and dip every winter, while the overall level creeps up year by year. Name the components present and say whether the seasonality looks additive or multiplicative.",
              "hint": "Two structural components + noise. Do the summer spikes grow as the level grows?",
              "solution": "Components: a <b>trend</b> (the slow year-over-year rise), <b>seasonality</b> (the summer-high/winter-low pattern repeating every 12 months), and <b>residual</b> noise. If the summer spikes grow taller as the overall level rises, it's <b>multiplicative</b> (model $\\log y_t$); if the spikes stay about the same absolute size, it's <b>additive</b>."
            },
            {
              "prompt": "Compute a window-2 moving average of the series [4, 8, 6, 10].",
              "hint": "Average each adjacent pair.",
              "solution": "Pairs: (4+8)/2=6, (8+6)/2=7, (6+10)/2=8. Result: [6, 7, 8] — three values from four inputs (a window of 2 loses one point), and the noisy ups-and-downs are smoothed into a steady rise."
            },
            {
              "prompt": "A colleague reports 99% accuracy forecasting next-quarter demand, using random 5-fold cross-validation on the historical series. Why is this result not trustworthy?",
              "hint": "What did random folds let the model see?",
              "solution": "Random folds shuffle time, so the model was trained on <em>future</em> quarters to predict <em>past</em> ones — temporal leakage. The 99% reflects peeking at the future, not genuine forecasting skill, and will collapse in production. They should use forward-chaining validation (always test on a period strictly after the training window)."
            }
          ],
          "examples": [
            {
              "title": "Decomposing retail sales",
              "body": "A store's daily sales drift upward over three years, spike every December, and jitter day to day. How would you decompose it, and what would each part be used for?",
              "solution": "Split it as trend + seasonality + residual. The <b>trend</b> (smoothed by a moving average) shows whether the business is really growing; the <b>seasonal</b> term (the repeating yearly shape) drives inventory planning for the December peak; the <b>residual</b> is monitored for anomalies (a sudden drop signals a problem). Because December spikes likely grow with the business, you'd probably model $\\log(\\text{sales})$ so the decomposition is additive."
            },
            {
              "title": "Spotting the wrong validation",
              "body": "You're forecasting hourly server load and want to pick the best model. What's the right way to estimate out-of-sample error?",
              "solution": "Forward-chaining (rolling-origin) backtesting: train on the first weeks, test on the next day/week, roll the window forward, and average the errors. Never random k-fold — it would leak future load into the training set. Also ensure every feature (e.g., a rolling mean) only uses data from before the hour it predicts."
            },
            {
              "title": "Reading an ACF",
              "body": "The autocorrelation plot of a daily series shows a strong spike at lag 7 and multiples of 7. What does that tell you?",
              "solution": "A weekly seasonality: each day is most similar to the same weekday a week earlier (and two weeks, three weeks…). You'd build that 7-day period into the model — e.g., seasonal differencing at lag 7, or a weekly seasonal term — rather than treating the data as if every day were exchangeable."
            }
          ]
        }
      ]
    }
  ]
}
);
