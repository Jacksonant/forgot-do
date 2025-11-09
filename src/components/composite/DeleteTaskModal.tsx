import { Modal } from '../atomic/Modal'

interface DeleteTaskModalProps {
  taskName: string
  onClose: () => void
  onConfirm: () => void
}

export const DeleteTaskModal = ({ taskName, onClose, onConfirm }: DeleteTaskModalProps) => {
  const truncatedName = taskName.length > 25 ? taskName.substring(0, 25) + '...' : taskName

  return (
    <Modal
      title="Delete Task"
      onClose={onClose}
      onSubmit={onConfirm}
      submitLabel="Delete"
    >
      <p
        style={{
          margin: "16px 0",
          fontFamily: "Montserrat, sans-serif",
          fontSize: "14px",
          color: "#537178",
        }}
      >
        Are you sure you want to delete this task <strong>({truncatedName})</strong>? This action cannot be undone.
      </p>
    </Modal>
  )
}
