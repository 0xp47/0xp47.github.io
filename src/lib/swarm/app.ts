import { captureModel } from "./capture";
import { MIN_AGENTS } from "./constants";
import { Engine } from "./engine";
import { detectEnv } from "./env";
import type { AppOptions, Env, Geom, Shot, SwarmModel } from "./types";
import { nextFrame, sleep } from "./utils";
import { View } from "./view";

let lastShot: { src: string; at: Geom } | null = null;

export async function unhidePage(): Promise<void> {
  if (typeof window === "undefined" || !window.__swarmHidden) return;
  window.__swarmHidden = false;
  try {
    const chromeApi = (window as unknown as { chrome?: { runtime?: { sendMessage?: (msg: unknown) => Promise<unknown> } } }).chrome;
    if (chromeApi?.runtime?.sendMessage) {
      await chromeApi.runtime.sendMessage({ type: "swarm:unhide" });
    }
  } catch {}
  if (typeof window.__swarmUnhide === "function") {
    try {
      window.__swarmUnhide();
    } catch {}
  }
  await nextFrame();
}

export class App {
  dead = false;
  t0: number;
  tour: boolean;
  tourV = 0;
  tourAcc = 0;
  speeds = [1, 2, 3];
  speedIx = 0;
  complete = false;
  timing: Record<string, number> = {};
  musicPlaying: boolean;
  musicMuted: boolean;
  preserveScroll: boolean;
  isThemeRestart: boolean;
  env!: Env;
  view!: View;
  engine!: Engine;
  model!: SwarmModel;
  unbinds: Array<() => void> = [];
  last = 0;
  raf = 0;
  _hudT = 0;
  _dots = "";

  onStop?: (reveal?: boolean) => void;
  onRestart?: (opts?: AppOptions) => void;

  constructor(opts: AppOptions = {}) {
    this.t0 = performance.now();
    this.tour = opts.tour !== undefined ? opts.tour : true;
    this.musicPlaying = opts.musicPlaying !== undefined ? opts.musicPlaying : true;
    this.musicMuted = opts.musicMuted !== undefined ? opts.musicMuted : false;
    this.preserveScroll = !!opts.preserveScroll;
    this.isThemeRestart = !!opts.isThemeRestart;
  }

  async loadShot(): Promise<Shot | null> {
    let src = window.__swarmShot;
    window.__swarmShot = null;
    if (src) lastShot = { src, at: this.env.geom() };
    else if (lastShot) src = lastShot.src;
    if (!src) return null;
    const img = new Image();
    img.src = src;
    try {
      await img.decode();
    } catch {
      return null;
    }
    const g = lastShot && lastShot.src === src ? lastShot.at : this.env.geom();
    return {
      img,
      sx: g.sx,
      sy: g.sy,
      scale: img.naturalWidth / window.innerWidth,
      valid: false,
    };
  }

  async run(): Promise<void> {
    this.env = detectEnv();
    if (!this.preserveScroll) {
      this.env.scrollTo(0, 0);
      try {
        if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
      } catch {}
    }
    const shotP = this.loadShot();
    this.view = new View(this.env);
    this.engine = new Engine(this.view);
    this.engine.onStart = () => this.view.intro.classList.add("gone");
    this.engine.onComplete = () => this.onComplete();
    this.bind();
    this.last = performance.now();
    this.raf = requestAnimationFrame((t) => this.frame(t));
    await nextFrame();
    this.view.bg.classList.add("on");
    if (!this.isThemeRestart) {
      this.view.intro.classList.add("on");
    }
    this.view.hud.classList.add("on");
    const mark = (k: string) =>
      (this.timing[k] = Math.round(performance.now() - this.t0));
    if (!this.isThemeRestart) {
      await sleep(520);
    }
    await unhidePage();
    mark("blank");
    if (this.dead) return;
    if (!this.preserveScroll) {
      await this.scan();
    }
    mark("scan");
    if (this.dead) return;
    try {
      await Promise.race([document.fonts.ready, sleep(1200)]);
    } catch {}
    mark("fonts");
    this.view.measure();
    const shot = await shotP;
    if (shot) {
      const g = this.env.geom();
      shot.valid =
        Math.abs(g.sx - shot.sx) < 1 && Math.abs(g.sy - shot.sy) < 1;
    }
    let model: SwarmModel;
    try {
      model = captureModel(this.env, shot);
    } catch (err) {
      console.error("[swarm-rebuild] capture failed", err);
      model = {
        items: [],
        tasks: [],
        groups: [],
        guides: [],
        docW: 0,
        docH: 0,
      };
    }
    mark("capture");
    if (this.dead) return;
    this.view.mount(model);
    this.engine.setModel(model);
    this.model = model;
    mark("mount");
    if (!this.isThemeRestart) {
      const wait = 1500 - (performance.now() - this.t0);
      if (wait > 0) await sleep(wait);
    }
    if (this.dead) return;
    this.engine.start();
  }

