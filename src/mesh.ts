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

    // aPosition attribute
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);
    GL.vertexAttribPointer(0, 2, GL.FLOAT, false, 0, 0);
    GL.enableVertexAttribArray(0);

    const uModel = GL.getUniformLocation(this.shader.program, "uModel");
    GL.uniformMatrix4fv(uModel, false, new Float32Array(this.modelTransforms));

    const uProjection = GL.getUniformLocation(
      this.shader.program,
      "uProjection"
    );
    GL.uniformMatrix4fv(
      uProjection,
      false,
      new Float32Array(this.game.renderer.projection)
    );

    // colors
    GL.bindBuffer(GL.ARRAY_BUFFER, this.colorBuffer);
    GL.vertexAttribPointer(1, 4, GL.FLOAT, false, 0, 0);
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
      translate,
      position, // step 4
      rotateZ, // step 3
      // rotateY, // step 3
      // rotateX, // step 2
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
        0, 0,
        0, 1,
        1, 0
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
        0, 0,
        0, 1,
        1, 1,
        1, 0
      ],
      indices: [0, 1, 3, 3, 2, 1],
      // prettier-ignore
      colors: colors ?? genVertexColors(4),
    });
  }
}
