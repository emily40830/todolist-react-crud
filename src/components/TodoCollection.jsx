import TodoItem from './TodoItem';

const TodoCollection = ({
  todos,
  onDelete,
  onSave,
  onToggleIsDone,
  updateIsEdit,
}) => (
  <div className="todos">
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onDelete={(id) => onDelete && onDelete(id)}
        onSave={({ id, title, isDone }) =>
          onSave && onSave({ id, title, isDone })
        }
        onToggleIsDone={(id) => {
          onToggleIsDone && onToggleIsDone(id);
        }}
        updateIsEdit={({ id, isEdit }) =>
          updateIsEdit && updateIsEdit({ id, isEdit })
        }
      />
    ))}
  </div>
);

export default TodoCollection;
