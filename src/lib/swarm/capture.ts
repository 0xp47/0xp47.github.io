import {
  DROP_IN_CLONE,
  ELEM_PROPS,
  FORMS,
  MAX_ITEMS,
  MAX_WORLD_H,
  RECT_PROPS,
  REPLACED,
  SKIP,
  SVG_OUTER_PROPS,
  SVG_PROPS,
  SVGNS,
  TEXT_PROPS,
} from "./constants";
import type {
  BackdropBar,
  BoxRect,
  ClipRect,
  DomTreeNode,
  Env,
  Guide,
  Point,
  Shot,
  SwarmGroup,
  SwarmItem,
  SwarmModel,
  Task,
  TaskSpecType,
} from "./types";
import {
  alphaOf,
  clamp,
  intersect,
  lhPx,
  ltrb,
  sameColor,
  styleString,
} from "./utils";

let inertDoc: Document | null = null;
const inert = (): Document =>
  inertDoc || (inertDoc = document.implementation.createHTMLDocument(""));

export function kidsOf(el: Element): ChildNode[] {
  if (el.shadowRoot) return [...el.shadowRoot.childNodes];
  if (el.localName === "slot") {
    const slot = el as HTMLSlotElement;
    const a = slot.assignedNodes({ flatten: true });
    return a.length ? (a as ChildNode[]) : [...el.childNodes];
  }
  return [...el.childNodes];
}

export function pseudoClone(src: Element, which: string): HTMLElement | null {
  const ps = getComputedStyle(src, which);
  const c = ps.content;
  if (!c || c === "none" || c === "normal" || ps.display === "none") return null;
  const sp = document.createElement("span");
  const str = c.match(/^"((?:[^"\\]|\\.)*)"/);
  if (str) {
    sp.textContent = str[1].replace(/\\(.)/g, "$1");
  } else if (/^url\(/.test(c)) {
    const u = c.match(/^url\(\s*["']?([^"')]+)["']?\s*\)/);
    if (u) {
      const im = document.createElement("img");
      im.src = u[1];
      im.setAttribute("style", "display:inline-block;vertical-align:middle;");
      sp.appendChild(im);
    }
  }
  sp.setAttribute("style", styleString(ps, ELEM_PROPS));
  return sp;
}

export function addPseudos(src: Element, dst: HTMLElement): void {
  const b = pseudoClone(src, "::before");
  if (b) dst.insertBefore(b, dst.firstChild);
  const a = pseudoClone(src, "::after");
  if (a) dst.appendChild(a);
}

export function imgSrc(img: HTMLImageElement): string {
  let s = img.currentSrc || img.src || "";
  const lazy =
    img.getAttribute("data-src") ||
    img.getAttribute("data-lazy-src") ||
    img.getAttribute("data-original");
  if (lazy && (!s || s.startsWith("data:") || !img.complete || !img.naturalWidth)) {
    try {
      s = new URL(lazy, location.href).href;
    } catch {}
  }
  return s;
}

export function canvasPixels(el: HTMLCanvasElement): string | null {
  try {
    const probe = document.createElement("canvas");
    probe.width = probe.height = 12;
    const g = probe.getContext("2d");
    if (!g) return null;
    g.drawImage(el, 0, 0, 12, 12);
    const d = g.getImageData(0, 0, 12, 12).data;
    let a = 0;
    for (let i = 3; i < d.length; i += 4) a += d[i];
    return a > 0 ? el.toDataURL() : null;
  } catch {
    return null;
  }
}

export function fixSvgRefs(src: SVGElement, dst: SVGElement): void {
  for (const u of dst.querySelectorAll("use")) {
    const href = u.getAttribute("href") || u.getAttribute("xlink:href");
    if (!href || href[0] !== "#") continue;
    const ref = document.getElementById(href.slice(1));
    if (!ref) continue;
    const isSym = ref.localName === "symbol";
    const g = document.createElementNS(SVGNS, isSym ? "svg" : "g");
    if (isSym) {
      for (const at of ["viewBox", "preserveAspectRatio"]) {
        const val = ref.getAttribute(at);
        if (val) g.setAttribute(at, val);
      }
      g.setAttribute("width", u.getAttribute("width") || "100%");
      g.setAttribute("height", u.getAttribute("height") || "100%");
      g.setAttribute("x", u.getAttribute("x") || "0");
      g.setAttribute("y", u.getAttribute("y") || "0");
      g.setAttribute("overflow", "visible");
    } else if (u.getAttribute("x") || u.getAttribute("y")) {
      g.setAttribute(
        "transform",
        `translate(${u.getAttribute("x") || 0} ${u.getAttribute("y") || 0})`
      );
    }
    const us = u.getAttribute("style");
    if (us) g.setAttribute("style", us);
    for (const ch of ref.childNodes) {
      if (ch.nodeType !== 1) {
        g.appendChild(ch.cloneNode(true));
        continue;
      }
      g.appendChild(cloneStyled(ch as Element));
    }
    u.replaceWith(g);
  }
  const html = dst.outerHTML;
  const ids = new Set<string>();
  html.replace(/url\(\s*["']?#([^"')\s]+)["']?\s*\)/g, (_, id) => {
    ids.add(id);
    return "";
  });
  if (!ids.size) return;
  let defs: SVGDefsElement | null = null;
  for (const id of ids) {
    if (dst.querySelector(`[id="${CSS.escape(id)}"]`)) continue;
    const ref = document.getElementById(id);
    if (!ref) continue;
    if (!defs) {
      defs = document.createElementNS(SVGNS, "defs");
      dst.insertBefore(defs, dst.firstChild);
    }
    defs.appendChild(ref.cloneNode(true));
  }
}

export function prepClone(src: Element, dst: Element): HTMLElement | null {
  const tag = src.localName;
  if (DROP_IN_CLONE.has(tag)) {
    dst.remove();
    return null;
  }
  const cs = getComputedStyle(src);
  if (cs.display === "none") {
    dst.remove();
    return null;
  }
  const isSvg = src instanceof SVGElement;
  let st = styleString(cs, isSvg ? SVG_PROPS : ELEM_PROPS);
  if (isSvg && tag === "svg" && !(src as SVGElement).ownerSVGElement) {
    dst.setAttribute(
      "width",
      String(src.clientWidth || src.getBoundingClientRect().width)
    );
    dst.setAttribute(
      "height",
      String(src.clientHeight || src.getBoundingClientRect().height)
    );
    st += styleString(cs, SVG_OUTER_PROPS);
  }
  dst.setAttribute("style", st);
  for (const a of [...dst.attributes]) {
    const n = a.name;
    if (
      n.startsWith("on") ||
      n === "contenteditable" ||
      n === "tabindex" ||
      n === "autofocus" ||
      n === "srcset" ||
      n === "sizes" ||
      n === "loading"
    )
      dst.removeAttribute(n);
  }
  if (tag === "img") {
    dst.setAttribute("src", imgSrc(src as HTMLImageElement));
    dst.setAttribute("decoding", "async");
  }
  if (tag === "svg") fixSvgRefs(src as SVGElement, dst as SVGElement);
  if (tag === "audio") {
    dst.remove();
    return null;
  }
  let currentDst: Element = dst;
  if (tag === "video" || tag === "canvas" || (!isSvg && tag.includes("-"))) {
    let rep: HTMLElement;
    if (tag === "video" || tag === "canvas") {
      const url =
        tag === "video"
          ? (src as HTMLVideoElement).poster
          : canvasPixels(src as HTMLCanvasElement);
      rep = document.createElement(url ? "img" : "span");
      if (url) rep.setAttribute("src", url);
      else st += "background:#1b1b1f;";
    } else {
      rep = document.createElement("span");
      while (currentDst.firstChild) rep.appendChild(currentDst.firstChild);
    }
    rep.setAttribute("style", st);
    if (currentDst.parentNode) currentDst.replaceWith(rep);
    currentDst = rep;
  }
  if (!isSvg && !REPLACED.has(tag) && !FORMS.has(tag) && tag !== "img") {
    addPseudos(src, currentDst as HTMLElement);
  }
  return currentDst as HTMLElement;
}

