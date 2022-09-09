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
          onToggleDone={onToggleDone}
          onChangeMode={({ id, isEdit }) => onChangeMode?.({ id, isEdit })}
          onDelete={(id) => onDelete?.(id)}
        />
      ))}
    </div>
  );
};

export default TodoCollection;
