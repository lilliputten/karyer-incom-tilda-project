/** @desc Re-export parsed and typed scss variables */

import * as cssVariables from './variables-export.scss';

const vars = cssVariables as TCssVariables;

const {
  // prettier-ignore
  blockNavHeader,
  blockTopMenu,

  smallTreshold,
  mobileTreshold,
  wideTreshold,
} = vars;

const smallTresholdPx = parseInt(smallTreshold);
const mobileTresholdPx = parseInt(mobileTreshold);
const wideTresholdPx = parseInt(wideTreshold);

// See pre-exports in `variables-export.scss`
export interface TCssVariables {
  blockNavHeader: string;
  blockTopMenu: string;

  smallTreshold: string;
  smallTresholdPx: number;
  mobileTreshold: string;
  mobileTresholdPx: number;
  wideTreshold: string;
  wideTresholdPx: number;
}

export {
  // Block ids...
  blockNavHeader,
  blockTopMenu,

  // Tresholds as is...
  smallTreshold,
  mobileTreshold,
  wideTreshold,

  // Tresholds as numbers...
  smallTresholdPx,
  mobileTresholdPx,
  wideTresholdPx,
};
