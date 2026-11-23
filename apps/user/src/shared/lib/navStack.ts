const DEPTH_KEY = "__u4uDepth";
const STACK_KEY = "u4uNavStack";
const LAST_DEPTH_KEY = "u4uNavLastDepth";

type NavStack = Record<string, string>;

const isBrowser = () => typeof window !== "undefined";

let replacePending = false;

export function markReplace() {
  replacePending = true;
}

const readStack = (): NavStack => {
  try {
    const raw = sessionStorage.getItem(STACK_KEY);
    return raw === null ? {} : (JSON.parse(raw) as NavStack);
  } catch {
    return {};
  }
};

const writeStack = (stack: NavStack) => {
  try {
    sessionStorage.setItem(STACK_KEY, JSON.stringify(stack));
  } catch {}
};

const readDepth = (): number | null => {
  const state = window.history.state as Record<string, unknown> | null;
  const depth = state?.[DEPTH_KEY];

  return typeof depth === "number" ? depth : null;
};

export function recordEntry(pathname: string) {
  if (!isBrowser()) return;

  let depth = readDepth();

  if (depth === null) {
    const parsed = Number(sessionStorage.getItem(LAST_DEPTH_KEY) ?? "-1");
    const last = Number.isNaN(parsed) ? -1 : parsed;
    depth = replacePending ? Math.max(last, 0) : last + 1;

    const state = (window.history.state ?? {}) as Record<string, unknown>;
    window.history.replaceState({ ...state, [DEPTH_KEY]: depth }, "");
  }

  replacePending = false;

  try {
    sessionStorage.setItem(LAST_DEPTH_KEY, String(depth));
  } catch {}

  const stack = readStack();

  for (const key of Object.keys(stack)) {
    if (Number(key) > depth) delete stack[key];
  }

  stack[String(depth)] = pathname;
  writeStack(stack);
}

export function previousPath(): string | null {
  if (!isBrowser()) return null;

  const depth = readDepth();

  if (depth === null || depth <= 0) return null;

  return readStack()[String(depth - 1)] ?? null;
}