export function cloneStyled(src: Element): HTMLElement {
  const dst = inert().importNode(src, true) as Element;
  const a = [...src.querySelectorAll("*")];
  const b = [...dst.querySelectorAll("*")];
  const root = prepClone(src, dst) || document.createElement("span");
  for (let i = 0; i < a.length && i < b.length; i++) prepClone(a[i], b[i]);
  return root;
}

export function cloneDescendantsStyled(src: Element, dst: Element): void {
  const a = src.querySelectorAll("*");
  const b = dst.querySelectorAll("*");
  for (let i = 0; i < a.length && i < b.length; i++) prepClone(a[i], b[i]);
}

export function cropShot(
  shot: Shot | null,
  r: DOMRect | { left: number; top: number; right: number; bottom: number; width: number; height: number }
): string | null {
  if (!shot || !shot.valid) return null;
  if (r.height > window.innerHeight * 3 || r.width > window.innerWidth * 2) return null;
  const vis = intersect(ltrb(r), { l: 0, t: 0, r: window.innerWidth, b: window.innerHeight });
  if (!vis) return null;
  const k = shot.scale;
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.round(r.width * k));
  c.height = Math.max(1, Math.round(r.height * k));
  const w = (vis.r - vis.l) * k;
  const h = (vis.b - vis.t) * k;
  const ctx = c.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(
    shot.img,
    vis.l * k,
    vis.t * k,
    w,
    h,
    (vis.l - r.left) * k,
    (vis.t - r.top) * k,
    w,
    h
  );
  const full =
    vis.l <= r.left + 1 &&
    vis.t <= r.top + 1 &&
    vis.r >= r.right - 1 &&
    vis.b >= r.bottom - 1;
  try {
    return c.toDataURL(full ? "image/jpeg" : "image/webp", 0.9);
  } catch {
    return null;
  }
}

interface WalkContext {
  op: number;
  layer: "world" | "under" | "over";
  clip: ClipRect;
  zTop: number | null;
  posd: boolean;
  boxItem: SwarmItem | null;
  key: () => number;
  blend?: string;
}

