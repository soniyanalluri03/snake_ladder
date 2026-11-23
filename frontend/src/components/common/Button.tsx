
import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50'

  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600',
    secondary: 'bg-slate-700 text-white hover:bg-slate-800',
    outline: 'border border-slate-300 text-slate-700 hover:bg-slate-100',
  }

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
