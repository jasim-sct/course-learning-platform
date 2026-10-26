import React from 'react'

export type BadgeVariant = 'solid' | 'subtle' | 'outline'
export type BadgeSize = 'sm' | 'md' | 'lg'
export type BadgeColor = 'blue' | 'emerald' | 'amber' | 'purple' | 'slate' | 'gold' | 'red' | 'green'
export type BadgeRadius = 'default' | 'pill' | 'punchy'

export interface BadgeProps {
  variant?: BadgeVariant
  size?: BadgeSize
  color?: BadgeColor
  radius?: BadgeRadius
  icon?: React.ReactNode
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'subtle',
  size = 'md',
  color = 'blue',
  radius = 'pill',
  icon,
  children,
  active = false,
  onClick,
  className = ''
}) => {
  const isClickable = Boolean(onClick)
  const Component = isClickable ? 'button' : 'span'

  const classes = [
    'ui-badge',
    `ui-badge--${variant}`,
    `ui-badge--size-${size}`,
    `ui-badge--color-${color}`,
    `ui-badge--rad-${radius}`,
    active ? 'ui-badge--active' : '',
    isClickable ? 'ui-badge--clickable' : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <Component className={classes} onClick={onClick}>
      {icon && <span className="ui-badge__icon">{icon}</span>}
      <span className="ui-badge__content">{children}</span>
    </Component>
  )
}
