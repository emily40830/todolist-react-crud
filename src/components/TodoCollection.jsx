import TodoItem from './TodoItem';

const TodoCollection = ({
  todos,
  onDelete,
  onSave,
  onToggleIsDone,
  onChangeMode,
}) => {
  return (
    <>
      <div>TodoCollection</div>
      {todos.map((todo) => (
        <TodoItem todo={todo} />
      ))}
    </>
  );
};

export default TodoCollection;
