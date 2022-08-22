import { Renderer } from "./renderer";
import { GameObject } from "./game-object";

export class Game {
  renderer: Renderer;
  gameObjects: GameObject[] = [];

  private stopUpdate = false;

  constructor() {
    this.renderer = new Renderer();
    this.update();
  }

  private update() {
    this.gameObjects.forEach((gameObject) => gameObject?.update());

    this.renderer.draw();

    if (!this.stopUpdate) {
      requestAnimationFrame(this.update.bind(this));
    }
  }

  addGameObject(gameObjectData) {
    const gameObject = new GameObject(gameObjectData);
    this.gameObjects.push(gameObject);
    return gameObject;
  }

  removeObject(gameObject: GameObject) {
    this.gameObjects = this.gameObjects.filter(
      (obj) => obj.id !== gameObject.id
    );
    gameObject.destroy();
  }
}
