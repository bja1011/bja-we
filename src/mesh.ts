import { Shader } from "./shader";
import { MeshData, Vec3 } from "./models";
import { Game } from "./game";

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
  private position: Vec3;

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

    // aPosition attribute
    GL.bindBuffer(GL.ARRAY_BUFFER, this.vertexBuffer);

    GL.vertexAttribPointer(0, 2, GL.FLOAT, false, 0, 0);
    GL.enableVertexAttribArray(0);

    const uModelViewMatrix = GL.getUniformLocation(
      this.shader.program,
      "uModelViewMatrix"
    );
    GL.uniform3f(uModelViewMatrix, this.position.x, this.position.y, 0);

    // colors
    GL.bindBuffer(GL.ARRAY_BUFFER, this.colorBuffer);
    GL.vertexAttribPointer(1, 4, GL.FLOAT, false, 0, 0);
    GL.enableVertexAttribArray(1);
  }

  update(position: Vec3) {
    this.position = position;
  }

  draw(position: Vec3) {
    this.position = position;
    this.bind();
    GL.drawElements(GL.TRIANGLES, this.indices.length, GL.UNSIGNED_BYTE, 0);
  }
}

export class Triangle extends Mesh {
  constructor(game: Game, shaderName) {
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
      colors: [
        1.0,
        1.0,
        0.0,
        1.0, // 1
        0.0,
        0.7,
        0.0,
        1.0, // 2
        0.1,
        1.0,
        0.6,
        1.0, // 3
      ],
    });
  }
}

export class Quad extends Mesh {
  constructor(game: Game, shaderName: string) {
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
      colors: [
        1, 1, 1, 1,
        1, 1, 1, 1,
        1, 1, 1, 1,
        1, 1, 1, 1,
        1, 1, 1, 1,
      ],
    });
  }
}
