import { Shader } from "./shader";
import { MeshData, Vec2, Vec3 } from "./models";
import { Game } from "./game";
import { genVertexColors } from "./helpers";
import { GameObject } from "./game-object";
import { matrixHelpers } from "./helpers";

export class Mesh {
  vertices: Float32Array;
  indices: Uint8Array;
  colors: Float32Array;
  buffers = new Map<string, WebGLBuffer>();
  indexBuffer: WebGLBuffer;
  vertexBuffer: WebGLBuffer;
  colorBuffer: WebGLBuffer;
  shader: Shader;
  private game: Game;
  position: Vec3 = { x: 0, y: 0, z: 0 };
  private transforms: any;
  private modelTransforms: any;
  gameObject: GameObject;

  constructor(data: MeshData) {
    this.vertices = new Float32Array(data.vertices ?? []); // @todo: REMOVE DEFAULT VALUE
    this.indices = new Uint8Array(data.indices ?? []);
    this.colors = new Float32Array(data.colors ?? []);
    this.game = data.game;
    this.shader = this.game.renderer.getShader(data.shaderName);

    this.init();
  }

  init() {
    this.vertexBuffer = GL.createBuffer();
    this.indexBuffer = GL.createBuffer();
    this.colorBuffer = GL.createBuffer();

    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, this.indices, GL.STATIC_DRAW);

    GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
    GL.bufferData(GL.ARRAY_BUFFER, this.vertices, GL.STATIC_DRAW);

    GL.bindBuffer(GL.ARRAY_BUFFER, this.colorBuffer);
    GL.bufferData(GL.ARRAY_BUFFER, this.colors, GL.STATIC_DRAW);
    //
    // if(this.colors.length) {
    //   GL.vertexAttribPointer(1, 4, GL.FLOAT, false, 0, 0);
    //   GL.enableVertexAttribArray(1);
    // }
  }

  bind() {
    GL.useProgram(this.shader.program);
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

    // attributes and uniforms
    GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
    GL.vertexAttribPointer(0, 3, GL.FLOAT, false, 0, 0);
    GL.enableVertexAttribArray(0);

    const uModelLocation = GL.getUniformLocation(this.shader.program, "uModel");
    GL.uniformMatrix4fv(
      uModelLocation,
      false,
      new Float32Array(this.modelTransforms)
    );

    const uProjectionLocation = GL.getUniformLocation(
      this.shader.program,
      "uProjection"
    );
    GL.uniformMatrix4fv(
      uProjectionLocation,
      false,
      new Float32Array(this.game.renderer.projection)
    );

    // const uFudgeFactorLocation = GL.getUniformLocation(
    //   this.shader.program,
    //   "uFudgeFactor"
    // );
    // GL.uniform1f(uFudgeFactorLocation, 3);
    // end attributes and uniforms

    // colors
    GL.bindBuffer(GL.ARRAY_BUFFER, this.colorBuffer);
    GL.vertexAttribPointer(1, 3, GL.FLOAT, false, 0, 0);
    GL.enableVertexAttribArray(1);
  }

  update(now) {
    //Scale up
    const { x: sx, y: sy, z: sz } = this.gameObject.scale;
    const scale = matrixHelpers.scaleMatrix(sx, sy, sz);

    // Rotate according to time
    const rotateX = matrixHelpers.rotateXMatrix(now * -0.0005);
    const rotateY = matrixHelpers.rotateYMatrix(now * 0.0005);
    const rotateZ = matrixHelpers.rotateZMatrix(now * 0.0005);

    const { x: tx, y: ty, z: tz } = this.gameObject.position;
    const translate = matrixHelpers.translateMatrix(tx, ty, tz);

    // Calculate origin matrix
    const { x: ox, y: oy, z: oz } = this.gameObject.origin;
    const originMatrix = matrixHelpers.translateMatrix(ox, oy, oz);

    // Move slightly down
    const position = matrixHelpers.translateMatrix(0, 0, 0); // @todo: handle this

    // Multiply together, make sure and read them in opposite order
    this.modelTransforms = matrixHelpers.multiplyArrayOfMatrices([
      this.game.renderer.projection,
      translate,
      position, // step 4
      rotateZ, // step 3
      rotateY, // step 3
      rotateX, // step 2
      scale, // step 1
      originMatrix,
    ]);
  }

  draw(position: Vec3) {
    this.position = position;
    this.bind();
    GL.drawElements(GL.TRIANGLES, this.indices.length, GL.UNSIGNED_BYTE, 0);
  }

  setOwner(gameObject: GameObject) {
    this.gameObject = gameObject;
  }
}

export class Triangle extends Mesh {
  constructor(game: Game, shaderName: string, colors?: number[]) {
    super({
      game,
      shaderName,
      // prettier-ignore
      vertices: [
        0, 0, 0,
        0, 1, 0,
        1, 0, 0,
      ],
      indices: [0, 1, 2],
      colors: colors ?? genVertexColors(4),
    });
  }
}

export class Quad extends Mesh {
  constructor(game: Game, shaderName: string, colors?: number[]) {
    super({
      game,
      shaderName,
      // prettier-ignore
      vertices: [
        0, 0, 0,
        0, 1, 0,
        1, 1, 0,
        1, 0, 0,
      ],
      indices: [0, 1, 3, 3, 2, 1],
      // prettier-ignore
      colors: colors ?? genVertexColors(4),
    });
  }
}

export class Cube extends Mesh {
  constructor(game: Game, shaderName: string, colors?: number[]) {
    super({
      game,
      shaderName,
      // prettier-ignore
      vertices:[
        // Front face
        -1.0, -1.0,  1.0,
        1.0, -1.0,  1.0,
        1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,

        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
        1.0,  1.0, -1.0,
        1.0, -1.0, -1.0,

        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
        1.0,  1.0,  1.0,
        1.0,  1.0, -1.0,

        // Bottom face
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,

        // Right face
        1.0, -1.0, -1.0,
        1.0,  1.0, -1.0,
        1.0,  1.0,  1.0,
        1.0, -1.0,  1.0,

        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0,
      ],
      indices: [
        0,  1,  2,      0,  2,  3,    // front
        4,  5,  6,      4,  6,  7,    // back
        8,  9,  10,     8,  10, 11,   // top
        12, 13, 14,     12, 14, 15,   // bottom
        16, 17, 18,     16, 18, 19,   // right
        20, 21, 22,     20, 22, 23,   // left
      ],
      // prettier-ignore
      colors: colors ?? genVertexColors(36),
    });
  }
}
