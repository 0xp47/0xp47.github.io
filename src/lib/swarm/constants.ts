import type { CursorShape } from "./types";

export const KEY = "__swarmRebuild";

export const NAMES = [
  "Ada", "Linus", "Grace", "Alan", "Margaret", "Ken", "Barbara", "Dennis",
  "Radia", "Guido", "Frances", "Bjarne", "Hedy", "Tim", "Katherine", "Edsger",
  "Joan", "Donald", "Sophie", "Niklaus", "Anita", "Brian", "Mary", "Rob",
  "Ida", "Yukihiro", "Shafi", "Leslie", "Jean", "Vint", "Lynn", "Bram",
];

export const LIGHT_COLORS = [
  "#FFFFFF", "#F8FAFC", "#F1F5F9", "#E2E8F0", "#E4E4E7", "#D4D4D8",
  "#FFFFFF", "#F8FAFC", "#F1F5F9", "#E2E8F0", "#E4E4E7", "#D4D4D8",
];

export const DARK_COLORS = [
  "#18181B", "#27272A", "#3F3F46", "#09090B", "#1E293B", "#334155",
  "#18181B", "#27272A", "#3F3F46", "#09090B", "#1E293B", "#334155",
];

export const COLORS = LIGHT_COLORS;
export const BLUE = "#A1A1AA";
export const RED = "#71717A";
export const RULER = 20;
export const MIN_AGENTS = 8;
export const MAX_AGENTS = 48;
export const FLOCK_AGENTS = 36;
export const INTRO_AGENTS = 18;
export const MAX_ITEMS = 4000;
export const MAX_WORLD_H = 40000;
export const SVGNS = "http://www.w3.org/2000/svg";

export const ARROW_D = "M5 3.5 L17.5 8.8 L11.8 10.2 L10.2 16.2 Z";

export const HOT: Record<CursorShape, [number, number]> = {
  arrow: [5, 3.5],
  dup: [5, 3.5],
  pen: [3, 3],
  "pen-add": [3, 3],
  "pen-close": [3, 3],
  cross: [12, 12],
  ibeam: [12, 12],
  ew: [12, 12],
  ns: [12, 12],
};

export const IMG_ICON =
  '<svg class="ph" viewBox="0 0 24 24" fill="none" stroke="#8A8A8A" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M4 18 L10 13 L14 16 L17 13.5 L21 17"/></svg>';

export const SKIP = new Set([
  "script", "style", "noscript", "template", "head", "meta", "link", "title",
  "base", "datalist", "area", "map", "source", "track", "param", "swarm-rebuild",
]);

export const DROP_IN_CLONE = new Set([
  "script", "style", "noscript", "template", "iframe", "object", "embed", "link", "meta",
]);

export const REPLACED = new Set([
  "img", "svg", "video", "canvas", "iframe", "embed", "object", "picture",
]);

export const FORMS = new Set(["input", "textarea", "select"]);

export const ATOMIC = new Set([
  "img", "svg", "video", "canvas", "input", "select", "textarea", "iframe", "picture", "button",
]);

export const TEXT_PROPS = [
  "color", "font-family", "font-size", "font-weight", "font-style", "font-variant",
  "font-stretch", "font-feature-settings", "font-variation-settings", "font-kerning",
  "font-optical-sizing", "line-height", "letter-spacing", "word-spacing",
  "text-transform", "text-align", "text-indent", "text-decoration-line",
  "text-decoration-color", "text-decoration-style", "text-decoration-thickness",
  "text-underline-offset", "text-shadow", "white-space", "white-space-collapse",
  "text-wrap-mode", "text-wrap-style", "direction", "overflow-wrap", "word-break",
  "hyphens", "tab-size", "-webkit-text-fill-color", "-webkit-text-stroke-width",
  "-webkit-text-stroke-color", "text-rendering", "-webkit-font-smoothing",
  "list-style-type", "list-style-position", "list-style-image", "writing-mode",
];

