// UNUSED
function cloneCardImageSrcToBackground(node: HTMLDivElement) {
  const img = node.querySelector('img');
  const src = img.getAttribute('src');
  // Empty src: https://static.tildacdn.info/tild3333-6535-4135-a632-383431306561/-/empty/ts-331-shiploader.jpg
  // Real urls:
  // https://optim.tildacdn.pub/tild3333-6535-4135-a632-383431306561/-/resize/324x/-/format/webp/ts-331-shiploader.jpg
  // https://optim.tildacdn.pub/tild6162-3863-4537-b935-663334333338/-/resize/360x/-/format/webp/Mobile-Hopper-Feeder.jpg
  if (src && !src.includes('-/empty')) {
    node.style.backgroundImage = `url("${src}")`;
    img.remove();
    return true;
  }
  return false;
}

export function initProduction() {
  const blockSelector = `.uc-Production`;
  const cardSelector = `${blockSelector} .t-card__col`;
  const cardNodes = document.querySelectorAll(cardSelector);
  cardNodes.forEach((node: HTMLDivElement) => {
    // CHeck if the image has been already loaded
    if (!cloneCardImageSrcToBackground(node)) {
      const img = node.querySelector('img');
      // NOTE: Wait for changing of nested img src change and set to node's background and then remove the img itself
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes') {
            const { attributeName, target } = mutation;
            if (attributeName === 'src') {
              const src = (target as Element).getAttribute(attributeName);
              // console.log('[Production:initProduction] Updated src', src);
              if (src) {
                node.style.backgroundImage = `url("${src}")`;
                img.style.display = 'none';
              }
            }
          }
        });
      });
      observer.observe(img, { attributes: true });
    }
  });
}
