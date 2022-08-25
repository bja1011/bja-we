import { Shader } from "./shader";
import {
  fragmentShaderString,
  vertexShaderString,
  vertexShaderString2,
} from "./shaders";
import { GameObject } from './game-object';

export class Renderer {
  canvas: HTMLCanvasElement;
  ctx: WebGL2RenderingContext;
  gameObjects: GameObject[] = [];
  program;

  private shaders: Map<string, Shader> = new Map();
  private vertexBuffer: any;

  constructor() {
    this.init();
    // this.addShader("simple", vertexShaderString2, fragmentShaderString);
    // const program = this.shaders.get("simple").program;
    // GL.useProgram(program);
    this.createBuffer();
  }

  init() {
    this.canvas = document.querySelector("#c");
    GL = this.canvas.getContext("webgl2");
    this.resize();
    addEventListener("resize", this.resize.bind(this));
    this.clearCanvas();
  }

  addShader(
    name: string,
    vertexShaderSource: string,
    fragmentShaderSource: string
  ) {
    const shader = new Shader(name, vertexShaderSource, fragmentShaderSource);
    this.shaders.set(shader.name, shader);
    return shader;
    // this.program = shader.program;
    // GL.useProgram(this.program);
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

  createBuffer() {
    this.vertexBuffer = GL.createBuffer();
  }

  pos = 0;

  move(value) {
    this.pos += value;
  }

  draw(gameObjects: GameObject[]) {
    this.clearCanvas();

    gameObjects.forEach(gameObject=>{
      let triangleVertices = gameObject.getGeometry();
      GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
      GL.bufferData(GL.ARRAY_BUFFER, triangleVertices, GL.STATIC_DRAW);
      gameObject.draw()
    })
  }

  getShader(shaderName: string) {
    return this.shaders.get(shaderName);
  }
}
