import { OekaPainter } from './oeka-painter.js';
import { hexToRgb } from './oeka-utils.js';

export class OekaToolBase {
  downHandler(oe) {}
  moveHandler(oe) {}
  upHandler(oe) {}
}

export class OekaPenTool extends OekaToolBase {
  downHandler(oe) {
    oe.painter.setPrevLine(null);
    oe.painter.pushUndo();
    this._drawPointAt(oe);
  }

  moveHandler(oe) {
    this._drawStroke(oe);
  }

  upHandler(oe) {
    oe.painter.setPrevLine(null);
  }

  _drawPointAt(oe) {
    const { painter, state } = oe;
    const ctx = painter.getLayerCtx(state.currentLayer);
    const w = painter.canvas.width;
    const h = painter.canvas.height;
    const px = Math.floor(state.lastX);
    const py = Math.floor(state.lastY);
    const r = Math.ceil(state.size / 2);

    const left = Math.max(0, px - r);
    const top = Math.max(0, py - r);
    const boxW = Math.min(w - left, r * 2 + 1);
    const boxH = Math.min(h - top, r * 2 + 1);
    if (boxW <= 0 || boxH <= 0) return;

    const imageData = ctx.getImageData(left, top, boxW, boxH);
    const data = imageData.data;
    const rgb = hexToRgb(state.color);
    if (rgb) {
      painter.setPenPointInBuffer(
        data, boxW, boxH, px - left, py - top,
        state.size, rgb.r, rgb.g, rgb.b, state.alpha
      );
    }
    ctx.putImageData(imageData, left, top);
    painter.composite(painter.getBound(px, py, px, py, r));
  }

  _drawStroke(oe) {
    const { painter, state } = oe;
    const ctx = painter.getLayerCtx(state.currentLayer);
    const w = painter.canvas.width;
    const h = painter.canvas.height;
    const x0 = Math.floor(state.lastX);
    const y0 = Math.floor(state.lastY);
    const x1 = Math.floor(state.pos.x);
    const y1 = Math.floor(state.pos.y);
    const r = Math.ceil(state.size / 2);

    const left = Math.max(0, Math.min(x0, x1) - r);
    const top = Math.max(0, Math.min(y0, y1) - r);
    const right = Math.min(w, Math.max(x0, x1) + r + 1);
    const bottom = Math.min(h, Math.max(y0, y1) + r + 1);
    const boxW = right - left;
    const boxH = bottom - top;
    if (boxW <= 0 || boxH <= 0) return;

    const imageData = ctx.getImageData(left, top, boxW, boxH);
    const data = imageData.data;
    const rgb = hexToRgb(state.color);
    if (rgb) {
      painter.bresenham(state.lastX, state.lastY, state.pos.x, state.pos.y, (px, py) => {
        painter.setPenPointInBuffer(
          data, boxW, boxH, px - left, py - top,
          state.size, rgb.r, rgb.g, rgb.b, state.alpha
        );
      });
    }
    ctx.putImageData(imageData, left, top);
    painter.composite(painter.getBound(state.lastX, state.lastY, state.pos.x, state.pos.y, r));
  }
}

export class OekaEraserTool extends OekaToolBase {
  downHandler(oe) {
    oe.painter.setPrevLine(null);
    oe.painter.pushUndo();
    this._drawPointAt(oe);
  }

  moveHandler(oe) {
    this._drawStroke(oe);
  }

  upHandler(oe) {
    oe.painter.setPrevLine(null);
  }

  _drawPointAt(oe) {
    const { painter, state } = oe;
    const ctx = painter.getLayerCtx(state.currentLayer);
    const w = painter.canvas.width;
    const h = painter.canvas.height;
    const px = Math.floor(state.lastX);
    const py = Math.floor(state.lastY);
    const r = Math.ceil(state.size / 2);
    const left = Math.max(0, px - r);
    const top = Math.max(0, py - r);
    const boxW = Math.min(w - left, r * 2 + 1);
    const boxH = Math.min(h - top, r * 2 + 1);
    if (boxW <= 0 || boxH <= 0) return;

    const imageData = ctx.getImageData(left, top, boxW, boxH);
    const data = imageData.data;
    painter.setEraserPointInBuffer(data, boxW, boxH, px - left, py - top, state.size);
    ctx.putImageData(imageData, left, top);
    painter.composite(painter.getBound(px, py, px, py, r));
  }

