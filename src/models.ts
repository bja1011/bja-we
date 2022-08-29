export interface GameObjectData {
  name?: string;
  shaderName?: string;
  position: Vec3;
}

export enum ShaderType {
  Vertex = "vertex",
  Fragment = "fragment"
}

export interface Vec2 {
  x: number;
  y: number;
}

export interface Vec3 extends Vec2 {
  z: number;
}

export enum MeshType {
  TRIANGLE = 'triangle'
}
