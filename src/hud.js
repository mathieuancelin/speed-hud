/* eslint max-len: 0 */

import React from 'react';
import moment from 'moment';
import Hammer from 'hammerjs';
import { startTracking, stopTracking, subscribe } from './speed';

export default React.createClass({
  propTypes: {
    debug: React.PropTypes.bool,
  },
  getDefaultProps() {
    return {
      debug: false,
    };
  },
  getInitialState() {
    return {
      angle: 0,
      flip: true,
      speed: 0.0,
      actualSpeed: 0.0,
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
      const { speed, timestamp, error, coords } = e;
      if (error) {
        this.setState({ error });
      } else {
        const duration = Date.now() - this.state.timestamp;
        const diff = Math.abs(this.state.speed - speed);
        if (diff > 40 && duration <= 3000) { // if 40km diff in less than 3 sec
          this.setState({
            error: {
              code: 'GPS_ERROR',
              message: 'Precision error',
            },
            actualSpeed: speed,
          });
        } else {
          if (speed > 999) {
            this.setState({ speed: 999.0, actualSpeed: speed, error, timestamp, coords });
          } else if (speed < 0) {
            this.setState({ speed: 0.0, actualSpeed: speed, error, timestamp, coords });
          } else if (speed > 0 && speed < 12) {
            this.setState({ speed: 0.0, actualSpeed: speed, error, timestamp, coords });
          } else {
            this.setState({ speed, actualSpeed: speed, error, timestamp, coords });
          }
        }
      }
    });
    startTracking();
    const stage = document.body;
    const mc = new Hammer.Manager(stage);
    const pinchin = new Hammer.Pinch({ event: 'pinchin' });
    const pinchout = new Hammer.Pinch({ event: 'pinchout' });
    const panup = new Hammer.Pan();
    mc.add(pinchin);
    mc.add(pinchout);
    mc.add(panup);
    mc.on('pinchin', () => document.webkitCancelFullScreen());
    mc.on('pinchout', () => document.body.webkitRequestFullscreen());
    mc.on('pinch', () => this.toggleFullScreen());
    mc.on('pan', (e) => {
      if (e.direction === 2) { // DIRECTION_LEFT
      } else if (e.direction === 4) { // DIRECTION_RIGHT
      } else if (e.direction === 8) { // DIRECTION_UP
        if (this.state.angle < 45) {
          this.setState({ angle: this.state.angle + 1 });
        }
      } else if (e.direction === 16) { // DIRECTION_DOWN
        if (this.state.angle > -45) {
          this.setState({ angle: this.state.angle - 1 });
        }
      }
    });
  },
  componentWillUnmount() {
    this.unsubscribe();
    stopTracking();
  },
  flip() {
    this.setState({ flip: !this.state.flip });
  },
  toggleFullScreen() {
    console.log('toggleFullScreen');
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
      document.body.webkitRequestFullscreen();
    } else {
      document.webkitCancelFullScreen();
    }
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
      perspective: '800px',
    };
    const speedStyle = {
      fontSize: '70vh',
      letterSpacing: '-6vw',
      fontFamily: 'monospace',
      color: this.state.speed > 133.0 ? 'red' : 'white',
      fontWeight: 'bold',
      marginLeft: '1vw',
      transform: 'rotateX(' + this.state.angle + 'deg)',
    };
    const labelStyle = {
      marginLeft: '6vw',
      marginRight: '1vw',
      fontSize: '24vh',
      fontFamily: 'monospace',
      color: 'white',
      transform: 'rotateX(' + this.state.angle + 'deg)',
    };
    return (
      <div>
        <div style={style} onClick={this.flip}>
          <span style={speedStyle}>{this.state.speed.toFixed(0)}</span>
          <span style={labelStyle}>km/h</span>
        </div>
        {this.props.debug ? (
          <span style={{ color: 'red' }}>{this.state.error ? `ERROR: ${this.state.error.code}: ${this.state.error.message}` : ''}</span>
        ) : null}
        {this.props.debug ? (
          <ul style={{ color: 'yellow' }}>
            <li>timestamp: {this.state.timestamp} : {moment(this.state.timestamp).format('DD/MM/YYYY HH:mm:ss:SSS')}</li>
            <li>latitude : {this.state.coords.latitude}</li>
            <li>longitude : {this.state.coords.longitude}</li>
            <li>coord speed : {this.state.coords.speed}</li>
            <li>speed : {this.state.speed}</li>
            <li>speed : {this.state.actualSpeed}</li>
          </ul>
        ) : null}
      </div>
    );
  },
});
