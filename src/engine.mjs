import { GameObject } from "./game-object.mjs";

const vertexShaderString = `#version 300 es
    precision mediump float;
    
    uniform vec2 uPosition;
    uniform float uPointSize;
    
    void main() {
      gl_Position = vec4(uPosition, 0.0, 1.0);
      gl_PointSize = uPointSize;
    }
`;

const fragmentShaderString = `#version 300 es
precision mediump float;
out vec4 fragColor;
void main() {
  fragColor = vec4(1, 0, 0.5, 1);
}`;

export class Game {
  canvas;
  ctx;
  stopUpdate;
  gameObjects = [];

  program;
  constructor() {
    this.canvas = document.querySelector("#c");
    this.ctx = this.canvas.getContext("webgl2");
    this.resize();
    addEventListener("resize", this.resize.bind(this));
    this.clearCanvas();

    const program = this.ctx.createProgram();
    this.program = program;

    const vertexShader = this.ctx.createShader(this.ctx.VERTEX_SHADER);
    const fragmentShader = this.ctx.createShader(this.ctx.FRAGMENT_SHADER);

    this.ctx.shaderSource(vertexShader, vertexShaderString);
    this.ctx.compileShader(vertexShader);
    this.ctx.attachShader(program, vertexShader);

    this.ctx.shaderSource(fragmentShader, fragmentShaderString);
    this.ctx.compileShader(fragmentShader);
    this.ctx.attachShader(program, fragmentShader);

    this.ctx.linkProgram(program);

    if (!this.ctx.getProgramParameter(program, this.ctx.LINK_STATUS)) {
      console.log(this.ctx.getShaderInfoLog(fragmentShader));
      console.log(this.ctx.getShaderInfoLog(vertexShader));
    }

    this.ctx.useProgram(program);

    // this.ctx.uniform1f(uPointSize, 100.0);
    // this.ctx.uniform2f(uPosition, 0.0, -0.2);

    this.update();

    setTimeout(() => {
      this.removeObject(this.gameObjects[0]);
    }, 4000);
  }

  resize() {
    this.ctx.canvas.width = innerWidth;
    this.ctx.canvas.height = innerHeight;
  }

  clearCanvas() {
    this.ctx.clearColor(0.796, 0.953, 0.941, 1);
    this.ctx.clear(this.ctx.COLOR_BUFFER_BIT);
  }

  addObject(objectData) {
    const gameObject = new GameObject(this, objectData);
    this.gameObjects.push(gameObject);
    return gameObject;
  }

  removeObject(gameObject) {
    this.gameObjects = this.gameObjects.filter(
      (obj) => obj.id !== gameObject.id
    );
    gameObject.destroy();
  }

  pos = 0;

  update() {
    this.gameObjects.forEach((gameObject) => gameObject?.update());

    this.pos += 0.001;
    this.drawTest(this.pos);

    if (!this.stopUpdate) {
      requestAnimationFrame(this.update.bind(this));
    }
  }

  drawTest(pos) {
    const uPosition = this.ctx.getUniformLocation(this.program, "uPosition");
    const uPointSize = this.ctx.getUniformLocation(this.program, "uPointSize");
    this.ctx.uniform1f(uPointSize, 100.0);
    console.log(pos);
    this.ctx.uniform2f(uPosition, pos, 0);
    this.ctx.drawArrays(this.ctx.POINTS, 0, 1);
  }
}
