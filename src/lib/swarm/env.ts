import type { Env, PageBackground } from "./types";
import { alphaOf } from "./utils";

declare global {
  interface Window {
    __lenis?: {
      scrollTo: (
        target: number | HTMLElement | string,
        options?: { immediate?: boolean; offset?: number; duration?: number }
      ) => void;
    };
  }
}

export function pageBackground(): PageBackground {
  const h = document.documentElement;
  const b = document.body;
  const hs = getComputedStyle(h);
  const bs = b ? getComputedStyle(b) : null;
  const pick = (cs: CSSStyleDeclaration) => ({
    color: cs.backgroundColor,
    image: cs.backgroundImage,
    size: cs.backgroundSize,
    position: cs.backgroundPosition,
    repeat: cs.backgroundRepeat,
  });
  if (alphaOf(hs.backgroundColor) > 0.01 || hs.backgroundImage !== "none") {
    return { ...pick(hs), from: h };
  }
  if (bs && (alphaOf(bs.backgroundColor) > 0.01 || bs.backgroundImage !== "none")) {
    return { ...pick(bs), from: b };
  }
  const dark =
    document.documentElement.classList.contains("dark") ||
    (/dark/.test(hs.colorScheme) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  return {
    color: dark ? "rgb(18, 18, 18)" : "rgb(255, 255, 255)",
    image: "none",
    from: null,
  };
}

export function detectEnv(): Env {
  const se = document.scrollingElement || document.documentElement;
  let scroller: Element = se;
  let isRoot = true;

  if (se.scrollHeight <= window.innerHeight + 4) {
    let best: Element | null = null;
    let bestArea = 0;
    const all = document.body ? document.body.getElementsByTagName("*") : [];
    for (let i = 0; i < all.length && i < 20000; i++) {
      const el = all[i];
      if (
        el.scrollHeight <= el.clientHeight + 40 ||
        el.clientHeight < window.innerHeight * 0.4
      )
        continue;
      const oy = getComputedStyle(el).overflowY;
      if (!/(auto|scroll|overlay)/.test(oy)) continue;
      const r = el.getBoundingClientRect();
      const area = r.width * r.height;
      if (area > bestArea && r.width > window.innerWidth * 0.35) {
        best = el;
        bestArea = area;
      }
    }
    if (best) {
      scroller = best;
      isRoot = false;
    }
  }

  const env: Env = {
    scroller,
    isRoot,
    host: null,
    pageBg: pageBackground(),
    geom() {
      if (isRoot) {
        return {
          ox: 0,
          oy: 0,
          sx: window.scrollX,
          sy: window.scrollY,
          vw: document.documentElement.clientWidth,
          vh: window.innerHeight,
        };
      }
      const r = scroller.getBoundingClientRect();
      return {
        ox: r.left + scroller.clientLeft,
        oy: r.top + scroller.clientTop,
        sx: scroller.scrollLeft,
        sy: scroller.scrollTop,
        vw: scroller.clientWidth,
        vh: scroller.clientHeight,
      };
    },
    scrollHeight: () =>
      isRoot
        ? Math.max(se.scrollHeight, document.body ? document.body.scrollHeight : 0)
        : scroller.scrollHeight,
    scrollWidth: () => (isRoot ? se.scrollWidth : scroller.scrollWidth),
    scrollTo(y: number, x?: number) {
      const opts: ScrollToOptions = { top: y, behavior: "instant" };
      if (x != null) opts.left = x;
      if (isRoot) {
        try {
          if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true });
        } catch {}
        window.scrollTo(opts);
      } else {
        scroller.scrollTo(opts);
      }
    },
    scrollBy(dy: number) {
      if (isRoot) {
        try {
          if (window.__lenis)
            window.__lenis.scrollTo(window.scrollY + dy, { immediate: true });
        } catch {}
        window.scrollBy({ top: dy, behavior: "instant" });
      } else {
        scroller.scrollBy({ top: dy, behavior: "instant" });
      }
    },
  };

  return env;
}
