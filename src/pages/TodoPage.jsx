import { Footer, Header, TodoCollection, TodoInput } from 'components';

const TodoPage = () => {
  return (
    <div>
      <Header username={'admin'} />
      <TodoInput />
      <TodoCollection todos={[]} />
      <Footer numOfTodos={0} />
    </div>
  );
};

export default TodoPage;
