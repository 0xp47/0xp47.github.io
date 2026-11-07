import { ARROW_D } from "./constants";
import type { ClipRect, CursorShape, SwarmItem } from "./types";

export const rand = (a: number, b: number): number => a + Math.random() * (b - a);
export const clamp = (v: number, a: number, b: number): number => Math.max(a, Math.min(b, v));
export const easeInOut = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);
export const bump = (it: SwarmItem): void => {
  it.v = (it.v || 0) + 1;
};
export const sleep = (ms: number): Promise<void> =>
  new Promise((r) => setTimeout(r, ms));
export const nextFrame = (): Promise<number> =>
  new Promise((r) => requestAnimationFrame(r));
export const f1 = (n: number): number => Math.round(n * 10) / 10;

export function alphaOf(c: string): number {
  if (!c || c === "transparent") return 0;
  const slash = c.match(/\/\s*([\d.]+%?)\s*\)/);
  if (slash) return slash[1].endsWith("%") ? parseFloat(slash[1]) / 100 : parseFloat(slash[1]);
  const m = c.match(/^rgba\(([^)]+)\)/);
  if (m) {
    const p = m[1].split(",");
    return p.length >= 4 ? parseFloat(p[3]) : 1;
  }
  return 1;
}

export function intersect(a: ClipRect | null, b: ClipRect | null): ClipRect | null {
  if (!a || !b) return null;
  const l = Math.max(a.l, b.l);
  const t = Math.max(a.t, b.t);
  const r = Math.min(a.r, b.r);
  const bt = Math.min(a.b, b.b);
  return r > l && bt > t ? { l, t, r, b: bt } : null;
}

export const ltrb = (
  r: DOMRect | { left: number; top: number; right: number; bottom: number }
): ClipRect => ({
  l: r.left,
  t: r.top,
  r: r.right,
  b: r.bottom,
});

export function cursorSVG(shape: CursorShape, c: string, isDark = true): string {
  const st = isDark
    ? 'stroke="#18181b" stroke-width="1.25" stroke-linejoin="round" stroke-linecap="round"'
    : 'stroke="#ffffff" stroke-width="1.25" stroke-linejoin="round" stroke-linecap="round"';
  switch (shape) {
    case "arrow":
      return `<path d="${ARROW_D}" fill="${c}" ${st}/>`;
    case "dup":
      return (
        `<path d="${ARROW_D}" transform="translate(3.5 3)" fill="${isDark ? "#CBD5E1" : "#52525B"}" stroke="${isDark ? "#18181b" : "#ffffff"}" stroke-width="1.2" stroke-linejoin="round"/>` +
        `<path d="${ARROW_D}" fill="${c}" ${st}/>`
      );
    case "pen":
    case "pen-add":
    case "pen-close": {
      const lineSt = isDark ? "#18181b" : "#ffffff";
      let s =
        `<path d="M17.4 10.6 L20.6 13.8 L13.8 20.6 L10.6 17.4 Z" fill="${c}" ${st}/>` +
        `<path d="M3 3 L13.1 6.3 L17.4 10.6 L10.6 17.4 L6.3 13.1 Z" fill="${c}" ${st}/>` +
        `<path d="M3.6 3.6 L8.9 8.9" stroke="${lineSt}" stroke-width="1.2" stroke-linecap="round"/>` +
        `<circle cx="10.2" cy="10.2" r="1.75" fill="none" stroke="${lineSt}" stroke-width="1.2"/>`;
      if (shape === "pen-add")
        s +=
          `<g stroke-linecap="round"><path d="M23 19.5 V26.5 M19.5 23 H26.5" stroke="${isDark ? "#fff" : "#18181b"}" stroke-width="3"/>` +
          `<path d="M23 19.5 V26.5 M19.5 23 H26.5" stroke="${isDark ? "#18181b" : "#fff"}" stroke-width="1.3"/></g>`;
      if (shape === "pen-close")
        s +=
          `<circle cx="23" cy="23" r="2.8" fill="none" stroke="${isDark ? "#fff" : "#18181b"}" stroke-width="3"/>` +
          `<circle cx="23" cy="23" r="2.8" fill="none" stroke="${isDark ? "#18181b" : "#fff"}" stroke-width="1.3"/>`;
      return s;
    }
    case "cross":
      return isDark
        ? `<g stroke-linecap="round"><path d="M12 3.5 V20.5 M3.5 12 H20.5" stroke="#fff" stroke-width="3.2"/><path d="M12 3.5 V20.5 M3.5 12 H20.5" stroke="#18181b" stroke-width="1.4"/></g>`
        : `<g stroke-linecap="round"><path d="M12 3.5 V20.5 M3.5 12 H20.5" stroke="#18181b" stroke-width="3.2"/><path d="M12 3.5 V20.5 M3.5 12 H20.5" stroke="#fff" stroke-width="1.4"/></g>`;
    case "ibeam": {
      const d =
        "M8.5 4.5 H10.5 Q12 4.5 12 6 Q12 4.5 13.5 4.5 H15.5 M12 6 V18 M8.5 19.5 H10.5 Q12 19.5 12 18 Q12 19.5 13.5 19.5 H15.5";
      return isDark
        ? `<g fill="none" stroke-linecap="round"><path d="${d}" stroke="#fff" stroke-width="3.2"/><path d="${d}" stroke="#18181b" stroke-width="1.4"/></g>`
        : `<g fill="none" stroke-linecap="round"><path d="${d}" stroke="#18181b" stroke-width="3.2"/><path d="${d}" stroke="#fff" stroke-width="1.4"/></g>`;
    }
    case "ew":
    case "ns":
      return `<path d="M2.5 12 L7 7.5 V10.4 H17 V7.5 L21.5 12 L17 16.5 V13.6 H7 V16.5 Z"${
        shape === "ns" ? ' transform="rotate(90 12 12)"' : ""
      } fill="${c}" ${st}/>`;
  }
  return "";
}

export function styleString(cs: CSSStyleDeclaration, props: string[]): string {
  let s = "";
  for (const p of props) {
    const v = cs.getPropertyValue(p);
    if (v !== "") s += `${p}:${v};`;
  }
  return s;
}

export const lhPx = (cs: CSSStyleDeclaration): number => {
  const v = parseFloat(cs.lineHeight);
  return isNaN(v) ? (parseFloat(cs.fontSize) || 16) * 1.2 : v;
};

export function boxyStyle(st: CSSStyleDeclaration): boolean {
  if (alphaOf(st.backgroundColor) > 0.02) return true;
  if (st.backgroundImage && st.backgroundImage !== "none") return true;
  if (st.boxShadow && st.boxShadow !== "none") return true;
  const sides = ["Top", "Right", "Bottom", "Left"] as const;
  for (const s of sides) {
    const w = parseFloat(st[`border${s}Width` as unknown as number] || (st as unknown as Record<string, string>)[`border${s}Width`] || "0");
    const style = (st as unknown as Record<string, string>)[`border${s}Style`];
    const color = (st as unknown as Record<string, string>)[`border${s}Color`];
    if (w > 0 && style !== "none" && alphaOf(color) > 0.02) return true;
  }
  return false;
}

export function sameColor(a?: string | null, b?: string | null): boolean {
  return (a || "").replace(/\s/g, "") === (b || "").replace(/\s/g, "");
}
