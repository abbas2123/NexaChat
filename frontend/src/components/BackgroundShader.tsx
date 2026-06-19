import { useEffect, useRef } from "react";

const BackgroundShader = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;

      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;

      uniform float u_time;
      varying vec2 v_uv;

      void main() {
        vec2 uv = v_uv;

        vec3 baseColor = vec3(0.05, 0.08, 0.06);
        vec3 glowColor = vec3(0.14, 0.83, 0.40);

        float wave =
          sin(uv.x * 10.0 + u_time) *
          cos(uv.y * 10.0 + u_time);

        float intensity = wave * 0.5 + 0.5;

        vec3 color = mix(
          baseColor,
          glowColor * 0.3,
          intensity * 0.4
        );

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);

    const fragmentShader = createShader(
      gl.FRAGMENT_SHADER,
      fragmentShaderSource,
    );

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();

    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");

    gl.enableVertexAttribArray(positionLocation);

    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, "u_time");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();

    window.addEventListener("resize", resize);

    let animationFrame: number;

    const render = (time: number) => {
      gl.uniform1f(timeLocation, time * 0.001);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationFrame = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 -z-10 w-full h-full" />
  );
};

export default BackgroundShader;
