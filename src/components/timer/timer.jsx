/* eslint-disable */
import './timer.css';
import React from 'react';

export default class Timer extends React.Component {
  state = {
      sec: this.props.sec,
      min: this.props.min,
      clearInterval: null,
    };
      start = () => {
        if(!this.state.clearInterval) {
          const timerId = setInterval(this.props.onTick, 1000);
        this.setState({
          clearInterval: timerId,
        });
        }
      };
      stop = () => {
        clearInterval(this.state.clearInterval);
      };
      componentWillUnmount() {
        this.stop();
        clearInterval(this.state.clearInterval);
      }
      componentDidMount() {
        this.setState({
          sec: this.props.sec,
          min: this.props.min,
        });
      };
    render() {
        return (
            <span className="timer">
            <button onClick={this.start} className="iconPlay"></button>
            <button onClick={this.stop} className="iconPause"></button>
            <span className="time"> {`${this.props.min}:${this.props.sec <= 9 ? 0 : ''}${this.props.sec}`}</span>
            </span>
        );
    };
};
