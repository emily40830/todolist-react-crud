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
          onSave={({ id, title }) => onSave?.({ id, title })}
          onToggleDone={(id) => onToggleDone?.(id)}
          onChangeMode={({ id, isEdit }) => onChangeMode?.({ id, isEdit })}
        />
      ))}
    </div>
  );
};

export default TodoCollection;
