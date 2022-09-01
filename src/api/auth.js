const authURL = 'https://webdev.alphacamp.io/api/auth';

export const register = async ({ username, email, password }) => {
  const res = await fetch(`${authURL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  return res.json();
};

export const login = async (data) => {
  console.log('data', data);
  const res = await fetch(`${authURL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: data.username,
      password: data.password,
    }),
  });

  return res.json();
};

export const checkTokenExpired = async (authToken) => {
  try {
    const res = await fetch(`${authURL}/test-token`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken,
      },
    });
    return res.json();
  } catch (error) {
    return error;
  }
};

export const logout = () => {
  localStorage.removeItem('authToken');
};
