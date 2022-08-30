import { Mesh } from "./mesh";
import { Game } from './game';

export interface GameObjectData {
  name?: string;
  position: Vec3;
  mesh?: Mesh;
}

export interface MeshData {
  vertices: number[];
  indices: number[];
  colors?: number[];
  shaderName: string,
  game: Game;
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
