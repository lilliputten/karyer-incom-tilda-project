import { blockNavHeader } from './variables';

function cloneSoclials() {
  // Find original socials node
  const socialsNode = document.querySelector(`.uc-NavFooter .t-sociallinks__wrapper`);

  // Add to NavHeader logo description node...
  const navHeaderLogoDescrNode = document.querySelector(
    `.uc-NavHeader ${blockNavHeader}__logo-descr`,
  );
  navHeaderLogoDescrNode.innerHTML = '';
  navHeaderLogoDescrNode.append(socialsNode.cloneNode(true));

  // Add to order forms...
  const formNodes = document.querySelectorAll(
    '.uc-OrderForm .t716__mainwrapper',
  ) as NodeListOf<HTMLElement>;
  formNodes.forEach((node) => {
    node.append(socialsNode.cloneNode(true));
  });
}

export function initSocials() {
  cloneSoclials();
}
