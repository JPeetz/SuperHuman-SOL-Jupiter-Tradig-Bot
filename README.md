# 🔱 SUPERHUMAN SOLANA TRADING SWARM

Autonomous, self-learning, self-evolving quantitative trading system for Solana mainnet.  
**All trades: USDC → token. $300 starting capital. Zero manual intervention required.**

---

## What this is

A fully automated trading bot that learns from every trade, evolves new strategies nightly, and permanently improves its own win rate — targeting 80%+ and rising. Built across 4 phases:

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 1 — MVP | ✅ Complete | 3 base strategies, regime detection, paper trading, dashboard |
| Phase 2 — Backtesting | ✅ Complete | Walk-forward validation, Monte Carlo, promotion pipeline, Binance oracle, slippage model |
| Phase 3 — Evolution | ✅ Complete | Genetic algorithm, Bayesian optimizer, LLM proposals, meta-learning, continuous backtesting |
| Phase 4 — Production | ✅ Complete | Short side, on-chain flow, Kelly sizing, gas model, CoinGecko oracle, alerts, daily journal |

---

## Quick Start

```bash
# 1. Copy and configure env
cp .env.example .env

# Minimum config — works out of the box in paper mode:
# GLOBAL_TRADE_MODE=paper
# PAPER_INITIAL_CAPITAL=300.0
# Everything else uses public endpoints (no keys required to start)

# 2. Launch
docker-compose up -d

# 3. Dashboard
open http://localhost:8501

# 4. API
curl http://localhost:8502/status
```

**Zero API keys required for paper trading.** Add keys progressively as you scale.

---

## Architecture

```
solana-swarm/
├── config/
│   ├── system.yaml               # Core config overrides
│   ├── allowed_tokens.yaml       # Token universe (tier 1-3)
│   └── denied_tokens.yaml        # Blacklist + auto-deny rules
├── src/
│   ├── config.py                 # All settings (pydantic-settings + .env)
│   ├── main.py                   # Entry point
│   ├── api.py                    # FastAPI REST backend
│   │
│   ├── agents/
│   │   ├── supervisor.py         # Master orchestrator — wires all systems
│   │   ├── market_data.py        # OHLCV ingest + caching (Jupiter/Birdeye)
│   │   ├── feature_engineering.py# Technical indicators (40+ available)
│   │   ├── regime_detector.py    # Bull/Bear/Sideways/HiVol/LoVol/Shift
│   │   ├── risk_manager.py       # Hard gates + circuit breakers
│   │   ├── execution_engine.py   # Paper + Live via Jupiter V6
│   │   ├── universe_scanner.py   # Nightly liquidity scan
│   │   ├── onchain_flow.py       # Whale tracking, LP depth, smart money
│   │   └── short_side.py         # Inverse tokens + Drift perps (bear regime)
│   │
│   ├── strategies/
│   │   └── registry.py           # Base strategies + evolved genome strategies
│   │
│   ├── backtesting/
│   │   ├── engine.py             # Walk-forward + Monte Carlo + promotion thresholds
│   │   └── promotion.py          # Research→Paper→Live pipeline + decay detection
│   │
│   ├── evolution/
│   │   ├── indicators.py         # 40+ registered indicators with param ranges
│   │   ├── genetic.py            # Genetic algorithm (population 50, GA + elite)
│   │   ├── optimizer.py          # Bayesian hyperparameter optimizer (Optuna TPE)
│   │   ├── alphahunt.py          # LLM strategy proposals (Gemini Flash)
│   │   └── orchestrator.py       # 4 concurrent evolution loops
│   │
│   ├── meta/
│   │   └── knowledge.py          # Persistent regime×strategy performance matrix
│   │
│   ├── reporting/
│   │   └── journal.py            # Daily HTML audit report (23:55 UTC)
│   │
│   ├── dashboard/
│   │   └── app.py                # Streamlit UI
│   │
│   └── utils/
│       ├── jupiter.py            # Jupiter V6 quote + swap client
│       ├── binance_oracle.py     # Public Binance price validation (no key)
│       ├── coingecko.py          # CoinGecko fallback oracle for tier 3 tokens
│       ├── slippage_logger.py    # 15-min Jupiter slippage snapshots
│       ├── gas_model.py          # Priority fee estimation + Jito bundles
│       ├── kelly.py              # Kelly Criterion position sizer (25% fractional)
│       ├── openrouter.py         # LLM gateway (Gemini Flash default)
│       └── alerts.py             # Telegram + Discord milestone notifications
│
├── data/
│   ├── parquet/                  # Cached OHLCV + slippage snapshots
│   ├── journals/                 # Daily HTML reports (YYYY-MM-DD.html)
│   └── meta_knowledge.json       # Bot's persistent learned knowledge
├── docker/
│   └── init.sql                  # Full DB schema (all phases)
├── .env.example                  # Complete config template
├── docker-compose.yml
├── Dockerfile
└── requirements.txt
```

