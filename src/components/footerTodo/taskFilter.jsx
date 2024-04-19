import './taskFilter.css';

const TaskFilter = ({ filter }) => {
  return (
    <ul className="filters">
      <li>
        <button onClick={filter} className="selected">
          All
        </button>
      </li>
      <li>
        <button onClick={filter}>Active</button>
      </li>
      <li>
        <button onClick={filter}>Completed</button>
      </li>
    </ul>
  );
};

export default TaskFilter;
