import { Game } from "./game";
import { fragmentShaderString, vertexShaderString2, vertexShaderString2b, } from "./shaders";
import { Mesh } from './mesh';
import { MeshType } from './models';

// @ts-ignore
window.GL = undefined;

const game = new Game();

// load shaders
game.renderer.addShader("simple", vertexShaderString2, fragmentShaderString);
game.renderer.addShader("simple2", vertexShaderString2b, fragmentShaderString);

const go = game.addGameObject("go1", {
  shaderName: "simple",
  position: {
    x: 0,
    y: 0,
    z: 0
  }
});

go.addMesh(new Mesh(
  MeshType.TRIANGLE,

))

const go2 = game.addGameObject("go2", {
  shaderName: "simple2",
  position: {
    x: 0.8,
    y:0.7,
    z: 0
  }
});

game.setInput([
  {
    key: "ArrowRight",
    action: () => {
      go.move({
        x: 0.1,
        y: 0,
        z: 0,
      });
      go2.move({
        x: 0.1,
        y: 0,
        z: 0,
      });
    },
  },
  {
    key: "ArrowLeft",
    action: () => {
      go.move({
        x: -0.1,
        y: 0,
        z: 0
      });
      go2.move({
        x: -0.1,
        y: 0,
        z: 0
      });
    },
  },
]);

//
// setTimeout(() => {
//   game.removeObject(go2);
// }, 1000);
