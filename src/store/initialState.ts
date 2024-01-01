import { Canvas } from "../types";

export const defaultCanvasSize = { width: 1200, height: 700 };
export const defaultCanvasColor = "#ffffff";
export const defaultCanvasOpacity = 1;
export const defaultCanvasFormat = 'PNG'
export const defaultCanvasName = 'new-canvas'

export const newCanvasData: Canvas = {
  name: defaultCanvasName,
  size: { width: defaultCanvasSize.width, height: defaultCanvasSize.height },
  filter: { color: defaultCanvasColor, opacity: defaultCanvasOpacity },
  objects: [],
  format: defaultCanvasFormat
};

export default {
  defaultCanvasSize,
  defaultCanvasColor,
  defaultCanvasOpacity,
  defaultCanvasFormat,
  defaultCanvasName,
  newCanvasData
}