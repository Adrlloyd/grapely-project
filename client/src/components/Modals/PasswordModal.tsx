import React, { useState } from 'react'
import '../../styles/Modal.css'

interface PasswordModalProps {
  onSubmit: (currentPassword: string, newPassword: string, confirmedPassword: string) => void;
  onCancel: () => void
}

function PasswordModal ({ onSubmit, onCancel }: PasswordModalProps) {

  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmedPassword,setConfirmedPassword] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(currentPassword, newPassword, confirmedPassword)
  }
  
  return (
      <div className="modal-overlay">
      <div className="modal">
        <h3>Change Password</h3>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            required
          />
          <div className="modal-actions">
            <button type="submit" className="save-button">Submit</button>
            <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PasswordModal