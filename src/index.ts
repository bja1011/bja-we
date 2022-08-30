window.GL = undefined;

import { Game } from "./game";
import { basicFragmentShaderString, basicVertexShaderString } from "./shaders";
import { Mesh, Quad, Triangle } from "./mesh";

const game = new Game();

game.addShader("basicShader",
  basicVertexShaderString,
  basicFragmentShaderString)

const go = game.addGameObject("go1", {
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
});

const mesh = new Mesh({
  game,
  // prettier-ignore
  vertices: [
    0,0,
    0,1,
    1,0
  ],
  indices: [0,1,2],
  colors: [
    1,1,0,1,
    1,0,1,1,
    1,1,1,1
  ],
  shaderName: 'basicShader'
});
go.addMesh(mesh);

const go2 = game.addGameObject("go2", {
  position: {
    x: 0.5,
    y: 0.5,
    z: 0,
  },
});

const mesh2 = new Quad(game, "basicShader");
go2.addMesh(mesh2);

game.setInput([
  {
    key: "ArrowRight",
    action: () => {
      go.move({
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
        z: 0,
      });
    },
  },
  {
    key: "ArrowUp",
    action: () => {
      go.move({
        x: 0,
        y: 0.1,
        z: 0,
      });
    },
  },
  {
    key: "ArrowDown",
    action: () => {
      go.move({
        x: 0,
        y: -0.1,
        z: 0,
      });
    },
  },
]);
