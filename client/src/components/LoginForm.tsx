import { useState } from 'react';
import { useNavigate } from "react-router";
import { useAuth } from '../context/useAuth';

const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const response = await fetch('/api/auth/login', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })

      });

      if (!response.ok) throw new Error('Invalid login');

      const data = await response.json();
      login({
        token: data.token,
        firstName: data.firstName,
        lastName: data.lastName,
      })

      // redirect to Home // to adjust
      const redirectTo = '/';
      navigate(redirectTo);

    } catch (error) {
      // Pop up for user
      alert('Login failed');
      // Error for dev
      console.error('Login failed:', error);
    }

  };

return (
  <>
  <form onSubmit = {handleSubmit}>

    <label>Email:
      <input value={email} onChange={e => setEmail(e.target.value)} required />
    </label>

    <label>Password:
      <input value={password} onChange={e => setPassword(e.target.value)} required />
    </label>

    <button type="submit">Log in</button>

  </form>
      </>
)

};

export default LoginForm;