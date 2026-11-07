export interface Geom {
  ox: number;
  oy: number;
  sx: number;
  sy: number;
  vw: number;
  vh: number;
}

export interface PageBackground {
  color: string;
  image: string;
  size?: string;
  position?: string;
  repeat?: string;
  from: HTMLElement | null;
}

export interface Env {
  scroller: Element | HTMLElement;
  isRoot: boolean;
  host: HTMLElement | null;
  pageBg: PageBackground;
  geom: () => Geom;
  scrollHeight: () => number;
  scrollWidth: () => number;
  scrollTo: (y: number, x?: number) => void;
  scrollBy: (dy: number) => void;
}

export interface BoxRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ClipRect {
  l: number;
  t: number;
  r: number;
  b: number;
}

export interface Point {
  x: number;
  y: number;
}

export type CursorShape =
  | "arrow"
  | "dup"
  | "pen"
  | "pen-add"
  | "pen-close"
  | "cross"
  | "ibeam"
  | "ew"
  | "ns";

export type TaskSpecType =
  | "rect"
  | "image"
  | "line"
  | "text"
  | "guide"
  | "dup"
  | "edit"
  | "restyle"
  | "swap";

export interface TaskSpec {
  type: TaskSpecType;
  it?: SwarmItem;
  g?: Guide | SwarmGroup;
  k?: number;
  snap?: Guide | null;
  snapDx?: number;
  grow?: boolean;
}

export interface Task {
  id: number;
  y: number;
  spec: TaskSpec;
  deps: Task[];
  state: "wait" | "active" | "done";
  doneAt: number;
  layer: "world" | "under" | "over";
  gate?: number;
}

export interface Guide {
  axis: "x" | "y";
  pos: number;
  cur: number;
  op: number;
  flash: number;
  dragging: boolean;
  vis: boolean;
  task?: Task;
  deps?: Task[];
  shownAt?: number;
}

export interface DomTreeNode {
  el: Element;
  tag: string;
  cls: string;
  layer: "world" | "under" | "over";
  start: number;
  end: number;
  kids: DomTreeNode[];
  box: BoxRect;
}

export interface SwarmGroup {
  id: number;
  master: DomTreeNode;
  copies: DomTreeNode[];
  src?: { items: SwarmItem[]; box: BoxRect };
  dst?: Array<{ items: SwarmItem[]; box: BoxRect; task: Task }>;
}

export interface TextUnit {
  t?: Text;
  e?: HTMLElement | SVGElement;
  s?: string;
  len: number;
  box: HTMLElement | null;
  on?: boolean;
}

export interface SwarmNodeElement extends HTMLDivElement {
  _css?: string;
  _src?: SwarmItem;
  _st?: NodeJS.Timeout | number;
}

export interface SwarmItem {
  id?: number;
  kind: "rect" | "image" | "text" | "line";
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
  v?: number;
  rv?: number;
  vis?: boolean;
  dx?: number;
  dy?: number;
  scale?: number;
  mode?: "own" | "master";
  done?: boolean;
  settle?: boolean;
  styled?: boolean;
  draw?: { w: number; h: number } | null;
  sig?: string;

  // Rect specific
  css?: string;
  radius?: string;
  big?: boolean;

  // Image specific
  media?: HTMLElement | SVGElement | HTMLCanvasElement;
  frame?: string;
  shadow?: string;
  bg?: string;

  // Text specific
  tb?: BoxRect;
  full?: HTMLElement;
  live?: HTMLElement;
  units?: TextUnit[];
  seq?: string;
  total?: number;
  shown?: number;
  rshown?: number;
  fs?: number;
  lh?: number;
  align?: string;
  text?: string;
  editing?: boolean;
  selAll?: boolean;
  _last?: Node | null;
  _caret?: HTMLSpanElement;
  _mv?: HTMLElement;
  _tv?: number;

  // Line specific
  pts?: Point[];
  stroke?: string;
  sw?: number;
  dash?: string | null;
  placed?: number;
  shut?: boolean;
  edit?: boolean;
  owner?: Cursor | null;

  // Duplicate / references
  copyOf?: SwarmItem;
  twinOf?: SwarmItem;
  group?: SwarmGroup;
  task?: Task;
  dupTask?: Task;
  editTask?: Task;
  final?: Task[];

  // Rendered DOM Node
  node?: SwarmNodeElement;
}

export type OverlayItem =
  | {
      t: "box";
      b: BoxRect;
      handles?: boolean;
      badge?: string;
      rulerLines?: boolean;
      color?: string;
      underline?: BoxRect;
    }
  | {
      t: "measure";
      a: Point;
      b: Point;
      label: string;
    };

export interface Cursor {
  id: number;
  x: number;
  y: number;
  home: boolean;
  name: string;
  color: string;
  shape: CursorShape;
  press: number;
  task: Task | null;
  gen: Generator<void, void, number> | null;
  ov: (() => OverlayItem[]) | null;
  idleFor: number;
  leaving: boolean;
  worked: boolean;
  sticky: boolean;
  vx: number;
  vy: number;
  angle: number;
  speed: number;
  force: number;
  spin: number;
  curl: number;
  orbit: number;
  follow: boolean;
}

export interface BackdropBar {
  x: number;
  y: number;
  w: number;
  h: number;
  key: number;
  color: string;
}

export interface SwarmModel {
  items: SwarmItem[];
  tasks: Task[];
  groups: SwarmGroup[];
  guides: Guide[];
  docW: number;
  docH: number;
  backdrops?: BackdropBar[];
  portKey?: number | null;
}

export interface AppOptions {
  tour?: boolean;
  musicPlaying?: boolean;
  musicMuted?: boolean;
  preserveScroll?: boolean;
  isThemeRestart?: boolean;
}

export interface Shot {
  img: HTMLImageElement;
  sx: number;
  sy: number;
  scale: number;
  valid: boolean;
}

export interface SwarmRebuildInstance {
  toggle: () => void;
  start: (opts?: AppOptions) => void;
  stop: (reveal?: boolean) => void;
  restart: (opts?: AppOptions) => void;
  app: unknown;
  debug?: {
    captureModel: (env: Env, shot: Shot | null) => SwarmModel;
    detectEnv: () => Env;
  };
}

declare global {
  interface Window {
    __swarmHidden?: boolean;
    __swarmUnhide?: () => void;
    __swarmShot?: string | null;
  }
}

