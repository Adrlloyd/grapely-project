const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function updateName( token: string , firstName: string, lastName: string ) {
  const response = await fetch(`${BASE_URL}/api/user/name`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ firstName, lastName }),
  });
  if (!response.ok) {
    console.log(`Problem accessing server to update name`);
  }
  return response;
}

async function updatePassword( token: string , currentPassword: string, newPassword: string ) {
  const response = await fetch(`${BASE_URL}/api/user/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  if (!response.ok) {
    console.log(`Problem accessing server to update password`);
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

export { updateName, updatePassword, deleteUser }