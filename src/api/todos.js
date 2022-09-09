const baseURL = 'http://localhost:3001';

export const getTodos = () => {
  return fetch(`${baseURL}/todos`)
    .then((res) => res.json())
    .catch((err) => console.error('[Get Todos failed]:', err));
};
