import { describe, expect, it, vi } from "vitest";
import { getServiceWorkerLifecycleScript } from "@/lib/service-worker-lifecycle";

interface RegistrationMock {
  unregister: ReturnType<typeof vi.fn>;
}

interface LifecycleHarnessOptions {
  controller?: object | null;
  marker?: string | null;
  registration?: RegistrationMock;
  supportsServiceWorker?: boolean;
}

function createHarness({
  controller = null,
  marker = null,
  registration,
  supportsServiceWorker = true,
}: LifecycleHarnessOptions = {}) {
  let loadListener: (() => void | Promise<void>) | undefined;
  let storedMarker = marker;

  const register = vi.fn().mockResolvedValue(undefined);
  const getRegistration = vi.fn().mockResolvedValue(registration);
  const reload = vi.fn();
  const sessionStorage = {
    getItem: vi.fn(() => storedMarker),
    setItem: vi.fn((_key: string, value: string) => {
      storedMarker = value;
    }),
    removeItem: vi.fn(() => {
      storedMarker = null;
    }),
  };
  const serviceWorker = { controller, getRegistration, register };
  const navigatorMock = supportsServiceWorker ? { serviceWorker } : {};
  const windowMock = {
    addEventListener: vi.fn((_type: string, listener: () => void | Promise<void>) => {
      loadListener = listener;
    }),
    location: { reload },
    sessionStorage,
  };

  return {
    get loadListener() {
      return loadListener;
    },
    get storedMarker() {
      return storedMarker;
    },
    getRegistration,
    navigatorMock,
    register,
    reload,
    sessionStorage,
    windowMock,
  };
}

async function execute(environment: string, harness: ReturnType<typeof createHarness>) {
  const script = getServiceWorkerLifecycleScript(environment);
  const run = new Function("navigator", "window", script);
  run(harness.navigatorMock, harness.windowMock);
  await harness.loadListener?.();
}

describe("service worker browser lifecycle", () => {
  it("registers the offline worker only in production", async () => {
    const harness = createHarness();

    await execute("production", harness);

    expect(harness.register).toHaveBeenCalledOnce();
    expect(harness.register).toHaveBeenCalledWith("/sw.js");
    expect(harness.getRegistration).not.toHaveBeenCalled();
  });

  it("unregisters a worker left on the development origin", async () => {
    const registration = { unregister: vi.fn().mockResolvedValue(true) };
    const harness = createHarness({ registration });

    await execute("development", harness);

    expect(registration.unregister).toHaveBeenCalledOnce();
    expect(harness.register).not.toHaveBeenCalled();
    expect(harness.reload).not.toHaveBeenCalled();
  });

  it("reloads once when the retired worker still controls the page", async () => {
    const registration = { unregister: vi.fn().mockResolvedValue(true) };
    const harness = createHarness({ controller: {}, registration });

    await execute("development", harness);

    expect(harness.storedMarker).toBe("1");
    expect(harness.reload).toHaveBeenCalledOnce();
  });

  it("does not enter a reload loop while a controller is winding down", async () => {
    const harness = createHarness({ controller: {}, marker: "1" });

    await execute("development", harness);

    expect(harness.reload).not.toHaveBeenCalled();
    expect(harness.storedMarker).toBe("1");
  });

  it("clears the one-shot marker after development is no longer controlled", async () => {
    const harness = createHarness({ marker: "1" });

    await execute("development", harness);

    expect(harness.sessionStorage.removeItem).toHaveBeenCalledOnce();
    expect(harness.storedMarker).toBeNull();
  });

  it("is inert when the browser does not support service workers", async () => {
    const harness = createHarness({ supportsServiceWorker: false });

    await execute("development", harness);

    expect(harness.windowMock.addEventListener).not.toHaveBeenCalled();
  });
});
