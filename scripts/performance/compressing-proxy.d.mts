export function startCompressingProxy(upstreamBase: string): Promise<{
  base: string;
  close(): void;
}>;
