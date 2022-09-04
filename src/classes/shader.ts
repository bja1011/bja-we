export class Shader {
  name: string;
  program: WebGLProgram;

  constructor(
    name: string,
    vertexShaderString: string,
    fragmentShaderString: string
  ) {
    this.name = name;
    const vertexShader = this.loadShader(GL.VERTEX_SHADER, vertexShaderString);
    const fragmentShader = this.loadShader(
      GL.FRAGMENT_SHADER,
      fragmentShaderString
    );

    this.createProgram(vertexShader, fragmentShader);
  }

  loadShader(type: number, source: string) {
    const shader = GL.createShader(type);
    GL.shaderSource(shader, source);
    GL.compileShader(shader);

    // @todo: remove
    let error = GL.getShaderInfoLog(shader);
    if (error) {
      throw new Error(`Shader ${this.name} compile error: ${error}`);
    }
    //

    return shader;
  }

  createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    this.program = GL.createProgram();
    GL.attachShader(this.program, vertexShader);
    GL.attachShader(this.program, fragmentShader);
    GL.linkProgram(this.program);

    return this.program;
  }
}
