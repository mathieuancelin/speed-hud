const listeners = [];
let lastPosition;
let lastTime;
let watchId;

function calculateSpeed(t1, lt1, lng1, t2, lt2, lng2) {
  // From Caspar Kleijne's answer starts
  /** Converts numeric degrees to radians */
  if (typeof(Number.prototype.toRad) === 'undefined') {
    Number.prototype.toRad = function toRadian() { // eslint-disable-line
      return this * Math.PI / 180;
    };
  }
  // From Caspar Kleijne's answer ends
  // From cletus' answer starts
  const R = 6371000; // metres
  const dLat = (lt2 - lt1).toRad();
  const dLon = (lng2 - lng1).toRad();
  const lat1 = lt1.toRad();
  const lat2 = lt2.toRad();

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  // From cletus' answer ends
  return distance; // / t2 - t1;
}

function watchPosition() {
  watchId = navigator.geolocation.watchPosition(pos => {
    console.log('success', pos);
    const time = Date.now();
    if (lastPosition && lastTime) {
      const speed = calculateSpeed(
        lastTime / 1000,
        lastPosition.coords.latitude,
        lastPosition.coords.longitude,
        time / 1000,
        pos.coords.latitude,
        pos.coords.longitude
      );
      listeners.forEach(listener => listener(speed));
    }
    lastPosition = pos;
    lastTime = time;
  }, error => {
    console.log('error', error);
    listeners.forEach(listener => listener({ error }));
  }, {
    enableHighAccuracy: true,
    maximumAge: 2000,
    timeout: 10000,
  });
}

export function startTracking() {
  watchPosition();
}

export function stopTracking() {
  navigator.geolocation.clearWatch(watchId);
}

export function position() {
  return lastPosition || { coords: {} };
}

export function subscribe(listener) {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    listeners.splice(index, 1);
  };
}
