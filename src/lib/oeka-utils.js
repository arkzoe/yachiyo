// 工具函数
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function hexToInverse(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return '#000';
  const r = 255 - parseInt(m[1], 16);
  const g = 255 - parseInt(m[2], 16);
  const b = 255 - parseInt(m[3], 16);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}