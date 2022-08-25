import { GameObjectData } from "./models";
import { Game } from "./game";
import { Shader } from "./shader";

export class GameObject {
  meshes: any[];
  name: string;
  shader: Shader;
  private game: Game;
  private pos = 0;

  constructor(game: Game, gameObjectData: GameObjectData) {
    this.name = gameObjectData.name;
    this.game = game;
    this.shader = game.renderer.getShader(gameObjectData.shaderName);
  }

  update() {
    // console.log(this.name, 'update');
  }

  getGeometry() {
    return new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
  }

  draw() {
    const positionAttributeLocation = GL.getAttribLocation(
      this.shader.program,
      "uPosition"
    );
    GL.vertexAttribPointer(positionAttributeLocation, 2, GL.FLOAT, false, 0, 0);
    GL.enableVertexAttribArray(positionAttributeLocation);

    GL.useProgram(this.shader.program);
    const uModelViewMatrix = GL.getUniformLocation(
      this.shader.program,
      "uModelViewMatrix"
    );

    GL.uniform1f(uModelViewMatrix, this.pos);
    GL.drawArrays(GL.TRIANGLES, 0, 3);

    // GL.bindBuffer(GL.ARRAY_BUFFER, this.buffer);
    // GL.vertexAttribPointer(0, 3, GL.FLOAT, false, 0, 0);
    // GL.enableVertexAttribArray(0)
    // GL.drawArrays(GL.TRIANGLES, 0, 3);
    // this.pos+=0.01;
  }

  destroy() {}

  move(number: number) {
    this.pos += number;
  }
}
