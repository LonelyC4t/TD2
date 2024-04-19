import FooterTodo from '../footerTodo/footerTodo';

import TaskList from './taskList';
import './todoBody.css';

const TodoBody = ({ todos, deleteTask, completeTask, clearDone, filter, stateFilter }) => {
  return (
    <section className="main">
      <TaskList deleteTask={deleteTask} todos={todos} completeTask={completeTask} stateFilter={stateFilter} />
      <FooterTodo filter={filter} clearDone={clearDone} todos={todos} />
    </section>
  );
};

export default TodoBody;
