"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

type AuctionType = "english" | "dutch" | "sealed";

export function AuctionSimulator() {
  const reduce = useReducedMotion();
  const [type, setType] = useState<AuctionType>("english");
  const [numBidders, setNumBidders] = useState(4);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [bids, setBids] = useState<number[]>([]);
  const [winner, setWinner] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const trueValues = useRef<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, []);

  const startAuction = () => {
    if (intervalRef.current !== null) clearInterval(intervalRef.current);

    trueValues.current = Array.from({ length: numBidders }, () =>
      Math.round(50 + Math.random() * 150)
    );
    setBids([]);
    setWinner(null);
    setLog([]);
    setRunning(true);

    if (type === "english") {
      let price = 10;
      intervalRef.current = setInterval(() => {
        const activeBidders = trueValues.current.filter((v) => v > price);
        if (activeBidders.length <= 1) {
          if (intervalRef.current !== null) clearInterval(intervalRef.current);
          intervalRef.current = null;
          const winIdx = trueValues.current.findIndex((v) => v > price);
          setWinner(winIdx);
          setCurrentPrice(price);
          setLog((prev) => [
            ...prev,
            `赢家: 玩家${winIdx + 1}，成交价: ¥${price}`,
          ]);
          setRunning(false);
          return;
        }
        price += Math.round(5 + Math.random() * 10);
        setCurrentPrice(price);
        setLog((prev) => [
          ...prev.slice(-15),
          `当前价: ¥${price}，剩余竞拍者: ${activeBidders.length}`,
        ]);
      }, 300);
    } else if (type === "dutch") {
      let price = 200;
      intervalRef.current = setInterval(() => {
        price -= Math.round(3 + Math.random() * 8);
        if (price <= 0) {
          if (intervalRef.current !== null) clearInterval(intervalRef.current);
          intervalRef.current = null;
          setLog((prev) => [...prev, "价格降至0，流拍"]);
          setRunning(false);
          return;
        }
        const bidder = trueValues.current.findIndex(
          (v, i) => v >= price && Math.random() > 0.3
        );
        if (bidder >= 0) {
          if (intervalRef.current !== null) clearInterval(intervalRef.current);
          intervalRef.current = null;
          setWinner(bidder);
          setCurrentPrice(price);
          setLog((prev) => [
            ...prev,
            `玩家${bidder + 1} 在 ¥${price} 拍下！`,
          ]);
          setRunning(false);
          return;
        }
        setCurrentPrice(price);
        setLog((prev) => [
          ...prev.slice(-15),
          `荷兰式降价: ¥${price}`,
        ]);
      }, 200);
    } else {
      const sealedBids = trueValues.current.map((v) =>
        Math.round(v * (0.7 + Math.random() * 0.3))
      );
      setBids(sealedBids);
      const maxBid = Math.max(...sealedBids);
      const winIdx = sealedBids.indexOf(maxBid);
      setWinner(winIdx);
      setCurrentPrice(maxBid);
      setLog(
        sealedBids.map((b, i) => `玩家${i + 1} 出价: ¥${b}`).concat([
          `赢家: 玩家${winIdx + 1}，成交价: ¥${maxBid}`,
        ])
      );
      setRunning(false);
    }
  };

  return (
    <div className="chart-container">
      <h3 className="font-display text-fg-primary mb-4 text-lg font-semibold">
        拍卖模拟器
      </h3>

      <div className="flex gap-2 mb-4" role="group" aria-label="拍卖类型">
        {(["english", "dutch", "sealed"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            aria-pressed={type === t}
            className={`sim-button ${type === t ? "!bg-accent-gold/20 !border-accent-gold/50" : ""}`}
          >
            {t === "english" ? "英式" : t === "dutch" ? "荷式" : "密封"}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <label htmlFor="auction-bidders" className="data-label">竞拍人数: {numBidders}</label>
        <input
          id="auction-bidders"
          type="range"
          min="2"
          max="8"
          value={numBidders}
          onChange={(e) => setNumBidders(Number(e.target.value))}
          className="sim-slider"
        />
      </div>

      <button
        onClick={startAuction}
        disabled={running}
        className="sim-button mb-4 w-full disabled:opacity-40"
      >
        {running ? "进行中..." : "开始拍卖"}
      </button>

      {currentPrice > 0 && (
        <div className="data-panel mb-4">
          <span className="data-label">当前价格</span>
          <span className="data-value">¥{currentPrice}</span>
        </div>
      )}

      {winner !== null && winner >= 0 && (
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          className="info-card info-card-green mb-4"
          role="status"
          aria-live="polite"
        >
          <span className="info-card-title">拍卖结果</span>
          <p className="text-fg-primary text-sm">
            玩家 {winner + 1} 赢得拍卖
            {bids.length > 0 && `，出价 ¥${bids[winner]}`}
          </p>
        </motion.div>
      )}

      {log.length > 0 && (
        <div className="max-h-40 overflow-y-auto rounded-lg bg-bg-deep p-3" role="log" aria-live="polite" aria-label="拍卖日志">
          {log.map((entry, i) => (
            <p key={i} className="text-fg-muted font-mono text-[10px] leading-relaxed">
              {entry}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
