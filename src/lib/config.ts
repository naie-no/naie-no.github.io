// src/lib/config.ts

type RuntimeConfig = {
  API_BASE_URL: string;
};

let runtimeConfig: RuntimeConfig | null = null;
let configLoading = true;

/**
 * Default fallback configuration.
 *
 * API_BASE_URL = "" means "same origin".
 * - In local dev you typically use "/api/..." (proxied by Vite)
 * - On GitHub Pages there is no backend, but empty base avoids calling localhost.
 */
const defaultConfig: RuntimeConfig = {
  API_BASE_URL: "",
};

/**
 * Loads runtime configuration.
 *
 * This is DEV-ONLY by default because GitHub Pages/custom-domain static hosting
 * has no backend endpoint to serve runtime config.
 *
 * If you later deploy behind a backend that supports /api/config,
 * you can enable it by setting VITE_ENABLE_RUNTIME_CONFIG=true.
 */
export async function loadRuntimeConfig(): Promise<void> {
  try {
    // Optional: allow explicit enablement via env flag
    const enableRuntimeConfig =
      String(import.meta.env.VITE_ENABLE_RUNTIME_CONFIG || "").toLowerCase() ===
      "true";

    const isDev = import.meta.env.MODE === "development";

    // Only attempt runtime config in dev *and* when explicitly enabled
    if (!(isDev && enableRuntimeConfig)) {
      return;
    }

    const response = await fetch("/api/config", { cache: "no-store" });
    if (!response.ok) return;

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) return;

    const json = (await response.json()) as Partial<RuntimeConfig>;

    if (typeof json.API_BASE_URL === "string") {
      runtimeConfig = { API_BASE_URL: json.API_BASE_URL };
    }
  } catch {
    // Swallow errors and fall back
  } finally {
    configLoading = false;
  }
}

/**
 * Returns the best available config.
 * Priority:
 *  1) runtimeConfig (if loaded)
 *  2) Vite env (VITE_API_BASE_URL)
 *  3) defaultConfig
 */
export function getConfig(): RuntimeConfig {
  // While loading, return default to avoid "half" config state
  if (configLoading) return defaultConfig;

  if (runtimeConfig) return runtimeConfig;

  const envBase = import.meta.env.VITE_API_BASE_URL;
  if (typeof envBase === "string" && envBase.length > 0) {
    return { API_BASE_URL: envBase };
  }

  return defaultConfig;
}

/**
 * Returns a normalized base URL:
 * - "" stays ""
 * - "/" becomes "" (avoid double slashes)
 * - "https://x/" becomes "https://x" (trim trailing slash)
 */
export function getAPIBaseURL(): string {
  let base = getConfig().API_BASE_URL || "";

  if (base === "/") return "";

  // Trim trailing slash (but keep "http://", "https://")
  if (base.length > 1 && base.endsWith("/")) {
    base = base.slice(0, -1);
  }

  return base;
}

/**
 * Convenience getter object
 */
export const config = {
  get API_BASE_URL() {
    return getAPIBaseURL();
  },
};