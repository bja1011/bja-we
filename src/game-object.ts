import { GameObjectData } from "./models";
import { Game } from './game';
export class GameObject {
  meshes: any[];
  name: string;
  private game: Game;

  constructor(game: Game, gameObjectData: GameObjectData) {
    this.name = gameObjectData.name;
    this.game = game;
  }

  update() {
    // console.log(this.name, 'update');
  }

  destroy() {

  }
}