export const BOX_PROPS = [
  "display", "box-sizing", "width", "height", "min-width", "min-height", "max-width",
  "max-height", "padding-top", "padding-right", "padding-bottom", "padding-left",
  "margin-top", "margin-right", "margin-bottom", "margin-left", "border-top-width",
  "border-right-width", "border-bottom-width", "border-left-width", "border-top-style",
  "border-right-style", "border-bottom-style", "border-left-style", "border-top-color",
  "border-right-color", "border-bottom-color", "border-left-color",
  "border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius",
  "border-bottom-left-radius", "background-color", "background-image",
  "background-size", "background-position", "background-repeat", "background-clip",
  "-webkit-background-clip", "box-shadow", "opacity", "vertical-align", "position",
  "top", "right", "bottom", "left", "flex-direction", "flex-wrap", "align-items",
  "justify-content", "gap", "flex-grow", "flex-shrink", "flex-basis", "align-self",
  "object-fit", "object-position", "overflow-x", "overflow-y", "text-overflow",
  "-webkit-line-clamp", "-webkit-box-orient", "visibility", "transform", "filter",
  "float", "fill", "stroke", "clip-path", "mix-blend-mode",
  "-webkit-mask-image", "-webkit-mask-size", "-webkit-mask-position", "-webkit-mask-repeat",
];

export const ELEM_PROPS = [...TEXT_PROPS, ...BOX_PROPS];

export const SVG_PROPS = [
  "fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin",
  "stroke-dasharray", "stroke-dashoffset", "stroke-miterlimit", "fill-opacity",
  "stroke-opacity", "fill-rule", "clip-rule", "opacity", "color", "stop-color",
  "stop-opacity", "display", "visibility", "font-family", "font-size", "font-weight",
  "text-anchor", "dominant-baseline", "letter-spacing", "mix-blend-mode", "filter",
];

export const SVG_OUTER_PROPS = [
  "margin-top", "margin-right", "margin-bottom", "margin-left", "vertical-align", "display",
  "position", "top", "right", "bottom", "left", "transform", "transform-origin",
  "flex-shrink", "flex-grow", "align-self", "order", "overflow",
];

export const RECT_PROPS = [
  "background-color", "background-image", "background-size", "background-position",
  "background-repeat", "background-origin", "background-clip", "border-top-width",
  "border-right-width", "border-bottom-width", "border-left-width", "border-top-style",
  "border-right-style", "border-bottom-style", "border-left-style", "border-top-color",
  "border-right-color", "border-bottom-color", "border-left-color",
  "border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius",
  "border-bottom-left-radius", "box-shadow", "backdrop-filter", "filter", "clip-path",
  "-webkit-mask-image", "-webkit-mask-size", "-webkit-mask-position", "-webkit-mask-repeat",
];

