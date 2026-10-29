// Dates, prices and language names the way the site shows them, in the
// language of the page.
const locales = { en: { date: 'en-GB', money: 'en-IE' }, de: { date: 'de-DE', money: 'de-DE' } };

export function formatDate(date, lang, options = { day: 'numeric', month: 'long', year: 'numeric' }) {
  return new Intl.DateTimeFormat(locales[lang].date, { ...options, timeZone: 'UTC' }).format(
    new Date(`${date}T12:00:00Z`),
  );
}

export function euros(value, lang) {
  return new Intl.NumberFormat(locales[lang].money, {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

// ['de', 'en'] → 'German, English' on an English page
export function languageNames(codes, lang) {
  const names = new Intl.DisplayNames([lang], { type: 'language' });
  return codes.map((code) => names.of(code)).join(', ');
}

// Today as YYYY-MM-DD in Germany, so a course starting today is still shown.
export function today() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Berlin' }).format(new Date());
}

export function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');
}
