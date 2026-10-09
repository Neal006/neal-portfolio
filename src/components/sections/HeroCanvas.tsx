"use client";
import { useEffect, useRef } from "react";

/* Reactive 3D contour terrain.
   - A domain-warped fbm height field is viewed in perspective; the plane tilts
     with the pointer (parallax) and leans back as you scroll.
   - Normals come from screen-space derivatives, lit by a light that follows
     the cursor → real relief shading + ember specular highlights.
   - A glowing peak "blooms" under the cursor and swells with pointer speed.
   - Clicks / taps send shockwave rings through the terrain (4 at a time). */

const VERT = `#version 300 es
in vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse; uniform vec2 u_look;
uniform float u_energy; uniform float u_scroll; uniform float u_intro;
uniform vec3 u_clicks[4];
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

// screen (centred, y-up, units of height) -> ground plane under a tilted camera
vec2 project(vec2 p, float tilt, float yaw){
  float z = 1.0 + (p.y + 0.5) * tilt;          // top of the screen is farther away
  vec2 w = vec2(p.x, p.y * (1.0 + tilt * 0.6)) / z;
  w.x += yaw * w.y;                             // shear = cheap yaw
  return w;
}

void main(){
  vec2 p  = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  vec2 mp = (u_mouse - 0.5 * u_res) / u_res.y;
  float tilt = 0.55 + u_scroll * 0.9 + u_look.y * 0.18;
  float yaw  = u_look.x * 0.28;
  vec2 w  = project(p, tilt, yaw);
  vec2 mw = project(mp, tilt, yaw);
  float t = u_time * 0.035;

  // terrain
  vec2 q = vec2(fbm(w * 1.3 + t), fbm(w * 1.3 - t + 3.7));
  float h = fbm(w * 1.7 + q * 1.35 + t * 0.4);

  // bloom under the cursor, breathing + swelling with pointer energy
  float d = distance(w, mw);
  float r = 0.26 + 0.14 * u_energy;
  float bloom = exp(-d * d / (r * r)) * (0.26 + 0.5 * u_energy) * (1.0 + 0.08 * sin(u_time * 2.6));

  // click shockwaves
  float ring = 0.0;
  for (int i = 0; i < 4; i++) {
    vec3 c = u_clicks[i];
    float age = u_time - c.z;
    if (c.z <= 0.0 || age < 0.0 || age > 4.5) continue;
    vec2 cw = project((c.xy - 0.5 * u_res) / u_res.y, tilt, yaw);
    float front = age * 0.85;
    float cd = distance(w, cw) - front;
    ring += sin(cd * 20.0) * exp(-abs(cd) * 7.0) * exp(-age * 1.0) * 0.24;
  }
  float glow = bloom + abs(ring) * 1.6;
  h += bloom + ring;

  // relief shading from screen-space derivatives
  vec3 n = normalize(vec3(-dFdx(h) * u_res.y * 1.4, -dFdy(h) * u_res.y * 1.4, 1.0));
  vec2 toL = mp - p;
  vec3 L = normalize(vec3(toL, 0.45));
  float att = 1.0 / (1.0 + 2.5 * dot(toL, toL));
  float diff = max(dot(n, L), 0.0);
  float spec = pow(max(dot(reflect(-L, n), vec3(0.0, 0.0, 1.0)), 0.0), 22.0);

  // contour lines
  float lines = h * 26.0;
  float lw = fwidth(lines);
  float line = 1.0 - smoothstep(0.0, lw * 1.4, min(fract(lines), 1.0 - fract(lines)));
  float maj = fract(lines / 5.0);
  float major = 1.0 - smoothstep(0.0, lw * 2.2, min(maj, 1.0 - maj) * 5.0);

  vec3 base  = vec3(0.039, 0.039, 0.043);
  vec3 ember = vec3(1.0, 0.357, 0.137);
  vec3 paper = vec3(0.933, 0.925, 0.906);

  float heat = clamp(smoothstep(0.58, 0.92, h) + glow * 1.3, 0.0, 1.0);
  vec3 ink = mix(paper * 0.12, ember * 0.95, heat);

  vec3 col = base + vec3(0.10, 0.065, 0.05) * diff * att * 1.7;   // lit terrain fill
  col += line * ink * (0.55 + 0.45 * diff) + major * ink * 0.45;   // lines catch the light
  col += ember * spec * att * (0.35 + glow) * 0.9;                 // wet ember highlights
  float sd = distance(p, mp);
  col += ember * exp(-sd * sd * 8.0) * (0.08 + 0.28 * u_energy);   // soft bloom halo
  col += ember * glow * 0.16;

  // atmospheric depth: far terrain fades into the background
  float z = 1.0 + (p.y + 0.5) * tilt;
  col = mix(col, base, smoothstep(1.0, 1.0 + tilt * 0.95, z) * 0.85);

  vec2 c = gl_FragCoord.xy / u_res - 0.5;
  col *= (1.0 - dot(c, c) * 1.2) * u_intro;
  col = 1.0 - exp(-col * 1.35);                                     // soft tone-map
  o = vec4(col, 1.0);
}`;