export const STYLE = `
:host{all:initial;pointer-events:none !important}
*{box-sizing:border-box}
.bg{position:absolute;inset:0;opacity:0;transition:opacity .5s ease;pointer-events:none}
.bg.on{opacity:1}
.layer,.port{position:absolute;overflow:hidden;pointer-events:none}
.layer{inset:0}
.world{position:absolute;left:0;top:0;will-change:transform}
.it{position:absolute;left:0;top:0;transform-origin:0 0}
.it.settle{transition:transform .3s cubic-bezier(.2,.8,.2,1)}
.r{background-color:var(--ph,#D9D9D9);transition:background-color .22s ease,border-radius .22s ease}
.r.st{background-color:transparent}
.r>.f{position:absolute;inset:0;opacity:0;transition:opacity .22s ease,background-color .35s ease,border-radius .35s ease,box-shadow .35s ease,border-color .35s ease}
.r.st>.f{opacity:1}
.m{background-color:var(--ph,#D9D9D9);overflow:hidden}
.m>.ph{position:absolute;left:50%;top:50%;width:22px;height:22px;transform:translate(-50%,-50%);opacity:.7;transition:opacity .2s}
.m>.md{position:absolute;inset:0;width:100%;height:100%;opacity:0;clip-path:inset(0 0 100% 0);transition:opacity .35s ease,clip-path .6s cubic-bezier(.2,.75,.2,1)}
.m.st{background-color:transparent;transition:background-color .3s ease .3s}
.m.st>.ph{opacity:0}
.m.st>.md{opacity:1;clip-path:inset(0 0 0 0)}
.m>.md.swap{animation:swap .45s ease}
@keyframes swap{from{opacity:0;filter:blur(6px)}}
.m>.fr{position:absolute;inset:0;pointer-events:none}
.l svg{position:absolute;left:0;top:0;overflow:visible}
.bd{position:absolute;opacity:0;-webkit-backdrop-filter:saturate(180%) blur(14px);backdrop-filter:saturate(180%) blur(14px);box-shadow:0 1px 0 rgba(0,0,0,.06);pointer-events:none}
.caret{display:inline-block;width:1.5px;height:1.1em;margin-left:1px;margin-right:-2.5px;vertical-align:text-bottom;background:currentColor;animation:blink 1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
.sa{background-color:rgba(255,255,255,.14)!important}
.ov{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible;pointer-events:none}
.badges,.cursors{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.badge{position:absolute;transform:translate(-50%);padding:2px 6px;border-radius:4px;color:#f4f4f5;background:#18181b!important;border:1px solid rgba(255,255,255,.14);font:500 10px/14px Inter,system-ui,-apple-system,sans-serif;white-space:nowrap;font-variant-numeric:tabular-nums;box-shadow:0 2px 6px rgba(0,0,0,.35)}
.cursor{position:absolute;left:0;top:0;will-change:transform}
.cursor svg{position:absolute;overflow:visible;filter:drop-shadow(0 2px 4px rgba(0,0,0,.35))}
.rulers{position:absolute;inset:0;pointer-events:none}
.ruler{position:absolute;background:#2c2c2c;pointer-events:none}
.ruler svg{display:block}
.ruler-top{top:0;left:0;right:0;height:20px;border-bottom:1px solid #3a3a3a}
.ruler-left{top:0;left:0;bottom:0;width:20px;border-right:1px solid #3a3a3a}
.ruler-corner{position:absolute;top:0;left:0;width:20px;height:20px;background:#2c2c2c}
.rtext{font:500 9px Inter,system-ui,-apple-system,sans-serif;fill:#8c8c8c}
.rsel{fill:#ffffff}

/* Light Theme Overrides */
:host(.light) .ruler{background:#f4f4f5;border-color:#e4e4e7}
:host(.light) .ruler-top{border-bottom:1px solid #e4e4e7}
:host(.light) .ruler-left{border-right:1px solid #e4e4e7}
:host(.light) .ruler-corner{background:#f4f4f5}
:host(.light) .rtext{fill:#71717a}
:host(.light) .rsel{fill:#18181b}
:host(.light) .hud{background:rgba(255,255,255,0.92);border-color:rgba(0,0,0,0.12);box-shadow:0 16px 48px rgba(0,0,0,0.18),0 0 0 1px rgba(0,0,0,0.05);color:#18181b}
:host(.light) .hud .dots i{border-color:#ffffff;color:#ffffff!important;box-shadow:0 1px 4px rgba(0,0,0,0.25)}
:host(.light) .hud .txt b{color:#09090b}
:host(.light) .hud .txt, :host(.light) .hud .status{color:#52525b}
:host(.light) .hud .sep{background:rgba(0,0,0,0.1)}
:host(.light) .hud .bar{background:rgba(0,0,0,0.08)}
:host(.light) .hud .bar i{background:#18181b;box-shadow:0 0 8px rgba(0,0,0,0.2)}
:host(.light) .hud button{background:rgba(0,0,0,0.04);border-color:rgba(0,0,0,0.08);color:#52525b}
:host(.light) .hud button:hover{background:rgba(0,0,0,0.08);border-color:rgba(0,0,0,0.14);color:#09090b}
:host(.light) .hud button.pri{background:#18181b;color:#ffffff;border-color:#18181b;box-shadow:0 2px 10px rgba(0,0,0,0.15)}
:host(.light) .hud button.pri:hover{background:#27272a;border-color:#27272a}
:host(.light) .hud button.on{background:rgba(0,0,0,0.1);border-color:rgba(0,0,0,0.2);color:#09090b}
:host(.light) .hud .x{color:#71717a}
:host(.light) .hud .x:hover{color:#09090b;background:rgba(0,0,0,0.08);border-color:rgba(0,0,0,0.12)}
:host(.light) .hud .mbtn{background:rgba(0,0,0,0.04);border-color:rgba(0,0,0,0.08);color:#52525b}
:host(.light) .hud .mbtn:hover{background:rgba(0,0,0,0.08);border-color:rgba(0,0,0,0.14);color:#09090b}
:host(.light) .hud .mbtn.playing{background:rgba(0,0,0,0.08);border-color:rgba(0,0,0,0.18);color:#09090b}
.intro{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(.92);opacity:0;transition:opacity .35s ease,transform .45s cubic-bezier(.2,.8,.2,1);pointer-events:none}
.intro.on{opacity:1;transform:translate(-50%,-50%)}
.intro.gone{opacity:0;transform:translate(-50%,-50%) scale(.9)}
.intro img{display:block;width:60px;height:60px;object-fit:contain;filter:grayscale(1);opacity:.42;border-radius:14px}
.intro .mono{width:60px;height:60px;border-radius:16px;background:#D7DADE;color:#fff;font:700 30px/60px Inter,system-ui,sans-serif;text-align:center}
.hud{position:fixed;left:50%;bottom:max(20px,env(safe-area-inset-bottom,20px));transform:translate(-50%,18px);opacity:0;display:inline-flex;align-items:center;gap:8px;padding:4px 6px 4px 12px;background:rgba(9,9,11,0.88);-webkit-backdrop-filter:blur(20px) saturate(180%);backdrop-filter:blur(20px) saturate(180%);border:1px solid rgba(255,255,255,0.12);border-radius:9999px;box-shadow:0 16px 48px rgba(0,0,0,0.55),0 0 0 1px rgba(255,255,255,0.05),inset 0 1px 0 rgba(255,255,255,0.08);color:#d4d4d8;font:500 11px/1 var(--font-geist-mono),ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;letter-spacing:-0.01em;pointer-events:auto;transition:opacity .45s ease,transform .45s cubic-bezier(.2,.8,.2,1);white-space:nowrap;user-select:none;z-index:2147483647;max-width:calc(100vw - 24px);box-sizing:border-box}
.hud.on{opacity:1;transform:translate(-50%,0)}
.hud .dots{display:inline-flex;align-items:center;padding-left:1px;margin-right:3px}
.hud .dots i{display:flex;align-items:center;justify-content:center;width:18px;height:18px;margin-left:-5px;border-radius:50%;border:1.5px solid #09090b;color:#09090b!important;font:800 9.5px/1 var(--font-geist-mono),ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-style:normal;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,0.6);transition:all .2s;user-select:none;flex-shrink:0}
.hud .dots i:first-child{margin-left:0}
.hud .txt,.hud .status{display:inline-flex;align-items:center;gap:6px;color:#a1a1aa;font-variant-numeric:tabular-nums}
.hud .txt b{color:#ffffff;font-weight:600}
.hud .s-done-short{display:none}
.hud .s-done-full{display:inline}
.hud .sep{width:1px;height:14px;background:rgba(255,255,255,0.12);margin:0 2px;flex-shrink:0}
.hud .bar{width:52px;height:3px;border-radius:9999px;background:rgba(255,255,255,0.1);overflow:hidden;flex-shrink:0}
.hud .bar i{display:block;height:100%;width:0;background:#ffffff;box-shadow:0 0 8px rgba(255,255,255,0.5);border-radius:9999px;transition:width .3s ease}
.hud button{all:unset;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:5px;height:24px;padding:0 9px;border-radius:9999px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);color:#a1a1aa;font:500 11px/1 var(--font-geist-mono),ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;letter-spacing:-0.01em;transition:all .15s ease;user-select:none;flex-shrink:0}
.hud button:hover{background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.18);color:#ffffff}
.hud button.pri{background:#ffffff;color:#09090b;font-weight:600;border-color:#ffffff;box-shadow:0 2px 10px rgba(255,255,255,0.2)}
.hud button.pri:hover{background:#e4e4e7;border-color:#e4e4e7}
.hud button.on{background:rgba(255,255,255,0.14);border-color:rgba(255,255,255,0.28);color:#ffffff;font-weight:600}
.hud button[hidden]{display:none}
.hud .x{width:24px;height:24px;padding:0;border-radius:50%;color:#71717a;display:inline-flex;align-items:center;justify-content:center;font-size:11px}
.hud .x:hover{color:#ffffff;background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.2)}
.hud .mplayer{display:inline-flex;align-items:center;gap:4px}
.hud .mbtn{all:unset;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px;height:24px;padding:0 9px;border-radius:9999px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);color:#a1a1aa;font:500 11px/1 var(--font-geist-mono),ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;letter-spacing:-0.01em;transition:all .15s ease}
.hud .mbtn:hover{background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.18);color:#ffffff}
.hud .mbtn.playing{background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.25);color:#ffffff;font-weight:600}
.hud .mbtn.micon{width:24px;height:24px;padding:0;border-radius:50%;color:#a1a1aa}
.hud .mbtn.micon:hover{color:#ffffff;background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.18)}
.hud .mbtn.muted{color:#ef4444;background:rgba(239,68,68,0.1);border-color:rgba(239,68,68,0.25)}
.hud .meq{display:inline-flex;align-items:flex-end;gap:1.5px;height:10px;width:9px}
.hud .meq i{display:block;width:2px;height:100%;background:currentColor;border-radius:1px;transform-origin:bottom}
.hud .mbtn.playing .meq i:nth-child(1){animation:meq1 .65s ease-in-out infinite alternate}
.hud .mbtn.playing .meq i:nth-child(2){animation:meq2 .48s ease-in-out infinite alternate .12s}
.hud .mbtn.playing .meq i:nth-child(3){animation:meq3 .72s ease-in-out infinite alternate .25s}
.hud .mbtn:not(.playing) .meq i{animation:none!important;height:3px}
@keyframes meq1{0%{height:2px}100%{height:10px}}
@keyframes meq2{0%{height:4px}100%{height:10px}}
@keyframes meq3{0%{height:3px}100%{height:8px}}
.hud .vol-x{display:none}
.hud .mbtn.muted .vol-sound{display:none}
.hud .mbtn.muted .vol-x{display:block}

/* Responsive Overrides (Mobile Mode: HUD pinned to TOP) */
@media (max-width: 768px) {
  .hud {
    top: max(14px, env(safe-area-inset-top, 14px));
    bottom: auto;
    transform: translate(-50%, -18px);
    gap: 6px;
    padding: 4px 6px 4px 10px;
  }
  .hud.on {
    transform: translate(-50%, 0);
  }
  .hud .dots i:nth-child(n+4) { display: none; }
}

@media (max-width: 640px) {
  .hud {
    top: max(12px, env(safe-area-inset-top, 12px));
    bottom: auto;
    transform: translate(-50%, -18px);
    gap: 5px;
    padding: 3.5px 5px 3.5px 8px;
    font-size: 10px;
    max-width: calc(100vw - 16px);
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .hud.on {
    transform: translate(-50%, 0);
  }
  .hud::-webkit-scrollbar { display: none; }
  .hud .dots { margin-right: 1px; }
  .hud .dots i { width: 16px; height: 16px; font-size: 8.5px; margin-left: -4px; }
  .hud .dots i:nth-child(n+3) { display: none; }
  .hud .bar { width: 32px; }
  .hud button { height: 22px; padding: 0 7px; font-size: 10px; gap: 4px; }
  .hud button[data-a="speed"] { padding: 0 5px; }
  .hud .x { width: 22px; height: 22px; font-size: 10px; }
  .hud .mbtn { height: 22px; padding: 0 7px; font-size: 10px; gap: 5px; }
  .hud .mbtn.micon { width: 22px; height: 22px; }
  .hud .mbtn .mtxt { display: none; }
  .hud .mbtn.playing { padding: 0 7px; }
  .hud .sep { height: 12px; margin: 0 1px; }
  .hud .s-done-full { display: none; }
  .hud .s-done-short { display: inline; }
}

@media (max-width: 460px) {
  .hud {
    top: max(10px, env(safe-area-inset-top, 10px));
    bottom: auto;
    gap: 4px;
    padding: 3px 4px 3px 7px;
  }
  .hud .dots i:nth-child(n+3) { display: none; }
  .hud .s-sep-layers, .hud .s-lay { display: none; }
  .hud .bar { width: 28px; }
}

@media (max-width: 360px) {
  .hud {
    top: max(8px, env(safe-area-inset-top, 8px));
    bottom: auto;
  }
  .hud .dots { display: none; }
  .hud button[data-a="tour"] { padding: 0 5px; }
  .hud .bar { width: 24px; }
}

@media (max-height: 500px) {
  .hud {
    top: max(6px, env(safe-area-inset-top, 6px));
    bottom: auto;
  }
}
`;
