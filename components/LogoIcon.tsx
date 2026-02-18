
export default function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <rect x="10" y="14" width="44" height="32" rx="10" stroke="currentColor" strokeWidth="4" />
      <rect x="18" y="22" width="10" height="10" rx="3" fill="currentColor" opacity="0.9" />
      <rect x="30" y="22" width="10" height="10" rx="3" fill="currentColor" opacity="0.6" />
      <rect x="42" y="22" width="4" height="4" rx="2" fill="#FF2D2D" />
      <rect x="30" y="34" width="16" height="8" rx="3" fill="currentColor" opacity="0.35" />
      <path d="M24 52h16" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
