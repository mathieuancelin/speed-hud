import Hammer from 'hammerjs';

export function wireHammer(getState, setState) {
  const stage = document.body;
  const mc = new Hammer.Manager(stage);
  const pan = new Hammer.Pan();
  const swipe = new Hammer.Swipe();
  mc.add(pan);
  mc.add(swipe);
  mc.on('pan', (e) => {
    if (e.direction === 2) {
      setState({ theme: getState().theme + 0.05 });
    } else if (e.direction === 4) {
      setState({ theme: getState().theme - 0.05 });
    } else if (e.direction === 8) {
      if (getState().angle < 45) {
        setState({ angle: getState().angle + 1 });
      }
    } else if (e.direction === 16) {
      if (getState().angle > -45) {
        setState({ angle: getState().angle - 1 });
      }
    }
  });
}
