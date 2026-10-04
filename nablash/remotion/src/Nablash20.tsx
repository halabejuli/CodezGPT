import React from "react";
import {
  AbsoluteFill,
  Audio,
  Composition,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import "./style.css";
const C = {
  dark: "#293D42",
  cream: "#F7F0E6",
  deep: "#203034",
  slate: "#47575A",
  sage: "#858D8B",
  gray: "#E6E1D8",
  rust: "#9A5233",
};
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = (f: number, a: number, b: number, x: number, y: number) =>
  interpolate(f, [a, b], [x, y], clamp);
const pop = (f: number, at = 0) =>
  spring({
    frame: f - at,
    fps: 30,
    config: { damping: 20, stiffness: 150, mass: 0.8 },
  });
// Vector tracing of the supplied house / leaf N; all framing shapes derive from these contours.
const paths = [
  "M0 88C0 33 39 0 84 0C117 0 135 15 160 37L340 200Q359 217 359 236L359 300L205 145Q173 116 144 144L0 294Z",
  "M128 188L128 408H65C29 408 17 386 17 349C17 287 52 245 128 188Z",
  "M146 408C138 320 195 257 271 257C278 333 212 359 146 408Z",
  "M379 115C401 51 449 21 504 21L504 345C504 380 478 408 445 408C408 408 379 384 379 345Z",
];
export const Mark: React.FC<{
  color?: string;
  style?: React.CSSProperties;
  outline?: boolean;
  material?: boolean;
}> = ({ color = C.cream, style, outline = false, material = false }) => {
  const id = React.useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 504 408"
      style={{ width: 504, height: 408, overflow: "visible", ...style }}
    >
      <defs>
        <linearGradient id={`surface${id}`} x1="0" y1="0" x2=".7" y2="1">
          <stop offset="0" stopColor="#fff8eb" />
          <stop offset=".5" stopColor={color} />
          <stop offset="1" stopColor="#d4cdbf" />
        </linearGradient>
        <filter id={`grain${id}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".45"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feComponentTransfer in="noise" result="soft">
            <feFuncR type="linear" slope=".13" intercept=".87" />
            <feFuncG type="linear" slope=".13" intercept=".87" />
            <feFuncB type="linear" slope=".13" intercept=".87" />
          </feComponentTransfer>
          <feComposite
            in="soft"
            in2="SourceGraphic"
            operator="in"
            result="masked"
          />
          <feBlend in="SourceGraphic" in2="masked" mode="multiply" />
        </filter>
      </defs>
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill={outline ? "none" : material ? `url(#surface${id})` : color}
          stroke={outline ? color : undefined}
          strokeWidth={outline ? 1.3 : undefined}
          filter={material ? `url(#grain${id})` : undefined}
        />
      ))}
    </svg>
  );
};
const letterPaths = [
  "M0 60V0L42 60V0",
  "M0 60L22 0L44 60",
  "M0 60V0H22Q43 0 43 15Q43 29 23 29H0M23 29Q47 29 47 45Q47 60 23 60H0",
  "M0 0V60H39",
  "M0 60L22 0L44 60",
  "M43 6Q33-3 15 1Q-1 5 1 18Q3 29 23 31Q47 33 44 48Q41 63 21 61Q6 61-1 54",
  "M0 0V60M44 0V60M0 30H44",
];
export const Wordmark: React.FC<{ width?: number; color?: string }> = ({
  width = 740,
  color = C.cream,
}) => (
  <svg
    viewBox="-5 -5 635 75"
    style={{ width, height: (width * 75) / 635, overflow: "visible" }}
  >
    {letterPaths.map((d, i) => (
      <path
        key={i}
        d={d}
        transform={`translate(${i * 97} 0)`}
        fill="none"
        stroke={color}
        strokeWidth="3.4"
        strokeLinejoin="miter"
      />
    ))}
  </svg>
);
const Head: React.FC<{
  text: string;
  f: number;
  at?: number;
  size?: number;
  style?: React.CSSProperties;
}> = ({ text, f, at = 0, size = 112, style }) => {
  const p = pop(f, at);
  return (
    <div
      style={{
        fontWeight: 750,
        fontSize: size,
        lineHeight: 1.08,
        letterSpacing: -size * 0.045,
        opacity: ease(f, at, at + 6, 0, 1),
        transform: `translateY(${(1 - p) * 75}px) rotate(${(1 - p) * -3}deg)`,
        ...style,
      }}
    >
      {text}
    </div>
  );
};
const Scene: React.FC<{ n: number; children: React.ReactNode }> = ({
  n,
  children,
}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: ease(f, 0, 5, 0, 1) }}>
      {children}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 70,
          fontSize: 15,
          letterSpacing: 3,
          opacity: 0.4,
        }}
      >
        NABLASH / {String(n).padStart(2, "0")}
      </div>
    </AbsoluteFill>
  );
};
const One = () => {
  const f = useCurrentFrame();
  return (
    <Scene n={1}>
      <AbsoluteFill style={{ background: C.cream, color: C.dark }} />
      <Mark
        color={C.dark}
        style={{
          position: "absolute",
          width: 1670,
          height: 1352,
          left: 128 - f * 0.7,
          top: -292 + f * 0.3,
          filter: "drop-shadow(24px 24px 25px #20303435)",
          transform: `scale(${ease(f, 0, 88, 1.14, 1)})`,
        }}
      />
      <div style={{ position: "absolute", left: 580, top: 302, color: C.dark }}>
        <Head text="Tu casa." f={f} at={7} size={95} />
        <div style={{ overflow: "hidden", marginTop: 22 }}>
          <Head
            text="Debería darte"
            f={f}
            at={25}
            size={32}
            style={{ fontWeight: 450, letterSpacing: -1 }}
          />
          <Head text="paz." f={f} at={51} size={60} />
        </div>
      </div>
      <Mark
        color={C.sage}
        outline
        style={{
          position: "absolute",
          width: 720,
          height: 582,
          left: 1300,
          top: 690,
          opacity: 0.3,
        }}
      />
    </Scene>
  );
};
const Two = () => {
  const f = useCurrentFrame();
  return (
    <Scene n={2}>
      <AbsoluteFill style={{ background: C.deep }} />
      <Mark
        color={C.slate}
        style={{
          position: "absolute",
          width: 2100,
          height: 1700,
          left: -800 + f * 2,
          top: -640,
          transform: "rotate(-18deg)",
          filter: "drop-shadow(40px 25px 28px #0006)",
        }}
      />
      <Mark
        color={C.rust}
        style={{
          position: "absolute",
          width: 1120,
          height: 907,
          left: 1160 - f * 2,
          top: -260,
          transform: "rotate(18deg)",
          filter: "drop-shadow(20px 20px 25px #0006)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 160,
          top: 130,
          transform: `rotate(${ease(f, 0, 89, -5, -2)}deg)`,
        }}
      >
        <Head
          text="desorden"
          f={f}
          at={9}
          size={195}
          style={{
            color: C.rust,
            textShadow: "0 8px 0 #703b25, 0 24px 30px #0005",
          }}
        />
      </div>
      <Head
        text="y pequeñas"
        f={f}
        at={32}
        size={46}
        style={{
          position: "absolute",
          left: 685,
          top: 487,
          color: C.cream,
          fontWeight: 450,
          letterSpacing: 3,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 110,
          top: 630,
          transform: `rotate(${ease(f, 0, 89, 6, 2)}deg)`,
        }}
      >
        <Head
          text="molestias."
          f={f}
          at={48}
          size={165}
          style={{
            color: C.cream,
            textShadow: "0 7px 0 #858d8b, 0 25px 25px #0006",
          }}
        />
      </div>
    </Scene>
  );
};
const Three = () => {
  const f = useCurrentFrame();
  return (
    <Scene n={3}>
      <AbsoluteFill style={{ background: C.deep }} />
      <Mark
        color={C.slate}
        style={{
          position: "absolute",
          width: 2250,
          height: 1821,
          left: -20 - f * 3,
          top: -490 + f * 2,
          transform: "rotate(-25deg)",
          filter: "drop-shadow(40px 38px 28px #0008)",
        }}
      />
      <Mark
        color={C.cream}
        style={{
          position: "absolute",
          width: 920,
          height: 745,
          left: -330 + f * 3,
          top: 820 - f * 2,
          opacity: 0.23,
          filter: "blur(5px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 345,
          top: 265,
          color: C.cream,
          transform: `scale(${ease(f, 0, 90, 1, 1.14)})`,
        }}
      >
        <Head
          text="te consumen"
          f={f}
          at={4}
          size={57}
          style={{ fontWeight: 450, letterSpacing: 9 }}
        />
        <Head
          text="Tu día."
          f={f}
          at={32}
          size={245}
          style={{
            marginTop: 30,
            textShadow: "0 8px 0 #858d8b, 0 25px 35px #0005",
          }}
        />
      </div>
      <Mark
        color={C.deep}
        style={{
          position: "absolute",
          width: 1020,
          height: 826,
          left: 1370 - f * 5,
          top: 460,
          transform: "rotate(18deg)",
          filter: "drop-shadow(-20px -10px 30px #0007)",
        }}
      />
    </Scene>
  );
};
const Four = () => {
  const f = useCurrentFrame();
  const p = pop(f, 9);
  return (
    <Scene n={4}>
      <AbsoluteFill style={{ background: C.dark }} />
      {[0, 1, 2].map((i) => (
        <Mark
          key={i}
          outline
          color={C.sage}
          style={{
            position: "absolute",
            width: 1400 + i * 450,
            height: ((1400 + i * 450) * 408) / 504,
            left: 260 - i * 250,
            top: -100 - i * 180,
            opacity: 0.1,
            transform: `rotate(${ease(f, 0, 90, 15, 0)}deg)`,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          left: 780,
          top: 120,
          transform: `scale(${0.75 + p * 0.25})`,
          opacity: p,
        }}
      >
        <Mark
          style={{
            width: 360,
            height: 291,
            filter: "drop-shadow(0 18px 24px #0003)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 480,
          width: "100%",
          textAlign: "center",
          opacity: ease(f, 12, 25, 0, 1),
          transform: `translateY(${(1 - pop(f, 12)) * 45}px)`,
        }}
      >
        <Wordmark width={720} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 670,
          width: "100%",
          textAlign: "center",
          color: C.cream,
        }}
      >
        <Head text="Más simple." f={f} at={43} size={85} />
      </div>
      {["menos desorden", "menos esfuerzo", "más tiempo", "más calma"].map(
        (t, i) => (
          <div
            key={t}
            style={{
              position: "absolute",
              left: i < 2 ? 135 : 1455,
              top: 245 + (i % 2) * 155,
              color: C.cream,
              fontSize: 27,
              letterSpacing: 2,
              opacity: ease(f, 27 + i * 4, 42 + i * 4, 0, 0.65),
              transform: `translateX(${(1 - pop(f, 27 + i * 4)) * (i < 2 ? -100 : 100)}px)`,
            }}
          >
            {t}
          </div>
        ),
      )}
    </Scene>
  );
};
const Five = () => {
  const f = useCurrentFrame();
  return (
    <Scene n={5}>
      <AbsoluteFill style={{ background: C.cream, color: C.dark }} />
      <Mark
        color={C.gray}
        style={{
          position: "absolute",
          width: 1220,
          height: 988,
          left: 1020 - f * 0.8,
          top: 130,
          filter: "drop-shadow(-22px 20px 20px #293d4228)",
          transform: `rotate(${ease(f, 0, 120, 7, 0)}deg)`,
        }}
      />
      <Mark
        outline
        color={C.sage}
        style={{
          position: "absolute",
          width: 1220,
          height: 988,
          left: 980,
          top: 140,
          opacity: 0.14,
        }}
      />
      <div style={{ position: "absolute", left: 135, top: 240, color: C.dark }}>
        <Head text="Menos" f={f} at={4} size={102} />
        <Head text="esfuerzo." f={f} at={18} size={130} />
        <Head
          text="Más calma."
          f={f}
          at={57}
          size={114}
          style={{ marginTop: 65, color: C.slate, fontWeight: 450 }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: 140,
          color: C.slate,
          fontSize: 26,
          opacity: ease(f, 85, 100, 0, 0.75),
        }}
      >
        Tu hogar, como debería sentirse.
      </div>
    </Scene>
  );
};
const Six = () => {
  const f = useCurrentFrame();
  return (
    <Scene n={6}>
      <AbsoluteFill style={{ background: C.dark }} />
      <Mark
        color={C.deep}
        style={{
          position: "absolute",
          width: 1480,
          height: 1198,
          left: 960 - f * 0.35,
          top: -120,
          transform: "rotate(-9deg)",
          filter: "drop-shadow(-12px 8px 25px #0002)",
        }}
      />
      <Mark
        outline
        color={C.slate}
        style={{
          position: "absolute",
          width: 1490,
          height: 1206,
          left: 968,
          top: -112,
          transform: "rotate(-9deg)",
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 335,
          top: 350,
          display: "flex",
          alignItems: "center",
          gap: 80,
          opacity: pop(f, 4),
          transform: `translateY(${(1 - pop(f, 4)) * 50}px)`,
        }}
      >
        <Mark style={{ width: 215, height: 174 }} />
        <Wordmark width={895} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 530,
          top: 622,
          color: C.cream,
          display: "flex",
          gap: 12,
          fontSize: 44,
          fontWeight: 450,
          letterSpacing: -1,
        }}
      >
        {["Soluciones", "para", "tu", "día", "a", "día."].map((w, i) => (
          <span
            key={i}
            style={{
              opacity: ease(f, 29 + i * 6, 36 + i * 6, 0, 1),
              transform: `translateY(${(1 - pop(f, 29 + i * 6)) * 24}px)`,
            }}
          >
            {w}
          </span>
        ))}
      </div>
    </Scene>
  );
};
export const Nablash20 = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{ fontFamily: "Nablash Sans, sans-serif", background: C.dark }}
    >
      <Sequence durationInFrames={90}>
        <One />
      </Sequence>
      <Sequence from={90} durationInFrames={90}>
        <Two />
      </Sequence>
      <Sequence from={180} durationInFrames={90}>
        <Three />
      </Sequence>
      <Sequence from={270} durationInFrames={90}>
        <Four />
      </Sequence>
      <Sequence from={360} durationInFrames={120}>
        <Five />
      </Sequence>
      <Sequence from={480} durationInFrames={120}>
        <Six />
      </Sequence>
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          backgroundImage: "radial-gradient(#fff 0.6px, transparent 0.6px)",
          backgroundSize: "5px 5px",
          opacity: 0.028,
        }}
      />
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at 30% 20%, transparent 40%, #00000018 100%)",
        }}
      />
      <AbsoluteFill
        style={{ background: C.deep, opacity: ease(f, 589, 599, 0, 1) }}
      />
      <Audio src={staticFile("audio/nablash-sfx.wav")} />
    </AbsoluteFill>
  );
};
export const Nablash20Composition = () => (
  <Composition
    id="Nablash20"
    component={Nablash20}
    width={1920}
    height={1080}
    fps={30}
    durationInFrames={600}
  />
);