const MAX_DPR = 1.25;
const MOUSE_EASE = 0.08;
const LOOK_EASE = 0.04;
const ENERGY_RISE = 0.12;
const ENERGY_DECAY = 0.94;
const SPEED_FOR_FULL_ENERGY = 2.2; // px per ms
const INTRO_MS = 2200;
const MAX_RIPPLES = 4;
const TIME_OFFSET_S = 12;

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
    const gl = canvas?.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "high-performance" });
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

    const u = (name: string) => gl.getUniformLocation(prog, name);
    const uRes = u("u_res");
    const uTime = u("u_time");
    const uMouse = u("u_mouse");
    const uLook = u("u_look");
    const uEnergy = u("u_energy");
    const uScroll = u("u_scroll");
    const uIntro = u("u_intro");
    const uClicks = u("u_clicks");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };
    const lookTarget = { x: 0, y: 0 };
    const look = { x: 0, y: 0 };
    const ripples = new Float32Array(MAX_RIPPLES * 3); // x, y (canvas px, y-up), start time (s)
    let rippleIdx = 0;
    let energy = 0;
    let energyTarget = 0;
    let lastMove = { x: 0, y: 0, t: performance.now() };
    let raf = 0;
    let visible = true;
    const start = performance.now();
    const seconds = (now: number) => TIME_OFFSET_S + (now - start) / 1000;

    const toCanvas = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect();
      const dpr = canvas.width / Math.max(1, r.width);
      return { x: (clientX - r.left) * dpr, y: (r.bottom - clientY) * dpr, inside: clientY >= r.top && clientY <= r.bottom };
    };

    const frame = (now: number) => {
      mouse.x += (target.x - mouse.x) * MOUSE_EASE;
      mouse.y += (target.y - mouse.y) * MOUSE_EASE;
      look.x += (lookTarget.x - look.x) * LOOK_EASE;
      look.y += (lookTarget.y - look.y) * LOOK_EASE;
      energy += (energyTarget - energy) * ENERGY_RISE;
      energyTarget *= ENERGY_DECAY;
      const elapsed = now - start;

      gl.uniform1f(uTime, reduced ? TIME_OFFSET_S : seconds(now));
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform2f(uLook, look.x, look.y);
      gl.uniform1f(uEnergy, energy);
      gl.uniform1f(uScroll, Math.min(1, window.scrollY / Math.max(1, window.innerHeight)));
      gl.uniform1f(uIntro, reduced ? 1 : Math.min(1, elapsed / INTRO_MS));
      gl.uniform3fv(uClicks, ripples);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced && visible) raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      target.x = mouse.x = canvas.width * 0.72;
      target.y = mouse.y = canvas.height * 0.55;
      if (reduced || !visible) frame(performance.now()); // resizing clears the buffer
    };

    const onMove = (e: PointerEvent) => {
      const c = toCanvas(e.clientX, e.clientY);
      target.x = c.x;
      target.y = c.y;
      lookTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      lookTarget.y = (e.clientY / window.innerHeight) * 2 - 1;
      const now = performance.now();
      const dt = Math.max(1, now - lastMove.t);
      const speed = Math.hypot(e.clientX - lastMove.x, e.clientY - lastMove.y) / dt;
      energyTarget = Math.max(energyTarget, Math.min(1, speed / SPEED_FOR_FULL_ENERGY));
      lastMove = { x: e.clientX, y: e.clientY, t: now };
    };

    const onDown = (e: PointerEvent) => {
      const c = toCanvas(e.clientX, e.clientY);
      if (!c.inside) return;
      ripples.set([c.x, c.y, seconds(performance.now())], rippleIdx * 3);
      rippleIdx = (rippleIdx + 1) % MAX_RIPPLES;
      energyTarget = 1;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduced) raf = requestAnimationFrame(frame);
    });
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    io.observe(canvas);
    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
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
