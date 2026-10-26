import React from 'react'

export type CardVariant = 'elevated' | 'bordered' | 'flat' | 'interactive'
export type CardPadding = 'none' | 'sm' | 'md' | 'lg'
export type CardRadius = 'sm' | 'md' | 'lg' | 'punchy'
export type CardColor = 'white' | 'subtle' | 'gold' | 'blue' | 'red' | 'green'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  padding?: CardPadding
  radius?: CardRadius
  color?: CardColor
  as?: 'div' | 'article' | 'section'
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  variant = 'bordered',
  padding = 'md',
  radius = 'md',
  color = 'white',
  as: Component = 'div',
  children,
  className = '',
  onClick,
  ...props
}) => {
  const isClickable = Boolean(onClick)

  const classes = [
    'ui-card',
    `ui-card--${variant}`,
    `ui-card--pad-${padding}`,
    `ui-card--rad-${radius}`,
    `ui-card--color-${color}`,
    isClickable ? 'ui-card--clickable' : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <Component className={classes} onClick={onClick} {...props}>
      {children}
    </Component>
  )
}
