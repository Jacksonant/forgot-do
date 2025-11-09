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
  className
}: InputProps) => {
  return (
    <div>
      <div className={`input-wrapper ${leftIcon ? 'with-icon' : ''} ${rightIcon ? 'with-right-icon' : ''}`}>
        {leftIcon && <span className="input-left-icon">{leftIcon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`input-field ${className || ''}`}
          autoFocus={autoFocus}
        />
        {rightIcon && <span className="input-right-icon">{rightIcon}</span>}
      </div>
      {error && <div className="error-text">{error}</div>}
    </div>
  )
}