  async scan(): Promise<void> {
    const env = this.env;
    const g = env.geom();
    const H = env.scrollHeight();
    if (H <= g.vh * 1.25) {
      env.scrollTo(0, 0);
      return;
    }
    this.view.frozen = { ...this.view.vp };
    const steps = Math.min(28, Math.ceil(H / (g.vh * 0.85)));
    for (let i = 1; i <= steps && !this.dead; i++) {
      env.scrollTo(Math.min(H, (H / steps) * i));
      await nextFrame();
      await sleep(30);
    }
    env.scrollTo(0, 0);
    await nextFrame();
    await sleep(750);
    env.scrollTo(0, 0);
    this.view.frozen = null;
  }

  bind(): void {
    const on = (
      t: EventTarget,
      ev: string,
      fn: EventListenerOrEventListenerObject,
      o?: boolean | AddEventListenerOptions
    ) => {
      t.addEventListener(ev, fn, o);
      this.unbinds.push(() => t.removeEventListener(ev, fn, o));
    };

    const scrollTarget = this.env.isRoot ? window : this.env.scroller;
    on(
      scrollTarget,
      "scroll",
      () => {
        if (!this.view.frozen) this.view.syncWorld();
      },
      { passive: true }
    );
    on(window, "resize", () => this.view.measure());
    on(window, "orientationchange", () =>
      setTimeout(() => this.view.measure(), 100)
    );

    // Dynamic light/dark theme adaptation without losing scroll state
    let currentDark = document.documentElement.classList.contains("dark");
    const themeObserver = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark !== currentDark) {
        currentDark = isDark;
        if (this.onRestart) {
          this.onRestart({
            preserveScroll: true,
            musicPlaying: this.musicPlaying,
            musicMuted: this.musicMuted,
            tour: this.tour,
            isThemeRestart: true,
          });
        }
      }
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    this.unbinds.push(() => themeObserver.disconnect());

