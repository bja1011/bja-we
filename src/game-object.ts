import { GameObjectData, Vec3 } from "./models";
import { Game } from "./game";
import { Shader } from "./shader";
import { Mesh } from './mesh';

export class GameObject {
  mesh: Mesh;
  // meshes: Mesh[]; @todo: future
  name: string;
  private game: Game;
  private position: Vec3 = {
    x: 0,
    y: 0,
    z: 0
  };

  constructor(game: Game, gameObjectData: GameObjectData) {
    this.name = gameObjectData.name;
    this.game = game;
    this.position = gameObjectData.position ?? this.position;
    this.mesh = gameObjectData?.mesh;
  }

  addMesh(mesh: Mesh) {
    this.mesh = mesh;
  }

  update() {
    // console.log(this.name, 'update');
    // this.position.z+=0.001;
  }

  draw() {
    if(!this.mesh) {
      return;
    }
    // console.log(this)

    // draw vertices
    this.mesh.draw(this.position);
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
