import { useState } from 'react';
import { useNavigate } from "react-router";
import { useAuth } from '../../context/useAuth';

const RegisterForm = () => {

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const { login } = useAuth();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (!res.ok) throw new Error('Registration failed');

      const data = await res.json();

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
      alert('Registration failed');
      // Error for dev
      console.error('Registration failed:', error);
    }
  }


  return (
    <>

      <form onSubmit={handleSubmit}>
        <label> First Name
          <input name="firstName" onChange={handleChange} required />
        </label>
        <label> Last Name
          <input name="lastName" onChange={handleChange} required />
        </label>
        <label> Email
          <input name="email" onChange={handleChange} required />
        </label>
        <label> Password
          <input name="password" onChange={handleChange} required />
        </label>
        <button type="submit">Create Account</button>

      </form >

    </>

  )
}

export default RegisterForm;
