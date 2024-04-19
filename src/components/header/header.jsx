import AddForm from './addForm';
import './header.css';

const Header = (props) => {
  return (
    <header className="heaeder">
      <h1>todos</h1>
      <AddForm addTask={props.addTask} />
    </header>
  );
};
export default Header;
