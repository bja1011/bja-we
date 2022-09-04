window.GL = undefined;

/* devblock:start */
import * as dat from "dat.gui";
window.gui = new dat.GUI();
/* devblock:end */

import { MyGame } from './games/my-game';

const game = new MyGame();

// const niceColors = [
//   1.0, 1.0, 0.0, 1.0, // 1
//   0.0, 0.7, 0.0, 1.0, // 2
//   0.1, 1.0, 0.6, 1.0, // 3
// ]
