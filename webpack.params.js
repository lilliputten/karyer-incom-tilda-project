// @ts-check

/** @module Webpack params
 *  @since 2025.02.04, 13:11
 *  @changed 2025.02.04, 13:11
 */

const fs = require('fs');
const path = require('path');

const isDev = getTruthy(process.env.DEV);
const isDebug = getTruthy(process.env.DEBUG);

/** Use locally served assets (only for debug mode) */
const useLocalServedScripts = true;

const useInlineScripts = !useLocalServedScripts;

/** Create source maps for production mode (not dev) */
const generateSourcesForProduction = true;

const templateFile = 'src/template.html';
const templateDevFile = 'src/template-dev.html';

const appInfoFile = 'src/project-info.json';
const appInfoContent = fs.readFileSync(path.resolve(__dirname, appInfoFile), {
  encoding: 'utf8',
});
const appInfo = JSON.parse(appInfoContent);
const { projectInfo } = appInfo;
const appVersionHash = projectInfo;
const matches = projectInfo.match(/^(\S+) v\.(\S+) \/ (.*)$/);
matches.shift();
const [projectId, version, timestamp] = matches;
const timetag = timestamp.replace(/^..(\d+)\.(\d+)\.(\d+)[, -]*(\d+):(\d+).*/, '$1$2$3-$4$5');
const appVersionTag = 'v.' + version + '-' + timetag;
const outPath = isDev ? 'build-dev' : 'build';

const scriptsAssetFile = 'scripts.js';
const stylesAssetFile = 'styles.css';

const localServerPrefix = 'http://localhost:3000/';

// @see https://webpack.js.org/configuration/devtool/#devtool
const devtool = isDev
  ? useInlineScripts
    ? 'inline-source-map'
    : 'source-map'
  : generateSourcesForProduction
    ? 'source-map'
    : undefined;
const minimizeAssets = !isDev || !useLocalServedScripts;

// Info:
console.log('DEV:', isDev); // eslint-disable-line no-console
console.log('DEBUG:', isDebug); // eslint-disable-line no-console
console.log('VERSION:', appVersionHash); // eslint-disable-line no-console
console.log('devtool:', devtool); // eslint-disable-line no-console
console.log('outPath:', outPath); // eslint-disable-line no-console

// Core helpers...

/** @param {boolean|string|number|undefined|null} val */
function getTruthy(val) {
  if (!val || val === 'false' || val === '0') {
    return false;
  }
  return true;
}

// Export parameters...
module.exports = {
  isDev,
  isDebug,

  useLocalServedScripts,
  useInlineScripts,

  templateFile,
  templateDevFile,
  generateSourcesForProduction,

  appInfoFile,
  appInfoContent,
  appInfo,
  appVersionHash,
  appVersionTag,

  outPath,

  projectId,

  scriptsAssetFile,
  stylesAssetFile,

  localServerPrefix,

  devtool,
  minimizeAssets,
};
