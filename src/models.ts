import { Mesh } from "./mesh";
import { Game } from './game';
import { GameObject } from './game-object';

export interface GameObjectData {
  name?: string;
  position?: Vec3;
  mesh?: Mesh;
  afterUpdateFn?: Function;
}

export interface MeshData {
  vertices: number[];
  indices: number[];
  colors?: number[];
  shaderName: string,
  game: Game;
  gameObject?: GameObject
}

export enum ShaderType {
  Vertex = "vertex",
  Fragment = "fragment",
}

export interface Vec2 {
  x: number;
  y: number;
}

export interface Vec3 extends Vec2 {
  z: number;
}

export enum MeshType {
  TRIANGLE = "triangle",
  QUAD = "quad",
}
