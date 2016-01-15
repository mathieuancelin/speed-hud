import React from 'react';
import ReactDOM from 'react-dom';
import HUD from './hud';

require('babel-polyfill');

export function init() {
  ReactDOM.render(
    <HUD debug={window.location.hash === '#debug'} />,
    document.getElementById('app')
  );
}

// TODO : changer la police ..
// TODO : tests ???
// TODO : fullscreen
