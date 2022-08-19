export class GameObject {
  game;
  program;

  constructor(game, objectData) {
    this.id = new Date().getTime();
    this.game = game;
    this.draw();
  }

  draw() {
//     console.log("draw");
//     const gl = this.game.ctx;
//     var buffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
//     gl.bufferData(
//         gl.ARRAY_BUFFER,
//         new Float32Array([
//           -1.0, -1.0,
//           1.0, -1.0,
//           -1.0,  1.0,
//           -1.0,  1.0,
//           1.0, -1.0,
//           1.0,  1.0]),
//         gl.STATIC_DRAW);
//     gl.enableVertexAttribArray(positionLocation);
//     gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
//
// // rysuj
//     gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  update() {
    console.log("update");
  }

  destroy() {
    console.log("destroy");
  }
}
