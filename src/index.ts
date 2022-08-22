import { Game } from "./game";

window.GL = undefined;

const game = new Game();

game.setInput([
  {
    key: "ArrowRight",
    action: () => game.renderer.move(0.1),
  },
  {
    key: "ArrowLeft",
    action: () => game.renderer.move(-0.1),
  },
]);

const go = game.addGameObject("go1", {});
const go2 = game.addGameObject("go2", {});

setTimeout(() => {
  game.removeObject(go2);
}, 1000);
