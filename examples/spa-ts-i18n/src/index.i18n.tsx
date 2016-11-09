import { LOCALE } from 'mercateo/i18n';

// simple redirect to main locale
const href = `./${LOCALE}/${window.location.search + window.location.hash}`;
document.location.href = href;
