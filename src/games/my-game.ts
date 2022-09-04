import { Game } from "../classes/game";
import { GameObject } from "../classes/game-object";
import { Pyramid, Quad } from "../classes/mesh";
import { degToRad, generateVec3, genVertexColors } from "../helpers";
import { basicFragmentShaderString, basicVertexShaderString } from "../shaders";

export class MyGame extends Game {
  player: GameObject;

  beforeRun() {
    this.addShader(
      "basicShader",
      basicVertexShaderString,
      basicFragmentShaderString
    );

    this.updateCamera({
      position: {
        x: 0,
        y: -5,
        z: 0,
      },
    });

    this.player = this.addGameObject("player", {
      position: {
        x: 0,
        y: -1,
        z: -7,
      },
      mesh: new Pyramid(this, "basicShader"),
    });

    const ground = this.addGameObject("ground", {
      position: {
        x: -50,
        y: -1,
        z: -20,
      },
      mesh: new Quad(this, "basicShader", genVertexColors(4, 0.2, 0.4)),
      rotation: generateVec3(degToRad(90)),
      scale: { x: 1000, y: 100, z: 1 },
    });

    let objects = [];
    for (let i = 0; i < 100; i++) {
      let o = this.addGameObject(`o${i}`, {
        mesh: new (i % 2 === 0 ? Pyramid : Pyramid)(this, "basicShader"),
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
  }

  handleInput() {
    const moveValue = 0.1;
    this.setInput([
      {
        key: "ArrowRight",
        action: () => {
          this.player.moveBy(moveValue);
        },
      },
      {
        key: "ArrowLeft",
        action: () => {
          this.player.moveBy(-moveValue);
        },
      },
      {
        key: "ArrowUp",
        action: () => {
          this.player.moveBy(0, 0, -moveValue);
        },
      },
      {
        key: "ArrowDown",
        action: () => {
          this.player.moveBy(0, 0, moveValue);
        },
      },
      {
        key: "a",
        action: () => {
          this.player.moveBy(0, moveValue, 0);
        },
      },
      {
        key: "z",
        action: () => {
          this.player.moveBy(0, -moveValue, 0);
        },
      },
      {
        key: "q",
        action: () => {
          this.player.rotateBy(0, 0.05, 0);
        },
      },
      {
        key: "w",
        action: () => {
          this.player.moveBy(0, 0, moveValue);
        },
      },
    ]);
  }
}
