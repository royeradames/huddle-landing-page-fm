/* Every glyph sits centred in the same 20×20 box, so the three icons render at one size. */
export function FacebookIcon() {
  return (
    <svg viewBox="-5 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M6.5 20v-9h3l.45-3.5H6.5V5.27c0-1.01.28-1.7 1.73-1.7H10V.44C9.69.4 8.64.3 7.42.3 4.86.3 3.1 1.86 3.1 4.73V7.5H0V11h3.1v9h3.4z" />
    </svg>
  );
}

/* Bird path from the Frontend Mentor article preview starter's icon-twitter.svg. */
export function TwitterIcon() {
  return (
    <svg viewBox="0 -1.5 20 20" width="18" height="18" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M20 2.172a8.192 8.192 0 01-2.357.646 4.11 4.11 0 001.804-2.27 8.22 8.22 0 01-2.605.996A4.096 4.096 0 0013.847.248c-2.65 0-4.596 2.472-3.998 5.037A11.648 11.648 0 011.392 1a4.109 4.109 0 001.27 5.478 4.086 4.086 0 01-1.858-.513c-.045 1.9 1.318 3.679 3.291 4.075a4.113 4.113 0 01-1.853.07 4.106 4.106 0 003.833 2.849A8.25 8.25 0 010 14.658a11.616 11.616 0 006.29 1.843c7.618 0 11.922-6.434 11.663-12.205A8.354 8.354 0 0020 2.172z" />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="10" cy="10" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="15.1" cy="4.9" r="1.2" fill="currentColor" />
    </svg>
  );
}
