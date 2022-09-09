import TodoItem from './TodoItem';

const TodoCollection = ({
  todos,
  onDelete,
  onSave,
  onToggleIsDone,
  onChangeMode,
}) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  );
};

export default TodoCollection;
