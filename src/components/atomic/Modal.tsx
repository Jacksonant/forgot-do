import type { ReactNode, FormEvent } from 'react'
import { Button } from './Button'
import './Modal.css'

interface ModalProps {
  title?: string
  onClose?: () => void
  onSubmit?: () => void
  submitLabel?: string | ReactNode
  showOverlay?: boolean
  children: ReactNode
}

export const Modal = ({ title, onClose, onSubmit, submitLabel, showOverlay = true, children }: ModalProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }

  const content = (
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <form onSubmit={handleSubmit}>
        {title && <h2 className="modal-title">{title}</h2>}
        {children}
        {onSubmit && (
          <Button type="submit">
            {submitLabel || 'Submit'}
          </Button>
        )}
      </form>
    </div>
  )

  if (!showOverlay) {
    return <div className="modal-container">{content}</div>
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      {content}
    </div>
  )
}
