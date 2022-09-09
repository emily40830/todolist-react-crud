import { Footer, Header, TodoCollection, TodoInput } from 'components';

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
  return (
    <div>
      <Header username={'admin'} />
      <TodoInput />
      <TodoCollection todos={dummyTodos} />
      <Footer numOfTodos={0} />
    </div>
  );
};

export default TodoPage;
