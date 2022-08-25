import { Game } from "./game";
import {
  fragmentShaderString,
  vertexShaderString2,
  vertexShaderString2b,
} from "./shaders";

// @ts-ignore
window.GL = undefined;

const game = new Game();

// load shaders
game.renderer.addShader("simple", vertexShaderString2, fragmentShaderString);
game.renderer.addShader("simple2", vertexShaderString2b, fragmentShaderString);

const go = game.addGameObject("go1", {
  shaderName: "simple",
});

const go2 = game.addGameObject("go2", {
  shaderName: "simple2",
});

game.setInput([
  {
    key: "ArrowRight",
    action: () => {
      go.move(0.1);
      go2.move(0.1);
    },
  },
  {
    key: "ArrowLeft",
    action: () => {
      go.move(-0.1);
      go2.move(-0.1);
    },
  },
]);

//
// setTimeout(() => {
//   game.removeObject(go2);
// }, 1000);
