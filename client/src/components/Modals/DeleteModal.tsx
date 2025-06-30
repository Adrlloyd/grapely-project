import '../../styles/Modal.css'

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteModal ({ onConfirm, onCancel }: DeleteModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Are you sure you want to delete your account?</h3>
        <p>This action cannot be undone.</p>
        <div className="modal-actions">
          <button className="delete-button" onClick={onConfirm}>Yes</button>
          <button className="cancel-button" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal