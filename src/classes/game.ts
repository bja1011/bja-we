import { Renderer } from "./renderer";
import { GameObject } from "./game-object";
import { Input } from "./input";
import { CameraOptions, GameObjectData } from "../models";

export class Game {
  renderer: Renderer;
  gameObjects: GameObject[] = [];
  input: Input;

  private paused: boolean;
  private pausedAtTime = 0;

  constructor() {
    this.init();
  }

  /**
   * Initialize game: the renderer, input manager and run beforeRun and run methods
   */
  init() {
    this.renderer = new Renderer(this);
    this.input = new Input();
    this.beforeRun();
    this.run();
  }

  /**
   * Override this method for a logic need to be executed before game run (before first update)
   */
  beforeRun() {}

  run() {
    this.update(0);
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
    this.update(this.pausedAtTime);
  }

  // @todo: remove redundancy?
  addShader(
    name: string,
    vertexShaderSource: string,
    fragmentShaderSource: string
  ) {
    this.renderer.addShader(name, vertexShaderSource, fragmentShaderSource);
  }

  /**
   * Override this method to add custom logic to be executed before each update method execution
   */
  beforeUpdate() {}

  /**
   * Main update loop
   * @param time
   * @private
   */
  private update(time: number) {
    this.beforeUpdate();
    if (time - this.pausedAtTime !== 0) {
      time = time - this.pausedAtTime; // @todo: check if needed
    }

    this.input.update();
    this.gameObjects.forEach((gameObject) => gameObject?.update(time));

    this.renderer.draw(this.gameObjects);

    if (!this.paused) {
      requestAnimationFrame(this.update.bind(this));
    } else {
      this.pausedAtTime = time;
    }
  }

  /**
   * Create a new game object and add it to the game objects list
   * @param name
   * @param gameObjectData
   */
  addGameObject(name: string, gameObjectData: GameObjectData = {}) {
    const gameObject = new GameObject(this, {
      name,
      ...gameObjectData,
    });
    this.gameObjects.push(gameObject);
    return gameObject;
  }

  /**
   * Destroy and remove game object from the list
   * @param gameObject
   */
  removeObject(gameObject: GameObject) {
    this.gameObjects = this.gameObjects.filter(
      (obj) => obj.name !== gameObject.name
    );
    gameObject.destroy();
  }

  /**
   * Bind input actions (key=>callback) from configuration
   * @param inputConfig
   */
  setInput(inputConfig: { key: string; action: Function }[]) {
    inputConfig.forEach((config) =>
      this.input.registerAction(config.key, config.action)
    );
  }

  // @todo: remove redundancy?
  /**
   * Update camera parameters
   * @param options
   */
  updateCamera(options: CameraOptions) {
    this.renderer.camera.setOptions(options);
  }
}
