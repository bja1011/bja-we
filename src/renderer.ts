import { Shader } from "./shader";
import {
  fragmentShaderString,
  vertexShaderString,
  vertexShaderString2,
} from "./shaders";

export class Renderer {
  canvas: HTMLCanvasElement;
  ctx: WebGL2RenderingContext;
  gameObjects: any = [];
  program;

  private shaders: Map<string, Shader> = new Map();
  private vertexBuffer: any;

  constructor() {
    this.init();
    this.addShader("simple", vertexShaderString2, fragmentShaderString);
    const program = this.shaders.get("simple").program;
    GL.useProgram(program);
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
    this.program = shader.program;
    GL.useProgram(this.program);
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
    let triangleVertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
    this.vertexBuffer = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
    GL.bufferData(GL.ARRAY_BUFFER, triangleVertices, GL.STATIC_DRAW);

    const positionAttributeLocation = GL.getAttribLocation(
      this.program,
      "uPosition"
    );
    GL.vertexAttribPointer(positionAttributeLocation, 2, GL.FLOAT, false, 0, 0);
    GL.enableVertexAttribArray(positionAttributeLocation);
  }

  pos = 0;

  move(value) {
    this.pos += value;
  }

  draw() {
    this.clearCanvas();

    const uPosition = GL.getUniformLocation(this.program, "uPosition");
    const uModelViewMatrix = GL.getUniformLocation(this.program, "uModelViewMatrix");
    // const uPointSize = GL.getUniformLocation(this.program, "uPointSize");
    // GL.uniform1f(uPointSize, 100.0);
    GL.uniform2f(uPosition, this.pos, 0);
    GL.uniform1f(uModelViewMatrix, this.pos);
    // GL.drawArrays(GL.POINTS, 0, 1);
    GL.drawArrays(GL.TRIANGLES, 0, 3);

    // GL.bindBuffer(GL.ARRAY_BUFFER, this.buffer);
    // GL.vertexAttribPointer(0, 3, GL.FLOAT, false, 0, 0);
    // GL.enableVertexAttribArray(0)
    // GL.drawArrays(GL.TRIANGLES, 0, 3);
  }
}
