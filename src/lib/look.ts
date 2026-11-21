// Which design direction this build shows (MAXWELL_LOOK, see astro.config.mjs).
export const LOOK: "a" | "b" = (import.meta.env.MAXWELL_LOOK as "a" | "b") || "b";
export const BASE = import.meta.env.BASE_URL.replace(/\/?$/, "/");
