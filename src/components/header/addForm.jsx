import './addForm.css';
import React, { useState } from 'react';

const AddForm = ({ addTask }) => {
  const [task, setTask] = useState({
    label: '',
    min: '',
    sec: '',
  });
  const onChange = (e) => {
    let name = e.target.name;
    setTask((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (task.label.length === 0) {
      return;
    }
    if (task.label.trim().length === 0) {
      return setTask({ label: '', min: '', sec: '' });
    }
    if (task.label.length > 0) {
      addTask(task.label, task.min, task.sec), setTask({ label: '', min: '', sec: '' });
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        name="label"
        value={task.label}
        onChange={onChange}
        className="new-todo"
        placeholder="What needs to be don3 ?"
        type="text"
      />
      <input
        name="min"
        onChange={onChange}
        value={task.min}
        className="new-todo__time"
        placeholder="min"
        type="number"
      />
      <input
        name="sec"
        onChange={onChange}
        value={task.sec}
        className="new-todo__time"
        placeholder="sec"
        type="number"
      />
      <button type="submit"> </button>
    </form>
  );
};
export default AddForm;
