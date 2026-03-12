'use client'

import { motion } from 'framer-motion'

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
})

export default function CodeGrid() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-[400px]">
      {/* Berkeley */}
      <motion.div
        {...fade(0.3)}
        className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 flex items-center gap-4"
      >
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-lg shrink-0">
          🎓
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-100">UC Berkeley</p>
          <p className="text-xs text-zinc-500 mt-0.5">B.S. EECS • Class of 2028</p>
        </div>
        <span className="ml-auto px-2 py-0.5 text-[10px] font-mono bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-md shrink-0">
          Current
        </span>
      </motion.div>

      {/* iPick.ai */}
      <motion.div
        {...fade(0.45)}
        className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Current</p>
          </div>
          <span className="text-[10px] font-mono text-zinc-600">Jan 2026 – Present</span>
        </div>
        <p className="text-sm font-semibold text-zinc-100">Project Manager</p>
        <p className="text-xs text-blue-400 mt-0.5 mb-2">iPick.ai</p>
        <p className="text-xs text-zinc-500 leading-relaxed">
          Leading 15 engineers building a graph-based platform that maps relationships between thousands of companies.
        </p>
      </motion.div>

      {/* Claythis */}
      <motion.div
        {...fade(0.6)}
        className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Previously</p>
          <span className="text-[10px] font-mono text-zinc-600">May – Aug 2025</span>
        </div>
        <p className="text-sm font-semibold text-zinc-100">Software Engineer Intern</p>
        <p className="text-xs text-blue-400 mt-0.5 mb-2">Claythis</p>
        <p className="text-xs text-zinc-500 leading-relaxed">
          Built a Unity game showcasing an AI-driven 3D model generation pipeline.
        </p>
      </motion.div>
    </div>
  )
}
