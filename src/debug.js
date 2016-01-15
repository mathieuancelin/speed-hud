import React from 'react';
import moment from 'moment';

export class Debug extends React.Component {
  defaultProps = {
    debug: false,
    speed: 0.0,
    actualSpeed: 0.0,
    coords: {
      latitude: 0.0,
      longitude: 0.0,
      speed: 0.0,
    },
    timestamp: Date.now(),
  };
  static propTypes = {
    debug: React.PropTypes.bool.isRequired,
    speed: React.PropTypes.number.isRequired,
    actualSpeed: React.PropTypes.number.isRequired,
    timestamp: React.PropTypes.number.isRequired,
    coords: React.PropTypes.shape({
      speed: React.PropTypes.number.isRequired,
      latitude: React.PropTypes.number.isRequired,
      longitude: React.PropTypes.number.isRequired,
    }).isRequired,
  };
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.debug) return null;
    return (
      <ul style={{ color: 'yellow' }}>
        <li>timestamp: {this.props.timestamp} : {moment(this.props.timestamp).format('DD/MM/YYYY HH:mm:ss:SSS')}</li>
        <li>latitude : {this.props.coords.latitude}</li>
        <li>longitude : {this.props.coords.longitude}</li>
        <li>coord speed : {this.props.coords.speed}</li>
        <li>speed : {this.props.speed}</li>
        <li>speed : {this.props.actualSpeed}</li>
      </ul>
    );
  }
}
