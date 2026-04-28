'use client'

import { useState } from 'react'
import { FileText, ChevronDown, ChevronUp } from 'lucide-react'
import SectionWrapper from './ui/SectionWrapper'
import SectionHeading from './ui/SectionHeading'
import { COURSES } from '@/content'

const SEMESTERS = Array.from(new Set(COURSES.map((c) => c.semester))).sort((a, b) => {
  const order = ['Fall', 'Spring', 'Summer']
  const [aSeason, aYear] = a.split(' ')
  const [bSeason, bYear] = b.split(' ')
  if (aYear !== bYear) return Number(bYear) - Number(aYear)
  return order.indexOf(aSeason) - order.indexOf(bSeason)
})

export default function Coursework() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.fromEntries(SEMESTERS.map((s) => [s, true]))
  )

  function toggle(semester: string) {
    setExpanded((prev) => ({ ...prev, [semester]: !prev[semester] }))
  }

  return (
    <SectionWrapper id="coursework">
      <SectionHeading
        title="Coursework"
      />

      <div className="space-y-6">
        {SEMESTERS.map((semester) => {
          const courses = COURSES.filter((c) => c.semester === semester)
          const open = expanded[semester]
          return (
            <div key={semester}>
              <button
                onClick={() => toggle(semester)}
                className="flex items-center gap-2 mb-3 group"
              >
                <span className="text-xs font-mono font-semibold tracking-widest text-primary uppercase">
                  {semester}
                </span>
                {open
                  ? <ChevronUp size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                  : <ChevronDown size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                }
              </button>

              {open && (
                <div className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-card overflow-hidden">
                  {courses.map((course) => (
                    <div
                      key={course.code}
                      className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-accent/5 transition-colors duration-150"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="shrink-0 text-xs font-mono font-semibold text-primary w-20">{course.code}</span>
                        <span className="text-sm text-foreground truncate">{course.name}</span>
                      </div>

                      {course.cheatsheet && (
                        <a
                          href={course.cheatsheet}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                          <FileText size={12} />
                          Cheatsheet
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
