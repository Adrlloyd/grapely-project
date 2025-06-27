import { useState } from 'react';
import { useNavigate, Link } from "react-router";
import { useAuth } from '../../context/useAuth';

const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })

      });

      if (!response.ok) throw new Error('Invalid login');

      const data = await response.json();
      login({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        token: data.token,
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

  <div>
    <h6>
      Don't have an account?
      <Link to='/register'> Create one here </Link>
    </h6>
  </div>
      </>
)

};

export default LoginForm;