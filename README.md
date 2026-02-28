# 🔱 Superhuman Solana Trading Swarm

> *Autonomous. Self-learning. Self-evolving. Built to win.*

---

## What is this?

A fully autonomous quantitative trading system for Solana mainnet — designed from the ground up to operate without human intervention, learn from every trade it makes, and permanently improve its own performance over time.

It is currently running in paper trading mode. **It is performing as intended.**

---

## How it works (high level)

The system operates across four integrated layers:

**Market intelligence** — Six distinct market regimes are detected in real time (Bull Trend, Bear Trend, Sideways, High-Vol Expansion, Low-Vol Compression, Regime Shift). Every decision the system makes is regime-aware. On-chain order flow from Solana is monitored in parallel — whale accumulation, smart money movements and DEX liquidity changes are detected *before* they appear in price data.

**Self-evolving strategy engine** — A genetic algorithm runs continuously, combining 40+ technical indicators into novel strategy genomes. The strongest genomes survive, reproduce and mutate. Weak ones are discarded. An LLM (Gemini Flash via OpenRouter) proposes entirely new indicator combinations nightly, seeding fresh genetic material. A Bayesian optimiser (Optuna TPE) then fine-tunes the parameters of the top survivors with surgical precision.

**Rigorous validation before any real capital** — No strategy touches real money without passing walk-forward validation across 5 time windows, Monte Carlo stress-testing across 1,000 bootstrapped equity curves, and a minimum out-of-sample Sharpe of 1.5. Strategies that pass live paper trading for 14+ days and 30+ trades are promoted to live execution. Strategies that decay are automatically demoted.

**Full capital awareness** — Position sizes are not flat. Kelly Criterion (25% fractional) dynamically sizes each trade based on the strategy's live win rate and its reward:risk ratio. On-chain flow signals adjust confidence up to 1.5× or suppress it to 0.6×. Three oracle layers (Binance, CoinGecko, Jupiter) cross-validate every price before execution to guard against manipulation.

**Both sides of the market** — In bear regimes, the system takes short positions via inverse tokens on Jupiter. Capital is never idle waiting for bulls.

**Complete audit trail** — Every night a full HTML journal is generated: every trade, every genome tested, every strategy promoted or demoted, what the system currently believes about each strategy in each regime, gas costs, fee deductions, Kelly allocations, and on-chain flow highlights. Nothing is a black box.

---

## Stack

- **Execution**: Solana mainnet via Jupiter V6 aggregator — best price routing across all DEXes
- **Data**: Public Binance REST + CoinGecko + Helius on-chain (no paid keys required to start)
- **LLM**: Gemini 2.0 Flash via OpenRouter (~$2–5/month for all AI features)
- **Infrastructure**: Docker Compose — single command to deploy
- **Language**: Python 3.11 + FastAPI + asyncio throughout
- **Database**: PostgreSQL + Redis + Parquet (local cache)

---

## Current status

The bot is **running in paper mode on Solana mainnet** with $300 simulated capital — matching the intended live deployment amount exactly, so slippage and fee models are calibrated to real conditions.

The genetic algorithm is evolving strategies continuously. The meta-learning knowledge base is accumulating regime × strategy performance data with every trade. The daily journals are generating. The system is behaving as designed.

**No live capital is at risk during this phase.** The plan is to go live once the paper record demonstrates consistent performance across a sufficient sample of trades and market conditions — a milestone that will be clearly evidenced in the journal data.

---

## What's included in a purchase

- Complete source code (40 Python modules, ~330KB uncompressed)
- Full Docker deployment — runs on any Linux VPS
- All four phases fully implemented and integrated
- `.env.example` with every configuration option documented
- PostgreSQL schema covering all data models
- Copyright transfer and one month of post-sale support for deployment questions

---

## What this is not

This is not a signals service, a managed fund, or a promise of returns. It is a sophisticated software system. Past paper performance does not guarantee future live performance. Trading cryptocurrencies involves substantial risk of loss. Deploy and operate it at your own risk.

---

## Pricing

This system is available for private sale. Pricing reflects the scope of the build — four development phases, a genetic evolution engine, Bayesian optimisation, on-chain flow integration, Kelly sizing, dual-oracle price validation, Jito MEV protection, full alerting and nightly HTML reporting.

**Enquiries only. No public listing.**

If you are a developer, quantitative trader, or fund with interest in acquiring this system — or commissioning further development — please reach out directly.

---

## Contact

**Joerg Peetz**
📧 joerg.peetz@gmail.com
🐦 [@crypt0safety](https://twitter.com/crypt0safety)

*Serious enquiries only. Please include a brief description of your intended use case.*

---

<sub>© 2026 Joerg Peetz. All rights reserved. Proprietary and confidential. Redistribution or reproduction of any part of this repository without written permission is strictly prohibited.</sub>
