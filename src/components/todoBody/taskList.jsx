import PropTypes from 'prop-types';

import Task from './task';
import './taskList.css';

const TaskList = ({
  todos,
  deleteTask,
  completeTask,
  stateFilter,
  changeTask,
  changeLabelTask,
  onTickTimer,
  deleteInterval,
}) => {
  TaskList.defaultProps = {
    todos: {},
    completeTask: () => {},
    deleteTask: () => {},
    stateFilter: undefined,
  };

  TaskList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    completeTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    stateFilter: PropTypes.oneOf([true, false, undefined]),
  };

  let elementTask = todos
    .filter((el) => {
      if (stateFilter === true) {
        return !el.done;
      } else if (stateFilter === false) {
        return el.done;
      } else {
        return el;
      }
    })
    .map((el) => {
      return (
        <li className={el.done ? 'completed' : 'active'} key={el.id}>
          <Task
            onTickTimer={() => onTickTimer(el.id)}
            deleteTask={() => deleteTask(el.id)}
            completeTask={() => completeTask(el.id)}
            todos={el}
            changeTask={changeTask}
            changeLabelTask={changeLabelTask}
            deleteInterval={deleteInterval}
          />
        </li>
      );
    });

  return <ul className="todo-list">{elementTask}</ul>;
};

export default TaskList;