---

## Trading Modes

| Mode | Description |
|------|-------------|
| `research` | Data + signals logged only. No trades. |
| `paper` | Full simulation with realistic slippage + gas costs. No real funds. |
| `live` | Real Jupiter swaps. Requires wallet + paid RPC. |

```env
GLOBAL_TRADE_MODE=paper
```

---

## How the bot learns and evolves

### Every 60 seconds (bar loop)
1. Fetch OHLCV for active tokens
2. Detect market regime (Bull/Bear/Sideways/HiVol/LoVol/Shift)
3. Read on-chain flow signals (whale buys/sells, LP depth changes)
4. Score strategies by meta-learned win rate for this regime
5. Kelly-size positions based on live win rate + R:R + flow confidence
6. Validate price via Binance → CoinGecko fallback → proceed-with-caution
7. Execute trade (paper or live via Jupiter)
8. Record result → meta-knowledge updated instantly

### Every hour
- Decay detection: live strategies checked for performance degradation
- Auto-demotion: 20% decay over baseline → strategy moved back to paper
- Short position review: close shorts if regime has shifted out of bear

### Nightly (01:00 UTC)
- 5 GA generations on fresh SOL data
- 5 LLM proposals injected (Gemini Flash generates novel indicator combinations)
- Top survivors added to challenger pool

### Nightly (23:55 UTC)
- Full HTML journal generated: all trades, genomes tested, meta-knowledge state, Kelly table, flow signals, gas costs

### Midnight (00:00 UTC)
- Promotion pipeline runs: Research→Paper→Live with walk-forward + Monte Carlo validation
- Universe refresh: new tokens scanned for liquidity
- LLM daily summary generated

### Weekly (Monday 02:00 UTC)
- 20-generation full GA evolution
- Optuna Bayesian optimization on top 5 survivors (100 trials each)
- Meta-knowledge weekly digest
- Weekly Telegram/Discord report

### Continuous (hourly challenger loop)
- Best genome from pool is backtested across multiple tokens
- Walk-forward with 3 windows to qualify
- Pass → registered as new paper strategy
- Fail → recorded as failure pattern for LLM to avoid
- Win rate target starts at 80% and automatically rises as bot exceeds it

---

## Strategy Evolution System

### Indicator Library (40+)
Trend: EMA, SMA, WMA, DEMA, TEMA, Hull MA, KAMA  
Momentum: RSI, StochRSI, MACD, CCI, Williams %R, MFI, ROC, TRIX  
Volatility: ATR, Bollinger Bands, Keltner Channel, Donchian, Historical Vol  
Volume: OBV slope, VWAP deviation, Volume ratio, Chaikin MF  
Trend strength: ADX, Aroon Oscillator, Parabolic SAR  
Pattern: Close rank, Gap up/down, Candle body, Upper/lower wick

### Genome Structure
Each evolved strategy is a genome specifying:
- Entry indicators (1-4) with thresholds and cross-direction conditions
- Filter indicators (0-2) that must all pass before entry
- Exit indicators (0-2) that trigger early exit
- Stop loss %, take profit %, regime affinity, timeframe, AND/OR combinator

### Genetic Algorithm
- Population: 50 genomes
- Selection: tournament (size 5)
- Crossover: single-point on indicator lists
- Mutation: parameter perturbation + indicator swap + SL/TP drift
- Elitism: top 5 preserved unchanged each generation
- Hall of Fame: top 20 genomes of all time, never discarded

### Promotion Thresholds
```
Research → Paper:   Sharpe ≥ 1.5, Sortino ≥ 2.0, DD ≤ 15%, MAR ≥ 0.5,
                    Profit factor ≥ 1.5, ≥ 100 trades, Win rate ≥ 40%,
                    70% of 1000 Monte Carlo runs pass, 5 walk-forward windows
Paper → Live:       ≥ 30 paper trades, ≥ 14 days, OOS Sharpe validates
Live → Paper:       Decay > 20% vs backtest baseline (3 consecutive hourly warnings)
```

---

## Short Side (Bear Regime)

