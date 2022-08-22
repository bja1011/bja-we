import { Renderer } from "./renderer";
import { GameObject } from "./game-object";
import { Input } from "./input";

export class Game {
  renderer: Renderer;
  gameObjects: GameObject[] = [];
  input: Input;

  private stopUpdate = false;

  constructor() {
    this.renderer = new Renderer();
    this.input = new Input();
    this.update();
  }

  private update() {
    this.input.update();
    this.gameObjects.forEach((gameObject) => gameObject?.update());

    this.renderer.draw();

    if (!this.stopUpdate) {
      requestAnimationFrame(this.update.bind(this));
    }
  }

  addGameObject(name: string, gameObjectData) {
    const gameObject = new GameObject(this, {
      name,
      ...gameObjectData,
    });
    this.gameObjects.push(gameObject);
    return gameObject;
  }

  removeObject(gameObject: GameObject) {
    this.gameObjects = this.gameObjects.filter(
      (obj) => obj.name !== gameObject.name
    );
    gameObject.destroy();
  }

  setInput(inputConfig: { key: string; action: Function }[]) {
    inputConfig.forEach((config) =>
      this.input.registerAction(config.key, config.action)
    );
  }
}
