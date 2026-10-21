import assert from "node:assert/strict";
import type { Page } from "@playwright/test";
import type { startNavigationFixture } from "./fixtures/navigation-cancellation";
import { observeWindow, observe, probe, type Cell } from "./navigation-evidence";

type Setup = { fixture: Awaited<ReturnType<typeof startNavigationFixture>>; observationMs: number };

type Held = ReturnType<Awaited<ReturnType<typeof startNavigationFixture>>["holdReplacement"]>;
type WindowHandle = Awaited<ReturnType<typeof observeWindow>>;

async function replaceDocument(
  page: Page,
  result: Cell,
  handle: WindowHandle,
  held: Held,
  start: () => ReturnType<typeof probe>,
  setup: Setup
) {
  const { fixture } = setup;
  const navigation = page
    .goto(`${fixture.origin}/replacement?cell=${result.id}`, { timeout: 5000 })
    .then(
      () => null,
      (error) => String(error)
    );
  await held.arrived;
  result.outcome = await observe(start(), setup.observationMs);
  result.signals =
    result.outcome.state === "pending" ? null : await handle.evaluate((state) => state.signals);
  if (result.inflight)
    result.inflight.cancelledWhileResponseHeld = fixture.ledger.filter(
      (request) => request.cell === result.id && request.path === "/held-probe" && request.cancelled
    ).length;
  held.release();
  assert.equal(await navigation, null);
  result.finalTitle = await page.title();
}

async function waitForClosures(probes: Held[]) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      Promise.all(probes.map((held) => held.closed)).then(() => true),
      new Promise<boolean>((done) => {
        timer = setTimeout(() => done(false), 3000);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

async function measureInflight(
  page: Page,
  result: Cell,
  handle: WindowHandle,
  held: Held,
  setup: Setup
) {
  const { fixture } = setup;
  const probes = ["fetch", "xhr"].map((transport) => fixture.holdProbe(result.id, transport));
  try {
    const headers = Promise.all(
      ["fetch", "xhr"].map((transport) =>
        page.waitForResponse(
          (response) => {
            const url = new URL(response.url());
            return (
              url.pathname === "/held-probe" &&
              url.searchParams.get("cell") === result.id &&
              url.searchParams.get("transport") === transport
            );
          },
          { timeout: 3000 }
        )
      )
    );
    const pending = probe(handle, `${fixture.origin}/held-probe?cell=${result.id}`);
    const [, responses] = await Promise.all([
      Promise.all(probes.map((item) => item.arrived)),
      headers,
    ]);
    assert(responses.every((response) => response.status() === 200));
    const records = fixture.ledger.filter(
      (request) => request.cell === result.id && request.path === "/held-probe"
    );
    assert.equal(records.length, 2);
    assert(records.every((request) => request.headersSent && !request.finished));
    result.inflight = {
      responseHeadersObserved: responses.length,
      cancelledWhileResponseHeld: 0,
      closedBeforeContextClose: false,
    };
    await replaceDocument(page, result, handle, held, () => pending, setup);
    result.inflight.closedBeforeContextClose = await waitForClosures(probes);
  } finally {
    for (const item of probes) item.release();
  }
}

export async function measureCell(page: Page, result: Cell, setup: Setup, held?: Held) {
  const { fixture } = setup;
  await page.goto(`${fixture.origin}/source?cell=${result.id}`, { timeout: 5000 });
  assert.equal(new URL(page.url()).origin, result.origin);
  const handle = await observeWindow(page);
  if (held) {
    if (result.phase === "inflight") await measureInflight(page, result, handle, held, setup);
    else
      await replaceDocument(
        page,
        result,
        handle,
        held,
        () => probe(handle, `${result.targetOrigin}/probe?cell=${result.id}`),
        setup
      );
  } else {
    result.outcome = await observe(
      probe(handle, `${result.targetOrigin}/probe?cell=${result.id}`),
      3000
    );
    result.signals =
      result.outcome.state === "pending" ? null : await handle.evaluate((state) => state.signals);
    result.finalTitle = await page.title();
  }
}
