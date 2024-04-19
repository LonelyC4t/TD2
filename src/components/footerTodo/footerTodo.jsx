import PropTypes from 'prop-types';

import TaskFilter from './taskFilter';

import './footerTodo.css';

const FooterTodo = ({ todos, clearDone, filter }) => {
  let countDone = todos.filter((el) => !el.done).length;

  FooterTodo.defaultProps = {
    todos: {},
    clearDone: () => {},
    filter: () => {},
  };

  FooterTodo.propType = {
    todos: PropTypes.arrayOf(PropTypes.object),
    clearDone: PropTypes.func,
    filter: PropTypes.func,
  };

  return (
    <footer className="footer">
      <span className="todo-count">{`${countDone} items left`} </span>
      <TaskFilter filter={filter} />
      <button onClick={clearDone} className="clear-completed">
        {' '}
        Clear completed
      </button>
    </footer>
  );
};
export default FooterTodo;
