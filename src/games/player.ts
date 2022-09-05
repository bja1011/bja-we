import { Game } from "../classes/game";
import { GameObject } from "../classes/game-object";
import { Pyramid } from "../classes/mesh";
import { MyGame } from "./my-game";

export class Player extends GameObject {
  private mouseX: number;
  private mouseY: number;
  constructor(game: Game) {
    super(game, {
      name: "player",
      position: {
        x: 0,
        y: -1,
        z: -7,
      },
    });
    this.addMesh(new Pyramid(this.game, "basicShader"));
  }

  init() {
    this.handleInput();
    this.scale = {
      x: 0.3,
      y: 0.3,
      z: 0.3,
    };
  }

  handleInput() {
    const moveValue = 0.1;
    this.game.setInput([
      {
        key: "ArrowRight",
        action: () => {
          this.moveBy(moveValue);
        },
      },
      {
        key: "ArrowLeft",
        action: () => {
          this.moveBy(-moveValue);
        },
      },
      {
        key: "ArrowUp",
        action: () => {
          this.moveBy(0, 0, -moveValue);
        },
      },
      {
        key: "ArrowDown",
        action: () => {
          this.moveBy(0, 0, moveValue);
        },
      },
      {
        key: "a",
        action: () => {
          this.moveBy(0, moveValue, 0);
        },
      },
      {
        key: "z",
        action: () => {
          this.moveBy(0, -moveValue, 0);
        },
      },
      {
        key: "q",
        action: () => {
          this.rotateBy(0, 0.05, 0);
        },
      },
      {
        key: "w",
        action: () => {
          this.moveBy(0, 0, moveValue);
        },
      },
    ]);

    addEventListener("pointermove", (p) => {
      this.mouseX = p.x - innerWidth / 2;
      this.mouseY = p.y - innerHeight / 2;
    });
  }

  beforeUpdate(time: number) {
    const { x, y, z } = this.position;
    const camera = this.game.renderer.camera;
    this.game.renderer.camera.target = {
      x,
      y,
      z,
    };

    camera.position.x = this.position.x + Math.cos(this.mouseX / 50) * 3;
    camera.position.z = this.position.z + Math.sin(this.mouseX / 50) * 3;
    camera.position.y = this.position.y + this.mouseY / 50;
  }
}
