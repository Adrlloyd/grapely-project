import '../../styles/Modal.css'
import React, { useState } from 'react'
import { useAuth } from '../../context/useAuth';

interface NameModalProps {
  onSubmit: (firstName: string | undefined, lastName: string | undefined) => void;
  onCancel: () => void
}

function NameModal ({ onSubmit, onCancel }: NameModalProps) {
  const { user } = useAuth();

  const [firstName, setFirstName] = useState<string | undefined>(user?.firstName);
  const [lastName, setLastName] = useState<string | undefined>(user?.lastName);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(firstName, lastName)
  }
  
  return (
      <div className="modal-overlay">
      <div className="modal">
        <h3>Update Name</h3>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>First Name: </label>
          <input
            type="firstName"
            placeholder={user?.firstName}
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
          <label>Last Name: </label>
          <input
            type="lastName"
            placeholder={user?.lastName}
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
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

export default NameModal