import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/UserProfile.css';
// import modal component?
import { AuthContext } from '../context/AuthContext';
// import type { AuthContextType } from '../context/AuthContext';
import { updatePassword, deleteUser } from '../services/userService';

function UserProfile() {
  const navigate = useNavigate(); //To be used for the 'deleteAccount' function - also set {replace:true} as argument to disable return nav through back button
  const auth = useContext(AuthContext)

  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmedPassword,setConfirmedPassword] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const user = auth?.user;
  if (!user) {
    return null;
  }

  const handleUpdatePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('');
    if (!currentPassword || !newPassword || !confirmedPassword) {
      setStatus('Please fill in all password fields.');
      return;
    }
    if (newPassword !== confirmedPassword) {
      setStatus('New passwords do not match.');
      return;
    }
    try {
      await updatePassword(user.token, currentPassword, newPassword); /// import function from auth service file
      setStatus('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmedPassword('');
    } catch (error) {
      console.error(`Oh no, there's a problem updating your password: `, error)
      setStatus('Failed to update password. Please check your current password.');
    }
  }

  const handleDeleteUser = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setStatus('');
    try {
      const response = await deleteUser(user.token); /// import function from auth service file
      if (response.ok) {
        auth?.logout()
        navigate('/');
      } else {
        console.error(`Oh no, there's a problem with the server.`);
      }
    } catch (error) {
      console.error(`Oh no, we haven't been able to reach the server: `, error)
      setStatus('Failed to delete account. Please try again.');
    }
  }


  return (
    <div>
      <div>
        <h4>User Profile</h4>
        <h6>Name</h6>
        <p>{user.firstName} {user.lastName}</p>
        <h6>Email</h6>
        <p>{user.email}</p>
      </div>
      <div>
        <form onSubmit={handleUpdatePassword} className="edit-form">
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Please enter your current password"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Please enter a new password"
          />
          <input
            type="password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            placeholder="Please confirm your new password"
          />
          <div className="button-row">
            <button type="submit" className="save-button">Save</button>
            <button type="button" onClick={handleDeleteUser} className="delete-account-button">Delete</button>
          </div>
        </form>
      </div>
      {status && <h6 className="status-message">{status}</h6>}
    </div>
  );
}

export default UserProfile;