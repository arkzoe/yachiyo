import { hexToRgb } from './oeka-utils.js';

export class OekaPainter {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { willReadFrequently: true });
    this.options = options;

    this._layerCanvas = [null, null];
    this._layerCtx = [null, null];
    this._roundData = {};
    this._prevLine = null;
    this._undoStack = [];
    this._redoStack = [];
    this._undoLimit = 50;

    this._initRoundData();
    this._initLayers();
  }

  _initRoundData() {
    const SIZE_MAX = 88;
    for (let d = 1; d <= SIZE_MAX; d++) {
      this._roundData[d] = new Uint8Array(d * d);
      const mask = this._roundData[d];
      const half = d / 2;
      let idx = 0;
      for (let gy = 0; gy < d; gy++) {
        for (let gx = 0; gx < d; gx++) {
          const xx = gx + 0.5 - half;
          const yy = gy + 0.5 - half;
          mask[idx++] = xx * xx + yy * yy <= (d * d) / 4 ? 1 : 0;
        }
      }
    }
  }

  _initLayers() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    for (let i = 0; i < 2; i++) {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      this._layerCanvas[i] = c;
      this._layerCtx[i] = c.getContext('2d', { willReadFrequently: true });
    }
    this.composite();
  }

  getLayerCtx(layerIndex) {
    return this._layerCtx[layerIndex];
  }

  getBound(x0, y0, x1, y1, r) {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const left = Math.max(0, Math.floor(Math.min(x0, x1) - r));
    const top = Math.max(0, Math.floor(Math.min(y0, y1) - r));
    const right = Math.min(w, Math.ceil(Math.max(x0, x1) + r + 1));
    const bottom = Math.min(h, Math.ceil(Math.max(y0, y1) + r + 1));
    return { x: left, y: top, w: right - left, h: bottom - top };
  }

  composite(dirtyRect = null) {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const layerVisible = (typeof this.options.getLayerVisible === 'function')
      ? this.options.getLayerVisible() : [true, true];

    if (dirtyRect && dirtyRect.w > 0 && dirtyRect.h > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(dirtyRect.x, dirtyRect.y, dirtyRect.w, dirtyRect.h);
      ctx.clip();
    }

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    if (layerVisible[0]) ctx.drawImage(this._layerCanvas[0], 0, 0);
    if (layerVisible[1]) ctx.drawImage(this._layerCanvas[1], 0, 0);

    if (dirtyRect) ctx.restore();
  }

  bresenham(x0, y0, x1, y1, callback) {
    x0 = Math.floor(x0);
    y0 = Math.floor(y0);
    x1 = Math.floor(x1);
    y1 = Math.floor(y1);
    const dx = Math.abs(x1 - x0);
    const sx = x0 < x1 ? 1 : -1;
    const dy = Math.abs(y1 - y0);
    const sy = y0 < y1 ? 1 : -1;
    let err = (dx > dy ? dx : -dy) / 2;
    const prev = this._prevLine;

    while (true) {
      const skip =
        prev &&
        ((prev[0][0] === x0 && prev[0][1] === y0) ||
          (prev[1][0] === x0 && prev[1][1] === y0));

      if (!skip) callback(x0, y0);
      if (x0 === x1 && y0 === y1) break;

      const e2 = err;
      if (e2 > -dx) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dy) {
        err += dx;
        y0 += sy;
      }
    }
    this._prevLine = [[x0, y0], [x1, y1]];
  }

  setPrevLine(v) {
    this._prevLine = v;
  }

  setPenPointInBuffer(data, bufW, bufH, bx, by, size, r1, g1, b1, a1) {
    console.log('setPenPointInBuffer');
    const d = Math.min(size, 88);
    const shape = this._roundData[d];
    if (!shape) return;

    const r0 = Math.floor(d / 2);
    let ix = bx - r0;
    let iy = by - r0;

    if (ix + d <= 0 || iy + d <= 0 || ix >= bufW || iy >= bufH) return;

    const a1n = a1;
    if (a1n <= 0) return;

    let shapeIndex = 0;
    for (let i = 0; i < d; i++) {
      for (let j = 0; j < d; j++) {
        const px = ix + j;
        const py = iy + i;

        if (px >= 0 && px < bufW && py >= 0 && py < bufH && shape[shapeIndex]) {
          const index = (py * bufW + px) * 4;
          const r0v = data[index];
          const g0v = data[index + 1];
          const b0v = data[index + 2];
          const a0v = data[index + 3] / 255;

          const a = a0v + a1n - a0v * a1n;
          if (a > 0) {
            const a1x = Math.max(a1n, 1 / 255);
            let r = (r1 * a1x + r0v * a0v * (1 - a1x)) / a;
            let g = (g1 * a1x + g0v * a0v * (1 - a1x)) / a;
            let b = (b1 * a1x + b0v * a0v * (1 - a1x)) / a;

            r = r1 > r0v ? Math.ceil(r) : Math.floor(r);
            g = g1 > g0v ? Math.ceil(g) : Math.floor(g);
            b = b1 > b0v ? Math.ceil(b) : Math.floor(b);

            data[index] = Math.max(0, Math.min(255, r));
            data[index + 1] = Math.max(0, Math.min(255, g));
            data[index + 2] = Math.max(0, Math.min(255, b));
            data[index + 3] = Math.ceil(a * 255);
          }
        }
        shapeIndex++;
      }
    }
  }

  setEraserPointInBuffer(data, bufW, bufH, bx, by, size) {
    const d = Math.min(size, 88);
    const shape = this._roundData[d];
    if (!shape) return;

    const r0 = Math.floor(d / 2);
    let ix = bx - r0;
    let iy = by - r0;

    if (ix + d <= 0 || iy + d <= 0 || ix >= bufW || iy >= bufH) return;

    let shapeIndex = 0;
    for (let i = 0; i < d; i++) {
      for (let j = 0; j < d; j++) {
        const px = ix + j;
        const py = iy + i;
        if (px >= 0 && px < bufW && py >= 0 && py < bufH && shape[shapeIndex]) {
          const index = (py * bufW + px) * 4;
          data[index + 3] = 0;
        }
        shapeIndex++;
      }
    }
  }

  pushUndo() {
    try {
      const w = this.canvas.width;
      const h = this.canvas.height;
      this._undoStack.push({
        layer0: this._layerCtx[0].getImageData(0, 0, w, h),
        layer1: this._layerCtx[1].getImageData(0, 0, w, h),
      });
      if (this._undoStack.length > this._undoLimit) this._undoStack.shift();
      this._redoStack.length = 0;
    } catch (_) {}
  }

  undo() {
    if (this._undoStack.length === 0) return false;
    try {
      const w = this.canvas.width;
      const h = this.canvas.height;
      this._redoStack.push({
        layer0: this._layerCtx[0].getImageData(0, 0, w, h),
        layer1: this._layerCtx[1].getImageData(0, 0, w, h),
      });
      const prev = this._undoStack.pop();
      this._layerCtx[0].putImageData(prev.layer0, 0, 0);
      this._layerCtx[1].putImageData(prev.layer1, 0, 0);
      this.composite();
      return true;
    } catch (_) {}
    return false;
  }

  redo() {
    if (this._redoStack.length === 0) return false;
    try {
      const w = this.canvas.width;
      const h = this.canvas.height;
      this._undoStack.push({
        layer0: this._layerCtx[0].getImageData(0, 0, w, h),
        layer1: this._layerCtx[1].getImageData(0, 0, w, h),
      });
      const next = this._redoStack.pop();
      this._layerCtx[0].putImageData(next.layer0, 0, 0);
      this._layerCtx[1].putImageData(next.layer1, 0, 0);
      this.composite();
      return true;
    } catch (_) {}
    return false;
  }

  hasUndo() {
    return this._undoStack.length > 0;
  }

  hasRedo() {
    return this._redoStack.length > 0;
  }

  floodFill(startX, startY, fillRGB, layerIndex) {
    if (!fillRGB) return;
    const ctx = this._layerCtx[layerIndex];
    const canvas = this._layerCanvas[layerIndex];
    const width = canvas.width;
    const height = canvas.height;

    let x = Math.round(startX);
    let y = Math.round(startY);
    if (x < 0 || x >= width || y < 0 || y >= height) return;

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const imgWidth = imageData.width;
    const imgHeight = imageData.height;
    const buf32 = new Uint32Array(
      data.buffer,
      data.byteOffset,
      data.length >>> 2
    );
    const stack = [{ x, y }];

    const fillColor32 =
      (fillRGB.r & 0xff) |
      ((fillRGB.g & 0xff) << 8) |
      ((fillRGB.b & 0xff) << 16) |
      (255 << 24);
    const baseColor = buf32[y * imgWidth + x];

    if (baseColor === fillColor32) return;

    const STACK_LIMIT = 1000000;
    while (stack.length > 0) {
      if (stack.length > STACK_LIMIT) break;
      const point = stack.pop();
      x = point.x;
      y = point.y;
      let x0 = x;
      let x1 = x;

      if (buf32[y * imgWidth + x] === fillColor32) continue;
      if (buf32[y * imgWidth + x] !== baseColor) continue;

      for (; x0 > 0; x0--) {
        if (buf32[y * imgWidth + (x0 - 1)] !== baseColor) break;
      }
      for (; x1 < imgWidth - 1; x1++) {
        if (buf32[y * imgWidth + (x1 + 1)] !== baseColor) break;
      }
      this._fillHorizontalLine(buf32, imgWidth, x0, x1, y, fillColor32);

      if (y + 1 < imgHeight) {
        this._scanLine(imgWidth, imgHeight, x0, x1, y + 1, stack);
      }
      if (y - 1 >= 0) {
        this._scanLine(imgWidth, imgHeight, x0, x1, y - 1, stack);
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  _fillHorizontalLine(buf32, width, x0, x1, y, fillColor32) {
    let index = y * width + x0;
    for (let x = x0; x <= x1; x++) {
      buf32[index++] = fillColor32;
    }
  }

  _scanLine(width, height, x0, x1, y, stack) {
    if (y < 0 || y >= height) return;
    for (let x = x0; x <= x1; x++) {
      stack.push({ x, y });
    }
  }

  flipHorizontal() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    try {
      this.pushUndo();
      for (let layer = 0; layer <= 1; layer++) {
        const ctx = this._layerCtx[layer];
        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;
        const flipped = ctx.createImageData(w, h);
        const fd = flipped.data;
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const src = (y * w + x) * 4;
            const dst = (y * w + (w - 1 - x)) * 4;
            fd[dst] = data[src];
            fd[dst + 1] = data[src + 1];
            fd[dst + 2] = data[src + 2];
            fd[dst + 3] = data[src + 3];
          }
        }
        ctx.putImageData(flipped, 0, 0);
      }
      this.composite();
      return true;
    } catch (_) {}
    return false;
  }

  getPNGDataURL() {
    return this.canvas.toDataURL('image/png');
  }
}