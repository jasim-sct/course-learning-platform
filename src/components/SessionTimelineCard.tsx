import React from 'react'
import { Check, Lock, Play } from 'lucide-react'

export interface SessionTimelineCardProps {
  sessionNumber: number
  title: string
  summary: string
  unlocked: boolean
  completed: boolean
  isCurrent: boolean
  isLast?: boolean
  onSelect: () => void
}

export const SessionTimelineCard: React.FC<SessionTimelineCardProps> = ({
  sessionNumber,
  title,
  summary,
  unlocked,
  completed,
  isCurrent,
  isLast = false,
  onSelect
}) => {
  const statusClass = completed ? 'completed' : isCurrent ? 'current' : !unlocked ? 'locked' : ''

  return (
    <div
      className={`session-timeline-card ${statusClass}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-label={`Session 0${sessionNumber}: ${title} — ${completed ? 'Completed' : unlocked ? 'Ready to Start' : 'Locked'}`}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect()
        }
      }}
    >
      {/* Left Circular Stepper Node */}
      <div className="timeline-node-col">
        <div className="node-circle">
          {completed ? (
            <Check size={16} className="check-icon" />
          ) : !unlocked ? (
            <Lock size={15} className="lock-icon" />
          ) : (
            <Play size={14} fill="currentColor" className="play-icon" />
          )}
        </div>
        {!isLast && (
          <div className={`timeline-connector ${completed ? 'done' : ''}`} />
        )}
      </div>

      {/* Right Card Content */}
      <div className="timeline-card-content">
        <div className="session-card-header-row">
          <span className="session-num-badge">SESSION 0{sessionNumber}</span>
          <span className="session-status-text">
            {completed ? 'Completed' : unlocked ? 'Ready to Start' : 'Locked'}
          </span>
        </div>

        <h4 className="session-card-heading">{title}</h4>
        <p className="session-card-summary">{summary}</p>
      </div>
    </div>
  )
}
