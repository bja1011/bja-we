export const basicVertexShaderString = `#version 300 es
precision mediump float;

in vec3 aPosition;
in vec4 aVertexColor;
uniform mat4 uModel;
uniform mat4 uProjection;

out vec4 vColor;

void main() {
  gl_Position =  uModel * vec4(aPosition, 1);
  vColor = aVertexColor;
}
`;

export const basicFragmentShaderString = `#version 300 es
precision mediump float;
in vec4 vColor;

out vec4 fragColor;
void main() {
  fragColor = vColor;
}`;
