import { handleWorkerRequest, type WorkerRequest } from "./worker-runtime";

self.onmessage = async (event: MessageEvent<WorkerRequest>) => {
  self.postMessage(await handleWorkerRequest(event.data));
};
