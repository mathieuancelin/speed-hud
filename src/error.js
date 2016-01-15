import React from 'react';

export class Error extends React.Component {
  defaultProps = {
    debug: false,
  };
  static propTypes = {
    debug: React.PropTypes.bool.isRequired,
    error: React.PropTypes.shape({
      code: React.PropTypes.oneOf([
        React.PropTypes.string,
        React.PropTypes.number,
      ]),
      message: React.PropTypes.string,
    }),
  };
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.debug) return null;
    return (
      <span style={{ color: 'red' }}>{this.props.error ? `ERROR: ${this.props.error.code}: ${this.props.error.message}` : ''}</span>
    );
  }
}
