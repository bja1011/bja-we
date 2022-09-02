window.GL = undefined;

import { Game } from "./game";
import { basicFragmentShaderString, basicVertexShaderString } from "./shaders";
import { Quad, Triangle } from "./mesh";

const game = new Game();

game.addShader(
  "basicShader",
  basicVertexShaderString,
  basicFragmentShaderString
);

const go = game.addGameObject("go1", {
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
});
const mesh = new Quad(game, "basicShader");
go.addMesh(mesh);

const go2 = game.addGameObject("go2", {
  position: {
    x: 0.5,
    y: 0,
    z: 0,
  },
});
const mesh2 = new Triangle(game, "basicShader");
go2.addMesh(mesh2);

// for (let i = 0; i < 10; i++) {
//   let o = game.addGameObject(`o${i}`, {
//     mesh: new (i % 2 === 0 ? Triangle : Quad)(game, "basicShader"),
//     position: {
//       x: -1 + Math.random(),
//       y: -1 + Math.random(),
//       z: Math.random(),
//     },
//   });
// }

game.setInput([
  {
    key: "ArrowRight",
    action: () => {
      go.moveBy(0.1);
    },
  },
  {
    key: "ArrowLeft",
    action: () => {
      go.moveBy(-0.1);
    },
  },
  {
    key: "ArrowUp",
    action: () => {
      go.moveBy(0, 0.1);
    },
  },
  {
    key: "ArrowDown",
    action: () => {
      go.moveBy(0, -0.1);
    },
  },
  {
    key: "a",
    action: () => {
      go.scaleBy(0.05);
    },
  },
  {
    key: "z",
    action: () => {
      go.scaleBy(-0.05);
    },
  },
]);

// const niceColors = [
//   1.0, 1.0, 0.0, 1.0, // 1
//   0.0, 0.7, 0.0, 1.0, // 2
//   0.1, 1.0, 0.6, 1.0, // 3
// ]
