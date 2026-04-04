'use client'

import { motion } from 'framer-motion'

export default function AboutCard() {
  return (
    <motion.div
      className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] h-full"
      whileHover={{ scale: 1.01, boxShadow: '0 4px 12px rgba(0,0,0,0.10)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <h2 className="font-playfair text-xl font-semibold text-text-primary mb-3">
        A bit about me
      </h2>
      <p className="font-inter text-sm text-text-muted leading-relaxed mb-3">
        I like building things that solve problems I actually have, and seeing them become products other people use.
      </p>
      <p className="font-inter text-sm text-text-muted leading-relaxed mb-5">
        Outside of code — I play chess obsessively, and played football every week until I tore my ACL last year (still in recovery, still bitter about it). I befriend every mountain dog I meet. I&apos;m on an ongoing, probably never-ending hunt for the best chhole bhature in Delhi.
      </p>
      <img
        src="/assets/chess.jpg"
        alt="Chess"
        className="w-full h-32 object-cover rounded-xl"
      />
    </motion.div>
  )
}
