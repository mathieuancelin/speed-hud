/* eslint max-len: 0 */

import React from 'react';
import { startTracking, stopTracking, subscribe } from './speed';

export default React.createClass({
  getInitialState() {
    return {
      flip: true,
      speed: 0.0,
      error: null,
      coords: {
        latitude: 0.0,
        longitude: 0.0,
        speed: 0.0,
      },
      timestamp: Date.now(),
    };
  },
  componentDidMount() {
    this.unsubscribe = subscribe(e => {
      console.log(e);
      const { speed, timestamp, error, coords } = e;
      if (error) {
        this.setState({ error });
      } else {
        if (speed > 999) {
          this.setState({ speed: 999.0, error, timestamp, coords });
        } else if (speed < 0) {
          this.setState({ speed: 0.0, error, timestamp, coords });
        } else {
          this.setState({ speed, error, timestamp, coords });
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
    return (
      <div>
        <div style={style} onClick={this.flip}>
          <span style={speedStyle}>{this.state.speed.toFixed(0)}</span>
          <span style={labelStyle}>Km/h</span>
        </div>
        <span style={{ color: 'red' }}>{this.state.error ? `ERROR: ${this.state.error.code}: ${this.state.error.message}` : ''}</span>
        <ul style={{ color: 'yellow' }}>
          <li>timestamp: {this.state.timestamp}</li>
          <li>latitude : {this.state.coords.latitude}</li>
          <li>longitude : {this.state.coords.longitude}</li>
          <li>coord speed : {this.state.coords.speed}</li>
          <li>speed : {this.state.speed}</li>
        </ul>
      </div>
    );
  },
});
