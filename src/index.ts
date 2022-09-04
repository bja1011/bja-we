window.GL = undefined;

/* devblock:start */
import * as dat from "dat.gui";
window.gui = new dat.GUI();
/* devblock:end */

import { Game } from "./game";
import { GameObject } from "./game-object";
import { degToRad, generateVec3, genVertexColors } from "./helpers";
import { basicFragmentShaderString, basicVertexShaderString } from "./shaders";
import { Cube, Pyramid, Quad, Triangle } from "./mesh";

const game = new Game();
game.updateCamera({
  position: {
    x: 0,
    y: -5,
    z: 0,
  },
});

game.addShader(
  "basicShader",
  basicVertexShaderString,
  basicFragmentShaderString
);

const player = game.addGameObject("player", {
  position: {
    x: 0,
    y: -1,
    z: -7,
  },
  mesh: new Pyramid(game, "basicShader"),
});

const ground = game.addGameObject("ground", {
  position: {
    x: -50,
    y: -1,
    z: -20,
  },
  mesh: new Quad(game, "basicShader", genVertexColors(4, 0.2, 0.4)),
  rotation: generateVec3(degToRad(90)),
  scale: { x: 1000, y: 100, z: 1 },
});

let objects = [];
for (let i = 0; i < 100; i++) {
  let o = game.addGameObject(`o${i}`, {
    mesh: new (i % 2 === 0 ? Pyramid : Pyramid)(game, "basicShader"),
    position: {
      x: -2,
      y: -1,
      z: -i * 2,
    },
    afterUpdateFn: function (time: number) {
      (this as GameObject).position = {
        x: Math.sin(time / 500 + i / 5),
        y: this.position.y,
        z: this.position.z,
      };
      (this as GameObject).rotation = {
        x: 0,
        y: Math.sin(time / 500 + i / 5),
        z: 0,
      };
      // (this as GameObject).scale = {
      //   x: Math.abs(Math.sin(time / 100 + i)),
      //   y: Math.abs(Math.sin(time / 100 + i)),
      //   z: Math.abs(Math.sin(time / 100 + i)),
      // };
      // (this as GameObject).scale = {
      //   x: Math.sin(time / 500 + i / 5),
      //   y: Math.sin(time / 500 + i / 5),
      //   z: Math.sin(time / 500 + i / 5),
      // };
    },
  });
  o.scale = { x: 0.4, y: 0.4, z: 0.4 };
  objects.push(o);
}

const moveValue = 0.1;

game.setInput([
  {
    key: "ArrowRight",
    action: () => {
      player.moveBy(moveValue);
    },
  },
  {
    key: "ArrowLeft",
    action: () => {
      player.moveBy(-moveValue);
    },
  },
  {
    key: "ArrowUp",
    action: () => {
      player.moveBy(0, 0, -moveValue);
    },
  },
  {
    key: "ArrowDown",
    action: () => {
      player.moveBy(0, 0, moveValue);
    },
  },
  {
    key: "a",
    action: () => {
      player.moveBy(0, moveValue, 0);
    },
  },
  {
    key: "z",
    action: () => {
      player.moveBy(0, -moveValue, 0);
    },
  },
  {
    key: "q",
    action: () => {
      player.rotateBy(0, 0.05, 0);
    },
  },
  {
    key: "w",
    action: () => {
      player.moveBy(0, 0, moveValue);
    },
  },
]);

// const niceColors = [
//   1.0, 1.0, 0.0, 1.0, // 1
//   0.0, 0.7, 0.0, 1.0, // 2
//   0.1, 1.0, 0.6, 1.0, // 3
// ]