    on(
      window,
      "wheel",
      () => {
        this.pauseTour();
        if (this.engine.ready) this.engine.start();
      },
      { passive: true }
    );
    on(
      window,
      "touchstart",
      () => {
        this.pauseTour();
      },
      { passive: true }
    );
    on(
      window,
      "touchmove",
      () => {
        this.pauseTour();
      },
      { passive: true }
    );
    on(
      window,
      "pointermove",
      (e: Event) => {
        const pe = e as PointerEvent;
        this.engine.mouse = { x: pe.clientX, y: pe.clientY };
      },
      { passive: true }
    );
    on(document.documentElement, "pointerleave", () => {
      this.engine.mouse = null;
    });
    on(
      window,
      "keydown",
      (e: Event) => {
        const ke = e as KeyboardEvent;
        if (ke.key === "Escape") {
          ke.stopPropagation();
          if (this.onStop) this.onStop(false);
        } else if (
          [
            "ArrowDown",
            "ArrowUp",
            "PageDown",
            "PageUp",
            "Space",
            "Home",
            "End",
          ].includes(ke.key)
        ) {
          this.pauseTour();
        }
      },
      true
    );
    if (!this.env.isRoot) {
      on(
        this.view.host,
        "wheel",
        (e: Event) => {
          const we = e as WheelEvent;
          we.preventDefault();
          this.env.scroller.scrollBy({
            top: we.deltaY,
            left: we.deltaX,
            behavior: "instant",
          });
        },
        { passive: false }
      );
    }
    on(this.view.hud, "click", (e: Event) => {
      const target = e.target as HTMLElement | null;
      const b = target?.closest<HTMLButtonElement>("button");
      if (!b) return;
      const a = b.dataset.a;
      if (a === "close") {
        if (this.onStop) this.onStop(false);
      } else if (a === "live") {
        if (this.onStop) this.onStop(true);
      } else if (a === "replay") {
        if (this.onRestart) this.onRestart();
      } else if (a === "tour") {
        this.tour = !this.tour;
        b.classList.toggle("on", this.tour);
        b.textContent = this.tour ? "Touring" : "Tour";
        if (this.tour) this.engine.start();
      } else if (a === "speed") {
        this.speedIx = (this.speedIx + 1) % this.speeds.length;
        this.engine.speed = this.speeds[this.speedIx];
        b.textContent = this.speeds[this.speedIx] + "×";
      } else if (a === "music-toggle") {
        this.musicPlaying = !this.musicPlaying;
        b.classList.toggle("playing", this.musicPlaying);
        b.title = this.musicPlaying
          ? "Bass and 808 - Paul Velchev (Click to pause)"
          : "Bass and 808 - Paul Velchev (Click to play)";
        this.sendYt(this.musicPlaying ? "playVideo" : "pauseVideo");
      } else if (a === "music-mute") {
        this.musicMuted = !this.musicMuted;
        b.classList.toggle("muted", this.musicMuted);
        b.title = this.musicMuted ? "Unmute audio" : "Mute audio";
        this.sendYt(this.musicMuted ? "mute" : "unMute");
      }
    });

    if (this.view.musicFrame) {
      on(this.view.musicFrame, "load", () => {
        if (this.musicPlaying) {
          this.sendYt("playVideo");
          if (this.musicMuted) this.sendYt("mute");
          else this.sendYt("unMute");
        }
      });
    }

