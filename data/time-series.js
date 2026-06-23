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
          "content": "<h3>1. The hook: data with a clock</h3>\n<p>Most datasets are a bag of independent rows — shuffle them and nothing changes. A <b>time series</b> is different: it is a sequence of observations <em>indexed in time order</em> (daily sales, hourly temperature, a heartbeat trace), and the order <em>is</em> the information. Yesterday tells you about today; the gap between points is meaningful; and you can only ever train on the past to predict the future. That single constraint — time flows one way — reshapes everything from how you split the data to which models work.</p>\n<h3>2. The four components</h3>\n<p>A classical lens decomposes a series into four parts. <b>Trend</b>: the slow, long-term drift in the level (a business growing year over year). <b>Seasonality</b>: a pattern that repeats over a <em>fixed</em> period (more ice cream every summer, more traffic every weekday). <b>Cyclic</b>: longer swings with <em>no</em> fixed period (business cycles, booms and busts). <b>Residual</b> (noise): what's left after the structure is removed. Separating these is the first thing any forecaster does.</p>\n<h3>3. Decomposition: additive vs multiplicative</h3>\n<p>How do the components combine? <b>Additive</b>: $y_t = \\text{Trend}_t + \\text{Season}_t + \\text{Residual}_t$ — the seasonal swing is a roughly constant size regardless of the level. <b>Multiplicative</b>: $y_t = \\text{Trend}_t \\times \\text{Season}_t \\times \\text{Residual}_t$ — the swing <em>grows with the level</em> (December sales spike harder every year as the business grows). A logarithm turns a multiplicative series into an additive one ($\\log$ of a product is a sum), which is why analysts so often model $\\log y_t$.</p>\n<div data-viz=\"ts-decomposition\"></div>\n<h3>4. Smoothing: the moving average</h3>\n<p>The simplest way to see the trend through the noise is a <b>moving average</b> — replace each point with the average of a small window around it. Run a window-3 average over a short series:</p>\n<div data-code=\"javascript\" data-expected=\"11, 12, 13, 14, 15\">// A simple moving average (window 3) smooths noise and exposes the trend\nconst series = [10, 12, 11, 13, 15, 14, 16];\nfunction movingAverage(x, w) {\n  const out = [];\n  for (let i = 0; i + w <= x.length; i++) {\n    let s = 0;\n    for (let j = i; j < i + w; j++) s += x[j];\n    out.push(s / w);\n  }\n  return out;\n}\nconsole.log(movingAverage(series, 3).join(\", \"));\n// The wiggles shrink; the upward drift becomes clear.</div>\n<h3>5. The forecasting task</h3>\n<p><b>Forecasting</b> is predicting future values from past observations: given $y_1,\\dots,y_t$, estimate $y_{t+1}, y_{t+2}, \\dots$ The defining rule is that the future must stay unseen during training. You cannot shuffle and randomly hold out points the way you would for ordinary data — the test set has to be a <em>contiguous block at the end</em>, and any feature must be computable from information available <em>before</em> the time it predicts. Break that and you leak the future into the past.</p>\n<h3>6. Why a time series isn't i.i.d.</h3>\n<p>Standard ML assumes examples are independent and identically distributed. Time series violate this on both counts: consecutive points are <b>autocorrelated</b> (today is close to yesterday), and the distribution itself drifts (the mean and variance change over time). Autocorrelation is not a nuisance — it is the very signal a forecaster exploits. But it also means naive cross-validation, bootstrapping, and \"shuffle then split\" are all <em>wrong</em> here.</p>\n<h3>7. Stationarity (a preview)</h3>\n<p>Many classical methods assume the series is <b>stationary</b> — its statistical properties (mean, variance, autocorrelation structure) don't change over time. Real series rarely are: they trend and they have seasons. The classical workflow is therefore to <em>transform</em> a series toward stationarity (remove the trend by <b>differencing</b> $y_t - y_{t-1}$, stabilize the variance with a log), model the stationary remainder, then invert the transforms to forecast. We'll devote a full lesson to it.</p>\n<h3>8. Where it matters</h3>\n<p>Time series are everywhere: demand and inventory, electricity load, server metrics and anomaly detection, sensor streams, epidemiology, and finance. The classical toolkit (smoothing, ARIMA) still wins on small, regular data; modern deep forecasters (RNNs, temporal convolutions, state-space models, and transformers) take over when you have many related series and rich covariates. This topic builds from the classical foundations to those modern methods — and it is the natural companion to the sequence models you met in Deep Learning and LLMs.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: additive or multiplicative? the log trick</summary>\n<p>The test is simple: look at the seasonal swings. If they stay a <em>constant size</em> as the trend rises, the series is <b>additive</b> ($y_t = T_t + S_t + R_t$). If they <em>grow in proportion</em> to the level — each year's December spike is taller than the last — it is <b>multiplicative</b> ($y_t = T_t \\times S_t \\times R_t$). The elegant fix for the multiplicative case is the logarithm: since $\\log(T_t \\times S_t \\times R_t) = \\log T_t + \\log S_t + \\log R_t$, taking logs converts a multiplicative series into an additive one, so all the additive machinery (and constant-width seasonal terms) applies to $\\log y_t$. This is why financial and demand series are so often modelled in log space.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: never shuffle a time series</summary>\n<p>The single most common time-series mistake is using ordinary k-fold cross-validation, which shuffles rows into random folds. That trains on future points to predict past ones — <b>temporal leakage</b> — and produces a glowing validation score that collapses in production. The fix is <b>forward-chaining</b> (rolling-origin) validation: train on $[1..k]$, test on $k+1$; then train on $[1..k+1]$, test on $k+2$; and so on. The test point is always strictly in the future of the training window. The same discipline applies to features: a \"30-day average\" feature for day $t$ must use only days before $t$, never a window centred on $t$.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: autocorrelation — a series correlated with its own past</summary>\n<p><b>Autocorrelation</b> at lag $k$ is the correlation between the series and a copy of itself shifted by $k$ steps. The plot of these values (the <b>ACF</b>) is the fingerprint of a time series: a slow decay signals a trend; a spike every 7 lags reveals weekly seasonality; near-zero everywhere means the series is essentially noise (white noise) with nothing to forecast. Autocorrelation is what makes a series <em>predictable at all</em> — and measuring it is how you decide which model, and how many lags, to use. It is the time-domain cousin of the covariance ideas from Probability &amp; Statistics.</p>\n</details>",
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
        },
        {
          "id": "ts-stationarity",
          "title": "Stationarity & Differencing",
          "minutes": 16,
          "content": "<h3>1. The hook: methods want a stable world</h3>\n<p>Most classical forecasting tools assume the series isn't a moving target — that the way it behaves <em>this</em> year is the way it behaved last year. That property is <b>stationarity</b>. A trending or seasonal series breaks it, and fitting a model to a non-stationary series gives unstable, often spurious results. So the classical workflow is: transform the series toward stationarity, model the stable remainder, then invert the transforms to forecast.</p>\n<h3>2. What stationarity means</h3>\n<p>A series is (weakly) <b>stationary</b> if its first two moments are constant over time: a constant <b>mean</b> (no trend), a constant <b>variance</b> (no growing swings), and an <b>autocovariance</b> that depends only on the lag $k$, not on <em>when</em> you look. Intuitively: slide a window along the series and the statistics you measure don't change. White noise is the simplest stationary series; a trending sales curve is not.</p>\n<h3>3. Why non-stationarity breaks things</h3>\n<p>If the mean drifts, \"the average\" is meaningless — it depends on the window. Worse, two unrelated trending series can show a high correlation purely because both rise over time: a <b>spurious regression</b>. Estimates of variance and autocorrelation become unstable, confidence intervals are wrong, and a model tuned on one stretch fails on the next. Stationarity is what makes the past a reliable guide to the future.</p>\n<h3>4. Differencing removes a trend</h3>\n<p>The workhorse fix is <b>differencing</b>: replace the series with its step-to-step changes, $\\nabla y_t = y_t - y_{t-1}$. A linear trend becomes a constant; a constant becomes zero. Difference a perfectly linear series and watch the trend vanish:</p>\n<div data-code=\"javascript\" data-expected=\"2, 2, 2, 2, 2\">// First differencing: y[t] - y[t-1] turns a trend into a (stationary) constant\nconst y = [10, 12, 14, 16, 18, 20];   // a perfectly linear upward trend\nconst diff = [];\nfor (let i = 1; i < y.length; i++) diff.push(y[i] - y[i - 1]);\nconsole.log(diff.join(\", \"));\n// The rising trend is gone; the differenced series is flat (constant mean).</div>\n<h3>5. Seasonal differencing</h3>\n<p>A repeating seasonal pattern of period $m$ is removed by <b>seasonal differencing</b>: $y_t - y_{t-m}$ (e.g. subtract last year's same month, $m=12$). This cancels the seasonal term the way ordinary differencing cancels a trend. Many real series need both — one ordinary difference for the trend and one seasonal difference for the season.</p>\n<h3>6. Stabilizing the variance</h3>\n<p>Differencing fixes a drifting <em>mean</em>, but not a drifting <em>variance</em> (swings that grow with the level). For that, transform before differencing: a <b>log</b> (or the more general Box–Cox) shrinks large values more than small ones, turning multiplicative, fanning-out behaviour into something roughly additive with constant spread. Log first, then difference.</p>\n<h3>7. Testing for stationarity</h3>\n<p>Eyeballing a plot of the rolling mean and rolling variance is the first check — flat lines suggest stationarity. The formal tool is the <b>Augmented Dickey–Fuller (ADF) test</b>, which tests for a <b>unit root</b> (the signature of a random-walk-like non-stationary series); rejecting its null is evidence the series is stationary. The point isn't the test statistic — it's deciding how many differences the series needs.</p>\n<div data-viz='ts-acf'></div>\n<p><b>Cointegration</b> is the striking exception to \"difference everything\": two series can each be non-stationary (random walks) yet move together so tightly that a <em>combination</em> of them is stationary. Differencing them apart would throw that shared long-run signal away. Watch the spread stay on its leash as the link strength changes:</p>\n<div data-viz=\"ts-cointegration\"></div>\n<h3>8. Putting it together: the \"d\" in ARIMA</h3>\n<p>This is exactly the integrated part of <b>ARIMA(p, d, q)</b>: $d$ is the number of differences applied to make the series stationary before an ARMA model is fit, and the forecast is then \"un-differenced\" (cumulatively summed) back to the original scale. Get $d$ right — usually 0, 1, or 2 — and the rest of the modelling stands on solid ground. We build ARIMA itself in a later lesson.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: strict vs weak (covariance) stationarity</summary>\n<p><b>Strict</b> stationarity demands that the <em>entire</em> joint distribution of any block of points is unchanged when you shift it in time — a very strong condition. In practice we almost always use <b>weak</b> (or covariance) stationarity, which only constrains the first two moments: constant mean, constant (finite) variance, and an autocovariance $\\gamma(k)$ that depends solely on the lag $k$. For a Gaussian process the two notions coincide (a Gaussian is fully described by its mean and covariance), which is one reason weak stationarity is the working definition: it is exactly what the classical linear methods (AR, MA, ARMA) actually require.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: unit roots and the random walk</summary>\n<p>The canonical non-stationary series is the <b><a href=\"#/lesson/probability-statistics/ps-normal-distribution\" data-route>random walk</a></b> $y_t = y_{t-1} + \\varepsilon_t$. Its variance grows without bound ($\\text{Var}(y_t) = t\\,\\sigma^2$), so it has no fixed level — it wanders. In the model $y_t = \\phi\\,y_{t-1} + \\varepsilon_t$, stationarity requires $|\\phi| < 1$; the random walk sits exactly at $\\phi = 1$, the <b>unit root</b>, on the boundary. The beautiful part: one difference of a random walk, $y_t - y_{t-1} = \\varepsilon_t$, is pure white noise — perfectly stationary. That is why \"difference once\" so often works: it removes a single unit root.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: don't over-difference</summary>\n<p>Differencing is not free — each difference throws away a data point and injects new autocorrelation. <b>Over-differencing</b> (differencing an already-stationary series) is a real mistake: it inflates the variance and creates artificial negative autocorrelation at lag 1 (an unnecessary MA term), making the model harder to fit and the forecasts noisier. The discipline is to use the <em>smallest</em> $d$ that achieves stationarity — check after each difference (plot, ADF) and stop as soon as the trend is gone. Usually $d \\le 2$; needing more is a sign something else (like a missed log transform) is wrong.</p>\n</details>",
          "mcq": [
            {
              "q": "A (weakly) stationary time series has:",
              "choices": [
                "Constant mean and variance, with autocovariance depending only on the lag",
                "A steadily rising mean",
                "Variance that grows with time",
                "A different distribution at every point"
              ],
              "answer": 0,
              "explain": "Stationary = time-invariant first two moments."
            },
            {
              "q": "First differencing ($y_t - y_{t-1}$) is used to:",
              "choices": [
                "Stabilize a growing variance",
                "Remove a trend (turn a non-constant mean into a constant)",
                "Add seasonality",
                "Reverse time"
              ],
              "answer": 1,
              "explain": "Differencing kills a trend."
            },
            {
              "q": "A drifting (non-constant) variance is best handled by:",
              "choices": [
                "Shuffling the data",
                "Ordinary differencing",
                "A log or Box–Cox transform",
                "Adding a trend"
              ],
              "answer": 2,
              "explain": "Log stabilizes variance; differencing fixes the mean."
            },
            {
              "q": "\"Spurious regression\" refers to:",
              "choices": [
                "A perfectly stationary series",
                "A model with too few parameters",
                "Differencing twice",
                "Two unrelated trending series appearing correlated just because both rise over time"
              ],
              "answer": 3,
              "explain": "Shared trends fake a correlation."
            },
            {
              "q": "Seasonal differencing is:",
              "choices": [
                "Subtracting the value one full period ago, $y_t - y_{t-m}$",
                "Subtracting the previous value, $y_t - y_{t-1}$",
                "Taking a log",
                "Averaging a window"
              ],
              "answer": 0,
              "explain": "Seasonal difference cancels a period-m pattern."
            },
            {
              "q": "The \"d\" in ARIMA(p, d, q) is:",
              "choices": [
                "The number of autoregressive lags",
                "The number of differences applied to reach stationarity",
                "The forecast horizon",
                "The seasonal period"
              ],
              "answer": 1,
              "explain": "d = order of integration (differencing)."
            },
            {
              "q": "A random walk $y_t = y_{t-1} + \\varepsilon_t$ is non-stationary because:",
              "choices": [
                "It repeats every period",
                "Its mean is exactly zero",
                "Its variance grows without bound and it has no fixed level (a unit root)",
                "It has no noise"
              ],
              "answer": 2,
              "explain": "Unit root at phi=1; variance = t·sigma^2."
            },
            {
              "q": "Over-differencing an already-stationary series:",
              "choices": [
                "Has no effect",
                "Always improves the forecast",
                "Removes seasonality for free",
                "Inflates the variance and injects artificial negative lag-1 autocorrelation"
              ],
              "answer": 3,
              "explain": "Use the smallest d; extra differences hurt."
            },
            {
              "q": "For a stationary series, the autocovariance between two points depends on:",
              "choices": [
                "Only the lag (the gap) between them, not the absolute time",
                "The absolute time you look",
                "The number of points",
                "Nothing — it is always zero"
              ],
              "answer": 0,
              "explain": "Stationary autocovariance is a function of lag k alone."
            },
            {
              "q": "White noise is:",
              "choices": [
                "A strongly trending series",
                "A stationary series with zero autocorrelation at every nonzero lag",
                "A perfectly seasonal series",
                "A non-stationary random walk"
              ],
              "answer": 1,
              "explain": "White noise: constant mean/variance, no autocorrelation."
            },
            {
              "q": "The Augmented Dickey–Fuller (ADF) test checks for:",
              "choices": [
                "The number of MCQ",
                "Seasonality only",
                "A unit root (the signature of a non-stationary, random-walk-like series)",
                "The forecast horizon"
              ],
              "answer": 2,
              "explain": "ADF tests the unit-root null."
            },
            {
              "q": "A series with both a growing variance and an upward trend is made stationary by:",
              "choices": [
                "Doing nothing",
                "Differencing first, then logging",
                "Shuffling, then averaging",
                "Taking a log first, then differencing"
              ],
              "answer": 3,
              "explain": "Stabilize variance (log) before fixing the mean (difference)."
            },
            {
              "q": "First-differencing a series of length $n$ produces:",
              "choices": [
                "One fewer value than the input",
                "One more value than the input",
                "Exactly $n$ values",
                "A single value"
              ],
              "answer": 0,
              "explain": "y_t - y_{t-1} is undefined at t=1, losing one point."
            },
            {
              "q": "A series with a clear, persistent upward trend is:",
              "choices": [
                "Stationary, because it's smooth",
                "Non-stationary, because its mean changes over time",
                "White noise",
                "Always seasonal"
              ],
              "answer": 1,
              "explain": "A trend = non-constant mean = non-stationary."
            },
            {
              "q": "After forecasting the differenced (stationary) series, to return to the original scale you:",
              "choices": [
                "Multiply by the variance",
                "Take another difference",
                "Cumulatively sum (un-difference) the forecasts",
                "Discard them"
              ],
              "answer": 2,
              "explain": "Integrate back: the I in ARIMA."
            },
            {
              "q": "Classical AR/MA/ARMA models require stationarity because:",
              "choices": [
                "They forbid any noise",
                "They need exactly 100 data points",
                "They cannot use addition",
                "They assume the series' statistical relationships stay constant over time"
              ],
              "answer": 3,
              "explain": "Fixed coefficients only make sense if the process is time-invariant."
            }
          ],
          "flashcards": [
            {
              "front": "(Weak) stationarity",
              "back": "A series whose mean and variance are constant over time and whose autocovariance depends only on the lag $k$ (not on when you look). The working assumption of classical methods."
            },
            {
              "front": "Why does non-stationarity matter?",
              "back": "A drifting mean makes \"the average\" window-dependent and causes <b>spurious regression</b> (unrelated trending series look correlated); estimates and intervals become unreliable."
            },
            {
              "front": "Differencing",
              "back": "Replace the series with step-to-step changes $\\nabla y_t = y_t - y_{t-1}$. It turns a linear trend into a constant — the standard route to a stationary mean."
            },
            {
              "front": "Seasonal differencing",
              "back": "$y_t - y_{t-m}$: subtract the value one full period ago (e.g. $m=12$ months) to cancel a repeating seasonal pattern. Often combined with an ordinary difference."
            },
            {
              "front": "What does a log transform fix?",
              "back": "A drifting <em>variance</em> (swings growing with the level). Log/Box–Cox stabilizes the spread; differencing then fixes the drifting mean. Log first, then difference."
            },
            {
              "front": "The \"d\" in ARIMA(p, d, q)",
              "back": "The number of differences applied to make the series stationary before fitting ARMA; forecasts are un-differenced (cumulatively summed) back. A unit root needs $d=1$; use the smallest $d$ that works."
            }
          ],
          "homework": [
            {
              "prompt": "First-difference the series [5, 8, 9, 7, 10]. What do you get, and how many values?",
              "hint": "Subtract each value from the next.",
              "solution": "Differences: 8−5=3, 9−8=1, 7−9=−2, 10−7=3 → [3, 1, −2, 3]. Four values from five inputs (differencing loses one point). The clear upward drift of the original is replaced by changes centred near zero — closer to stationary."
            },
            {
              "prompt": "A series shows a clear upward trend AND seasonal swings that get larger every year. In what order would you apply log, ordinary differencing, and seasonal differencing?",
              "hint": "Variance first, then mean.",
              "solution": "Take the <b>log</b> first to tame the growing (multiplicative) seasonal swings — that stabilizes the variance. Then apply a <b>seasonal difference</b> ($y_t - y_{t-m}$) to remove the repeating pattern and an <b>ordinary difference</b> ($y_t - y_{t-1}$) to remove the remaining trend. Variance stabilization precedes differencing because differencing doesn't fix a fanning-out spread."
            },
            {
              "prompt": "Why is using the <em>smallest</em> number of differences important?",
              "hint": "What does an extra difference cost?",
              "solution": "Each difference discards a data point and adds autocorrelation; <b>over-differencing</b> an already-stationary series inflates the variance and injects artificial negative lag-1 autocorrelation, forcing an unnecessary MA term and producing noisier forecasts. Use the smallest $d$ (check with a plot/ADF after each step) that removes the trend — usually 0, 1, or 2."
            }
          ],
          "examples": [
            {
              "title": "Spotting a non-stationary series",
              "body": "A plot of monthly revenue rises steadily and its month-to-month swings grow over the years. Is it stationary, and what would you do?",
              "solution": "Not stationary on either count: the mean trends up (non-constant mean) and the variance grows (non-constant variance). Stabilize the variance with a <b>log</b>, then take a <b>first difference</b> to remove the trend. Re-plot the rolling mean/variance (or run ADF) to confirm the transformed series looks flat before modelling it."
            },
            {
              "title": "Differencing a random walk",
              "body": "Stock-price-like data follows $y_t = y_{t-1} + \\varepsilon_t$. Why can't you model the level directly, and what's the fix?",
              "solution": "A random walk has a unit root: its variance grows with $t$ and it has no fixed level, so it's non-stationary and direct modelling gives spurious fits. One first difference, $y_t - y_{t-1} = \\varepsilon_t$, yields white noise — stationary. You model the (stationary) differences/returns, then cumulate back to forecast the level."
            },
            {
              "title": "Choosing d",
              "body": "After one difference the series looks flat with no trend; after a second difference the lag-1 autocorrelation turns sharply negative. What does that tell you about d?",
              "solution": "One difference was enough — the flat, trend-free look after $d=1$ signals stationarity. The sharp negative lag-1 autocorrelation after the <em>second</em> difference is the classic fingerprint of <b>over-differencing</b>, so use $d=1$, not 2."
            }
          ]
        }
      ]
    },
    {
      "id": "ts-classical",
      "title": "Classical Forecasting",
      "lessons": [
        {
          "id": "ts-exponential-smoothing",
          "title": "Moving Averages & Exponential Smoothing",
          "minutes": 16,
          "content": "<h3>1. The hook: the simplest forecasts</h3>\n<p>Before any fancy model, three baselines anchor every forecasting problem. The <b>naive</b> forecast: tomorrow equals today ($\\hat{y}_{t+1} = y_t$). The <b>mean</b> forecast: predict the historical average. The <b>drift</b> forecast: extend the line from first to last point. They sound trivial, but a model that can't beat them isn't worth shipping — they are the bar.</p>\n<h3>2. Moving average as a forecast</h3>\n<p>One step up: forecast with the <b>moving average</b> of the last $k$ points. It smooths noise, but it has two flaws — it weights all $k$ points <em>equally</em> (a value from $k$ steps ago counts as much as yesterday), and it <em>lags</em> behind a trend. We want recent observations to count more.</p>\n<h3>3. Simple exponential smoothing (SES)</h3>\n<p><b>Simple exponential smoothing</b> does exactly that. The next forecast is a blend of the latest observation and the previous forecast: $\\hat{y}_{t+1} = \\alpha\\,y_t + (1-\\alpha)\\,\\hat{y}_t$, where $0 < \\alpha < 1$. Unrolling it shows every past point contributes with a weight that <em>decays geometrically</em> into the past — hence \"exponential.\" Recent points dominate; old ones fade but never fully vanish.</p>\n<h3>4. Computing SES</h3>\n<p>Initialize with the first value, then sweep forward applying the update. Here with $\\alpha = 0.5$:</p>\n<div data-code=\"javascript\" data-expected=\"10, 11, 12, 12, 13.5\">// Simple exponential smoothing: blend the new point with the running estimate\nconst y = [10, 12, 13, 12, 15];\nconst alpha = 0.5;\nlet s = y[0];                  // start at the first observation\nconst out = [s];\nfor (let t = 1; t < y.length; t++) {\n  s = alpha * y[t] + (1 - alpha) * s;   // weight recent more\n  out.push(+s.toFixed(2));\n}\nconsole.log(out.join(\", \"));\n// The smoothed level tracks the data while filtering the jitter.</div>\n<h3>5. The smoothing parameter α</h3>\n<p>$\\alpha$ is the responsiveness dial. Near <b>1</b>, the forecast chases the latest value (fast to react, but noisy — almost the naive forecast). Near <b>0</b>, it is sluggish and very smooth (almost the long-run mean). In practice $\\alpha$ is <em>fit</em> by choosing the value that minimizes one-step forecast error on the history — a tiny optimization, not a guess.</p>\n<div data-viz=\"ts-exp-smoothing\"></div>\n<h3>6. Holt's method: adding a trend</h3>\n<p>Plain SES forecasts a flat line — it has no notion of direction, so it lags a trend. <b>Holt's linear method</b> fixes this by smoothing <em>two</em> things: the <b>level</b> and a separate <b>trend</b> (slope), each with its own parameter. The forecast then extrapolates the current level along the current slope, so it keeps up with a rising or falling series.</p>\n<h3>7. Holt–Winters: adding seasonality</h3>\n<p><b>Holt–Winters</b> adds a third smoothed component — the <b>seasonal</b> indices — giving three equations (level, trend, season) and a forecast that carries trend <em>and</em> the repeating pattern forward. It comes in additive and multiplicative flavours, matching the decomposition choice from the first lesson. This is the classic, robust workhorse for seasonal business data.</p>\n<h3>8. When to reach for it</h3>\n<p>Exponential smoothing (the ETS family) is fast, needs little data, is hard to overfit, and produces strong baselines — often competitive with far heavier models on regular business series. Its limits: it captures level/trend/season but not complex dynamics, external drivers, or long-range dependence. Use it as the baseline every richer model (ARIMA, deep forecasters) must beat.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why \"exponential\"? the geometric weights</summary>\n<p>Unroll the recursion $\\hat{y}_{t+1} = \\alpha y_t + (1-\\alpha)\\hat{y}_t$ and it becomes a weighted sum of <em>all</em> past observations: $\\hat{y}_{t+1} = \\alpha y_t + \\alpha(1-\\alpha) y_{t-1} + \\alpha(1-\\alpha)^2 y_{t-2} + \\cdots$ The weight on the point $j$ steps back is $\\alpha(1-\\alpha)^j$ — it shrinks <b>geometrically</b> (exponentially) with age, and the weights sum to 1. So unlike a moving average's hard window with equal weights, SES has an infinitely long but exponentially-fading memory. This is the identical idea behind the exponential moving averages in momentum/Adam optimizers and the running averages in RL — one recursive line, an exponentially-decaying memory.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: choosing α by minimizing error</summary>\n<p>You don't eyeball $\\alpha$. You pick the value that minimizes the sum of squared one-step-ahead forecast errors over the training history, $\\sum_t (y_t - \\hat{y}_t)^2$ — a 1-D optimization solved by grid search or a numerical optimizer. A large fitted $\\alpha$ tells you the series is dominated by recent shocks (little persistent structure); a small $\\alpha$ says the level is stable and old data still informs the present. The same principle scales up: Holt and Holt–Winters fit their two or three smoothing parameters jointly the same way.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: ETS, state-space, and the link to ARIMA</summary>\n<p>Modern software treats exponential smoothing as the <b>ETS</b> (Error, Trend, Seasonal) family of <em>state-space</em> models: a hidden state (level, trend, seasonal) evolves and emits the observation, which lets you fit by likelihood and get prediction intervals, not just point forecasts. Strikingly, several ETS models are <em>equivalent</em> to particular ARIMA models — e.g. simple exponential smoothing is the optimal forecast for an ARIMA(0,1,1). So ETS and ARIMA are two lenses on overlapping ground: ETS organizes models by components (trend/season), ARIMA by autocorrelation structure (AR/I/MA). Knowing both lets you pick the framing that fits the problem.</p>\n</details>",
          "mcq": [
            {
              "q": "Simple exponential smoothing forecasts the next value as:",
              "choices": [
                "A blend of the latest observation and the previous forecast",
                "The simple average of all points equally",
                "A random draw",
                "The maximum so far"
              ],
              "answer": 0,
              "explain": "SES: alpha*y_t + (1-alpha)*prev."
            },
            {
              "q": "In SES, the weight on an observation $j$ steps in the past:",
              "choices": [
                "Is the same for all ages",
                "Decays geometrically (exponentially) with age",
                "Grows with age",
                "Is exactly zero"
              ],
              "answer": 1,
              "explain": "Weights alpha(1-alpha)^j fade exponentially."
            },
            {
              "q": "A smoothing parameter $\\alpha$ close to 1 makes the forecast:",
              "choices": [
                "Ignore the latest point",
                "Very smooth and sluggish",
                "React fast to recent values (noisy, close to the naive forecast)",
                "Constant forever"
              ],
              "answer": 2,
              "explain": "High alpha = high responsiveness."
            },
            {
              "q": "Plain SES lags a trending series because it:",
              "choices": [
                "Weights old points more",
                "Uses too many parameters",
                "Removes the seasonality",
                "Forecasts a flat line with no slope"
              ],
              "answer": 3,
              "explain": "SES has no trend term → flat forecast."
            },
            {
              "q": "Holt's linear method extends SES by smoothing:",
              "choices": [
                "A separate trend (slope) component as well as the level",
                "The seasonal indices only",
                "Nothing new",
                "The variance"
              ],
              "answer": 0,
              "explain": "Holt = level + trend."
            },
            {
              "q": "Holt–Winters adds, on top of level and trend:",
              "choices": [
                "A second trend",
                "A smoothed seasonal component",
                "A neural network",
                "Random noise"
              ],
              "answer": 1,
              "explain": "Holt-Winters = level + trend + season."
            },
            {
              "q": "How is the smoothing parameter $\\alpha$ usually chosen?",
              "choices": [
                "By the number of data points",
                "Always set to 0.5",
                "By minimizing one-step-ahead forecast error on the history",
                "Randomly each step"
              ],
              "answer": 2,
              "explain": "Fit alpha to minimize squared forecast error."
            },
            {
              "q": "A good reason to use exponential smoothing is that it:",
              "choices": [
                "Always beats every other model",
                "Captures arbitrary nonlinear dynamics",
                "Requires no choice of components",
                "Gives fast, robust baselines that need little data and rarely overfit"
              ],
              "answer": 3,
              "explain": "ETS = strong, cheap baseline."
            },
            {
              "q": "The \"naive\" forecast predicts that the next value:",
              "choices": [
                "Equals the most recent observation",
                "Equals the overall average",
                "Is a random number",
                "Is always zero"
              ],
              "answer": 0,
              "explain": "Naive: y-hat = y_t."
            },
            {
              "q": "Compared with simple exponential smoothing, a plain moving average:",
              "choices": [
                "Weights recent points exponentially more",
                "Weights all points in its window equally",
                "Ignores recent points",
                "Has infinite memory"
              ],
              "answer": 1,
              "explain": "MA = equal weights in a hard window."
            },
            {
              "q": "In simple exponential smoothing, the weights on all past observations:",
              "choices": [
                "Grow without bound",
                "Sum to 0",
                "Sum to 1",
                "Are all equal"
              ],
              "answer": 2,
              "explain": "alpha*sum (1-alpha)^j = 1."
            },
            {
              "q": "An h-step-ahead forecast from plain SES is:",
              "choices": [
                "Different and random each step",
                "A steadily rising line",
                "A repeating seasonal curve",
                "The same value for every horizon (a flat line)"
              ],
              "answer": 3,
              "explain": "SES has no trend/season → flat multi-step forecast."
            },
            {
              "q": "Use the multiplicative form of Holt–Winters when the seasonal swings:",
              "choices": [
                "Grow in proportion to the level",
                "Stay a constant size",
                "Disappear entirely",
                "Are random noise"
              ],
              "answer": 0,
              "explain": "Growing swings → multiplicative (or model the log)."
            },
            {
              "q": "If a complex model cannot beat the naive or mean baseline, you should:",
              "choices": [
                "Deploy the complex model anyway",
                "Prefer the simple baseline",
                "Add more parameters",
                "Shuffle the data"
              ],
              "answer": 1,
              "explain": "Baselines are the bar; don't ship a model that loses to them."
            },
            {
              "q": "In the ETS family, \"ETS\" stands for:",
              "choices": [
                "Exponential Time Series",
                "Estimate, Test, Smooth",
                "Error, Trend, Seasonal",
                "Extended Trend System"
              ],
              "answer": 2,
              "explain": "ETS = Error, Trend, Seasonal state-space models."
            },
            {
              "q": "Simple exponential smoothing is the optimal forecast for which model?",
              "choices": [
                "A linear regression on time",
                "ARIMA(1, 0, 0)",
                "A pure seasonal model",
                "ARIMA(0, 1, 1)"
              ],
              "answer": 3,
              "explain": "SES ≡ ARIMA(0,1,1)."
            }
          ],
          "flashcards": [
            {
              "front": "The three baseline forecasts",
              "back": "<b>Naive</b> ($\\hat{y}_{t+1}=y_t$), <b>mean</b> (the historical average), and <b>drift</b> (extend the first-to-last line). Any real model must beat these."
            },
            {
              "front": "Simple exponential smoothing (SES)",
              "back": "$\\hat{y}_{t+1} = \\alpha\\,y_t + (1-\\alpha)\\,\\hat{y}_t$ — blend the latest value with the previous forecast. Past points get geometrically (exponentially) decaying weights."
            },
            {
              "front": "What does the smoothing parameter $\\alpha$ control?",
              "back": "Responsiveness. Near 1 → tracks recent values fast (noisy, ~naive); near 0 → smooth and sluggish (~long-run mean). It's fit by minimizing one-step forecast error."
            },
            {
              "front": "Holt's linear method",
              "back": "Exponential smoothing with two components — a smoothed <b>level</b> and a smoothed <b>trend</b> (slope) — so the forecast extrapolates direction and doesn't lag a trend."
            },
            {
              "front": "Holt–Winters",
              "back": "Adds a smoothed <b>seasonal</b> component to Holt (three equations: level, trend, season), in additive or multiplicative form. The classic workhorse for seasonal data."
            },
            {
              "front": "Why is SES called \"exponential\"?",
              "back": "Unrolling the recursion gives weights $\\alpha(1-\\alpha)^j$ on the point $j$ steps back — they decay geometrically/exponentially with age, an infinitely long but fading memory."
            }
          ],
          "homework": [
            {
              "prompt": "Run simple exponential smoothing with $\\alpha = 0.5$ on [20, 24, 22], starting the level at the first value. What is the forecast for the next step?",
              "hint": "s starts at 20; update twice.",
              "solution": "Start s=20. After 24: s = 0.5·24 + 0.5·20 = 22. After 22: s = 0.5·22 + 0.5·22 = 22. The one-step-ahead forecast is the current level, <b>22</b>. (SES forecasts a flat line at the latest smoothed level.)"
            },
            {
              "prompt": "Your series has a steady upward trend. Why will plain SES under-forecast, and which method fixes it?",
              "hint": "What does SES extrapolate?",
              "solution": "SES forecasts a flat line at the current level, with no slope, so on a rising series it persistently lags behind and under-forecasts. <b>Holt's linear method</b> fixes it by smoothing a separate trend (slope) term and extrapolating the level along it, keeping the forecast on the trend."
            },
            {
              "prompt": "Two analysts fit SES to the same series; one gets $\\alpha \\approx 0.9$, the other (different series) $\\alpha \\approx 0.1$. What does each value say about its series?",
              "hint": "High vs low responsiveness.",
              "solution": "$\\alpha \\approx 0.9$: the forecast leans almost entirely on the most recent observation — the series is dominated by recent shocks with little persistent level, so old data is nearly ignored. $\\alpha \\approx 0.1$: the level is stable and changes slowly, so the forecast averages over a long memory and barely reacts to any single point."
            }
          ],
          "examples": [
            {
              "title": "Picking a baseline",
              "body": "You're asked to forecast next week's daily website visits and want a quick, defensible first number. What do you try first?",
              "solution": "Start with the baselines: naive (next day = today) and the mean, plus a simple moving average. Then fit <b>simple exponential smoothing</b> — one parameter, robust, and it weights recent days more. If there's a weekly pattern, jump to <b>Holt–Winters</b> with period 7. Only escalate to ARIMA or a deep model if these baselines aren't accurate enough; they often are."
            },
            {
              "title": "Reading a fitted α",
              "body": "Software fits SES to your monthly demand and reports $\\alpha = 0.05$. What does that imply, and is a flat forecast reasonable?",
              "solution": "A tiny $\\alpha$ means the smoothed level moves very slowly — demand has a stable underlying level and month-to-month wiggles are mostly noise. The model essentially forecasts the long-run average, which is reasonable <em>if</em> there's no trend or seasonality. If a plot shows trend/season, SES is the wrong tool — switch to Holt or Holt–Winters."
            },
            {
              "title": "Choosing among ETS variants",
              "body": "Quarterly sales trend upward and have a clear seasonal pattern whose size grows with the level. Which exponential-smoothing model?",
              "solution": "<b>Holt–Winters, multiplicative</b> seasonality: you need a trend component (sales rise) and a seasonal component, and because the seasonal swings grow with the level the multiplicative form fits (equivalently, model the log and use additive). Plain SES or Holt would miss the season; additive Holt–Winters would mis-size the growing swings."
            }
          ]
        },
        {
          "id": "ts-arima",
          "title": "ARIMA: Autoregression, Integration & Moving Averages",
          "minutes": 17,
          "content": "<h3>1. The hook: one model, three ideas</h3>\n<p><b>ARIMA</b> is the workhorse of classical forecasting, and its name <em>is</em> its recipe: <b>AR</b> (autoregression) + <b>I</b> (integration / differencing) + <b>MA</b> (moving average of errors). Written <b>ARIMA(p, d, q)</b>, it regresses a series on its own recent values <em>and</em> its own recent forecast errors, after differencing it $d$ times to make it stationary. Master those three letters and you can read almost any classical forecast.</p>\n<h3>2. AR(p): regress on your own past</h3>\n<p>An <b>autoregressive</b> model predicts the next value from a weighted sum of the previous $p$ values: $y_t = c + \\phi_1 y_{t-1} + \\dots + \\phi_p y_{t-p} + \\varepsilon_t$. It is literally linear regression where the \"features\" are lagged copies of the series. AR captures <em>momentum and mean-reversion</em>: with $|\\phi| < 1$, an AR(1) drifts back toward its long-run mean $c/(1-\\phi)$.</p>\n<div data-viz=\"ts-ar-process\"></div>\n<h3>3. MA(q): regress on your own errors</h3>\n<p>A <b>moving-average</b> model (in the ARIMA sense — not the smoothing average!) predicts from the last $q$ forecast <em>errors</em>: $y_t = c + \\varepsilon_t + \\theta_1 \\varepsilon_{t-1} + \\dots + \\theta_q \\varepsilon_{t-q}$. It captures short-lived <em>shocks</em>: a surprise today nudges the next few values, then fades. AR remembers past <em>levels</em>; MA remembers past <em>surprises</em>.</p>\n<h3>4. ARMA: the two together</h3>\n<p>Combine them and you get <b>ARMA(p, q)</b> — past values <em>and</em> past errors in one equation. ARMA models any <em>stationary</em> series with short-range dependence, and is far more flexible than either piece alone. The catch in its name: ARMA assumes stationarity. Real series usually aren't.</p>\n<h3>5. The \"I\": integrate to handle trends</h3>\n<p>That is what the <b>I</b> fixes. Difference the series $d$ times (from the stationarity lesson) until it's stationary, fit an ARMA to the differenced series, then <em>un-difference</em> (cumulatively sum) the forecasts back to the original scale. The \"$d$\" in ARIMA(p, d, q) is exactly that number of differences — usually 0, 1, or 2.</p>\n<h3>6. AR(1) in action</h3>\n<p>Watch an AR(1) with $c=2,\\ \\phi=0.6$ generate its own forecasts from a starting value of 10, decaying toward the long-run mean $2/(1-0.6)=5$:</p>\n<div data-code=\"javascript\" data-expected=\"10, 8, 6.8, 6.08, 5.65\">// AR(1): each value is a constant plus phi times the previous value\nconst c = 2, phi = 0.6;\nconst y = [10];\nfor (let t = 1; t < 5; t++) y.push(+(c + phi * y[t - 1]).toFixed(2));\nconsole.log(y.join(\", \"));\n// It mean-reverts toward c/(1 - phi) = 5 -- the signature of a stationary AR.</div>\n<div data-viz='ts-forecast-cone'></div>\n<h3>7. Choosing p, d, q</h3>\n<p>The classical recipe (<b>Box–Jenkins</b>): pick $d$ by differencing until stationary (plot + ADF), then read the <b>ACF</b> and <b>PACF</b> to suggest $p$ and $q$ — a sharp cutoff in the PACF at lag $p$ points to AR(p); a cutoff in the ACF at lag $q$ points to MA(q). Compare candidates by <b>AIC/BIC</b> (fit penalized for complexity), and check that the residuals look like white noise. Modern <code>auto.arima</code> automates this search.</p>\n<h3>8. SARIMA and where ARIMA fits</h3>\n<p>Add seasonal AR/I/MA terms at the seasonal lag and you get <b>SARIMA</b>, the seasonal extension. ARIMA shines on a single, regular, medium-length series with clear autocorrelation — often matching or beating heavier models there, with interpretable coefficients and honest prediction intervals. It struggles with many related series, rich external features, and nonlinearity — exactly where the deep forecasters in the next module take over.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: AR vs MA — and their ACF/PACF fingerprints</summary>\n<p>The two halves remember different things. <b>AR</b> regresses on past <em>values</em> (levels), so its influence decays geometrically and forever — its <b>ACF</b> tails off slowly while its <b>PACF</b> cuts off sharply after lag $p$ (the partial correlation removes the indirect effects, exposing the true order). <b>MA</b> regresses on past <em>errors</em> (shocks), which only matter for $q$ steps — so the pattern is mirrored: its <b>ACF</b> cuts off after lag $q$ while its PACF tails off. That duality (PACF cutoff ⇒ AR order; ACF cutoff ⇒ MA order) is the heart of Box–Jenkins identification.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the stationarity condition and the long-run mean</summary>\n<p>An AR(1), $y_t = c + \\phi y_{t-1} + \\varepsilon_t$, is stationary only if $|\\phi| < 1$. Take expectations of both sides at the stationary mean $\\mu$: $\\mu = c + \\phi\\mu$, so $\\mu = c/(1-\\phi)$ — the level the series reverts to (5 in the code example). At $\\phi = 1$ you have a random walk (a unit root, non-stationary — hence the need to difference); at $|\\phi| > 1$ the series explodes. For higher-order AR(p), the analogous condition is that the roots of the characteristic polynomial lie outside the unit circle — the multivariable generalization of $|\\phi| < 1$.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: Box–Jenkins and auto-ARIMA</summary>\n<p>The <b>Box–Jenkins</b> method is a three-step loop: <em>identify</em> (difference to stationarity, read ACF/PACF for tentative $p,q$), <em>estimate</em> (fit by maximum likelihood), and <em>diagnose</em> (are the residuals white noise? if not, revise). Done by hand it takes judgement. <code>auto.arima</code> automates it: it searches over $(p,d,q)$ (and seasonal orders), uses unit-root tests to set $d$, and minimizes <b>AICc</b> to balance fit against parameter count — the same overfitting-vs-underfitting tension as everywhere in ML. It's a strong default, but a glance at the residual ACF still pays off.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: GARCH — modeling time-varying volatility</summary>\n<p>ARIMA models the conditional <em>mean</em> and quietly assumes the variance is constant. Financial returns break that assumption badly: they show <b>volatility clustering</b> — calm stretches and turbulent stretches bunch together, so a big move today makes a big move tomorrow more likely. The variance itself is time-varying, a property called <em>conditional heteroskedasticity</em>.</p>\n<p>The <b>ARCH</b> model captures it by letting today&#39;s variance depend on recent squared shocks; <b>GARCH</b> adds lagged variances too. The workhorse is GARCH(1,1): $\\sigma_t^2 = \\omega + \\alpha\\,\\varepsilon_{t-1}^2 + \\beta\\,\\sigma_{t-1}^2$. A large shock $\\varepsilon_{t-1}$ pumps up today&#39;s variance, which then decays back toward the long-run level. The <em>persistence</em> $\\alpha + \\beta$ controls how slowly: close to 1, volatility shocks linger a long time — exactly what real markets show.</p>\n<p>Mean and variance models are complementary, often fitted together as ARIMA-GARCH: ARIMA forecasts <em>where</em> the series is headed, GARCH forecasts <em>how uncertain</em> that forecast is. That second piece is what powers honest prediction intervals, Value-at-Risk in finance, and option pricing — anywhere the size of the risk matters as much as the central guess.</p>\n</details>\n<div data-viz=\"ts-garch-volatility\"></div>\n<details class=\"deep-dive\">\n<summary>Deeper dive: Granger causality — does X help predict Y?</summary>\n<p>One series is said to <b>Granger-cause</b> another if its past helps predict that other&#39;s future beyond what the other&#39;s own past already reveals. The test is concrete: forecast Y from its own lagged values, then again from its own lags <em>plus</em> the lagged values of X. If adding X&#39;s history significantly cuts the forecast error, X Granger-causes Y. With several series at once this is read straight off a vector-autoregression (VAR) model.</p>\n<p>The name is a trap. Granger causality is <em>predictive</em>, not <em>interventional</em> — it says X carries early information about Y, not that changing X would change Y. A common driver of both, or X merely being a leading indicator, produces Granger causality with no real causal link (a rooster&#39;s crow Granger-causes the sunrise). It can also miss true causes that act faster than your sampling interval, or act instantaneously.</p>\n<p>Used carefully it is still valuable — economists ask whether money supply Granger-causes inflation, neuroscientists trace information flow between brain regions. Just remember where it sits: the weakest, data-only rung of the causal ladder, far below the interventional tools — randomized experiments, instruments, <a href=\"#/lesson/probability-statistics/ps-causal-estimation\" data-route>regression discontinuity</a> — that license genuine \"what if we intervened\" claims.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: the frequency domain — spectral analysis of a time series</summary>\n<p>Everything so far lives in the <em>time</em> domain: values plotted against time. The <b>frequency</b> domain is a dual view — any series can be written as a sum of sinusoids of different frequencies, and the <b>spectral density</b> $S(f)$ says how much variance (\"power\") sits at each frequency $f$. Slow trends pile power at low frequencies; a pure annual cycle in monthly data spikes at $f = 1/12$; white noise spreads power flat across all frequencies.</p>\n<p>You estimate $S(f)$ from data with the <b>periodogram</b> — essentially the squared magnitude of the series' Fourier transform. Its tall peaks pin down hidden periodicities that are often invisible in the raw wiggle: one clean spike in the spectrum can reveal a cycle you would never untangle by eye. That is the practical payoff — seasonality and multi-cycle structure are frequently far easier to <em>see</em> in frequency than in time.</p>\n<p>The two views are tied together by the <b>Wiener-Khinchin theorem</b>: the spectral density is the Fourier transform of the autocovariance function. So the ACF you use to fit ARIMA and the spectrum are the same information in different coordinates — AR and MA models each have a characteristic spectral shape. And the transform is computed in $O(n\\log n)$ by the <a href=\"#/lesson/algorithms/a-divide-and-conquer\" data-route>Fast Fourier Transform</a>, which is what makes spectral analysis practical at scale.</p>\n</details>\n<div data-viz=\"ts-periodogram\"></div>",
          "mcq": [
            {
              "q": "In ARIMA(p, d, q), the letters stand for:",
              "choices": [
                "AutoRegressive, Integrated (differencing), Moving-average (of errors)",
                "Average, Difference, Multiply",
                "Approximate, Decompose, Model",
                "Additive, Deterministic, Markov"
              ],
              "answer": 0,
              "explain": "AR + I + MA."
            },
            {
              "q": "An autoregressive AR(p) model predicts the next value from:",
              "choices": [
                "The previous q forecast errors",
                "A weighted sum of the previous p values of the series",
                "A moving average window",
                "Pure random noise"
              ],
              "answer": 1,
              "explain": "AR regresses on lagged values."
            },
            {
              "q": "A moving-average MA(q) term (in the ARIMA sense) regresses on:",
              "choices": [
                "The seasonal indices",
                "The last q raw values",
                "The last q forecast errors (shocks)",
                "The trend slope"
              ],
              "answer": 2,
              "explain": "MA uses past errors, not past values."
            },
            {
              "q": "The \"I\" (integration) part of ARIMA means the series has been:",
              "choices": [
                "Shuffled",
                "Multiplied by a constant",
                "Smoothed with a log",
                "Differenced d times to make it stationary"
              ],
              "answer": 3,
              "explain": "I = differencing for stationarity."
            },
            {
              "q": "An AR(1) $y_t = c + \\phi y_{t-1} + \\varepsilon_t$ is stationary only when:",
              "choices": [
                "The absolute value of $\\phi$ is less than 1",
                "$\\phi$ equals exactly 1",
                "$\\phi$ is greater than 1",
                "$c$ equals 0"
              ],
              "answer": 0,
              "explain": "|phi|<1; phi=1 is a random walk."
            },
            {
              "q": "The long-run mean of a stationary AR(1) is:",
              "choices": [
                "$c \\times \\phi$",
                "$c / (1 - \\phi)$",
                "$\\phi / c$",
                "Always zero"
              ],
              "answer": 1,
              "explain": "Solve mu = c + phi*mu."
            },
            {
              "q": "In Box–Jenkins identification, a sharp cutoff in the PACF at lag p suggests:",
              "choices": [
                "More differencing",
                "An MA(p) term",
                "An AR(p) term",
                "Seasonality"
              ],
              "answer": 2,
              "explain": "PACF cutoff → AR order; ACF cutoff → MA order."
            },
            {
              "q": "ARIMA is the LEAST natural choice for:",
              "choices": [
                "When you want interpretable coefficients",
                "A single series with clear autocorrelation",
                "A medium-length monthly series",
                "Forecasting tens of thousands of related series with rich covariates"
              ],
              "answer": 3,
              "explain": "Global/covariate-rich problems suit deep forecasters."
            },
            {
              "q": "A sharp cutoff in the ACF at lag q (with a tailing PACF) suggests:",
              "choices": [
                "An MA(q) term",
                "An AR(q) term",
                "More differencing is needed",
                "A deterministic trend"
              ],
              "answer": 0,
              "explain": "ACF cutoff → MA order; PACF cutoff → AR order."
            },
            {
              "q": "An AR(1) with $\\phi = 1$ is:",
              "choices": [
                "Strongly mean-reverting",
                "A random walk — non-stationary, with a unit root",
                "Pure white noise",
                "A seasonal model"
              ],
              "answer": 1,
              "explain": "phi=1 is the unit-root boundary."
            },
            {
              "q": "After fitting a good ARIMA model, the residuals should look like:",
              "choices": [
                "A perfect sine wave",
                "A strong trend",
                "White noise (no remaining autocorrelation)",
                "The original series"
              ],
              "answer": 2,
              "explain": "Good fit → residuals are unpredictable."
            },
            {
              "q": "AIC and BIC are used in ARIMA to:",
              "choices": [
                "Compute the forecast errors",
                "Difference the series",
                "Remove seasonality",
                "Select model orders by balancing fit against complexity"
              ],
              "answer": 3,
              "explain": "Information criteria penalize extra parameters."
            },
            {
              "q": "SARIMA extends ARIMA by adding:",
              "choices": [
                "Seasonal AR, I, and MA terms at the seasonal lag",
                "A neural network",
                "A second difference always",
                "External weather data"
              ],
              "answer": 0,
              "explain": "SARIMA = seasonal ARIMA."
            },
            {
              "q": "The function $\\texttt{auto.arima}$ chooses orders by:",
              "choices": [
                "Picking p=d=q=1 always",
                "Searching over (p, d, q) and minimizing an information criterion (AICc)",
                "Using the largest possible orders",
                "Random guessing"
              ],
              "answer": 1,
              "explain": "Automated Box-Jenkins via AICc search."
            },
            {
              "q": "The \"moving average\" in ARIMA differs from a smoothing moving average because it averages:",
              "choices": [
                "The seasonal indices",
                "Past raw values, not errors",
                "Past forecast errors, not past raw values",
                "Nothing — they are the same"
              ],
              "answer": 2,
              "explain": "ARIMA's MA term uses error shocks."
            },
            {
              "q": "An AR(2) model predicts the next value from:",
              "choices": [
                "The mean and variance only",
                "The previous two forecast errors",
                "Two seasonal cycles",
                "The previous two values of the series"
              ],
              "answer": 3,
              "explain": "AR(2): two autoregressive lags."
            }
          ],
          "flashcards": [
            {
              "front": "What do the three letters of ARIMA(p, d, q) mean?",
              "back": "<b>AR</b>(p): regress on the last $p$ values. <b>I</b>(d): difference $d$ times for stationarity. <b>MA</b>(q): regress on the last $q$ forecast errors."
            },
            {
              "front": "Autoregressive AR(p) model",
              "back": "$y_t = c + \\phi_1 y_{t-1} + \\dots + \\phi_p y_{t-p} + \\varepsilon_t$ — linear regression on lagged values. Captures momentum/mean-reversion; AR(1) reverts to $c/(1-\\phi)$."
            },
            {
              "front": "Moving-average MA(q) model (ARIMA sense)",
              "back": "$y_t = c + \\varepsilon_t + \\theta_1\\varepsilon_{t-1} + \\dots + \\theta_q\\varepsilon_{t-q}$ — regress on past <em>errors</em> (shocks), not values. (Different from the smoothing moving average.)"
            },
            {
              "front": "AR vs MA — what does each remember?",
              "back": "AR remembers past <em>levels</em> (decays geometrically, forever); MA remembers past <em>shocks</em> (only for q steps). ACF/PACF: AR → PACF cuts off; MA → ACF cuts off."
            },
            {
              "front": "What is the \"I\" (integration) in ARIMA?",
              "back": "The number of differences $d$ applied to make the series stationary before fitting ARMA; forecasts are un-differenced (cumulatively summed) back. Usually 0, 1, or 2."
            },
            {
              "front": "Box–Jenkins / auto-ARIMA",
              "back": "Identify (difference + read ACF/PACF), estimate (max likelihood), diagnose (residual white-noise check). <code>auto.arima</code> searches $(p,d,q)$ and minimizes AICc."
            }
          ],
          "homework": [
            {
              "prompt": "Run the AR(1) $y_t = 1 + 0.5\\,y_{t-1}$ for two steps from $y_0 = 10$. What's the long-run mean it heads toward?",
              "hint": "Iterate, then use c/(1-phi).",
              "solution": "$y_1 = 1 + 0.5\\cdot10 = 6$; $y_2 = 1 + 0.5\\cdot6 = 4$. The long-run mean is $c/(1-\\phi) = 1/(1-0.5) = 2$, so the series keeps decaying toward 2 (next would be 3, then 2.5, …)."
            },
            {
              "prompt": "A series is non-stationary with a clear trend, but after one difference it looks stationary and its ACF cuts off sharply at lag 1. What ARIMA(p, d, q) orders does this suggest?",
              "hint": "d from differencing; ACF cutoff → MA order.",
              "solution": "One difference made it stationary, so $d = 1$. An ACF that cuts off at lag 1 (with a tailing PACF) is the MA signature with $q = 1$, and no AR term needed, so $p = 0$. That points to <b>ARIMA(0, 1, 1)</b> — which, fittingly, is equivalent to simple exponential smoothing."
            },
            {
              "prompt": "Why can't you fit a plain ARMA model directly to a trending sales series?",
              "hint": "What does ARMA assume?",
              "solution": "ARMA assumes the series is <b>stationary</b> (constant mean/variance), but a trending series has a drifting mean. Fitting ARMA directly gives unstable, misleading coefficients. You must first difference it (the \"I\" step) to remove the trend, fit ARMA to the stationary differences, then integrate the forecasts back — i.e. use ARIMA with $d \\ge 1$."
            }
          ],
          "examples": [
            {
              "title": "Reading ARIMA(2, 1, 0)",
              "body": "A model is reported as ARIMA(2, 1, 0). Describe what it does in words.",
              "solution": "It takes <b>one difference</b> of the series ($d=1$, to remove a trend), then models the differenced series as <b>AR(2)</b> — each value is a constant plus weighted contributions from the previous two differenced values ($p=2$) — with <b>no MA term</b> ($q=0$). Forecasts are made on the differenced scale and cumulatively summed back. The pure-AR form suggests a PACF that cut off at lag 2."
            },
            {
              "title": "ARIMA or exponential smoothing?",
              "body": "You have one medium-length monthly series with clear autocorrelation and want interpretable coefficients and prediction intervals. ARIMA or ETS?",
              "solution": "Either can work — they overlap — but ARIMA is the natural pick when you want to model the <b>autocorrelation structure</b> explicitly and read off AR/MA coefficients, and it gives principled intervals. ETS is the pick when you think in terms of <b>components</b> (level/trend/season). With clear autocorrelation and a single regular series, ARIMA (or SARIMA if seasonal) is a strong, interpretable choice."
            },
            {
              "title": "When ARIMA is the wrong tool",
              "body": "You must forecast daily demand for 50,000 products at once, using price, promotions, and weather. Is ARIMA a good fit?",
              "solution": "No. ARIMA is built for a <em>single</em> series with endogenous autocorrelation and few external drivers; fitting 50,000 separate ARIMAs ignores shared structure, and ARIMA doesn't naturally use rich covariates (price/weather/promotions) or learn across series. This is the regime for <b>global deep forecasters</b> (one model trained on all series with covariates) — the next module's territory."
            }
          ]
        },
        {
          "id": "ts-forecast-evaluation",
          "title": "Forecast Evaluation & Backtesting",
          "minutes": 16,
          "content": "<h3>1. The hook: a forecast is only as good as its test</h3>\n<p>Any model can fit the past — the only question that matters is how it does on data it hasn't seen. For time series that means one thing: evaluate on the <b>future</b>. Hold out the most recent stretch, forecast it, and compare to what actually happened. A model's training error is marketing; its out-of-sample error on a held-out future is the truth.</p>\n<h3>2. The time-respecting split</h3>\n<p>Split by <em>time</em>, never at random: train on $[1..k]$, test on the contiguous block $[k+1..n]$. Random k-fold leaks the future into training (a fatal error we met earlier). Every feature must also be computable from data strictly before the point it predicts — a centred rolling mean, for example, peeks ahead and is forbidden.</p>\n<h3>3. Scale-dependent error metrics</h3>\n<p>The two staples measure error in the data's own units. <b>MAE</b> (mean absolute error) averages $|y_t - \\hat{y}_t|$. <b>RMSE</b> (root mean squared error) squares first: $\\sqrt{\\frac{1}{n}\\sum (y_t - \\hat{y}_t)^2}$. Because squaring magnifies big misses, <b>RMSE $\\ge$ MAE</b> always, and the gap grows when a few large errors dominate. Pick RMSE when big errors are disproportionately costly; MAE when every unit of error counts the same.</p>\n<h3>4. Computing MAE and RMSE</h3>\n<p>Four forecasts, one of them badly off — watch RMSE exceed MAE:</p>\n<div data-code=\"javascript\" data-expected=\"MAE = 1.50, RMSE = 1.73\">// MAE averages absolute errors; RMSE squares first, so outliers cost more\nconst actual = [10, 12, 14, 13];\nconst pred   = [11, 11, 15, 10];   // last forecast is off by 3\nconst n = actual.length;\nconst err = actual.map((a, i) => a - pred[i]);\nconst mae = err.reduce((s, e) => s + Math.abs(e), 0) / n;\nconst rmse = Math.sqrt(err.reduce((s, e) => s + e * e, 0) / n);\nconsole.log(\"MAE = \" + mae.toFixed(2) + \", RMSE = \" + rmse.toFixed(2));\n// RMSE > MAE because the single large miss is penalized more heavily.</div>\n<h3>5. Percentage and scaled metrics</h3>\n<p>To compare accuracy <em>across</em> series of different magnitudes you need a unit-free metric. <b>MAPE</b> (mean absolute percentage error) divides each error by the actual — intuitive, but it explodes when actuals are near zero and punishes over- and under-forecasts asymmetrically. <b>MASE</b> (mean absolute scaled error) fixes this by dividing the MAE by the MAE of a naive forecast: $\\text{MASE} < 1$ means you beat naive, $> 1$ means you didn't. It is the robust default for cross-series comparison.</p>\n<h3>6. Backtesting: rolling-origin evaluation</h3>\n<p>A single train/test split gives one noisy number. <b>Backtesting</b> (rolling-origin or time-series cross-validation) does better: forecast from many successive cut-points and average the errors. Either expand the window (train on everything so far) or slide a fixed window forward. Each test point is always in the future of its training data, so the estimate is honest and far less dependent on which single split you happened to choose.</p>\n<div data-viz=\"ts-backtesting\"></div>\n<h3>7. Always beat a baseline</h3>\n<p>An RMSE of 50 means nothing in isolation — 50 <em>what</em>, compared to <em>what</em>? Always report skill <em>relative to a baseline</em> (naive, seasonal-naive, or mean). MASE bakes this in; a <b>skill score</b> $1 - \\text{error}_{\\text{model}}/\\text{error}_{\\text{baseline}}$ does it explicitly. A complex model that can't beat seasonal-naive should be retired, not shipped.</p>\n<h3>8. Beyond point forecasts</h3>\n<p>Most decisions need <em>uncertainty</em>, not just a number. A good <b>prediction interval</b> is judged on two things: <b>calibration/coverage</b> (a 90% interval should contain the truth ~90% of the time) and <b>sharpness</b> (narrower is better, given calibration). Quantile forecasts are scored with the <b>pinball loss</b>. A point forecast with honest intervals beats a slightly-better point forecast with no uncertainty almost every time.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: MAE vs RMSE — and what each one optimizes</summary>\n<p>The choice isn't cosmetic — the two metrics reward different forecasts. Minimizing <b>squared</b> error (RMSE/MSE) is minimized by the <em>conditional mean</em>, and because squaring weights large deviations heavily, it is sensitive to outliers and pulls the forecast toward avoiding big misses. Minimizing <b>absolute</b> error (MAE) is minimized by the <em>conditional median</em>, which is robust to outliers and to skew. So on a spiky or heavy-tailed series the two can prefer genuinely different models. Rule of thumb: optimize the metric that matches the real cost — RMSE if a single large error is catastrophic (inventory stockout), MAE if total absolute deviation is what you pay for.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why MAPE misleads, and MASE fixes it</summary>\n<p><b>MAPE</b> $= \\frac{1}{n}\\sum |y_t - \\hat{y}_t| / |y_t|$ has three traps: it is undefined/explosive when $y_t \\approx 0$ (intermittent demand), it is <em>asymmetric</em> (a forecast that is too high is penalized differently from one too low — it favours under-forecasting), and it is meaningless for data that can be negative. <b>MASE</b> avoids all of this by scaling against the in-sample naive forecast's MAE: $\\text{MASE} = \\text{MAE}_{\\text{model}} / \\text{MAE}_{\\text{naive}}$. It is unit-free (so it compares across series), defined whenever the series isn't constant, symmetric, and has a clean interpretation — below 1 beats the naive benchmark. For competitions and many-series problems, MASE is the standard.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: scoring intervals — calibration, sharpness, pinball loss</summary>\n<p>A point forecast hides risk; an interval forecast exposes it, and is judged on two axes. <b>Calibration (coverage):</b> over many forecasts, the fraction of times the truth falls inside a nominal 90% interval should be ~90% — too few means over-confident, too many means too wide. <b>Sharpness:</b> among calibrated intervals, the narrowest is best (it commits to more). You can't chase coverage alone (the interval $(-\\infty, \\infty)$ has perfect coverage and zero value). For an individual quantile $\\tau$, the <b>pinball (quantile) loss</b> rewards being on the right side the right fraction of the time; averaging it across quantiles (the CRPS in the limit) gives a single proper score for the whole predictive distribution.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why you can't k-fold a time series (rolling-origin backtesting)</summary>\n<p>Standard <a href=\"#/lesson/machine-learning/ml-model-selection\" data-route>k-fold cross-validation</a> shuffles the rows and lets any fold serve as validation. On a time series that is <b>leakage</b>: shuffling — or letting a fold train on <em>future</em> points to predict the past — lets the model peek at information it would never have at prediction time. The tell-tale symptom is a glowing cross-validation score that collapses the moment the model meets genuinely future data.</p>\n<p>The fix is <b>rolling-origin evaluation</b> (a.k.a. time-series cross-validation, or backtesting): always train on the past, validate on the window that immediately follows, then roll the cut-point forward and repeat. It comes in two flavours — an <em>expanding</em> window (the training set keeps growing) and a <em>sliding</em> window (fixed size, deliberately forgetting old data when the process drifts). Either way you still get many train/validate splits to average, exactly like k-fold — but every split respects the arrow of time.</p>\n<p>The principle in one line: the only honest estimate of forecast skill is one where <em>every validation point lies in the future of its training data</em>. Respect the clock, or your backtest is fiction.</p>\n</details>",
          "mcq": [
            {
              "q": "A time-series forecast should be evaluated on:",
              "choices": [
                "A held-out future block (out-of-sample), respecting time order",
                "The training data it was fit on",
                "A random shuffle of all points",
                "The single largest value"
              ],
              "answer": 0,
              "explain": "Honest evaluation = on the unseen future."
            },
            {
              "q": "Compared with MAE, RMSE:",
              "choices": [
                "Ignores large errors",
                "Penalizes large errors more heavily (and is always ≥ MAE)",
                "Is always smaller than MAE",
                "Is unit-free"
              ],
              "answer": 1,
              "explain": "Squaring magnifies big misses."
            },
            {
              "q": "Minimizing squared error (RMSE/MSE) targets the conditional ___, while minimizing absolute error (MAE) targets the conditional ___:",
              "choices": [
                "mode; mean",
                "median; mean",
                "mean; median",
                "variance; mean"
              ],
              "answer": 2,
              "explain": "MSE→mean, MAE→median."
            },
            {
              "q": "MAPE (mean absolute percentage error) is problematic because it:",
              "choices": [
                "Penalizes small errors most",
                "Is always undefined",
                "Cannot be computed",
                "Explodes near zero and is asymmetric"
              ],
              "answer": 3,
              "explain": "Near-zero actuals and asymmetry break MAPE."
            },
            {
              "q": "MASE (mean absolute scaled error) below 1 means:",
              "choices": [
                "The model beats the naive baseline",
                "The model is worse than naive",
                "The forecast is perfect",
                "The series is non-stationary"
              ],
              "answer": 0,
              "explain": "MASE = model MAE / naive MAE."
            },
            {
              "q": "Rolling-origin (backtesting) evaluation:",
              "choices": [
                "Shuffles points into random folds",
                "Forecasts from many successive time cut-points and averages the errors",
                "Uses only the first data point",
                "Trains on the future"
              ],
              "answer": 1,
              "explain": "Multiple time-respecting folds."
            },
            {
              "q": "Reporting \"RMSE = 120\" alone is insufficient because RMSE is:",
              "choices": [
                "Unit-free",
                "Always between 0 and 1",
                "Scale-dependent — it needs a baseline for context",
                "Independent of the data"
              ],
              "answer": 2,
              "explain": "Compare to a naive/seasonal baseline."
            },
            {
              "q": "A well-judged 90% prediction interval should be:",
              "choices": [
                "Independent of the data",
                "As wide as possible regardless of coverage",
                "Exactly the point forecast",
                "Calibrated (covers the truth ~90% of the time) and as sharp as possible"
              ],
              "answer": 3,
              "explain": "Coverage first, then sharpness."
            },
            {
              "q": "Random k-fold cross-validation is wrong for time series because it causes:",
              "choices": [
                "Temporal leakage — training on future points to predict past ones",
                "Too few folds",
                "Overly wide intervals",
                "A scale-dependent metric"
              ],
              "answer": 0,
              "explain": "Shuffling lets the model peek at the future."
            },
            {
              "q": "For the same forecasts, RMSE is:",
              "choices": [
                "Always less than MAE",
                "Always greater than or equal to MAE",
                "Always equal to MAE",
                "Unrelated to MAE"
              ],
              "answer": 1,
              "explain": "Squaring then rooting gives RMSE ≥ MAE."
            },
            {
              "q": "A skill score of $1 - \\text{error}_{\\text{model}}/\\text{error}_{\\text{baseline}}$ that is positive means the model:",
              "choices": [
                "Has zero error",
                "Lost to the baseline",
                "Beat the baseline",
                "Is non-stationary"
              ],
              "answer": 2,
              "explain": "Positive skill = lower error than baseline."
            },
            {
              "q": "MAPE becomes undefined or explodes when:",
              "choices": [
                "There is a trend",
                "The forecast is perfect",
                "The series is long",
                "An actual value is zero (or near zero)"
              ],
              "answer": 3,
              "explain": "Dividing by a near-zero actual blows up."
            },
            {
              "q": "Among well-calibrated prediction intervals, the better one is:",
              "choices": [
                "Sharper — narrower, given it still covers correctly",
                "Wider, regardless of coverage",
                "The one ignoring the data",
                "Always the widest possible"
              ],
              "answer": 0,
              "explain": "Coverage first, then sharpness (narrowness)."
            },
            {
              "q": "A \"seasonal-naive\" baseline forecasts the next value as:",
              "choices": [
                "The overall mean",
                "The value from one full season ago",
                "Zero",
                "A random number"
              ],
              "answer": 1,
              "explain": "Seasonal-naive: y_hat = y_{t-m}."
            },
            {
              "q": "Using a centered rolling-mean feature (averaging points on both sides) in a forecaster is forbidden because it:",
              "choices": [
                "Removes the trend",
                "Is too slow to compute",
                "Uses future data the model wouldn't have at prediction time",
                "Adds seasonality"
              ],
              "answer": 2,
              "explain": "Centered windows peek ahead = leakage."
            },
            {
              "q": "The pinball (quantile) loss is used to score:",
              "choices": [
                "The number of parameters",
                "Only point forecasts",
                "The training time",
                "Quantile / interval forecasts (the predictive distribution)"
              ],
              "answer": 3,
              "explain": "Pinball loss scores quantile forecasts."
            }
          ],
          "flashcards": [
            {
              "front": "How must a time-series forecast be evaluated?",
              "back": "Out-of-sample on the <em>future</em>: hold out the most recent contiguous block, never a random split (which leaks the future). Features must use only past data."
            },
            {
              "front": "MAE vs RMSE",
              "back": "MAE averages $|y-\\hat{y}|$; RMSE squares first, $\\sqrt{\\frac1n\\sum(y-\\hat{y})^2}$. RMSE $\\ge$ MAE and penalizes large errors more. MSE is minimized by the mean, MAE by the median."
            },
            {
              "front": "MAPE and its pitfalls",
              "back": "Mean absolute <em>percentage</em> error — unit-free but explodes near zero, is asymmetric (favours under-forecasting), and fails on negative data. Avoid for intermittent series."
            },
            {
              "front": "MASE (mean absolute scaled error)",
              "back": "MAE of the model divided by MAE of the naive forecast. Unit-free, robust, symmetric; $< 1$ beats naive, $> 1$ doesn't. The standard for comparing across series."
            },
            {
              "front": "Backtesting / rolling-origin evaluation",
              "back": "Forecast from many successive cut-points (expanding or sliding window) and average the errors — each test point in the future of its training data. Far more reliable than one split."
            },
            {
              "front": "Evaluating prediction intervals",
              "back": "Judge on <b>calibration/coverage</b> (a 90% interval covers the truth ~90% of the time) AND <b>sharpness</b> (narrower is better given calibration). Quantiles scored by the pinball loss."
            }
          ],
          "homework": [
            {
              "prompt": "Forecasts vs actuals give errors [2, -2, 6]. Compute the MAE and the RMSE. Why do they differ?",
              "hint": "MAE = mean |e|; RMSE = sqrt(mean e^2).",
              "solution": "MAE = (2+2+6)/3 = 10/3 ≈ 3.33. RMSE = √((4+4+36)/3) = √(44/3) = √14.67 ≈ 3.83. RMSE > MAE because squaring inflates the single large error of 6 (36 vs the others' 4), so RMSE penalizes that big miss more heavily."
            },
            {
              "prompt": "Why is random k-fold cross-validation the wrong way to evaluate a time-series forecaster, and what replaces it?",
              "hint": "What does shuffling do to time?",
              "solution": "Random k-fold puts future points in the training folds and past points in the test folds — <b>temporal leakage</b> — so it overstates accuracy and collapses in production. Replace it with <b>rolling-origin (time-series) cross-validation</b>: train on a prefix, test on the next block, roll forward, and average; every test point is strictly in the future of its training data."
            },
            {
              "prompt": "A report says \"our model's RMSE is 120.\" Why is that, alone, not enough to judge it?",
              "hint": "Compared to what?",
              "solution": "RMSE is scale-dependent and meaningless without a reference: 120 could be excellent or terrible depending on the series' magnitude and difficulty. You must compare it to a <b>baseline</b> (naive/seasonal-naive/mean) — via a skill score or MASE. A model only earns its place by beating the simple benchmark."
            }
          ],
          "examples": [
            {
              "title": "Choosing a metric",
              "body": "You forecast hospital bed demand, where a single large under-forecast (no beds) is far costlier than many tiny errors. Which error metric should you optimize?",
              "solution": "<b>RMSE</b> (or an asymmetric cost if under- and over-forecasting differ). Because RMSE squares errors, it heavily penalizes the occasional large miss you most want to avoid, pushing the model to keep big errors rare. MAE would treat one huge under-forecast the same as several small ones, which doesn't match the real cost."
            },
            {
              "title": "Comparing across products",
              "body": "You must rank a forecasting method across 500 products whose sales differ by orders of magnitude. What metric, and why not MAPE?",
              "solution": "Use <b>MASE</b>: it scales each series' error by that series' naive-forecast error, so it's unit-free and comparable across magnitudes, and it's robust to the near-zero and negative values MAPE chokes on. MAPE would be dominated by low-volume products (tiny denominators blow up the percentage) and is undefined when sales hit zero — common in retail."
            },
            {
              "title": "Reading interval coverage",
              "body": "Your 90% prediction intervals actually contain the truth only 70% of the time on the backtest. What's wrong and what would you do?",
              "solution": "The intervals are <b>over-confident / under-calibrated</b> — too narrow (only 70% coverage vs the nominal 90%). The model is underestimating its uncertainty. Widen the intervals (e.g. recalibrate using the empirical error distribution, or fix the variance/noise model) until backtested coverage matches the nominal level, then check sharpness. Coverage first, then make them as tight as calibration allows."
            }
          ]
        }
      ]
    },
    {
      "id": "ts-modern",
      "title": "Modern & Deep Forecasting",
      "lessons": [
        {
          "id": "ts-deep-forecasting",
          "title": "Deep Learning for Forecasting",
          "minutes": 17,
          "content": "<h3>1. The hook: where classical methods run out</h3>\n<p>ARIMA and exponential smoothing are superb on a single, regular series. But modern problems break their assumptions: you have <em>thousands</em> of related series (every product in every store), rich <b>covariates</b> (price, promotions, weather), and <b>nonlinear</b> dynamics a linear model can't capture. Fitting one ARIMA per series ignores everything they share. This is where deep learning takes over.</p>\n<h3>2. Global models: learn across series</h3>\n<p>The key shift is the <b>global model</b>: a single network trained on <em>all</em> the series at once, instead of one local model per series. It learns patterns common across them (a weekly rhythm, a holiday bump) and shares statistical strength — so it forecasts a brand-new or short series far better than a model that only saw that series. Cross-learning is the deep forecaster's superpower.</p>\n<h3>3. Forecasting as supervised learning</h3>\n<p>To use any ML model, reframe the series as a supervised problem: slide a window and turn \"past → next\" into <b>(features, target)</b> rows. The features are <b>lags</b> (recent values) plus calendar features (day-of-week, month) and covariates; the target is the next value (or the next $h$ values). Get the framing right — no future leakage — and the whole ML toolbox applies.</p>\n<h3>4. Building lag features</h3>\n<p>The simplest framing uses the previous values as features. Turn a series into supervised rows of [lag-2, lag-1, target]:</p>\n<div data-code=\"javascript\" data-expected=\"[[10,12,14],[12,14,13],[14,13,16]]\">// Reframe a series as supervised (features -> target) rows using a window of 2 lags\nconst y = [10, 12, 14, 13, 16];\nconst rows = [];\nfor (let t = 2; t < y.length; t++) rows.push([y[t - 2], y[t - 1], y[t]]);  // [lag2, lag1, target]\nconsole.log(JSON.stringify(rows));\n// Each row: predict the last number from the two before it -- now any regressor can learn it.</div>\n<h3>5. Sequence architectures</h3>\n<p>Once it's a sequence-learning problem, the architectures from Deep Learning apply directly. <b>RNN/LSTM/GRU</b>: process the series step by step with a hidden state (the original deep forecasters, e.g. DeepAR). <b>Temporal CNNs</b> (dilated/causal convolutions, TCN/WaveNet): a wide receptive field, fast and parallel. <b>Transformers</b>: attention over the history (Informer, Temporal Fusion Transformer). <b>State-space models</b> (S4/Mamba): linear-time long-range memory — a natural fit for long series.</p>\n<h3>6. Probabilistic forecasting</h3>\n<p>Decisions need uncertainty, so deep forecasters usually output a <em>distribution</em>, not a point: predict the parameters of a distribution, or a set of <b>quantiles</b> trained with the pinball loss (from the evaluation lesson). A calibrated 10th–90th-percentile band is far more useful for planning than a single line — it tells you the risk, not just the guess.</p>\n<h3>7. Foundation models for time series</h3>\n<p>The newest shift mirrors LLMs: <b>foundation models</b> pretrained on enormous, diverse collections of series (TimeGPT, Chronos, Moirai, TimesFM) that <b>zero-shot forecast</b> a series they've never seen — no fitting required, just feed the history. Chronos even <em>tokenizes</em> values and reuses a language-model architecture. It is early days, but the \"pretrain once, forecast anything\" paradigm has arrived for time series.</p>\n<h3>8. Deep vs classical: the honest trade-off</h3>\n<p>Deep models win when you have <em>many</em> series, rich covariates, nonlinearity, and enough data; they cost compute, tuning, and interpretability. Classical models (ARIMA, ETS) win on a single regular series, small data, and when you need transparent coefficients and instant intervals — and they remain shockingly hard to beat there. The professional move is to <b>always benchmark the deep model against a strong classical baseline</b>; surprisingly often, the simple one wins.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: global vs local models — why pooling series helps</summary>\n<p>A <b>local</b> model fits each series independently (one ARIMA per product); a <b>global</b> model fits one set of parameters across all series. Global wins for the same reason multi-task learning does: short or noisy series <em>borrow strength</em> from the crowd, the model learns shared structure (seasonality, holiday effects) once instead of re-estimating it thousands of times, and a brand-new series with little history can be forecast immediately from learned patterns. The risk is that genuinely heterogeneous series get averaged into a bland compromise — mitigated by giving the model <b>series-identifying covariates</b> (an embedding per series, static features) so it can specialize. Modern libraries (e.g. global gradient-boosted trees on lag features, or DeepAR) are global by default for exactly this reason.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: are transformers actually best for forecasting?</summary>\n<p>Not automatically. A well-known result (\"Are Transformers Effective for Time Series Forecasting?\") showed that a one-layer <b>linear</b> model (DLinear) — decompose into trend + seasonal, then a linear map — <em>beat</em> several elaborate transformer forecasters on standard long-horizon benchmarks. The lessons: attention's permutation-invariance fights against the strict ordering that <em>is</em> the signal in a time series (hence heavy positional engineering), and many \"transformer wins\" came from the surrounding pipeline (normalization, decomposition, patching) more than the attention itself. Patch-based designs (PatchTST) and the foundation models later restored transformers' strength — but the episode is a permanent reminder to benchmark against simple linear and classical baselines before believing a complex model.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: foundation models and zero-shot forecasting</summary>\n<p>Borrowing the LLM playbook, time-series <b>foundation models</b> are pretrained once on millions of series spanning many domains, then forecast an unseen series <b>zero-shot</b> — you supply only its history, no per-series fitting. <b>Chronos</b> quantizes real values into a fixed vocabulary of tokens and trains a standard language-model architecture to predict the next token, literally treating forecasting as language modeling; <b>TimesFM</b>, <b>Moirai</b>, and <b>TimeGPT</b> take related routes. The appeal is obvious — instant forecasts with no training, strong on cold-start series — and the open question is the same as for LLMs: how far does scale generalize, and when does a small model fit to <em>your</em> data still win? Often, a tuned local model on rich in-domain data still edges out the zero-shot giant — for now.</p>\n</details>",
          "mcq": [
            {
              "q": "Deep forecasters tend to beat ARIMA/ETS when you have:",
              "choices": [
                "Many related series, rich covariates, and nonlinear dynamics",
                "A single short, regular series",
                "No data at all",
                "Only a linear trend"
              ],
              "answer": 0,
              "explain": "Scale + covariates + nonlinearity favour deep."
            },
            {
              "q": "A \"global\" forecasting model:",
              "choices": [
                "Fits one separate model per series",
                "Is trained on all the series at once, sharing learned structure",
                "Only works on a single series",
                "Ignores the data"
              ],
              "answer": 1,
              "explain": "Global = cross-learning across series."
            },
            {
              "q": "To apply an ML/DL regressor to a series, you first:",
              "choices": [
                "Remove the time index",
                "Shuffle all the points",
                "Reframe it as supervised (features, target) rows using lags",
                "Average everything"
              ],
              "answer": 2,
              "explain": "Lag-window framing turns it supervised."
            },
            {
              "q": "Which architecture gives linear-time long-range memory, a natural fit for long series?",
              "choices": [
                "A decision stump",
                "A plain feedforward MLP",
                "k-nearest neighbors",
                "State-space models (S4 / Mamba)"
              ],
              "answer": 3,
              "explain": "SSMs scale linearly with sequence length."
            },
            {
              "q": "Probabilistic forecasting means the model outputs:",
              "choices": [
                "A distribution or quantiles, not just a single point",
                "Only the maximum value",
                "The training error",
                "A class label"
              ],
              "answer": 0,
              "explain": "Predict uncertainty (quantiles via pinball loss)."
            },
            {
              "q": "A time-series \"foundation model\" (e.g. Chronos, TimeGPT):",
              "choices": [
                "Must be retrained from scratch per series",
                "Is pretrained on many series and can zero-shot forecast unseen ones",
                "Only does classification",
                "Requires no data ever"
              ],
              "answer": 1,
              "explain": "Pretrain once, zero-shot forecast."
            },
            {
              "q": "The \"Are Transformers Effective…?\" result showed that for many benchmarks:",
              "choices": [
                "Linear models cannot forecast at all",
                "Transformers always win by a wide margin",
                "A simple linear model (DLinear) could beat elaborate transformer forecasters",
                "Seasonality is irrelevant"
              ],
              "answer": 2,
              "explain": "Strong linear/classical baselines matter."
            },
            {
              "q": "Before deploying a deep forecaster, you should always:",
              "choices": [
                "Use random k-fold",
                "Trust it because it is complex",
                "Skip evaluation",
                "Benchmark it against a strong classical baseline (naive/ETS/ARIMA)"
              ],
              "answer": 3,
              "explain": "The simple baseline often wins; always compare."
            },
            {
              "q": "DeepAR, a classic deep forecaster, is built on:",
              "choices": [
                "An RNN/LSTM that outputs a probabilistic forecast, trained globally",
                "A decision tree per series",
                "Plain linear regression on time",
                "A convolutional image classifier"
              ],
              "answer": 0,
              "explain": "DeepAR = global autoregressive RNN with a probability output."
            },
            {
              "q": "A Temporal Convolutional Network (TCN) processes a series using:",
              "choices": [
                "Random shuffling of the points",
                "Dilated causal convolutions for a wide receptive field",
                "A single dense layer",
                "Seasonal differencing only"
              ],
              "answer": 1,
              "explain": "TCN/WaveNet use dilated causal convs."
            },
            {
              "q": "In forecasting, a \"covariate\" is:",
              "choices": [
                "The series' own mean",
                "The forecast error",
                "External information such as price, weather, or holidays",
                "A random seed"
              ],
              "answer": 2,
              "explain": "Covariates = auxiliary predictors."
            },
            {
              "q": "Quantile (probabilistic) forecasts are typically trained with:",
              "choices": [
                "No loss at all",
                "Mean squared error only",
                "Cross-entropy on classes",
                "The pinball (quantile) loss"
              ],
              "answer": 3,
              "explain": "Pinball loss scores each quantile."
            },
            {
              "q": "The Chronos foundation model forecasts by:",
              "choices": [
                "Tokenizing the values and reusing a language-model architecture",
                "Fitting a separate ARIMA per series",
                "Differencing until stationary",
                "Averaging the last three points"
              ],
              "answer": 0,
              "explain": "Chronos = values-as-tokens + LM."
            },
            {
              "q": "When engineering lag features for a forecaster, you must never:",
              "choices": [
                "Use the previous value",
                "Use values from the future of the point being predicted",
                "Add a day-of-week feature",
                "Normalize the inputs"
              ],
              "answer": 1,
              "explain": "Future-using features leak."
            },
            {
              "q": "A brand-new product with only a few data points is best forecast by:",
              "choices": [
                "The naive forecast only",
                "Its own local ARIMA",
                "A global or pretrained model that borrows structure from other series",
                "Ignoring it"
              ],
              "answer": 2,
              "explain": "Cold-start needs cross-learning/pretraining."
            },
            {
              "q": "PatchTST and similar patch-based transformers improve forecasting by:",
              "choices": [
                "Forecasting only the mean",
                "Removing attention entirely",
                "Using one value per token always",
                "Splitting the series into patches treated as tokens"
              ],
              "answer": 3,
              "explain": "Patching = sub-series segments as tokens."
            }
          ],
          "flashcards": [
            {
              "front": "When do deep forecasters beat classical methods (ARIMA/ETS)?",
              "back": "When you have <em>many</em> related series, rich covariates (price/weather), nonlinear dynamics, and enough data. Classical still wins on a single regular series with small data."
            },
            {
              "front": "Global vs local forecasting model",
              "back": "<b>Local</b>: one model per series (e.g. an ARIMA each). <b>Global</b>: one model trained across all series, sharing structure (cross-learning) — far better for short/new series."
            },
            {
              "front": "Forecasting as supervised learning",
              "back": "Slide a window to make (features, target) rows: features are <b>lags</b> + calendar/covariates, target is the next value(s). No future leakage → the whole ML toolbox applies."
            },
            {
              "front": "Sequence architectures for forecasting",
              "back": "RNN/LSTM/GRU (step-by-step, DeepAR), temporal CNN/TCN (dilated causal convs), transformers (Informer/TFT, PatchTST), and state-space models (S4/Mamba) for long-range memory."
            },
            {
              "front": "Probabilistic forecasting",
              "back": "Output a <em>distribution</em>, not a point — predict distribution parameters or quantiles (trained with the pinball loss). A calibrated band gives risk, not just a guess."
            },
            {
              "front": "Time-series foundation models",
              "back": "Models pretrained on huge, diverse series collections (TimeGPT, Chronos, TimesFM, Moirai) that <b>zero-shot forecast</b> unseen series with no fitting. Chronos tokenizes values and reuses an LM architecture."
            }
          ],
          "homework": [
            {
              "prompt": "Turn the series [5, 7, 6, 9] into supervised (features, target) rows using a window of 2 lags.",
              "hint": "Each row: [value two ago, value one ago, current].",
              "solution": "Rows: from index 2 → [5, 7, 6] (predict 6 from 5,7), index 3 → [7, 6, 9] (predict 9 from 7,6). So [[5,7,6],[7,6,9]] — two rows of [lag2, lag1, target]. A window of 2 over 4 points yields 2 rows."
            },
            {
              "prompt": "You must forecast daily sales for 20,000 products, each with a short history but shared seasonal patterns and price/promo covariates. Local ARIMA or a global deep model — and why?",
              "hint": "What do short series and shared structure favour?",
              "solution": "A <b>global deep model</b>. Fitting 20,000 separate ARIMAs wastes the shared structure and fails on the short histories (too little data each); ARIMA also can't naturally use the price/promo covariates. A single global network learns the common seasonality once, borrows strength across products, and ingests covariates — exactly the regime where deep forecasting shines."
            },
            {
              "prompt": "A teammate proposes a fancy transformer for a single, clean monthly series. What's your advice?",
              "hint": "Recall the linear-baseline result.",
              "solution": "Push back and benchmark first. On a single regular series, a strong classical baseline (ARIMA/ETS) — or even a simple linear model like DLinear — often matches or beats an elaborate transformer, with far less compute and full interpretability. Only adopt the transformer if it demonstrably beats those baselines on a proper rolling-origin backtest."
            }
          ],
          "examples": [
            {
              "title": "Designing a demand forecaster",
              "body": "A retailer wants probabilistic weekly demand forecasts for thousands of SKUs with promotions and holidays. Sketch the approach.",
              "solution": "Use a <b>global</b> model trained across all SKUs. Frame as supervised learning with lag features + calendar features (week-of-year, holidays) + promo covariates, and a per-SKU embedding so the model can specialize. Train it to output <b>quantiles</b> (pinball loss) for probabilistic forecasts. Architecture: a global gradient-boosted tree on engineered features is a strong, cheap start; escalate to DeepAR/TFT if it pays off. Always backtest against seasonal-naive and ETS baselines."
            },
            {
              "title": "Cold-start forecasting",
              "body": "You launch a new product with only three weeks of sales. How can you forecast it at all?",
              "solution": "A local model can't — three points isn't enough. A <b>global</b> model already trained on similar products can forecast it immediately by applying learned patterns (category seasonality, launch curves), conditioned on the new product's static features (category, price tier). A time-series <b>foundation model</b> could even zero-shot it. This cold-start ability is a core reason to go global/pretrained."
            },
            {
              "title": "Interpreting a benchmark",
              "body": "Your transformer gets RMSE 95 on a single series; seasonal-naive gets 92. What do you conclude?",
              "solution": "The transformer is <em>worse</em> than seasonal-naive (higher RMSE), so it has negative skill — it's not learning anything useful here and shouldn't be deployed. Either the series is too simple/short for a deep model, the pipeline is mis-specified, or a classical method is the right tool. The baseline did its job: it caught a model that looked sophisticated but underperformed."
            }
          ]
        }
      ]
    }
  ]
}
);
