import { ATOMIC } from "./constants";
import type { SwarmItem, TextUnit } from "./types";
import { boxyStyle } from "./utils";

export function wsOf(n: Node, root: Node): string {
  for (let e: Node | null = n; e && e !== root.parentNode; e = e.parentNode) {
    if (e instanceof HTMLElement && e.style && e.style.whiteSpace) {
      return e.style.whiteSpace;
    }
  }
  return "normal";
}

interface BoxWithOn extends HTMLElement {
  __on?: boolean;
}

export function prepText(it: SwarmItem): void {
  if (!it.full) return;
  const live = it.full.cloneNode(true) as HTMLElement;
  const units: TextUnit[] = [];
  let seq = "";
  const boxes: BoxWithOn[] = [];

  function rec(n: Node, box: HTMLElement | null) {
    for (const c of [...n.childNodes]) {
      if (c.nodeType === 3) {
        // Text node
        const tn = c as Text;
        let s = tn.data;
        const ws = wsOf(n, live);
        if (!/^pre|break-spaces/.test(ws)) s = s.replace(/[\t\n\r ]+/g, " ");
        if (!s.length) {
          c.remove();
          continue;
        }
        units.push({ t: tn, s, len: s.length, box });
        seq += s;
      } else if (c.nodeType === 1) {
        // Element node
        const el = c as HTMLElement;
        if (
          ATOMIC.has(el.localName) ||
          el instanceof SVGElement ||
          (!/\S/.test(el.textContent || "") && el.style && boxyStyle(el.style))
        ) {
          units.push({ e: el, len: 1, box, on: true });
          seq += "□";
        } else {
          const b = el.style && boxyStyle(el.style) ? el : box;
          if (b === el) boxes.push(el as BoxWithOn);
          rec(el, b);
        }
      }
    }
  }

  rec(live, null);

  for (const u of units) {
    if (u.t) u.t.data = "";
    else if (u.e) {
      u.e.style.visibility = "hidden";
      u.on = false;
    }
  }
  for (const b of boxes) {
    b.style.visibility = "hidden";
    b.__on = false;
  }
  it.live = live;
  it.units = units;
  it.seq = seq;
  it.total = seq.length;
  it.shown = 0;
  it.rshown = 0;
}

export function reveal(it: SwarmItem, n: number): Node | null {
  if (!it.units) return null;
  let left = n;
  let last: Node | null = null;
  for (const u of it.units) {
    const k = left <= 0 ? 0 : left >= u.len ? u.len : left;
    left -= k;
    if (u.t) {
      const want = k === u.len ? u.s || "" : (u.s || "").slice(0, k);
      if (u.t.data !== want) u.t.data = want;
      if (k) last = u.t;
    } else if (u.e) {
      const on = k > 0;
      if (u.on !== on) {
        u.e.style.visibility = on ? "" : "hidden";
        u.on = on;
      }
      if (on) last = u.e;
    }
    if (k && u.box) {
      const bBox = u.box as BoxWithOn;
      if (bBox.__on === false) {
        for (let b: Node | null = u.box; b && b !== it.live; b = b.parentNode) {
          const bEl = b as BoxWithOn;
          if (bEl && bEl.__on === false) {
            bEl.style.visibility = "";
            bEl.__on = true;
          }
        }
      }
    }
  }
  return last;
}
