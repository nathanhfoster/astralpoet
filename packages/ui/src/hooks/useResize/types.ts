export type Axis = "both" | "vertical" | "horizontal";
export type Cursor = "nwse-resize" | "ns-resize" | "ew-resize";
export interface CursorMap {
  both: "nwse-resize";
  vertical: "ns-resize";
  horizontal: "ew-resize";
}

export interface UseResizeOptions {
  step?: number;
  axis?: Axis;
  minWidth?: number;
}
