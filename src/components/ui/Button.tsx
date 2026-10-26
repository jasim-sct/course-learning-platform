import React from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'gold' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'
export type ButtonColor = 'blue' | 'emerald' | 'amber' | 'purple' | 'neutral' | 'red' | 'green'
export type ButtonRadius = 'default' | 'pill' | 'punchy'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  color?: ButtonColor
  radius?: ButtonRadius
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  color = 'blue',
  radius = 'punchy',
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'ui-btn'
  const variantClass = `ui-btn--${variant}`
  const sizeClass = `ui-btn--size-${size}`
  const colorClass = `ui-btn--color-${color}`
  const radiusClass = `ui-btn--rad-${radius}`
  const widthClass = fullWidth ? 'ui-btn--full-width' : ''
  const disabledClass = disabled ? 'ui-btn--disabled' : ''

  return (
    <button
      className={`${baseClasses} ${variantClass} ${sizeClass} ${colorClass} ${radiusClass} ${widthClass} ${disabledClass} ${className}`.trim()}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="ui-btn__icon ui-btn__icon--left">{leftIcon}</span>}
      {children && <span className="ui-btn__label">{children}</span>}
      {rightIcon && <span className="ui-btn__icon ui-btn__icon--right">{rightIcon}</span>}
    </button>
  )
}
