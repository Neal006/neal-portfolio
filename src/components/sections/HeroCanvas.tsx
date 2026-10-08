"use client";
import { useEffect, useRef } from "react";

/* Animated topographic field: domain-warped fbm rendered as contour lines,
   ember where the terrain peaks, with a soft bump that follows the pointer. */

const VERT = `#version 300 es
in vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse; uniform float u_intro;
out vec4 o;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res.y;
  vec2 m = u_mouse / u_res.y;
  float t = u_time * 0.035;
  vec2 q = vec2(fbm(uv * 1.3 + t), fbm(uv * 1.3 - t + 3.7));
  float d = distance(uv, m);
  float bump = exp(-d * d * 9.0) * 0.32;
  float h = fbm(uv * 1.7 + q * 1.35 + t * 0.4) + bump;

  float lines = h * 26.0;
  float f = fract(lines);
  float w = fwidth(lines);
  float line = 1.0 - smoothstep(0.0, w * 1.4, min(f, 1.0 - f));
  float major = 1.0 - smoothstep(0.0, w * 2.2, min(fract(lines / 5.0), 1.0 - fract(lines / 5.0)) * 5.0);

  vec3 base = vec3(0.039, 0.039, 0.043);
  vec3 ember = vec3(1.0, 0.357, 0.137);
  vec3 paper = vec3(0.933, 0.925, 0.906);
  float peak = smoothstep(0.58, 0.92, h);
  vec3 ink = mix(paper * 0.11, ember * 0.95, peak);
  vec3 col = base + line * ink * 0.75 + major * ink * 0.45;
  col += ember * bump * 0.55 * (line + 0.15);

  vec2 c = gl_FragCoord.xy / u_res - 0.5;
  col *= (1.0 - dot(c, c) * 1.25) * u_intro;
  o = vec4(col, 1.0);
}`;

const MAX_DPR = 1.25;
const MOUSE_EASE = 0.06;
const INTRO_MS = 2200;

function compile(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader | null {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
}

export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!canvas || !gl) return; // CSS gradient behind the canvas stays as fallback

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uIntro = gl.getUniformLocation(prog, "u_intro");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      target.x = mouse.x = canvas.width * 0.72;
      target.y = mouse.y = canvas.height * 0.55;
      if (reduced || !visible) frame(performance.now());
    };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const dpr = canvas.width / r.width;
      target.x = (e.clientX - r.left) * dpr;
      target.y = (r.bottom - e.clientY) * dpr;
    };

    let raf = 0;
    let visible = true;
    const start = performance.now();
    const frame = (now: number) => {
      mouse.x += (target.x - mouse.x) * MOUSE_EASE;
      mouse.y += (target.y - mouse.y) * MOUSE_EASE;
      const elapsed = now - start;
      gl.uniform1f(uTime, reduced ? 12 : 12 + elapsed / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uIntro, reduced ? 1 : Math.min(1, elapsed / INTRO_MS));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced && visible) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    io.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-10"
      style={{ background: "radial-gradient(80% 60% at 75% 55%, #2a120a 0%, var(--bg) 70%)" }}
    >
      <canvas ref={ref} className="h-full w-full" />
    </div>
  );
}