In Bear Trend and High-Vol Expansion regimes, the bot opens bearish positions:
- **Method**: Inverse tokens via Jupiter (USDC → inverse SOL token)
- **Safety**: No liquidation risk, no leverage (1x inverse)
- **Auto-close**: Position closed when regime shifts back to Bull/Sideways
- **Drift Protocol perps**: Scaffolded, disabled by default (`DRIFT_PERPS_ENABLED=false`)

Enable Drift after paper validation:
```env
DRIFT_PERPS_ENABLED=true
```

---

## Capital Allocation (Kelly Criterion)

Each trade is sized dynamically, not flat:

```
f* = (b × p - q) / b      # Full Kelly
actual = f* × 0.25         # 25% fractional (conservative)
size = actual × confidence × flow_signal × equity

Hard limits: min 0.5% ($1.50 at $300), max 3% ($9 at $300)
Total open: max 20% of equity at any time
Negative Kelly (no statistical edge): trade blocked entirely
```

After 5 trades per strategy, live win rate replaces the prior estimate.

---

## Price Validation (3 oracles)

Every trade validated before execution:

1. **Binance oracle** (public REST, no key): tier 1+2 tokens, 2% deviation tolerance
2. **CoinGecko** (public REST, no key): tier 3 fallback, 3% tolerance
3. **Proceed-with-caution**: if both unavailable, log warning and proceed (not block)

---

## On-Chain Flow

Real-time Solana on-chain signals (alpha before it appears in OHLCV):

| Signal | Trigger | Effect |
|--------|---------|--------|
| Whale accumulation | Large wallet buying > $10k | Flow confidence boost (up to 1.5×) |
| Whale distribution | Large wallet selling > $10k | Flow confidence suppress (down to 0.6×) |
| LP depth removal | >15% DEX liquidity removed suddenly | Hard reduce to 0.5× (manipulation signal) |
| Smart wallet buy | Known profitable address accumulating | Additional 0.3× confidence per wallet |

**With Helius key**: full Enhanced Transaction API (SWAP event stream)  
**Without Helius key**: Jupiter LP depth monitoring + public RPC (still useful)

---

## Gas Model

Full transaction cost accounting:

- Priority fee estimated from `getRecentPrioritizationFees` (public RPC, no key)
- Failed transactions cost base + priority fee — tracked and deducted from P&L
- Paper mode simulates gas (~$0.02/trade) so paper P&L is net-realistic
- **Jito bundles**: MEV protection for live mode (configure `JITO_BUNDLE_URL`)
- Congestion levels: low / medium / high / extreme — auto-adapts tip

---

## Risk Management

```
Per-trade:    Kelly-sized, max 3% hard cap
Daily loss:   5% limit → pause trading
Weekly loss:  10% limit → pause trading
Total DD:     20% limit → full stop, alert sent
Slippage:     100bps max (wider for $300 account on tier 3)
Price impact: 150bps max
Liquidity:    $50k minimum (lower for small account)
RPC errors:   3 consecutive → circuit breaker
```

---

## Alerting (Telegram + Discord)

Automatic notifications for:
- 🎯 Win rate milestones: 80%, 85%, 90%, 95%
- 📈 New all-time high equity
- 🚀 Genome promoted to live trading
- ⬇️ Strategy decay/demotion
- ⚡ Market shift detected (Binance price/funding flip)
- 🛡️ Risk limit triggered
- 📊 Daily summary at midnight UTC
- 📅 Weekly report every Monday

Setup Telegram:
```
TELEGRAM_BOT_TOKEN=your_token    # create via @BotFather
TELEGRAM_CHAT_ID=your_chat_id    # message your bot, check /getUpdates
```

---

## Daily HTML Journal

Generated every night at 23:55 UTC → `/app/data/journals/YYYY-MM-DD.html`

Contains:
- Executive summary cards (equity, P&L gross/net, win rate, fee costs)
- SOL market context (Binance oracle: price, 24h change, funding rate)
- Every trade with pair, direction, strategy, P&L, regime, slippage
- Every genome tested: indicators, Sharpe, win rate, fitness, pass/fail
- Promotion events with rationale
- **Meta-knowledge table**: what the bot currently believes about each strategy × regime
- Kelly allocation table: recommended size per strategy based on live win rate
- On-chain flow signals
- Gas cost breakdown (total paid, failed tx costs, avg per trade)
- Evolution stats (generation, hall of fame size, challenger pool, win rate target)

This is the trust layer. Everything the bot did, explained.

---

## API Endpoints

