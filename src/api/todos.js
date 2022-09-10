import axios from 'axios';

const baseURL = 'http://localhost:3001';

export const getTodos = async () => {
  return axios
    .get(`${baseURL}/todos`)
    .then((res) => res.data)
    .catch((err) => console.error('[Get Todos failed]:', err));
};

export const createTodo = async (payload) => {
  const { title, isDone } = payload;

  try {
    const res = await axios.post(`${baseURL}/todos`, {
      title,
      isDone,
    });
    return res.data;
  } catch (error) {
    console.error('[Create Todo failed]:', error);
  }
};

export const patchTodo = async (payload) => {
  const { id, title, isDone } = payload;

  try {
    const res = await axios.patch(`${baseURL}/todos/${id}`, {
      title,
      isDone,
    });

    return res.data;
  } catch (error) {
    console.error('[Patch Todo failed]:', error);
  }
};

export const deleteTodo = async (id) => {
  const res = await axios.delete(`${baseURL}/todos/${id}`);

  return res.data;
};
