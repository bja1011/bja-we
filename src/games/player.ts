import { GameObject } from "../classes/game-object";

export class Player extends GameObject {
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
  }

  beforeUpdate() {
    const cam = this.game.renderer.camera;
    cam.setPosition(
      -this.position.x,
      -this.position.y - 1,
      -this.position.z - 4
    );
  }
}
