import React from 'react';
import { startTracking, stopTracking, subscribe } from './speed';

export default React.createClass({
  getInitialState() {
    return {
      speed: 0.0,
      flip: true,
    };
  },
  componentDidMount() {
    this.unsubscribe = subscribe(speed => {
      if (speed > 999) {
        this.setState({ speed: 999.0 });
      } else if (speed < 0) {
        this.setState({ speed: 0.0 });
      } else {
        this.setState({ speed });
      }
    });
    startTracking();
  },
  componentWillUnmount() {
    this.unsubscribe();
    stopTracking();
  },
  flip() {
    this.setState({ flip: !this.state.flip });
  },
  render() {
    const style = {
      display: 'flex',
      justifyContent: 'right',
      alignItems: 'center',
      transform: this.state.flip ? 'scale(-1, 1)' : 'scale(1, 1)',
      backgroundColor: 'black',
      color: 'white',
      width: '100%',
    };
    const speedStyle = {
      width: '100%',
      fontSize: '70vh',
      letterSpacing: '-6vw',
      fontFamily: 'monospace',
      color: this.state.speed > 133.0 ? 'red' : 'white',
    };
    const labelStyle = {
      marginLeft: '6vw',
      fontSize: '30vh',
      fontFamily: 'monospace',
      color: 'white',
    };
    return (
      <div style={style} onClick={this.flip}>
        <span style={speedStyle}>{this.state.speed.toFixed(0)}</span>
        <span style={labelStyle}>Km/h</span>
      </div>
    );
  },
});
