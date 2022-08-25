export const vertexShaderString = `#version 300 es
precision mediump float;

uniform vec2 uPosition;
uniform float uPointSize;

void main() {
  gl_Position = vec4(uPosition, 0.0, 1.0);
  gl_PointSize = uPointSize;
}
`;

export const vertexShaderString2 = `#version 300 es
precision mediump float;

in vec2 uPosition;
uniform float uModelViewMatrix;

void main() {
  gl_Position = vec4(uModelViewMatrix,1,1,1) + vec4(uPosition, 0.0, 1.0);
}
`;

export const vertexShaderString2b = `#version 300 es
precision mediump float;

in vec2 uPosition;
uniform float uModelViewMatrix;

void main() {
  gl_Position = vec4(uModelViewMatrix*2.0,1,1,1) + vec4(uPosition, 0.0, 1.0);
}
`;

export const fragmentShaderString = `#version 300 es
precision mediump float;
out vec4 fragColor;
void main() {
  fragColor = vec4(1, 0.5, 0.5, 1);
}`;
