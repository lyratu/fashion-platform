import * as THREE from "three";
import {
  Mesh,
  PlaneGeometry,
  Group,
  Vector3,
  MathUtils,
  Material,
} from "three";
import {
  useRef,
  useState,
  useLayoutEffect,
  ReactNode,
} from "react";
import { createRoot, events, extend, useFrame, Root } from "@react-three/fiber";
import { Plane, useAspect, useTexture } from "@react-three/drei";
import {
  EffectComposer,
  DepthOfField,
  Vignette,
  DepthOfFieldEffect,
} from "@react-three/postprocessing";
import { MaskFunction } from "postprocessing";
import Fireflies from "./fireflies";
import bgUrl from "../resources/bg.jpg";
import starsUrl from "../resources/stars.png";
import groundUrl from "../resources/ground.png";
import bearUrl from "../resources/bear.png";
import leaves1Url from "../resources/leaves1.png";
import leaves2Url from "../resources/leaves2.png";
import "../materials/layerMaterial";

interface LayerMaterialProps {
  movement: THREE.Vector3;
  textr: THREE.Texture;
  factor?: number;
  wiggle?: number;
  scale?: number;
  time?: { value: number };
}

interface Layer {
  texture: THREE.Texture;
  x: number;
  y: number;
  z: number;
  factor?: number;
  scale: THREE.Vector3;
  scaleFactor?: number;
  wiggle?: number;
}

function Experience() {
  const scaleN = useAspect(1600, 1000, 1.05) as THREE.Vector3;
  const scaleW = useAspect(2200, 1000, 1.05) as THREE.Vector3;
  const textures = useTexture([
    bgUrl,
    starsUrl,
    groundUrl,
    bearUrl,
    leaves1Url,
    leaves2Url,
  ]) as THREE.Texture[];
  const group = useRef<Group>(null!);
  const layersRef = useRef<(Material & LayerMaterialProps)[]>([]);
  const [movement] = useState(() => new Vector3());
  const [temp] = useState(() => new Vector3());
  const layers: Layer[] = [
    { texture: textures[0], x: 0, y: 0, z: 0, factor: 0.005, scale: scaleW },
    { texture: textures[1], x: 0, y: 0, z: 10, factor: 0.005, scale: scaleW },
    { texture: textures[2], x: 0, y: 0, z: 20, scale: scaleW },
    {
      texture: textures[3],
      x: 0,
      y: 0,
      z: 30,
      scaleFactor: 0.83,
      scale: scaleN,
    },
    {
      texture: textures[4],
      x: 0,
      y: 0,
      z: 40,
      factor: 0.03,
      scaleFactor: 1,
      wiggle: 0.6,
      scale: scaleW,
    },
    {
      texture: textures[5],
      x: -20,
      y: -20,
      z: 49,
      factor: 0.04,
      scaleFactor: 1.3,
      wiggle: 1,
      scale: scaleW,
    },
  ];

  useFrame((state, delta) => {
    movement.lerp(temp.set(state.pointer.x, state.pointer.y * 0.2, 0), 0.2);
    if (group.current) {
      group.current.position.x = MathUtils.lerp(
        group.current.position.x,
        state.pointer.x * 20,
        0.05
      );
      group.current.rotation.x = MathUtils.lerp(
        group.current.rotation.x,
        state.pointer.y / 20,
        0.05
      );
      group.current.rotation.y = MathUtils.lerp(
        group.current.rotation.y,
        -state.pointer.x / 2,
        0.05
      );
    }
    layersRef.current[4].uniforms.time.value =
      layersRef.current[5].uniforms.time.value += delta;
  }, 1);

  return (
    <group ref={group}>
      <Fireflies count={20} radius={80} colors={["orange"]} />
      {layers.map(
        (
          { scale, texture, factor = 0, scaleFactor = 1, wiggle = 0, x, y, z },
          i
        ) => (
          <Plane
            key={i}
            scale={scale}
            args={[1, 1, wiggle ? 10 : 1, wiggle ? 10 : 1]}
            position={[x, y, z]}
          >
            <layerMaterial
              movement={movement}
              textr={texture}
              factor={factor}
              ref={(el: Material & LayerMaterialProps) =>
                (layersRef.current[i] = el)
              }
              wiggle={wiggle}
              scale={scaleFactor}
            />
          </Plane>
        )
      )}
    </group>
  );
}

function Effects() {
  const ref = useRef<
    DepthOfFieldEffect & {
      maskPass?: {
        getFullscreenMaterial: () => { maskFunction: MaskFunction };
      };
    }
  >(null!);
  useLayoutEffect(() => {
    if (ref.current) {
      const maskMaterial = ref.current.maskPass.getFullscreenMaterial();
      maskMaterial.maskFunction = MaskFunction.MULTIPLY_RGB_SET_ALPHA;
    }
  });
  return (
    <EffectComposer disableNormalPass multisampling={0}>
      <DepthOfField
        ref={ref}
        target={[0, 0, 30]}
        bokehScale={8}
        focalLength={0.1}
        width={1024}
      />
      <Vignette />
    </EffectComposer>
  );
}

export default function Scene() {
  return (
    <Canvas>
      <Experience />
      <Effects />
    </Canvas>
  );
}

interface CanvasProps {
  children: ReactNode;
}

function Canvas({ children }: CanvasProps) {
  extend({ Mesh, PlaneGeometry, Group });
  const canvas = useRef<HTMLCanvasElement>(null);
  const root = useRef<Root | null>(null);

  useLayoutEffect(() => {
    if (canvas.current && !root.current) {
      root.current = createRoot(canvas.current).configure({
        events,
        orthographic: true,
        gl: { antialias: false },
        camera: { zoom: 5, position: [0, 0, 200], far: 300, near: 50 },
        onCreated: (state) => {
          state.events.connect(document.getElementById("root")!);
          state.setEvents({
            compute: (event, state) => {
              state.pointer.set(
                (event.clientX / state.size.width) * 2 - 1,
                -(event.clientY / state.size.height) * 2 + 1
              );
              state.raycaster.setFromCamera(state.pointer, state.camera);
            },
          });
        },
      });
    }
    const resize = () => {
      if (root.current) {
        root.current.configure({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };
    window.addEventListener("resize", resize);
    root.current?.render(children);
    return () => window.removeEventListener("resize", resize);
  }, [children]);

  return (
    <canvas
      ref={canvas}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "block",
      }}
    />
  );
}
