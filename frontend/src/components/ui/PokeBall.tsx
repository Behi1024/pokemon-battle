export function PokeBall({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="48" fill="#EE1515" stroke="#1a1a2e" strokeWidth="4" />
      <path d="M2,50 A48,48 0 0,0 98,50 Z" fill="white" />
      <rect x="2" y="46" width="96" height="8" fill="#1a1a2e" />
      <circle cx="50" cy="50" r="13" fill="#1a1a2e" />
      <circle cx="50" cy="50" r="9" fill="white" />
      <circle cx="45" cy="45" r="3" fill="rgba(255,255,255,0.65)" />
    </svg>
  );
}
