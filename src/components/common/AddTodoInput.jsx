import clsx from 'clsx';

const AddTodoInput = ({ inputValue, onChange, onKeyPress, onAddTodo }) => (
  <div className={clsx('add-todo', { active: inputValue.length > 0 })}>
    <label className="add-todo-icon icon" htmlFor="add-todo-input"></label>
    <div className="add-todo-input">
      <input
        id="add-todo-input"
        type="text"
        placeholder="新增工作"
        onChange={(e) => onChange && onChange(e.target.value)}
        onKeyPress={(e) => onKeyPress && onKeyPress(e)}
        value={inputValue}
      />
    </div>
    <div className="add-todo-action">
      <button
        className="btn-reset btn-add"
        onClick={() => onAddTodo && onAddTodo()}
      >
        {' '}
        新增{' '}
      </button>
    </div>
  </div>
);

export default AddTodoInput;
