'use client'

import { motion } from 'framer-motion'

export default function CurrentlyCard() {
  return (
    <motion.div
      className="bg-card-bg border border-card-border rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
      whileHover={{ scale: 1.01, boxShadow: '0 4px 12px rgba(0,0,0,0.10)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <ul className="space-y-2.5 font-inter text-sm">
        <li className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot flex-shrink-0" />
          <span className="text-text-primary font-medium">Available for remote roles</span>
        </li>
        <li className="text-text-muted pl-4">Based in Delhi / Gurgaon</li>
        <li className="text-text-muted pl-4">Building in public → @rav4nn</li>
        <li className="text-text-muted pl-4">ACL recovery ongoing</li>
      </ul>
    </motion.div>
  )
}
