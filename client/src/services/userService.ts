import type {  } from '../types/password';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function updatePassword( token: string , currentPassword: string, newPassword: string ) {
  const response = await fetch(`${BASE_URL}/api/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  if (!response.ok) {
    console.log(`You've got a problem here`);
  }
  return response;
}

async function deleteUser( token: string ) {
  return fetch(`${BASE_URL}/api/user`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
}

export { updatePassword, deleteUser }