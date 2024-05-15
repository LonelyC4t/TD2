import './timer.css';
import React from 'react';
export default class Timer extends React.Component {
  state = {
    sec: this.props.sec,
    min: this.props.min,
    interval_id: null,
  };
  start = () => {
    if (this.state.interval_id == null) {
      const timerId = setInterval(() => this.props.onTick(this.state.interval_id), 1000);
      this.setState({
        interval_id: timerId,
      });
    }
  };
  stop = () => {
    clearInterval(this.state.interval_id);
    this.setState({
      interval_id: null,
    });
  };

  componentDidMount() {
    this.setState({
      sec: this.props.sec,
      min: this.props.min,
    });
  }
  componentWillUnmount() {
    if (this.props.done) {
      this.stop();
    } else {
      this.props.deleteInterval(this.state.interval_id);
      console.log('else');
    }
  }
  render() {
    return (
      <span className="timer">
        <button onClick={this.start} className="iconPlay"></button>
        <button onClick={this.stop} className="iconPause"></button>
        <span className="time"> {`${this.props.min}:${this.props.sec <= 9 ? 0 : ''}${this.props.sec}`}</span>
      </span>
    );
  }
}
