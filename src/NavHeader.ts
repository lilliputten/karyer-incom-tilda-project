import { blockTopMenu, blockNavHeader } from './variables';

const visibleMenuClass = 't-menusub__menu_show';

function getSubMenu(node: HTMLElement) {
  // @ts-ignore: Use custom property to optional temporarily data
  let subMenu = node._subMenu as HTMLElement;
  if (!subMenu) {
    const parent = node.parentElement;
    subMenu = parent.getElementsByClassName('t-menusub__menu')[0] as HTMLElement;
    // @ts-ignore: Use custom property to optional temporarily data
    node._subMenu = subMenu;
  }
  return subMenu;
}

function targetClick(allTargets: NodeListOf<HTMLElement>, ev: MouseEvent) {
  const targetNode = ev.target as HTMLElement;
  const subMenu = getSubMenu(targetNode);
  // Show submenu
  subMenu.classList.toggle(visibleMenuClass);
  // Close all other submenus
  allTargets.forEach((node) => {
    if (node === targetNode) {
      return;
    }
    const subMenu = getSubMenu(node);
    if (subMenu && subMenu.classList.contains(visibleMenuClass)) {
      subMenu.classList.remove(visibleMenuClass);
    }
  });
  /* // Submenu elements structure, for reference;
   * <a class="t-menu__link-item t-menusub__target-link t-menusub__target-link_active" href="" aria-expanded="true" role="button" data-menu-submenu-hook="link_sub2_812878371" data-tooltip-menu-id="812878371">
   *   Сертификация ТР ТС<div class="t-menusub__arrow"></div></a>
   * <div class="t-menusub" data-submenu-hook="link_sub2_812878371" data-submenu-margin="15px" data-add-submenu-arrow="on">
   *   <div class="t-menusub__menu t-menusub__menu_bottom t-menusub__menu_show" style="display: block; left: 33.375px; top: 0px;">
   *     <div class="t-menusub__content">
   */
}

function cloneSubMenu() {
  // Find and move menu to the nav header...
  // const menuSelector = `.uc-TopMenu ${blockTopMenu}__maincontainer`;
  const menuSelector = `.uc-TopMenu .t-menu__list`;
  const navHeaderWrapperSelector = `.uc-NavHeader ${blockNavHeader}`;
  const menuNode = document.querySelector(menuSelector);
  const navHeaderWrapperNode = document.querySelector(navHeaderWrapperSelector);
  // Clone menu node...
  if (menuNode) {
    // See cloned menu stylings in `project/src/NavHeader/NavHeader.styles.scss`
    const menuNodeCopy = menuNode.cloneNode(true) as Element; // NOTE: Clone to have nodes without events etc
    // const targets = menuNodeCopy.querySelectorAll('.t-menusub__target-link');
    const targets = menuNodeCopy.querySelectorAll(
      '.t-menu__link-item:not([data-menu-submenu-hook=""])',
    ) as NodeListOf<HTMLElement>;
    // Clean styles...
    menuNodeCopy.removeAttribute('style');
    menuNodeCopy.classList.add('SubMenu');
    // Add menu node copy to the hav header...
    navHeaderWrapperNode.append(menuNodeCopy);
    const targetClickBound = targetClick.bind(null, targets); // TODO
    targets.forEach((node) => {
      node.addEventListener('click', targetClickBound); // TODO
      // Check and add arrows if absent
      const arrow = node.getElementsByClassName('t-menusub__arrow')[0];
      if (!arrow) {
        const arrowNode = document.createElement('div');
        arrowNode.classList.add('t-menusub__arrow');
        node.append(arrowNode);
      }
    });
  }
}

function cloneSoclials() {
  const socialsSelector = `.uc-NavFooter .t-sociallinks__wrapper`;
  const targetSelector = `.uc-NavHeader ${blockNavHeader}__logo-descr`;
  const socialsNode = document.querySelector(socialsSelector);
  const targetNode = document.querySelector(targetSelector);
  const socialsCloned = socialsNode.cloneNode(true) as Element; // NOTE: Clone to have nodes without events etc
  targetNode.innerHTML = '';
  targetNode.append(socialsCloned);
}

function cloneLogo() {
  const logoSelector = `.uc-NavHeader .t821__logo-wrapper`;
  const targetSelector = `.uc-NavHeader .tmenu-mobile__text`;
  const logoNode = document.querySelector(logoSelector);
  const targetNode = document.querySelector(targetSelector);
  const logoCloned = logoNode.cloneNode(true) as Element; // NOTE: Clone to have nodes without events etc
  targetNode.innerHTML = '';
  targetNode.append(logoCloned);
}

export function initNavHeader() {
  cloneSubMenu();
  cloneSoclials();
  cloneLogo();
}
