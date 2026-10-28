"use client";

import { useState } from "react";
import {
  SEAT_RANGE,
  VETO_RANGE,
  seatThreshold,
  vetoGate,
  type SeatThreshold,
  type VetoGate,
} from "@/lib/political-science/seat-threshold";

const SCALE_NOTE = "示意刻度，不是选举预测";

export function SeatThresholdLab() {
  const [seats, setSeats] = useState(100);
  const [yes, setYes] = useState(66);
  const [players, setPlayers] = useState(3);
  const [agreed, setAgreed] = useState(2);
  const seat = seatThreshold(seats, yes);
  const veto = vetoGate(players, agreed);

  return (
    <div className="border-border-faint bg-bg-near space-y-8 rounded-2xl border p-5 sm:p-6">
      <SeatRegion
        seat={seat}
        onSeats={(value) => {
          const next = seatThreshold(value, yes);
          setSeats(next.seats);
          setYes(next.yes);
        }}
        onYes={(value) => setYes(seatThreshold(seats, value).yes)}
      />
      <VetoRegion
        veto={veto}
        onPlayers={(value) => {
          const next = vetoGate(value, agreed);
          setPlayers(next.players);
          setAgreed(next.agreed);
        }}
        onAgreed={(value) => setAgreed(vetoGate(players, value).agreed)}
      />
    </div>
  );
}

function ScaleRange({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 flex items-center justify-between text-[12.5px]">
        <span className="text-fg-secondary">{label}</span>
        <span className="text-fg-primary font-mono">{value}</span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={`${label} ${value}。${SCALE_NOTE}`}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full"
      />
    </div>
  );
}

function SeatRegion({
  seat,
  onSeats,
  onYes,
}: {
  seat: SeatThreshold;
  onSeats: (value: number) => void;
  onYes: (value: number) => void;
}) {
  const half = seat.simplePasses ? "过半通过" : "过半不通过";
  const twoThirds = seat.twoThirdsPasses ? "三分之二通过" : "三分之二不通过";
  return (
    <section aria-label="议席计数" className="space-y-4">
      <h2 className="text-fg-primary text-lg font-semibold">议席</h2>
      <ScaleRange
        id="seat-threshold-seats"
        label="席位"
        value={seat.seats}
        min={SEAT_RANGE.min}
        max={SEAT_RANGE.max}
        step={SEAT_RANGE.step}
        onChange={onSeats}
      />
      <ScaleRange
        id="seat-threshold-yes"
        label="赞成票"
        value={seat.yes}
        min={0}
        max={seat.seats}
        step={1}
        onChange={onYes}
      />
      <p className="text-fg-muted text-[12px] tracking-wide">{SCALE_NOTE}</p>
      <p className="text-fg-secondary text-[14.5px] leading-relaxed" aria-live="polite">
        席位 {seat.seats}，赞成票 {seat.yes}。简单多数线 floor({seat.seats}/2)+1 = {seat.simpleLine}
        ，{half}。三分之二线 ceil(2×{seat.seats}/3) = {seat.twoThirdsLine}，{twoThirds}
        。这是把专页「三分之二多数」收成可数的整数线，不是对任何议会的预报。
      </p>
    </section>
  );
}

function VetoRegion({
  veto,
  onPlayers,
  onAgreed,
}: {
  veto: VetoGate;
  onPlayers: (value: number) => void;
  onAgreed: (value: number) => void;
}) {
  const verdict = veto.passes ? "通过" : "被否决";
  return (
    <section aria-label="否决者计数" className="space-y-4">
      <h2 className="text-fg-primary text-lg font-semibold">否决者</h2>
      <ScaleRange
        id="seat-threshold-veto-players"
        label="否决者"
        value={veto.players}
        min={VETO_RANGE.min}
        max={VETO_RANGE.max}
        step={VETO_RANGE.step}
        onChange={onPlayers}
      />
      <ScaleRange
        id="seat-threshold-veto-agreed"
        label="同意人数"
        value={veto.agreed}
        min={0}
        max={veto.players}
        step={1}
        onChange={onAgreed}
      />
      <p className="text-fg-muted text-[12px] tracking-wide">{SCALE_NOTE}</p>
      <p className="text-fg-secondary text-[14.5px] leading-relaxed" aria-live="polite">
        否决者 {veto.players} 人，其中同意 {veto.agreed}{" "}
        人。议案只有同意人数等于否决者人数才通过，因此
        {verdict}。多一个否决点，现状就多一道关，不是选举模型。
      </p>
    </section>
  );
}
