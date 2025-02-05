/** @module Scripts root module
 *  @since 2025.02.04, 12:59
 *  @changed 2025.02.04, 12:59
 */

import './project-info.scss';
import './variables/variables-expose.scss';

import './misc-styles';

import { isDev } from './core/constants/isDev';
import { isDebug } from './core/constants/isDebug';

import { initNavHeader } from './NavHeader';
import { initProduction } from './Production';
import { initSocials } from './Socials';

/** Print app info */
function printAppInfo() {
  const appVersion = process.env.APP_VERSION;
  // const isDebug = process.env.DEBUG;
  // const isDev = process.env.DEV;
  // eslint-disable-next-line no-console
  const consoleMethod = isDebug || isDev ? console.warn : console.log;
  consoleMethod.call(console, appVersion);
}

/** Init all the page */
function initPage() {
  // Start subcomponents...
  initNavHeader();
  initProduction();
  initSocials();
}

printAppInfo();

window.addEventListener('load', initPage);
