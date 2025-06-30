import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/UserProfile.css';
import { useAuth } from '../context/useAuth';
import { updateName, updatePassword, deleteUser } from '../services/userService';
import NameModal from './Modals/NameModal';
import PasswordModal from './Modals/PasswordModal';
import DeleteModal from './Modals/DeleteModal';

function UserProfile() {

  const { user, login, logout } = useAuth()

  const [activeModal, setActiveModal] = useState<'name' | 'password' | 'delete' | null>(null);

  const navigate = useNavigate(); //To be used for the 'deleteAccount' function - also set {replace:true} as argument to disable return nav through back button
  const [status, setStatus] = useState<string>('');

  if (!user) return null;

    const handleUpdateName = async (firstName: string | undefined, lastName: string | undefined) => {
    setStatus('');
    if (!firstName || !lastName ) {
      setStatus('Please fill in all name fields.');
      return;
    }
    try {
      await updateName(user.token, firstName, lastName);
      login({...user, firstName, lastName})
      setStatus('Name updated successfully.');
      setActiveModal(null);
    } catch (error) {
      console.error(`Oh no, there's a problem updating your name: `, error)
      setStatus('Failed to update name.');
    }
  }

  const handleUpdatePassword = async (currentPassword: string, newPassword: string, confirmedPassword: string) => {
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
      setActiveModal(null);
    } catch (error) {
      console.error(`Oh no, there's a problem updating your password: `, error)
      setStatus('Failed to update password. Please check your current password.');
    }
  }

  const handleDeleteUser = async () => {
    setStatus('');
    try {
      const response = await deleteUser(user.token); /// import function from auth service file
      if (response.ok) {
        logout()
        navigate('/', {replace:true});
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
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className="button-row">
        <button onClick={() => setActiveModal('name')}>Update Name</button>
        <button onClick={() => setActiveModal('password')}>Change Password</button>
        <button onClick={() => setActiveModal('delete')}>Delete Account</button>
      </div>
      {status && <h6 className="status-message">{status}</h6>}
      {activeModal === 'name' && (
        <NameModal onSubmit={handleUpdateName} onCancel={() => setActiveModal(null)}/>
      )}
      {activeModal === 'password' && (
        <PasswordModal onSubmit={handleUpdatePassword} onCancel={() => setActiveModal(null)}/>
      )}
      {activeModal === 'delete' && (
        <DeleteModal onConfirm={handleDeleteUser} onCancel={() => setActiveModal(null)}/>
      )}
    </div>
  );
}

export default UserProfile;