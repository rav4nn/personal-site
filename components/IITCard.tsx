'use client'

import { motion } from 'framer-motion'

export default function IITCard() {
  return (
    <motion.div
      className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] text-center"
      whileHover={{ scale: 1.01, boxShadow: '0 4px 12px rgba(0,0,0,0.10)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <p className="font-inter text-xs text-text-muted uppercase tracking-wider mb-1">
        Diploma in Chemical Engineering
      </p>
      <h3 className="font-playfair text-lg font-semibold text-text-primary mb-2">
        Indian Institute of Technology, Delhi
      </h3>
      <p className="font-inter text-xs text-text-muted italic">
        The unconventional path into AI engineering.
      </p>
    </motion.div>
  )
}
