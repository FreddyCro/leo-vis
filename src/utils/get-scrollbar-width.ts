function getScrollbarWidth(): number {
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

export { getScrollbarWidth };
