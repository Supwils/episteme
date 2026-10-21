"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useNarrationStore } from "./narration-store";
import "./narration-player.css";

const SEEK_STEPS = 1000;

const SPEEDS = [1, 1.25, 1.5, 0.75];

/**
 * Global "讲解" player — a persistent bottom bar mounted once in ClientShell.
 * Plays pre-generated ElevenLabs audio when available, otherwise falls back to
 * the browser's speech synthesis reading the same script (clearly labelled as a
 * preview voice). The script doubles as an optional transcript.
 */
export function NarrationPlayer() {
  const active = useNarrationStore((s) => s.active);
  const close = useNarrationStore((s) => s.close);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  // `cancel()` fires the replaced utterance's end/error events asynchronously,
  // after the new one has already set "playing"; only the current one may
  // report that speech stopped.
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [playing, setPlaying] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1, audio only
  const [showTranscript, setShowTranscript] = useState(false);

  const speed = SPEEDS[speedIdx]!;
  const usingBrowserVoice = Boolean(active && !active.audioUrl);

  const stopAll = useCallback(() => {
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  const speakFallback = useCallback((text: string, rate: number) => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "zh-CN";
    utter.rate = rate;
    const zh = synth.getVoices().find((v) => v.lang.toLowerCase().startsWith("zh"));
    if (zh) utter.voice = zh;
    const stopped = () => {
      if (utteranceRef.current === utter) setPlaying(false);
    };
    utter.onend = stopped;
    // Interrupted / unsupported voice: otherwise the button stays on "pause".
    utter.onerror = stopped;
    utteranceRef.current = utter;
    synth.speak(utter);
    setPlaying(true);
  }, []);

  // Flag the <html> element while the player bar is on screen so other fixed
  // UI (the mobile TOC floating button) can dodge it via a CSS attribute
  // selector — no cross-component state needed.
  useEffect(() => {
    const root = document.documentElement;
    if (active) {
      root.setAttribute("data-narration-active", "");
    } else {
      root.removeAttribute("data-narration-active");
    }
    return () => root.removeAttribute("data-narration-active");
  }, [active]);

  // Start playback whenever a new narration is loaded.
  useEffect(() => {
    if (!active) return;
    setProgress(0);
    setShowTranscript(false);
    if (active.audioUrl) {
      const a = audioRef.current;
      if (a) {
        a.playbackRate = speed;
        a.currentTime = 0;
        void a
          .play()
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false));
      }
    } else {
      speakFallback(active.script, speed);
    }
    return stopAll;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- start only on identity change
  }, [active?.id]);

  // Keep audio playback rate in sync with the speed control.
  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed]);

  // Speech synthesis fixes the rate when the utterance is created. There is no
  // playback position to keep, so a change during browser-voice preview starts
  // the script again at the new rate.
  const cycleSpeed = () => {
    const nextIdx = (speedIdx + 1) % SPEEDS.length;
    const nextSpeed = SPEEDS[nextIdx]!;
    setSpeedIdx(nextIdx);
    if (active && !active.audioUrl && playing) speakFallback(active.script, nextSpeed);
  };

  if (!active) return null;

  const toggle = () => {
    if (active.audioUrl) {
      const a = audioRef.current;
      if (!a) return;
      if (playing) {
        a.pause();
        setPlaying(false);
      } else {
        a.play()
          .then(() => setPlaying(true))
          // Autoplay policy or a missing file rejects; keep the UI on "play".
          .catch(() => setPlaying(false));
      }
    } else {
      const synth = window.speechSynthesis;
      if (playing) {
        synth.cancel();
        setPlaying(false);
      } else {
        speakFallback(active.script, speed);
      }
    }
  };

  const seekToRatio = (ratio: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
    const next = Math.min(1, Math.max(0, ratio));
    audio.currentTime = next * audio.duration;
    setProgress(next);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[480] flex justify-center px-3 pb-3">
      <div className="border-border-subtle bg-bg-panel/95 w-full max-w-3xl rounded-xl border shadow-2xl backdrop-blur-md">
        {showTranscript && (
          <div className="border-border-faint max-h-48 overflow-y-auto border-b px-5 py-4">
            <p className="text-fg-secondary text-sm leading-relaxed whitespace-pre-line">
              {active.script}
            </p>
          </div>
        )}

        <div className="flex items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "暂停讲解" : "播放讲解"}
            className="bg-accent-gold/15 text-accent-gold hover:bg-accent-gold/25 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg transition-colors"
          >
            {playing ? "⏸" : "▶"}
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-fg-muted font-mono text-[10px] tracking-[0.2em] uppercase">
                讲解
              </span>
              <span className="text-fg-primary truncate text-sm font-medium">{active.title}</span>
              {usingBrowserVoice && (
                <span className="border-border-faint text-fg-muted rounded border px-1.5 py-0.5 text-[10px]">
                  预览音色
                </span>
              )}
            </div>
            {active.audioUrl ? (
              <input
                type="range"
                min={0}
                max={SEEK_STEPS}
                step={1}
                value={Math.round(progress * SEEK_STEPS)}
                aria-label="讲解进度"
                aria-valuetext={`${Math.round(progress * 100)}%`}
                onChange={(event) => seekToRatio(Number(event.target.value) / SEEK_STEPS)}
                className="narration-seek mt-1.5"
                style={{ "--seek": `${Math.round(progress * 100)}%` } as CSSProperties}
              />
            ) : (
              <div className="text-fg-disabled mt-1 text-[11px]">
                浏览器语音朗读（配置 TTS 后自动替换为高质量音频）
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={cycleSpeed}
            className="text-fg-secondary hover:text-fg-primary font-mono text-xs tabular-nums transition-colors"
            aria-label="调整语速"
          >
            {speed}×
          </button>
          <button
            type="button"
            onClick={() => setShowTranscript((s) => !s)}
            aria-pressed={showTranscript}
            className="text-fg-secondary hover:text-fg-primary text-xs transition-colors"
          >
            文稿
          </button>
          <button
            type="button"
            onClick={() => {
              stopAll();
              close();
            }}
            aria-label="关闭讲解"
            className="text-fg-muted hover:text-fg-primary text-lg leading-none transition-colors"
          >
            ×
          </button>
        </div>
      </div>

      {active.audioUrl && (
        <audio
          hidden
          ref={audioRef}
          src={active.audioUrl}
          onTimeUpdate={(e) => {
            const a = e.currentTarget;
            if (a.duration) setProgress(a.currentTime / a.duration);
          }}
          onEnded={() => {
            setPlaying(false);
            setProgress(1);
          }}
          preload="auto"
        />
      )}
    </div>
  );
}
