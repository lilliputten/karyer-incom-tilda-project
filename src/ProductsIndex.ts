function itemClick(linkNode: HTMLElement, ev: MouseEvent) {
  ev.stopPropagation();
  ev.preventDefault();
  const newEvent = new MouseEvent(ev.type, ev);
  /* // DEBUG: To check mobile devices' behavior
   * const node = ev.currentTarget as HTMLElement;
   * const link = node.querySelector('a');
   * console.log('ProductsIndex:itemClick', {
   *   newEvent,
   *   linkNode,
   *   link,
   *   node,
   *   ev,
   * });
   */
  linkNode.dispatchEvent(newEvent);
}

function initProductItem(node: HTMLElement) {
  const link = node.querySelector('a');
  if (link) {
    const itemClickBound = itemClick.bind(null, link);
    node.addEventListener('click', itemClickBound);
    node.classList.add('has-link');
  }
}

export function initProductsIndex() {
  const nodeRoot = document.querySelector('.uc-ProductsIndex, .uc-StoreGrid .js-store-grid-cont');
  if (!nodeRoot) {
    return;
  }
  const items = nodeRoot.querySelectorAll('.t-item, .t-store__card');
  if (items.length) {
    items.forEach(initProductItem);
  }
  const observer = new MutationObserver((mutations) => {
    // console.log('[ProductsIndex:mutations]', { mutations });
    mutations.forEach((mutation) => {
      const { type, addedNodes } = mutation;
      if (type === 'childList' && addedNodes.length) {
        addedNodes.forEach(initProductItem);
      }
    });
  });
  observer.observe(nodeRoot, {
    childList: true,
  });
}
