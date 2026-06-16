"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useNarrationStore } from "./narration-store";

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
    utter.onend = () => setPlaying(false);
    synth.speak(utter);
    setPlaying(true);
  }, []);

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

  if (!active) return null;

  const toggle = () => {
    if (active.audioUrl) {
      const a = audioRef.current;
      if (!a) return;
      if (playing) {
        a.pause();
        setPlaying(false);
      } else {
        void a.play().then(() => setPlaying(true));
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

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - rect.left) / rect.width) * a.duration;
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
              <div
                className="bg-bg-elevated mt-1.5 h-1 cursor-pointer overflow-hidden rounded-full"
                onClick={seek}
              >
                <div
                  className="bg-accent-gold h-full rounded-full"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            ) : (
              <div className="text-fg-disabled mt-1 text-[11px]">
                浏览器语音朗读（配置 TTS 后自动替换为高质量音频）
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setSpeedIdx((i) => (i + 1) % SPEEDS.length)}
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
