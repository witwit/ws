// simple redirect to main locale
const href = `./${process.env.LOCALE}/${window.location.search + window.location.hash}`;
document.location.href = href;
