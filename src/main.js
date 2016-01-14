import React from 'react';
import ReactDOM from 'react-dom';
import HUD from './hud';

require('babel-polyfill');

export function init() {
  ReactDOM.render(<HUD />, document.getElementById('app'));
}
