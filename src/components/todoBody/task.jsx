import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

const Task = ({ todos, completeTask, deleteTask }) => {
  Task.defaultProps = {
    todos: {},
    completeTask: () => {},
    deleteTask: () => {},
  };

  Task.propTypes = {
    todos: PropTypes.object.isRequired,
    completeTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
  };

  return (
    <>
      <div className="view">
        <input type="chekbox" className="toggle" />
        <label htmlFor="">
          <span onClick={completeTask} className="description">
            {todos.label}
          </span>
          <span className="created">
            {formatDistanceToNow(new Date(todos.createTime), { includeSeconds: true, addSuffix: true })}
          </span>
        </label>
        <button className="icon icon-edit"></button>
        <button onClick={deleteTask} className="icon icon-destroy"></button>
      </div>
      {/* <input type="text" className="edit" defaultValue={"Editing Task"} /> */}
    </>
  );
};

export default Task;
