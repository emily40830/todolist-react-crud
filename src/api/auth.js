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

export const logout = () => {
  localStorage.removeItem('authToken');
};
