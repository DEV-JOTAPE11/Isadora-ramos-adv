/** Junta classes ignorando `false`, `null` e `undefined`. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** `true` quando o sistema pede menos animação. Seguro no servidor. */
export function prefereMenosMovimento(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
