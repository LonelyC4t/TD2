import './addForm.css';
import React from 'react';

class AddForm extends React.Component {
  state = {
    label: '',
  };

  onChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.label.length === 0) {
      return;
    } else if (this.state.label.trim().length === 0) {
      this.setState({ label: '' });
    } else if (this.state.label.length > 0) {
      this.props.addTask(this.state.label);
      this.setState({ label: '' });
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={this.state.label}
          onChange={this.onChange}
          className="new-todo"
          placeholder="What needs to be don3 ?"
          type="text"
        />
      </form>
    );
  }
}

export default AddForm;
