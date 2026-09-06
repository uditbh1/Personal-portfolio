"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function HeroWebGLCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });

    if (!gl) return;

    // Vertex shader source
    const vsSource = `
      attribute vec3 aPosition;
      uniform mat4 uMatrix;
      uniform float uTime;
      uniform vec2 uPointer;
      uniform float uScroll;
      varying float vAlpha;

      void main() {
        vec3 pos = aPosition;
        
        // Gentle emergent wave displacement
        float dist = length(pos.xy - uPointer * 1.5);
        float wave = sin(pos.x * 2.5 + uTime * 0.8) * cos(pos.y * 2.5 + uTime * 0.6) * 0.15;
        float ripple = sin(dist * 6.0 - uTime * 2.0) * exp(-dist * 1.2) * 0.2;
        
        pos.z += wave + ripple;
        pos.y -= uScroll * 0.8;

        gl_Position = uMatrix * vec4(pos, 1.0);
        
        // Particle size attenuation
        float pSize = (1.0 - gl_Position.z * 0.4) * 3.5;
        gl_PointSize = max(pSize, 1.0);

        vAlpha = smoothstep(1.5, 0.2, length(gl_Position.xy));
      }
    `;

    // Fragment shader source
    const isDark = resolvedTheme !== "light";
    const fsSource = `
      precision mediump float;
      varying float vAlpha;
      uniform vec3 uColor;

      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        if (dist > 0.5) discard;

        float intensity = smoothstep(0.5, 0.0, dist);
        gl_FragColor = vec4(uColor, intensity * vAlpha * ${isDark ? "0.6" : "0.35"});
      }
    `;

    // Shader compilation utility
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    // Uniform locations
    const uMatrixLoc = gl.getUniformLocation(program, "uMatrix");
    const uTimeLoc = gl.getUniformLocation(program, "uTime");
    const uPointerLoc = gl.getUniformLocation(program, "uPointer");
    const uScrollLoc = gl.getUniformLocation(program, "uScroll");
    const uColorLoc = gl.getUniformLocation(program, "uColor");

    // Particle field geometry generation
    const numRows = 45;
    const numCols = 45;
    const vertices: number[] = [];

    for (let i = 0; i < numRows; i++) {
      const y = (i / (numRows - 1)) * 2.6 - 1.3;
      for (let j = 0; j < numCols; j++) {
        const x = (j / (numCols - 1)) * 3.4 - 1.7;
        const z = (Math.random() - 0.5) * 0.2;
        vertices.push(x, y, z);
      }
    }

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    const aPositionLoc = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 3, gl.FLOAT, false, 0, 0);

    // Dynamic color: Teal-Cyan in dark mode, Slate-Blue in light mode
    if (uColorLoc) {
      if (isDark) {
        gl.uniform3f(uColorLoc, 0.15, 0.85, 0.78); // #26d8c7
      } else {
        gl.uniform3f(uColorLoc, 0.35, 0.45, 0.55); // Slate
      }
    }

    // Perspective projection matrix (simple FOV calculation)
    const setPerspective = (width: number, height: number) => {
      const aspect = width / height;
      const fov = Math.PI / 4;
      const f = 1.0 / Math.tan(fov / 2);
      const near = 0.1;
      const far = 100.0;

      const matrix = new Float32Array([
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (far + near) / (near - far), -1,
        0, 0, (2 * far * near) / (near - far), 0,
      ]);

      if (uMatrixLoc) {
        gl.uniformMatrix4fv(uMatrixLoc, false, matrix);
      }
    };

    // Resize handling with DPR clamp
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      setPerspective(width, height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Pointer smoothing
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // Scroll scrub tracking
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY / window.innerHeight;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Render loop state
    let animationFrameId: number;
    let isVisible = true;
    let startTime = performance.now();

    // IntersectionObserver: Pause when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !prefersReducedMotion) {
          startTime = performance.now();
          render();
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const render = () => {
      if (!isVisible || prefersReducedMotion) return;

      const elapsed = (performance.now() - startTime) * 0.001;

      // Pointer lerping
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      if (uTimeLoc) gl.uniform1f(uTimeLoc, elapsed);
      if (uPointerLoc) gl.uniform2f(uPointerLoc, currentX, currentY);
      if (uScrollLoc) gl.uniform1f(uScrollLoc, scrollY);

      gl.drawArrays(gl.POINTS, 0, vertices.length / 3);

      animationFrameId = requestAnimationFrame(render);
    };

    if (!prefersReducedMotion) {
      render();
    } else {
      // Single draw for reduced-motion
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, vertices.length / 3);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(vertexBuffer);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-90"
      aria-hidden="true"
    />
  );
}
