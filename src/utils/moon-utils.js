function stationMark(color = 'currentColor') {
  return `<svg viewBox="-4 0 36 36">
      <circle cx="12" cy="12" r="12" fill="${color}" />
    </svg>`;
}

function stationColor(category) {
  switch (category) {
    case 'soviet':
      return '#FFFB18';
    case 'us':
      return '#0800FF';
    case 'cn':
      return '#FF0037';
    case 'india':
      return '#FF7700';
    case 'japan':
      return '#B42EF2';
    case 'folk':
      return '#00F4DC';
    default:
      return '#ffffff';
  }
}

function convertMoonLatLngToGlobe(lat, lng) {
  // By default, rotate the lunar prime meridian to align with the Earth's prime meridian
  // This offset can be adjusted according to the IAU lunar rotation definition (about 3~5° difference)
  const lngOffset = -21; // Simulated value, adjust according to the difference between lunar and Earth's prime meridian
  let adjLng = lng + lngOffset;

  // Ensure longitude is within -180~180
  if (adjLng > 180) adjLng -= 360;
  if (adjLng < -180) adjLng += 360;

  return [lat, adjLng];
}

function getScrollbarWidth() {
  // Create a temporary div element
  const div = document.createElement('div');
  // Set its style to make it visible and to force a scrollbar
  div.style.width = '100px';
  div.style.height = '100px';
  div.style.overflow = 'scroll';
  // Append it to the body
  document.body.appendChild(div);

  // Get the width of the scrollbar
  const scrollbarWidth = div.offsetWidth - div.clientWidth;

  // Remove the temporary div from the body
  document.body.removeChild(div);

  return scrollbarWidth;
}

function getCanvasSize() {
  const WIDTH_OFFSET = 5; // prevent canvas from touching the scrollbar
  const width = window.innerWidth - getScrollbarWidth() - WIDTH_OFFSET;
  const height = window.innerHeight;
  return { width, height };
}

export {
  stationMark,
  stationColor,
  convertMoonLatLngToGlobe,
  getScrollbarWidth,
  getCanvasSize,
};
