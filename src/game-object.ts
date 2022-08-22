import { GameObjectData } from "./models";
export class GameObject {
  meshes: any[];
  id: number;
  private name: string;

  constructor(gameObjectData: GameObjectData) {
    this.name = gameObjectData.name;
    this.id = new Date().getTime();
  }

  update() {
    console.log('update');
  }

  destroy() {

  }
}
