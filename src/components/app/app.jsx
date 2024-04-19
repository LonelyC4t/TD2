import React from 'react';

import Header from '../header/header';
import TodoBody from '../todoBody/todoBody';
import './app.css';

class App extends React.Component {
  filter = true;
  maxId = 100;

  createTodoitem = (label) => {
    return {
      label,
      id: this.maxId++,
      done: false,
      createTime: new Date(),
    };
  };

  changeFilter = (e) => {
    e.target.classList.toggle('selected');
    if (e.target.textContent === 'All') {
      this.setState({
        filter: undefined,
      });
      this.filter = undefined;
    } else if (e.target.textContent === 'Active') {
      this.setState({
        filter: true,
      });
    } else if (e.target.textContent === 'Completed') {
      this.setState({
        filter: false,
      });
    }
  };

  state = {
    todoData: [
      this.createTodoitem('Complete Tak'),
      this.createTodoitem('Editing Task'),
      this.createTodoitem('Active Task'),
    ],

    filter: undefined,
  };

  addTask = (label) => {
    let newItem = this.createTodoitem(label);
    this.setState(({ todoData }) => {
      let newArr = [...todoData, newItem];

      return {
        todoData: newArr,
      };
    });
  };

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      let idx = todoData.findIndex((el) => el.id === id);
      let newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return { todoData: newArray };
    });
  };

  clearCompleted = () => {
    let newArr = this.state.todoData.filter((el) => !el.done);

    this.setState({
      todoData: newArr,
    });
  };

  completeTask = (id) => {
    this.setState(({ todoData }) => {
      let idx = todoData.findIndex((el) => el.id === id);
      let oldItem = todoData[idx];
      let newItem = { ...oldItem, done: !oldItem.done };

      let newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  render() {
    return (
      <section className="todoapp">
        <Header addTask={this.addTask} />
        <TodoBody
          deleteTask={this.deleteTask}
          completeTask={this.completeTask}
          todos={this.state.todoData}
          clearDone={this.clearCompleted}
          filter={this.changeFilter}
          stateFilter={this.state.filter}
        />
      </section>
    );
  }
}

export default App;
