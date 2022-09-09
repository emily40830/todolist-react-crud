import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState } from 'react';

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

  const handleChange = (value) => {
    setInputValue(value);
  };

  const handleAddTodo = () => {
    if (inputValue.length === 0) {
      return;
    }
    setTodos([
      ...todos,
      { id: Math.random() * 100, title: inputValue, isDone: false },
    ]);
    setInputValue('');
  };

  const handleKeyPress = () => {
    if (inputValue.length === 0) {
      return;
    }
    setTodos([
      ...todos,
      { id: Math.random() * 100, title: inputValue, isDone: false },
    ]);
    setInputValue('');
  };

  const handleToggleTodoItem = (id) => {
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

  const handleSave = ({ id, title }) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title, isEdit: false };
        }
        return todo;
      });
    });
  };

  return (
    <div>
      <Header username={'admin'} />
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
      />
      <Footer numOfTodos={0} />
    </div>
  );
};

export default TodoPage;
