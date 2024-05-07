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
      min: 0,
      sec: 0,
    };
  };

  changeTask = (e) => {
    let current = e.target.previousSibling.querySelector('input');
    let currentHiden = e.target.previousSibling.querySelector('span');
    current.classList.toggle('hidden');
    currentHiden.classList.toggle('hidden');
    return this.setState({
      dom: { current, currentHiden },
    });
  };

  changeLabelTask = (label, id) => {
    this.setState(({ todoData, dom }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = oldItem;
      newItem.label = label;
      let newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      let current = dom.current.classList.add('hidden');
      let currentHiden = dom.currentHiden.classList.remove('hidden');
      return {
        todoData: newArr,
        dom: { current, currentHiden },
      };
    });
  };

  changeFilter = (e) => {
    document.querySelectorAll('button').forEach((item) => {
      if (e.target == e.Currenttarget) {
        return;
      } else {
        item.classList.remove('selected');
      }
    });
    e.target.classList.toggle('selected');

    if (e.target.textContent === 'All') {
      this.setState({
        filter: undefined,
      });
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
    todoData: [],
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
      let newArray = [...todoData.slice(0, idx), ...todoData.slice(-1)];
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

  onTickTimer = (id) => {
    this.setState(({ todoData }) => {
      let idx = todoData.findIndex((el) => el.id === id);
      let oldItem = todoData[idx];
      let newItem = {};
      if (oldItem.sec >= 59) {
        newItem = { ...oldItem, sec: 0, min: oldItem.min + 1 };
      } else {
        newItem = { ...oldItem, sec: oldItem.sec + 1 };
      }

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
          onTickTimer={this.onTickTimer}
          deleteTask={this.deleteTask}
          completeTask={this.completeTask}
          todos={this.state.todoData}
          clearDone={this.clearCompleted}
          filter={this.changeFilter}
          stateFilter={this.state.filter}
          changeTask={this.changeTask}
          changeLabelTask={this.changeLabelTask}
        />
      </section>
    );
  }
}

export default App;
