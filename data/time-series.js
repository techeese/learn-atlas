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
          "content": "<h3>1. The hook: methods want a stable world</h3>\n<p>Most classical forecasting tools assume the series isn't a moving target — that the way it behaves <em>this</em> year is the way it behaved last year. That property is <b>stationarity</b>. A trending or seasonal series breaks it, and fitting a model to a non-stationary series gives unstable, often spurious results. So the classical workflow is: transform the series toward stationarity, model the stable remainder, then invert the transforms to forecast.</p>\n<h3>2. What stationarity means</h3>\n<p>A series is (weakly) <b>stationary</b> if its first two moments are constant over time: a constant <b>mean</b> (no trend), a constant <b>variance</b> (no growing swings), and an <b>autocovariance</b> that depends only on the lag $k$, not on <em>when</em> you look. Intuitively: slide a window along the series and the statistics you measure don't change. White noise is the simplest stationary series; a trending sales curve is not.</p>\n<h3>3. Why non-stationarity breaks things</h3>\n<p>If the mean drifts, \"the average\" is meaningless — it depends on the window. Worse, two unrelated trending series can show a high correlation purely because both rise over time: a <b>spurious regression</b>. Estimates of variance and autocorrelation become unstable, confidence intervals are wrong, and a model tuned on one stretch fails on the next. Stationarity is what makes the past a reliable guide to the future.</p>\n<h3>4. Differencing removes a trend</h3>\n<p>The workhorse fix is <b>differencing</b>: replace the series with its step-to-step changes, $\\nabla y_t = y_t - y_{t-1}$. A linear trend becomes a constant; a constant becomes zero. Difference a perfectly linear series and watch the trend vanish:</p>\n<div data-code=\"javascript\" data-expected=\"2, 2, 2, 2, 2\">// First differencing: y[t] - y[t-1] turns a trend into a (stationary) constant\nconst y = [10, 12, 14, 16, 18, 20];   // a perfectly linear upward trend\nconst diff = [];\nfor (let i = 1; i < y.length; i++) diff.push(y[i] - y[i - 1]);\nconsole.log(diff.join(\", \"));\n// The rising trend is gone; the differenced series is flat (constant mean).</div>\n<h3>5. Seasonal differencing</h3>\n<p>A repeating seasonal pattern of period $m$ is removed by <b>seasonal differencing</b>: $y_t - y_{t-m}$ (e.g. subtract last year's same month, $m=12$). This cancels the seasonal term the way ordinary differencing cancels a trend. Many real series need both — one ordinary difference for the trend and one seasonal difference for the season.</p>\n<h3>6. Stabilizing the variance</h3>\n<p>Differencing fixes a drifting <em>mean</em>, but not a drifting <em>variance</em> (swings that grow with the level). For that, transform before differencing: a <b>log</b> (or the more general Box–Cox) shrinks large values more than small ones, turning multiplicative, fanning-out behaviour into something roughly additive with constant spread. Log first, then difference.</p>\n<h3>7. Testing for stationarity</h3>\n<p>Eyeballing a plot of the rolling mean and rolling variance is the first check — flat lines suggest stationarity. The formal tool is the <b>Augmented Dickey–Fuller (ADF) test</b>, which tests for a <b>unit root</b> (the signature of a random-walk-like non-stationary series); rejecting its null is evidence the series is stationary. The point isn't the test statistic — it's deciding how many differences the series needs.</p>\n<h3>8. Putting it together: the \"d\" in ARIMA</h3>\n<p>This is exactly the integrated part of <b>ARIMA(p, d, q)</b>: $d$ is the number of differences applied to make the series stationary before an ARMA model is fit, and the forecast is then \"un-differenced\" (cumulatively summed) back to the original scale. Get $d$ right — usually 0, 1, or 2 — and the rest of the modelling stands on solid ground. We build ARIMA itself in a later lesson.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: strict vs weak (covariance) stationarity</summary>\n<p><b>Strict</b> stationarity demands that the <em>entire</em> joint distribution of any block of points is unchanged when you shift it in time — a very strong condition. In practice we almost always use <b>weak</b> (or covariance) stationarity, which only constrains the first two moments: constant mean, constant (finite) variance, and an autocovariance $\\gamma(k)$ that depends solely on the lag $k$. For a Gaussian process the two notions coincide (a Gaussian is fully described by its mean and covariance), which is one reason weak stationarity is the working definition: it is exactly what the classical linear methods (AR, MA, ARMA) actually require.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: unit roots and the random walk</summary>\n<p>The canonical non-stationary series is the <b>random walk</b> $y_t = y_{t-1} + \\varepsilon_t$. Its variance grows without bound ($\\text{Var}(y_t) = t\\,\\sigma^2$), so it has no fixed level — it wanders. In the model $y_t = \\phi\\,y_{t-1} + \\varepsilon_t$, stationarity requires $|\\phi| < 1$; the random walk sits exactly at $\\phi = 1$, the <b>unit root</b>, on the boundary. The beautiful part: one difference of a random walk, $y_t - y_{t-1} = \\varepsilon_t$, is pure white noise — perfectly stationary. That is why \"difference once\" so often works: it removes a single unit root.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: don't over-difference</summary>\n<p>Differencing is not free — each difference throws away a data point and injects new autocorrelation. <b>Over-differencing</b> (differencing an already-stationary series) is a real mistake: it inflates the variance and creates artificial negative autocorrelation at lag 1 (an unnecessary MA term), making the model harder to fit and the forecasts noisier. The discipline is to use the <em>smallest</em> $d$ that achieves stationarity — check after each difference (plot, ADF) and stop as soon as the trend is gone. Usually $d \\le 2$; needing more is a sign something else (like a missed log transform) is wrong.</p>\n</details>",
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
          "content": "<h3>1. The hook: the simplest forecasts</h3>\n<p>Before any fancy model, three baselines anchor every forecasting problem. The <b>naive</b> forecast: tomorrow equals today ($\\hat{y}_{t+1} = y_t$). The <b>mean</b> forecast: predict the historical average. The <b>drift</b> forecast: extend the line from first to last point. They sound trivial, but a model that can't beat them isn't worth shipping — they are the bar.</p>\n<h3>2. Moving average as a forecast</h3>\n<p>One step up: forecast with the <b>moving average</b> of the last $k$ points. It smooths noise, but it has two flaws — it weights all $k$ points <em>equally</em> (a value from $k$ steps ago counts as much as yesterday), and it <em>lags</em> behind a trend. We want recent observations to count more.</p>\n<h3>3. Simple exponential smoothing (SES)</h3>\n<p><b>Simple exponential smoothing</b> does exactly that. The next forecast is a blend of the latest observation and the previous forecast: $\\hat{y}_{t+1} = \\alpha\\,y_t + (1-\\alpha)\\,\\hat{y}_t$, where $0 < \\alpha < 1$. Unrolling it shows every past point contributes with a weight that <em>decays geometrically</em> into the past — hence \"exponential.\" Recent points dominate; old ones fade but never fully vanish.</p>\n<h3>4. Computing SES</h3>\n<p>Initialize with the first value, then sweep forward applying the update. Here with $\\alpha = 0.5$:</p>\n<div data-code=\"javascript\" data-expected=\"10, 11, 12, 12, 13.5\">// Simple exponential smoothing: blend the new point with the running estimate\nconst y = [10, 12, 13, 12, 15];\nconst alpha = 0.5;\nlet s = y[0];                  // start at the first observation\nconst out = [s];\nfor (let t = 1; t < y.length; t++) {\n  s = alpha * y[t] + (1 - alpha) * s;   // weight recent more\n  out.push(+s.toFixed(2));\n}\nconsole.log(out.join(\", \"));\n// The smoothed level tracks the data while filtering the jitter.</div>\n<h3>5. The smoothing parameter α</h3>\n<p>$\\alpha$ is the responsiveness dial. Near <b>1</b>, the forecast chases the latest value (fast to react, but noisy — almost the naive forecast). Near <b>0</b>, it is sluggish and very smooth (almost the long-run mean). In practice $\\alpha$ is <em>fit</em> by choosing the value that minimizes one-step forecast error on the history — a tiny optimization, not a guess.</p>\n<h3>6. Holt's method: adding a trend</h3>\n<p>Plain SES forecasts a flat line — it has no notion of direction, so it lags a trend. <b>Holt's linear method</b> fixes this by smoothing <em>two</em> things: the <b>level</b> and a separate <b>trend</b> (slope), each with its own parameter. The forecast then extrapolates the current level along the current slope, so it keeps up with a rising or falling series.</p>\n<h3>7. Holt–Winters: adding seasonality</h3>\n<p><b>Holt–Winters</b> adds a third smoothed component — the <b>seasonal</b> indices — giving three equations (level, trend, season) and a forecast that carries trend <em>and</em> the repeating pattern forward. It comes in additive and multiplicative flavours, matching the decomposition choice from the first lesson. This is the classic, robust workhorse for seasonal business data.</p>\n<h3>8. When to reach for it</h3>\n<p>Exponential smoothing (the ETS family) is fast, needs little data, is hard to overfit, and produces strong baselines — often competitive with far heavier models on regular business series. Its limits: it captures level/trend/season but not complex dynamics, external drivers, or long-range dependence. Use it as the baseline every richer model (ARIMA, deep forecasters) must beat.</p>\n<details class=\"deep-dive\">\n<summary>Deeper dive: why \"exponential\"? the geometric weights</summary>\n<p>Unroll the recursion $\\hat{y}_{t+1} = \\alpha y_t + (1-\\alpha)\\hat{y}_t$ and it becomes a weighted sum of <em>all</em> past observations: $\\hat{y}_{t+1} = \\alpha y_t + \\alpha(1-\\alpha) y_{t-1} + \\alpha(1-\\alpha)^2 y_{t-2} + \\cdots$ The weight on the point $j$ steps back is $\\alpha(1-\\alpha)^j$ — it shrinks <b>geometrically</b> (exponentially) with age, and the weights sum to 1. So unlike a moving average's hard window with equal weights, SES has an infinitely long but exponentially-fading memory. This is the identical idea behind the exponential moving averages in momentum/Adam optimizers and the running averages in RL — one recursive line, an exponentially-decaying memory.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: choosing α by minimizing error</summary>\n<p>You don't eyeball $\\alpha$. You pick the value that minimizes the sum of squared one-step-ahead forecast errors over the training history, $\\sum_t (y_t - \\hat{y}_t)^2$ — a 1-D optimization solved by grid search or a numerical optimizer. A large fitted $\\alpha$ tells you the series is dominated by recent shocks (little persistent structure); a small $\\alpha$ says the level is stable and old data still informs the present. The same principle scales up: Holt and Holt–Winters fit their two or three smoothing parameters jointly the same way.</p>\n</details>\n<details class=\"deep-dive\">\n<summary>Deeper dive: ETS, state-space, and the link to ARIMA</summary>\n<p>Modern software treats exponential smoothing as the <b>ETS</b> (Error, Trend, Seasonal) family of <em>state-space</em> models: a hidden state (level, trend, seasonal) evolves and emits the observation, which lets you fit by likelihood and get prediction intervals, not just point forecasts. Strikingly, several ETS models are <em>equivalent</em> to particular ARIMA models — e.g. simple exponential smoothing is the optimal forecast for an ARIMA(0,1,1). So ETS and ARIMA are two lenses on overlapping ground: ETS organizes models by components (trend/season), ARIMA by autocorrelation structure (AR/I/MA). Knowing both lets you pick the framing that fits the problem.</p>\n</details>",
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
        }
      ]
    }
  ]
}
);