export function captureModel(env: Env, shot: Shot | null): SwarmModel {
  const { ox, oy, sx, sy, vw, vh } = env.geom();
  const docW = Math.max(env.scrollWidth(), vw);
  const docH = Math.min(Math.max(env.scrollHeight(), vh), MAX_WORLD_H);
  const items: SwarmItem[] = [];
  const roots: DomTreeNode[] = [];
  let order = 0;
  const csCache = new Map<Element, CSSStyleDeclaration>();
  const css = (el: Element): CSSStyleDeclaration => {
    let c = csCache.get(el);
    if (!c) {
      c = getComputedStyle(el);
      csCache.set(el, c);
    }
    return c;
  };
  const inlineCache = new Map<Element, boolean>();
  const fullClip: ClipRect = { l: -1e9, t: -1e9, r: 1e9, b: 1e9 };
  const viewClip: ClipRect = {
    l: 0,
    t: 0,
    r: window.innerWidth,
    b: window.innerHeight,
  };
  const pageBg = env.pageBg;
  const floats: Array<{
    el: Element;
    side: string;
    l: number;
    t: number;
    r: number;
    b: number;
  }> = [];
  const bars: Array<{
    node: DomTreeNode | null;
    r: DOMRect;
    start: number;
    key: number;
  }> = [];
  let portKey: number | null = null;
  const html = document.documentElement;
  const body = document.body;

  const conv = (
    r: DOMRect | { left: number; top: number; width: number; height: number },
    layer: "world" | "under" | "over"
  ): BoxRect =>
    layer === "world"
      ? { x: r.left - ox + sx, y: r.top - oy + sy, w: r.width, h: r.height }
      : { x: r.left, y: r.top, w: r.width, h: r.height };

  const convClip = (
    c: ClipRect,
    layer: "world" | "under" | "over"
  ): ClipRect =>
    layer === "world"
      ? { l: c.l - ox + sx, t: c.t - oy + sy, r: c.r - ox + sx, b: c.b - oy + sy }
      : { ...c };

  const clipFor = (
    r: DOMRect | { left: number; top: number; right: number; bottom: number },
    clip: ClipRect,
    layer: "world" | "under" | "over"
  ): ClipRect | null => {
    if (
      r.left >= clip.l - 0.5 &&
      r.top >= clip.t - 0.5 &&
      r.right <= clip.r + 0.5 &&
      r.bottom <= clip.b + 0.5
    )
      return null;
    return convClip(clip, layer);
  };

  const inDoc = (b: BoxRect, layer: "world" | "under" | "over"): boolean =>
    layer === "world"
      ? b.x + b.w > 0 && b.x < docW && b.y + b.h > 0 && b.y < docH
      : b.x + b.w > 0 &&
        b.x < window.innerWidth &&
        b.y + b.h > 0 &&
        b.y < window.innerHeight;

  function add(it: SwarmItem): SwarmItem {
    it.id = items.length;
    it.v = 1;
    it.rv = 0;
    it.vis = false;
    it.dx = 0;
    it.dy = 0;
    it.scale = 1;
    it.mode = "own";
    items.push(it);
    return it;
  }

  function allInline(el: Element): boolean {
    let v = inlineCache.get(el);
    if (v !== undefined) return v;
    v = !el.shadowRoot;
    if (v) {
      for (const c of el.children) {
        const tag = c.localName;
        if (SKIP.has(tag) || tag === "br" || tag === "wbr") continue;
        if (c instanceof SVGElement) continue;
        const d = css(c).display;
        if (d === "none") continue;
        if (d === "inline") {
          if (!allInline(c)) {
            v = false;
            break;
          }
        } else if (!d.startsWith("inline")) {
          v = false;
          break;
        }
      }
    }
    inlineCache.set(el, v);
    return v;
  }

  function rootStyle(cs: CSSStyleDeclaration, isRun: boolean): string {
    let s = styleString(cs, TEXT_PROPS);
    if (isRun)
      return (
        s +
        "display:block;padding:0;margin:0;box-sizing:border-box;width:100%;height:100%;position:relative;"
      );
    const pad = (side: string) =>
      (parseFloat(cs.getPropertyValue(`padding-${side}`)) || 0) +
      (parseFloat(cs.getPropertyValue(`border-${side}-width`)) || 0);
    let d = cs.display;
    if (/flex/.test(d)) {
      d = "flex";
      s += styleString(cs, [
        "flex-direction",
        "flex-wrap",
        "align-items",
        "justify-content",
        "align-content",
        "row-gap",
        "column-gap",
      ]);
    } else if (/grid/.test(d)) {
      d = "grid";
      s += styleString(cs, [
        "grid-template-columns",
        "grid-template-rows",
        "grid-auto-flow",
        "grid-auto-columns",
        "grid-auto-rows",
        "align-items",
        "justify-items",
        "justify-content",
        "align-content",
        "row-gap",
        "column-gap",
      ]);
    } else if (d === "list-item" || d === "-webkit-box") {
      // keep
    } else d = "block";
    s += `display:${d};padding:${pad("top")}px ${pad("right")}px ${pad(
      "bottom"
    )}px ${pad("left")}px;`;
    if (
      cs.overflowX !== "visible" ||
      cs.overflowY !== "visible" ||
      cs.textOverflow === "ellipsis" ||
      (cs.webkitLineClamp && cs.webkitLineClamp !== "none")
    ) {
      s += styleString(cs, [
        "overflow-x",
        "overflow-y",
        "text-overflow",
        "-webkit-line-clamp",
        "-webkit-box-orient",
      ]);
    }
    return (
      s +
      "margin:0;box-sizing:border-box;width:100%;height:100%;position:relative;"
    );
  }

  function textItem(
    base: {
      x: number;
      y: number;
      w: number;
      h: number;
      layer: "world" | "under" | "over";
      key: number;
      op: number;
      clip: ClipRect | null;
      parentBox: SwarmItem | null;
      blend?: string;
    },
    root: HTMLElement,
    tb: BoxRect,
    cs: CSSStyleDeclaration,
    extra?: Partial<SwarmItem>
  ): SwarmItem {
    const fs = parseFloat(cs.fontSize) || 16;
    const text = (root.textContent || "").replace(/\s+/g, " ").trim();
    return add({
      kind: "text",
      ...base,
      tb,
      full: root,
      fs,
      lh: lhPx(cs),
      align: cs.textAlign,
      text,
      sig: text,
      ...extra,
    });
  }

  function emitLeaf(
    el: Element,
    cs: CSSStyleDeclaration,
    r: DOMRect,
    ctx: WalkContext,
    key: number
  ): void {
    const root = document.createElement("div");
    root.setAttribute("style", rootStyle(cs, false));
    const clone = inert().importNode(el, true) as Element;
    cloneDescendantsStyled(el, clone);
    while (clone.firstChild) root.appendChild(clone.firstChild);
    addPseudos(el, root);
    const rg = document.createRange();
    rg.selectNodeContents(el);
    const tr = rg.getBoundingClientRect();
    if (cs.display === "table-cell" && tr.height) {
      root.style.paddingTop = Math.max(0, tr.top - r.top) + "px";
    }
    if (/^(block|list-item)$/.test(root.style.display)) {
      const n = (p: string) => parseFloat(cs.getPropertyValue(p)) || 0;
      const cl = r.left + n("border-left-width") + n("padding-left");
      const ct = r.top + n("border-top-width") + n("padding-top");
      const cr = r.right - n("border-right-width") - n("padding-right");
      for (const f of floats) {
        if (
          f.b <= r.top + 1 ||
          f.t >= r.bottom - 1 ||
          f.r <= r.left + 1 ||
          f.l >= r.right - 1
        )
          continue;
        if (f.el.contains(el)) continue;
        const shim = document.createElement("div");
        const top = Math.max(0, f.t - ct);
        const w = f.side === "left" ? f.r - cl : cr - f.l;
        if (w <= 0) continue;
        shim.setAttribute(
          "style",
          `float:${f.side};clear:${f.side};width:${w}px;height:${Math.max(
            0,
            f.b - Math.max(f.t, ct)
          )}px;margin-top:${top}px;`
        );
        root.insertBefore(shim, root.firstChild);
      }
    }
    const box = conv(r, ctx.layer);
    const tb =
      tr.width > 0 && tr.height > 0 ? conv(tr, ctx.layer) : { ...box };
    tb.x = clamp(tb.x, box.x - 4, box.x + box.w);
    tb.y = clamp(tb.y, box.y - 4, box.y + box.h);
    textItem(
      {
        ...box,
        layer: ctx.layer,
        key,
        op: ctx.op,
        clip: clipFor(r, ctx.clip, ctx.layer),
        parentBox: ctx.boxItem,
        blend:
          cs.mixBlendMode !== "normal" ? cs.mixBlendMode : ctx.blend || "",
      },
      root,
      tb,
      cs
    );
  }

  function emitRun(
    el: Element,
    cs: CSSStyleDeclaration,
    run: ChildNode[],
    ctx: WalkContext
  ): void {
    const rg = document.createRange();
    rg.setStartBefore(run[0]);
    rg.setEndAfter(run[run.length - 1]);
    const r = rg.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return;
    if (!intersect(ltrb(r), ctx.clip)) return;
    const root = document.createElement("div");
    root.setAttribute("style", rootStyle(cs, true));
    const single = r.height < lhPx(cs) * 1.6;
    if (single) root.style.whiteSpace = "nowrap";
    for (const n of run) {
      if (n.nodeType === 3)
        root.appendChild(document.createTextNode((n as Text).data));
      else root.appendChild(cloneStyled(n as Element));
    }
    const box = conv(r, ctx.layer);
    if (!inDoc(box, ctx.layer)) return;
    box.w += 1;
    textItem(
      {
        ...box,
        layer: ctx.layer,
        key: ctx.key(),
        op: ctx.op,
        clip: clipFor(r, ctx.clip, ctx.layer),
        parentBox: ctx.boxItem,
        blend: ctx.blend || "",
      },
      root,
      { ...box },
      cs
    );
  }

  function lineItem(
    pts: Point[],
    stroke: string,
    sw: number,
    dash: string | null,
    ctx: WalkContext,
    key: number
  ): SwarmItem {
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => p.y);
    return add({
      kind: "line",
      x: Math.min(...xs),
      y: Math.min(...ys),
      w: Math.max(...xs) - Math.min(...xs),
      h: Math.max(...ys) - Math.min(...ys),
      pts,
      stroke,
      sw,
      dash,
      placed: 0,
      shut: false,
      edit: false,
      owner: null,
      layer: ctx.layer,
      key,
      op: ctx.op,
      clip: null,
      parentBox: ctx.boxItem,
      sig: pts.length + stroke,
    });
  }

  function emitBox(
    el: Element,
    cs: CSSStyleDeclaration,
    r: DOMRect | { left: number; top: number; right: number; bottom: number; width: number; height: number },
    ctx: WalkContext,
    key: number,
    forceRect: boolean
  ): SwarmItem | null {
    if (el === html) return null;
    const tag = el.localName;
    const bgc = cs.backgroundColor;
    const bgi = cs.backgroundImage;
    const bgVisible =
      (alphaOf(bgc) > 0.01 && !sameColor(bgc, pageBg.color)) || bgi !== "none";
    if (el === body && pageBg.from === body) return null;
    const sides = ["top", "right", "bottom", "left"].map((s) => {
      const w = parseFloat(cs.getPropertyValue(`border-${s}-width`)) || 0;
      const st = cs.getPropertyValue(`border-${s}-style`);
      const c = cs.getPropertyValue(`border-${s}-color`);
      return w > 0 && st !== "none" && st !== "hidden" && alphaOf(c) > 0.02
        ? { s, w, st, c }
        : null;
    });
    const nb = sides.filter(Boolean).length;
    const shadow = cs.boxShadow && cs.boxShadow !== "none";
    const backdrop = cs.backdropFilter && cs.backdropFilter !== "none";
    const b = conv(r, ctx.layer);
    if (tag === "hr") {
      const c = sides[0]
        ? sides[0].c
        : alphaOf(bgc) > 0.01
        ? bgc
        : "rgb(200,200,200)";
      const y = b.y + b.h / 2;
      lineItem(
        [
          { x: b.x, y },
          { x: b.x + b.w, y },
        ],
        c,
        Math.max(1, Math.min(b.h, 2)),
        null,
        ctx,
        key
      );
      return null;
    }
    const sameAsPage =
      alphaOf(bgc) > 0.01 && sameColor(bgc, pageBg.color) && bgi === "none";
    if (!forceRect && !bgVisible && !shadow && !backdrop) {
      if (nb === 0) return null;
      if (nb < 4) {
        for (const sd of sides) {
          if (!sd) continue;
          const hw = sd.w / 2;
          let pts: Point[];
          if (sd.s === "top")
            pts = [
              { x: b.x, y: b.y + hw },
              { x: b.x + b.w, y: b.y + hw },
            ];
          else if (sd.s === "bottom")
            pts = [
              { x: b.x, y: b.y + b.h - hw },
              { x: b.x + b.w, y: b.y + b.h - hw },
            ];
          else if (sd.s === "left")
            pts = [
              { x: b.x + hw, y: b.y },
              { x: b.x + hw, y: b.y + b.h },
            ];
          else
            pts = [
              { x: b.x + b.w - hw, y: b.y },
              { x: b.x + b.w - hw, y: b.y + b.h },
            ];
          const dash =
            sd.st === "dashed"
              ? `${sd.w * 3} ${sd.w * 2}`
              : sd.st === "dotted"
              ? `${sd.w} ${sd.w * 1.5}`
              : null;
          lineItem(pts, sd.c, sd.w, dash, ctx, key);
        }
        return null;
      }
    }
    if (sameAsPage && nb === 0 && !shadow && !backdrop && !forceRect)
      return null;
    const cssText = styleString(cs, RECT_PROPS);
    return add({
      kind: "rect",
      blend:
        cs.mixBlendMode !== "normal" ? cs.mixBlendMode : ctx.blend || "",
      big: b.w * b.h > vw * vh * 0.4,
      ...b,
      css: cssText,
      radius: cs.borderRadius,
      draw: null,
      styled: false,
      layer: ctx.layer,
      key,
      op: ctx.op,
      clip: clipFor(r, ctx.clip, ctx.layer),
      parentBox: ctx.boxItem,
      sig: cssText,
    });
  }

  const PSEUDO_EL = { localName: "pseudo" } as unknown as Element;
  function emitPseudoBox(
    el: Element,
    cs: CSSStyleDeclaration,
    r: DOMRect,
    ctx: WalkContext,
    which: string,
    empty: boolean
  ): void {
    const ps = getComputedStyle(el, which);
    const c = ps.content;
    if (
      !c ||
      c === "none" ||
      c === "normal" ||
      ps.display === "none" ||
      ps.visibility !== "visible"
    )
      return;
    const pop = parseFloat(ps.opacity);
    if (!(pop > 0.03)) return;
    const n = (v: string) => parseFloat(v) || 0;
    const w = parseFloat(ps.width);
    const h = parseFloat(ps.height);
    if (!(w > 0 && h > 0)) return;
    const pad = {
      l: r.left + n(cs.borderLeftWidth),
      t: r.top + n(cs.borderTopWidth),
      r: r.right - n(cs.borderRightWidth),
      b: r.bottom - n(cs.borderBottomWidth),
    };
    let L: number;
    let T: number;
    if (ps.position === "absolute") {
      if (cs.position === "static") return;
      const bw =
        w +
        n(ps.paddingLeft) +
        n(ps.paddingRight) +
        n(ps.borderLeftWidth) +
        n(ps.borderRightWidth);
      const bh =
        h +
        n(ps.paddingTop) +
        n(ps.paddingBottom) +
        n(ps.borderTopWidth) +
        n(ps.borderBottomWidth);
      L =
        ps.left !== "auto"
          ? pad.l + n(ps.left)
          : ps.right !== "auto"
          ? pad.r - n(ps.right) - bw
          : pad.l;
      T =
        ps.top !== "auto"
          ? pad.t + n(ps.top)
          : ps.bottom !== "auto"
          ? pad.b - n(ps.bottom) - bh
          : pad.t;
      const m = ps.transform.match(/^matrix\(([^)]+)\)$/);
      if (m) {
        const k = m[1].split(",").map(Number);
        L += k[4];
        T += k[5];
      }
      const fake = {
        left: L,
        top: T,
        right: L + bw,
        bottom: T + bh,
        width: bw,
        height: bh,
      };
      if (!intersect(ltrb(fake), ctx.clip)) return;
      emitBox(
        PSEUDO_EL,
        ps,
        fake,
        { ...ctx, op: ctx.op * pop },
        ctx.key(),
        false
      );
    } else {
      const cl = pad.l + n(cs.paddingLeft);
      const ct = pad.t + n(cs.paddingTop);
      const cw = pad.r - n(cs.paddingRight) - cl;
      const ch = pad.b - n(cs.paddingBottom) - ct;
      const align =
        (ps.alignSelf !== "auto" ? ps.alignSelf : cs.alignItems) || "";
      const vAlign = () =>
        /center/.test(align)
          ? ct + (ch - h) / 2
          : /end/.test(align)
          ? ct + ch - h
          : ct;
      if (empty) {
        L = cl + Math.max(0, (cw - w) / 2);
        T = ct + Math.max(0, (ch - h) / 2);
      } else if (/flex/.test(cs.display) && /^row/.test(cs.flexDirection)) {
        const kidsR = [...el.children]
          .filter(
            (k) =>
              css(k).display !== "none" &&
              css(k).position !== "absolute" &&
              css(k).position !== "fixed"
          )
          .map((k) => k.getBoundingClientRect())
          .filter((k) => k.width || k.height);
        if (!kidsR.length) return;
        const gap = n(cs.columnGap);
        if (which === "::after")
          L = kidsR[kidsR.length - 1].right + gap + n(ps.marginLeft);
        else L = kidsR[0].left - gap - n(ps.marginRight) - w;
        T = vAlign();
      } else return;
      const fake = {
        left: L,
        top: T,
        right: L + w,
        bottom: T + h,
        width: w,
        height: h,
      };
      if (!intersect(ltrb(fake), ctx.clip)) return;
      emitBox(
        PSEUDO_EL,
        ps,
        fake,
        { ...ctx, op: ctx.op * pop },
        ctx.key(),
        false
      );
    }
  }

  function mediaFor(
    el: Element,
    cs: CSSStyleDeclaration,
    r: DOMRect
  ): { el: HTMLElement | SVGElement | HTMLCanvasElement; sig: string } | null {
    const tag = el.localName;
    const fit = `object-fit:${cs.objectFit};object-position:${cs.objectPosition};`;
    if (tag === "img") {
      const src = imgSrc(el as HTMLImageElement);
      if (!src) return null;
      const m = document.createElement("img");
      m.src = src;
      m.decoding = "async";
      m.setAttribute("style", fit + "display:block;");
      m.draggable = false;
      return { el: m, sig: src };
    }
    if (tag === "svg") {
      const m = cloneStyled(el);
      m.setAttribute("width", "100%");
      m.setAttribute("height", "100%");
      m.style.display = "block";
      m.style.overflow = "visible";
      m.style.margin = "0";
      m.style.position = "static";
      const mt = cs.transform.match(/^matrix\(([^)]+)\)$/);
      const k = mt ? mt[1].split(",").map(Number) : null;
      m.style.transform =
        k &&
        Math.abs(Math.hypot(k[0], k[1]) - 1) < 0.02 &&
        Math.abs(Math.hypot(k[2], k[3]) - 1) < 0.02
          ? `matrix(${k[0]},${k[1]},${k[2]},${k[3]},0,0)`
          : "none";
      m.style.transformOrigin = "50% 50%";
      const h = m.outerHTML;
      return { el: m, sig: h.length + ":" + h.slice(0, 160) };
    }
    const imgOf = (
      src: string,
      extra?: string
    ): { el: HTMLElement; sig: string } => {
      const m = document.createElement("img");
      m.src = src;
      m.setAttribute(
        "style",
        (extra || "") + "display:block;width:100%;height:100%;"
      );
      m.draggable = false;
      return { el: m, sig: src.slice(0, 120) + src.length };
    };
    if (
      tag === "video" ||
      tag === "canvas" ||
      tag === "iframe" ||
      tag === "embed" ||
      tag === "object"
    ) {
      const crop = cropShot(shot, r);
      if (crop) return imgOf(crop);
    }
    if (tag === "video") {
      const vid = el as HTMLVideoElement;
      let src = vid.poster || "";
      if (!src && vid.videoWidth) {
        try {
          const c = document.createElement("canvas");
          c.width = vid.videoWidth;
          c.height = vid.videoHeight;
          const g = c.getContext("2d");
          if (g) {
            g.drawImage(vid, 0, 0);
            src = c.toDataURL("image/jpeg", 0.82);
          }
        } catch {}
      }
      if (src) {
        const m = document.createElement("img");
        m.src = src;
        m.setAttribute("style", fit + "display:block;");
        return { el: m, sig: src.slice(0, 200) };
      }
      const d = document.createElement("div");
      d.setAttribute("style", "background:#111;");
      return { el: d, sig: "video" };
    }
    if (tag === "canvas") {
      const cvs = el as HTMLCanvasElement;
      const c = document.createElement("canvas");
      c.width = cvs.width || cvs.offsetWidth || 300;
      c.height = cvs.height || cvs.offsetHeight || 150;
      c.setAttribute(
        "style",
        fit + "display:block;width:100%;height:100%;pointer-events:none;"
      );
      (c as unknown as { _sourceCanvas: HTMLCanvasElement })._sourceCanvas = cvs;
      return {
        el: c,
        sig: "canvas:" + (cvs.className || "") + ":" + c.width + "x" + c.height,
      };
    }
    // iframe / embed / object
    const d = document.createElement("div");
    let host = "";
    try {
      const mediaEl = el as HTMLIFrameElement;
      host = new URL(mediaEl.src || "", location.href).hostname.replace(
        /^www\./,
        ""
      );
    } catch {}
    d.setAttribute(
      "style",
      "background:#F1F2F4;display:flex;align-items:center;justify-content:center;font:500 12px/1.2 system-ui,sans-serif;color:#8A8F98;letter-spacing:.01em;"
    );
    d.textContent = host || "embed";
    return { el: d, sig: "frame:" + host };
  }

  function emitMedia(
    el: Element,
    cs: CSSStyleDeclaration,
    r: DOMRect,
    ctx: WalkContext,
    key: number
  ): void {
    let src = el;
    let scs = cs;
    if (el.localName === "picture") {
      const img = el.querySelector("img");
      if (!img) return;
      src = img;
      scs = css(src);
    }
    const m = mediaFor(src, scs, r);
    if (!m) return;
    const b = conv(r, ctx.layer);
    add({
      kind: "image",
      ...b,
      blend:
        cs.mixBlendMode !== "normal" ? cs.mixBlendMode : ctx.blend || "",
      media: m.el,
      frame: styleString(cs, [
        "border-top-width",
        "border-right-width",
        "border-bottom-width",
        "border-left-width",
        "border-top-style",
        "border-right-style",
        "border-bottom-style",
        "border-left-style",
        "border-top-color",
        "border-right-color",
        "border-bottom-color",
        "border-left-color",
      ]),
      radius: cs.borderRadius,
      shadow: cs.boxShadow !== "none" ? cs.boxShadow : "",
      bg: alphaOf(cs.backgroundColor) > 0.01 ? cs.backgroundColor : "",
      draw: null,
      styled: false,
      layer: ctx.layer,
      key,
      op: ctx.op,
      clip: clipFor(r, ctx.clip, ctx.layer),
      parentBox: ctx.boxItem,
      sig: m.sig,
    });
  }

  function emitForm(
    el: Element,
    cs: CSSStyleDeclaration,
    r: DOMRect,
    ctx: WalkContext,
    key: number
  ): void {
    const tag = el.localName;
    const formEl = el as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const type = (el.getAttribute("type") || "").toLowerCase();
    if (type === "hidden") return;
    const b = conv(r, ctx.layer);
    if (tag === "input" && (type === "checkbox" || type === "radio")) {
      const inputEl = el as HTMLInputElement;
      const accent =
        cs.accentColor && cs.accentColor !== "auto"
          ? cs.accentColor
          : "#0B6CFF";
      const s = document.createElementNS(SVGNS, "svg");
      s.setAttribute("viewBox", "0 0 16 16");
      s.setAttribute("width", "100%");
      s.setAttribute("height", "100%");
      const on = inputEl.checked;
      s.innerHTML =
        type === "radio"
          ? `<circle cx="8" cy="8" r="7" fill="#fff" stroke="${
              on ? accent : "#767676"
            }" stroke-width="1.2"/>${
              on ? `<circle cx="8" cy="8" r="4" fill="${accent}"/>` : ""
            }`
          : `<rect x="1" y="1" width="14" height="14" rx="2.5" fill="${
              on ? accent : "#fff"
            }" stroke="${on ? accent : "#767676"}" stroke-width="1.2"/>${
              on
                ? '<path d="M4.2 8.3 L7 11 L12 5.4" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>'
                : ""
            }`;
      add({
        kind: "image",
        ...b,
        media: s,
        frame: "",
        radius: "0px",
        shadow: "",
        bg: "",
        draw: null,
        styled: false,
        layer: ctx.layer,
        key,
        op: ctx.op,
        clip: null,
        parentBox: ctx.boxItem,
        sig: type + on,
      });
      return;
    }
    const boxIt = emitBox(el, cs, r, ctx, key, false);
    let text = "";
    let ph = false;
    if (tag === "select") {
      const sel = el as HTMLSelectElement;
      text =
        (sel.selectedOptions &&
          sel.selectedOptions[0] &&
          sel.selectedOptions[0].text) ||
        "";
    } else if (["submit", "button", "reset"].includes(type)) {
      text =
        formEl.value ||
        (type === "submit" ? "Submit" : type === "reset" ? "Reset" : "");
    } else if (type === "password") {
      text = "•".repeat((formEl.value || "").length);
    } else if (["range", "color", "file", "image"].includes(type)) {
      text = "";
    } else {
      text = formEl.value || "";
    }
    if (!text && "placeholder" in formEl && formEl.placeholder) {
      text = formEl.placeholder;
      ph = true;
    }
    if (!text.trim()) return;
    const root = document.createElement("div");
    const pad = (side: string) =>
      (parseFloat(cs.getPropertyValue(`padding-${side}`)) || 0) +
      (parseFloat(cs.getPropertyValue(`border-${side}-width`)) || 0);
    const isButton = ["submit", "button", "reset"].includes(type);
    let st = styleString(cs, TEXT_PROPS);
    st += `padding:${pad("top")}px ${pad("right")}px ${pad("bottom")}px ${pad(
      "left"
    )}px;margin:0;box-sizing:border-box;width:100%;height:100%;overflow:hidden;`;
    st +=
      tag === "textarea"
        ? "display:block;white-space:pre-wrap;"
        : `display:flex;align-items:center;white-space:pre;${
            isButton ? "justify-content:center;" : ""
          }`;
    if (ph)
      st += `color:${
        getComputedStyle(el, "::placeholder").color
      };-webkit-text-fill-color:currentColor;`;
    root.setAttribute("style", st);
    root.textContent = text;
    textItem(
      {
        ...b,
        layer: ctx.layer,
        key: key + 0.5,
        op: ctx.op,
        clip: clipFor(r, ctx.clip, ctx.layer),
        parentBox: boxIt || ctx.boxItem,
      },
      root,
      { ...b },
      cs
    );
  }

  function walk(
    el: Element,
    ctx: Omit<WalkContext, "key"> & { key?: () => number },
    parent: DomTreeNode | null
  ): void {
    if (items.length >= MAX_ITEMS) return;
    const tag = el.localName;
    if (SKIP.has(tag) || el === env.host) return;
    const cs = css(el);
    const disp = cs.display;
    if (disp === "none") return;
    if (disp === "contents") {
      let run: ChildNode[] = [];
      const flushRun = () => {
        if (
          ctx.key &&
          run.some((n) => n.nodeType === 3 && /\S/.test((n as Text).data))
        )
          emitRun(el, cs, run, ctx as WalkContext);
        run = [];
      };
      for (const c of kidsOf(el)) {
        if (c.nodeType === 3) run.push(c);
        else if (c.nodeType === 1) {
          flushRun();
          walk(c as Element, ctx, parent);
        }
      }
      flushRun();
      return;
    }
    const op = ctx.op * parseFloat(cs.opacity);
    if (!(op > 0.03)) return;
    const r = el.getBoundingClientRect();
    const clipsSelf =
      el !== html &&
      el !== body &&
      el !== env.scroller &&
      cs.overflowX !== "visible" &&
      cs.overflowY !== "visible";
    if (clipsSelf && (r.width <= 2 || r.height <= 2)) return;
    if (
      cs.position === "absolute" &&
      /rect\(0px,? 0px,? 0px,? 0px\)/.test(cs.clip)
    )
      return;
    if (/inset\(50%\)|circle\(0px/.test(cs.clipPath)) return;
    if (cs.float !== "none" && r.width > 1 && r.height > 1) {
      const n = (p: string) => parseFloat(cs.getPropertyValue(p)) || 0;
      floats.push({
        el,
        side: cs.float,
        l: r.left - n("margin-left"),
        t: r.top - n("margin-top"),
        r: r.right + n("margin-right"),
        b: r.bottom + n("margin-bottom"),
      });
    }
    let layer = ctx.layer;
    let clip = ctx.clip;
    let zTop = ctx.zTop;
    let posd = ctx.posd;
    const pos = cs.position;
    if (pos === "fixed" && layer !== "over") {
      layer = "over";
      clip = viewClip;
    } else if (pos === "sticky" && layer === "world") {
      const top = parseFloat(cs.top);
      if (
        !isNaN(top) &&
        Math.abs(r.top - oy - top) < 2 &&
        r.height < vh * 0.4
      ) {
        layer = "over";
        clip = viewClip;
      }
    }
    const pe = el.parentElement;
    const flexItem =
      pos === "static" && pe && /flex|grid/.test(css(pe).display);
    if (pos !== "static" || flexItem) {
      if (cs.zIndex !== "auto") {
        if (zTop == null) zTop = parseInt(cs.zIndex, 10) || 0;
      } else if (pos !== "static") posd = true;
    }
    const keyFn = () =>
      (zTop || 0) * 1e7 + (posd ? 5e6 : 0) + order++;
    if (
      layer === "over" &&
      ctx.layer !== "over" &&
      r.top <= 4 &&
      r.width >= vw * 0.8 &&
      r.height > 20 &&
      r.height <= 200
    ) {
      bars.push({
        node: null,
        r,
        start: items.length,
        key: (zTop || 0) * 1e7 + (posd ? 5e6 : 0) + order - 0.5,
      });
    }
    const isScroller = !env.isRoot && el === env.scroller;
    const kidLayer = isScroller ? "world" : layer;
    const box = conv(r, layer);
    const visible = cs.visibility === "visible";
    const sized = r.width >= 1 && r.height >= 1;
    const emit =
      visible && sized && !!intersect(ltrb(r), clip) && inDoc(box, layer);

    const node: DomTreeNode = {
      el,
      tag,
      cls: (el.getAttribute && el.getAttribute("class")) || "",
      layer,
      start: items.length,
      end: items.length,
      kids: [],
      box,
    };
    (parent ? parent.kids : roots).push(node);

    if (REPLACED.has(tag) || FORMS.has(tag)) {
      if (emit) {
        if (FORMS.has(tag))
          emitForm(el, cs, r, { ...ctx, layer, clip, op, key: keyFn }, keyFn());
        else
          emitMedia(el, cs, r, { ...ctx, layer, clip, op, key: keyFn }, keyFn());
      }
      node.end = items.length;
      return;
    }

    let boxItem = ctx.boxItem;
    if (emit) {
      const b = emitBox(
        el,
        cs,
        r,
        { ...ctx, layer, clip, op, key: keyFn },
        keyFn(),
        false
      );
      if (b) boxItem = b;
    }

    let kidClip = clip;
    if (isScroller) {
      kidClip = fullClip;
      portKey = keyFn();
    } else if (
      el !== html &&
      el !== body &&
      (cs.overflowX !== "visible" || cs.overflowY !== "visible")
    ) {
      const bl = parseFloat(cs.borderLeftWidth) || 0;
      const bt = parseFloat(cs.borderTopWidth) || 0;
      const br = parseFloat(cs.borderRightWidth) || 0;
      const bb = parseFloat(cs.borderBottomWidth) || 0;
      const ic = intersect(clip, {
        l: r.left + bl,
        t: r.top + bt,
        r: r.right - br,
        b: r.bottom - bb,
      });
      if (!ic) {
        node.end = items.length;
        return;
      }
      kidClip = ic;
    }
    const blend =
      cs.mixBlendMode !== "normal" ? cs.mixBlendMode : ctx.blend;
    const kctx: WalkContext = {
      op,
      layer: kidLayer,
      clip: kidClip,
      zTop,
      posd,
      boxItem,
      key: keyFn,
      blend,
    };

    if (cs.contentVisibility === "hidden") {
      node.end = items.length;
      return;
    }
    let kids = kidsOf(el);
    if (tag === "details" && !(el as HTMLDetailsElement).open) {
      const sum = kids.find(
        (n) => n.nodeType === 1 && (n as Element).localName === "summary"
      );
      kids = sum ? [sum] : [];
    }
    const emptyEl = !kids.some(
      (k) =>
        (k.nodeType === 3 && /\S/.test((k as Text).data)) || k.nodeType === 1
    );
    const pctx: WalkContext = { ...kctx, layer, clip };
    const directText = kids.some(
      (n) => n.nodeType === 3 && /\S/.test((n as Text).data)
    );
    const kinds: number[] = [];
    let allRun = !el.shadowRoot;
    let anyText = directText;
    for (const n of kids) {
      if (n.nodeType === 3) {
        kinds.push(1);
        continue;
      }
      if (n.nodeType !== 1 || SKIP.has((n as Element).localName)) {
        kinds.push(0);
        continue;
      }
      const elNode = n as Element;
      const d = css(elNode).display;
      if (d === "none") {
        kinds.push(0);
        continue;
      }
      let inl = false;
      const nt = elNode.localName;
      if (elNode.shadowRoot || nt === "slot") inl = false;
      else if (nt === "br" || nt === "wbr") inl = true;
      else if (d === "inline") inl = allInline(elNode);
      else if (directText && d.startsWith("inline")) inl = true;
      if (inl && !anyText && /\S/.test(elNode.textContent || "")) anyText = true;
      kinds.push(inl ? 1 : 2);
      if (!inl) allRun = false;
    }

    if (allRun && anyText && !isScroller) {
      if (visible && sized && emit)
        emitLeaf(el, cs, r, { ...kctx, layer }, keyFn());
      node.end = items.length;
      return;
    }
    if (emit && visible) emitPseudoBox(el, cs, r, pctx, "::before", emptyEl);
    const afterPseudo = () => {
      if (emit && visible) emitPseudoBox(el, cs, r, pctx, "::after", emptyEl);
    };

    let run: ChildNode[] = [];
    const flush = () => {
      if (!run.length) return;
      const hasText = run.some((n) =>
        n.nodeType === 3
          ? /\S/.test((n as Text).data)
          : /\S/.test(n.textContent || "")
      );
      if (hasText) {
        if (visible) emitRun(el, cs, run, kctx);
      } else {
        for (const n of run) if (n.nodeType === 1) walk(n as Element, kctx, node);
      }
      run = [];
    };
    kids.forEach((n, i) => {
      if (kinds[i] === 1) run.push(n);
      else if (kinds[i] === 2) {
        flush();
        walk(n as Element, kctx, node);
      }
    });
    flush();
    afterPseudo();
    node.end = items.length;
  }

  const rootLayer: "world" | "under" = env.isRoot ? "world" : "under";
  const rootClip: ClipRect = env.isRoot ? fullClip : viewClip;
  walk(
    html,
    {
      op: 1,
      layer: rootLayer,
      clip: rootClip,
      zTop: null,
      posd: false,
      boxItem: null,
    },
    null
  );

  // Repeated components (dup)
  const groups: SwarmGroup[] = [];
  const kindsSig = (n: DomTreeNode): string => {
    let s = "";
    for (let i = n.start; i < n.end; i++) s += items[i].kind[0];
    return s;
  };
  const similar = (a: BoxRect, b: BoxRect, loose: boolean): boolean =>
    a.w > 0 &&
    b.w > 0 &&
    a.h > 0 &&
    b.h > 0 &&
    a.h / b.h < 1.8 &&
    b.h / a.h < 1.8 &&
    (loose || (a.w / b.w < 1.6 && b.w / a.w < 1.6));

  function findGroups(node: DomTreeNode, inCopy: boolean): void {
    if (inCopy) return;
    const buckets = new Map<string, DomTreeNode[]>();
    for (const k of node.kids) {
      const n = k.end - k.start;
      if (n < 1 || n > 48) continue;
      if (
        n === 1 &&
        items[k.start].kind === "text" &&
        (items[k.start].text?.length || 0) > 40
      )
        continue;
      const sig = `${k.tag}|${k.cls}|${k.layer}|${kindsSig(k)}`;
      if (!buckets.has(sig)) buckets.set(sig, []);
      buckets.get(sig)!.push(k);
    }
    const copies = new Set<DomTreeNode>();
    for (const list of buckets.values()) {
      if (list.length < 2) continue;
      const m = list[0];
      const loose = m.end - m.start === 1 && items[m.start].kind === "text";
      const members = list.filter((k) => similar(k.box, m.box, loose));
      if (members.length < 2) continue;
      const g: SwarmGroup = {
        id: groups.length,
        master: members[0],
        copies: members.slice(1),
      };
      groups.push(g);
      for (const c of g.copies) copies.add(c);
    }
    for (const k of node.kids) findGroups(k, copies.has(k));
  }
  for (const r of roots) findGroups(r, false);

  for (const g of groups) {
    for (const c of g.copies) {
      for (let i = c.start; i < c.end; i++) {
        const it = items[i];
        if (it.copyOf) continue;
        it.copyOf = items[g.master.start + (i - c.start)];
        it.group = g;
      }
    }
  }

  const twinKey = new Map<string, SwarmItem>();
  for (const it of items) {
    if (it.kind !== "text" || it.copyOf || !it.text || !it.tb) continue;
    const k = `${it.layer}|${Math.round(it.tb.x / 4)}|${Math.round(
      it.tb.y / 4
    )}|${it.text}`;
    const m = twinKey.get(k);
    if (m) it.twinOf = m;
    else twinKey.set(k, it);
  }

  // Tasks
  const tasks: Task[] = [];
  const mk = (
    y: number,
    spec: Task["spec"],
    deps: Task[],
    layer: "world" | "under" | "over"
  ): Task => {
    const t: Task = {
      id: tasks.length,
      y,
      spec,
      deps,
      state: "wait",
      doneAt: 0,
      layer,
    };
    tasks.push(t);
    return t;
  };
  const KIND_TASK: Record<string, TaskSpecType> = {
    rect: "rect",
    image: "image",
    text: "text",
    line: "line",
  };
  for (const it of items) {
    if (it.copyOf) continue;
    if (it.twinOf) {
      it.final = it.twinOf.final;
      continue;
    }
    const deps = it.parentBox && it.parentBox.final ? it.parentBox.final : [];
    const y = it.kind === "text" && it.tb ? it.tb.y : it.y;
    it.task = mk(y, { type: KIND_TASK[it.kind], it }, deps, it.layer);
    it.final = [it.task];
  }

  for (let gi = groups.length - 1; gi >= 0; gi--) {
    const g = groups[gi];
    const mItems = items.slice(g.master.start, g.master.end);
    const masterFinals: Task[] = [];
    for (const it of mItems) if (it.final) masterFinals.push(...it.final);
    if (
      g.master.start < g.master.end &&
      items[g.master.start].parentBox &&
      items[g.master.start].parentBox?.final
    )
      masterFinals.push(...items[g.master.start].parentBox!.final!);
    g.src = { items: mItems, box: g.master.box };
    g.dst = g.copies.map((c, k) => {
      const its = items.slice(c.start, c.end).filter((it) => it.group === g);
      const minY = Math.min(
        ...its.map((it) => (it.kind === "text" && it.tb ? it.tb.y : it.y))
      );
      const task = mk(minY, { type: "dup", g, k }, masterFinals, c.layer);
      for (const it of its) {
        it.dupTask = task;
        it.final = [task];
        const m = it.copyOf;
        let type: TaskSpecType | null = null;
        if (it.kind === "text" && m && it.sig !== m.sig) type = "edit";
        else if (it.kind === "image" && m && it.sig !== m.sig) type = "swap";
        else if (it.kind === "rect" && m && it.sig !== m.sig) type = "restyle";
        if (type) {
          it.editTask = mk(
            it.kind === "text" && it.tb ? it.tb.y : it.y,
            { type, it },
            [task],
            it.layer
          );
          it.final = [task, it.editTask];
        }
      }
      return { items: its, box: c.box, task };
    });
  }

  // Guides & Snapping
  const guides: Guide[] = [];
  const texts = items.filter(
    (it) =>
      it.kind === "text" &&
      it.task &&
      it.layer === "world" &&
      it.fs &&
      it.fs >= 13 &&
      it.tb &&
      it.tb.w > 30
  );
  const BAND = 900;
  const bands = new Map<number, SwarmItem[]>();
  for (const it of texts) {
    if (!it.tb) continue;
    const k = Math.floor(it.tb.y / BAND);
    if (!bands.has(k)) bands.set(k, []);
    bands.get(k)!.push(it);
  }
  for (const [, list] of [...bands.entries()].sort((a, b) => a[0] - b[0])) {
    if (guides.length >= 16) break;
    const byX = new Map<number, SwarmItem[]>();
    for (const it of list) {
      if (!it.tb) continue;
      const x = Math.round(it.tb.x);
      if (!byX.has(x)) byX.set(x, []);
      byX.get(x)!.push(it);
    }
    let best: [number, SwarmItem[]] | null = null;
    for (const [x, l] of byX)
      if (l.length >= 3 && (!best || l.length > best[1].length)) best = [x, l];
    if (best) {
      const top = Math.min(...best[1].map((m) => m.tb!.y));
      const members = best[1]
        .filter((m) => m.tb!.y < top + 450)
        .sort((a, b) => (b.fs || 0) - (a.fs || 0))
        .slice(0, 2);
      const g: Guide = {
        axis: "x",
        pos: best[0],
        cur: best[0],
        op: 1,
        flash: 0,
        dragging: false,
        vis: false,
      };
      guides.push(g);
      const gy = Math.min(...members.map((m) => m.tb!.y)) - 30;
      g.task = mk(gy, { type: "guide", g }, [], "world");
      g.deps = [];
      for (const m of members) {
        if (m.task) {
          m.task.spec.snap = g;
          m.task.spec.snapDx = m.tb!.x - best[0];
          g.deps.push(m.task);
        }
      }
    }
    const byY = new Map<number, SwarmItem[]>();
    for (const it of list) {
      if (!it.tb) continue;
      const y = Math.round(it.tb.y);
      if (!byY.has(y)) byY.set(y, []);
      byY.get(y)!.push(it);
    }
    let row: [number, SwarmItem[]] | null = null;
    for (const [y, l] of byY)
      if (l.length >= 3 && (!row || l.length > row[1].length)) row = [y, l];
    if (row) {
      const m = row[1].find((it) => it.task && !it.task.spec.snap);
      if (m && m.task) {
        const g: Guide = {
          axis: "y",
          pos: row[0],
          cur: row[0],
          op: 1,
          flash: 0,
          dragging: false,
          vis: false,
        };
        guides.push(g);
        g.task = mk(row[0] - 30, { type: "guide", g }, [], "world");
        g.deps = [m.task];
        m.task.spec.snap = g;
      }
    }
  }

  for (const it of items) {
    if (
      it.kind === "text" &&
      it.task &&
      it.fs &&
      it.fs >= 28 &&
      it.tb &&
      it.tb.h < 400
    ) {
      it.task.spec.grow = true;
    }
  }

  for (const t of tasks) t.gate = t.y;
  for (let i = tasks.length - 1; i >= 0; i--) {
    for (const d of tasks[i].deps) {
      if (tasks[i].gate !== undefined && (d.gate === undefined || tasks[i].gate! < d.gate!)) {
        d.gate = tasks[i].gate;
      }
    }
  }

  const backdrops: BackdropBar[] = [];
  if (pageBg.image === "none") {
    for (const b of bars) {
      const area = b.r.width * b.r.height;
      const covered = items.some(
        (it) =>
          it.id !== undefined &&
          it.id >= b.start &&
          it.layer === "over" &&
          it.kind === "rect" &&
          it.w * it.h >= area * 0.85 &&
          /rgba?\(/.test(it.css || "") &&
          !/background-color:\s*rgba\([^)]*,\s*0(\.\d+)?\)/.test(it.css || "")
      );
      if (!covered) {
        backdrops.push({
          x: b.r.left,
          y: b.r.top,
          w: b.r.width,
          h: b.r.height,
          key: b.key,
          color: pageBg.color,
        });
      }
    }
  }

  return { items, tasks, groups, guides, docW, docH, backdrops, portKey };
}
