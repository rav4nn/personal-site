'use client'

import { motion } from 'framer-motion'

interface ProjectsCardProps {
  youtubeStars: number
  buildInPublicStars: number
}

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function MetricTag({ label }: { label: string }) {
  return (
    <span className="inline-block px-2.5 py-0.5 bg-accent text-white text-xs font-inter rounded-full">
      {label}
    </span>
  )
}

export default function ProjectsCard({ youtubeStars, buildInPublicStars }: ProjectsCardProps) {
  return (
    <motion.div
      className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] h-full"
      whileHover={{ scale: 1.01, boxShadow: '0 4px 12px rgba(0,0,0,0.10)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <h2 className="font-playfair text-xl font-semibold text-text-primary mb-5">
        Things I&apos;ve built
      </h2>

      <div className="space-y-6">
        {/* coffeecoach.app */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-playfair text-base font-semibold text-text-primary">coffeecoach.app</h3>
            <a href="https://coffeecoach.app" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors">
              <ExternalLinkIcon />
            </a>
          </div>
          <p className="font-inter text-sm text-text-muted leading-relaxed mb-2">
            A full-stack app that helps people improve their coffee brewing through structured feedback and data-driven suggestions. I built it because I was personally trying to get better at brewing and realized most advice online is scattered and inconsistent — so I collected high-quality data and built a decision tree to guide brewers through it.
          </p>
          <MetricTag label="64 users in a week · zero paid promotion" />
        </div>

        {/* buildinpublic-x */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-playfair text-base font-semibold text-text-primary">buildinpublic-x</h3>
            <a href="https://github.com/rav4nn/buildinpublic-x" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors">
              <GitHubIcon />
            </a>
          </div>
          <p className="font-inter text-sm text-text-muted leading-relaxed mb-2">
            GitHub commits over the day → Twitter/Bluesky posts every night. Developers can build in public without the friction of manually writing updates — no server, no backend, no SaaS. The tool lives entirely inside your GitHub as an Action. LLM provider is swappable to your choice.
          </p>
          <MetricTag label={`${buildInPublicStars} stars`} />
        </div>

        {/* youtube-rag-scraper */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-playfair text-base font-semibold text-text-primary">youtube-rag-scraper</h3>
            <a href="https://github.com/rav4nn/youtube-rag-scraper" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors">
              <GitHubIcon />
            </a>
          </div>
          <p className="font-inter text-sm text-text-muted leading-relaxed mb-2">
            A pipeline that extracts, processes, and structures knowledge from YouTube channels for use in RAG systems. Built after realizing YouTube has some of the best domain-specific content, but it&apos;s impossible to query or reuse effectively. Turns unstructured video transcripts into something searchable for downstream AI applications.
          </p>
          <MetricTag label={`${youtubeStars} stars`} />
        </div>

        {/* splitwala */}
        <div>
          <h3 className="font-playfair text-base font-semibold text-text-primary mb-1">splitwala</h3>
          <p className="font-inter text-sm text-text-muted leading-relaxed">
            A WhatsApp chatbot that splits bills in group chats. Built out of personal need, focused on keeping the UX minimal — commands like /split, /paid, /balances. Solving a real everyday problem without overbuilding it.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
