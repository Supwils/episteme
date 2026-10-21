import { createElement, startTransition, useEffect, useState, type ReactNode } from "react";
import { hydrateRoot } from "react-dom/client";

declare global {
  interface Window {
    hydrationReplay: {
      mode: "replay" | "sync" | "late" | "mismatch";
      host: "main" | "div";
      errors: string[];
      reused: boolean;
      done: boolean;
    };
  }
}

const result = window.hydrationReplay;
const original = document.getElementById("replay-target");
const child = createElement("section", { id: "resolved-child" }, "Resolved article");

// Model a Flight $L child: it suspends while its parent host is being claimed,
// then fulfills between concurrent slices. A component-shaped lazy has its own
// fiber and does not exercise the host replay that caused React 418 in the app.
let resolveChunk: (value: ReactNode) => void;
const chunk = Object.assign(
  new Promise<ReactNode>((resolve) => {
    resolveChunk = resolve;
  }),
  { status: "pending", value: undefined as ReactNode }
);
let started = false;
const flightChild = {
  $$typeof: Symbol.for("react.lazy"),
  _payload: chunk,
  _init() {
    if (chunk.status === "fulfilled") return chunk.value;
    if (!started) {
      started = true;
      const fulfill = () => {
        chunk.value = child;
        chunk.status = "fulfilled";
        resolveChunk(child);
      };
      if (result.mode === "late") setTimeout(fulfill, 100);
      else queueMicrotask(fulfill);
    }
    throw chunk;
  },
} as unknown as ReactNode;

function ReadingShell() {
  const [clicks, setClicks] = useState(0);
  useEffect(() => {
    result.reused = original === document.getElementById("replay-target");
    result.done = true;
  }, []);
  return (
    <div>
      <p>Before article</p>
      {createElement(result.host, { id: "replay-target" }, flightChild)}
      <p>{result.mode === "mismatch" ? "Different client text" : "After article"}</p>
      <button onClick={() => setClicks(clicks + 1)}>{`Clicks: ${clicks}`}</button>
    </div>
  );
}

function hydrate() {
  hydrateRoot(document.getElementById("fixture")!, <ReadingShell />, {
    onRecoverableError: (error) => result.errors.push(String(error)),
  });
}
if (result.mode === "sync") hydrate();
else startTransition(hydrate);
