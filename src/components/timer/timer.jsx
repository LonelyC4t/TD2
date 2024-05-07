/* eslint-disable */
import React from 'react';
import './timer.css';

export default class Timer extends React.Component {
  state = {
    sec: this.props.sec,
    min: this.props.min,
    clearInterval: null,
  };
  start = () => {
    const timerId = setInterval(this.props.onTick, 1000);
    this.setState({
      clearInterval: timerId,
    });
  };
  stop = () => {
    clearInterval(this.state.clearInterval);
  };
  componentWillUnmount() {
    this.stop();
  }
  componentDidMount() {
    this.setState({
      sec: this.props.sec,
      min: this.props.min,
    });
  }

  render() {
    return (
      <span className="timer">
        <button onClick={this.start} className="iconPlay"></button>
        <button onClick={this.stop} className="iconPause"></button>
        <span className="time"> {`${this.props.min}:${this.props.sec <= 9 ? 0 : ''}${this.props.sec}`} </span>
      </span>
    );
  }
}
