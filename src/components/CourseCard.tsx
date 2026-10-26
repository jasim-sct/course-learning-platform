import React from 'react'
import { ArrowRight, Award } from 'lucide-react'
import { ProgressBar } from './ui/ProgressBar'

export interface CourseCardData {
  id: string
  title: string
  category: string
  description: string
  thumbnail: string
  accentColor: string
  sessions: Array<{ id: string }>
}

export type CourseCardVariant = 'standard' | 'compact'

export interface CourseCardProps {
  course: CourseCardData
  completedCount: number
  isCompleted: boolean
  variant?: CourseCardVariant
  onClick: () => void
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  completedCount,
  isCompleted,
  variant = 'standard',
  onClick
}) => {
  const total = course.sessions.length
  const percent = Math.round((completedCount / total) * 100)

  return (
    <article
      className={`mobile-course-card mobile-course-card--${variant}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Course: ${course.title}, ${course.category}, ${completedCount} of ${total} sessions completed`}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      <div className="card-thumb-frame">
        <img src={course.thumbnail} alt={course.title} className="card-thumb-img" />
        <div className="card-gradient-overlay" />

        <span className="card-cat-pill">{course.category}</span>
        {isCompleted && (
          <span className="card-award-pill">
            <Award size={13} /> Completed · Certificate Ready
          </span>
        )}
      </div>

      <div className="card-info-pane">
        <h3 className="course-card-title">{course.title}</h3>
        <p className="course-card-desc">{course.description}</p>

        <div className="course-card-bottom-row">
          <div className="card-progress-col">
            <ProgressBar
              value={percent}
              size="sm"
              color="gradient"
              showLabel={true}
              label={`${completedCount} of ${total} Sessions (${percent}%)`}
            />
          </div>
          <span className="clean-open-cue">
            <ArrowRight size={18} />
          </span>
        </div>
      </div>
    </article>
  )
}
