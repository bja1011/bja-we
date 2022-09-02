import { GameObjectData, Vec2, Vec3 } from "./models";
import { Game } from "./game";
import { Mesh } from "./mesh";

export class GameObject {
  mesh: Mesh;
  // meshes: Mesh[]; @todo: future
  name: string;
  private game: Game;
  afterUpdateFn: Function;
  position: Vec3 = {
    x: 0,
    y: 0,
    z: 0,
  };
  origin: Vec3 = { x: 0, y: 0, z: 0 };
  // origin: Vec3 = { x: -0.5, y: -0.5, z: -0.5 };
  scale: Vec3 = { x: 1, y: 1, z: 1 };

  constructor(game: Game, gameObjectData: GameObjectData) {
    this.name = gameObjectData.name;
    this.game = game;
    this.position = gameObjectData.position ?? this.position;
    if (gameObjectData.mesh) {
      this.addMesh(gameObjectData.mesh);
    }
    if (gameObjectData.afterUpdateFn) {
      this.afterUpdateFn = gameObjectData.afterUpdateFn.bind(this);
    }

    /* devblock:start */
    let folder = gui.addFolder(this.name);
    folder.open();
    folder.add(this.position, "x", -3, 3, 0.001).name('Pos x');
    folder.add(this.position, "y", -3, 3, 0.001).name('Pos y');
    folder.add(this.position, "z", -9, 3, 0.001).name('Pos z');

    folder.add(this.scale, "x", 0, 3, 0.001).name('Scale x');
    folder.add(this.scale, "y", 0, 3, 0.001).name('Scale y');
    folder.add(this.scale, "z", 0, 3, 0.001).name('Scale z');

    folder.add(this.origin, "x", 0, 3, 0.001).name('Origin x');
    folder.add(this.origin, "y", 0, 3, 0.001).name('Origin y');
    folder.add(this.origin, "z", 0, 3, 0.001).name('Origin z');
    /* devblock:end */
  }

  addMesh(mesh: Mesh) {
    this.mesh = mesh;
    this.mesh.setOwner(this);
  }

  update(time) {
    this.mesh?.update(time);
    if (this.afterUpdateFn) {
      this.afterUpdateFn();
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
}