    on(
      document,
      "pointerdown",
      (e: Event) => {
        const pe = e as PointerEvent;
        const path = pe.composedPath ? pe.composedPath() : [];
        const isHud =
          this.view && this.view.hud && path.includes(this.view.hud);
        if (!isHud) {
          this.pauseTour();
        }
        if (this.musicPlaying) this.sendYt("playVideo");
      },
      { passive: true }
    );
  }

  frame(now: number): void {
    if (this.dead) return;
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    try {
      this.engine.step(dt);
      if (this.tour) this.tourStep(dt);
      this.view.render(this.engine);
      if (!this._hudT || now - this._hudT > 200) {
        this._hudT = now;
        this.updateHud();
      }
    } catch (err) {
      console.error("[swarm-rebuild]", err);
    }
    this.raf = requestAnimationFrame((t) => this.frame(t));
  }

  sendYt(func: string, args: unknown[] = []): void {
    try {
      const f = this.view && this.view.musicFrame;
      if (f && f.contentWindow) {
        f.contentWindow.postMessage(
          JSON.stringify({ event: "command", func, args }),
          "*"
        );
      }
    } catch {}
  }

  pauseTour(): void {
    if (!this.tour) return;
    this.tour = false;
    const b = this.view?.hud?.querySelector<HTMLButtonElement>(
      '[data-a="tour"]'
    );
    if (b) {
      b.classList.remove("on");
      b.textContent = "Tour";
    }
  }

  tourStep(dt: number): void {
    const E = this.engine;
    if (!E.started) return;
    const g = this.env.geom();
    const maxY = this.env.scrollHeight() - g.vh;
    if (g.sy >= maxY - 1) {
      this.tourV = 0;
      return;
    }
    const crew = Math.max(
      MIN_AGENTS,
      E.cursors.filter((c) => !c.leaving).length
    );
    const backlog = E.backlog();
    const target =
      backlog <= Math.max(4, crew * 0.6)
        ? 230
        : backlog <= crew * 1.5
        ? 80
        : 0;
    this.tourV += (target - this.tourV) * Math.min(1, dt * 2.5);
    this.tourAcc += this.tourV * dt;
    if (this.tourAcc >= 1) {
      const d = Math.floor(this.tourAcc);
      this.tourAcc -= d;
      this.env.scrollBy(d);
    }
  }

  updateHud(): void {
    const E = this.engine;
    const v = this.view;
    if (!E.ready) return;
    const workers = E.cursors.filter((c) => c.worked).length + E.retired;
    const total = E.tasks.length;
    const done = E.doneCount;
    if (this.complete) return;
    if (!E.started) {
      v.status.innerHTML = `<span class="s-ag"><b>${
        E.cursors.length
      }</b> agents</span><span class="sep s-sep-layers"></span><span class="s-lay">${total.toLocaleString()} layers</span>`;
    } else {
      const pend = E.tasks.length - done;
      const below = E.tasks.some(
        (t) =>
          t.state === "wait" &&
          t.layer === "world" &&
          t.gate !== undefined &&
          t.gate > E.frontier
      );
      v.status.innerHTML =
        `<span class="s-ag"><b>${workers}</b> agents</span><span class="sep s-sep-layers"></span><span class="s-lay"><b>${done.toLocaleString()}</b> / ${total.toLocaleString()} layers</span>` +
        (below && pend && !this.tour && E.backlog() === 0
          ? `<span class="sep s-sep-scroll"></span><span class="s-scroll">scroll to build</span>`
          : "");
    }
    v.barFill.style.width = total ? `${(done / total) * 100}%` : "0%";
    const busy = E.cursors.filter((c) => c.task).slice(-5);
    const key = busy.map((c) => c.id).join(",");
    if (key !== this._dots) {
      this._dots = key;
      v.dots.innerHTML = busy
        .map(
          (c) =>
            `<i style="background:${
              c.color || "#f4f4f5"
            };color:#09090b!important;border:1.5px solid #09090b" title="${
              c.name
            }">${(c.name && c.name[0]) || "A"}</i>`
        )
        .join("");
    }
  }

  onComplete(): void {
    this.complete = true;
    const E = this.engine;
    const v = this.view;
    const workers = E.cursors.filter((c) => c.worked).length + E.retired;
    const secs = (E.endTime - E.startTime).toFixed(1);
    v.status.innerHTML = `<span class="s-done-full">Rebuilt by <b>${workers}</b> agents in <b>${secs}s</b></span><span class="s-done-short"><b>${workers}</b> agents · <b>${secs}s</b></span>`;
    v.barFill.style.width = "100%";
    v.dots.innerHTML = "";
    const liveBtn = v.root.querySelector<HTMLButtonElement>('[data-a="live"]');
    const replayBtn = v.root.querySelector<HTMLButtonElement>('[data-a="replay"]');
    const tourBtn = v.root.querySelector<HTMLButtonElement>('[data-a="tour"]');
    const speedBtn = v.root.querySelector<HTMLButtonElement>('[data-a="speed"]');
    if (liveBtn) liveBtn.hidden = false;
    if (replayBtn) replayBtn.hidden = false;
    if (tourBtn) tourBtn.hidden = true;
    if (speedBtn) speedBtn.hidden = true;
    this.tour = false;
  }

  destroy(reveal?: boolean): void {
    this.sendYt("stopVideo");
    unhidePage();
    const finish = () => {
      this.dead = true;
      cancelAnimationFrame(this.raf);
      for (const u of this.unbinds) u();
      this.view.host.remove();
    };
    if (reveal) {
      this.engine.releasing = true;
      this.engine.flocking = true;
      for (const c of this.engine.cursors) {
        c.gen = null;
        c.follow = false;
      }
      this.view.hud.classList.remove("on");
      setTimeout(() => {
        this.view.host.style.setProperty("opacity", "0", "important");
      }, 450);
      setTimeout(finish, 1150);
    } else {
      this.view.host.style.setProperty(
        "transition",
        "opacity .25s ease",
        "important"
      );
      this.view.host.style.setProperty("opacity", "0", "important");
      this.dead = true;
      cancelAnimationFrame(this.raf);
      for (const u of this.unbinds) u();
      setTimeout(() => this.view.host.remove(), 260);
    }
  }
}
