const PATHS = {
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5M12 8v.01" />
    </>
  ),
  ledger: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  document: (
    <>
      <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v4h4M9 13h6M9 17h6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M21 20c0-2.6-1.8-4.8-4.2-5.5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V10M11 20V4M18 20v-7" />
      <path d="M3 20h18" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />
      <path d="M10 21v-4h4v4" />
    </>
  ),
  textile: (
    <>
      <path d="M8 4 5 6.5V10l2.2-1.2V21h9.6V8.8L19 10V6.5L16 4c0 1.7-1.8 3-4 3s-4-1.3-4-3Z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="1.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m4 6.5 8 6 8-6" />
    </>
  ),
  phone: (
    <path d="M6.6 3.5 9.2 8l-2 2.2a13.6 13.6 0 0 0 6.1 6.1l2.2-2 4.5 2.6-.4 3.3a2 2 0 0 1-2 1.8C10.5 21.8 2.2 13.5 2 6.4a2 2 0 0 1 1.8-2Z" />
  ),
  shield: (
    <path d="M12 3 4.5 6v6c0 5 3.2 8.4 7.5 9 4.3-.6 7.5-4 7.5-9V6L12 3Z" />
  ),
  spark: (
    <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15 9-2 6-6 2 2-6 6-2Z" />
    </>
  ),
  handshake: (
    <path d="M2 12h4l3-3 3 3h1l3-3 3 3h3M8 12l3.5 3.5a1.6 1.6 0 0 0 2.3 0l.2-.2M13 12l1.2 1.2a1.6 1.6 0 0 0 2.3 0" />
  ),
}

export default function Icon({ name, size = 24, className = '' }) {
  const path = PATHS[name]
  if (!path) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {path}
    </svg>
  )
}
