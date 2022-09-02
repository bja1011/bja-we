import { Renderer } from "./renderer";
import { GameObject } from "./game-object";
import { Input } from "./input";
import { GameObjectData } from "./models";

export class Game {
  renderer: Renderer;
  gameObjects: GameObject[] = [];
  input: Input;

  private stopUpdate = false;

  constructor() {
    this.renderer = new Renderer();
    this.input = new Input();
    this.update(0);
  }

  addShader(
    name: string,
    vertexShaderSource: string,
    fragmentShaderSource: string
  ) {
    this.renderer.addShader(name, vertexShaderSource, fragmentShaderSource);
  }

  private update(time: number) {
    this.input.update();
    this.gameObjects.forEach((gameObject) => gameObject?.update(time));

    this.renderer.draw(this.gameObjects);

    if (!this.stopUpdate) {
      requestAnimationFrame(this.update.bind(this));
    }
  }

  addGameObject(name: string, gameObjectData: GameObjectData = {}) {
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
