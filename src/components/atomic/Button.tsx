import './Button.css'

interface ButtonProps {
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
  fullWidth?: boolean
}

export const Button = ({ type = 'button', onClick, disabled, children, fullWidth }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`modal-button ${fullWidth ? 'full-width' : ''}`}
    >
      {children}
    </button>
  )
}
