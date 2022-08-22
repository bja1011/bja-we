import "./styles.css";
import { Game } from "./game";

window.GL = undefined;

const game = new Game();
const go = game.addGameObject({});
const go2 = game.addGameObject({});

// setTimeout(() => {
//   game.removeObject(go);
// }, 3000);
