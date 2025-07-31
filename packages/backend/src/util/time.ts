export function humanizeDuration(duration: number) {
  if (duration >= 1_000_000) {
    return `${(duration / 1_000_000).toFixed(1)}ms`;
  }
  if (duration >= 1_000) {
    return `${(duration / 1_000).toFixed(1)}µs`;
  }
  return `${duration}ns`;
}
