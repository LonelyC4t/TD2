import FooterTodo from '../footerTodo/footerTodo';

import TaskList from './taskList';
import './todoBody.css';

const TodoBody = ({
  todos,
  deleteTask,
  completeTask,
  clearDone,
  filter,
  stateFilter,
  changeTask,
  changeLabelTask,
  onTickTimer,
}) => {
  return (
    <section className="main">
      <TaskList
        onTickTimer={onTickTimer}
        deleteTask={deleteTask}
        todos={todos}
        completeTask={completeTask}
        stateFilter={stateFilter}
        changeTask={changeTask}
        changeLabelTask={changeLabelTask}
      />
      <FooterTodo filter={filter} clearDone={clearDone} todos={todos} />
    </section>
  );
};

export default TodoBody;
