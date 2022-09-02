import { matrixHelpers } from './helpers';
import { Shader } from "./shader";
import { GameObject } from "./game-object";

export class Renderer {
  canvas: HTMLCanvasElement;
  ctx: WebGL2RenderingContext;

  private shaders: Map<string, Shader> = new Map();
  projection: number[];

  constructor() {
    this.init();
  }

  init() {
    this.canvas = document.querySelector("#c");
    GL = this.ctx = this.canvas.getContext("webgl2");
    GL.enable(GL.DEPTH_TEST);
    this.resize();
    addEventListener("resize", this.resize.bind(this));
    this.clearCanvas();

    this.setProjection();
  }

  setProjection() {
    const fieldOfViewInRadians = Math.PI * 0.5;
    const aspectRatio = window.innerWidth / window.innerHeight;
    const nearClippingPlaneDistance = 1;
    const farClippingPlaneDistance = 50;
    this.projection = matrixHelpers.perspectiveMatrix(fieldOfViewInRadians, 1, nearClippingPlaneDistance, farClippingPlaneDistance);
    console.log(this.projection)
    debugger;
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
