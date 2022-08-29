export const vertexShaderString = `#version 300 es
precision mediump float;

uniform vec2 aPosition;
uniform float uPointSize;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
  gl_PointSize = uPointSize;
}
`;

export const vertexShaderString2 = `#version 300 es
precision mediump float;

in vec2 aPosition;
uniform vec3 uModelViewMatrix;
in vec4 aVertexColor;
out vec4 vColor;

void main() {
  gl_Position = vec4(uModelViewMatrix.x,uModelViewMatrix.y,uModelViewMatrix.z,1) + vec4(aPosition, 0.0, 1.0);
  vColor = aVertexColor;
}
`;

export const vertexShaderString2b = `#version 300 es
precision mediump float;

in vec2 aPosition;
uniform vec3 uModelViewMatrix;
in vec4 aVertexColor;
out vec4 vColor;

void main() {
  gl_Position = vec4(uModelViewMatrix.x*2.0,uModelViewMatrix.y-0.2,uModelViewMatrix.z,1) + vec4(aPosition, 0.0, 1.0);
  vColor = aVertexColor;
}
`;

export const fragmentShaderString = `#version 300 es
precision mediump float;
in vec4 vColor;

out vec4 fragColor;
void main() {
  fragColor = vColor;
}`;
