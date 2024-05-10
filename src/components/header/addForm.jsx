import './addForm.css';
import React from 'react';

class AddForm extends React.Component {
  state = {
    label: '',
    min: '',
    sec: '',
  };

  onChange = (e) => {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.label.length === 0) {
      return;
    } else if (this.state.label.trim().length === 0) {
      this.setState({ label: '', min: '', sec: '' });
    } else if (this.state.label.length > 0) {
      this.props.addTask(this.state.label, this.state.min, this.state.sec);
      this.setState({ label: '', min: '', sec: '' });
    }
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="label"
          value={this.state.label}
          onChange={this.onChange}
          className="new-todo"
          placeholder="What needs to be don3 ?"
          type="text"
        />
        <input
          name="min"
          onChange={this.onChange}
          value={this.state.min}
          className="new-todo__time"
          placeholder="min"
          type="number"
        />
        <input
          name="sec"
          onChange={this.onChange}
          value={this.state.sec}
          className="new-todo__time"
          placeholder="sec"
          type="number"
        />
        <button type="submit"> </button>
      </form>
    );
  }
}

export default AddForm;
