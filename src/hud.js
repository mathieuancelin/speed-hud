/* eslint max-len: 0 */

import React from 'react';
import { startTracking, stopTracking, subscribe, position } from './speed';

export default React.createClass({
  getInitialState() {
    return {
      speed: 0.0,
      flip: true,
      error: null,
    };
  },
  componentDidMount() {
    this.unsubscribe = subscribe(speed => {
      if (speed.error) {
        this.setState({ error: speed.error });
      } else {
        if (speed > 999) {
          this.setState({ speed: 999.0, error: null });
        } else if (speed < 0) {
          this.setState({ speed: 0.0, error: null });
        } else {
          this.setState({ speed, error: null });
        }
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
      justifyContent: 'space-between',
      alignItems: 'center',
      transform: this.state.flip ? 'scale(-1, 1)' : 'scale(1, 1)',
      backgroundColor: 'black',
      color: 'white',
      width: '100vw',
      height: '100vh',
    };
    const speedStyle = {
      fontSize: '70vh',
      letterSpacing: '-6vw',
      fontFamily: 'monospace',
      color: this.state.speed > 133.0 ? 'red' : 'white',
      fontWeight: 'bold',
      marginLeft: '1vw',
    };
    const labelStyle = {
      marginLeft: '6vw',
      marginRight: '1vw',
      fontSize: '30vh',
      fontFamily: 'monospace',
      color: 'white',
    };
    const message = `${position().timestamp} : ${position().coords.latitude},${position().coords.longitude} : ${position().coords.speed} : ${this.state.speed}`;
    return (
      <div>
        <div style={style} onClick={this.flip}>
          <span style={speedStyle}>{this.state.speed.toFixed(0)}</span>
          <span style={labelStyle}>Km/h</span>
        </div>
        <span style={{ color: 'yellow' }}>{message}</span>
        <span style={{ color: 'red' }}>{this.state.error ? `${this.state.error.code}: ${this.state.error.message}` : ''}</span>
      </div>
    );
  },
});