  _drawStroke(oe) {
    const { painter, state } = oe;
    const ctx = painter.getLayerCtx(state.currentLayer);
    const w = painter.canvas.width;
    const h = painter.canvas.height;
    const r = Math.ceil(state.size / 2);
    const left = Math.max(0, Math.min(state.lastX, state.pos.x) - r);
    const top = Math.max(0, Math.min(state.lastY, state.pos.y) - r);
    const right = Math.min(w, Math.max(state.lastX, state.pos.x) + r + 1);
    const bottom = Math.min(h, Math.max(state.lastY, state.pos.y) + r + 1);
    const boxW = right - left;
    const boxH = bottom - top;
    if (boxW <= 0 || boxH <= 0) return;

    const imageData = ctx.getImageData(left, top, boxW, boxH);
    const data = imageData.data;
    painter.bresenham(state.lastX, state.lastY, state.pos.x, state.pos.y, (px, py) => {
      painter.setEraserPointInBuffer(data, boxW, boxH, px - left, py - top, state.size);
    });
    ctx.putImageData(imageData, left, top);
    painter.composite(painter.getBound(state.lastX, state.lastY, state.pos.x, state.pos.y, r));
  }
}

export class OekaToneTool extends OekaToolBase {
  downHandler(oe) {
    oe.painter.pushUndo();
  }

  moveHandler(oe) {
    this._drawTone(oe);
  }

  _drawTone(oe) {
    const { painter, state } = oe;
    const ctx = painter.getLayerCtx(state.currentLayer);
    const mouseX = state.pos.x;
    const mouseY = state.pos.y;

    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = state.alpha;
    ctx.fillStyle = state.color;

    const spacing = 4;
    const dotSize = 1;
    const radius = state.size / 2;

    const startX = Math.floor((mouseX - radius) / spacing) * spacing;
    const startY = Math.floor((mouseY - radius) / spacing) * spacing;
    const endX = mouseX + radius;
    const endY = mouseY + radius;

    for (let x = startX; x <= endX; x += spacing) {
      for (let y = startY; y <= endY; y += spacing) {
        const dx = x - mouseX;
        const dy = y - mouseY;
        if (dx * dx + dy * dy <= radius * radius) {
          ctx.fillRect(x, y, dotSize, dotSize);
        }
      }
    }
    ctx.globalAlpha = 1;
    const toneR = Math.ceil(state.size / 2);
    painter.composite(painter.getBound(mouseX, mouseY, mouseX, mouseY, toneR));
  }
}

export class OekaFillTool extends OekaToolBase {
  downHandler(oe) {
    const { painter, state } = oe;
    const rgb = hexToRgb(state.color);
    if (rgb) {
      painter.pushUndo();
      painter.floodFill(Math.floor(state.pos.x), Math.floor(state.pos.y), rgb, state.currentLayer);
      painter.composite();
    }
  }
}

export class OekaShapeTool extends OekaToolBase {
  downHandler(oe) {
    oe.painter.pushUndo();
    oe.state.canvasSnapshot = oe.painter.getLayerCtx(oe.state.currentLayer).getImageData(
      0, 0, oe.painter.canvas.width, oe.painter.canvas.height
    );
  }

  moveHandler(oe) {
    if (oe.state.pos) this._drawPreview(oe);
  }

  upHandler(oe) {
    if (oe.state.pos) this._drawPreview(oe);
    oe.state.canvasSnapshot = null;
  }

  _drawPreview(oe) {
    const { painter, state } = oe;
    const ctx = painter.getLayerCtx(state.currentLayer);
    const pos = state.pos;
    if (!pos) return;

    ctx.putImageData(state.canvasSnapshot, 0, 0);
    ctx.globalAlpha = state.alpha;
    ctx.beginPath();
    ctx.strokeStyle = state.color;
    ctx.lineWidth = state.size;

    if (state.tool === 'line') {
      ctx.moveTo(state.startX, state.startY);
      ctx.lineTo(pos.x, pos.y);
    } else if (state.tool === 'rect') {
      ctx.rect(state.startX, state.startY, pos.x - state.startX, pos.y - state.startY);
    } else if (state.tool === 'circle') {
      const radius = Math.sqrt(
        Math.pow(pos.x - state.startX, 2) + Math.pow(pos.y - state.startY, 2)
      );
      ctx.arc(state.startX, state.startY, radius, 0, 2 * Math.PI);
    }

    ctx.stroke();
    ctx.globalAlpha = 1;
    const shapeR = Math.ceil(state.size / 2);
    painter.composite(painter.getBound(state.startX, state.startY, pos.x, pos.y, shapeR));
  }
}

export const TOOLS = {
  pen: new OekaPenTool(),
  eraser: new OekaEraserTool(),
  tone: new OekaToneTool(),
  fill: new OekaFillTool(),
  line: new OekaShapeTool(),
  rect: new OekaShapeTool(),
  circle: new OekaShapeTool(),
};