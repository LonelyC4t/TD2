import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import Taimer from '../timer/timer';

import './task.css';

const Tasks = ({ todos, completeTask, deleteTask, changeTask, changeLabelTask, onTickTimer, deleteInterval }) => {
  const [label, setLabel] = useState(todos.label);
  const onChange = (e) => {
    setLabel(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    changeLabelTask(label, todos.id);
  };
  Tasks.defaultProps = {
    todos: {},
    completeTask: () => {},
    deleteTask: () => {},
  };

  Tasks.propTypes = {
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
          <Taimer
            deleteInterval={deleteInterval}
            sec={todos.sec}
            min={todos.min}
            done={todos.done}
            onTick={onTickTimer}
          />
          <form onSubmit={onSubmit}>
            <input type="text" onChange={onChange} className="editing hidden" defaultValue={todos.label} />
          </form>
          <span className="created">
            {formatDistanceToNow(new Date(todos.createTime), { includeSeconds: true, addSuffix: true })}
          </span>
        </label>
        <button onClick={(e) => changeTask(e)} className="icon icon-edit"></button>
        <button onClick={deleteTask} className="icon icon-destroy"></button>
      </div>
    </>
  );
};
export default Tasks;
