import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';

const TodoItem = ({ todo, onDelete, onSave, onToggleIsDone, updateIsEdit }) => {
  const [tempTodo, setTempTodo] = useState(todo.title);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setTempTodo(e.target.value);
  };

  // autofocus when input is in edit mode
  useEffect(() => {
    if (todo.isEdit) {
      inputRef.current.focus();
    }
  }, [todo.isEdit]);

  const handleKeyDown = (event) => {
    // keyCode 13 一定是 enter，但 enter 的 keyCode 不一定是 13
    if (event.keyCode === 13 && tempTodo.length !== 0) {
      onSave &&
        onSave({
          id: todo.id,
          title: tempTodo,
          isDone: todo.isDone,
        });
    }

    // keyCode 27 是 Escape
    if (event.keyCode === 27) {
      // 取消儲存
      updateIsEdit &&
        updateIsEdit({
          id: todo.id,
          isEdit: false,
        });

      // 把 tempTodo 改成修改前的內容
      setTempTodo(todo.title);
    }
  };

  return (
    <div
      className={clsx('task-item', {
        done: todo.isDone,
        edit: todo.isEdit,
      })}
    >
      <div className="task-item-checked">
        <span
          className="icon icon-checked"
          onClick={onToggleIsDone && onToggleIsDone(todo.id)}
        />
      </div>
      <div
        className="task-item-body"
        onDoubleClick={() =>
          updateIsEdit && updateIsEdit({ id: todo.id, isEdit: true })
        }
      >
        <span className="task-item-body-text">{todo.title}</span>
        <input
          ref={inputRef}
          className="task-item-body-input"
          type="text"
          placeholder="新增工作"
          value={tempTodo}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="task-item-action">
        <button
          className="btn-reset btn-destroy icon"
          onClick={onDelete && onDelete(todo.id)}
        >
          {' '}
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
