import { MeshType } from './models';

export class Mesh {
  vertices: number[];
  colors: number[];
  type: MeshType;

  constructor(meshType: MeshType, vertices?: number[], colors?: number[]) {
    this.type = meshType;
    this.vertices = vertices ?? [];
    this.colors = colors ?? [];
  }
}
