"use client";

/**
 * ============================================================================
 * RETRIEVAL FIELD (3D RAG EMBEDDING SPACE) - RETUNE CONFIGURATION
 * ============================================================================
 * - NODE_COUNT: Number of sparse embedding nodes (default: 95)
 * - EDGE_MAX_DIST: Max Euclidean distance to form vector connections (default: 5.2)
 * - QUERY_RADIUS: Pointer search radius for highlighting neighbor nodes (default: 6.5)
 * - CAMERA_Z_BASE: Initial camera distance (default: 26.0)
 * - CAMERA_DOLLY_TRAVEL: Camera dolly-in travel distance on scroll (default: 8.5)
 * - FIELD_TILT_STRENGTH: Mouse parallax pitch/yaw responsiveness (default: 0.22)
 * ============================================================================
 */
const NODE_COUNT = 95;
const EDGE_MAX_DIST = 5.2;
const QUERY_RADIUS = 6.5;
const CAMERA_Z_BASE = 26.0;
const CAMERA_DOLLY_TRAVEL = 8.5;
const FIELD_TILT_STRENGTH = 0.22;

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [hasWebGL, setHasWebGL] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => motionQuery.removeEventListener("change", handleMotionChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Defer initialization until after first paint to protect headline LCP
    const initTimer = (window.requestIdleCallback || window.setTimeout)(() => {
      initScene();
    }, { timeout: 200 });

    let cleanup: (() => void) | undefined;

    function initScene() {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      // Detect WebGL capability
      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
      } catch (err) {
        setHasWebGL(false);
        return;
      }

      const isDark = resolvedTheme !== "light";
      // In dark mode: teal is #00B3B3; in light mode: slate gray #6F8090
      const tealColor = new THREE.Color(isDark ? 0x00b3b3 : 0x6f8090);
      const dimColor = new THREE.Color(isDark ? 0x334155 : 0xa0afbe);
      const queryColor = new THREE.Color(isDark ? 0x00b3b3 : 0x6f8090);

      // DPR capped at 1.5 for mid-range performance
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setSize(container.clientWidth, container.clientHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        100
      );
      camera.position.z = CAMERA_Z_BASE;

      // Group holding the entire embedding vector field for subtle parallax tilt
      const fieldGroup = new THREE.Group();
      scene.add(fieldGroup);

      // 1. GENERATE SPARSE 3D EMBEDDING NODES
      // Center exclusion zone keeps "HI, I'M UDIT" completely legible!
      const nodePositions: THREE.Vector3[] = [];
      const nodeScales: number[] = [];
      const nodeTypes: number[] = []; // 0 = standard dim, 1 = cluster anchor (accent)

      for (let i = 0; i < NODE_COUNT; i++) {
        let x = (Math.random() - 0.5) * 36;
        let y = (Math.random() - 0.5) * 22;
        let z = (Math.random() - 0.5) * 14;

        // Push nodes outward from center text area
        if (Math.abs(x) < 8 && Math.abs(y) < 5) {
          x += x >= 0 ? 8 : -8;
          y += y >= 0 ? 4 : -4;
        }

        nodePositions.push(new THREE.Vector3(x, y, z));
        const isAnchor = Math.random() > 0.72;
        nodeTypes.push(isAnchor ? 1 : 0);
        nodeScales.push(isAnchor ? 1.8 + Math.random() * 1.2 : 0.8 + Math.random() * 0.7);
      }

      // 2. POINTS MESH (EMBEDDING TOKENS)
      const pointsGeo = new THREE.BufferGeometry();
      const posArray = new Float32Array(NODE_COUNT * 3);
      const colorArray = new Float32Array(NODE_COUNT * 3);
      const sizeArray = new Float32Array(NODE_COUNT);

      for (let i = 0; i < NODE_COUNT; i++) {
        const p = nodePositions[i];
        posArray[i * 3] = p.x;
        posArray[i * 3 + 1] = p.y;
        posArray[i * 3 + 2] = p.z;

        const isAnchor = nodeTypes[i] === 1;
        const col = isAnchor ? tealColor : dimColor;
        colorArray[i * 3] = col.r;
        colorArray[i * 3 + 1] = col.g;
        colorArray[i * 3 + 2] = col.b;

        sizeArray[i] = nodeScales[i] * 6.0;
      }

      pointsGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
      pointsGeo.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));
      pointsGeo.setAttribute("size", new THREE.BufferAttribute(sizeArray, 1));

      // Circular glowing particle texture
      const createCircleTexture = () => {
        const c = document.createElement("canvas");
        c.width = 64;
        c.height = 64;
        const ctx = c.getContext("2d");
        if (ctx) {
          const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
          grad.addColorStop(0, "rgba(255,255,255,1)");
          grad.addColorStop(0.3, "rgba(255,255,255,0.7)");
          grad.addColorStop(0.7, "rgba(255,255,255,0.15)");
          grad.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, 64, 64);
        }
        return new THREE.CanvasTexture(c);
      };

      const pointsMat = new THREE.PointsMaterial({
        size: isDark ? 0.8 : 0.55,
        vertexColors: true,
        map: createCircleTexture(),
        transparent: true,
        opacity: isDark ? 0.75 : 0.4,
        blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
        depthWrite: false,
      });

      const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
      fieldGroup.add(pointsMesh);

      // 3. GRAPH EDGES (RETRIEVAL PATHWAYS)
      // In light mode: strictly limit connections per node to 2 to eliminate dense spiderweb clumps!
      const edgeIndices: [number, number][] = [];
      const edgeMaxDist = isDark ? EDGE_MAX_DIST : 4.5;
      const maxDegree = isDark ? 5 : 2;
      const degreeCounts = new Array(NODE_COUNT).fill(0);

      for (let i = 0; i < NODE_COUNT; i++) {
        if (degreeCounts[i] >= maxDegree) continue;

        // Find candidate neighbors for node i
        const candidates: { j: number; dist: number }[] = [];
        for (let j = i + 1; j < NODE_COUNT; j++) {
          if (degreeCounts[j] >= maxDegree) continue;
          const d = nodePositions[i].distanceTo(nodePositions[j]);
          if (d < edgeMaxDist) {
            candidates.push({ j, dist: d });
          }
        }

        candidates.sort((a, b) => a.dist - b.dist);

        for (const cand of candidates) {
          if (degreeCounts[i] >= maxDegree) break;
          if (degreeCounts[cand.j] >= maxDegree) continue;
          edgeIndices.push([i, cand.j]);
          degreeCounts[i]++;
          degreeCounts[cand.j]++;
        }
      }

      const edgesGeo = new THREE.BufferGeometry();
      const edgePositions = new Float32Array(edgeIndices.length * 2 * 3);
      const edgeColors = new Float32Array(edgeIndices.length * 2 * 3);

      for (let k = 0; k < edgeIndices.length; k++) {
        const [i, j] = edgeIndices[k];
        const p1 = nodePositions[i];
        const p2 = nodePositions[j];

        edgePositions[k * 6] = p1.x;
        edgePositions[k * 6 + 1] = p1.y;
        edgePositions[k * 6 + 2] = p1.z;

        edgePositions[k * 6 + 3] = p2.x;
        edgePositions[k * 6 + 4] = p2.y;
        edgePositions[k * 6 + 5] = p2.z;

        if (isDark) {
          const baseAlpha = 0.22;
          edgeColors[k * 6] = dimColor.r * baseAlpha;
          edgeColors[k * 6 + 1] = dimColor.g * baseAlpha;
          edgeColors[k * 6 + 2] = dimColor.b * baseAlpha;

          edgeColors[k * 6 + 3] = dimColor.r * baseAlpha;
          edgeColors[k * 6 + 4] = dimColor.g * baseAlpha;
          edgeColors[k * 6 + 5] = dimColor.b * baseAlpha;
        } else {
          // Soft neutral slate grey in light mode
          edgeColors[k * 6] = dimColor.r;
          edgeColors[k * 6 + 1] = dimColor.g;
          edgeColors[k * 6 + 2] = dimColor.b;

          edgeColors[k * 6 + 3] = dimColor.r;
          edgeColors[k * 6 + 4] = dimColor.g;
          edgeColors[k * 6 + 5] = dimColor.b;
        }
      }

      edgesGeo.setAttribute("position", new THREE.BufferAttribute(edgePositions, 3));
      edgesGeo.setAttribute("color", new THREE.BufferAttribute(edgeColors, 3));

      const edgesMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: isDark ? 1.0 : 0.28,
        blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
        depthWrite: false,
      });

      const edgesMesh = new THREE.LineSegments(edgesGeo, edgesMat);
      fieldGroup.add(edgesMesh);

      // 4. QUERY VECTOR RAYCASTER (CURSOR INTERACTION)
      // When pointer moves, it projects a query vector that brightens nearby nodes and traces lines
      const queryLinesGeo = new THREE.BufferGeometry();
      const maxQueryLines = 5;
      const queryLinePositions = new Float32Array(maxQueryLines * 2 * 3);
      const queryLineColors = new Float32Array(maxQueryLines * 2 * 3);

      queryLinesGeo.setAttribute("position", new THREE.BufferAttribute(queryLinePositions, 3));
      queryLinesGeo.setAttribute("color", new THREE.BufferAttribute(queryLineColors, 3));

      const queryLinesMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: isDark ? 0.65 : 0.32,
        blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
        depthWrite: false,
      });

      const queryLinesMesh = new THREE.LineSegments(queryLinesGeo, queryLinesMat);
      fieldGroup.add(queryLinesMesh);

      // 5. RETRIEVAL HOP PACKETS (PULSES TRAVELING EDGES)
      const packetCount = 4;
      const packetData = Array.from({ length: packetCount }, () => ({
        edgeIdx: Math.floor(Math.random() * Math.max(edgeIndices.length, 1)),
        t: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
      }));

      const packetsGeo = new THREE.BufferGeometry();
      const packetPos = new Float32Array(packetCount * 3);
      packetsGeo.setAttribute("position", new THREE.BufferAttribute(packetPos, 3));

      const packetMat = new THREE.PointsMaterial({
        size: isDark ? 0.9 : 0.65,
        color: tealColor,
        map: createCircleTexture(),
        transparent: true,
        opacity: isDark ? 1.0 : 0.55,
        blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
        depthWrite: false,
      });

      const packetsMesh = new THREE.Points(packetsGeo, packetMat);
      fieldGroup.add(packetsMesh);

      // RESIZING
      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      // INTERACTION STATE
      const mouse = new THREE.Vector2(0, 0);
      const targetRotation = new THREE.Vector2(0, 0);
      let scrollProgress = 0;
      let isHovering = false;

      const handlePointerMove = (e: PointerEvent) => {
        // Desktop only
        if (window.innerWidth < 768) return;
        const rect = container.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetRotation.x = mouse.y * FIELD_TILT_STRENGTH;
        targetRotation.y = mouse.x * FIELD_TILT_STRENGTH;
        isHovering = true;
      };

      const handlePointerLeave = () => {
        targetRotation.set(0, 0);
        isHovering = false;
      };

      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("mouseleave", handlePointerLeave);

      const handleScroll = () => {
        const heroHeight = container.clientHeight || window.innerHeight;
        scrollProgress = Math.min(Math.max(window.scrollY / heroHeight, 0), 1);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });

      // PAUSE WHEN OFFSCREEN OR TAB HIDDEN
      let isVisible = true;
      let isTabActive = true;
      let rafId: number;

      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible && isTabActive) {
            lastTime = performance.now();
            animate();
          } else {
            cancelAnimationFrame(rafId);
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(container);

      const handleVisibilityChange = () => {
        isTabActive = !document.hidden;
        if (isVisible && isTabActive) {
          lastTime = performance.now();
          animate();
        } else {
          cancelAnimationFrame(rafId);
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);

      // RENDER ANIMATION LOOP
      let lastTime = performance.now();
      const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const raycaster = new THREE.Raycaster();
      const queryPoint3D = new THREE.Vector3();

      const animate = () => {
        if (!isVisible || !isTabActive) return;

        const now = performance.now();
        const delta = Math.min((now - lastTime) * 0.001, 0.1);
        lastTime = now;

        // 1. FIELD SPRING PARALLAX
        fieldGroup.rotation.x += (targetRotation.x - fieldGroup.rotation.x) * 0.06;
        fieldGroup.rotation.y += (targetRotation.y - fieldGroup.rotation.y) * 0.06;

        // 2. SCROLL CAMERA DOLLY-IN & FOV TIGHTEN
        camera.position.z = CAMERA_Z_BASE - scrollProgress * CAMERA_DOLLY_TRAVEL;
        camera.fov = 45 - scrollProgress * 3;
        camera.updateProjectionMatrix();

        // Slow ambient multidimensional drift
        fieldGroup.position.y = Math.sin(now * 0.0004) * 0.4;
        fieldGroup.position.x = Math.cos(now * 0.0003) * 0.3;

        // 3. RETRIEVAL HOP PULSES
        const pPositions = packetsGeo.attributes.position.array as Float32Array;
        for (let p = 0; p < packetCount; p++) {
          const pack = packetData[p];
          pack.t += pack.speed;
          if (pack.t > 1.0) {
            pack.t = 0;
            pack.edgeIdx = Math.floor(Math.random() * edgeIndices.length);
          }
          if (edgeIndices[pack.edgeIdx]) {
            const [i1, i2] = edgeIndices[pack.edgeIdx];
            const v1 = nodePositions[i1];
            const v2 = nodePositions[i2];
            pPositions[p * 3] = THREE.MathUtils.lerp(v1.x, v2.x, pack.t);
            pPositions[p * 3 + 1] = THREE.MathUtils.lerp(v1.y, v2.y, pack.t);
            pPositions[p * 3 + 2] = THREE.MathUtils.lerp(v1.z, v2.z, pack.t);
          }
        }
        packetsGeo.attributes.position.needsUpdate = true;

        // 4. QUERY VECTOR HIGHLIGHTING
        if (isHovering && window.innerWidth >= 768) {
          raycaster.setFromCamera(mouse, camera);
          raycaster.ray.intersectPlane(planeZ, queryPoint3D);

          // Find nodes within query radius
          const qPositions = queryLinesGeo.attributes.position.array as Float32Array;
          const qColors = queryLinesGeo.attributes.color.array as Float32Array;
          let activeLines = 0;

          // Compute distances to queryPoint3D
          const distances: { index: number; dist: number }[] = [];
          for (let i = 0; i < NODE_COUNT; i++) {
            const d = queryPoint3D.distanceTo(nodePositions[i]);
            if (d < QUERY_RADIUS) {
              distances.push({ index: i, dist: d });
            }
          }

          distances.sort((a, b) => a.dist - b.dist);
          const topK = distances.slice(0, maxQueryLines);

          for (let l = 0; l < maxQueryLines; l++) {
            if (l < topK.length) {
              const targetNode = nodePositions[topK[l].index];
              const proximity = 1.0 - topK[l].dist / QUERY_RADIUS;

              qPositions[l * 6] = queryPoint3D.x;
              qPositions[l * 6 + 1] = queryPoint3D.y;
              qPositions[l * 6 + 2] = queryPoint3D.z;

              qPositions[l * 6 + 3] = targetNode.x;
              qPositions[l * 6 + 4] = targetNode.y;
              qPositions[l * 6 + 5] = targetNode.z;

              if (isDark) {
                qColors[l * 6] = queryColor.r * proximity;
                qColors[l * 6 + 1] = queryColor.g * proximity;
                qColors[l * 6 + 2] = queryColor.b * proximity;

                qColors[l * 6 + 3] = tealColor.r * proximity;
                qColors[l * 6 + 4] = tealColor.g * proximity;
                qColors[l * 6 + 5] = tealColor.b * proximity;
              } else {
                qColors[l * 6] = queryColor.r;
                qColors[l * 6 + 1] = queryColor.g;
                qColors[l * 6 + 2] = queryColor.b;

                qColors[l * 6 + 3] = tealColor.r;
                qColors[l * 6 + 4] = tealColor.g;
                qColors[l * 6 + 5] = tealColor.b;
              }

              activeLines++;
            } else {
              // Hide unused line segment
              qPositions[l * 6] = 0;
              qPositions[l * 6 + 1] = 0;
              qPositions[l * 6 + 2] = 0;
              qPositions[l * 6 + 3] = 0;
              qPositions[l * 6 + 4] = 0;
              qPositions[l * 6 + 5] = 0;
            }
          }
          queryLinesGeo.attributes.position.needsUpdate = true;
          queryLinesGeo.attributes.color.needsUpdate = true;
          queryLinesMesh.visible = activeLines > 0;
        } else {
          queryLinesMesh.visible = false;
        }

        renderer.render(scene, camera);
        rafId = requestAnimationFrame(animate);
      };

      animate();

      cleanup = () => {
        cancelAnimationFrame(rafId);
        observer.disconnect();
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("mouseleave", handlePointerLeave);
        window.removeEventListener("scroll", handleScroll);

        // Clean WebGL resources
        pointsGeo.dispose();
        pointsMat.dispose();
        edgesGeo.dispose();
        edgesMat.dispose();
        queryLinesGeo.dispose();
        queryLinesMat.dispose();
        packetsGeo.dispose();
        packetMat.dispose();
        renderer.dispose();
      };
    }

    return () => {
      if (typeof window !== "undefined") {
        (window.cancelIdleCallback || window.clearTimeout)(initTimer as number);
      }
      if (cleanup) cleanup();
    };
  }, [resolvedTheme, prefersReducedMotion]);

  // Reduced motion or WebGL failed fallback: static atmospheric CSS radial poster
  if (prefersReducedMotion || !hasWebGL) {
    return (
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-0 dark:opacity-40 opacity-20 dark:bg-[radial-gradient(ellipse_at_center,rgba(0,180,180,0.15)_0%,rgba(0,0,0,0)_70%)] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0)_70%)]"
        aria-hidden="true"
      />
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" aria-hidden="true" />
    </div>
  );
}
