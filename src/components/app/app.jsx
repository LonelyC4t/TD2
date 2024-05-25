import React from 'react';
import { useState, useCallback } from 'react';

import Header from '../header/header';
import TodoBody from '../todoBody/todoBody';

import './app.css';

const App = () => {
  const createTodoitem = (label, min, sec) => {
    return {
      label,
      id: Math.random(),
      done: false,
      createTime: new Date(),
      min,
      sec,
    };
  };
  // eslint-disable-next-line no-unused-vars
  const [dom, setDom] = useState();
  const changeTask = (e) => {
    let current = e.target.previousSibling.querySelector('input');
    let currentHiden = e.target.previousSibling.querySelector('span');
    current.classList.toggle('hidden');
    currentHiden.classList.toggle('hidden');

    return setDom({ current, currentHiden });
  };
  const [todoData, setTodoData] = useState([]);

  const changeLabelTask = (label, id) => {
    setTodoData((prev) => {
      const idx = prev.findIndex((el) => el.id === id);
      const oldItem = prev[idx];
      const newItem = oldItem;
      newItem.label = label;
      let newArr = [...prev.slice(0, idx), newItem, ...prev.slice(idx + 1)];
      return newArr;
    });
    setDom((prev) => {
      let current = prev.current.classList.add('hidden');
      let currentHiden = prev.currentHiden.classList.remove('hidden');
      return { current, currentHiden };
    });
  };

  const addTask = (label, min, sec) => {
    if (sec > 60) sec = 59;
    if (sec < 0) sec = 0;
    if (min < 0) min = 0;
    if (min.length > 1) min = min.slice(0, 2);
    if (min == '') min = 0;
    if (sec == '') sec = 0;
    let newItem = createTodoitem(label, min, sec);

    setTodoData((prevTodoData) => {
      let newArr = [...prevTodoData, newItem];
      return newArr;
    });
  };
  const [filter, setFilter] = useState(undefined);

  const changeFilter = (e) => {
    document.querySelectorAll('button').forEach((item) => {
      if (e.target == e.Currenttarget) {
        return;
      } else {
        item.classList.remove('selected');
      }
    });
    e.target.classList.toggle('selected');

    if (e.target.textContent === 'All') {
      setFilter(undefined);
    } else if (e.target.textContent === 'Active') {
      setFilter(true);
    } else if (e.target.textContent === 'Completed') {
      setFilter(false);
    }
  };
  const [interval_id, setInterval_id] = useState(null);
  const deleteInterval = (idInt) => {
    setInterval_id(idInt);
  };
  const deleteTask = (id) => {
    completeTask(id);
    clearInterval(interval_id);
    setTodoData((prev) => {
      let idx = prev.findIndex((el) => el.id === id);
      let newArray = [...prev.slice(0, idx), ...prev.slice(-1)];
      return newArray;
    });
  };

  const clearCompleted = () => {
    let newArr = todoData.filter((el) => !el.done);
    setTodoData(newArr);
  };

  const completeTask = (id) => {
    setTodoData((prev) => {
      let idx = prev.findIndex((el) => el.id === id);
      let oldItem = prev[idx];
      let newItem = { ...oldItem, done: !oldItem.done };
      let newArray = [...prev.slice(0, idx), newItem, ...prev.slice(idx + 1)];
      return newArray;
    });
  };

  const onTickTimer = useCallback(
    (id) => {
      setTodoData((prevTodoData) =>
        prevTodoData.map((item) => {
          if (item.id !== id) {
            return item;
          }

          let newItem;
          if (item.min === 0 && item.sec === 0) {
            newItem = { ...item, min: 0, sec: 0 };
          } else if (item.sec === 0) {
            newItem = { ...item, sec: 59, min: item.min - 1 };
          } else {
            newItem = { ...item, sec: item.sec - 1 };
          }

          return newItem;
        })
      );
    },
    [setTodoData]
  );

  return (
    <section className="todoapp">
      <Header addTask={addTask} />
      <TodoBody
        onTickTimer={onTickTimer}
        deleteTask={deleteTask}
        completeTask={completeTask}
        todos={todoData}
        clearDone={clearCompleted}
        filter={changeFilter}
        stateFilter={filter}
        changeTask={changeTask}
        changeLabelTask={changeLabelTask}
        deleteInterval={deleteInterval}
      />
    </section>
  );
};
export default App;
