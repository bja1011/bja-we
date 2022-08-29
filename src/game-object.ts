import { GameObjectData, Vec3 } from "./models";
import { Game } from "./game";
import { Shader } from "./shader";
import { Mesh } from './mesh';

export class GameObject {
  meshes: Mesh[] = [];
  name: string;
  shader: Shader;
  private game: Game;
  private position: Vec3 = {
    x: 0,
    y: 0,
    z: 0
  };

  private vertexBuffer: WebGLBuffer;
  private colorBuffer: WebGLBuffer;

  constructor(game: Game, gameObjectData: GameObjectData) {
    this.name = gameObjectData.name;
    this.game = game;
    this.shader = game.renderer.getShader(gameObjectData.shaderName);
    this.position = gameObjectData.position
    this.createBuffers();
  }

  addMesh(mesh: Mesh) {
    this.meshes.push(mesh);
  }

  createBuffers() {
    this.vertexBuffer = GL.createBuffer();
    this.colorBuffer = GL.createBuffer();
  }

  update() {
    // console.log(this.name, 'update');
    // this.position.z+=0.001;
  }

  getGeometry() {
    return new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
  }

  getColors() {
    return new Float32Array([
      1.0,
      1.0,
      0.0,
      1.0, // 1
      1.0,
      0.7,
      0.0,
      1.0, // 2
      0.1,
      1.0,
      0.6,
      1.0, // 3
    ]);
  }

  draw() {
    GL.useProgram(this.shader.program);

    // draw vertices
    GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
    const triangleVertices = this.getGeometry();

    const positionAttributeLocation = GL.getAttribLocation(
      this.shader.program,
      "aPosition"
    );
    GL.vertexAttribPointer(positionAttributeLocation, 2, GL.FLOAT, false, 0, 0);
    GL.enableVertexAttribArray(positionAttributeLocation);
    GL.bufferData(GL.ARRAY_BUFFER, triangleVertices, GL.STATIC_DRAW);

    // draw colors
    GL.bindBuffer(GL.ARRAY_BUFFER, this.colorBuffer);

    const colorAttributeLocation = GL.getAttribLocation(
      this.shader.program,
      "aVertexColor"
    );
    GL.vertexAttribPointer(colorAttributeLocation, 2, GL.FLOAT, false, 0, 0);
    GL.enableVertexAttribArray(colorAttributeLocation);
    GL.bufferData(GL.ARRAY_BUFFER, this.getColors(), GL.STATIC_DRAW);

    const uModelViewMatrix = GL.getUniformLocation(
      this.shader.program,
      "uModelViewMatrix"
    );
    GL.uniform3f(uModelViewMatrix, this.position.x, this.position.y, -this.position.z);

    GL.drawArrays(GL.TRIANGLES, 0, 3);

    // GL.bindBuffer(GL.ARRAY_BUFFER, this.buffer);
    // GL.vertexAttribPointer(0, 3, GL.FLOAT, false, 0, 0);
    // GL.enableVertexAttribArray(0)
    // GL.drawArrays(GL.TRIANGLES, 0, 3);
    // this.pos+=0.01;
  }

  destroy() {}

  move(value: Vec3) {
    this.position = {
      x: (this.position.x += value.x),
      y: (this.position.y += value.y),
      z: (this.position.z += value.z),
    };
  }
}
