import React from "react";
import { AbsoluteFill, Composition, spring, useCurrentFrame } from "remotion";
import "./style.css";

// All entrances derive from this word clock. Frames are relative to each phrase.
export const script = [
  {
    start: 0,
    end: 110,
    text: "Tu casa es un caos.",
    headline: "Tu casa es",
    accent: "un caos.",
    cue: "caos",
    scene: "chaos",
  },
  {
    start: 110,
    end: 300,
    text: "El lugar en el que debería haber calma y paz,",
    headline: "Debería haber",
    accent: "calma y paz.",
    cue: "calma",
    scene: "wish",
  },
  {
    start: 300,
    end: 510,
    text: "en la práctica hace que tu vida sea un poquito más compleja e incómoda.",
    headline: "Pero todo se vuelve",
    accent: "más complicado.",
    cue: "compleja",
    scene: "complex",
  },
  {
    start: 510,
    end: 650,
    text: "Cada molestia,",
    headline: "Cada",
    accent: "molestia.",
    cue: "molestia",
    scene: "annoyance",
  },
  {
    start: 650,
    end: 790,
    text: "cada tardanza,",
    headline: "Cada",
    accent: "tardanza.",
    cue: "tardanza",
    scene: "delay",
  },
  {
    start: 790,
    end: 930,
    text: "cada esfuerzo te cansan",
    headline: "Cada esfuerzo",
    accent: "te cansa.",
    cue: "esfuerzo",
    scene: "effort",
  },
  {
    start: 930,
    end: 1060,
    text: "y todo contribuye para mal.",
    headline: "Se acumula.",
    accent: "Y pesa.",
    cue: "mal",
    scene: "weight",
  },
  {
    start: 1060,
    end: 1230,
    text: "Por eso, Nablash está para ayudar",
    headline: "Por eso,",
    accent: "Nablash.",
    cue: "Nablash",
    scene: "brand",
  },
  {
    start: 1230,
    end: 1440,
    text: "a que vuelvas a tener la sensación de paz que tiene que haber en tu hogar.",
    headline: "Vuelve a sentir",
    accent: "paz en tu hogar.",
    cue: "paz",
    scene: "peace",
  },
  {
    start: 1440,
    end: 1590,
    text: "Nablash, soluciones para tu día a día.",
    headline: "Nablash",
    accent: "Soluciones para tu día a día.",
    cue: "Nablash",
    scene: "end",
  },
] as const;
export const DURATION = 1590;
const ink = "#242b28",
  green = "#326b55",
  orange = "#d76c45";
