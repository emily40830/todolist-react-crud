import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from 'contexts/AuthContext';

const dummyTodos = [
  {
    id: 1,
    title: 'Learn React',
    isDone: true,
  },
  {
    id: 2,
    title: 'Learn React Router',
    isDone: false,
  },
  {
    id: 3,
    title: 'Learn React Hook',
    isDone: true,
  },
];

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState(dummyTodos);

  const { isAuthenticated, currentMember } = useAuth();

  const handleChange = (value) => {
    setInputValue(value);
  };

  const handleAddTodo = async () => {
    if (inputValue.length === 0) {
      return;
    }

    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { id: Math.random() * 100, title: inputValue, isDone: false },
      ];
    });
    setInputValue('');
  };

  const handleKeyPress = async () => {
    if (inputValue.length === 0) {
      return;
    }

    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { id: Math.random() * 100, title: inputValue, isDone: false },
      ];
    });
    setInputValue('');
  };

  const handleToggleTodoItem = (id) => async () => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      });
    });
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
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title, isEdit: false };
        }
        return todo;
      });
    });
  };

  const handleDelete = (id) => async () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Header username={currentMember?.name} />
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
      <Footer numOfTodos={todos.length} />
    </div>
  );
};

export default TodoPage;
