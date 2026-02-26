import { OekaPainter } from './oeka-painter.js';
import { TOOLS } from './oeka-tools.js';

export class OekaCore {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.options = options;
    this._eventTarget = options.container ?? canvas;

    this.state = {
      tool: 'pen',
      color: '#000000',
      size: 1,
      alpha: 1,
      isDrawing: false,
      lastX: 0,
      lastY: 0,
      startX: 0,
      startY: 0,
      pos: null,
      canvasSnapshot: null,
      currentLayer: 1,
      layerVisible: [true, true],
    };

    this.painter = new OekaPainter(canvas, {
      getLayerVisible: () => this.state.layerVisible,
    });

    this.ctx = this.painter.ctx;
    this._activePointerId = null;
    this._pointerWasOutside = false;
    this._boundPointerMove = (e) => this._onPointerMove(e);
    this._boundPointerUp = (e) => this._onPointerUp(e);
    this._boundPointerCancel = (e) => this._onPointerUp(e);

    this._bindEvents();
  }

_getMousePos(e) {
    const rect = this.canvas.getBoundingClientRect(); // 显示画布的CSS矩形
    const logicalCanvas = this.painter.canvas;        // 逻辑画布（实际绘画）
    const scaleX = logicalCanvas.width / rect.width;
    const scaleY = logicalCanvas.height / rect.height;
    const clientX = e.clientX ?? (e.touches?.[0]?.clientX);
    const clientY = e.clientY ?? (e.touches?.[0]?.clientY);
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    const w = logicalCanvas.width;
    const h = logicalCanvas.height;
    const insideCanvas = x >= 0 && x < w && y >= 0 && y < h;
    const clampX = Math.max(0, Math.min(w - 1, x));
    const clampY = Math.max(0, Math.min(h - 1, y));
    console.log('getMousePos',x,y);
    return { x: clampX, y: clampY, inside: insideCanvas };
}
  _oe() {
    return {
      painter: this.painter,
      state: this.state,
    };
  }

  setCurrentLayer(index) {
    this.state.currentLayer = index === 0 ? 0 : 1;
    this._emit();
  }

  setLayerVisible(index, visible) {
    if (index !== 0 && index !== 1) return;
    this.state.layerVisible[index] = !!visible;
    this.painter.composite();
    this._emit();
  }

  getLayerVisible(index) {
    return index === 0 || index === 1 ? this.state.layerVisible[index] : false;
  }

  undo() {
    if (this.painter.undo()) this._emit();
  }

  redo() {
    if (this.painter.redo()) this._emit();
  }

  hasUndo() {
    return this.painter.hasUndo();
  }

  hasRedo() {
    return this.painter.hasRedo();
  }

  flipHorizontal() {
    if (this.painter.flipHorizontal()) this._emit();
  }

  getPNGDataURL() {
    return this.painter.getPNGDataURL();
  }

  setTool(tool) {
    this.state.tool = tool;
    this._emit();
  }

  setColor(color) {
    this.state.color = color;
    this._emit();
  }

  setSize(size) {
    this.state.size = Math.max(1, Math.min(88, size));
    this._emit();
  }

  setAlpha(alpha) {
    this.state.alpha = Math.max(0, Math.min(1, alpha));
    this._emit();
  }

  clear() {
    this.painter.pushUndo();
    const ctx = this.painter.getLayerCtx(this.state.currentLayer);
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.painter.composite();
    this._emit();
  }

  _bindEvents() {
    const opts = { passive: false };
    this.canvas.addEventListener('pointerdown', (e) => this._startDrawing(e), opts);
    this._eventTarget.addEventListener('pointermove', this._boundPointerMove, opts);
    this._eventTarget.addEventListener('pointerup', this._boundPointerUp, opts);
    this._eventTarget.addEventListener('pointercancel', this._boundPointerCancel, opts);
  }

  _onPointerUp(e) {
    if (this._activePointerId != null && e.pointerId !== this._activePointerId) return;
    try {
      this._eventTarget.releasePointerCapture?.(e.pointerId);
    } catch (_) {}
    this._activePointerId = null;
    this._stopDrawing(e);
  }

  _onPointerMove(e) {
    const s = this.state;
    if (!s.isDrawing) return;
    if (this._activePointerId != null && e.pointerId !== this._activePointerId) return;
    if (e.pointerType === 'touch') e.preventDefault();

    const useCoalesced =
      ['pen', 'eraser'].includes(s.tool) &&
      s.size <= 16 &&
      typeof e.getCoalescedEvents === 'function';

    const events = useCoalesced ? (e.getCoalescedEvents?.() ?? [e]) : [e];
    for (const ev of events) {
      this._draw(ev);
    }
  }

  _startDrawing(e) {
    const s = this.state;
    const pos = this._getMousePos(e);
    s.pos = pos;
    [s.lastX, s.lastY] = [pos.x, pos.y];
    [s.startX, s.startY] = [pos.x, pos.y];

    const tool = TOOLS[s.tool];
    if (!tool) return;

    if (e.pointerType === 'touch' || e.touches) {
      e.preventDefault();
    }

    if (s.tool === 'fill') {
      tool.downHandler(this._oe());
      this.painter.composite();
      this._emit();
      return;
    }

    s.isDrawing = true;
    this._activePointerId = e.pointerId;
    this._pointerWasOutside = false;
    try {
      this._eventTarget.setPointerCapture?.(e.pointerId);
    } catch (_) {}

    tool.downHandler(this._oe());
    this._emit();
  }

  _draw(e) {
    const s = this.state;
    if (!s.isDrawing) return;
    const pos = this._getMousePos(e);
    s.pos = pos;
    const isShapeTool = ['line', 'rect', 'circle'].includes(s.tool);

    if (!isShapeTool) {
      if (!pos.inside) {
        if (!this._pointerWasOutside) {
          const tool = TOOLS[s.tool];
          if (tool && tool.moveHandler) tool.moveHandler(this._oe());
          [s.lastX, s.lastY] = [pos.x, pos.y];
        }
        this._pointerWasOutside = true;
        return;
      }
      if (this._pointerWasOutside) {
        this._pointerWasOutside = false;
        [s.lastX, s.lastY] = [pos.x, pos.y];
        return;
      }
    }

    const tool = TOOLS[s.tool];
    if (tool && tool.moveHandler) {
      tool.moveHandler(this._oe());
    }
    [s.lastX, s.lastY] = [pos.x, pos.y];
  }

  _stopDrawing(e) {
    const s = this.state;
    if (!s.isDrawing) return;

    const tool = TOOLS[s.tool];
    if (['line', 'rect', 'circle'].includes(s.tool) && e) {
      s.pos = this._getMousePos(e);
      if (tool && tool.upHandler) tool.upHandler(this._oe());
    }

    s.isDrawing = false;

    if (!['line', 'rect', 'circle'].includes(s.tool) && tool && tool.upHandler) {
      tool.upHandler(this._oe());
    }

    if (!['line', 'rect', 'circle'].includes(s.tool)) {
      this.painter.composite();
    }
    this._emit();
  }

  _emit() {
    if (typeof this.options.onStateChange === 'function') {
      this.options.onStateChange({ ...this.state });
    }
  }
}