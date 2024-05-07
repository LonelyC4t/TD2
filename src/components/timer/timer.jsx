/* eslint-disable */
import React from "react";
import './timer.css';

export default class Timer extends React.Component {

    state = {
        sec: 0,
        min: 0,
        clearInterval: null,
        currentTime: {
            sec: 0,
            min: 0
        }
    };
    tic = () => {
        if(this.state.sec >= 59) {
            this.setState((prevState) => ({
                sec: -1,
                min: prevState.min + 1,
            }));
        };
        this.setState((prevState) => ({
            sec: prevState.sec + 1,
        }));
    };
    start = () => {
        const timerId = setInterval(this.tic, 1000);
        this.setState({
            clearInterval: timerId,
        });
    };
    stop = () => {
        clearInterval(this.state.clearInterval);
    };
    componentWillUnmount() {
       this.stop()
        let second = this.state.sec;
        let minute = this.state.min;
        console.log(minute, second);
        this.setState(({
            currentTime: {
                sec: second, 
                min: 5, 
            }
        }), () => console.log(this.state.currentTime));

    };
    componentDidMount(){

        this.setState({
            sec: this.state.currentTime.sec,
            min: this.state.currentTime.min,
        })
    };
    
    render() {
        
        return (
            <span className="timer">
              <button onClick={this.start} className="iconPlay"></button>
              <button  onClick={this.stop} className="iconPause"></button>
              <span className="time"> {`${this.state.min}:${this.state.sec <= 9 ? 0 : ""}${this.state.sec}`} </span>
            </span>
        );
    };
};