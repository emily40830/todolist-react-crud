import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getTodos, createTodo, patchTodo, deleteTodo } from 'api/todos';
import { useAuth } from 'contexts/AuthContext';

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);

  const { isAuthenticated, currentMember } = useAuth();

  const handleChange = (value) => {
    setInputValue(value);
  };

  const handleAddTodo = async () => {
    if (inputValue.length === 0) {
      return;
    }

    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });
      setTodos((prevTodos) => {
        return [...prevTodos, { ...data, isDone: false }];
      });
      setInputValue('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyPress = async () => {
    if (inputValue.length === 0) {
      return;
    }

    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });
      setTodos((prevTodos) => {
        return [...prevTodos, { ...data, isDone: false }];
      });
      setInputValue('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleTodoItem = (id) => async () => {
    const currentTodo = todos.find((todo) => todo.id === id);

    try {
      await patchTodo({
        id,
        isDone: !currentTodo.isDone,
      });

      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, isDone: !todo.isDone };
          }
          return todo;
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeMode = ({ id, isEdit }) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isEdit };
        }
        return { ...todo, isEdit: false };
      });
    });
  };

  const handleSave = async ({ id, title }) => {
    try {
      await patchTodo({
        id,
        title,
      });
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, title, isEdit: false };
          }
          return todo;
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id) => async () => {
    await deleteTodo(id);

    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    getTodos()
      .then((todos) => {
        setTodos(todos.map((todo) => ({ ...todo, isEdit: false })));
      })
      .catch((err) => console.log(err));
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Header username={currentMember.name} />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyPress={handleKeyPress}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleTodoItem}
        onChangeMode={handleChangeMode}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <Footer numOfTodos={todos.length} on />
    </div>
  );
};

export default TodoPage;
