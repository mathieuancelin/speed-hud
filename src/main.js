import React from 'react';
import ReactDOM from 'react-dom';
import HUD from './hud';

require('babel-polyfill');

export function init() {
  ReactDOM.render(
    <HUD />,
    document.getElementById('app')
  );
}

// TODO : service limite vitesse par geolocation
// TODO : service temperature par geolocation
// TODO : son pour la limite
