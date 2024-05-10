import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import Taimer from '../timer/timer';

import './task.css';

class Task extends React.Component {
  state = {
    label: this.props.todos.label,
  };

  onChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.changeLabelTask(this.state.label, this.props.todos.id);
  };

  static defaultProps = {
    todos: {},
    completeTask: () => {},
    deleteTask: () => {},
  };

  static propTypes = {
    todos: PropTypes.object.isRequired,
    completeTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
  };

  render() {
    const { todos, completeTask, deleteTask, changeTask } = this.props;
    return (
      <>
        <div className="view">
          <input type="chekbox" className="toggle" />
          <label htmlFor="">
            <span onClick={completeTask} className="description">
              {todos.label}
            </span>
            <Taimer sec={this.props.todos.sec} min={this.props.todos.min} onTick={this.props.onTickTimer} />
            <form onSubmit={this.onSubmit}>
              <input type="text" onChange={this.onChange} className="editing hidden" defaultValue={todos.label} />
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
  }
}

export default Task;
