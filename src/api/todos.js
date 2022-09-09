const baseURL = 'http://localhost:3001';

export const getTodos = async () => {
  return fetch(`${baseURL}/todos`)
    .then((res) => res.json())
    .catch((err) => console.error('[Get Todos failed]:', err));
};

export const createTodo = async (payload) => {
  const { title, isDone } = payload;

  try {
    const res = await fetch(`${baseURL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        isDone,
      }),
    });
    return res.json();
  } catch (error) {
    console.error('[Create Todo failed]:', error);
  }
};

export const patchTodo = async (payload) => {
  const { id, title, isDone } = payload;

  try {
    const res = await fetch(`${baseURL}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        isDone,
      }),
    });

    return res.json();
  } catch (error) {
    console.error('[Patch Todo failed]:', error);
  }
};

export const deleteTodo = async (id) => {
  const res = await fetch(`${baseURL}/todos/${id}`, {
    method: 'DELETE',
  });

  return res.json();
};
