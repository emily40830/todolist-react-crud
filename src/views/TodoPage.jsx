import { useState, useEffect } from 'react';

import Footer from 'components/Footer';
import Header from 'components/Header';
import TodoCollection from 'components/TodoCollection';
import { getTodos, createTodo, deleteTodo, patchTodo } from 'api/todos';
import { useAuth } from 'contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import AddTodoInput from 'components/common/AddTodoInput';

const TodoPage = () => {
  const { isAuthenticated } = useAuth();
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const numOfTodos = todos.filter((todo) => !todo.isDone).length;

  const handleChange = (targetValue) => {
    setInputValue(targetValue);
  };

  const handleAddTodo = async () => {
    try {
      if (inputValue.length === 0) {
        return;
      }

      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });

      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            ...data,
            isEdit: false,
          },
        ];
      });

      setInputValue('');
    } catch (error) {
      console.log('[handleAddTodo] createTodo failed: ', error);
    }
  };

  const handleKeyPress = async (event) => {
    try {
      if (event.key !== 'Enter') {
        return;
      }

      if (inputValue.length === 0) {
        return;
      }

      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });

      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            ...data,
            isEdit: false,
          },
        ];
      });

      setInputValue('');
    } catch (error) {
      console.log('[handleKeyPress] createTodo failed: ', error);
    }
  };

  const handleDelete = (id) => async () => {
    try {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      await deleteTodo(id);
    } catch (error) {
      console.log('[handleDelete] deleteTodo failed: ', error);
    }
  };

  const handleToggleIsDone = (id) => async () => {
    try {
      const currentTodo = todos.find((t) => t.id === id);

      console.log('id', id);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id !== id) {
            return todo;
          } else {
            return {
              ...todo,
              isDone: !todo.isDone,
            };
          }
        }),
      );

      await patchTodo({
        id,
        title: currentTodo.title,
        isDone: !currentTodo.isDone,
      });
    } catch (error) {
      console.log('[handleToggleIsDone] patchTodo failed: ', error);
    }
  };

  const handleSave = async (payload) => {
    try {
      const { id, title } = payload;

      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id !== id) {
            return todo;
          }
          return { ...todo, title, isEdit: false };
        }),
      );

      await patchTodo({
        id,
        title,
      });
    } catch (error) {
      console.log('[handleSave] patchTodo failed: ', error);
    }
  };

  const updateIsEdit = ({ id, isEdit }) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }
        return { ...todo, isEdit };
      }),
    );
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await getTodos();

        setTodos(
          todos.map((todo) => ({
            ...todo,
            isEdit: false,
          })),
        );
      } catch (error) {
        console.log('fetchTodos error', error);
      }
    };

    fetchTodos();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Header />
      <AddTodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onAddTodo={handleAddTodo}
      />
      <TodoCollection
        todos={todos}
        onDelete={handleDelete}
        onSave={handleSave}
        onToggleIsDone={handleToggleIsDone}
        updateIsEdit={updateIsEdit}
      />
      <Footer numOfTodos={numOfTodos} />
    </div>
  );
};

export default TodoPage;
