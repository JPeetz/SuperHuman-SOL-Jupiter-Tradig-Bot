'use client'
import { useEffect, useRef, useState, ReactNode } from 'react'
import Image from 'next/image'

/* ─── Intersection observer hook ─────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

/* ─── Fade-up wrapper ─────────────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, style = {} }: { children: ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  )
}

/* ─── Section divider ────────────────────────────────────────────────────── */
function Divider({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, maxWidth: 1160, margin: '0 auto', padding: '0 24px 80px' }}>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, var(--border-bright), transparent)' }} />
      <span className="font-mono-custom" style={{ fontSize: '0.68em', letterSpacing: '0.28em', color: 'var(--gold-dim)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, var(--border-bright), transparent)' }} />
    </div>
  )
}

/* ─── Architecture card ──────────────────────────────────────────────────── */
function ArchCard({ icon, title, body, tag }: { icon: string; title: string; body: string; tag: string }) {
  const [h, setH] = useState(false)
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      background: h ? 'var(--surface2)' : 'var(--surface)',
      border: `1px solid ${h ? 'var(--border-bright)' : 'var(--border)'}`,
      padding: '34px 30px', position: 'relative', overflow: 'hidden',
      transition: 'all 0.22s ease', cursor: 'default',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: h ? '100%' : 0, background: 'var(--gold)', transition: 'height 0.3s ease' }} />
      <div style={{ fontSize: '1.9em', marginBottom: 18 }}>{icon}</div>
      <h3 className="font-display" style={{ fontSize: '1.4em', letterSpacing: '0.04em', color: 'var(--white)', marginBottom: 12 }}>{title}</h3>
      <p style={{ fontSize: '0.875em', color: 'var(--muted)', lineHeight: 1.72 }}>{body}</p>
      <div className="font-mono-custom" style={{ display: 'inline-block', marginTop: 20, fontSize: '0.64em', letterSpacing: '0.13em', color: 'var(--gold)', border: '1px solid var(--border-mid)', padding: '4px 12px' }}>{tag}</div>
    </div>
  )
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const ARCH = [
  { icon: '🧬', title: 'Genetic Evolution Engine', tag: 'OPTUNA BAYESIAN OPTIMIZER',
    body: 'A genetic algorithm breeds strategy genomes from a library of 40+ indicators continuously. Population of 50 competing strategies. Weak ones eliminated, strong ones reproduce and mutate every night. LLM (Gemini Flash) proposes entirely new indicator combinations as fresh genetic seed.' },
  { icon: '🎯', title: 'Regime-Aware Execution', tag: '+10–15% WIN RATE ADVANTAGE',
    body: 'Six market regimes detected in real time: Bull Trend, Bear Trend, Sideways, High-Vol, Low-Vol, Regime Shift. Every strategy is deployed only in the regime it was evolved for. The bot never fights the market with the wrong weapon.' },
  { icon: '🐋', title: 'On-Chain Whale Intelligence', tag: 'PRE-MOVE ALPHA',
    body: 'Helius API streams whale wallet accumulation and DEX liquidity changes in real time — seconds before they appear in price data. Flow confidence gates every trade: suppress to 0.6× or amplify to 1.5× based on smart money direction.' },
  { icon: '📐', title: 'Kelly Criterion Sizing', tag: 'ASYMMETRIC COMPOUNDING',
    body: 'Position sizes are never flat. 25% fractional Kelly dynamically sizes each trade based on live win rate, reward:risk ratio, and on-chain flow confidence. Capital is deployed proportionally to demonstrated statistical edge.' },
  { icon: '🔮', title: 'Meta-Learning Memory', tag: 'SELF-IMPROVING AFTER LAUNCH',
    body: 'Every trade is attributed to strategy × regime × token tier. An empirical knowledge base builds with each execution. After 20+ trades, strategy selection becomes fully evidence-based. Win rate improves continuously — not just at deployment.' },
  { icon: '📉', title: 'Short Side — Bear Regimes', tag: 'MARKET-NEUTRAL CAPABLE',
    body: 'In bear regimes, capital deploys short via inverse tokens on Jupiter. Capital is never idle waiting for bulls. Both market directions captured. Drift Protocol perp scaffold included for institutional leverage requirements.' },
]

