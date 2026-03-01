import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Neural Swarm — Autonomous Solana Trading Intelligence',
  description: 'Self-evolving quant trading system for Solana. Genetic algorithm strategy evolution, regime-aware execution, on-chain whale intelligence. Targeting 75–82% win rate. Private acquisition.',
  openGraph: {
    title: 'Neural Swarm — Autonomous Solana Trading Intelligence',
    description: 'Self-evolving quant system. $100k starting capital recovered before Day 2 of Month 1.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
