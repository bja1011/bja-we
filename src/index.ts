window.GL = undefined;

/* devblock:start */
import * as dat from "dat.gui";
window.gui = new dat.GUI();
/* devblock:end */

import { Game } from "./game";
import { basicFragmentShaderString, basicVertexShaderString } from "./shaders";
import { Cube, Quad, Triangle } from "./mesh";

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
    z: -3,
  },
  mesh: new Cube(game, "basicShader"),
});

// const go2 = game.addGameObject("go2", {
//   position: {
//     x: 0.5,
//     y: 0,
//     z: 0,
//   },
// });
// const mesh2 = new Triangle(game, "basicShader");
// go2.addMesh(mesh2);
//
let objects = []
for (let i = 0; i < 100; i++) {
  let o = game.addGameObject(`o${i}`, {
    mesh: new (i % 2 === 0 ? Cube : Cube)(game, "basicShader"),
    position: {
      x: -2,
      y: -1,
      z: -i * 2,
    },
  });
  o.scale = { x: 0.4, y: 0.4, z: 0.4 };
  objects.push(o)
}

game.setInput([
  {
    key: "ArrowRight",
    action: () => {
      go.moveBy(0.1);
      objects.forEach(o=>o.moveBy(0.1))
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
  {
    key: "q",
    action: () => {
      go.moveBy(0, 0, -0.05);
    },
  },
  {
    key: "w",
    action: () => {
      go.moveBy(0, 0, 0.05);
    },
  },
]);

// const niceColors = [
//   1.0, 1.0, 0.0, 1.0, // 1
//   0.0, 0.7, 0.0, 1.0, // 2
//   0.1, 1.0, 0.6, 1.0, // 3
// ]