```
GET  /status          Full system status
GET  /trades          Last 100 trades
GET  /positions       Open long + short positions
GET  /regime          Current regime + probabilities
GET  /evolution       Evolution engine status
GET  /meta            Meta-knowledge summary
GET  /journal/latest  Path to latest HTML journal
GET  /kelly           Current Kelly allocations
GET  /gas             Gas model stats
POST /pause           Pause trading
POST /resume          Resume trading
```

---

## Going Live Checklist

⚠️ **Never go live without completing this checklist.**

1. Run paper for ≥ 14 days and ≥ 30 trades
2. Check journal: rolling win rate ≥ 60% (ideally 70%+)
3. Check journal: max drawdown < 15%
4. Check journal: net P&L positive (after fees)
5. At least 1 strategy promoted to live by promotion pipeline
6. Win rate target milestone 80% alert received on Telegram
7. Configure paid RPC (QuickNode / Helius / Triton — $25-50/month)
8. Fund wallet with exact intended capital (start small)
9. Set `GLOBAL_TRADE_MODE=live` and `WALLET_PRIVATE_KEY`
10. Monitor for first 24h manually

---

## Environment Variables (complete)

| Variable | Default | Required | Description |
|----------|---------|----------|-------------|
| `GLOBAL_TRADE_MODE` | `paper` | yes | `research` / `paper` / `live` |
| `PAPER_INITIAL_CAPITAL` | `300.0` | yes | Match your real capital exactly |
| `SOLANA_RPC_URL` | public | no | Paid RPC for live mode |
| `HELIUS_API_KEY` | — | no | On-chain flow (free tier sufficient) |
| `BIRDEYE_API_KEY` | — | no | Historical OHLCV data |
| `OPENROUTER_API_KEY` | — | no | LLM evolution (~$2-5/month) |
| `OPENROUTER_MODEL` | `google/gemini-2.0-flash-001` | no | Primary LLM model |
| `WALLET_PRIVATE_KEY` | — | live only | Base58 private key |
| `TELEGRAM_BOT_TOKEN` | — | no | Milestone alerts |
| `TELEGRAM_CHAT_ID` | — | no | Your Telegram chat ID |
| `DISCORD_WEBHOOK_URL` | — | no | Discord alerts |
| `JITO_BUNDLE_URL` | — | no | MEV protection (live only) |
| `MAX_POSITION_PCT` | `0.03` | no | Hard cap per trade (3%) |
| `MAX_DAILY_LOSS_PCT` | `0.05` | no | 5% daily stop |
| `KELLY_FRACTION` | `0.25` | no | Fractional Kelly multiplier |
| `SHORT_SIDE_ENABLED` | `true` | no | Inverse tokens in bear regime |
| `DRIFT_PERPS_ENABLED` | `false` | no | Enable after paper validation |
| `ONCHAIN_FLOW_ENABLED` | `true` | no | On-chain whale tracking |
| `WIN_RATE_TARGET` | `0.80` | no | Initial target (rises automatically) |

Full template: `.env.example`

---

## Data Sources

| Source | Used for | Auth |
|--------|----------|------|
| Jupiter V6 API | Live quotes, routing, swap execution | None |
| Binance REST API | Tier 1+2 price validation, SOL market data | None |
| CoinGecko API | Tier 3 price validation | None |
| Solana public RPC | Priority fees, on-chain fallback | None |
| Helius Enhanced API | Whale transactions, smart wallet tracking | API key (optional) |
| Birdeye API | Historical OHLCV data | API key (optional) |
| OpenRouter API | LLM strategy proposals (Gemini Flash) | API key (optional) |

---

## Roadmap — Completed

- [x] Phase 1: 3 base strategies + regime detector + paper trading + dashboard + FastAPI
- [x] Phase 2: Walk-forward backtesting + Monte Carlo + promotion pipeline + Binance oracle + slippage model
- [x] Phase 3: Genetic algorithm + Bayesian optimizer + LLM alpha generation + meta-learning + continuous evolution
- [x] Phase 4: Short side (inverse tokens + Drift scaffold) + on-chain flow (Helius) + Kelly sizing + gas model + CoinGecko oracle + Telegram/Discord alerts + daily HTML journal

### Potential future additions
- Multi-timeframe strategy ensemble (signal confluence across 15m/1h/4h)
- Portfolio-level hedging (long + short simultaneously across uncorrelated pairs)
- Sentiment oracle (Twitter/X social sentiment via Helius social graph)
- Cross-DEX arbitrage detection (Jupiter vs Orca vs Raydium spread)
- Options strategy layer (PsyFi puts for defined-risk bear plays)
- Wallet P&L attribution (track which wallets in your smart money list are profitable)