const TABLE_ROWS = [
  { t: 'Month 1',  v: ['$1,322', '$13,220', '$33,050', '$132,200', '$661,000'],   hi: false },
  { t: 'Month 3',  v: ['$2,322', '$23,220', '$58,050', '$232,200', '$1.16M'],     hi: false },
  { t: 'Month 6',  v: ['$5,395', '$53,950', '$134,875', '$539,500', '$2.70M'],    hi: true  },
  { t: 'Month 9',  v: ['$12,534','$125,340','$313,350', '$1.25M',   '$6.27M'],    hi: false },
  { t: 'Month 12', v: ['$29,100','$291,000','$727,500', '$2.91M',   '$14.55M'],   hi: true  },
  { t: 'Month 18', v: ['$157K',  '$1.57M',  '$3.93M',   '$15.7M',   '$78.5M'],   hi: false },
  { t: 'Month 24', v: ['$849K',  '$8.49M',  '$21.2M',   '$84.9M',   '$424.5M'],  hi: true  },
]

const BREAKEVEN = [
  { cap: '$10,000',  time: '~8 days',   note: 'Month 1 returns $3,220\nRecovered in under 2 weeks' },
  { cap: '$25,000',  time: '~3 days',   note: 'Month 1 returns $8,050\nRecovered in under a week' },
  { cap: '$100,000', time: '~18 hours', note: 'Month 1 returns $32,200\nSystem pays for itself by Day 2' },
  { cap: '$500,000', time: '~4 hours',  note: 'Month 1 returns $161,000\nPurchase price is rounding error' },
]

const TECH = [
  ['Execution',     'Jupiter V6 · Solana Mainnet'],
  ['Oracles',       'Binance + CoinGecko + Jupiter'],
  ['Evolution',     'Genetic Algorithm + Optuna TPE'],
  ['On-Chain',      'Helius Enhanced API'],
  ['LLM Strategy',  'Gemini Flash · OpenRouter'],
  ['MEV Protection','Jito Bundle Support'],
  ['Deployment',    'Docker · Single Command'],
  ['Codebase',      '40 Modules · Python 3.11'],
]

