import { vec3Samples } from "./consts";
import { Game } from "./game";
import { degToRad, m4, matrixHelpers } from "./helpers";
import { CameraOptions, Vec3 } from "./models";
import { Renderer } from "./renderer";

const defaultFov = (Math.PI * 0.5) / 2;

export class Camera {
  private game: Game;
  private renderer: Renderer;
  rotation: Vec3;
  fov: number;
  position: Vec3;
  cameraMatrix: number[];

  constructor(game: Game, cameraOptions?: CameraOptions) {
    this.game = game;
    this.renderer = game.renderer;

    this.rotation = cameraOptions?.rotation ?? vec3Samples.zeros;
    this.position = cameraOptions?.position ?? vec3Samples.zeros;
    this.fov = cameraOptions?.fov ?? defaultFov;

    /* devblock:start */
    let folder = gui.addFolder("Camera");
    folder.add(this.rotation, "x", -60, 60, 0.001).name("Rot x");
    folder.add(this.rotation, "y", -60, 30, 0.001).name("Rot y");
    folder.add(this.rotation, "z", -60, 30, 0.001).name("Rot z");
    folder.add(this.position, "x", -130, 130, 1).name("Pos x");
    folder.add(this.position, "y", -130, 130, 1).name("Pos y");
    folder.add(this.position, "z", -130, 130, 1).name("Pos z");
    folder.add(this, "fov", 0, 6, 0.01).name("Fov");
    /* devblock:end */
  }

  update() {
    let cameraMatrixRX = m4.xRotation(degToRad(this.rotation.x));
    let cameraMatrixRY = m4.yRotation(degToRad(this.rotation.y));
    let cameraMatrixRZ = m4.zRotation(degToRad(this.rotation.z));
    let cameraMatrix = matrixHelpers.multiplyArrayOfMatrices([
      cameraMatrixRX,
      cameraMatrixRY,
      cameraMatrixRZ,
    ]);
    const { x, y, z } = this.position;
    this.cameraMatrix = m4.translate(cameraMatrix, x, y, z);
  }

  setPosition(x = 0, y = 0, z = 0) {
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
  }

  setRotation(x = 0, y = 0, z = 0) {
    this.rotation.x = x;
    this.rotation.y = y;
    this.rotation.z = z;
  }

  setOptions(options: CameraOptions) {
    this.fov = options?.fov ?? this.fov;
    if (this.position) {
      const { x, y, z } = options.position;
      this.setPosition(x, y, z);
    }

    if (options.rotation) {
      const { x, y, z } = options.rotation;
      this.setRotation(x, y, z);
    }
  }
}