function wordFrame(s: (typeof script)[number], word: string) {
  return (
    s.start +
    Math.round(
      (s.text.split(" ").findIndex((w) => w.replace(/[.,]/g, "") === word) *
        (s.end - s.start - 34)) /
        s.text.split(" ").length,
    )
  );
}
function pop(f: number, at: number) {
  return spring({
    frame: f - at,
    fps: 30,
    config: { damping: 17, stiffness: 110 },
  });
}
const House: React.FC<{ f: number; scene: string; cue: number }> = ({
  f,
  scene,
  cue,
}) => {
  const calm = scene === "peace" || scene === "end";
  const relief = scene === "brand" || calm;
  const p = pop(f, cue);
  const jitter = relief ? 0 : Math.sin(f * 0.19) * (scene === "weight" ? 6 : 2);
  const cloth =
    scene === "chaos" || scene === "complex" || scene === "weight"
      ? p
      : relief
        ? 0
        : 1;
  const personY = scene === "effort" ? Math.sin(f * 0.14) * 6 : 0;
  return (
    <svg
      viewBox="0 0 950 820"
      style={{ width: 1020, height: 880, overflow: "visible" }}
    >
      <defs>
        <pattern
          id="grain"
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="3" r=".6" fill={ink} opacity=".055" />
        </pattern>
      </defs>
      <circle cx="490" cy="409" r="350" fill={relief ? "#dce8c9" : "#eddfcf"} />
      <circle
        cx="490"
        cy="409"
        r={320 + Math.sin(f / 35) * 6}
        fill="none"
        stroke={relief ? "#9cb79c" : "#d9bd9c"}
        strokeDasharray="3 15"
      />
      <g
        transform={`translate(${jitter} 0)`}
        stroke={ink}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M115 298L470 80L825 298" fill="none" strokeWidth="13" />
        <path d="M155 288V676H788V288" fill={relief ? "#f6f7e9" : "#f5ecdf"} />
        <path d="M155 676H788" strokeWidth="12" />
        <path d="M205 303H365V464H205Z" fill={relief ? "#b5d8c0" : "#c6d4cf"} />
        <path d="M285 303V464M205 383H365" />
        <circle cx="245" cy="345" r="21" fill="#f0b957" stroke="none" />
        <path d="M623 323H733V444H623Z" fill="#eee0c8" />
        <path d="M640 407L671 365L710 407" fill="none" stroke={green} />
        <path
          d="M510 566Q510 547 531 547H725Q749 547 749 569V640H510Z"
          fill={relief ? "#95bca0" : "#dd9b7c"}
        />
        <path
          d="M529 550V512Q529 495 548 495H710Q730 495 730 514V550"
          fill={relief ? "#b0ccad" : "#e6b69b"}
        />
        <path d="M547 639V669M713 639V669" />
        <g transform={`translate(0 ${personY})`}>
          <ellipse
            cx="419"
            cy="666"
            rx="91"
            ry="14"
            fill={ink}
            opacity=".1"
            stroke="none"
          />
          <path
            d={
              relief
                ? "M387 520L378 584L358 651M438 520L449 582L470 651"
                : "M391 520L393 579L374 651M435 520L434 579L451 651"
            }
            fill="none"
            stroke={ink}
            strokeWidth="29"
          />
          <path d="M355 655H386M442 655H475" strokeWidth="17" />
          <path
            d="M384 413Q417 390 447 419L449 528H383Z"
            fill={relief ? green : orange}
          />
          <path
            d={
              relief
                ? "M386 432L355 477L322 449M446 433L475 470L497 444"
                : "M384 434L364 486L386 499M446 434L471 479L452 501"
            }
            fill="none"
            stroke={relief ? green : orange}
            strokeWidth="23"
          />
          <path d="M412 400V418" stroke="#c38d68" strokeWidth="19" />
          <ellipse cx="414" cy="360" rx="38" ry="44" fill="#d8a27a" />
          <path
            d="M376 356Q363 299 411 308Q463 299 452 355L441 334Q410 345 384 328Z"
            fill={ink}
          />
          <path d="M398 358V361M430 358V361" strokeWidth="5" />
          <path
            d={relief ? "M400 381Q415 394 430 381" : "M402 387Q414 374 428 387"}
            fill="none"
            strokeWidth="3"
          />
          {!relief && (
            <path d="M390 347L402 351M426 351L439 347" strokeWidth="3" />
          )}
        </g>
        <g opacity={cloth} transform={`translate(0 ${(1 - cloth) * 80})`}>
          <path d="M220 641L240 600L269 617L289 590L320 642Z" fill="#b5b5cb" />
          <path d="M282 643L308 614L337 651Z" fill="#ddaa72" />
          <path d="M565 510L587 537L640 513L659 550H569Z" fill="#b5b5cb" />
          <path d="M688 640L704 611L746 634L755 662H686Z" fill="#ddaa72" />
        </g>
        <g transform={`translate(210 560) scale(${relief ? 1 : 0.75})`}>
          <path d="M0 42H60L51 99H10Z" fill="#d9ac81" />
          <path d="M30 40V-38" stroke={green} />
          <path
            d="M29 17Q-22 -15 4 -29Q29 -34 29 17M31 -5Q72 -51 77 -20Q74 3 31 -5"
            fill={green}
            stroke={green}
          />
        </g>
      </g>
      {scene === "annoyance" && (
        <g transform={`translate(665 255) scale(${p})`}>
          <circle r="72" fill={orange} />
          <path
            d="M-20-30L20 10M20-30L-20 10M-23 36H23"
            stroke="#fff5e8"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M-86-18L-110-33M87-18L110-33"
            stroke={orange}
            strokeWidth="7"
          />
        </g>
      )}
      {scene === "delay" && (
        <g transform={`translate(650 225) scale(${p})`}>
          <circle r="85" fill="#f0ba62" stroke={ink} strokeWidth="5" />
          <g transform={`rotate(${(f - cue) * 1.8})`}>
            <path
              d="M0 0V-59"
              stroke={ink}
              strokeWidth="7"
              strokeLinecap="round"
            />
          </g>
          <path
            d="M0 0L37 19"
            stroke={ink}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <circle r="6" fill={ink} />
        </g>
      )}
      {scene === "effort" && (
        <g transform={`translate(417 237) scale(${p})`}>
          <path
            d="M-98 50L-63-44H64L98 50Z"
            fill="#aba9bb"
            stroke={ink}
            strokeWidth="5"
          />
          <text
            textAnchor="middle"
            y="23"
            fontSize="43"
            fill={ink}
            fontWeight="700"
          >
            UFF.
          </text>
          <path
            d="M-125 0L-144-20M125 0L144-20"
            stroke={orange}
            strokeWidth="7"
          />
        </g>
      )}
      {scene === "weight" && (
        <g transform={`translate(415 ${204 + 40 * p}) scale(${p})`}>
          <path
            d="M-120-60H120V35H-120Z"
            fill={orange}
            stroke={ink}
            strokeWidth="5"
          />
          <text
            textAnchor="middle"
            y="3"
            fontSize="38"
            fill="#fff5e8"
            fontWeight="700"
          >
            TODO PESA
          </text>
          <path
            d="M0 40V68M-12 56L0 68L12 56"
            fill="none"
            stroke={ink}
            strokeWidth="5"
          />
        </g>
      )}
      {relief &&
        [0, 1, 2].map((i) => (
          <g
            key={i}
            transform={`translate(${[210, 730, 625][i]} ${[240, 210, 390][i]}) scale(${pop(f, cue + i * 7)})`}
            stroke={green}
            strokeWidth="4"
          >
            <path d="M-16 0H16M0-16V16" />
            <circle r="30" fill="none" opacity=".2" />
          </g>
        ))}
    </svg>
  );
};
export const Nablash: React.FC = () => {
  const f = useCurrentFrame();
  const idx = script.findIndex((s) => f >= s.start && f < s.end);
  const s = script[Math.max(0, idx)];
  const cue = wordFrame(s, s.cue);
  const entry = pop(f, s.start);
  const accent = pop(f, cue);
  const ending = s.scene === "end";
  const calm = ["brand", "peace", "end"].includes(s.scene);
  const words = s.text.split(" ");
  const step = (s.end - s.start - 34) / words.length;
  const active = Math.min(
    words.length - 1,
    Math.max(0, Math.floor((f - s.start) / step)),
  );
  return (
    <AbsoluteFill
      style={{
        background: calm ? "#edf1df" : "#f6eee1",
        color: ink,
        fontFamily: "Nablash Sans, sans-serif",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(#242b2810 0.7px, transparent 0.7px)",
          backgroundSize: "8px 8px",
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 54,
          left: 86,
          right: 86,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 33, letterSpacing: -1 }}>
          nablash<span style={{ color: green }}>.</span>
        </div>
        <div style={{ fontSize: 14, letterSpacing: 4 }}>
          HOGAR / BIENESTAR / CADA DÍA
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 86,
          top: 242,
          width: 795,
          opacity: entry,
          transform: `translateY(${(1 - entry) * 30}px)`,
        }}
      >
        <div
          style={{
            fontSize: 15,
            letterSpacing: 4,
            color: calm ? green : orange,
            marginBottom: 38,
            display: "flex",
            gap: 17,
            alignItems: "center",
          }}
        >
          <span
            style={{ width: 38, height: 2, background: calm ? green : orange }}
          />
          {calm ? "MENOS FRICCIÓN. MÁS VIDA." : "LO COTIDIANO TAMBIÉN PESA."}
        </div>
        <div
          style={{
            fontSize: ending ? 130 : 87,
            fontWeight: 750,
            lineHeight: 1.04,
            letterSpacing: -5,
          }}
        >
          {s.headline}
        </div>
        <div
          style={{
            fontSize: ending ? 43 : 91,
            fontWeight: 750,
            lineHeight: 1.06,
            letterSpacing: ending ? -1.5 : -5,
            marginTop: 12,
            color: calm ? green : orange,
            opacity: accent,
            transform: `translateY(${(1 - accent) * 35}px)`,
          }}
        >
          {s.accent}
        </div>
        <div
          style={{
            marginTop: 48,
            width: 570,
            height: 2,
            background: calm ? "#afc1a2" : "#d9cbb8",
          }}
        />
        <div
          style={{
            marginTop: 26,
            fontSize: 23,
            color: "#777d72",
            letterSpacing: 0.3,
          }}
        >
          {ending
            ? "Tu hogar, como debería sentirse."
            : calm
              ? "Un pequeño cambio puede cambiar tu día."
              : "De la primera molestia al último suspiro."}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 20,
          top: 114,
          transform: ending ? "scale(.91)" : "none",
        }}
      >
        <House f={f} scene={s.scene} cue={cue} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 86,
          right: 86,
          borderTop: "1px solid #242b2825",
          paddingTop: 28,
          display: "flex",
          gap: 28,
          alignItems: "flex-start",
        }}
      >
        <span
          style={{
            fontSize: 13,
            letterSpacing: 3,
            color: green,
            paddingTop: 7,
          }}
        >
          {" "}
          {String(idx + 1).padStart(2, "0")} / 10
        </span>
        <div style={{ fontSize: 29, lineHeight: 1.35, maxWidth: 1540 }}>
          {words.map((w, i) => (
            <span
              key={i}
              style={{
                color:
                  i === active
                    ? calm
                      ? green
                      : orange
                    : i < active
                      ? ink
                      : "#a8a699",
                fontWeight: i === active ? 750 : 450,
              }}
            >
              {w}{" "}
            </span>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: `${(f / (DURATION - 1)) * 100}%`,
          height: 5,
          background: calm ? green : orange,
        }}
      />
    </AbsoluteFill>
  );
};
export const MyComposition = () => (
  <Composition
    id="Nablash"
    component={Nablash}
    durationInFrames={DURATION}
    fps={30}
    width={1920}
    height={1080}
  />
);