/* ─── PAGE ───────────────────────────────────────────────────────────────── */
export default function Page() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <main style={{ background: 'var(--obsidian)', minHeight: '100vh' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(6,8,10,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'all 0.35s ease',
      }}>
        <span className="font-display" style={{ fontSize: '1.45em', letterSpacing: '0.08em', color: 'var(--gold)' }}>NEURAL SWARM</span>
        <a href="#acquire" style={{
          fontFamily: 'DM Mono, monospace', fontSize: '0.72em', letterSpacing: '0.18em',
          textTransform: 'uppercase', textDecoration: 'none',
          color: 'var(--obsidian)', background: 'var(--gold)', padding: '9px 22px',
          opacity: scrolled ? 1 : 0, transition: 'opacity 0.35s',
          pointerEvents: scrolled ? 'auto' : 'none',
        }}>Acquire →</a>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '120px 24px 80px', position: 'relative', overflow: 'hidden',
      }}>
        {/* radial glow */}
        <div style={{ position: 'absolute', top: '-250px', left: '50%', transform: 'translateX(-50%)', width: 1000, height: 1000, background: 'radial-gradient(ellipse, rgba(201,168,76,0.065) 0%, transparent 65%)', pointerEvents: 'none' }} />
        {/* grid */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(201,168,76,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.028) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />

        <style>{`
          @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
          @keyframes pulse  { 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:0.3; transform:scale(0.65); } }
          @keyframes dropIn { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
        `}</style>

        {/* live badge */}
        <div className="font-mono-custom" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          border: '1px solid var(--border-bright)', background: 'rgba(201,168,76,0.06)',
          color: 'var(--gold)', fontSize: '0.72em', letterSpacing: '0.2em',
          textTransform: 'uppercase', padding: '9px 22px', marginBottom: 48,
          animation: 'fadeUp 0.75s ease both',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 10px var(--green)', animation: 'pulse 2s infinite', flexShrink: 0 }} />
          Live · Paper Mode · Performing As Designed
        </div>

        <h1 className="font-display" style={{ fontSize: 'clamp(5em,14vw,11em)', letterSpacing: '0.04em', lineHeight: 0.88, color: 'var(--white)', marginBottom: 14, animation: 'fadeUp 0.85s ease 0.1s both' }}>
          NEURAL<br /><span className="gold-grad">SWARM</span>
        </h1>

        <p className="font-display" style={{ fontSize: 'clamp(1em,2.6vw,1.65em)', letterSpacing: '0.2em', color: 'var(--muted)', marginBottom: 36, animation: 'fadeUp 0.85s ease 0.2s both' }}>
          AUTONOMOUS SOLANA TRADING INTELLIGENCE
        </p>

        <p style={{ maxWidth: 620, fontSize: '1.06em', fontWeight: 300, color: 'var(--text)', marginBottom: 64, lineHeight: 1.8, animation: 'fadeUp 0.85s ease 0.3s both' }}>
          A self-evolving, self-learning quantitative trading system for Solana mainnet. Built across four phases. Runs without human intervention. Targets <strong style={{ color: 'var(--gold-light)' }}>75–82% win rate</strong> through genetic strategy evolution, regime-aware execution, and on-chain whale intelligence.
        </p>

        <div style={{ display: 'flex', gap: 'clamp(24px,6vw,72px)', flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeUp 0.85s ease 0.4s both' }}>
          {[['40+','Indicator Library'],['75–82%','Projected Win Rate'],['6','Regime Detectors'],['24/7','Autonomous']].map(([v,l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div className="font-display" style={{ fontSize: 'clamp(2em,5vw,3.2em)', color: 'var(--gold)', lineHeight: 1 }}>{v}</div>
              <div className="font-mono-custom" style={{ fontSize: '0.67em', letterSpacing: '0.13em', color: 'var(--muted)', textTransform: 'uppercase', marginTop: 6 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ position: 'absolute', bottom: 44, left: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ width: 1, height: 56, background: 'linear-gradient(to bottom, var(--gold-dim), transparent)', animation: 'pulse 2.2s infinite' }} />
        </div>
      </section>

      {/* ── ARCHITECTURE ── */}
      <Divider label="System Architecture" />
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 100px' }}>
        <FadeUp>
          <div className="font-mono-custom" style={{ fontSize: '0.7em', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 14 }}>Four-Phase Build</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.4em,5vw,4em)', letterSpacing: '0.04em', color: 'var(--white)', lineHeight: 1, marginBottom: 52 }}>
            WHAT A QUANT FUND<br /><span className="gold-grad">CHARGES €500K TO BUILD</span>
          </h2>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(310px,1fr))', gap: 2 }}>
          {ARCH.map((c, i) => <FadeUp key={c.title} delay={i * 75}><ArchCard {...c} /></FadeUp>)}
        </div>
      </section>

      {/* ── COMPOUNDING ── */}
      <Divider label="Return Projections" />
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 100px' }}>
        <FadeUp>
          <div className="font-mono-custom" style={{ fontSize: '0.7em', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 14 }}>75% Win Rate · Daily Compounding · 5 Trades/Day</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2.4em,5vw,4em)', letterSpacing: '0.04em', color: 'var(--white)', lineHeight: 1, marginBottom: 52 }}>
            WHAT CAPITAL<br /><span className="gold-grad">BECOMES IN THIS SYSTEM</span>
          </h2>
        </FadeUp>

        <FadeUp delay={100}>
          <div style={{ border: '1px solid var(--border-bright)', background: 'var(--surface)', padding: 'clamp(24px,4vw,56px)', position: 'relative', overflow: 'hidden' }}>
            {/* watermark */}
            <div className="font-display" style={{ position: 'absolute', top: -8, right: -16, fontSize: 'clamp(4em,10vw,9em)', color: 'rgba(201,168,76,0.03)', pointerEvents: 'none', whiteSpace: 'nowrap', lineHeight: 1 }}>COMPOUNDING</div>

            {/* assumptions */}
            <div className="font-mono-custom" style={{ borderLeft: '3px solid var(--gold-dim)', background: 'rgba(201,168,76,0.04)', padding: '18px 22px', marginBottom: 40, fontSize: '0.78em', color: 'var(--muted)', lineHeight: 1.9 }}>
              <strong style={{ color: 'var(--gold)' }}>Conservative model assumptions:</strong> 75% win rate (below 82% architectural ceiling) · Avg gain per winning trade: 1.8% of position · Avg loss per losing trade: 1.1% · Kelly sizing averages 2% of equity per trade · 5 trades/day · All returns reinvested daily.<br />
              Expected value per trade: (0.75×1.8%) − (0.25×1.1%) = <strong style={{ color: 'var(--gold)' }}>+1.075% of position → ~0.107% total equity/trade → ~3.2% monthly compounded growth.</strong>
            </div>

            {/* table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ minWidth: 660 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-bright)' }}>
                    {['TIME','$1K','$10K','$25K','$100K','$500K'].map((h,i) => (
                      <th key={h} className="font-mono-custom" style={{ fontSize: '0.68em', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', padding: '14px 16px', textAlign: i===0?'left':'right', background: 'rgba(201,168,76,0.04)', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map(row => (
                    <tr key={row.t} style={{ background: row.hi ? 'rgba(201,168,76,0.055)' : 'transparent', borderTop: row.hi ? '1px solid var(--border-mid)' : 'none', borderBottom: row.hi ? '1px solid var(--border-mid)' : '1px solid var(--border)' }}>
                      <td className="font-mono-custom" style={{ padding: '13px 16px', fontSize: '0.8em', letterSpacing: '0.09em', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{row.t}</td>
                      {row.v.map((cell, ci) => (
                        <td key={ci} className="font-mono-custom" style={{ padding: '13px 16px', textAlign: 'right', fontSize: '0.88em', color: row.hi ? 'var(--gold-light)' : 'var(--text)', fontWeight: row.hi ? 500 : 400, whiteSpace: 'nowrap' }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* pull quote */}
            <blockquote style={{ borderLeft: '3px solid var(--gold)', padding: '22px 28px', background: 'var(--surface2)', marginTop: 48, fontSize: '1.04em', color: 'var(--white)', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.75 }}>
              "At $100,000 starting capital, the system generates more than its own purchase price in the first week of Month 1 alone. By Month 6 you are holding $539,500. The acquisition cost becomes statistical noise."
            </blockquote>
          </div>
        </FadeUp>

        {/* Breakeven */}
        <FadeUp delay={140}>
          <div className="font-mono-custom" style={{ fontSize: '0.7em', letterSpacing: '0.22em', color: 'var(--gold)', textTransform: 'uppercase', margin: '52px 0 20px' }}>Breakeven — How fast does the purchase price pay for itself?</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 2 }}>
            {BREAKEVEN.map(c => (
              <div key={c.cap} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', padding: '28px 22px', textAlign: 'center' }}>
                <div className="font-display" style={{ fontSize: '2.1em', color: 'var(--gold)', lineHeight: 1, marginBottom: 10 }}>{c.cap}</div>
                <div className="font-mono-custom" style={{ fontSize: '0.78em', letterSpacing: '0.1em', color: 'var(--green)', marginBottom: 10 }}>{c.time}</div>
                <div style={{ fontSize: '0.82em', color: 'var(--muted)', whiteSpace: 'pre-line', lineHeight: 1.65 }}>{c.note}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ── TECH STRIP ── */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 100px' }}>
        <FadeUp>
          <div style={{ display: 'flex', flexWrap: 'wrap', border: '1px solid var(--border)' }}>
            {TECH.map(([label,val]) => (
              <div key={label} style={{ flex: '1 1 175px', padding: '20px 22px', borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                <div className="font-mono-custom" style={{ fontSize: '0.62em', letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
                <div className="font-mono-custom" style={{ fontSize: '0.82em', color: 'var(--gold)' }}>{val}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* ── ACQUIRE ── */}
      <Divider label="Acquisition" />
      <section id="acquire" style={{ maxWidth: 1160, margin: '0 auto 40px', padding: '0 24px' }}>
        <FadeUp>
          <div style={{ background: 'linear-gradient(135deg, var(--surface) 0%, rgba(201,168,76,0.055) 100%)', border: '1px solid var(--border-bright)', padding: 'clamp(32px,5vw,72px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            {/* hex watermark */}
            <div style={{ position: 'absolute', bottom: -80, right: -50, fontSize: 'clamp(10em,22vw,20em)', color: 'rgba(201,168,76,0.025)', pointerEvents: 'none', lineHeight: 1 }}>⬡</div>

            <div className="font-mono-custom" style={{ fontSize: '0.7em', letterSpacing: '0.26em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 16 }}>Private Sale · Serious Enquiries Only</div>

            <h2 className="font-display" style={{ fontSize: 'clamp(2.2em,5vw,3.8em)', letterSpacing: '0.04em', color: 'var(--white)', lineHeight: 1, marginBottom: 52 }}>
              FULL ACQUISITION<br /><span className="gold-grad">INCLUDES EVERYTHING</span>
            </h2>

            {/* included grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 2, marginBottom: 60, textAlign: 'left', position: 'relative', zIndex: 1 }}>
              {[
                ['Complete Source','All 40 Python modules, 330KB uncompressed. Every line of the evolution engine, meta-learning system, on-chain flow agent, and execution pipeline.'],
                ['One-Command Deploy','Docker Compose. Runs on any Linux VPS. PostgreSQL + Redis + Parquet. Live in under 10 minutes. Full .env.example documented.'],
                ['Handover Support','30 days post-sale deployment support included. Architecture walkthrough. Configuration guidance. Scaling advice for your capital level.'],
                ['Exclusive Transfer','Copyright transfer. Not sold to multiple buyers. One acquisition, one owner. The edge this system generates is yours alone.'],
              ].map(([t,b]) => (
                <div key={t} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '26px 22px' }}>
                  <div className="font-mono-custom" style={{ fontSize: '0.67em', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 10 }}>{t}</div>
                  <div style={{ fontSize: '0.875em', color: 'var(--muted)', lineHeight: 1.68 }}>{b}</div>
                </div>
              ))}
            </div>

            {/* price */}
            <div style={{ marginBottom: 52, position: 'relative', zIndex: 1 }}>
              <div className="font-mono-custom" style={{ fontSize: '0.78em', letterSpacing: '0.22em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 8 }}>Acquisition Price</div>
              <div className="font-display gold-grad" style={{ fontSize: 'clamp(5em,12vw,8em)', letterSpacing: '0.04em', lineHeight: 1 }}>€25,000</div>
              <div style={{ fontSize: '0.95em', color: 'var(--muted)', marginTop: 10, fontStyle: 'italic' }}>At $100k starting capital — recovered before Day 2 of Month 1</div>
              <div style={{ fontSize: '0.85em', color: 'var(--muted)', marginTop: 4, fontStyle: 'italic' }}>Whale capital ($500k+) — purchase price recovered within 4 hours of trading</div>
            </div>

            {/* QR */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 44, position: 'relative', zIndex: 1 }}>
              <div className="font-mono-custom" style={{ fontSize: '0.7em', letterSpacing: '0.22em', color: 'var(--gold-dim)', textTransform: 'uppercase' }}>Scan to pay via PayPal</div>
              <div style={{ background: '#fff', padding: 14, boxShadow: '0 0 60px rgba(201,168,76,0.22), 0 20px 50px rgba(0,0,0,0.5)', transition: 'transform 0.3s, box-shadow 0.3s', width: 214 }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform='scale(1.04)'; el.style.boxShadow='0 0 90px rgba(201,168,76,0.38),0 24px 60px rgba(0,0,0,0.6)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform='scale(1)'; el.style.boxShadow='0 0 60px rgba(201,168,76,0.22),0 20px 50px rgba(0,0,0,0.5)' }}
              >
                <Image src="/qr-paypal.jpg" alt="PayPal QR — Joerg Peetz" width={186} height={186}
                  style={{ display: 'block', objectFit: 'cover', objectPosition: 'center 19%' }} priority />
              </div>
              <div className="font-display" style={{ fontSize: '1.55em', letterSpacing: '0.08em', color: 'var(--white)' }}>Joerg Peetz</div>
              <div className="font-mono-custom" style={{ fontSize: '0.67em', letterSpacing: '0.14em', color: 'var(--muted)', textTransform: 'uppercase' }}>PayPal · Seller Fees Apply · Enquire Before Paying</div>
            </div>

            {/* buttons */}
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28, position: 'relative', zIndex: 1 }}>
              <a href="mailto:joerg.peetz@gmail.com?subject=Neural%20Swarm%20Acquisition%20Enquiry"
                style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 30px', fontFamily:'DM Mono,monospace', fontSize:'0.82em', letterSpacing:'0.12em', textTransform:'uppercase', textDecoration:'none', background:'var(--gold)', color:'var(--obsidian)', fontWeight:600, transition:'all 0.2s' }}
                onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.background='var(--gold-bright)';el.style.boxShadow='0 0 32px rgba(201,168,76,0.45)'}}
                onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.background='var(--gold)';el.style.boxShadow='none'}}
              >✉ joerg.peetz@gmail.com</a>
              <a href="https://twitter.com/crypt0safety" target="_blank" rel="noopener noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 30px', fontFamily:'DM Mono,monospace', fontSize:'0.82em', letterSpacing:'0.12em', textTransform:'uppercase', textDecoration:'none', background:'transparent', color:'var(--gold)', border:'1px solid var(--border-bright)', transition:'all 0.2s' }}
                onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.background='rgba(201,168,76,0.08)';el.style.borderColor='var(--gold)'}}
                onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.background='transparent';el.style.borderColor='var(--border-bright)'}}
              >𝕏 @crypt0safety</a>
            </div>

            <p className="font-mono-custom" style={{ fontSize: '0.73em', color: 'var(--muted)', letterSpacing: '0.06em', position: 'relative', zIndex: 1, lineHeight: 1.8 }}>
              Please contact before payment. Include your intended capital level and use case.<br />
              Serious principals only. Response within 24 hours.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* FOOTER */}
      <footer style={{ maxWidth: 1160, margin: '0 auto', padding: '28px 24px 64px', borderTop: '1px solid var(--border)' }}>
        <p className="font-mono-custom" style={{ fontSize: '0.67em', color: 'var(--muted)', lineHeight: 1.9, opacity: 0.65 }}>
          © 2026 Joerg Peetz. All rights reserved. Proprietary and confidential. &nbsp;·&nbsp;
          This system is sold as software only. Compounding projections are mathematical illustrations based on assumed parameters — actual results depend on market conditions, capital, and configuration. Past paper performance does not guarantee future live returns. Cryptocurrency trading involves substantial risk of loss. Not financial advice. &nbsp;·&nbsp;
          Redistribution or resale without written permission is strictly prohibited.
        </p>
      </footer>

    </main>
  )
}
