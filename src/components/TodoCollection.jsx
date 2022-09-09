import TodoItem from './TodoItem';

const TodoCollection = ({
  todos,
  onDelete,
  onSave,
  onToggleDone,
  onChangeMode,
}) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onToggleDone={(id) => onToggleDone?.(id)}
        />
      ))}
    </div>
  );
};

export default TodoCollection;
