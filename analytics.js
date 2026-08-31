/* 11+ Test Coach — counting visitors.

   One job: are parents finding the site, and do they go on to the App Store.
   Anonymous and cookieless; nothing here identifies a reader.

   No provider is named except in the two checks in send(), so switching
   analytics means changing the one script tag in the six pages, not this file. */

(function () {
  'use strict';

  function send(name, data) {
    try {
      if (window.fathom) { window.fathom.trackEvent(name); return; }
      if (window.umami) { window.umami.track(name, data); }
    } catch (e) {}
  }

  document.addEventListener('click', function (event) {
    var target = event.target;
    if (!target || !target.closest) return;

    var link = target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href') || '';

    /* The link to the App Store appears four times on the home page — the nav
       badge, the hero badge, a text link inside a FAQ answer, and the badge in
       the closing call to action. Naming them apart is the only way to learn
       which one actually does the work. The last two entries are for blocks
       that have no badge today, so a badge added there later names itself. */
    if (href.indexOf('apps.apple.com') !== -1) {
      var where = link.closest('header') ? 'nav'
                : link.closest('.hero') ? 'hero'
                : link.closest('#faq') ? 'faq'
                : link.closest('#cta') ? 'cta'
                : link.closest('#pricing') ? 'pricing'
                : link.closest('#app') ? 'app'
                : 'other';
      send('appstore-' + where);
      return;
    }

    if (link.host && link.host !== location.host && /^https?:/i.test(link.protocol)) {
      send('outbound-click', { url: href });
    }
  });
})();
