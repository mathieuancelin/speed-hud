/* eslint max-len: 0, react/jsx-closing-bracket-location: 0 */
import React from 'react';

export class ConfigButton extends React.Component {
  static propTypes = {
    action: React.PropTypes.func.isRequired,
  };
  render() {
    return (
      <div onClick={this.props.action}>
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="30px"
          height="30px"
          viewBox="340 140 280 279.416"
          enable-background="new 340 140 280 279.416">
        <path stroke="grey" fill="grey" d="M620,305.666v-51.333l-31.5-5.25c-2.333-8.75-5.833-16.917-9.917-23.917L597.25,199.5l-36.167-36.75l-26.25,18.083
          c-7.583-4.083-15.75-7.583-23.916-9.917L505.667,140h-51.334l-5.25,31.5c-8.75,2.333-16.333,5.833-23.916,9.916L399.5,163.333
          L362.75,199.5l18.667,25.666c-4.083,7.584-7.583,15.75-9.917,24.5l-31.5,4.667v51.333l31.5,5.25
          c2.333,8.75,5.833,16.334,9.917,23.917l-18.667,26.25l36.167,36.167l26.25-18.667c7.583,4.083,15.75,7.583,24.5,9.917l5.25,30.916
          h51.333l5.25-31.5c8.167-2.333,16.333-5.833,23.917-9.916l26.25,18.666l36.166-36.166l-18.666-26.25
          c4.083-7.584,7.583-15.167,9.916-23.917L620,305.666z M480,333.666c-29.75,0-53.667-23.916-53.667-53.666s24.5-53.667,53.667-53.667
          S533.667,250.25,533.667,280S509.75,333.666,480,333.666z" />
        </svg>
      </div>
    );
  }
}

class Row extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', width: '100%' }}>
        <label style={{ width: '30%', fontSize: '20px' }}>{this.props.title}</label>
        <div style={{ width: '70%', fontSize: 20 }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export class Config extends React.Component {
  render() {
    const debugChecked = {};
    const mockChecked = {};
    if (this.props.debug) {
      debugChecked.checked = true;
    }
    if (this.props.mock) {
      mockChecked.checked = true;
    }
    const index = parseInt((Math.abs(this.props.theme) % (this.props.themes.length - 1)).toFixed(0), 10);
    return (
      <div style={{ color: 'white', display: 'flex', flexDirection: 'column' }}>
        <Row title="Theme">
          <select value={index} onChange={(e) => this.props.setState({ theme: e.target.value })}>
            {this.props.themes.map((t, i) => <option key={i} value={i}>{t.color} / {t.back}</option>)}
          </select>
        </Row>
        <Row title="Enable debug">
          <input type="checkbox" {...debugChecked} onChange={() => this.props.setState({ debug: !this.props.debug })} />
        </Row>
        <Row title="Enable mock speed">
          <input type="checkbox" {...mockChecked} onChange={() => this.props.setState({ mock: !this.props.mock })} />
        </Row>
        <button type="button" style={{ height: 30, marginTop: 30 }} onClick={() => this.props.setState({ screen: 'hud' })}>Back</button>
      </div>
    );
  }
}
