import { vec3Samples } from "../consts";
import { GameObjectData, Object3d, Vec2, Vec3 } from "../models";
import { Game } from "./game";
import { Mesh } from "./mesh";

// @todo: extend from generic ovcect? (along with the camera)
export class GameObject {
  mesh: Mesh;
  // meshes: Mesh[]; @todo: future
  name: string;
  protected game: Game;
  afterUpdateFn: Function;
  position: Vec3;
  origin: Vec3;
  // origin: Vec3 = { x: -0.5, y: -0.5, z: -0.5 };
  scale: Vec3;
  rotation?: Vec3;

  constructor(game: Game, gameObjectData: GameObjectData) {
    this.name = gameObjectData.name;
    this.game = game;
    this.position = gameObjectData.position ?? vec3Samples.zeros;
    this.scale = gameObjectData.scale ?? vec3Samples.ones;
    this.origin = gameObjectData.origin ?? vec3Samples.zeros;
    this.rotation = gameObjectData.rotation ?? vec3Samples.zeros;
    if (gameObjectData.mesh) {
      this.addMesh(gameObjectData.mesh);
    }
    if (gameObjectData.afterUpdateFn) {
      this.afterUpdateFn = gameObjectData.afterUpdateFn.bind(this);
    }
    this.init();
  }

  init() {}

  addMesh(mesh: Mesh) {
    this.mesh = mesh;
    this.mesh.setOwner(this);
  }

  update(time) {
    this.beforeUpdate(time);
    this.mesh?.update(time);
    if (this.afterUpdateFn) {
      this.afterUpdateFn(time);
    }
  }

  draw() {
    if (!this.mesh) {
      return;
    }
    this.mesh.draw(this.position);
  }

  destroy() {}

  moveBy(x = 0, y = 0, z = 0) {
    this.position.x += x;
    this.position.y += y;
    this.position.z += z;
  }

  /**
   * Updated object scale with provided values
   * @param sx
   * @param sy
   * @param sz
   */
  scaleBy(sx: number, sy = sx, sz = sx) {
    const s = this.scale;
    s.x = s.x + sx;
    s.y = s.y + sy;
    s.z = s.z + sz;
  }

  rotateBy(x: number, y: number, z: number) {
    const s = this.rotation;
    s.x = s.x + x;
    s.y = s.y + y;
    s.z = s.z + z;
  }

  beforeUpdate(time: number) {}
}
