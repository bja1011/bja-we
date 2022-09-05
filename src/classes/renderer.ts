import { Camera } from "./camera";
import { Game } from "./game";
import { matrixHelpers, resizeCanvasToDisplaySize } from "../helpers";
import { CameraOptions } from '../models';
import { Shader } from "./shader";
import { GameObject } from "./game-object";

export class Renderer {
  canvas: HTMLCanvasElement;
  ctx: WebGL2RenderingContext;
  camera: Camera;

  private shaders: Map<string, Shader> = new Map();
  projection: number[];
  private game: Game;

  constructor(game: Game) {
    this.game = game;
    this.init();
  }

  init() {
    this.canvas = document.querySelector("#c");
    GL = this.ctx = this.canvas.getContext("webgl2");
    GL.enable(GL.DEPTH_TEST);

    this.camera = new Camera(this.game, {
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
    });

    this.resize();
    addEventListener("resize", this.resize.bind(this));
    this.clearCanvas();

    this.setProjection();
  }

  setProjection() {
    const fieldOfViewInRadians = this.camera.fov;
    const aspectRatio = this.ctx.canvas.width / this.ctx.canvas.height;
    const nearClippingPlaneDistance = 0.01;
    const farClippingPlaneDistance = 5000;
    this.projection = matrixHelpers.perspectiveMatrix(
      fieldOfViewInRadians,
      aspectRatio,
      nearClippingPlaneDistance,
      farClippingPlaneDistance
    );
    this.camera.update();
  }

  addShader(
    name: string,
    vertexShaderSource: string,
    fragmentShaderSource: string
  ) {
    const shader = new Shader(name, vertexShaderSource, fragmentShaderSource);
    this.shaders.set(shader.name, shader);
    return shader;
  }

  resize() {
    const { innerWidth: w, innerHeight: h } = window;
    GL.canvas.width = w;
    GL.canvas.height = h;
    GL.viewport(0, 0, w, h);
    // turn on depth testing
    console.log("resize");

    GL.enable(GL.BLEND);
    GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);

    resizeCanvasToDisplaySize(this.canvas, 1);
    this.setProjection();

    // tell webgl to cull faces
    // GL.enable(GL.);
  }

  clearCanvas() {
    GL.clearColor(0.796, 0.953, 0.941, 1);
    GL.clear(GL.COLOR_BUFFER_BIT);
  }

  draw(gameObjects: GameObject[]) {
    this.clearCanvas();

    gameObjects.forEach((gameObject) => {
      gameObject.draw();
    });
  }

  getShader(shaderName: string) {
    return this.shaders.get(shaderName);
  }
}
