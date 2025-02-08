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

function initItem(node: HTMLElement) {
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
  console.log('[ProductsIndex:initProductsIndex] start', {
    items,
    nodeRoot,
  });
  if (items.length) {
    items.forEach(initItem);
  }
  const observer = new MutationObserver((mutations) => {
    // console.log('[ProductsIndex:mutations]', { mutations });
    mutations.forEach((mutation) => {
      const { type, target, addedNodes } = mutation;
      if (type === 'childList' && addedNodes.length) {
        console.log('[ProductsIndex:mutation]', { type, target, addedNodes });
        addedNodes.forEach(initItem);
      }
    });
  });
  observer.observe(nodeRoot, {
    childList: true,
    // fireOnAttributesModification: true, // Watch for attribute changes
    // existing: true, // Include existing elements
    // onceOnly: true, // Fire callback only once
  });
}
