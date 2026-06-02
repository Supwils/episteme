export function drawLevel1(ctx: CanvasRenderingContext2D, ATLAS_ERAS: any[], hoveredEra: string | null, sr: number): void;
export function drawLevel2(ctx: CanvasRenderingContext2D, activeEra: any, hoveredTopic: string | null, sr: number): void;
export function drawMinimap(ctx: CanvasRenderingContext2D, W: number, H: number, zoom: number, pan: { x: number; y: number }, level: number, ATLAS_ERAS: any[], activeEra: any, sr: number): void;
export function drawMain(ctx: CanvasRenderingContext2D, W: number, H: number, pan: { x: number; y: number }, zoom: number, level: number, ATLAS_ERAS: any[], activeEra: any, hoveredEra: string | null, hoveredTopic: string | null, sr: number, showHelp: boolean, clickPulse: any): void;
