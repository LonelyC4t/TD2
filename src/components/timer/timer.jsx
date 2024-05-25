import './timer.css';
import React, { useEffect, useState } from 'react';

const Timer = ({ deleteInterval, sec, min, done, onTick }) => {
  // eslint-disable-next-line no-unused-vars
  const [time, setTime] = useState({
    min,
    sec,
  });
  const [interval_id, setInterval_id] = useState(null);

  const start = () => {
    if (interval_id == null) {
      const timerId = setInterval(() => onTick(interval_id), 1000);
      setInterval_id(timerId);
    }
  };

  const stop = () => {
    clearInterval(interval_id);
    setInterval_id(null);
  };

  useEffect(() => {
    setTime({
      sec,
      min,
    });
  }, []);

  useEffect(() => {
    if (done) {
      return stop();
    }
    if (!done) {
      return deleteInterval(interval_id);
    }
  }, [done]);

  return (
    <span className="timer">
      <button onClick={start} className="iconPlay"></button>
      <button onClick={stop} className="iconPause"></button>
      <span className="time"> {`${min}:${sec <= 9 ? 0 : ''}${sec}`}</span>
    </span>
  );
};
export default Timer;
