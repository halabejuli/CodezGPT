import React from "react";
import {
  AbsoluteFill,
  Audio,
  Composition,
  Easing,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Mark, Wordmark } from "./Nablash20";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
const cream = "#F7F0E6",
  dark = "#293D42";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const lerp = (f: number, a: number, b: number, x: number, y: number) =>
  interpolate(f, [a, b], [x, y], clamp);
const pop = (f: number, a: number) =>
  spring({
    frame: f - a,
    fps: 30,
    config: { mass: 1, damping: 22, stiffness: 125 },
  });
const relief = (color: string, depth = 10) =>
  Array.from(
    { length: depth },
    (_, i) => `${(i + 1) * 0.32}px ${(i + 1) * 0.8}px 0 ${color}`,
  ).join(", ") + ", 9px 21px 22px #0000005c";
const Text: React.FC<{
  f: number;
  at: number;
  children: React.ReactNode;
  size: number;
  style?: React.CSSProperties;
  raised?: boolean;
  shadow?: string;
}> = ({ f, at, children, size, style, raised = false, shadow = "#aaa397" }) => {
  const p = pop(f, at);
  return (
    <div
      style={{
        fontSize: size,
        lineHeight: 1.06,
        letterSpacing: -size * 0.042,
        fontWeight: 750,
        color: cream,
        opacity: lerp(f, at, at + 5, 0, 1),
        transform: `translate3d(${(1 - p) * -20}px,${(1 - p) * 55}px,0)`,
        filter: `blur(${lerp(f, at, at + 10, 7, 0)}px)`,
        textShadow: raised ? relief(shadow) : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
const Plate: React.FC<{
  n: number;
  f: number;
  duration: number;
  push?: number;
  x?: number;
  y?: number;
}> = ({ n, f, duration, push = 0.055, x = 0, y = 0 }) => {
  const k = lerp(f, 0, duration, 0, 1);
  return (
    <Img
      src={staticFile(`film/plate-${n}.png`)}
      style={{
        position: "absolute",
        width: 1920,
        height: 1080,
        objectFit: "cover",
        transform: `translate(${x * k}px,${y * k}px) scale(${1 + push * k})`,
        transformOrigin: "50% 50%",
      }}
    />
  );
};
const Shot: React.FC<{ n: number; children: React.ReactNode }> = ({
  n,
  children,
}) => {
  const f = useCurrentFrame();
  const edge = interpolate(f, [0, 15], [-480, 2450], {
    ...clamp,
    easing: Easing.bezier(0.2, 0.7, 0.2, 1),
  });
  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        clipPath:
          n === 1
            ? undefined
            : `polygon(0 0, ${edge - 300}px 0, ${edge + 300}px 100%, 0 100%)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
const Dust: React.FC<{ f: number; fade?: number }> = ({ f, fade = 1 }) => (
  <svg
    width="1920"
    height="1080"
    style={{
      position: "absolute",
      inset: 0,
      opacity: 0.22 * fade,
      pointerEvents: "none",
    }}
  >
    {Array.from({ length: 36 }, (_, i) => (
      <circle
        key={i}
        cx={(i * 137.13 + f * ((i % 3) - 1) * 0.43 + 1920) % 1920}
        cy={(i * 89.83 - f * 0.35 + 1080) % 1080}
        r={i % 3 === 0 ? 1.9 : 0.9}
        fill={i % 2 === 0 ? cream : "#9A5233"}
      />
    ))}
  </svg>
);
const First = () => {
  const f = useCurrentFrame();
  return (
    <Shot n={1}>
      <Plate n={1} f={f} duration={100} push={0.045} x={-12} y={4} />
      <div
        style={{
          position: "absolute",
          left: 680,
          top: 400,
          transform: `translate(${-f * 0.13}px,${f * 0.025}px)`,
        }}
      >
        <Text f={f} at={8} size={105} style={{ color: dark, fontWeight: 800 }}>
          Tu casa.
        </Text>
        <Text
          f={f}
          at={34}
          size={43}
          style={{
            color: dark,
            fontWeight: 400,
            letterSpacing: -1,
            marginTop: 21,
          }}
        >
          Debería darte{" "}
          <span
            style={{ display: "inline-block", opacity: lerp(f, 53, 61, 0, 1) }}
          >
            paz.
          </span>
        </Text>
      </div>
    </Shot>
  );
};
const Second = () => {
  const f = useCurrentFrame();
  return (
    <Shot n={2}>
      <Plate n={2} f={f} duration={100} push={0.07} x={-22} y={-7} />
      <div
        style={{
          position: "absolute",
          left: 130,
          top: 190,
          perspective: 1800,
          transform: `translate(${-f * 0.26}px,${-f * 0.07}px) rotate(-5deg)`,
        }}
      >
        <Text
          f={f}
          at={10}
          size={195}
          raised
          shadow="#6f3e29"
          style={{
            color: "#c28864",
            transform: `translateY(${(1 - pop(f, 10)) * 85}px) rotateY(12deg) rotateX(5deg)`,
          }}
        >
          desorden
        </Text>
      </div>
      <Text
        f={f}
        at={36}
        size={41}
        style={{
          position: "absolute",
          top: 514,
          left: 690,
          fontWeight: 400,
          letterSpacing: 3,
          color: "#e3dacb",
        }}
      >
        y pequeñas
      </Text>
      <div
        style={{
          position: "absolute",
          left: 1020,
          top: 665,
          transform: `translate(${f * 0.13}px,${f * 0.05}px) rotate(-5deg)`,
          perspective: 1800,
        }}
      >
        <Text
          f={f}
          at={50}
          size={155}
          raised
          shadow="#99958d"
          style={{
            transform: `translateY(${(1 - pop(f, 50)) * 85}px) rotateY(-8deg)`,
          }}
        >
          molestias.
        </Text>
      </div>
      <Dust f={f} fade={lerp(f, 10, 70, 0.2, 1)} />
    </Shot>
  );
};
const Third = () => {
  const f = useCurrentFrame();
  return (
    <Shot n={3}>
      <Plate n={3} f={f} duration={100} push={0.1} x={-18} y={14} />
      <div
        style={{
          position: "absolute",
          left: 305,
          top: 230,
          transform: `translate(${-f * 0.32}px,${-f * 0.16}px) scale(${1 + f * 0.0004})`,
          transformOrigin: "left center",
        }}
      >
        <Text
          f={f}
          at={10}
          size={57}
          style={{ fontWeight: 400, letterSpacing: 10 }}
        >
          te consumen
        </Text>
        <Text
          f={f}
          at={35}
          size={265}
          raised
          shadow="#99968d"
          style={{ fontWeight: 800, marginTop: 38 }}
        >
          Tu día.
        </Text>
      </div>
      <Dust f={f} fade={0.35} />
    </Shot>
  );
};
const Fourth = () => {
  const f = useCurrentFrame();
  const p = pop(f, 11);
  return (
    <Shot n={4}>
      <Plate n={4} f={f} duration={100} push={0.025} />
      <div
        style={{
          position: "absolute",
          left: 765,
          top: 155,
          opacity: lerp(f, 11, 18, 0, 1),
          transform: `translateY(${(1 - p) * 80}px) scale(${0.88 + p * 0.12})`,
          filter:
            "drop-shadow(1px 3px 0 #b5ad9d) drop-shadow(5px 18px 12px #0008)",
        }}
      >
        <Mark material style={{ width: 390, height: 316 }} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 570,
          left: 660,
          opacity: lerp(f, 20, 30, 0, 1),
          transform: `translateY(${(1 - pop(f, 20)) * 20}px)`,
          filter:
            "drop-shadow(1px 3px 0 #948e82) drop-shadow(4px 10px 7px #0007)",
        }}
      >
        <Wordmark width={600} />
      </div>
      <Text
        f={f}
        at={54}
        size={79}
        raised
        shadow="#99968d"
        style={{
          position: "absolute",
          top: 748,
          width: "100%",
          textAlign: "center",
          letterSpacing: -2,
        }}
      >
        Más simple.
      </Text>
      {[
        "menos\ndesorden",
        "menos\npreocupaciones",
        "más\ntiempo",
        "más\nvida",
      ].map((t, i) => (
        <Text
          key={i}
          f={f}
          at={29 + i * 4}
          size={34}
          style={{
            position: "absolute",
            left: i < 2 ? 205 : 1540,
            top: 315 + (i % 2) * 190,
            fontWeight: 400,
            whiteSpace: "pre-line",
            letterSpacing: 3,
            lineHeight: 1.35,
          }}
        >
          {t}
        </Text>
      ))}
    </Shot>
  );
};
const Fifth = () => {
  const f = useCurrentFrame();
  return (
    <Shot n={5}>
      <Plate n={5} f={f} duration={130} push={0.04} x={-5} />
      <div
        style={{
          position: "absolute",
          left: 150,
          top: 300,
          transform: `translateX(${-f * 0.08}px)`,
        }}
      >
        <Text f={f} at={9} size={110} style={{ color: dark, fontWeight: 800 }}>
          Menos
        </Text>
        <Text f={f} at={24} size={110} style={{ color: dark, fontWeight: 800 }}>
          esfuerzo.
        </Text>
        <Text
          f={f}
          at={63}
          size={94}
          style={{
            color: "#687370",
            fontWeight: 400,
            letterSpacing: -4,
            marginTop: 23,
          }}
        >
          Más calma.
        </Text>
      </div>
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background:
            "linear-gradient(120deg,transparent 20%,#fff7db1c 46%,transparent 65%)",
          transform: `translateX(${lerp(f, 0, 120, -250, 180)}px)`,
        }}
      />
    </Shot>
  );
};
const Sixth = () => {
  const f = useCurrentFrame();
  return (
    <Shot n={6}>
      <Plate n={6} f={f} duration={120} push={0.02} />
      <div
        style={{
          position: "absolute",
          left: 320,
          top: 375,
          display: "flex",
          alignItems: "center",
          gap: 80,
          opacity: lerp(f, 10, 20, 0, 1),
          transform: `translateY(${(1 - pop(f, 10)) * 55}px)`,
          filter:
            "drop-shadow(1px 3px 0 #b4ad9d) drop-shadow(5px 15px 12px #0007)",
        }}
      >
        <Mark material style={{ width: 225, height: 182 }} />
        <Wordmark width={900} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 540,
          top: 645,
          display: "flex",
          gap: 11,
          color: cream,
          fontWeight: 400,
          fontSize: 43,
          letterSpacing: -1,
        }}
      >
        {["Soluciones", "para", "tu", "día", "a", "día."].map((w, i) => (
          <span
            key={i}
            style={{
              opacity: lerp(f, 32 + i * 5, 39 + i * 5, 0, 1),
              transform: `translateY(${(1 - pop(f, 32 + i * 5)) * 22}px)`,
            }}
          >
            {w}
          </span>
        ))}
      </div>
    </Shot>
  );
};
export const NablashFilm = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: dark, fontFamily: "Inter, sans-serif" }}>
      <Sequence durationInFrames={105}>
        <First />
      </Sequence>
      <Sequence from={90} durationInFrames={105}>
        <Second />
      </Sequence>
      <Sequence from={180} durationInFrames={105}>
        <Third />
      </Sequence>
      <Sequence from={270} durationInFrames={105}>
        <Fourth />
      </Sequence>
      <Sequence from={360} durationInFrames={135}>
        <Fifth />
      </Sequence>
      <Sequence from={480} durationInFrames={120}>
        <Sixth />
      </Sequence>
      <Audio src={staticFile("audio/nablash-sfx.wav")} volume={1.65} />
      <AbsoluteFill
        style={{ background: dark, opacity: lerp(f, 593, 599, 0, 1) }}
      />
    </AbsoluteFill>
  );
};
export const NablashFilmComposition = () => (
  <Composition
    id="NablashFilm"
    component={NablashFilm}
    durationInFrames={600}
    fps={30}
    width={1920}
    height={1080}
  />
);
