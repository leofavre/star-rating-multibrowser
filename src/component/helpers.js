export const getElementIndex = domEl => Array
  .from(domEl.parentNode.children)
  .indexOf(domEl);
