import './Input.css'

interface InputProps {
  type?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  autoFocus?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  className?: string
  ariaLabel?: string
}

export const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error,
  autoFocus,
  leftIcon,
  rightIcon,
  className,
  ariaLabel
}: InputProps) => {
  return (
    <div>
      <div className={`input-wrapper ${leftIcon ? 'with-icon' : ''} ${rightIcon ? 'with-right-icon' : ''}`}>
        {leftIcon && <span className="input-left-icon" aria-hidden="true">{leftIcon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`input-field ${className || ''}`}
          autoFocus={autoFocus}
          aria-label={ariaLabel || placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? 'input-error' : undefined}
        />
        {rightIcon && <span className="input-right-icon" aria-hidden="true">{rightIcon}</span>}
      </div>
      {error && <div className="error-text" id="input-error" role="alert">{error}</div>}
    </div>
  )
}
