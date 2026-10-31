import { RAMP_LENGTH, rampAcceleration, rampDuration, type RampMeasurement } from "./galileo-model";

type Props = { sample: RampMeasurement; measurements: RampMeasurement[] };

function RampView({ sample }: Pick<Props, "sample">) {
  const angle = (sample.angle * Math.PI) / 180;
  const end = { x: 65 + 440 * Math.cos(angle), y: 65 + 440 * Math.sin(angle) };
  const position = sample.distance / RAMP_LENGTH;
  const ball = {
    x: 65 + (end.x - 65) * position + 10 * Math.sin(angle),
    y: 65 + (end.y - 65) * position - 10 * Math.cos(angle),
  };
  return (
    <svg
      viewBox="0 0 600 340"
      role="img"
      aria-label="实心球在四米斜面上从静止纯滚动的示意图"
      className="w-full rounded-xl bg-[#080c18]"
    >
      <path
        d={`M65 65 L${end.x} ${end.y} L${end.x} 310 L65 310 Z`}
        fill="#223348"
        fillOpacity="0.45"
        stroke="#a8adbd"
        strokeWidth="2"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <g
          key={i}
          transform={`translate(${65 + ((end.x - 65) * i) / 4} ${65 + ((end.y - 65) * i) / 4})`}
        >
          <path d="M0 5 v10" stroke="#6ad0ff" />
          <text y="30" textAnchor="middle" fontSize="13" fill="#b2c9dd">
            {i} m
          </text>
        </g>
      ))}
      <circle cx={ball.x} cy={ball.y} r="10" fill="#ffb45a" stroke="#ffe0b5" strokeWidth="2" />
      <text x="35" y="30" fontSize="16" fill="#b2c9dd">
        θ = {sample.angle}° · a = {rampAcceleration(sample.angle).toFixed(3)} m/s²
      </text>
      <text x="565" y="30" textAnchor="end" fontSize="16" fill="#6ad0ff">
        t = {sample.time.toFixed(3)} s
      </text>
    </svg>
  );
}

function RampChart({ sample, measurements }: Props) {
  const timeSquared = rampDuration(sample.angle) ** 2;
  const x = (time: number) => 55 + (490 * time ** 2) / timeSquared;
  const y = (distance: number) => 190 - (155 * distance) / RAMP_LENGTH;
  return (
    <svg
      viewBox="0 0 600 230"
      role="img"
      aria-label="距离对时间平方图，虚线为当前角度模型，圆点为记录数据"
      className="w-full rounded-xl bg-[#080c18]"
    >
      <path d="M55 20 V190 H565" stroke="#a8adbd" fill="none" />
      <path d="M55 190 L545 35" stroke="#ffb45a" strokeDasharray="6 5" />
      {measurements
        .filter((m) => m.angle === sample.angle)
        .map((m, i) => (
          <circle key={i} cx={x(m.time)} cy={y(m.distance)} r="5" fill="#6ad0ff" />
        ))}
      <text x="300" y="220" textAnchor="middle" fontSize="14" fill="#b2c9dd">
        时间平方 t² (s²) · 0 至 {timeSquared.toFixed(2)}
      </text>
      <text
        x="12"
        y="110"
        transform="rotate(-90 12 110)"
        textAnchor="middle"
        fontSize="14"
        fill="#b2c9dd"
      >
        距离 s (m)
      </text>
      <text x="42" y="40" textAnchor="end" fontSize="13" fill="#b2c9dd">
        4
      </text>
      <text x="42" y="194" textAnchor="end" fontSize="13" fill="#b2c9dd">
        0
      </text>
    </svg>
  );
}

export function GalileoDiagram(props: Props) {
  return (
    <div className="grid gap-3">
      <RampView sample={props.sample} />
      {props.measurements.length > 0 && <RampChart {...props} />}
    </div>
  );
}
