import React from 'react'

export type ProgressBarSize = 'sm' | 'md' | 'lg'
export type ProgressBarColor = 'blue' | 'emerald' | 'amber' | 'gradient'
export type ProgressBarVariant = 'default' | 'rounded' | 'glow'

export interface ProgressBarProps {
  value: number // 0 to 100
  size?: ProgressBarSize
  color?: ProgressBarColor
  variant?: ProgressBarVariant
  showLabel?: boolean
  label?: string
  className?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  size = 'md',
  color = 'gradient',
  variant = 'default',
  showLabel = false,
  label,
  className = ''
}) => {
  const clampedValue = Math.min(100, Math.max(0, value))

  const containerClasses = [
    'ui-progress-container',
    `ui-progress--size-${size}`,
    className
  ].filter(Boolean).join(' ')

  const fillClasses = [
    'ui-progress-fill',
    `ui-progress-fill--${color}`,
    `ui-progress-fill--${variant}`
  ].filter(Boolean).join(' ')

  return (
    <div className={containerClasses}>
      <div className="ui-progress-track">
        <div
          className={fillClasses}
          style={{ width: `${clampedValue}%` }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showLabel && (
        <span className="ui-progress-label">
          {label ?? `${clampedValue}%`}
        </span>
      )}
    </div>
  )
}
