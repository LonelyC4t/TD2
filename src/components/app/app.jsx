import React from 'react';

import Header from '../header/header';
import TodoBody from '../todoBody/todoBody';
import './app.css';

class App extends React.Component {
  filter = true;
  maxId = 100;

  createTodoitem = (label, min, sec) => {
    return {
      label,
      id: this.maxId++,
      done: false,
      createTime: new Date(),
      min,
      sec,
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

  addTask = (label, min, sec) => {
    if (sec > 60) sec = 59;
    if (sec < 0) sec = 0;
    if (min < 0) min = 0;
    if (min.length > 1) min = min.slice(0, 2);
    if (min == '') min = 0;
    if (sec == '') sec = 0;
    let newItem = this.createTodoitem(label, min, sec);
    this.setState(({ todoData }) => {
      let newArr = [...todoData, newItem];

      return {
        todoData: newArr,
      };
    });
  };
  deleteInterval = (idInt) => {
    console.log(idInt);
    this.setState({
      interval_id: idInt,
    });
  };
  deleteTask = (id) => {
    this.completeTask(id);
    console.log(this.state.interval_id);
    clearInterval(this.state.interval_id);
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

      if (!oldItem && !oldItem) {
        return;
      }
      if (oldItem.min == 0 && oldItem.sec == 0) {
        newItem = { ...oldItem, min: 0, sec: 0 };
        let newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
        return {
          todoData: newArray,
        };
      }

      if (oldItem.sec == 0) {
        newItem = { ...oldItem, sec: 59, min: oldItem.min - 1 };
      } else {
        newItem = { ...oldItem, sec: oldItem.sec - 1 };
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
          deleteInterval={this.deleteInterval}
        />
      </section>
    );
  }
}

export default App;
